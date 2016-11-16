// 全选
function labelCheckFunc(obj){
	if($(obj).attr("class") == "all_check_label"){
		$(".all_check_label").addClass("on");
		$(".shop_content label.label_check").addClass("on");
		allChecked.prop('checked', 'checked');
		allChecked.click();
	}else{
		$(".all_check_label").removeClass("on");
		$(".shop_content label.label_check").removeClass("on");
		allChecked.prop('checked', false);
		allChecked.click();
	}
}

$(function(){
	// 批量删除
	allChecked = $('.all_checked');
    var items = $(':checkbox[name=inputName]');

    //全选与全不选一体实现
    allChecked.click(function(){
		//列表中选框和全选选框统一状态
        items.add(allChecked).prop('checked', this.checked);

        if(allChecked.is(":checked")){
    		var totalPrice = 0;
    		var all_num;
		    $('.mAllPrice').each(function(i){
		    	totalPrice += parseFloat($('.mAllPrice').eq(i).html());
		    	all_num= i;
		    });
		    $(".all_price").html(parseFloat(totalPrice).toFixed(2));
		    $("#checkNumId").html(all_num+1);
		    if(all_num == undefined){
		    	$("#checkNumId").html(0);
		    }
    	}else{
    		$(".all_price").html("0.00");
    		$("#checkNumId").html(0);
    	}
    });
	
    //选框的点击事件
    items.click(function(e){
        //阻止冒泡,避免行点击事件中,直接选择选框无效
        e.stopPropagation();
        var inputNum = $(this).parents(".order_table_1").find(".input_2").val();
        var priceNum = $(this).parents(".order_table_1").find(".p_num").html();
        if(this.checked){
        	// 选中
        	var allPrice = $(".all_price").html();
        	// alert(allPrice);
        	$(".all_price").html(parseFloat(parseFloat(allPrice) + parseFloat(priceNum)*inputNum).toFixed(2));
        	
        }else{
        	// 没选中
        	var allPrice = $(".all_price").html();
        	$(".all_price").html(parseFloat(parseFloat(allPrice) - parseFloat(priceNum)*inputNum).toFixed(2));
        }
		//判断选中个数与实际个数是否相同,以确定全选/全不选状态
		if(items.size() == items.filter(':checked').size()){
			allChecked.prop('checked', items.size() == items.filter(':checked').size());
			$(".all_check_label").addClass("on");
			allChecked.prop('checked', 'checked');
		}else{
			$(".all_check_label").removeClass("on");
			allChecked.prop('checked', false);
		}

        $("#checkNumId").html(items.filter(':checked').size());
    });
	
	// 全部删除
	$("#deleteTabId").click(function(){
		var allcheck = $(':checkbox[name=inputName]');
		var number = 0;
	    for(var i = 0;i < allcheck.length;i++){
	        if(allcheck[i].checked){
	        	number++;
	        }
	    }
	    if(number == 0){
	    	alert("请选择要删除的内容！");
	    }else {
	    	$("#tbWzId").html("确认要删除这些宝贝吗？");
	    	popRemind('wrapperPopId_1');
	    	$(".delete_confirm").unbind("click");
	    	$(".delete_confirm").click(function(){
				var flag = true;
				if(flag == true){
					// 批量删除成功
					$(':checked:not(".all_checked")').parents(".order_table_1").remove();
					closePopFunc(this);

					var arr = [];
					$(".shop_box").each(function(i){
						if($(".shop_box").eq(i).find(".order_table_1").length == 0){
							$(".shop_box").eq(i).remove();
						}
					});

					$(".all_price").html("0.00");
					$("#checkNumId").html(0);
				}
			});
	    }
	});

	// 全部移到收藏夹
	$(".all_yichu").click(function(){
		var allcheck = $(':checkbox[name=inputName]');
		var number = 0;
	    for(var i = 0;i < allcheck.length;i++){
	        if(allcheck[i].checked){
	        	number++;
	        }
	    }
	    if(number == 0){
	    	alert("请选择要移出到收藏夹的商品！");
	    }else {
	    	$("#tbWzId").html("确认要移出这些宝贝到收藏夹吗？");
	    	popRemind('wrapperPopId_1');
	    	$(".delete_confirm").unbind("click");
	    	$(".delete_confirm").click(function(){
				var flag = true;
				if(flag == true){
					// 批量移出成功
					$(':checked:not(".all_checked")').parents(".order_table_1").remove();
					closePopFunc(this);

					var arr = [];
					$(".shop_box").each(function(i){
						if($(".shop_box").eq(i).find(".order_table_1").length == 0){
							$(".shop_box").eq(i).remove();
						}
					});

					$(".all_price").html("0.00");
					$("#checkNumId").html(0);
				}
			});
	    }
	});

	// 删除单个商品
	$(".delete_shop_btn").click(function(){
		var mkCon = $(this).parents(".order_table_1");
		var hdNum = $(this).parents(".order_table_1").find(".mAllPrice").html();
		// var checkZt = $(this).parents(".order_table_1").find(':checkbox[name=inputName]');
		var checkFlag = $(this).parents(".order_table_1").find(':checkbox[name=inputName]').is(":checked");
		var allShop = $(this).parents(".shop_box");
		
		$("#tbWzId").html("确认要删除该宝贝吗？");
		popRemind('wrapperPopId_1');
		$(".delete_confirm").unbind("click");
    	$(".delete_confirm").click(function(){
    		mkCon.remove();
    		if(checkFlag == true){
				$("#checkNumId").html(parseInt($("#checkNumId").html())-1);
				$(".all_price").html(parseFloat(($(".all_price").html())-parseFloat(hdNum)).toFixed(2));
				// checkZt.prop('checked', false);
			}

			if(allShop.find(".order_table_1").length == 0){
				allShop.remove();
			}

			closePopFunc(this);
		});
	});

	// 移到单个到收藏夹
	$(".yichu_shop_btn").click(function(){
		var mkCon = $(this).parents(".order_table_1");
		var hdNum = $(this).parents(".order_table_1").find(".mAllPrice").html();
		var checkFlag = $(this).parents(".order_table_1").find(':checkbox[name=inputName]').is(":checked");
		var allShop = $(this).parents(".shop_box");
		
		$("#tbWzId").html("确认要将该宝贝移到收藏夹？");
		popRemind('wrapperPopId_1');
		$(".delete_confirm").unbind("click");
    	$(".delete_confirm").click(function(){
			mkCon.remove();
			if(checkFlag == true){
				$("#checkNumId").html(parseInt($("#checkNumId").html())-1);
				$(".all_price").html(parseFloat(($(".all_price").html())-parseFloat(hdNum)).toFixed(2));
			}

			if(allShop.find(".order_table_1").length == 0){
				allShop.remove();
			}

			closePopFunc(this);
		});
	});

	$('.mAllPrice').each(function(i){
		$(".mAllPrice").eq(i).html(parseFloat($(".mAllPrice").eq(i).parents(".order_table_1").find(".input_2").val()*$(".mAllPrice").eq(i).parents(".order_table_1").find(".p_num").html()).toFixed(2));
    });

	//加购买数量
	$(".ca-plus").click(function() {
		var inputEle = $(this).parent().find("[name='cart_unit_count']");
		var count = parseInt(inputEle.val()) + 1;

		$(this).parent().find("[name='cart_unit_count']").val(count);

		priceFunc(this);
	});

	//减购买数量
	$(".ca-minus").click(function() {
		var inputEle = $(this).parent().find("[name='cart_unit_count']");
		var count = parseInt(inputEle.val()) - 1;
		if (count < 1) {
			alert("最少不能低于1件！");
			return;
		}

		$(this).parent().find("[name='cart_unit_count']").val(count < 0 ? 0 : count);
		priceFunc(this);
	});

	function priceFunc(obj){
		var inputNum = $(obj).parents(".order_table_1").find(".input_2").val();
	    var priceNum = $(obj).parents(".order_table_1").find(".p_num").html();
	    var mAllPrice = inputNum*priceNum;
	    $(obj).parents(".order_table_1").find(".mAllPrice").html(parseFloat(mAllPrice).toFixed(2));

	    var totalPrice = 0;
	    $('.mAllPrice').each(function(i){
	    	if($(':checkbox[name=inputName]').eq(i).is(":checked")){
	    		totalPrice += parseFloat($('.mAllPrice').eq(i).html());
	    	}
	    });
	    $(".all_price").html(parseFloat(totalPrice).toFixed(2));
	}

	// 结算按钮
	$(".account_btn").click(function(){
		if($(".all_price").html() == 0){
			alert("请选择要购买的商品！");
    	}else{
    		window.location.href = "shopping_process_1.html";
    	}
	});
});

