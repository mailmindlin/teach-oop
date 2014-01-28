var Data;
function DataConstructor(){
	this.dataTypes=new Array();
	this.registerNewType=function(data){
		if(!(isset(data)&&isset(data.name)))return false;
		this.dataTypes[data.name]=data;
		return true;
	};
	this.draw=function(block){
		console.log(block);
		if(!isset(block))return;
		$('#objects ul').append(block.instack().addClass('data'));
	}
	this.refresh=function(){
		$('#objects ul .data').remove();
		this.dataTypes.forEach(this.draw());
		$('.data').draggable().draggable();
	};
	return this;
}
Data=DataConstructor();
console.log(Data.registerNewType({
name:'SensorGyroX',
instack: function(){
	var me=$('<li></li>').data('name', 'SensorGyroX').addClass('sensorgyro').html('Gyroscope X');
	return me;
},
activeString:'SENSOR:GYRO-X',
inlineElement: function(){
	var me=$('<span></span>').data('name', 'SensorGyroX').addClass('data').addClass('sensorgyro').html('Gyroscope X');
	return me;
}
}));