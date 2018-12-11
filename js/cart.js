$(function(){
	var token=location.search.replace("?","");
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
		$(".goods-con").html(str);
		$(".goods-con dt,.goos-name").click(function(){
			var id=$(this).parents("dl").attr("cart-id");
			location.href=`detial.html?${id}`;
		})
		$(".btn-m").click(function(){
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
					}else{
						console.log("添加失败")
					}
				}
			});
		});
		$(".shopCar").click(function(){
			location.href=`cartList.html?${token}`;
		})
	})
})
