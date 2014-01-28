var logging=false;
function load(){
	if(logging)console.log('Loading: Blocks');
	Blocks.init();
	if(logging)console.log('Loading: internal');
	//$('.block-inlist').draggable({helper:'clone', appendTo:'body'}).disableSelection();
	$('#objects ul').sortable({connectWith: '.stack-sortable', remove:function(){Blocks.draw()}});
	$('.createStack').draggable({helper:'clone', appendTo: '.canvas', stop: createStack}).disableSelection();
	if(logging)console.log('Loading: Stacks');
	$('body>div').bind('dragstart', function(e,ui){e.stopPropagation();});
	Stack=protoStacks();
	//load();
	if(logging)console.log('done');
}
String.prototype.contains=function(test){return this.indexOf(test)>=0;};
String.prototype.replaceAll=function(needle, thing){if(needle.length==0)return false;var sudoMe=this;while(sudoMe.contains(needle)){sudoMe=sudoMe.replace(needle, thing);};return sudoMe;};
String.prototype.replaceSelf=function(needle, replacement){this=this.replace(needle, replacement);};
function isset(thing){return typeof thing !== 'undefined';}
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
	Stack.create(ui.position.left, ui.position.top, "generated", "generated");
}
function setCookie(cname,cvalue,exdays){
var d = new Date();
d.setTime(d.getTime()+(exdays*24*60*60*1000));
var expires = "expires="+d.toGMTString();
document.cookie = cname+"="+cvalue+"; "+expires;
}
function getCookie(cname){
var name = cname + "=";
var ca = document.cookie.split(';');
for(var i=0; i<ca.length; i++) 
  {
  var c = ca[i].trim();
  if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
return "";
}
function save(){
	setCookie('SAVE1', $('.canvas').html(), 2);
}
function loadFromCookie(){
	$('.canvas').html(getCookie('SAVE1'));
}
if(logging)console.log('DragDrop initiated');