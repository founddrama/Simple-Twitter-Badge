function twitterCallback2(d){var b=[],e=0,a=d.length,f,g,c;for(;e<a;e++){f=d[e];g=f.user.screen_name;c=f.text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g,function(h){return'<a href="'+h+'">'+h+"</a>"}).replace(/\B@([_a-z0-9]+)/ig,function(h){return h.charAt(0)+'<a href="http://twitter.com/'+h.substring(1)+'">'+h.substring(1)+"</a>"});b.push("<li><span>"+c+'</span> <a style="font-size:85%" href="http://twitter.com/'+g+"/statuses/"+f.id_str+'">'+relative_time(f.created_at)+"</a></li>")}document.getElementById("twitter_update_list").innerHTML=b.join("")}function relative_time(c){var b=c.split(" ");c=b[1]+" "+b[2]+", "+b[5]+" "+b[3];var a=Date.parse(c),d=(arguments.length>1)?arguments[1]:new Date(),e=parseInt((d.getTime()-a)/1000);e=e+(d.getTimezoneOffset()*60);if(e<60){return"less than a minute ago"}else{if(e<120){return"about a minute ago"}else{if(e<3600){return(parseInt(e/60)).toString()+" minutes ago"}else{if(e<7200){return"about an hour ago"}else{if(e<86400){return"about "+(parseInt(e/3600)).toString()+" hours ago"}else{if(e<172800){return"1 day ago"}}}}}}return(parseInt(e/86400)).toString()+" days ago"};