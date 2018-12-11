$(function(){
	var a=location.search;
	a=a.replace("?","");
	if(a=="c-login"){
		$("#register").css("display","none");
		$("#login").css("display","block");
		$(".log-con").find("li").eq(1).addClass("click")
		.siblings().removeClass("click");
	}
	if(a=="c-register"){
		$("#login").css("display","none");
		$("#register").css("display","block");
		$(".log-con").find("li").eq(0).addClass("click")
		.siblings().removeClass("click");
	}
	$("#register input").focus(function(){
		$(this).css("border-color","#FF9900");
	});
	var flag=1,flag1=0,flag2=0,flag3=0,flag4=0;
	$("#phone").blur(function(){
		var val=$(this).val();
		var reg=/\w{3,10}/;
		if(reg.test(val)){
			$(this).css("border-color","#196605")
			.parent().find("p").css("visibility","visible")
			.find("b").addClass("suc");
			flag1=1;
		}else{
			$(this).css("border-color","#e60000")
			.parent().find("p").css("visibility","visible")
			.find("b").removeClass("suc");
		}
	});
	$("#psw").blur(function(){
		var val=$(this).val();
		if(val.length>=6 && val.length<=20){
			$(this).css("border-color","#196605")
			.parent().find("p").css("visibility","visible")
			.find("b").addClass("suc");
			flag2=1;
		}else{
			$(this).css("border-color","#e60000")
			.parent().find("p").css("visibility","visible")
			.find("b").removeClass("suc");
		}
	});
	$("#alipsw").blur(function(){
		var val=$(this).val();
		var val1=$("#psw").val();
		if(val.length==0){
			$(this).css("border-color","#e60000")
			.parent().find("p").css("visibility","visible")
			.find("b").removeClass("suc")
			.siblings().html("重复密码不能为空，请确认");
			
		}else if(val==val1){
			$(this).css("border-color","#196605")
			.parent().find("p").css("visibility","visible")
			.find("b").addClass("suc");
			flag3=1;
		}else{
			$(this).css("border-color","#e60000")
			.parent().find("p").css("visibility","visible")
			.find("b").removeClass("suc")
			.siblings().html("2次密码不一致，请重新输入");;
		}
	})
	$("#email").blur(function(){
		var val=$(this).val();
		var reg=/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
		if(reg.test(val)){
			$(this).css("border-color","#196605")
			.parent().find("p").css("visibility","visible")
			.find("b").addClass("suc");
			flag4=1;
		}else{
			$(this).css("border-color","#e60000")
			.parent().find("p").css("visibility","visible")
			.find("b").removeClass("suc");
		}
	})
	$("#alow").prop("checked",true);
	$("#alow").click(function(){
		if($("#alow").prop("checked")){
			$(this).parent().find("p").css("visibility","visible")
			.find("b").addClass("suc");
			flag=1;
		}else{
			flag=-1;
			$(this).parent().find("p").css("visibility","visible")
			.find("b").removeClass("suc");
		}
	})
	$("#btn").click(function(){
		flag+=flag1+flag2+flag3+flag4;
		if(flag!=5){
			alert("信息不完全，请补全信息");
		}else{
			$.ajax({
				type:"post",
				url:"http://47.104.244.134:8080/usersave.do",
				async:true,
				data:{
					"username":$("#phone").val(),
					"password":$("#psw").val(),
					"email":$("#email").val(),
					"sex":"1"
				},
				success:function(data){
					console.log(data);
					location.href="login.html?c-login";
				}
			});
		}
	})
	
	
	$("#user").blur(function(){
		var val=$(this).val();
		var reg=/\w{3,10}/;
		if(reg.test(val)){
			$(this).css("border-color","#196605")
			.parent().find("p").css("visibility","visible")
			.find("b").addClass("suc");
		}else{
			$(this).css("border-color","#e60000")
			.parent().find("p").css("visibility","visible")
			.find("b").removeClass("suc");
		}
		if(getCookie(this.value)){
			$("#password")[0].value=getCookie(this.value);
		}
	})
	$("#password").blur(function(){
		var val=$(this).val();
		if(val.length>=6 && val.length<=20){
			$(this).css("border-color","#196605")
			.parent().find("p").css("visibility","visible")
			.find("b").addClass("suc");
		}else{
			$(this).css("border-color","#e60000")
			.parent().find("p").css("visibility","visible")
			.find("b").removeClass("suc");
		}
	});
	$("#log").click(function(){
		$.ajax({
			type:"post",
			url:"http://47.104.244.134:8080/userlogin.do",
			async:true,
			data:{
				"name":$("#user").val(),
				"password":$("#password").val()
			},
			success:function(data){
				console.log(data);
				var token=data.data.token;
				if(data.msg=="OK"){
					if($("#remb").prop("checked")){
						setCookie($("#user")[0].value,$("#password")[0].value,30);
					}
					location.href=`index.html?c-login&${token}`;
				}else{
					alert("用户不存在，请注册后登陆");
				}
				
			}
		});
	})
function getCookie(name){
	var str = document.cookie;
	var arr = str.split("; ");
	for(var i = 0; i < arr.length; i++){
		var arr1 = arr[i].split("=");
		if(arr1[0]==name){
			return arr1[1];
		}
	}
}
//新建cookie
function setCookie(name,val,n){
	var oDate = new Date();
	oDate.setDate(oDate.getDate()+n);
	document.cookie = name + "=" + val + ";expires="+ oDate ;
}
})
