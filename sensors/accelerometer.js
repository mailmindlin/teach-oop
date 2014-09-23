function AccelerometerConstructor(){
	var self=Object.create(null);
	self.x=0;
	self.y=0;
	self.z=0;
	self.xGrav=0;
	self.yGrav=0;
	self.zGrav=0;
	self.hasGrav=false;
	self.hasAccel=false;
	self.update=function(event, type){
		console.log('updating Accelerometer');
		if(type==1){
			self.x=event.beta;
			self.y=event.gamma;
			self.z=event.alpha;
		}else if(type==2){
			self.x=event.acceleration.x*2;
			self.y=event.acceleration.y*2;
			self.x=event.acceleration.z*2;
			self.xGrav=event.accelerationIncludingGravity.x*2;
			self.yGrav=event.accelerationIncludingGravity.y*2;
			self.zGrav=event.accelerationIncludingGravity.z*2;
		}else if(type==2){
			self.x=event.x*50;
			self.y=event.y*50;
			self.z=event.z*50;
		}
		if(self.z==null)self.z=0;
	};
	if (window.DeviceOrientationEvent) {
		console.log('1');
    	window.addEventListener("deviceorientation", function () {
    	    self.update(event,1);
    	}, true);
    	self.hasAccel=true;
	}
	if (window.DeviceMotionEvent) {
		console.log('2');
	    window.addEventListener('devicemotion', function () {
	        self.update(event,2);
	    }, true);
	    window.DeviceMoionEvent=function(e){self.update(e,2);};
	    self.hasAccel=true;
	    self.hasGrav=true;
	}
	if(window.MozOrientationEvent) {
		console.log('3');
	    window.addEventListener("MozOrientation", function () {
	        self.update(orientation,3);
	    }, true);
	    AccelerometerConstruct.hasAccel=true;
	}
	return self;
}
window['AccelerometerConstruct']=AccelerometerConstructor();
function devOrient(e){
	if(logging)console.log('Checking')
	AccelerometerConstruct.x=e.gamma;
	AccelerometerConstruct.y=event.beta;
	AccelerometerConstruct.z=event.alpha;
	if(AccelerometerConstruct.z==null)AccelerometerConstruct.z=0;
	AccelerometerConstruct.hasAccel=true;
}
function devMotion(e){
	if(logging)console.log('Motion');
	AccelerometerConstruct.x=event.acceleration.x*2;
	AccelerometerConstruct.y=event.acceleration.y*2;
	AccelerometerConstruct.x=event.acceleration.z*2;
	AccelerometerConstruct.xGrav=event.accelerationIncludingGravity.x*2;
	AccelerometerConstruct.yGrav=event.accelerationIncludingGravity.y*2;
	AccelerometerConstruct.zGrav=event.accelerationIncludingGravity.z*2;
	if(AccelerometerConstruct.z==null)AccelerometerConstruct.z=0;
	AccelerometerConstruct.hasGrav=true;
	AccelerometerConstruct.hasAccel=true;
}
if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', devOrient, false);
}else if (window.DeviceMotionEvent) {
  window.addEventListener('devicemotion', devMotion, false);
}
console.log('Accelerometer initialized');