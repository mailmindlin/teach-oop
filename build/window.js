//window.js
function Window(){
	var windows=new Object();
	windows.create=function(){
		$('#window').remove();
		$('.canvas').append($('<canvas></canvas>').attr('id', 'window'));
	};
	windows.getCtx=function(){
		if($('#window').length == 0){
			Window().create();
		}
		return document.querySelector('#window').getContext('2d')
	};
	windows.drawImage=function(img, x, y){
		this.getCtx().drawImage(img, x, y);
	};
	windows.setBackground=function(col){
		var context=this.getCtx();
		context.beginPath();
    	context.rect(188, 50, 200, 100);
    	context.fillStyle = col;
    	context.fill();
    	context.stroke();
    };
	return windows;
}
var Windows=Window();