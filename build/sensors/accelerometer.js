var AccelerometerConstruct;
function AccelerometerConstructor(){
	this.x=0;
	this.y=0;
	this.z=0;
	this.xGrav=0;
	this.yGrav=0;
	this.zGrav=0;
	this.hasGrav=false;
	this.hasAccel=false;
	this.update=function(event, type){
		console.log('updating Accelerometer');
		if(type==1){
			this.x=event.beta;
			this.y=event.gamma;
			this.z=event.alpha;
		}else if(type==2){
			this.x=event.acceleration.x*2;
			this.y=event.acceleration.y*2;
			this.x=event.acceleration.z*2;
			this.xGrav=event.accelerationIncludingGravity.x*2;
			this.yGrav=event.accelerationIncludingGravity.y*2;
			this.zGrav=event.accelerationIncludingGravity.z*2;
		}else if(type==2){
			this.x=event.x*50;
			this.y=event.y*50;
			this.z=event.z*50;
		}
		if(this.z==null)this.z=0;
	};
	return this;
}
AccelerometerConstruct=AccelerometerConstructor();
/*if (window.DeviceOrientationEvent) {
	console.log('1');
    window.addEventListener("deviceorientation", function () {
        AccelerometerConstruct.update(event,1);
    }, true);
    AccelerometerConstruct.hasAccel=true;
}
if (window.DeviceMotionEvent) {
	console.log('2');
    window.addEventListener('devicemotion', function () {
        AccelerometerConstruct.update(event,2);
    }, true);
    window.DeviceMoionEvent=function(e){console.log('updated');AccelerometerConstruct.update(e,2);};
    AccelerometerConstruct.hasAccel=true;
    AccelerometerConstruct.hasGrav=true;
}
if(window.MozOrientationEvent) {
	console.log('3');
    window.addEventListener("MozOrientation", function () {
        AccelerometerConstruct.update(orientation,3);
    }, true);
    AccelerometerConstruct.hasAccel=true;
}*/
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