$(function(){
	var id=location.search.replace("?","");
	$.get("http://47.104.244.134:8080/goodsbyid.do",{id:id},function(data){
		console.log(data);
		$(".jqzoom img,#bigArea img,.spec img").attr("src",data.picurl);
		$(".con-info").html(data.info);
		$(".con-name").html(data.name);
		$(".con-price span").html("￥"+data.price);
		$(".data span").html(data.pubdate);
		$(".add-goods").click(function(){
			$.get("http://47.104.244.134:8080/cartsave.do",{gid:id,token:433},function(data){
				console.log(data);
				if(data.code==0){
					var n=Number($(".shopCar span").html())
					$(".shopCar span").html(n+1);
				}
			})
		})
	})
	
	$(".jqzoom").mouseover(function(){
		$("#zoom").css("display","block");
		$("#bigArea").css("display","block");
	});
	$(".jqzoom").mouseout(function(){
		$("#zoom").css("display","none");
		$("#bigArea").css("display","none");
	});
	$(".jqzoom").mousemove(function(e){
		var evt=e||event;
		var x=evt.pageX-$(".preview").offset().left;
		var y=evt.pageY-$(".preview").offset().top;
		var _left=x-$("#zoom").outerWidth()/2;
		var _top=y-$("#zoom").outerHeight()/2;
		if(_left<=0){
			_left=0;
		}
		if(_left>=$(this).outerWidth()-$("#zoom").outerWidth()){
			_left=$(this).outerWidth()-$("#zoom").outerWidth();
		}
		if(_top<=0){
			_top=0;
		}
		if(_top>=$(this).outerHeight()-$("#zoom").outerHeight()){
			_top=$(this).outerHeight()-$("#zoom").outerHeight();
		}
		$("#zoom").css({"left":_left+"px","top":_top+"px"});
		$("#bigArea img").css({"left":-_left/$(".jqzoom img").outerWidth()*$("#bigArea img").outerWidth()+"px","top":-_top/$(".jqzoom img").outerHeight()*$("#bigArea img").outerHeight()+"px"})
	});
})
