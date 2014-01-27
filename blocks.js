var Blocks;
function protoBlocks(){
	this.registeredBlocks=new Array();
	this.registeredTypes=new Array();
	this.metaTypes=new Array();
	this.init=function(){
		//this.metaTypes['fn']={name='fn'};
		//this.metaTypes[''];
		for(var i=0;i<this.registeredBlocks.length;i++){
			var parsedText=this.registeredBlocks[i].text;
			var hasValidType=(typeof this.registeredTypes[this.registeredBlocks[i].type] !== 'undefined');
			if((hasValidType) && (typeof this.registeredTypes[this.registeredBlocks[i].type].textParser === 'function'))parsedText=this.registeredTypes[this.registeredBlocks[i].type].textParser(this.registeredBlocks[i]);
			if(typeof this.registeredBlocks[i].textParser === 'function')parsedText=this.registeredBlocks[i].textParser(this.registeredBlocks[i]);
			var obj=$('<li></li>').data('blockName', this.registeredBlocks[i].name).data("text", this.registeredBlocks[i].text).data("fn", this.registeredBlocks[i].call)
			.html(parsedText).addClass('block').addClass('block-inlist');
			if(hasValidType){obj.addClass(this.registeredTypes[this.registeredBlocks[i].type].defaultClass);}
			$('#objects ul').append(obj);
		}
	};
	this.registerNew=function(data){
		this.registeredBlocks.push(data);
	};
	this.registerType=function(data){
		this.registeredTypes[data.name]=data;
	}
	this.evaluate=function(name, text){
		if(typeof name === 'string'){
			var b=this.getBlock(name);
			if(b!=false){return b.call(text);}
		}else{
			var type=this.getType(name);
			if(type !== 'NONE' && (typeof type.paramParser === 'function')){
				return name.call(text, type.paramParser(text));
			}else{
				return name.call(text);
			}
		}
	};
	this.getType=function(block){
		var type=this.registeredTypes[block.type];
		if(typeof type !== 'undefined'){
			return type;
		}else{
			return 'NONE';
		}
	};
	this.getBlock=function(name){
		for(var i=0;i<this.registeredBlocks.length;i++){
			if(this.registeredBlocks[i].name==name){
				return this.registeredBlocks[i];
			}
		}
		return false;
	};
	this.draw=function(){
		$('#objects ul .block').remove();
		for(var i=0;i<this.registeredBlocks.length;i++){
			var parsedText=this.registeredBlocks[i].text;
			var hasValidType=(typeof this.registeredTypes[this.registeredBlocks[i].type] !== 'undefined');
			if((hasValidType) && (typeof this.registeredTypes[this.registeredBlocks[i].type].textParser === 'function'))parsedText=this.registeredTypes[this.registeredBlocks[i].type].textParser(this.registeredBlocks[i]);
			if(typeof this.registeredBlocks[i].textParser === 'function')parsedText=this.registeredBlocks[i].textParser(this.registeredBlocks[i]);
			var obj=$('<li></li>').data('blockName', this.registeredBlocks[i].name).data("text", this.registeredBlocks[i].text).data("fn", this.registeredBlocks[i].call)
			.html(parsedText).addClass('block').addClass('block-inlist');
			$('#objects ul').append(obj);
		}
	}
	return this;
}
Blocks=protoBlocks();
Blocks.registerType({name:'native-function', defaultClass: 'block-type-fn'});
Blocks.registerNew({name:"popupHi", text:"popup 'hi'", call:function(){alert("hi");}, type:'native-function'});
Blocks.registerNew({name:"logHi", text:"Log hi", call:function(){console.log('hi');}, type:'native-function'});
Blocks.registerNew({name:"parseTest", text:"Alert @TEXTPARAM", type:'paramTester', call:function(tparam, tp1){alert(tp1);}});
Blocks.registerType({name:'paramTester', defaultClass: 'block-type-fn', textParser: function(block){return block.text.replace("@TEXTPARAM", "<string-input/>");}, paramParser:function(text){
	var regex=/value="[\w\s]+"/g;
	var arr=text.match(regex);
	for(key in arr){
		arr[key]=arr[key].substring(7, arr[key].length-1);
	}
	console.log(arr);
	return arr;
	}});
if(debugging)console.log('Blocks initiated');