"use strict";$(function(){var o=location.search.replace("?",""),t=o.split("&")[0],e=o.split("&")[1];"undefined"!=t&&($(".n-right li").eq(0).find("a").css("display","none"),$.get("http://47.104.244.134:8080/cartlist.do",{token:t},function(o){console.log(o);for(var t=0,e=0;e<o.length;e++)t+=o[e].count;$(".shopCar span").html(t)})),$.get("http://47.104.244.134:8080/goodsbyid.do",{id:e},function(o){console.log(o),$(".jqzoom img,#bigArea img,.spec img").attr("src",o.picurl),$(".con-info").html(o.info),$(".con-name").html(o.name),$(".con-price span").html("￥"+o.price),$(".data span").html(o.pubdate),$(".add-goods").click(function(){"undefined"!=t?$.get("http://47.104.244.134:8080/cartsave.do",{gid:e,token:t},function(o){if(console.log(o),0==o.code){var t=Number($(".shopCar span").html());$(".shopCar span").html(t+1)}}):location.href="login.html?c-login"})}),$(".shopCar").click(function(){location.href="undefined"!=t?"cartList.html?"+t:"login.html?c-login"}),$(".jqzoom").mouseover(function(){$("#zoom").css("display","block"),$("#bigArea").css("display","block")}),$(".jqzoom").mouseout(function(){$("#zoom").css("display","none"),$("#bigArea").css("display","none")}),$(".jqzoom").mousemove(function(o){var t=o||event,e=t.pageX-$(".preview").offset().left,i=t.pageY-$(".preview").offset().top,n=e-$("#zoom").outerWidth()/2,s=i-$("#zoom").outerHeight()/2;n<=0&&(n=0),n>=$(this).outerWidth()-$("#zoom").outerWidth()&&(n=$(this).outerWidth()-$("#zoom").outerWidth()),s<=0&&(s=0),s>=$(this).outerHeight()-$("#zoom").outerHeight()&&(s=$(this).outerHeight()-$("#zoom").outerHeight()),$("#zoom").css({left:n+"px",top:s+"px"}),$("#bigArea img").css({left:-n/$(".jqzoom img").outerWidth()*$("#bigArea img").outerWidth()+"px",top:-s/$(".jqzoom img").outerHeight()*$("#bigArea img").outerHeight()+"px"})})});