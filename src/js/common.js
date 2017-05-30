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