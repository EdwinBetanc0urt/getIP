function getIP_Privada( psVersion = "4" ) {
	laIP = "_____";
	//compatibilidad para firefox y chrome
	window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
	var Dispositivo = new RTCPeerConnection( {iceServers:[]} ), noop = function(){};

	//crear un canal de datos falso
	Dispositivo.createDataChannel("");

	//crear oferta y establecer descripción local
	Dispositivo.createOffer( Dispositivo.setLocalDescription.bind( Dispositivo ), noop );

	//escucha los eventos candidatos
	Dispositivo.onicecandidate = function( ice ) {


		if(!ice || !ice.candidate || !ice.candidate.candidate)  
			return;

		//detecta que version de IP privada se desea extraer
		if ( psVersion == "4" || psVersion == 4 ) {
			expresionIp = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/;
		}

		else if ( psVersion == "6" || psVersion == 6 ) {
			expresionIp = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{1,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})|([0-9a-fA-F]{1,4}:){1,4}:([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7}))/;
		}

		else {
			expresionIp = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/;
		}
		//version de la ip seleccionada de la expresion
		//console.log( "la version de ip es " + psVersion);

		miIP = String( expresionIp.exec( ice.candidate.candidate )[1] );


		laIP = miIP;

		//evita que se repitan o impriman todas las ip
		Dispositivo.onicecandidate = noop;

		console.log('la IP version ' + psVersion + ' es: ' + miIP);
		return(laIP);
	}


	return laIP;
} //cierre de la funcion get IP




//no devuelve la funcion
ip = getIP_Privada( 4);


console.log('la numero de ip de salida  es: ' + ip);   
