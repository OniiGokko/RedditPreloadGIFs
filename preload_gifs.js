var devmode = true;
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
	while ( i-- ) {
		if ( links[i].tagName == 'A' && links[i].getAttribute('href') != null && links[i].getAttribute('href').slice(-4) == '.gif') {
			preload_gif(links[i].getAttribute('href'));
		}
	}
}

window.addEventListener('load', find_gifs());