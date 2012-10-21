function preload_gif( url ) {
	var frame = document.createElement( 'iframe' );
	frame.src = url;
	frame.style.display = 'none';
	document.body.appendChild( frame );
}

function find_gifs() {
	var links = document.getElementsByTagName( 'a' );
	var i = links.length;
	
	while ( i-- ) {
		if ( links[i].getAttribute( 'href' ) != null && links[i].getAttribute( 'href' ).slice( -3 ) == 'gif' ) {
			preload_gif( links[i].getAttribute( 'href' ) );
		}
	}
}

window.addEventListener( "load", find_gifs() );