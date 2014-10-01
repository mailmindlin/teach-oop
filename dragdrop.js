window['logging']=false;
window['load']=function(){
	console.log("Ititializing...");
	console.log('\t>Stack');
	window['Stack']=window['c']['stack']();
	console.log('\t>Emulator');
	window['Emulator']=window['c']['emulator']();
	console.log('\t>Blocks');
	window['Blocks']=window['c']['Blocks']();
	window['c']['block_init']();
	console.log('\t>Data');
	window['Data'] = window['c']['data']();
	window['c']['data_init']();
	
	if(logging)console.log('Loading: Blocks');
	window['Blocks']['init']();
	if(logging)console.log('Loading: internal');//dragging/dropping stuff
	//$('.block-inlist').draggable({helper:'clone', appendTo:'body'}).disableSelection();
	$('#objects ul').sortable({connectWith: '.stack-sortable', revert:100, remove:function(){Blocks.draw();Data.refresh();}});
	$('.createStack').draggable({helper:'clone', appendTo: '.canvas', stop: createStack}).disableSelection();
	$('body>div').bind('dragstart', function(e,ui){e.stopPropagation();});
	window['Data']['refresh']();
	window['loadFromCookie']();//load state
	if(logging)console.log('Done loading.');
}
String.prototype['contains']=function(t){return this.indexOf(t)>=0;};
String.prototype['replaceAll']=function(needle, thing){if(needle.length==0)return false;var sudoMe=this;while(sudoMe.contains(needle)){sudoMe=sudoMe.replace(needle, thing);};return sudoMe;};
window['isset']=function(thing){return typeof thing !== 'undefined'}
//for getting positions
window['findPos']=function(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
		return [curleft,curtop];
	}
};
	
window['createStack']=function(e, ui){
	//console.log(ui);
	var name = $('.stack').length==0?"main":"function";
	Stack.create(ui.position.left, ui.position.top, "main", "main");
};
window['setCookie']=function(cname,cvalue,exdays){
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));//(hours/day)*(min/hour)*(sec/min)*(ms/sec)
	var expires = "expires="+d.toGMTString();
	document.cookie = cname+"="+cvalue+"; "+expires;
};
window['getCookie']=function(cname){
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++){
		var c = ca[i].trim();
		if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	}
	return "";
};
function save(){
	var html=$('.canvas').html().trim().replaceAll(';', '$SEMICOLON').replaceAll(' ', '$SPACE').replaceAll("\n", '$NEWLINE').replaceAll("\t", "$TAB");
	if(logging)console.log(html);
	setCookie('SAVE1', html, 30);
}
function loadFromCookie(){
	var html=getCookie('SAVE1').replaceAll('$SEMICOLON', ';').replaceAll('$SPACE', ' ').replaceAll("$NEWLINE", "\n").replaceAll("$TAB", "\t");
	if(logging)console.log(html);
	$('.canvas').html(html);
	Blocks.draw();
	Stack.fix();
}
function clear(){
	setCookie('SAVE1','',30);
}
//capture log to event
(function(){
    var oldLog = console.log;
    console.log = function (message) {
       	var event=document.createEvent('Event');
       	event._args=arguments;
       	event.initEvent('logMessage',true,true);
       	event.__defineGetter__("message",function(){return message;});
       	event.__defineGetter__("args",function(){return event._args;});
//        	window.dispatchEvent(event);
        oldLog.apply(console, arguments);
    };
})();
if(logging)console.log('DragDrop initiated');