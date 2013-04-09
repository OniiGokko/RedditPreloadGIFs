var devmode = true;
var ns = 0; // 0 = all, 1 = only non-nsfw, 2 = only nsfw
var NERCount = 0;
function preload_gif(url, link) {
	var img = document.createElement('img');
	img.src = url;
	img.style.display = 'none';
	document.body.appendChild(img);
	img.onload = function() {
		clearTimeout(timeout);
		if(devmode == false) {
			img.parentNode.removeChild(img);
		} else {
			//img.style.display = 'inline';
			img.parentNode.removeChild(img);
			link.style.backgroundColor = "gray";
		}
		var classes = link.className;
		link.className = classes+' pgloaded';
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
	//var i = links.length;
	var href;
	for (var i in links) {
		if(links[i].constructor == HTMLAnchorElement) {
			href = links[i].getAttribute('href');
		} else {
			continue;
		}
		if(href == null) {
			continue;
		} else if(links[i].className.match(new RegExp('(\\s|^)'+'pgloaded'+'(\\s|$)'))) {
			continue;
		} else if ( links[i].tagName == 'A' && href != null && (
				href.slice(-4) == '.gif'
				|| href.search('.gif?') > 0)
				/*|| (document.URL.search('gif') > -1 && href.search('imgur.com') >= 0 && href.search('imgur.com/a/') == -1) // if on a gif reddit try and preload imgur GIFs linked to page instead of GIF*/
			) {
			/*if(href.search('imgur.com') >= 0 && href.search('imgur.com/a/') == -1) {
				href = href + '.gif';
			}*/
			if(ns == 1) {
				if(links[i].parentNode.parentNode.childNodes[2].getElementsByClassName('nsfw-stamp').length == 0) {
					preload_gif(href, links[i]);
				}
			} else if(ns == 2) {
				if(links[i].parentNode.parentNode.childNodes[2].getElementsByClassName('nsfw-stamp').length > 0) {
					preload_gif(href, links[i]);
				}
			} else {
				preload_gif(href, links[i]);
			}
		}
	}
}

function checkNER() {
	var ner = document.getElementsByClassName('NERPageMarker').length;
	if(ner > NERCount) {
		NERCount++;
		find_gifs();
	} else {
		return false;
	}
}

window.addEventListener('load', find_gifs());
window.setInterval(checkNER, 500);