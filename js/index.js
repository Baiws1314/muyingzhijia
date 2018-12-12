$(function($){
	var search=location.search.replace("?","");
	var token=search.split("&")[1];
	if(token){
		$.get("http://47.104.244.134:8080/cartlist.do",{token:token},function(data){
			console.log(data);
			var num=0;
			var str="";
			for(var i=0;i<data.length;i++){
				num+=data[i].count;
				str+=`<ul>
							<li>
								<img src="${data[i].goods.picurl}" />
								<p>${data[i].goods.name}</p>
								<div>
									<strong>￥${data[i].goods.price}</strong>
									<em>x${data[i].count}</em>
								</div>
								<span>删除</span>
							</li>
						</ul>`;
			}
			$("#cartNum").html("("+num+")");
			if(str.length>0){
				$(".slide-box").html(str);
			}
			
		})
	}
	$(".list-con li").click(function(){
		location.href=`addcart.html?${token}`;
	})
	if(search.split("&")[0]=="c-login"){
		$(".log-suc").eq(0).before("<li style='color:skyblue'>您好，欢迎登录!</li>");
		$(".log-suc").remove();
		$(".level-login,.star-login").find("p").html("您好，母婴之家用户!");	
	}
	$(window).scroll(function(){		
		var scroll=$(this).scrollTop();
		if(scroll>=200){
			$(".fixleft").css("display","block");
		}else{
			$(".fixleft").css("display","none");
		}
	})
	$(".level,.star").mouseenter(function(){
		$(this).css("background","#FF5C00")
		.find(".level-login").css("display","block")
		.stop().animate({"left":"-288px"});
		$(this).find(".star-login").css("display","block")
		.stop().animate({"left":"-288px"},500);
	})
	$(".level,.star").mouseleave(function(){
		$(this).css("background","#FFF")
		.find(".level-login").css({"left":"-298px","display":"none"});	
		$(this).find(".star-login").css({"left":"-298px","display":"none"});
	})
	$(".level-login span,.star-login span").click(function(){
		$(this).parent().parent().css({"left":"-298px","display":"none"})	
		.parent().css("background","#FFF");
	})
	$(".serve,.top").mouseover(function(){
		$(this).find("div").css("display","block")
		.stop().animate({"left":"-74px"})
	})
	$(".serve,.top").mouseout(function(){
		$(this).find("div").css("display","none")
		.stop().animate({"left":"-84px"})
	})
	$(".top").click(function(){	
		var i=0;
		var timer=setInterval(function(){
			var scroll=$("body,html").scrollTop();
			if(scroll<=0){
				clearInterval(timer);
			}
			i+=5;
			$("body,html").scrollTop(scroll-i);
			
		},20)
	})
	
	$("#txt")[0].oninput=function(){
		$.getJSON("https://suggest.taobao.com/sug?&code=utf-8&q="+$("#txt").val()+"&callback=?&code=utf-8&area=c2c&bucketid=atb_search")
		.done(function(data){
			var result=data.result;
			var str="";
			for(var i=0;i<result.length;i++){
				str+=`<li><a href="">${result[i][0]}</a></li>`;
			}
			$("#list").html(str);
			var height=$("#list").outerHeight();
			if($("#list li").length>0){
				$("#list").slideDown()
			}else{
				$("#list").css("display","none")
			}
			$("#list li").click(function(){
				$("#txt").val($(this).find("a").html());
				$("#list").slideUp();
			})
		});
		
	}
	$("#ban-img").css("width",1090*$("#ban-img li").length);
	$("#ban-num").css("margin-left",-$("#ban-num").outerWidth()/2);
	var i=0;
	var timer=setInterval(function(){
		move();
	},1000);
	$("#ban-num li").mouseover(function(){
		clearInterval(timer);
		var index=$(this).index(); 
		i=index;
		$("#ban-img").stop().animate({"left":-1090*i});
		$("#ban-num li").eq(i).addClass("b-hover")
		.siblings().removeClass("b-hover");
	})
	$("#ban-num li").mouseout(function(){
		timer=setInterval(move,1000);
	})
	function move(){
		i++;
		if(i==$("#ban-img li").length){
			$("#ban-img").css("left","0px");
			i=1;
		}
		$("#ban-img").stop().animate({"left":-1090*i});
		if(i==$("#ban-num li").length){
			$("#ban-num li").eq(0).addClass("b-hover")
			.siblings().removeClass("b-hover");
		}
		$("#ban-num li").eq(i).addClass("b-hover")
		.siblings().removeClass("b-hover");
	}
	var page=$(".dls div").length;
	$(".dls").css("width",page*1104);
	
	$(".dls,#btns").mouseover(function(){
		$("#btns").css("display","block");
	})
	$(".dls,#btns").mouseout(function(){
		$("#btns").css("display","none")
	})
	
	var j=0;
	$("#btns span").eq(0).click(function(){
		j--;
		if(j==-1){
			$(".dls").css("left",-(page-1)*1104);
			j=page-1;
		}
		$(".dls").stop().animate({"left":-j*1104});
	})
	$("#btns span").eq(1).click(function(){	
		j++;
		if(j==page){
			$(".dls").css("left",0);
			j=0;
		}
		$(".dls").stop().animate({"left":-j*1104});
	});
	$(".cart").click(function(){
		$(".cart-slide").fadeToggle();
	});
	$(".level-close").click(function(e){
		$(".cart-slide").css("display","none");
		e.stopPropagation();
	})
})
