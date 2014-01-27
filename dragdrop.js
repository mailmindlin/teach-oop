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