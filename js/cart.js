$(function(){
	var token=location.search.replace("?","");
	if(token!="undefined"){
		$(".n-right li").eq(0).find("a").css("display","none");
		$.get("http://47.104.244.134:8080/cartlist.do",{token:token},function(data){
			console.log(data);
			var num=0;
			for(var i=0;i<data.length;i++){
				num+=data[i].count;
			}
			$(".shopCar span").html(num);
		});
	}
	$.get("http://47.104.244.134:8080/goodsbytid.do",{tid:13,page:1,limit:10},function(data){
		data=data.data;
		var str="";
		console.log(data);
		for(var i=0;i<data.length;i++){
			str+=`<dl cart-id="${data[i].id}">
						<dt>
							<img src="${data[i].picurl}" />
						</dt>
						<dd>
							<p class="goods-name">${data[i].name}</p>
							<p class="price">${data[i].price}</p>
							<p>
								<span class="btn-m" cart-id="${data[i].id}">加入购物车</span>
								<span class="btn-mg">收藏</span>
							</p>
						</dd>
					</dl>`;
		}
		$(".goods-con").html(str+$(".goods-con").html());
		$(".goods-con dt,.goos-name").click(function(){
			var id=$(this).parents("dl").attr("cart-id");
			console.log($(this).parents("dl"))
			location.href=`detial.html?${token}&${id}`;
		})
		$(".btn-m").click(function(){
			if(token!="undefined"){
				var id=$(this).attr("cart-id");
				$.ajax({
					type:"get",
					url:"http://47.104.244.134:8080/cartsave.do",
					async:true,
					data:{
						gid:id,
						token:token
					},
					success:function(data){
						console.log(data);
						if(data.code==0){
							var num=Number($(".shopCar span").html());
							$(".shopCar span").html(num+1);
							$(".add-suc").show()
							.find("p").html("添加购物车成功！");
							$(".add-suc h4 i").click(function(){
								$(".add-suc").hide();
							})
							$(".add-suc input").eq(0).click(function(){
								$(".add-suc").hide();
							});
							$(".add-suc input").eq(1).click(function(){
								location.href=`cartList.html?${token}`;
								$(".add-suc").css("display","none");
							})
						}else{
							$(".add-suc").show()
							.find("p").html("添加购物车失败！");
						}
					}
				});
			}else{
				location.href="login.html?c-login";
			}
		});
		$(".shopCar").click(function(){
			if(token!="undefined"){
				location.href=`cartList.html?${token}`;
			}else{
				location.href="login.html?c-login";
			}
		})
	})
})
