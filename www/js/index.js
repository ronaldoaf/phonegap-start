/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
window.localStorage['alertas_vistos']=window.localStorage['alertas_vistos'] || '[]';

 
 
 var alertar = function (title, text, vibrate,id) {
	var now = new Date().getTime(),
		tempo= new Date(now + 1 * 1000);

	var sound = device.platform == 'Android' ? 'file://sound.mp3' : 'file://beep.caf';
	
	//Se já tiver visto recente nao manda alerta
	if($.inArray(id, JSON.parse(window.localStorage['alertas_vistos']) )) return;
	
	cordova.plugins.notification.local.schedule({
		id: id,
		title: title,
		text: text,
		at: tempo,
		sound: sound,
		badge: 12
	});
	
	
	
	
	
	
	//Quando acontece a notificação
	cordova.plugins.notification.local.on("trigger", function (notification) {
       
		
		navigator.vibrate(vibrate);
		
    });
	
	//Quando se clica na notificação
	cordova.plugins.notification.local.on("click", function (notification) {
	
		alertas_vistos=JSON.parse(window.localStorage['alertas_vistos']);
		
		alertas_vistos.push(notification.id);
		
		window.localStorage['alertas_vistos']=JSON.stringify( alertas_vistos );
	
		window.open('https://mobile.bet365.com/#type=InPlay;key=;ip=1;lng=1','_system');
	});
	
	
}; 
 

 //Verifica a cada 5 segundos
setInterval(function(){	
	$.getJSON('http://aposte.me/live/alerta.php', function(data){ 
		if(data.alerta) alertar(data.title, data.text, data.vibrate, data.id);
	});
},30000);
	
alertar();
 
 
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
		
		
		
		
    }
};
