"use strict";$(function(){var o=location.search.replace("?","");"undefined"!=o&&($(".n-right li").eq(0).find("a").css("display","none"),$.get("http://47.104.244.134:8080/cartlist.do",{token:o},function(t){console.log(t);for(var n=0,c=0;c<t.length;c++)n+=t[c].count;$(".shopCar span").html(n)})),$.get("http://47.104.244.134:8080/goodsbytid.do",{tid:13,page:1,limit:10},function(t){t=t.data;var n="";console.log(t);for(var c=0;c<t.length;c++)n+='<dl cart-id="'+t[c].id+'">\n\t\t\t\t\t\t<dt>\n\t\t\t\t\t\t\t<img src="'+t[c].picurl+'" />\n\t\t\t\t\t\t</dt>\n\t\t\t\t\t\t<dd>\n\t\t\t\t\t\t\t<p class="goods-name">'+t[c].name+'</p>\n\t\t\t\t\t\t\t<p class="price">'+t[c].price+'</p>\n\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t<span class="btn-m" cart-id="'+t[c].id+'">加入购物车</span>\n\t\t\t\t\t\t\t\t<span class="btn-mg">收藏</span>\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t</dd>\n\t\t\t\t\t</dl>';$(".goods-con").html(n+$(".goods-con").html()),$(".goods-con dt,.goos-name").click(function(){var t=$(this).parents("dl").attr("cart-id");location.href="detial.html?"+o+"&"+t}),$(".btn-m").click(function(){if("undefined"!=o){var t=$(this).attr("cart-id");$.ajax({type:"get",url:"http://47.104.244.134:8080/cartsave.do",async:!0,data:{gid:t,token:o},success:function(t){if(console.log(t),0==t.code){var n=Number($(".shopCar span").html());$(".shopCar span").html(n+1),$(".add-suc").show().find("p").html("添加购物车成功！"),$(".add-suc h4 i").click(function(){$(".add-suc").hide()}),$(".add-suc input").eq(0).click(function(){$(".add-suc").hide()}),$(".add-suc input").eq(1).click(function(){location.href="cartList.html?"+o,$(".add-suc").css("display","none")})}else $(".add-suc").show().find("p").html("添加购物车失败！")}})}else location.href="login.html?c-login"}),$(".shopCar").click(function(){location.href="undefined"!=o?"cartList.html?"+o:"login.html?c-login"})})});