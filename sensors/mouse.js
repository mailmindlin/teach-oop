//mouse.js
//unify standards
document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;
function superMouse(){
	var mouse=new Object();
	mouse.listening=false;
	mouse['exists']=function(){
		return document.webkit
	};
	mouse['initLock']=function(element){
		//establish standards
		element['requestPointerLock'] = element['requestPointerLock'] || element['mozRequestPointerLock'] || element['webkitRequestPointerLock'];
		element.requestPointerLock();
		if(!mouse.listening)mouse.applyListeners();
	};
	mouse.applyListeners = function() {
		mouse.listening=true;
		//catch events
		document.addEventListener('pointerlockchange', mouse.pointerLockChange, false);
		document.addEventListener('mozpointerlockchange', mouse.pointerLockChange, false);
		document.addEventListener('webkitpointerlockchange', mouse.pointerLockChange, false);
		// Hook mouse move events
		document.addEventListener("mousemove", mouse.onmove, false);
	};
	mouse['releaseLock']=function() {
		mouse.locked=false;
		document.exitPointerLock();		
	};
	mouse.onmove=function(ev) {
		//do stuff
	};
	mouse.pointerLockChange=function(ev) {
		//do stuff
	};
	return mouse;
}
document['Mouse']=superMouse();
console.log('Mouse initialized');