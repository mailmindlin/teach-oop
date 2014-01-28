//my code
var defaults=new Array();
defaults.stringInputValue='Enter Some Text';
var StringInputPrototype = Object.create(HTMLElement.prototype);
StringInputPrototype.createdCallback=function(){
	if(logging)console.log('created');
	if(isset($(this).attr('accept')))$(this).droppable({
		accept: $(this).attr('accept'),
		drop: function(e,ui){
			var dataType=ui.draggable.data('name');
			var el;
			if(isset(Data.registeredTypes[dataType])){el=Data.registeredTypes[dataType].inlineElement();}else{return;}
			$(this).data('value', el.html());
			$(this).attr('value', Data.registeredTypes[dataType].activeString());
		}
	});
	this.attributeChangedCallback()
};
StringInputPrototype.attributeChangedCallback = function() {
	if(logging)console.log('updating');
	if(isset($(this).data('value'))){
		console.log('data');
		this.textContent = "["+$(this).data('value')+"]";
	}else{
		if(typeof $(this).attr('value') !== 'undefined'){
			this.textContent = "["+$(this).attr('value')+"]";
		}else{
			$(this).attr('value', defaults.stringInputValue);//calls function again, setting the text
		}
	}
	$(this).on('click', function(){
		if($(this).html().contains('<input'))return;
		if(logging)console.log('Event registered: string-input clicked');
  		var a=$('<input />').attr('type', 'text').attr('value', $(this).attr('value')).addClass('StringInput-tb');//create textbox
  		$(this).html('[').append(a);//insert textbox
  		$(this).html($(this).html()+']');//add ']' for l&f
  		//handles handles textboxes
  		var strInput=$('.StringInput-tb').focusout(function(){
  			if(logging)console.log('Registered event: fosusing out of string-input textbox');
  			$(this).parent().attr('value', '')//clears the attribute, so that the attributeChangedCallback is called
  			.delay(5).attr('value', $(this).val());//sets the value to the data
  			$(this).remove();//removes self, cleans up
  		});
  		if(logging)console.log(strInput);
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

//custom menu
CustomMenuPrototype.createdCallback=function(){
	$(this).menu({menus:'custom-menu'});
	//.on('close', this.close());
	$('body').on('click', function(e,ui){if(logging)console.log('closing');$('custom-menu').delay(500).remove()});
};/*
CustomMenuPrototype.close=function(e,ui){
	$(this).remove();
};*/
var CustomMenu=document.registerElement('custom-menu', {prototype: CustomMenuPrototype});//register
var CustomMenuItemPrototype = Object.create(HTMLLIElement.prototype);
CustomMenuItemPrototype.createdCallback=function(){
	if($(this).attr('type')=='emulate'){
		$(this).click(function(){
			if(logging)console.log('emulating');
			var el=$(this);
			var i=0;
			var targClass='stack';
			if(typeof $(this).attr('target') !== 'undefined'){targClass=$(this).attr('target');}
			while(!el.hasClass(targClass)){
				el=el.parent();
				if(i>5){console.log('error');return;}
				i++;
			}
			if(logging)console.log(el);
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
				if(i>5){console.err('error, ' + targClass);return;}
				i++;
			}
			el.remove();
		});
	}
}
var CustomMenuItem=document.registerElement('cmenu-item', {prototype:CustomMenuItemPrototype});
if(logging)console.log('Elements initiated');

//adaptable input (not yet used)
var AdaptableInputPrototype = Object.create(HTMLElement.prototype);
AdaptableInputPrototype.createdCallback = function() {
	var type=$(this).attr('type');
	if(((type!="string") && (type !="number")) && (type !="bool")){$(this).attr('type', 'string');type='string';}
}
AdaptableInputPrototype.attributeChangedCallback = function() {
	if(logging)console.log('updating');
	if(typeof $(this).attr('value') !== 'undefined'){
		this.textContent = "["+$(this).attr('value')+"]";
	}else{
		$(this).attr('value', defaults.stringInputValue);//calls function again, setting the text
	}
	$(this).on('click', function(){
		if($(this).html().contains('<input')){this.a.focus();return;}
		if(logging)console.log('Event registered: string-input clicked');
  		var a=$('<input />').attr('type', 'text').attr('value', $(this).attr('value')).addClass('StringInput-tb');//create textbox
  		$(this).html('[').append(a);//insert textbox
  		$(this).html($(this).html()+']');//add ']' for l&f
  		//handles handles textboxes
  		var strInput=$('.AdaptableInput-tb').focusout(function(){
  			if(logging)console.log('Registered event: fosusing out of string-input textbox');
  			var type=$(this).parent().attr('type');
  			if(type=="number"){
  				var pattern = /[^a-zA-Z,!@#$%\^&\*\\]/g;
  				
  				
  			$(this).parent().attr('value', '')//clears the attribute, so that the attributeChangedCallback is called
  			.delay(5).attr('value', $(this).val());//sets the value to the data
  			$(this).remove();//removes self, cleans up
  		}});
  		if(logging)console.log(strInput);
  		strInput.focus();
  	});
};