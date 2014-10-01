var Data;
function DataConstructor(){
	var data=new Object();
	data.dataTypes=new Array();
	data.registerNewType=function(data){
		if(!(isset(data)&&isset(data.name)))return false;
		data.dataTypes[data.name]=data;
		return true;
	};
	data.draw=function(block){
		if(logging)console.log(block);
		if(!isset(block))return;
		$('#objects ul').append(block.instack().addClass('data'));
	};
	data.refresh=function(){
		$('#objects ul .data').remove();
		for(var dataType in data.dataTypes){
			data.draw(data.dataTypes[dataType]);
		}
		$('.data').draggable().draggable({revert:true});
	};
	data.parseString=function(s){
		for(var dataType in data.dataTypes){
			s=s.replaceAll(dataType.activeString, dataType.getCurrentValue());
		}
		return s;
	}
	return data;
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
	},
	type: 'number',
	getCurtentValue:function(html){return AccelerometerConstruct.x;}
}));//gyro x
Data.registerNewType({
	name:'SensorGyroY',
	instack: function(){
		var me=$('<li></li>').data('name', 'SensorGyroY').addClass('sensorgyro').html('Gyroscope Y');
		return me;
	},
	activeString:'SENSOR:GYRO-Y',
	inlineElement: function(){
		var me=$('<span></span>').data('name', 'SensorGyroY').addClass('data').addClass('sensorgyro').html('Gyroscope Y');
		return me;
	},
	type: 'number',
	getCurtentValue:function(html){return AccelerometerConstruct.y;}
});//gyro y
Data.registerNewType({
	name:'SensorGyroZ',
	instack: function(){
		var me=$('<li></li>').data('name', 'SensorGyroZ').addClass('sensorgyro').html('Gyroscope Z');
		return me;
	},
	activeString:'SENSOR:GYRO-Z',
	inlineElement: function(){
		var me=$('<span></span>').data('name', 'SensorGyroZ').addClass('data').addClass('sensorgyro').html('Gyroscope Z');
		return me;
	},
	type: 'number',
	getCurtentValue:function(html){return AccelerometerConstruct.z;}
});//gyro z
Data.registerNewType({name:'WebcamSnapshot',
	instack: function(){
		var me=$('<li></li>').data('name', 'WebcamSnapshot').addClass('data').addClass('camera').html('Image');
		return me;
	},
	activeString:'Image:Webcam',
	type:'image',
	inlineElement: function(){
		var me=$('<span></span>').data('name', 'WebcamSnapshot').addClass('data').addClass('camera').html('Image');
		return me;
	},
	getCurrentValue:function(html){
		return webcam.snapshot();
	}
});//HTML5 webcam image