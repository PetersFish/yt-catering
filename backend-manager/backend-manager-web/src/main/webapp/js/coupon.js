var memberLevelCacheJson = []; // 缓存会员等级信息
var memberGroupCacheJson = []; // 缓存会员分组信息
var memberListCacheJson = []; // 缓存第一页会员数据
var generateCouponUseInfoJson = []; // 多个数据集合，会员或等级或分组id
$(function () {
    pageLoadCoupon('');
});

//单个checkbox选中取消
$(document).unbind("click", ".check-box").on("click", ".check-box", function () {
    $("#userid").val($(this).find("input").data("user_id"));
    if (!$(this).find("input").prop("checked")) {
        $('input[name="subbox"]').prop("checked", false);
        $('input[name="subbox"]').parent().parent().removeClass('checkedBox');
        $(this).find("input").prop("checked", true);
        $(this).addClass('checkedBox');

        if ($('input[name="subbox"]:checked').length == $('input[name="subbox"]').length) {
            $("#checkAll").find("input").prop("checked", true);
            $("#checkAll").addClass('checkedBox');
        }
    }
    else {
        $("#userid").val("");
        $(this).find("input").prop("checked", false);
        $(this).removeClass('checkedBox');
        $("#checkAll").find("input").prop("checked", false);
        $("#checkAll").removeClass('checkedBox');
    }
    if ($(".checkedBox").length > 0) {
        $(".unlinks li").addClass("active");
    } else {
        $(".unlinks li").removeClass("active");
    }
});

// 加载日期插件
function loadLaydate() {
    var start = {
        elem: '#sv_coupon_bendate',
        format: 'YYYY/MM/DD',
        min: laydate.now(),
        istoday: true,
        choose: function (datas) {
            end.min = datas; //开始日选好后，重置结束日的最小日期
            end.start = datas //将结束日的初始值设定为开始日
        }
    };
    var end = {
        elem: '#sv_coupon_enddate',
        format: 'YYYY/MM/DD',
        min: laydate.now(),
        istoday: true,
        choose: function (datas) {
            start.max = datas; //结束日选好后，重置开始日的最大日期           
        }
    };
    laydate(start);
    laydate(end);
    laydate.skin('molv');//主题皮肤
}

// 是否售卖
$(document).unbind("click", "#sv_coupon_is_sale").on("click", "#sv_coupon_is_sale", function () {
    var isCheck = $('#sv_coupon_is_sale').is(':checked');
    if (isCheck) {
        $('#sv_coupon_selling_price_li').show();
    }
    else {
        $('#sv_coupon_selling_price_li').hide();
        $('#sv_coupon_selling_price').val('');
    }
});

// 优惠券类型选择
$(document).unbind("change", "input[name='sv_coupon_type']").on("change", "input[name='sv_coupon_type']", function () {
    var value = $(this).val();
    if (value == 1) { // 折扣券
        //$('#sv_coupon_is_superposition_li').hide();
        $('#sv_coupon_is_superposition').val('');
        $('#sv_coupon_type_text').html('折扣');
        $('#sv_coupon_is_superposition').val(false);
        $('#sv_coupon_money_type').text('%');
    }
    else {// 优惠券
        //$('#sv_coupon_is_superposition_li').show();
        $('#sv_coupon_type_text').html('面值');
        $('#sv_coupon_is_superposition').attr('checked', false);
        $('#sv_coupon_money_type').text('元');
    }
});

// 日期类型选择
$(document).unbind("change", "#sv_coupon_termofvalidity_type").on("change", "#sv_coupon_termofvalidity_type", function () {
    var value = $(this).val();
    if (value == 1) { // 日期
        $('#sv_coupon_bendate_li').hide();
        $('#sv_coupon_enddate_li').hide();
        $('#sv_coupon_numday_li').show();
        $('#sv_coupon_numday').val('');
    }
    else { // 天数
        $('#sv_coupon_bendate_li').show();
        $('#sv_coupon_enddate_li').show();
        $('#sv_coupon_numday_li').hide();
    }
});

// 保存数据信息
$(document).unbind("click", "#btnSaveCouponInfo").on("click", "#btnSaveCouponInfo", function () {
    var sv_coupon_id = $('#sv_coupon_id').val().replace(/\ +/g, "");
    var sv_coupon_name = $('#sv_coupon_name').val().replace(/\ +/g, "");
    var sv_coupon_type = $("input[name='sv_coupon_type']:checked").val();
    var sv_coupon_money = $('#sv_coupon_money').val().replace(/\ +/g, "");
    var sv_coupon_use_conditions = $('#sv_coupon_use_conditions').val().replace(/\ +/g, "");
    var sv_coupon_is_superposition = $('#sv_coupon_is_superposition').is(':checked');
    var sv_coupon_termofvalidity_type = $('#sv_coupon_termofvalidity_type').val();
    var sv_coupon_bendate = $('#sv_coupon_bendate').val().replace(/\ +/g, "");
    var sv_coupon_enddate = $('#sv_coupon_enddate').val().replace(/\ +/g, "");
    var sv_coupon_is_sale = $('#sv_coupon_is_sale').is(':checked');
    var sv_coupon_is_donation = $('#sv_coupon_is_donation').is(':checked');
    var sv_coupon_selling_price = $('#sv_coupon_selling_price').val().replace(/\ +/g, "");
    var sv_coupon_is_crossshop = $('#sv_coupon_is_crossshop').is(':checked');
    var sv_coupon_toal_num = $('#sv_coupon_toal_num').val().replace(/\ +/g, "");
    var sv_coupon_grant_is_num = $('#sv_coupon_grant_is_num').is(':checked');
    var sv_enabled = true;
    var sv_remark = $('#sv_remark').val().replace(/\ +/g, "");
    var sv_coupon_numday = $('#sv_coupon_numday').val().replace(/\ +/g, "");
    if (!isNullOrWhiteSpace(sv_coupon_name)) {
        layer.msg("请输入优惠券名称");
        $('#sv_coupon_name').focus();
        return;
    }
    if (sv_coupon_type == 0 && !isNullOrWhiteSpace(sv_coupon_money)) {
        layer.msg("优惠券面值不能为空，并且大于零！");
        $('#sv_coupon_money').focus();
        return;
    }
    if (sv_coupon_type == 0 && parseFloat(sv_coupon_money) < 0) {
        layer.msg("优惠券面值必须大于零！");
        $('#sv_coupon_money').focus();
        return;
    }
    if (sv_coupon_type == 1 && !isNullOrWhiteSpace(sv_coupon_money)) {
        layer.msg("优惠券折扣不能为空，并且大于零！");
        $('#sv_coupon_money').focus();
        return;
    }
    if (sv_coupon_type == 1 && (parseFloat(sv_coupon_money) < 0 || parseFloat(sv_coupon_money) > 100)) {
        layer.msg("优惠券折扣输入范围必须是1到100！");
        $('#sv_coupon_money').focus();
        return;
    }
    if (!isNullOrWhiteSpace(sv_coupon_use_conditions)) {
        layer.msg("优惠券使用条件金额不能为空！");
        $('#sv_coupon_use_conditions').focus();
        return;
    }
    if (parseFloat(sv_coupon_use_conditions) < 0) {
        layer.msg("优惠券使用条件金额必须大于零！");
        $('#sv_coupon_use_conditions').focus();
        return;
    }
    if (sv_coupon_is_sale && !isNullOrWhiteSpace(sv_coupon_selling_price)) {
        layer.msg("优惠券售卖金额不能为空！");
        $('#sv_coupon_selling_price').focus();
        return;
    }
    if (sv_coupon_is_sale && parseFloat(sv_coupon_selling_price) < 0) {
        layer.msg("优惠券售卖金额必须大于零！");
        $('#sv_coupon_selling_price').focus();
        return;
    }
    if (!isNullOrWhiteSpace(sv_coupon_toal_num)) {
        layer.msg("优惠券数量不能为空！");
        $('#sv_coupon_toal_num').focus();
        return;
    }
    if (parseInt(sv_coupon_toal_num) < 0) {
        layer.msg("优惠券数量必须大于零！");
        $('#sv_coupon_toal_num').focus();
        return;
    }
    if (parseInt(sv_coupon_toal_num) > 9999) {
        layer.msg("优惠券数量不能大于9999！");
        $('#sv_coupon_toal_num').focus();
        return;
    }
    if (sv_coupon_termofvalidity_type == 1 && !isNullOrWhiteSpace(sv_coupon_numday)) {
        layer.msg("优惠券有效天数不能为空！");
        $('#sv_coupon_numday').focus();
        return;
    }
    if (sv_coupon_termofvalidity_type == 1 && parseInt(sv_coupon_numday) < 0) {
        layer.msg("优惠券有效天数必须大于零！");
        $('#sv_coupon_numday').focus();
        return;
    }
    if (sv_coupon_termofvalidity_type == 1 && parseInt(sv_coupon_numday) > 365) {
        layer.msg("优惠券有效天数必须不能大于365天！");
        $('#sv_coupon_numday').focus();
        return;
    }
    if (sv_coupon_termofvalidity_type == 0 && !isNullOrWhiteSpace(sv_coupon_bendate)) {
        layer.msg("请选择优惠券有效开始日期！");
        $('#sv_coupon_bendate').focus();
        return;
    }
    if (sv_coupon_termofvalidity_type == 0 && !isNullOrWhiteSpace(sv_coupon_enddate)) {
        layer.msg("请选择优惠券有效结束日期！");
        $('#sv_coupon_enddate').focus();
        return;
    }
    var data = {
        sv_coupon_id: sv_coupon_id,
        sv_coupon_name: sv_coupon_name,
        sv_coupon_type: sv_coupon_type,
        sv_coupon_money: sv_coupon_money,
        sv_coupon_use_conditions: sv_coupon_use_conditions,
        sv_coupon_is_superposition: sv_coupon_is_superposition,
        sv_coupon_termofvalidity_type: sv_coupon_termofvalidity_type,
        sv_coupon_bendate: sv_coupon_bendate,
        sv_coupon_enddate: sv_coupon_enddate,
        sv_coupon_is_sale: sv_coupon_is_sale,
        sv_coupon_is_donation: sv_coupon_is_donation,
        sv_coupon_selling_price: sv_coupon_selling_price,
        sv_coupon_is_crossshop: sv_coupon_is_crossshop,
        sv_coupon_toal_num: sv_coupon_toal_num,
        sv_coupon_grant_is_num: sv_coupon_grant_is_num,
        sv_enabled: sv_enabled,
        sv_remark: sv_remark,
        sv_coupon_numday: sv_coupon_numday
    };
    var loadIndex = commonOpenLoading();
    $.postAsyncJson('/Coupon/OperateCoupon', data, function (result) {
        commonCloseLoading(loadIndex);
        if (result.succeed) {
            $('#sv_coupon_id').val('');
            commondResultMsg('保存数据成功', 1, 2000);
            pageLoadCoupon('');
        }
        else {
            (result.errmsg, 2, 2000);
        }
    });
});

// 新增
$('#btnAddCoupon').click(function () {
    Deke.DeKe_dialog.show_Url2('新增优惠券', '/Coupon/_PartialOperateCoupon?couponId=0', funcAddCoupon, ['720px', '480px']);
});

function funcAddCoupon() {
    setTimeout(function () {
        loadLaydate();
        $("#sv_coupon_bendate").val(new Date().Format("yyyy-MM-dd"));
        $("#sv_coupon_enddate").val(new Date().Format("yyyy-MM-dd"));
    }, 200);
}

// 编辑
$('#btnUpdateCoupon').click(function () {
    var id = $('.select_check-box.checkedBox').attr('data-id');
    if (id > 0) {
        Deke.DeKe_dialog.show_Url2('修改优惠券', '/Coupon/_PartialOperateCoupon?couponId=' + id, funcEditCoupon, ['720px', '480px']);
    }
    else {
        commondResultMsg('请选择编辑的数据', 3, 800);
    }
});

// 编辑方法回调
function funcEditCoupon() {
    setTimeout(function () {
        loadLaydate();
        $('input').attr('disabled', 'disabled');
        $('select').attr('disabled', 'disabled');
        $('#sv_coupon_name, #sv_remark').removeAttr('disabled')
    }, 200);
}

// 删除
$('#btnDeleteCoupon').click(function () {
    var id = $('.select_check-box.checkedBox').attr('data-id');
    if (id > 0) {
        layer.confirm('是否确认删除该数据？', {
            btn: ['是', '否'] //按钮
        }, function () {
            $.postAsyncJson('/Coupon/DeleteCoupon', { couponId: id }, function (result) {
                if (result.succeed) {
                    commondResultMsg('删除数据成功！', 1, 800);
                    pageLoadCoupon('');
                }
                else {
                    commondResultMsg(result.errmsg, 2, 800);
                }
            });
        }, function () {
        });
    }
    else {
        commondResultMsg('请选择要删除的优惠券', 3, 800);
    }
});

// 刷新数据列表
$('#btnRefreshCoupon').click(function () {
    pageLoadCoupon('');
});

// 取消添加或编辑
$(document).unbind("click", "#btnCancel").on("click", "#btnCancel", function () {
    layer.closeAll();
});

// 模糊查询数据信息
$('#txtSeachCoupon').keypress(function (event) {
    if (event.keyCode == 13) {
        var seachStr = $(this).val().replace(/\ +/g, "");
        if (isNullOrWhiteSpace(seachStr)) {
            pageLoadCoupon(seachStr);
        }
        else {
            layer.msg('请输入要查询的数据！');
        }
    }
});

// 加载分页器
function pageLoadCoupon(seachStr) {
    var pageSize = 15;
    $.get("/Coupon/GetCouponTotal/", {
        seachStr: seachStr,
        couponState: $('#selectCouponState').val()
    }, function (data) {
        var i = Math.ceil(data.values / pageSize);
        laypage({
            cont: $('#pageCouponList'),
            pages: i, //总页数
            skin: 'molv', //皮肤
            first: '首页', //若不显示，设置false即可
            last: '尾页', //若不显示，设置false即可
            prev: '上一页', //若不显示，设置false即可
            next: '下一页', //若不显示，设置false即可
            curr: location.hash.replace('#!page=', ''), //获取hash值为fenye的当前页
            hash: 'page', //自定义hash值
            jump: function (e, first) {
                getCouponPageList(e.curr, pageSize, seachStr);
            }
        });

    });
}

// bool转字符串
function convertBoolToString(bool) {
    if (bool) {
        return '是';
    }
    else {
        return '否';
    }
}

// 数据分页
function getCouponPageList(pageIndex, pageSize, seachStr) {
    var couponListHtml = '';
    var loadIndex = commonOpenLoading();
    $.getAsyncJson('/Coupon/GetCouponPageList', {
        pageIndex: pageIndex,
        pageSize: pageSize,
        seachStr: seachStr,
        couponState: $('#selectCouponState').val()
    }, function (result) {
        commonCloseLoading(loadIndex);
        if (result.succeed && result.values != null && result.values.length > 0) {
            var couponData = result.values;
            for (var i = 0; i < couponData.length; i++) {
                var sv_coupon_type = couponData[i].sv_coupon_type == 0 ? '代金券' : '折扣券';
                var sv_coupon_money_type = couponData[i].sv_coupon_type == 0 ? '元' : '%';
                var sv_coupon_is_superposition = couponData[i].sv_coupon_is_superposition == true ? '是' : '否';
                var sv_coupon_termofvalidity_type = couponData[i].sv_coupon_termofvalidity_type == 1 ? '天数' : '日期';
                var sv_coupon_is_sale = couponData[i].sv_coupon_is_sale == true ? '是' : '否';
                var sv_remark = '';
                if (sv_remark) {
                    sv_remark = couponDatap[i].sv_remark
                }
                var sv_coupon_state = '';
                if (couponData[i].sv_coupon_state == 0) {
                    sv_coupon_state = '待发放';
                }
                else if (couponData[i].sv_coupon_state == 1) {
                    sv_coupon_state = '已发放';
                }
                else if (couponData[i].sv_coupon_state == 2) {
                    sv_coupon_state = '已过期';
                }
                couponListHtml += '<tr class="selectChk" data-enabled="true">';
                couponListHtml += '<td><div class="check-box select_check-box" data-id="' + couponData[i].sv_coupon_id + '"><i>';
                couponListHtml += '<input type="checkbox" name="subbox" data-id="' + couponData[i].sv_coupon_id + '"></i></div></td>';
                couponListHtml += '<td>' + couponData[i].sv_coupon_name + '</td>';
                couponListHtml += '<td>' + sv_coupon_type + '</td>';
                couponListHtml += '<td>' + couponData[i].sv_coupon_money + sv_coupon_money_type + '</td>';
                couponListHtml += '<td>满' + couponData[i].sv_coupon_use_conditions + '元</td>';
                couponListHtml += '<td>' + sv_coupon_is_superposition + '</td>';
                couponListHtml += '<td>' + sv_coupon_termofvalidity_type + '</td>';
                if (couponData[i].sv_coupon_termofvalidity_type == 1) {
                    couponListHtml += '<td>' + couponData[i].sv_coupon_numday + '天</td>';
                }
                else { // 日期
                    couponListHtml += '<td>' + new Date(couponData[i].sv_coupon_bendate).Format("yyyy-MM-dd") + '至' + new Date(couponData[i].sv_coupon_enddate).Format("yyyy-MM-dd") + '</td>';
                }
                //couponListHtml += '<td>' + sv_coupon_is_sale + '</td>';
                //couponListHtml += '<td>' + couponData[i].sv_coupon_selling_price + '元</td>';
                //couponListHtml += '<td>' + convertBoolToString(couponData[i].sv_coupon_is_donation) + '</td>';
                couponListHtml += '<td>' + couponData[i].sv_coupon_toal_num + '</td>';
                couponListHtml += '<td>' + couponData[i].sv_coupon_surplus_num + '</td>';
                //couponListHtml += '<td>' + couponData[i].sv_coupon_totalmoney + '</td>';
                //couponListHtml += '<td>' + couponData[i].sv_coupon_already_money + '</td>';
                couponListHtml += '<td>' + sv_coupon_state + '</td>';
                couponListHtml += '<td>' + new Date(couponData[i].sv_creation_date).Format("yyyy-MM-dd hh:mm:ss") + '</td>';
                //couponListHtml += '<td>' + sv_remark + '</td>';
                //couponListHtml += '<td><a href="javascript:void(0);" data-id ="' + couponData[i].sv_coupon_id + '" class="couponInfo">详情</a></td>'
                couponListHtml += '</tr>'
            }
        }
        else {
            commondResultMsg(result.errmsg, 1, 600);
        }
        $('#CouponTableListHtml').html(couponListHtml);
    });
}

// 发放优惠券

$('#btnGenerateCoupon').click(function () {
    var id = $('.select_check-box.checkedBox').attr('data-id');
    if (id > 0) {
        Deke.DeKe_dialog.show_Url3('发放优惠券', '/CouponRecord/_PartialOperateCouponRecord?couponId=' + id, funcGenerateCoupon(id), ['500px', '600px'], "generateCouponBodyId");
    }
    else {
        commondResultMsg('请选择要发放的优惠券', 3, 800);
    }
});

// 发放优惠券回调方法
function funcGenerateCoupon(id) {
    setTimeout(function () {
        if (memberLevelCacheJson.length == 0 || memberLevelCacheJson == null) {
            $.get("/Ajaxdata/GetUserconfig", function (data) {
                if (data) {
                    memberLevelCacheJson = data.getUserLevel;
                    memberGroupCacheJson = data.getMembergroup;
                }
            });
        }
    }, 200);
}

// 选择会员或等级或分组
$(document).unbind("click", "#SelectMemberListHtml li").on("click", "#SelectMemberListHtml li", function () {
    var isChecked = $(this).hasClass('active');
    var memberId = $(this).attr('data-id');
    var mobile = $(this).attr('data-mobile');
    var name = $(this).attr('data-name');
    if (isChecked) {
        for (var i = 0; i < generateCouponUseInfoJson.length; i++) {
            if (generateCouponUseInfoJson[i].UseIds == memberId) {
                generateCouponUseInfoJson.splice(index, 1);
            }
        }
        $(this).removeClass('active');
    }
    else {
        $(this).addClass('active');
        var model = { UseIds: memberId, sv_mr_mobile: mobile, sv_mr_name: name };
        generateCouponUseInfoJson.push(model);
    }
    $('#SelectMemberNum').html(generateCouponUseInfoJson.length);
});

// 全选商品或分类
$(document).unbind("click", "#selectCheckAll").on("click", "#selectCheckAll", function () {
    // 获取ids,名称
    var cateringTasteTypeList = $("#SelectMemberListHtml li");
    var isActive = true;
    $.each(cateringTasteTypeList, function (index, item) {
        isActive = pushListIdsArrays($(this).attr('data-id'), $(this).attr('data-mobile'), $(this).attr('data-name'));
    });
    if (isActive) {
        $('#SelectMemberNum').html(generateCouponUseInfoJson.length);
        $("#SelectMemberListHtml li").addClass('active');
    }
});

// 向集合里加数据
function pushListIdsArrays(id, mobile, name) {
    var isExists = false;
    var isActive = true;
    if (generateCouponUseInfoJson.length > 0) {
        if (generateCouponUseInfoJson.length < 9000) {
            for (var i = 0; i < generateCouponUseInfoJson.length; i++) {
                if (generateCouponUseInfoJson[i].UseIds == id) {
                    isExists = true;
                }
            }
            if (!isExists) {
                var model = { UseIds: id, sv_mr_mobile: mobile, sv_mr_name: name };
                generateCouponUseInfoJson.push(model);
            }
        }
        else {
            isActive = false;
            layer.msg('最多只能选择9000条数据！');
        }
    }
    else {
        var model = { UseIds: id, sv_mr_mobile: mobile, sv_mr_name: name };
        generateCouponUseInfoJson.push(model);
    }
    return isActive;
}

// 反选商品或分类
$(document).unbind("click", "#selectUnCheckAll").on("click", "#selectUnCheckAll", function () {
    generateCouponUseInfoJson = [];
    $("#SelectMemberListHtml li").removeClass('active');
    $('#SelectMemberNum').html(generateCouponUseInfoJson.length);
});

// 发放优惠券弹窗宽度调整  type（0 --  宽度变短，1 --宽度变宽）
function generateCoponWeindowsAuto(type, isMemberList) {
    generateCouponUseInfoJson = [];
    $('#SelectMemberNum').html(0);
    var thisWindowsWidth = $("#generateCouponBodyId").parent().width();
    if (thisWindowsWidth >= 700 && type == 0) {
        $("#generateCouponBodyId").parent().width($("#generateCouponBodyId").parent().width() - 200);
        $("#shareul").addClass("col-xs-12").removeClass("col-xs-8");
        $('#showCouponMemberList').hide();
        $('#generateCouponNum_li').show();
        $('#SelectMemberNum_li').hide();
        $('.memberLevelListSelect').hide();
    }

    if (thisWindowsWidth < 700 && type == 1) {
        $("#generateCouponBodyId").parent().width($("#generateCouponBodyId").parent().width() + 200);
        $("#shareul").addClass("col-xs-8").removeClass("col-xs-12");
        $('#showCouponMemberList').show();
        $('#generateCouponNum_li').hide();
        $('#GenerateCouponNum').val('');
        $('#SelectMemberNum_li').show();
        if (isMemberList) {
            $('.memberLevelListSelect').show();
            $('#memberLevelListSelect').show();
        }
        else {
            $('#memberLevelListSelect').hide();
            $('.memberLevelListSelect').hide();
        }
    }
}

// 根据发放方式读取相应的数据
function getMemberLevelCacheJson(type, isShowMemberLevel) {
    $('#pageMemberLists').html('');
    var memberListHtml = '';
    if (isShowMemberLevel) {
        memberListHtml += '<option value="-1" selected>选择会员等级筛选</option>';
    }
    if (type == 0) { // 加载会员等级数据
        if (memberLevelCacheJson != null && memberLevelCacheJson.length > 0) {
            for (var i = 0; i < memberLevelCacheJson.length; i++) {
                if (isShowMemberLevel) { // 加载会员等级下拉数据
                    memberListHtml += '<option value="' + memberLevelCacheJson[i].memberlevel_id + '">' + memberLevelCacheJson[i].sv_ml_name + '</option>';
                }
                else {
                    memberListHtml += '<li data-id="' + memberLevelCacheJson[i].memberlevel_id + '"><i class="square"></i><span>' + memberLevelCacheJson[i].sv_ml_name + '</span></li>';
                }
            }
        }
    }
    else if (type == 1) { // 加载会员分组数据
        if (memberGroupCacheJson != null && memberGroupCacheJson.length > 0) {
            for (var i = 0; i < memberGroupCacheJson.length; i++) {
                memberListHtml += '<li data-id="' + memberGroupCacheJson[i].membergroup_id + '"><i class="square"></i><span>' + memberGroupCacheJson[i].sv_mg_name + '</span></li>';
            }
        }
    }
    if (isShowMemberLevel) { // 加载会员等级下拉数据
        $('#memberLevelListSelect').html(memberListHtml);
    }
    else {
        $('#SelectMemberListHtml').html(memberListHtml);
    }
}

// 会员数据分页
function pageMemberList(levelIdOrGroupId, type, seachStr) {
    var pageSize = 20;
    $.getJSON("/CouponRecord/GetMemberIdTotal", {
        levelIdOrGroupId: levelIdOrGroupId,
        type: type,
        seachStr: seachStr
    }, function (data) {
        var i = Math.ceil(data.values / pageSize);
        laypage({
            cont: 'pageMemberLists', //容器。值支持id名、原生dom对象，jquery对象,
            pages: i, //总页数
            groups: 0,
            first: false,
            last: false,
            //curr: location.hash.replace('#!page=', ''), //获取hash值为fenye的当前页
            //hash: 'page', //自定义hash值
            jump: function (obj, first) {
                getMemberIdList(levelIdOrGroupId, type, obj.curr, pageSize, seachStr);
            }
        });
    });
}

// 加载会员数据列表
function getMemberIdList(levelIdOrGroupId, type, pageIndex, top, seachStr) {
    $.getJSON("/CouponRecord/GetMemberIdList", {
        levelIdOrGroupId: levelIdOrGroupId,
        type: type,
        pageIndex: pageIndex,
        top: top,
        seachStr: seachStr
    }, function (data) {
        if (data.values != null && data.values.length > 0) {
            var memberListData = data.values;
            if (type == -1) {
                memberListCacheJson = memberListData;
            }
            getMemberListCacheJson(memberListData);
        }
        else {
            $('#SelectMemberListHtml').html('');
        }
    });
}

// 读取缓存会员数据
function getMemberListCacheJson(data) {
    var memberListData = data;
    var memberListHtml = '';
    for (var i = 0; i < memberListData.length; i++) {
        var isActive = '';
        if (generateCouponUseInfoJson != null && generateCouponUseInfoJson.length > 0) {
            for (var j = 0; j < generateCouponUseInfoJson.length; j++) {
                if (generateCouponUseInfoJson[j].UseIds == memberListData[i].useIds) {
                    isActive = 'active';
                    break;
                }
            }
        }
        memberListHtml += '<li class="' + isActive + '" data-id="' + memberListData[i].useIds + '" data-mobile="' + memberListData[i].sv_mr_mobile + '" data-name="' + memberListData[i].sv_mr_name + '"><i class="square"></i><span>' + memberListData[i].sv_mr_mobile + '(' + memberListData[i].sv_mr_name + ')</span></li>';
    }
    $('#SelectMemberListHtml').html(memberListHtml);
}

$(document).unbind("keypress", "#txtSeachSeachMemberName").on("keypress", "#txtSeachSeachMemberName", function (event) {
    if (event.keyCode == 13) {
        $('#btnSeachMemberList').click();
    }
});

// 模糊查询会员信息
$(document).unbind("click", "#btnSeachMemberList").on("click", "#btnSeachMemberList", function () {
    var txtSeachSeachMemberName = $('#txtSeachSeachMemberName').val().replace(/\ +/g, "");
    var id = $('#memberLevelListSelect').val();
    if (isNullOrWhiteSpace(txtSeachSeachMemberName)) {
        if (id > 0) {
            pageMemberList(id, 0, txtSeachSeachMemberName);// 加载会员列表数据
        }
        else {
            pageMemberList(0, -1, txtSeachSeachMemberName);// 加载会员列表数据
        }
    }
    else {
        layer.msg('请输入你要查询的会员');
        $('#txtSeachSeachMemberName').focus();
    }
});

// 右侧会员等级下拉筛选会员列表
$(document).unbind("change", "#memberLevelListSelect").on("change", "#memberLevelListSelect", function () {
    var id = $(this).val();
    if (id > 0) {
        location.hash.replace('#!page=', '')
        pageMemberList(id, 0, null);// 加载会员列表数据
    }
    else {
        pageMemberList(0, -1, null);// 加载会员列表数据
    }
});

// 根据发放方式读取相应的数据列表GenerateCouponType
$(document).unbind("change", "#GenerateCouponType").on("change", "#GenerateCouponType", function () {
    var id = $(this).val();
    if (id == 0) {
        pageMemberList(0, -1, null);// 加载会员列表数据
        generateCoponWeindowsAuto(1, true); // 变宽
        getMemberLevelCacheJson(0, true);
        $('.memberLevelListSelect').show();
        $('.selecctseachproduct').show();
    }
    else if (id == 1) {
        getMemberLevelCacheJson(0);//  按会员等级
        generateCoponWeindowsAuto(1); // 变宽
        hideLiHtml();
    }
    else if (id == 2) { //  按会员分组
        getMemberLevelCacheJson(1);
        generateCoponWeindowsAuto(1); // 变宽
        hideLiHtml();
    }
    else if (id == 3) { // 全部会员发放
        generateCoponWeindowsAuto(0); // 变窄
        $('#generateCouponNum_li').hide();
        $('#GenerateCouponNum').val('');
        hideLiHtml();
    }
    else if (id == 4) { // 生成优惠码
        generateCoponWeindowsAuto(0); // 变窄
        hideLiHtml();
        $('#generateCouponNum_li').show();
    }
    else if (id == 5) { // 按会员最后消费时间发放
        generateCoponWeindowsAuto(0); // 变窄
        hideLiHtml();
        $('#generateCouponNum_li').hide();
        $('#generateCouponToMemberConsume_li').show();
    }
});

// 隐藏标签
function hideLiHtml() {
    $('#memberLevelListSelect').hide();
    $('.memberLevelListSelect').hide();
    $('.selecctseachproduct').hide();
    $('#generateCouponToMemberConsume_li').hide();
}

// 发放优惠券
$(document).unbind("click", "#btnSaveGenerateCouponInfo").on("click", "#btnSaveGenerateCouponInfo", function () {
    var generateCouponType = $('#GenerateCouponType').val();
    var generateCouponNum = $('#GenerateCouponNum').val();
    var generateCouponToMemberConsume = $('#GenerateCouponToMemberConsume').val().trim();
    if (generateCouponType == 4 && !isNullOrWhiteSpace(generateCouponNum)) {
        layer.msg('请输入发放优惠券数量！');
        $('#GenerateCouponNum').focus();
        return;
    }
    if (generateCouponType == 4 && parseInt(generateCouponNum <= 0)) {
        layer.msg('请输入正确的优惠券数量！');
        $('#GenerateCouponNum').focus();
        return;
    }
    if (generateCouponType == 4 && parseInt(generateCouponNum > 9999)) {
        layer.msg('优惠券数量不能超过9999');
        $('#GenerateCouponNum').focus();
        return;
    }

    if (generateCouponType == 5 && (!generateCouponToMemberConsume || generateCouponToMemberConsume <= 0 || generateCouponToMemberConsume >= 365)) {
        layer.msg('请输入会员最后消费天数并且不能大于365天！');
        $('#GenerateCouponToMemberConsume').focus();
        return;
    }

    if (generateCouponType != 4 && generateCouponType != 3 && generateCouponType != 5 && (generateCouponUseInfoJson == null || generateCouponUseInfoJson == '' || generateCouponUseInfoJson == undefined || generateCouponUseInfoJson.length <= 0)) {
        layer.msg('请选择右侧优惠券发放对象！');
        return;
    }

    var data = {
        sv_coupon_id: $('#sv_coupon_id').val(),
        GenerateCouponType: generateCouponType,
        GenerateUseIds: generateCouponUseInfoJson,
        GenerateCouponNum: generateCouponNum,
        ConsumeToDay: generateCouponToMemberConsume
    };
    var loadIndex = commonOpenLoading();
    $.post('/CouponRecord/GenerateCoupon', data, function (result) {
        commonCloseLoading(loadIndex);
        if (result.succeed) {
            commondResultMsg('发放优惠券成功！', 1, 1000);
            pageLoadCoupon(null);
        }
        else {
            if (result.errmsg != null) {
                commondResultMsg(result.errmsg, 3, 1000);
            }
            else {
                commondResultMsg('发放优惠券失败,请稍后再试！', 3, 1000);
            }
        }
    });
});

// 查询
$('#selectCouponState').change(function () {
    var thisSelectStaeteValue = $(this).val();
    if (thisSelectStaeteValue) {
        pageLoadCoupon();
    }
});