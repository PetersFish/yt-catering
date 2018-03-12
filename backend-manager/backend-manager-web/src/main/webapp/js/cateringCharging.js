var _pageTitle = '加料';
var queryType = 0;
$(function () {
    queryType = getQueryString('type');
    if (queryType == 0) {
        _pageTitle = '加料';
    }
    else if (queryType == 1) {
        _pageTitle = '规格';
        pageLoadCateringCharging('', queryType);
    }
    else {
        queryType = 0;
    }
    pageLoadCateringCharging('');
});

//单个checkbox选中取消
$(document).unbind("click", ".check-box,.checkinputall").on("click", ".check-box,.checkinputall", function () {
    if ($(this).attr("id") == "checkAll") {
        if (!$("#checkAll").is(":checked")) {
            $('input[name="subbox"]').prop("checked", false);
            $('input[name="subbox"]').removeClass('checkedBox');
        }
        else {
            $('input[name="subbox"]').prop("checked", true);
            $('input[name="subbox"]').addClass('checkedBox');
        }
    }
    else {
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
    }
});

// 加载日期插件
function loadLaydate() {
}

// 保存数据信息
$(document).unbind("click", "#btnSaveCateringChargingInfo").on("click", "#btnSaveCateringChargingInfo", function () {
    var sv_charging_id = $('#sv_charging_id').val().replace(/\ +/g, "");
    var sv_charging_name = $('#sv_charging_name').val().replace(/\ +/g, "");
    var sv_charging_sort = $('#sv_charging_sort').val().replace(/\ +/g, "");
    var sv_charging_price = $('#sv_charging_price').val().replace(/\ +/g, "");
    var sv_enabled = $('#sv_enabled').is(':checked');
    if (!isNullOrWhiteSpace(sv_charging_name)) {
        layer.msg("请输入" + _pageTitle + "名称！");
        $('#sv_charging_name').focus();
        return;
    }
    if (sv_charging_name.length > 20) {
        layer.msg("" + _pageTitle + "名称不能超过20个字符！");
        $('#sv_charging_name').focus();
        return;
    }
    if (!parseInt(sv_charging_sort) < 0) {
        layer.msg("请输入正确的数字！");
        $('#sv_charging_sort').focus();
        return;
    }
    if (!isNullOrWhiteSpace(sv_charging_price)) {
        layer.msg("请输入" + _pageTitle + "价格！");
        $('#sv_charging_price').focus();
        return;
    }
    if (!parseFloat(sv_charging_price) < 0) {
        layer.msg("请输入正确的金额！");
        $('#sv_charging_price').focus();
        return;
    }
    var data = {
        sv_charging_id: sv_charging_id,
        sv_charging_name: sv_charging_name,
        sv_charging_sort: sv_charging_sort,
        sv_charging_price: sv_charging_price,
        sv_enabled: sv_enabled,
        sv_charging_type: queryType
    };
    var loadIndex = commonOpenLoading();
    $.postAsyncJson('/CateringCharging/OperateCateringCharging', data, function (result) {
        commonCloseLoading(loadIndex);
        if (result.succeed) {
            commondResultMsg('保存数据成功', 1, 1000);
            pageLoadCateringCharging('');
            setTimeout(function () {
                layer.closeAll();
            }, 600);
        }
        else {
            commondResultMsg(result.errmsg, 2, 1000);
            setTimeout(function () {
                layer.closeAll();
            }, 600);
        }
    });
});

// 点击加料名称
$(document).on('click', '#CateringChargingTableListHtml li', function (event) {
    event.preventDefault();
    $(this).addClass("active").siblings("li").removeClass("active");
    var regionId = $(this).attr('data-id');
    pageLoadCateringChargingRelation(regionId);
});

//鼠标移动加料名称的显示的
$(document).on("mouseover", "#CateringChargingTableListHtml li", function () {
    $(this).addClass("showbg");
    $(this).children(".editbigCategorieslist").addClass("show");
    $(this).children(".bigCategorieslist-name").addClass("paddright");
});

$(document).on("mouseout", "#CateringChargingTableListHtml li", function () {
    $(this).removeClass("showbg");
    if ($(this).hasClass("active")) {

    } else {
        $(this).children(".editbigCategorieslist").removeClass("show");
        $(this).children(".bigCategorieslist-name").removeClass("paddright");
    }
});

// 新增
$('#btnAddCateringCharging').click(function () {
    Deke.DeKe_dialog.show_Url2('新增' + _pageTitle + '', '/CateringCharging/_PartialOperateCateringCharging?chargingId=0', '', ['400px', '300px']);
});

// 编辑
$(document).unbind("click", "#CateringChargingTableListHtml .editcateringRegionList").on("click", "#CateringChargingTableListHtml .editcateringRegionList", function (event) {
    console.log("你点击了UL");
    var id = $(this).attr('data-id');
    if (id > 0) {
        Deke.DeKe_dialog.show_Url2('修改' + _pageTitle + '信息', '/CateringCharging/_PartialOperateCateringCharging?chargingId=' + id, funcEditCateringCharging, ['400px', '450px']);
    }
    else {
        commondResultMsg('请选择编辑的数据', 3, 800);
    }
});

// 编辑方法回调
function funcEditCateringCharging() {
}

// 删除
$(document).unbind("click", "#CateringChargingTableListHtml .DeleteCateringRegion").on("click", "#CateringChargingTableListHtml .DeleteCateringRegion", function (event) {
    var id = $(this).attr("data-id");
    var charging_name = $(this).attr("data-name");
    if (id > 0) {
        layer.confirm('是否确认删除“' + charging_name + '”该数据？', {
            btn: ['是', '否'] //按钮
        }, function () {
            $.postAsyncJson('/CateringCharging/DeleteCateringCharging', { chargingId: id }, function (result) {
                if (result.succeed) {
                    commondResultMsg('删除数据成功！', 1, 800);
                    pageLoadCateringCharging('');
                }
                else {
                    commondResultMsg(result.errmsg, 2, 800);
                }
            });
        }, function () {
        });
    }
    else {
        commondResultMsg('请选择要删除的' + _pageTitle + '', 3, 800);
    }
    event.preventDefault();
});

// 刷新数据列表
$('#btnRefreshCateringCharging').click(function () {
    pageLoadCateringCharging('');
});

// 取消添加或编辑
$(document).unbind("click", "#btnCancel").on("click", "#btnCancel", function () {
    layer.closeAll();
});

// 模糊查询数据信息
$('#txtSeachCateringCharging').keypress(function (event) {
    if (event.keyCode == 13) {
        var seachStr = $(this).val().replace(/\ +/g, "");
        if (isNullOrWhiteSpace(seachStr)) {
            pageLoadCateringCharging(seachStr);
        }
        else {
            layer.msg('请输入要查询的数据！');
        }
    }
});

// 加载分页器
function pageLoadCateringCharging(seachStr) {
    var pageSize = 20;
    $.get("/CateringCharging/GetCateringChargingTotal/", {
        seachStr: seachStr,
        queryType: queryType
    }, function (data) {
        var i = Math.ceil(data.values / pageSize);
        laypage({
            cont: $('#pageCateringChargingList'),
            pages: i, //总页数
            skin: 'molv', //皮肤
            groups: 0,
            first: false,
            last: false,
            jump: function (e, first) {
                getCateringChargingPageList(e.curr, pageSize, seachStr);
            }
        });
    });
}

// 数据分页
function getCateringChargingPageList(pageIndex, pageSize, seachStr) {
    var cateringChargingListHtml = '';
    var loadIndex = commonOpenLoading();
    $.getAsyncJson('/CateringCharging/GetCateringChargingPageList', {
        pageIndex: pageIndex,
        pageSize: pageSize,
        seachStr: seachStr,
        queryType: queryType
    }, function (result) {
        commonCloseLoading(loadIndex);
        if (result.succeed && result.values != null && result.values.length > 0) {
            var cateringChargingData = result.values;
            for (var i = 0; i < cateringChargingData.length; i++) {
                cateringChargingListHtml += '<li data-id="' + cateringChargingData[i].sv_charging_id + '" data-name="' + cateringChargingData[i].sv_charging_name + '">';
                cateringChargingListHtml += '<div class="bigCategorieslist-name"><i class="icon-stop stop-type"></i><span>' + cateringChargingData[i].sv_charging_name + '</span><span> （' + cateringChargingData[i].sv_charging_price + '元）</span></div>';
                cateringChargingListHtml += '<div class="editbigCategorieslist">';
                cateringChargingListHtml += '<a href="javascript:void(0);" class="editcateringRegionList" data-id="' + cateringChargingData[i].sv_charging_id + '" data-name="' + cateringChargingData[i].sv_charging_name + '"><i class="icon-edit"></i></a>';
                cateringChargingListHtml += '<a href="javascript:void(0);" class="DeleteCateringRegion " data-id="' + cateringChargingData[i].sv_charging_id + '" data-name="' + cateringChargingData[i].sv_charging_name + '"><i class="icon-remove"></i></a>';
                cateringChargingListHtml += '</div></li>';
            }
        }
        else {

        }
        $('#CateringChargingTableListHtml').html(cateringChargingListHtml);
    });
}

//添加商品按钮事件
$(document).on("click", "#btnOpenProductCharging", function () {
    var chargingId = $('#CateringChargingTableListHtml li.active').attr('data-id');
    if (chargingId > 0) {
        index = Deke.DeKe_dialog.show_Url('选择菜品', '/html/Product-cate2.html?v=' + clearCache + 10, ["   保存选择   ", "关闭"], BtnsavepackageFn, addMoreProductFn, ['780px', '540px']);
    }
    else {
        layer.msg('请选择加料区域！');
    }
});

//添加商品的事件
function addMoreProductFn() {
    //加载产品分类信息
    $.getJSON("/ProductCategory/GetFirstCategory?type=0", function (data) {
        var html = "";
        for (var i = 0; i < data.length; i++) {
            html += '<li class="click_view" data-id="' + data[i].productcategory_id + '"><a href="javascript:void(0);">' + data[i].sv_pc_name + '</a></li>';
        }
        Getpackageproduct(0, 1);
        $(".listo").html(html);
        $(".click_view").click(function () {
            $(this).addClass("active").siblings().removeClass("active");
            Getpackageproduct($(this).data("id"), 1);
        });
    });
}

function Getpackageproduct(classid, pageIndex) {
    // 查询
    $.getJSON('/AjaxProduct/GetProductList', {
        category: classid,
        pageIndex: pageIndex || 1,
        producttype_id: 0,
        pageSize: 20   //每页记录数
    },
    function (res) { //从第1页开始请求。返回的json格式可以任意定义
        var data = res.list;
        var html = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                html += '<tr data-pid="' + data[i].product_id + '" data-pricingmethod="' + data[i].sv_pricing_method + '"><td><input data-pid="' + data[i].product_id + '" data-pricingmethod="' + data[i].sv_pricing_method + '" data-price = ' + data[i].sv_p_originalprice + '  type="checkbox" class="checkinput lucky" name="subbox" value="" style="display:block;width:16px;height:16px;padding-left:0;"/></td><td>' + (data[i].sv_p_barcode == null ? "" : data[i].sv_p_barcode) + '</td> <td><span>' + (data[i].sv_p_name == null ? "" : data[i].sv_p_name) + '</span></td><td><i>¥' + data[i].sv_p_originalprice + '</i></td><td>' + data[i].sv_p_unit + '</td> </a></tr>';                
            }
        }

        $("#product_tbody").html(html);

        // 分页
        laypage({
            cont: 'pageGro2', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="pageGro"></div>
            pages: res.total, //通过后台拿到的总页数
            curr: pageIndex || 1, //初始化当前页
            skin: 'molv', //皮肤颜色
            first: '首页', //若不显示，设置false即可
            last: '尾页', //若不显示，设置false即可
            prev: '上一页', //若不显示，设置false即可
            next: '下一页', //若不显示，设置false即可
            jump: function (e, first) {
                if (!first) {
                    Getpackageproduct(classid, e.curr);
                }
            }
        });
    });
}

//保存按钮
function BtnsavepackageFn() {
    var html = '';
    var productList = [];
    $('input.lucky[name="subbox"]:checked').each(function () {
        var model = {
            sv_charging_id: parseInt($('#CateringChargingTableListHtml li.active').attr('data-id')),
            product_id: parseInt($(this).attr('data-pid')),
            sv_relation_id: 0,
            sv_is_active: true,
            sv_enabled: true,
            sv_charging_type: queryType
        }
        productList.push(model);
    });
    if (productList.length > 0) {
        var loadIndex = commonOpenLoading();
        $.postAsyncContentJson('/CateringChargingRelation/OperateCateringChargingRelation', productList, function (result) {
            commonCloseLoading(loadIndex);
            if (result.succeed) {
                commondResultMsg('保存成功！', 1, 800);
                pageLoadCateringChargingRelation($('#CateringChargingTableListHtml li.active').attr('data-id'));
                setTimeout(function () {
                    layer.close(index);
                }, 800);
            }
            else {
                layer.msg(result.errmsg);
            }
        });
    }
    else {
        layer.msg('请选择菜品！');
    }
}

// 加载分页器
function pageLoadCateringChargingRelation(chargingId, seachStr) {
    var pageSize = 15;
    $.get("/CateringChargingRelation/GetCateringChargingRelationTotal/", {
        seachStr: seachStr,
        chargingId: chargingId
    }, function (data) {
        var i = Math.ceil(data.values / pageSize);
        laypage({
            cont: $('#pageCateringChargingRelationList'),
            pages: i, //总页数
            skin: 'molv', //皮肤
            first: '首页', //若不显示，设置false即可
            last: '尾页', //若不显示，设置false即可
            prev: '上一页', //若不显示，设置false即可
            next: '下一页', //若不显示，设置false即可
            jump: function (e, first) {
                getCateringChargingRelationPageList(chargingId, e.curr, pageSize, seachStr);
            }
        });
    });
}

// 数据分页
function getCateringChargingRelationPageList(chargingId, pageIndex, pageSize, seachStr) {
    var cateringChargingRelationListHtml = '';
    var loadIndex = commonOpenLoading();
    $.getAsyncJson('/CateringChargingRelation/GetCateringChargingRelationPageList', {
        pageIndex: pageIndex,
        pageSize: pageSize,
        seachStr: seachStr,
        chargingId: chargingId
    }, function (result) {
        commonCloseLoading(loadIndex);
        if (result.succeed && result.values != null && result.values.length > 0) {
            var cateringChargingRelationData = result.values;
            for (var i = 0; i < cateringChargingRelationData.length; i++) {
                var sv_enabled = cateringChargingRelationData[i].sv_enabled == true ? '是' : '否';
                var remarks = isNullOrWhiteSpace(cateringChargingRelationData[i].sv_remark) ? cateringChargingRelationData[i].sv_remark : '';
                cateringChargingRelationListHtml += '<tr class="selectChk" data-enabled="true">';
                cateringChargingRelationListHtml += '<td><div class="check-box select_check-box" data-id="' + cateringChargingRelationData[i].sv_relation_id + '"><i>';
                cateringChargingRelationListHtml += '<input type="checkbox" name="subbox" data-id="' + cateringChargingRelationData[i].sv_relation_id + '"></i></div></td>';
                cateringChargingRelationListHtml += '<td>' + cateringChargingRelationData[i].sv_p_barcode + '</td>';
                cateringChargingRelationListHtml += '<td>' + cateringChargingRelationData[i].sv_p_name + '</td>';
                cateringChargingRelationListHtml += '<td>' + cateringChargingRelationData[i].sv_p_unitprice + '</td>';
                cateringChargingRelationListHtml += '<td>' + new Date(cateringChargingRelationData[i].sv_creation_date).Format("yyyy-MM-dd hh:mm:ss") + '</td>';
                cateringChargingRelationListHtml += '<td>' + remarks + '</td>';
                cateringChargingRelationListHtml += '</tr>'
            }
        }
        else {

        }
        $('#CateringChargingRelationTableListHtml').html(cateringChargingRelationListHtml);
    });
}

// 删除
$('#btnDeleteCateringChargingRelation').click(function () {
    var id = $('.select_check-box.checkedBox').attr('data-id');
    if (id > 0) {
        layer.confirm('是否确认删除该数据？', {
            btn: ['是', '否'] //按钮
        }, function () {
            $.postAsyncJson('/CateringChargingRelation/DeleteCateringChargingRelation', { relationId: id }, function (result) {
                if (result.succeed) {
                    commondResultMsg('删除数据成功！', 1, 800);
                    pageLoadCateringChargingRelation($('#CateringChargingTableListHtml li.active').attr('data-id'));
                }
                else {
                    commondResultMsg(result.errmsg, 2, 800);
                }
            });
        }, function () {
        });
    }
    else {
        commondResultMsg('请选择要删除的房台', 3, 800);
    }
});