//window.js
{
	if(window['c']===void 0)window['c']=Object.create(null);
	window['c']['window']=function(){
		var windows=Object.create(null);
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
			windows.getCtx().drawImage(img, x, y);
		};
		windows.setBackground=function(col){
			var context=windows.getCtx();
			context.beginPath();
	    	context.rect(188, 50, 200, 100);
	    	context.fillStyle = col;
	    	context.fill();
	    	context.stroke();
	    };
		return windows;
	};
}