window['logging']=false;
window['load']=function(){
	console.log("Ititializing...");
	window['Stack']=window['c']['stack']();
	window['Emulator']=window['c']['emulator']();
	window['Blocks']=window['c']['block']();
	
	if(logging)console.log('Loading: Blocks');
	Blocks.init();
	if(logging)console.log('Loading: internal');
	//$('.block-inlist').draggable({helper:'clone', appendTo:'body'}).disableSelection();
	$('#objects ul').sortable({connectWith: '.stack-sortable', revert:100, remove:function(){Blocks.draw();Data.refresh();}});
	$('.createStack').draggable({helper:'clone', appendTo: '.canvas', stop: createStack}).disableSelection();
	$('body>div').bind('dragstart', function(e,ui){e.stopPropagation();});
	Data.refresh();
	loadFromCookie();//load state
	$('.bModal').remove();
	if(logging)console.log('Done loading.');
}
String.prototype.contains=function(test){return this.indexOf(test)>=0;};
String.prototype.replaceAll=function(needle, thing){if(needle.length==0)return false;var sudoMe=this;while(sudoMe.contains(needle)){sudoMe=sudoMe.replace(needle, thing);};return sudoMe;};
function isset(thing){return thing !== void(0);}
//for getting positions
function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
		return [curleft,curtop];
	}
}
	
function createStack(e, ui){
	//console.log(ui);
	var name = $('.stack').length==0?"main":"function";
	Stack.create(ui.position.left, ui.position.top, "main", "main");
}
function setCookie(cname,cvalue,exdays){
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));//(hours/day)*(min/hour)*(sec/min)*(ms/sec)
	var expires = "expires="+d.toGMTString();
	document.cookie = cname+"="+cvalue+"; "+expires;
}
function getCookie(cname){
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++){
		var c = ca[i].trim();
		if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	}
	return "";
}
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
if(logging)console.log('DragDrop initiated');