$(function(){
	if($(".code_pd").length > 0){
		var qrnode = new AraleQRCode({
            render: 'canvas',
            correctLevel: 0,
            foreground:"#000000",
            size: 130
        });
        $("#code").append(qrnode);
	}

	if($(".slideBox").length > 0){
		var swiper = new Swiper('.slideBox', {
			pagination: '.swiper-pagination',
	        slidesPerView: 1,
	        paginationClickable: true,
	        centeredSlides:true,
	        autoplay: 4500,
	        autoplayDisableOnInteraction: false,
	        loop: true
	    });
	}

	if($(".news_box").length > 0){
		var swiper = new Swiper('.news_box', {
			pagination: '.swiper-pagination',
	        slidesPerView: 1,
	        paginationClickable: true,
	        centeredSlides:true,
	        autoplay: 4500,
	        autoplayDisableOnInteraction: false,
	        nextButton: '.swiper-button-next',
        	prevButton: '.swiper-button-prev',
        	autoplayDisableOnInteraction: false,
	        loop: true
	    });
	}

	if($(".mobile_code_box").length > 0){
		jQuery(".mobile_code_box").slide({
			titCell:"span.ic_phone", // 鼠标触发对象
			targetCell:"div.mobile_code", // 效果对象，必须被titCell包含
			delayTime:0, // 效果时间
			triggerTime:0,
			defaultPlay:false,  //默认不执行
			trigger: "mouseover",
			returnDefault:true // 返回默认
		});
	}

	if($(".slide_detail_box").length > 0){
		//大图切换
		jQuery(".slide_detail_box").slide({ titCell:".smallImg li", mainCell:".bigImg", effect:"fold", autoPlay:true,delayTime:200});
		//小图左滚动切换
		jQuery(".slide_detail_box .smallScroll").slide({ mainCell:".smallImg ul",delayTime:100,vis:5,effect:"left",autoPage:true,prevCell:".sPrev",nextCell:".sNext"});
	}

	if($(".nav_box").length > 0){
		jQuery("#nav").slide({ type:"menu", titCell:".nLi", targetCell:".sub",effect:"slideDown",delayTime:140,triggerTime:0,returnDefault:true,defaultIndex:false});
	}

	$(".ic_mobile").hover(function(){
		$(".code_pd").show();
	},function(){
		$(".code_pd").hide();
	});

	$(".pro_box>.pro_list:odd").addClass("c_l");

	//加购买数量
	$(".ca_plus_1").click(function() {
		var inputEle = $(this).parent().find("[name='dhInputName']");
		var count = parseInt(inputEle.val()) + 1;

		$(this).parent().find("[name='dhInputName']").val(count);
	});

	//减购买数量
	$(".ca_minus_1").click(function() {
		var inputEle = $(this).parent().find("[name='dhInputName']");
		var count = parseInt(inputEle.val()) - 1;
		if (count < 1) {
			alert("最少不能低于1件！");
			return;
		}
		$(this).parent().find("[name='dhInputName']").val(count < 0 ? 0 : count);	
	});

	$(".scj_btn").click(function(){
		if($(this).attr("class") == "scj_btn"){
			$(this).addClass("on");
		}else{
			$(this).removeClass("on");
		}
	});

	$(".hf_btn").click(function(){
		if($(this).parents(".comment_1").find(".hf_input").attr("class") == "hf_input"){
			$(this).parents(".comment_1").find(".hf_input").addClass("dn");
		}else {
			$(this).parents(".comment_1").find(".hf_input").removeClass("dn");
		}
	});

	$(".z_btn").click(function(){
		if($(this).attr("class") == "z_btn"){
			var zNum = $(this).find(".num").html();
			$(this).find(".num").html(parseInt(zNum)+1);
			$(this).addClass("on");
		}else{
			alert("只能点赞一次哟");
		}
	});

	$(".detail_menu_ul>li").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		var index = $(this).index();
		$(".detail_con_box>.detail_con").eq(index).removeClass("dn").siblings().addClass("dn");
	});

	if($(".address_item>li").length > 3){
		$(".address_item>li").each(function(i){
			$(".address_item>li").eq(i).hide();
			$(".address_item>li").eq(0).show();
			$(".address_item>li").eq(1).show();
			$(".address_item>li").eq(2).show();
		});
	}else{
		$(".more_address").hide();
	}
	
	$(".more_address>a").click(function(){
		if($(this).attr("class") == "on"){
			$(this).removeClass("on");
			$(".address_item>li").each(function(i){
				$(".address_item>li").eq(i).hide();
				$(".address_item>li").eq(0).show();
				$(".address_item>li").eq(1).show();
				$(".address_item>li").eq(2).show();
			});
			$(this).html("更多地址");
		}else{
			$(this).addClass("on");
			$(".address_item>li").show();
			$(this).html("收起");
		}
	});
	
	//修改
	$(".update_address").click(function(){
        $('.address_item li').each(function(){
			$(this).removeClass('current');
			$(this).find('input').attr('checked',false);
		});
	
		$(this).parents('li').addClass('current');
		$(this).parents('li').find('.orderBox').prop('checked','cheched');
	});

	$(".orderBox").click(function(){
		$(this).parents('li').addClass('current').siblings().removeClass("current");
		$(this).parents('li').find('.orderBox').prop('checked','cheched');
	});

	//删除
	$(".delete_address").click(function(){
		if (confirm("确认要删除该地址？")) {
			$(this).parents("li").remove();
	    }
	});

	$(".label_check").click(function(){
		if($(this).attr("class") == "label_check"){
			$(this).addClass("on");
		}else{
			$(this).removeClass("on");
		}
	});

	// person
	if($(".person_con_1").height()+80>$(".person_menu").height()){
		$(".person_menu").height($(".person_con_1").height()+40);
	}

	$(".order_delete_btn").click(function(){
		var newsCon = $(this).parents("tr.parent_tr");
		popRemind('orderDeletePop');

		$(".order_qr_btn").unbind("click");
		$(".order_qr_btn").click(function(){
			closePopFunc(this);
			newsCon.remove();
		});
	});

	$(".order_fl_ul>li").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		var index = $(this).index();
		$(".order_fl_list>div").eq(index).removeClass("dn").siblings().addClass("dn");
	});

	$(".upload_pt_ul i.ic_delete").click(function(){
		$(this).parents("li").remove();
	});

	$(".tag_delete_btn").click(function(){
		var newsCon = $(this).parents("li");
		popRemind('tagDeletePop');

		$(".tag_qr_btn").unbind("click");
		$(".tag_qr_btn").click(function(){
			closePopFunc(this);
			newsCon.remove();
		});
	});

	$(".tag_menu>a").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		var index = $(this).index();
		$(".tag_all_box>div").eq(index).removeClass("dn").siblings().addClass("dn");
	});

	$(".sex_list>a").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
	});
});

// 弹出框
function popRemind(id){
    $("#" + id).css("display","block");
}

function closeWindow(id){
    $("#" + id).css("display","none");
}

// 关闭弹出框
function closePopFunc(obj){
    $(obj).parents(".wrapper_box").css("display","none");
}

function addressTopFunc(){
	var addressTop = parseInt(document.body.scrollTop + document.documentElement.scrollTop + ($(window).height()-$(".address_pop").height()) / 2);
	if(addressTop <= 0){
		addressTop = 0;
	}
	$(".address_pop").css("marginTop",addressTop);
}