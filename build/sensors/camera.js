var Camera;
function cameraConstructor(){
	var camera=new Object();
	//converts an RGBA array into  R, G, B, A arrays, for easier manipulation
	camera.simplifyArray=function (arr){
		var arrR=new Array();
		var arrG=new Array();
		var arrB=new Array();
		var arrA=new Array();
		for(var i=0;i<arr.length/4;i++){
			arrR[i]=arr[i*4+0];
			arrG[i]=arr[i*4+1];
			arrB[i]=arr[i*4+2];
			arrA[i]=arr[i*4+3];
		}
		return [arrR,arrG,arrB,arrA];
	};
	//converts R, G, B, A arrays into an RGBA array, for drawing to canvases
	camera.complexifyArr=function (arrR, arrG, arrB, arrA){
		var arr=new Array();
		for(var i=0;i<Math.min(arrR.length,arrG.length,arrB.length,arrA.length);i++){
			arr[i*4+0]=arrR[i];
			arr[i*4+1]=arrG[i];
			arr[i*4+2]=arrB[i];
			arr[i*4+3]=arrA[i];
		}
		return arr;
	};
	//draws a base64 string to a canvas
	camera.draw64ToCanvas=function (string64, canvas){
		var img=new Image();
		img.src="data:image/png;base64,"+string64;
		var ctx=canvas.getContext('2d');
		img.onload=function(){
			ctx.drawImage(img, 0,0);
			img=null;
		};
	};
	//gets a base64 string representation of the current camera image
	camera.get64=function (){
		return $.scriptcam.getFrameAsBase64();
	};
	camera.internalStorage=new Array();
	//activates the webcam
	camera.init=function(){
		//remove all other 
		/*$('#webcam-ask, #webcam-hide, #webcam-dialog').remove();
		$('body').append($('<div></div>').attr('id', 'webcam-dialog'));
		//webcam-ask is shown in a popup, asking for access to 
		$('#webcam-dialog').append($('<div id="webcam-ask"></div>').css('top', $(window).height()-(320/2)))
		.dialog();
		$('#webcam-ask').scriptcam({
		onWebCamReady:webcamReady,
		showMicrophoneErrors:false,
        onError:onError
		});*/
		$('body').append($('<div></div>').attr('id', 'webcam'));
		$('#webcam').scriptcam();
	};
	camera.update=function(){
		this.internalStorage=this.get64();
	};
	return camera;
}
Camera=cameraConstructor();
function onError(e){
	alert(e);
}
function webcamReady(cameraNames,camera,microphoneNames,microphone,volume) {
	console.log(["webcam ready", cameraNames, camera, microphoneNames, microphone, volume]);
	var webcam=$('#webcam-ask').attr('id', '#webcam-hide');
	$('body').append(webcam);
	$('#webcam-dialog').dialog("close");
    $.each(cameraNames, function(index, text) {
        $('#cameraNames').append( $('<option></option>').val(index).html(text) );
    });
    $('#cameraNames').val(camera);
}