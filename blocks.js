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
			var hasValidType=isset(this.registeredTypes[this.registeredBlocks[i].type]);
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
		return isset(type) ? type : 'NONE';//I use ternary operators because im awesome like that
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
			if((hasValidType) && typeof this.registeredTypes[this.registeredBlocks[i].type].defaultClass === 'string')obj.addClass(this.registeredTypes[this.registeredBlocks[i].type].defaultClass);
			$('#objects ul').append(obj);
		}
	}
	return this;
}
Blocks=protoBlocks();
//parses complex inputs
function fixVal(s){
	//fix sensors
	var s1=s;
	s=s.replaceAll("SGX", AccelerometerConstruct.x.toString());
	s=s.replaceAll("SENSOR:GYRO-Y", AccelerometerConstruct.y.toString());
	s=s.replaceAll("SENSOR:GYRO-Z", AccelerometerConstruct.z.toString());
	s=s.replaceAll("SENSOR:GRAV-X", AccelerometerConstruct.xGrav.toString());
	s=s.replaceAll("SENSOR:GRAV-Y", AccelerometerConstruct.yGrav.toString());
	s=s.replaceAll("SENSOR:GRAV-Z", AccelerometerConstruct.zGrav.toString());
	if(logging)console.log([s1,s]);
	return s;
}
//start defining stuff
Blocks.registerType({name:'native-function', defaultClass: 'block-type-fn'});
Blocks.registerNew({name:"popupHi", text:"popup 'hi'", call:function(){alert("hi");}, type:'native-function'});
Blocks.registerNew({name:"logHi", text:"Log hi", call:function(){console.log('hi');}, type:'native-function'});
Blocks.registerNew({name:"parseTest", text:"Alert @TEXTPARAM", type:'paramTester', call:function(tparam, tp1){alert(tp1);}});
Blocks.registerType({name:'paramTester', defaultClass: 'block-type-fn', textParser: function(block){return block.text.replace("@TEXTPARAM", "<string-input/>");}, paramParser:function(text){
	var regex=/value="[\w\s-:]+"/g;
	var arr=text.match(regex);
	for(key in arr){
		arr[key]=arr[key].substring(7, arr[key].length-1);
	}
	return fixVal(arr[0]);
	}});
if(logging)console.log('Blocks initiated');