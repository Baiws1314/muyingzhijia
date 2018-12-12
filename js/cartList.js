$(function(){
	var token=location.search.replace("?","");
	if(token!="undefined"){
		$(".n-right li").eq(0).find("a").css("display","none");
	}
	$.ajax({
		type:"get",
		url:"http://47.104.244.134:8080/cartlist.do",
		async:true,
		data:{
			token:token
		},
		success:function(data){
			console.log(data);
			var str="";
			var count=0,allPrice=0;
			for(let i in data){
				str+=`<li id=${data[i].id} gid=${data[i].gid}>
						<a class="pic inblock">
							<img src="${data[i].goods.picurl}"/>
						</a>
						<span class="title inblock">${data[i].goods.name}</span>
						<span class="pri inblock">￥${data[i].goods.price}</span>
						<span class="count-a inblock">
							<a class="minus">
								-
							</a>
							<p type="text" class="inblock" >${data[i].count}</p>
							<a class="add">
								+
							</a>
							
						</span>
						<span class="allPrice inblock">￥${data[i].goods.price*data[i].count}</span>
						<span class="action-o inblock">删除</span>
					</li>`;
				count+=data[i].count;
				allPrice+=data[i].goods.price*data[i].count;
			}
			$(".cart-list").html(str);
			$(".cart-box>p span").html(count);
			$(".cart-box>p em").html("￥"+allPrice);
			$(".pic,.title").click(function(){
				var id=$(this).parents("li").attr("id");
				location.href=`detial.html?${id}`;
			})
			$(".add,.minus,.action-o").click(function(e){
				var target=e.target;
				if(e.target.className=="add"){
					var num=1;
				}else if(e.target.className=="minus"){
					var num=-1;
				}else if(e.target.className=="action-o inblock"){
					var num=0;
				}else{
					return;
				}
				var id=$(this).parents("li").attr("id");
				var gid=$(this).parents("li").attr("gid");
				$.ajax({
					type:"get",
					url:"http://47.104.244.134:8080/cartupdate.do",
					async:true,
					data:{
						id:id,
						gid:gid,
						num:num,
						token:token
					},
					success:function(data){
						console.log(data);
						if(data.code==0){
							var a=Number($(target).parent().find("p").html());
							$(target).parent().find("p").html(a+num);
							var n=Number($(".cart-box>p span").html());
							var p=num*Number($(".pri").html().replace("￥",""));
							var nowP=Number($(".cart-box>p em").html().replace("￥",""));
							var oaPri=Number($(target).parent().siblings(".allPrice").html().replace("￥",""))
							$(target).parent().siblings(".allPrice").html("￥"+(oaPri+p));
							$(".cart-box>p span").html(n+num);
							$(".cart-box>p em").html("￥"+(nowP+p));
							if(a+num<=0){
								$.get("http://47.104.244.134:8080/cartupdate.do",{id:id,gid:gid,num:0,token:token});
								$(target).parents("li").remove();
							}
							
						}else{
							alert("操作失败,请重试");
						}
					}
				});
			})
			
			
		}
	});
	
})
