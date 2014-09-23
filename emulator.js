{
	if(window['c']===void 0)window['c']=Object.create(null);
	function isset(o){return void(0)!==o;}
	window['Scope']=function(scope){
		var self = Object.create(null);
		self.vars=isset(scope) ? scope.vars : new Array();//another ternary operator FOR THE WIN
		self['getVar']=function(varname){
			if(isset(self.vars[varname]))return self.vars[varname];
			console.err('Something was looking for variable ' + varname + ", and it didn't exist!");
			return false;
		};
		return self;
	}
	window['Variable']=function(data){
		var self = Object.create(null);
		self.data=data;
		self.defaultNull=false;
		if(typeof data === 'string')
			self.defaultNull='';
		else if(typeof data === 'number')
			self.defaultNull=0;
		self['getType']=function(){
			return typeof(self.data);
		};
		self['setTo']=function(data){
			self.data=data;
		};
		self['getVal']=function(){
			return isset(self.data) ? self.data : self.defaultNull;
		};
		return self;
	}
	window['c']['emulator']=function(){
		var self = Object.create(null);
		self.scope=Scope();
		self['emulate']=function(arr){
			for(var i=0;i<arr['length'];i++){
				if(isset(arr[i]) && isset(arr[i]['htmlText'])){
					console.log([arr[i], arr[i]['htmlText']]);
					var r=window['Blocks']['evaluate'](arr[i],arr[i]['htmlText'],arr,i);
					if(r==="cancel-execution")return;
					//maybe add some other stuff here?
				}
			}
		};
		self['getShiftedEmulatable']=function(emulatable, shift){
			var arr={};
			for(var i=shift;i<emulatable['length'];++i){
				arr[i-shift]=emulatable[i];
			}
			return arr;
		};
		self['requestVar']=function(varname){
			return window['Variable'](self.scope['getVar'](varname));
		};
		self['getVars']=function(){
			return self.scope.vars;
		};
		self['emulateStack']=function(stackName){
			var stack=window['Stack']['emulatable'](window['Stack']['call'](stackName));
			console.log('emulating');
			self['emulate'](stack);
		};	
		self['attempt']=function(fn){
			if(typeof fn === 'function'){
				return fn();
			}else if(isset(fn)){
				return fn;
			}else{
				return null;
			}
		};
		//TODO: finish
		self['regexitize']=function(text, regex){
			var obj=new RegExp();
			return null;
		};
		return self;
	};
	window['Emulator']=window['c']['emulator']();		
}
if(logging)console.log('Emulator initiated');