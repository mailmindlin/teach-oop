//webcam.js by mailmindlin. All rights are reserved. This software, any software implementing this, and any subcomponent or derivative work of this software is provided 'as is'.
//All derivative works based upon or inspired by this software must be open sourced
function Webcam(){
	var webcam=new Object();
	webcam.hasAccess=function(){
		return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
	};
	webcam.getFn=function(){
		if(navigator.getUserMedia)return "getUserMedia";
		if(navigator.webkitGetUserMedia)return "webkitGetUserMedia";
		if(navigator.mozGetUserMedia)return "mozGetUserMedia";
		if(navigator.msGetUserMedia)return "msGetUserMedia";
		return function(){console.err('No getUserMedia available');};
	};
	webcam.error=function(e){
		if(e['name']=="PermissionDeniedError"){
			console.error('Permission Denied!', e);
		}else{
			console.error(e);
		}
	};
	webcam.stream=function(stream){
		console.log('streaming');
	};
	webcam.init=function(){
		var w=this;
		var str=w.stream;
		var err=w.error;
		navigator[w.getFn()]({video:true, audio:true}, str , err);
	};
	return webcam;
}
var webcam=Webcam();
console.log('Webcam initialized');
					