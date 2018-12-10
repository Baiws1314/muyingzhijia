
function ajax(type,url,data,fnSuc,fnFail){
	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	var str = "";
	for(var attr in data){
		str += attr+"="+data[attr]+"&";
	}
	str = str.replace(/&$/,"");
	
	if(type.toUpperCase()=="GET"){
		if(str.length==0){
			xhr.open(type,url,true);
		}else{
			xhr.open(type,url+"?"+str,true);
		}
		
		xhr.send();
	}
	
	if(type.toUpperCase()=="POST"){
		xhr.open(type,url,true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(str);
	}

	xhr.onreadystatechange = function(){
		if(xhr.readyState==4){
			if(xhr.status==200){
				var data = xhr.responseText;
				//对返回的数据的处理函数 由于处理方式各式各样，以参数的形式体现
				fnSuc(data);
			}else{
				if(fnFail){
					fnFail();
				}
				
			}
		}
	}
			
}
