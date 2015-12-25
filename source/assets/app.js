function character_count (tweet) {
    var url, i, lenUrlArr;
    var virtualTweet = tweet;
    var filler = "01234567890123456789";
    var extractedUrls = twttr.txt.extractUrlsWithIndices(tweet);
    lenUrlArr = extractedUrls.length;
    if ( lenUrlArr > 0 ) {
        for (var i = 0; i < lenUrlArr; i++) {
            url = extractedUrls[i].url;
            virtualTweet = virtualTweet.replace(url,filler);
        }
    }
    return virtualTweet.length;
}

function characters_left (tweet) {
    var remaining = 140;
    count = character_count(tweet);
    remaining = remaining - count;
    return remaining;
}

function shorten (url, length) {
    url = url.replace(/^https?:\/\//, '')
    url = url.replace(/^www\./, '')
    if (url.length > length) {
        url = url.slice(0, length) + '\u2026'
    }
    url = twttr.txt.htmlEscape(url)
    return url
}

function fixEntity (entity) {
    if (entity.url) {
        entity['expanded_url'] = entity.url
        entity['display_url'] = shorten(entity.url, 30)
    }
    if (entity.screenName) {
        entity.screenName = '@' + entity.screenName
        entity.indices[0] -= 1
    }
    return entity
}

function autolink (text) {
    var entities = twttr.txt.extractEntitiesWithIndices(text);
    entities.forEach(fixEntity);
    text = twttr.txt.autoLinkEntities(text, entities);
    text = text.replace(/\n/g, '<br>');
    return text;
}

function tweet_lint (text) {
    var issues = []
    text = twttr.txt.htmlEscape(text);
    
    hashtag_count = twttr.txt.extractHashtags(text).length;
    if (hashtag_count == 0) {
        issues.push({
            class: 'info',
            issue: 'Tweets with hashtags receive 2x more engagement that those without hashtags.'
        });
    } else if (hashtag_count >= 3) {
        issues.push({
            class: 'warning',
            issue: 'Tweets with one or two hashtags have 21% higher engagement than those with three or more hashtags.'
        });
    }
    
    tweet_length = character_count(text);
    if (tweet_length >= 100) {
        issues.push({
            class: 'warning',
            issue: 'Tweets that contain less than 100 characters receive 17% higher engagement than longer Tweets.'
        });
    }
    
    lint_count = twttr.txt.extractUrls(text).length;
    if (lint_count == 0) {
        issues.push({
            class: 'info',
            issue: ' Tweets that contain links receive 86% higher Retweet rates than Tweets with no links.'
        });
    }
    
    return issues;
}

$(document).ready(function() {
    var tpl_success_source      = $('#tpl-alert-success').html(),
        tpl_info_source         = $('#tpl-alert-info').html(),
        tpl_warning_source      = $('#tpl-alert-warning').html(),
        tpl_danger_source       = $('#tpl-alert-danger').html(),
        tpl_rendered_source     = $('#tpl-rendered').html(),
        tpl_lint_issues_source  = $('#tpl-lint-issues').html();
    
    var tpl_success     = Handlebars.compile(tpl_success_source),
        tpl_info        = Handlebars.compile(tpl_info_source),
        tpl_warning     = Handlebars.compile(tpl_warning_source),
        tpl_danger      = Handlebars.compile(tpl_danger_source),
        tpl_rendered    = Handlebars.compile(tpl_rendered_source),
        tpl_lint_issues = Handlebars.compile(tpl_lint_issues_source);
    
    $('#id_tweet').keyup(function() {
        var twitter_text = twttr.txt.htmlEscape($(this).val());
        
        var c_left = characters_left(twitter_text),
            c_count = character_count(twitter_text);
        
        var context = {
            count: c_count,
            left: Math.abs(c_left)
        }
        
        $('#lint-issues').html(tpl_lint_issues({
            issues: tweet_lint(twitter_text)
        }));
        
        $("#rendered").html(tpl_rendered({
            tweet: autolink(twitter_text)
        }));
        
        if (count == 0) {
            $("#form-group-tweet").removeClass();
            $("#rendered").empty();
            $('#results').empty();
            console.log('Tweet length is equal to zero.');
        } else if (count < 85) {
            $("#form-group-tweet").removeClass();
            $("#form-group-tweet").addClass('has-success');
            $('#results').html(tpl_success(context));
            console.log('Tweet length is less than 85.');
        } else if (count < 100) {
            $("#form-group-tweet").removeClass();
            $("#form-group-tweet").addClass('has-success');
            $('#results').html(tpl_info(context));
            console.log('Tweet length is less than 100.');
        } else if (count < 140) {
            $("#form-group-tweet").removeClass();
            $("#form-group-tweet").addClass('has-warning');
            $('#results').html(tpl_warning(context));
            console.log('Tweet length is less than 140.');
        } else if (count > 140) {
            $("#form-group-tweet").removeClass();
            $("#form-group-tweet").addClass('has-error');
            $('#results').html(tpl_danger(context));
            console.log('Tweet length is greater than 140.');
        }
    });
});