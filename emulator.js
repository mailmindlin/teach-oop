var Emulator;
function Scope(scope){
	this.vars=isset(scope) ? scope.vars : new Array();//another ternary operator FOR THE WIN
	this.getVar=function(varname){
		if(isset(this.vars[varname]))return this.vars[varname];
		console.err('Something was looking for variable ' + varname + ", and it didn't exist!");
		return false;
	};
	return this;
}
function Variable(data){
	this.data=data;
	this.defaultNull=false;
	if(typeof data === 'string'){this.defaultNull="";}
	else if(typeof data === "number"){this.defaultNull=0;}
	this.getType=function(){
		return typeof(this.data);
	};
	this.setTo=function(data){
		this.data=data;
	};
	this.getVal=function(){
		return isset(this.data) ? this.data : this.defaultNull;
	}
	return this;
}
function protoEmulator(){
	this.scope=Scope();
	this.emulate=function(arr){
		for(var i=0;i<arr.length;i++){
			console.log([arr[i], arr[i].htmlText]);
			if(typeof arr[i] !== 'undefined')Blocks.evaluate(arr[i],arr[i].htmlText);
		}
	};
	this.requestVar=function(varname){
		return Variable(this.scope.getVar(varname));
	};
	this.getVars=function(){
		return this.scope.vars;
	};
	this.emulateStack=function(stackName){
		var stack=Stack.emulatable(Stack.call(stackName));
		console.log('emulating');
		this.emulate(stack);
	};	
	this.attempt=function(fn){
		if(typeof fn === 'function'){
			return fn();
		}else if(typeof fn !== 'undefined'){
			return fn;
		}else{
			return null;
		}
	};
	this.regexitize=function(text, regex){
		var obj=new RegExp();
		
		return null;
	};
	return this;
}
Emulator=protoEmulator();		
if(logging)console.log('Emulator initiated');