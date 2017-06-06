/*对象copy,类似Spring的BeanUtils.copy*/
function copyto(to,from){
	$.each(to,function(key,value){
		var isExit=false;
		$.each(from,function(fromkey,fromvalue){
			if (fromkey==key) {
				to[""+fromkey+""]=fromvalue;
				isExit=true;
			}
		});
		if (!isExit) {
			to[""+key+""]=value;
		}
		isExit=false;
	});
}

/*
将json数组转成一个树状结构json对象
例如：var tarray= [{userId:"1", userParentId:null, name:"1" },
				   {userId:"2", userParentId:"1", name:"1_1" }]
temp：json数组,一般是后台返回的,如tarray;
id：json数组中元素的的id的字段名称,如userId;
pid：json数组中元素的的表示父亲的字段名称,如userParentId;

调用方式:如getTree(tarray,"userId","userParentId");
*/
function getTree(temp,id,pid){
	var top=getTreeTop(temp,pid);
	$.each(top,function(index){
		recursionTree(this,temp,id,pid);
	});
	return top;
}

function recursionTree(_this,temp,id,pid){
	var tempArray=[];
	$.each(temp,function(index){
		if(_this[""+id+""]==this[""+pid+""]){
			tempArray.push(this);
			recursionTree(this,temp,id,pid);
		}
	});
	
	_this["children"]=tempArray;
}

function getTreeTop(_array,_pid){
	return $.grep(_array,function(_this,index){
		return _this[""+_pid+""] == null;
	});
}