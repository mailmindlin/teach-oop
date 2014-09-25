window['protoStacks']=function(){
	var stack=Object.create(null);
	stack.stacks=$('.stack');
	stack['fix']=function(){
		for(var i=0;i<$('.stack').length;i++){
			if($('.stack').eq(i).find('ul').length<1){
				$('.stack').eq(i).append($('<ul></ul>'));
			}
		}
		$( ".stack" ).sortable({
				items: "li:not(.placeholder)",
				revert: 100,
				sort: function() {
					// gets added unintentionally by droppable interacting with sortable
					// using connectWithSortable fixes this, but doesn't allow you to customize active/hoverClass options
					$( this ).removeClass( "ui-state-default" );	
				},
				recieve: function(ev, ui){
					console.log('recieved');
					$(ui.item).addClass('block-instack').removeClass('block-inlist');
				},
				connectWith: '.stack-sortable'
			}).mouseup(function(){$( this ).find('.placeholder').remove();})
			.draggable({handle:'.stack-handle', appendTo: '.canvas', scroll:'true'})
			.on('contextmenu', function(e, ui){
				if(logging)console.log(e.currentTarget);
				if((!$(e.currentTarget).hasClass('stack')))return;
				e.preventDefault();
				$(e.currentTarget).append($('<custom-menu></custom-menu>').attr('style', 'position:fixed;z-index:99;top:' + e.clientY + ';left:'+ e.clientX + ';').html('<cmenu-item is="li" type="emulate">Emulate</cmenu-item><cmenu-item type="delete">Delete</cmenu-item>').disableSelection());
			})
		/*try{
			$('.stack').accordion({
				collapsable: true,
				heightStyle: "content",
				icons: {header: "ui-icon-circle-plus-thick", activeHeader: "ui-icon-circle-minus-thick"}
			});
		}catch(e){console.log('error with accordion.');}*/
			//attaches stuff to handle
// 			$('.stack-handle').attr('contenteditible','true');//WIP:better interface w/ typed code
			$('.stack-handle').dblclick(function(ev, ui){
			 	//rename thing
				$(this).html('<input class="stack-tb-rename" type="text"/>');
				$('.stack-tb-rename').attr('value', $(this).parent().data('callStr')).select().focus()
					.focusout(
						function(){
							$(this).parent().parent().data('callStr', $(this).val());
							$(this).parent().html($(this).val());
							$(this).remove();
						}
					);
				})
				.enableSelection();
			//support touches
			/*if(jQuery.support.touch){
				$handle=$('.stack-handle').Hoverable({disableHover:true,logging:false});
				$handle.newHover(function(){
					this.trigger('dblclick');//call renaming function
				});
			}*/
			//trashcan stuff
			{
			$('#trash img').addClass('stack-sortable')//allow it to recieve elements
				.sortable({
					items:'li:not(.placeholder), ul.stack',
					update: function(event, ui) {
						if(logging)console.log('DELETING BLOCK: ' + ui.item.data('name'));
						$(this).children().remove();
					},
					connectWith: '.stack-sortable'
				}).disableSelection();
			}
		return this;
	};
	stack['create']=function(px,py,top,callString){
		var stack=$('<ul></ul>').addClass('stack').addClass('stack-sortable')
			.attr('style', 'position:fixed;top:'+ py + 'px;left:'+px+'px;')
			.data('callStr', callString);
		$('.canvas').eq(0).append(stack);
		stack.html('<center class="stack-handle">'+ top +'</center>');
		window['Stack']['fix']();
		return stack;
	};
	stack.update=function(){
		this.stacks=$('.stack');
		return this;
	};
	stack.call=function(string){
		for(var i=0;i<this.update().stacks.length;i++){
			if($('.stack').eq(i).data('callStr')==string){
				return $('.stack').eq(i);
			}
		}
		return false;
	}
	stack.emulatable=function(stack){
		var arr=new Array();
		var ars=stack.find('li:not(.placeholder)');
		for(var i=0;i<ars.length;i++){
			var cblock=Blocks.getBlock(ars.eq(i).data('blockName'));
			cblock['htmlText']=ars.eq(i).html();
			arr.push(cblock);
		}
		return arr;
	}
	stack.fix();//fixes stacks
	return stack;
}
console.log("ititializing stack...");
window['Stack']=window['protoStacks']();
if(logging)console.log('Stacks initiated');