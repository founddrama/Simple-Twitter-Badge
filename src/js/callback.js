/**
 * A re-jiggering and micro-optimization of `twitterCallback2`
 * otherwise @ http://twitter.com/javascripts/blogger.js
 */
function twitterCallback2(twitters){
	var statusHTML = [],
		i = 0,
		len = twitters.length,
		tweet, username, status;
	
	for ( /* `i` declared above! */ ; i < len; i++) {
		tweet = twitters[i];
		username = tweet.user.screen_name;
		status = tweet.text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url){
			return '<a href="'+url+'">'+url+'</a>';
		}).replace(/\B@([_a-z0-9]+)/ig, function(reply){
			return reply.charAt(0)+'<a href="http://twitter.com/'+reply.substring(1)+'">'+reply.substring(1)+'</a>';
		});
		
		statusHTML.push('<li><span>'+status+'</span> <a style="font-size:85%" href="http://twitter.com/'+username+'/statuses/'+tweet.id_str+'">'+relative_time(tweet.created_at)+'</a></li>');
	}
	
	document.getElementById('twitter_update_list').innerHTML = statusHTML.join('');
}

function relative_time(time_value){
	var values = time_value.split(' ');
	time_value = values[1] + ' ' + values[2] + ', ' + values[5] + ' ' + values[3];
	var parsed_date = Date.parse(time_value),
		relative_to = (arguments.length > 1) ? arguments[1] : new Date(),
		delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
	delta = delta + (relative_to.getTimezoneOffset() * 60);
	
	if (delta < 60) {
		return 'less than a minute ago';
	} else if (delta < 120) {
		return 'about a minute ago';
	} else if (delta < 3600) { // ... < 60*60
		return (parseInt(delta / 60)).toString() + ' minutes ago';
	} else if (delta < 7200) { // ... < 120*60
		return 'about an hour ago';
	} else if (delta < 86400) { // ... < 24*60*60
		return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
	} else if (delta < 172800) { // ... < 48*60*60
		return '1 day ago';
	}
	// implied `else` :
	return (parseInt(delta / 86400)).toString() + ' days ago';
}
