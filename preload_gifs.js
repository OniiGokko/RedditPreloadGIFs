var devmode = true;
function preload_gif(url) {
	var img = document.createElement('img');
	img.src = url;
	if(devmode == false) {
		img.style.display = 'none';
	}
	document.body.appendChild(img);
	img.onload = function() {
		clearTimeout(timeout);
		if(devmode == false) {
			img.parentNode.removeChild(img);
		}
	};
	var timeout = setTimeout(function() { if(img) { img.parentNode.removeChild(img); } }, 30000);
}

function frame_done(id, frame) {
	frame.parentNode.removeChild(frame);
}

function find_gifs() {
	var links = document.getElementsByClassName('title');
	var i = links.length;
	while ( i-- ) {
		if ( links[i].tagName == 'A' && links[i].getAttribute('href') != null && links[i].getAttribute('href').slice(-4) == '.gif' ) {
			preload_gif(links[i].getAttribute('href'));
		}
	}
}

window.addEventListener('load', function() { setTimeout(1000, find_gifs()); });