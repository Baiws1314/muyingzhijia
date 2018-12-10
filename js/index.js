$(function($){
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


	var i=0;
	var timer=setInterval(function(){
		i++;
		if(i==$("#banner li").length){
			$("#banner ul").css("left","0px");
			i=0;
		}
		$("#banner ul").animate({"left":-1090*i});
	},1000);
	
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
	})
})
