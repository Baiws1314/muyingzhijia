$(function(){
	var token=location.search.replace("?","");
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
			for(let i in data){
				str+=`<li id=${data[i].id} gid=${data[i].gid}>
						<a class="pic inblock">
							<img src="${data[i].goods.picurl}"/>
						</a>
						<span class="title inblock">${data[i].goods.name}</span>
						<span class="pri inblock">￥${data[i].goods.price}</span>
						<span class="count-a inblock">
							<a class="minus">
								<span></span>
							</a>
							<input type="text" class="inblock" value="${data[i].count}"/>
							<a class="add">
								<span></span>
								<em></em>
							</a>
							
						</span>
						<span class="allPrice inblock">￥${data[i].goods.price*data[i].count}</span>
						<span class="action-o inblock">删除</span>
					</li>`;
			}
			$(".cart-list").html(str);
			$(".pic,.title").click(function(){
				var id=$(this).parents("li").attr("id");
				location.href=`detial.html?${id}`;
			})
			$(".add,.minus,.action-o").click(function(e){
				console.log(e.target);
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
				console.log(id,gid,token,num)
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
							location.reload();
						}else{
							alert("操作失败,请重试");
						}
					}
				});
			})
			
			
		}
	});
	
})
