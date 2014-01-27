var Emulator;
function protoEmulator(){
	this.emulate=function(arr){
		for(var i=0;i<arr.length;i++){
			console.log([arr[i], arr[i].htmlText]);
			if(typeof arr[i] !== 'undefined')Blocks.evaluate(arr[i],arr[i].htmlText);
		}
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