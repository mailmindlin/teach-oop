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
if(logging)console.log('DragDrop initiated');