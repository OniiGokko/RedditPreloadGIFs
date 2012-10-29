var devmode = true;
var ns = 1; // 0 = all, 1 = only non-nsfw, 2 = only nsfw
function preload_gif(url) {
	var img = document.createElement('img');
	img.src = url;
	img.style.display = 'none';
	document.body.appendChild(img);
	img.onload = function() {
		clearTimeout(timeout);
		if(devmode == false) {
			img.parentNode.removeChild(img);
		} else {
			img.style.display = 'inline';
		}
	};
	if(devmode == false) {
		var timeout = setTimeout(function() { if(img) { img.parentNode.removeChild(img); } }, 30000);
	} else {
		img.onclick = new Function("remove_thumb(this)");
	}
}

function remove_thumb(that) {
that.parentNode.removeChild(that);
}

function find_gifs() {
	var links = document.getElementsByClassName('title');
	var i = links.length;
	var href;
	while ( i-- ) {
		href = links[i].getAttribute('href');
		if(href == null) {
			continue;
		}
		if ( links[i].tagName == 'A' && href != null && (
			href.slice(-4) == '.gif'
			|| href.search('.gif?') > 0)
			/*|| (document.URL.search('gif') > -1 && href.search('imgur.com') >= 0 && href.search('imgur.com/a/') == -1) // if on a gif reddit try and preload imgur GIFs linked to page instead of GIF*/
		) {
			/*if(href.search('imgur.com') >= 0 && href.search('imgur.com/a/') == -1) {
				href = href + '.gif';
			}*/
			if(ns == 1) {
				if(links[i].parentNode.parentNode.childNodes[2].getElementsByClassName('nsfw-stamp').length == 0) {
					preload_gif(href);
				}
			} else if(ns == 2) {
				if(links[i].parentNode.parentNode.childNodes[2].getElementsByClassName('nsfw-stamp').length > 0) {
					preload_gif(href);
				}
			} else {
				preload_gif(href);
			}
		}
	}
}

window.addEventListener('load', find_gifs());