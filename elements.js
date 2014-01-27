//my code
var defaults=new Array();
defaults.stringInputValue='Enter Some Text';
var StringInputPrototype = Object.create(HTMLElement.prototype);
StringInputPrototype.createdCallback=function(){console.log('created');this.attributeChangedCallback()};
StringInputPrototype.attributeChangedCallback = function() {
	console.log('updating');
	if(typeof $(this).attr('value') !== 'undefined'){
		this.textContent = "["+$(this).attr('value')+"]";
	}else{
		$(this).attr('value', defaults.stringInputValue);//calls function again, setting the text
	}
	$(this).on('click', function(){
		if($(this).html().contains('<input')){this.a.focus();return;}
		console.log('clicked');
  		var a=$('<input />').attr('type', 'text').attr('value', $(this).attr('value')).addClass('StringInput-tb');//create textbox
  		$(this).html('[').append(a);//insert textbox
  		$(this).html($(this).html()+']');//add ']' for l&f
  		//handles handles textboxes
  		var strInput=$('.StringInput-tb').focusout(function(){
  			console.log('focus out');
  			$(this).parent().attr('value', '')//clears the attribute, so that the attributeChangedCallback is called
  			.delay(5).attr('value', $(this).val());//sets the value to the data
  			$(this).remove();//removes self, cleans up
  		});
  		console.log(strInput);
  		strInput.focus();
  	});
};
StringInputPrototype.simClick = function(){
	console.warn('StringInputPrototype.simClick is depreciated. Use trigger \'click\' instead');
	this.innerHTML='<input type="text" value="'+$(this).data('value')+'"/>';
};
var StringInput = document.registerElement('string-input', {
  prototype: StringInputPrototype
});
var CustomMenuPrototype = Object.create(HTMLUListElement.prototype);
CustomMenuPrototype.createdCallback=function(){
	$(this).menu({menus:'custom-menu'});
	//.on('close', this.close());
	$('body').on('click', function(e,ui){console.log('closing');$('custom-menu').delay(500).remove()});
};/*
CustomMenuPrototype.close=function(e,ui){
	$(this).remove();
};*/
var CustomMenu=document.registerElement('custom-menu', {prototype: CustomMenuPrototype});//register
var CustomMenuItemPrototype = Object.create(HTMLLIElement.prototype);
CustomMenuItemPrototype.createdCallback=function(){
	if($(this).attr('type')=='emulate'){
		$(this).click(function(){
			console.log('emulating');
			var el=$(this);
			var i=0;
			var targClass='stack';
			if(typeof $(this).attr('target') !== 'undefined'){targClass=$(this).attr('target');}
			while(!el.hasClass(targClass)){
				el=el.parent();
				if(i>5){console.log('error');return;}
				i++;
			}
			console.log(el);
			Emulator.emulateStack(el.data('callStr'));
		});
	}else if($(this).attr('type')=='delete'){
		$(this).click(function(){
			var el=$(this);
			console.log('hi'+el.attr('class'));
			var i=0;
			var targClass='stack';
			//if((typeof $(this).attr('target') !== 'undefined')&&($(this).attr('target')!=="")){targClass=$(this).attr('target');}
			while(! el.hasClass(targClass)){
				el=el.parent();
				if(i>5){console.log('error, ' + targClass);return;}
				i++;
			}
			el.remove();
		});
	}
}
var CustomMenuItem=document.registerElement('cmenu-item', {prototype:CustomMenuItemPrototype});
console.log('Elements initiated');