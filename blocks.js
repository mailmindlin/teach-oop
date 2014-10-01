if(window['c']===void 0)window['c']=Object.create(null);
window['c']['Blocks']=function(){
	var blocks=Object.create(null);
	//array of registered blocks
	blocks.registeredBlocks=new Array();
	//array of registered types
	blocks['registeredTypes']=new Array();
	blocks.metaTypes=new Array();
	blocks.init=function(){
		for(var i=0;i<this.registeredBlocks.length;i++){
			var parsedText=this.registeredBlocks[i].text;
			var hasValidType=isset(this.registeredTypes[this.registeredBlocks[i].type]);
			if((hasValidType) && (typeof this.registeredTypes[this.registeredBlocks[i].type].textParser === 'function'))parsedText=this.registeredTypes[this.registeredBlocks[i].type].textParser(this.registeredBlocks[i]);
			if(typeof this.registeredBlocks[i].textParser === 'function')parsedText=this.registeredBlocks[i].textParser(this.registeredBlocks[i]);
			var obj=$('<li></li>').data('blockName', this.registeredBlocks[i].name).data("text", this.registeredBlocks[i].text).data("fn", this.registeredBlocks[i].call)
			.html(parsedText).addClass('block').addClass('block-inlist');
			if(hasValidType){obj.addClass(this.registeredTypes[this.registeredBlocks[i].type].defaultClass);}
			$('#objects ul').append(obj);
		}
	};
	//registers a new block
	blocks.registerNew=function(data){
		//this is important. Note: find out why
		if(!isset(data['standalone']))data['standalone']=true;
		//store it
		blocks.registeredBlocks.push(data);
	};
	//registers a new block type. Stores it in blocks.registeredTypes, under key=type name.
	blocks.registerType=function(data){
		blocks.registeredTypes[data.name]=data;
	}
	//evaluates the block (executes the block function, and returns whatever the function did.
	blocks.evaluate=function(name, text, emulatable, index){
		if(typeof name === 'string'){
			var b=this.getBlock(name);
			if(b!=false){return b.call(text,null,emulatable,index);}
		}else{
			var type=this.getType(name);
			if(type !== 'NONE' && (typeof type.paramParser === 'function')){
				return name.call(text, type.paramParser(text),emulatable,index);
			}else{
				return name.call(text,null,emulatable,index);
			}
		}
	};
	blocks.getType=function(block){
		var type=this.registeredTypes[block.type];
		return isset(type) ? type : 'NONE';//I use ternary operators because im awesome like that
	};
	blocks.getBlock=function(name){
		for(var i=0;i<this.registeredBlocks.length;i++){
			if(blocks.registeredBlocks[i].name==name){
				return blocks.registeredBlocks[i];
			}
		}
		return false;
	};
	/**
		Draws a list of all blocks in the objects list. Also calls Data.draw()
	*/
	blocks.draw=function(){
		$('#objects ul .block').remove();
		for(var i=0;i<this.registeredBlocks.length;i++){
			var parsedText=this.registeredBlocks[i].text;
			var hasValidType=(typeof this.registeredTypes[this.registeredBlocks[i].type] !== 'undefined');
			if((hasValidType) && (typeof this.registeredTypes[this.registeredBlocks[i].type].textParser === 'function'))parsedText=this.registeredTypes[this.registeredBlocks[i].type].textParser(this.registeredBlocks[i]);
			if(typeof this.registeredBlocks[i].textParser === 'function')parsedText=this.registeredBlocks[i].textParser(this.registeredBlocks[i]);
			var obj=$('<li></li>').data('blockName', this.registeredBlocks[i].name).data("text", this.registeredBlocks[i].text).data("fn", this.registeredBlocks[i].call)
			.html(parsedText).addClass('block').addClass('block-inlist');
			if((hasValidType) && typeof this.registeredTypes[this.registeredBlocks[i].type].defaultClass === 'string')obj.addClass(this.registeredTypes[this.registeredBlocks[i].type].defaultClass);
			if((hasValidType) && typeof this.registeredTypes[this.registeredBlocks[i].type].creator === 'function')obj=this.registeredTypes[this.registeredBlocks[i].type].creator(obj);
			$('#objects ul').append(obj);
		}
		Data.draw();
		//$('.block').draggable({connectToSortable:'.stack',revert:"invalid", stop:this.draw});
	};
	return blocks;
}
//parses complex inputs.
//Basically fixes sensor references 
window['fixVal']=function(s){
	//fix sensors
	var s1=s;
	s=s.replaceAll("SENSOR:GYRO-X", AccelerometerConstruct.x.toString());
	s=s.replaceAll("SENSOR:GYRO-Y", AccelerometerConstruct.y.toString());
	s=s.replaceAll("SENSOR:GYRO-Z", AccelerometerConstruct.z.toString());
	s=s.replaceAll("SENSOR:GRAV-X", AccelerometerConstruct.xGrav.toString());
	s=s.replaceAll("SENSOR:GRAV-Y", AccelerometerConstruct.yGrav.toString());
	s=s.replaceAll("SENSOR:GRAV-Z", AccelerometerConstruct.zGrav.toString());
	if(logging==true||logging>=1)console.log([s1,s]);
	return s;
};
/*
Block/type definitions:
Types:
	required fields: (String)name
	optional fields: (String)defaultClass, (function)textParser, (function)paramParser, (boolean)standalone
Blocks:
	required fields: (String)name, (String)text, (function)call
	optional fields: (String)type, (String)desc
*/
//register types
window['c']['block_init']=function(){
Blocks.registerType({name:'native-function', defaultClass: 'block-type-fn', textParser: function(block){return block.text.replace("@TEXTPARAM", "<string-input/>");}, paramParser:function(text){
	var regex=/value=["'][\w\s-:\.,!@#]+["']/g;
	var arr=text.match(regex);
	for(key in arr){
		arr[key]=arr[key].substring(7, arr[key].length-1);
	}
	return fixVal(arr[0]);
	}});
Blocks.registerType({name:'variable', standalone:true, defaultClass: 'block-type-variable',
	textParser: function(block){return block.text.replace("variable @VARNAME", "<string-input value='variable' name='varname'></string-input>").replace("@VARSELECT", "<variable-selector/>").replace("value @STRING", "<string-input value='value' name='value'></string-input>");},
	paramParser: function(string){
		var regexValue=/value=["'][\w\s-:\.,!@#]+["'](?= name=['"]value['"])/g;
		var regexVarName=/value=["'][\w\s-:\.,!@#]+["'](?= name=['"]varname['"])/g;
		var val=string.match(regexValue);
		var name=string.match(regexVarName);
		for(key in val)
			val[key]=val[key].substring(7, val[key].length-1);
		for(key in name)
			name[key]=name[key].substring(7, name[key].length-1);
		var arr=new Array();
		arr['VARNAME']=name;
		arr['VALUE']=val;
		return arr;
	}});
Blocks.registerType({name:"camera", defaultClass: 'block-type-camera'});
//register blocks
Blocks.registerNew({name:"log", text:"log @TEXTPARAM ", call:function(){console.log('hi');}, type:'native-function'});
Blocks.registerNew({name:"parseTest", text:"Alert @TEXTPARAM", type:'native-function', call:function(tparam, tp1){alert(tp1);}});
Blocks.registerNew({name:"callFn", text:"Call @TEXTPARAM", type:'native-function', call: function(tparam,tp1){ Emulator.emulateStack(tp1);}});
Blocks.registerNew({name:"stop",text:"Stop",type:"native-function",call:function(){return 'cancel-execution';}, desc: "Stops the execution of the stack."});
Blocks.registerNew({name:"delay",text:"wait for @TEXTPARAM seconds",type:'native-function',call: function(a,b,e,i){var f=Emulator.getShiftedEmulatable(e,parseInt(i));setInterval(function(){Emulator.emulate(f);},parseInt(i));return 'cancel-execution';}, desc:"Pauses stack emulation for the given number of seconds."});
//camera blocks
// Blocks.registerNew({name:"cameraInitiator", text:"Start camera", type:'camera', call: function(){ Camera.init();}});//old ScriptCam block
Blocks.registerNew({name:"html5CameraStart", text:"Start camera with HTML5", type:'camera', call: function(){ webcam.init(); }});
Blocks.registerNew({name:"saveVar",	text:"Save variable @VARNAME to value @STRING",	type:'variable',	call:function(tparam, tp1){setCookie(tp1['VALUE'][0],Emulator.scope.vars[tp1['VARNAME'][0]],90)},desc:"Saves the given variable under a cookie with the given name."});
Blocks.registerNew({name:"loadVar",	text:"Load variable @VARNAME from value @STRING",	type:'variable',	call:function(tparam, tp1){},desc:"Loads a variable from the specified cookie."});
Blocks.registerNew({name:'varCreator',	text:'Set variable @VARNAME to value @STRING',	type:'variable',	call:function(tparam, tp1){Emulator.scope.vars[tp1['VARNAME'][0]]=tp1['VALUE'][0];},desc:"Sets a variable to a value."});
if(logging)console.log('Blocks initiated');
};
if(logging)console.log('Blocks loaded');