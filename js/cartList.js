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
						<input class="o-check" type="checkbox"/>
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
			$("#allCheck").prop("checked",true);
			$(".o-check").prop("checked",true);
			var alN=0,alP=0;
			$(".cart-list li input:checked").each(function(){
				var count=Number($(this).parents("li").find("p").html());
				var oAlpri=Number($(this).parents("li").find(".allPrice").html().replace("￥",""));
				alN+=count;
				alP+=oAlpri;
			})
			$(".cart-box .heji span").html(alN);
			$(".cart-box .heji em").html("￥"+(alP));
			/*$(".cart-box>p span").html(count);
			$(".cart-box>p em").html("￥"+allPrice);*/
			$(".pic,.title").click(function(){
				var id=$(this).parents("li").attr("id");
				location.href=`detial.html?${id}`;
			})
			$(".add,.minus,.action-o").click(function(e){
				var target=e.target;
				if(target.className=="add"){
					var num=1;
				}else if(target.className=="minus"){
					var num=-1;
				}else if(target.className=="action-o inblock"){
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
							var a=Number($(target).parents("li").find("p").html());
							var oaPri=Number($(target).parents("li").find(".allPrice").html().replace("￥",""));
							var n=Number($(".cart-box .heji span").html());
							var nowP=Number($(".cart-box .heji em").html().replace("￥",""));
							if(num!=0){
								$(target).parents("li").find("p").html(a+num);
								var p=num*Number($(".pri").html().replace("￥",""));
								$(target).parents("li").find(".allPrice").html("￥"+(oaPri+p));
								if($(target).parents("li").find("input").prop("checked")){
									$(".cart-box .heji span").html(n+num);
									$(".cart-box .heji em").html("￥"+(nowP+p));
								}
							}else{
								if($(target).parents("li").find("input").prop("checked")){
									$(".cart-box .heji span").html(n-a);
									$(".cart-box .heji em").html("￥"+(nowP-oaPri));
								}
							}
							//如果数量为0或删除了，就移除节点和后台商品
							if(a+num<=0 || num==0){
								$.get("http://47.104.244.134:8080/cartupdate.do",{id:id,gid:gid,num:0,token:token});
								$(target).parents("li").remove();
							}
						}else{
							alert("操作失败,请重试");
						}
					}
				});
			})
			$("#allCheck").click(function(){
				$(".o-check").prop("checked",$("#allCheck").prop("checked"));
			})
			$("#allCheck,.o-check").click(function(){
				if($(".cart-list").find("input:checked").length==$(".o-check").length){
					$("#allCheck").prop("checked",true);
				}else{
					$("#allCheck").prop("checked",false);
				}
				var alN=0,alP=0;
				$(".cart-list li input:checked").each(function(){
					var count=Number($(this).parents("li").find("p").html());
					var oAlpri=Number($(this).parents("li").find(".allPrice").html().replace("￥",""));
					alN+=count;
					alP+=oAlpri;
				})
				$(".cart-box .heji span").html(alN);
				$(".cart-box .heji em").html("￥"+(alP));
			})
			
		}
	});
	
})
