var listNameArrays = new Array();  //商品名称集合
var listIdsArrays = new Array();  // 商品Id集合
var productListCache = { succeed: true, values: [] }; // 商品列表缓存数据
var productCategoryListCache = { succeed: true, values: [] }; // 商品分类缓存数据
var productCategorySelectListCache = { succeed: true, values: [] }; // 下拉商品分类数据

$(function () {
    pageLoadCateringTaste('');
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

// 全选商品或分类
$(document).unbind("click", "#selectCheckAll").on("click", "#selectCheckAll", function () {
    $('#cateringTasteTypeListNames').val('').attr('data-id', '').attr('value', '').attr('title', '');
    // 获取ids,名称
    var cateringTasteTypeList = $("#CateringTasteTypeListHtml li");
    var isActive = true;
    $.each(cateringTasteTypeList, function (index, item) {
        isActive= pushListIdsArrays($(this).attr('data-id'), $(this).attr('data-name'));
    });
    $('#cateringTasteTypeListNames').val(listNameArrays).attr('data-id', listIdsArrays);
    if (isActive) {
        $("#CateringTasteTypeListHtml li").addClass('active');
    }
});

// 向集合里加数据
function pushListIdsArrays(id, name) {
    var isExists = false;
    var isActive = true;
    if (listIdsArrays.length > 0) {
        if (listIdsArrays.length < 90) {
            for (var i = 0; i < listIdsArrays.length; i++) {
                if (listIdsArrays[i] == id) {
                    isExists = true;
                }
            }
            if (!isExists) {
                listIdsArrays.push(id);
                listNameArrays.push(name);
            }
        }
        else {
            isActive = false;
            layer.msg('最多只能选择90条数据！');
        }
    }
    else {
        listIdsArrays.push(id);
        listNameArrays.push(name);
    }
    return isActive;
}

// 反选商品或分类
$(document).unbind("click", "#selectUnCheckAll").on("click", "#selectUnCheckAll", function () {
    listNameArrays = new Array();
    listIdsArrays = new Array();
    $("#CateringTasteTypeListHtml li").removeClass('active');
    $('#cateringTasteTypeListNames').val('').attr('data-id', '').attr('value', '').attr('title', '');
});

// 反选择删除数据
function removeListIdsArrays() {

}

// 选择商品
$(document).unbind("click", "#CateringTasteTypeListHtml li").on("click", "#CateringTasteTypeListHtml li", function () {
    var isChecked = $(this).hasClass('active');
    var productName = $(this).attr('data-name');
    var cateringTasteTypeListIds = $('#cateringTasteTypeListNames').attr('data-id');
    var cateringTasteTypeListNames = $('#cateringTasteTypeListNames').val();
    var productId = $(this).attr('data-id');
    if (isChecked) {
        $.each(listIdsArrays, function (index, item) {
            if (item == productId) {
                listIdsArrays.splice(index, 1);
            }
        });
        $('#cateringTasteTypeListNames').attr('data-id', listIdsArrays);
        $(this).removeClass('active');
    }
    else {
        $(this).addClass('active');
        listIdsArrays.push(productId);
        $('#cateringTasteTypeListNames').attr('data-id', listIdsArrays);
    }

    if (isChecked) {
        var deleteText = $.trim($(this).attr('data-name'));
        $.each(listNameArrays, function (index, item) {
            if (item == deleteText) {
                listNameArrays.splice(index, 1);
            }
        });
        $('#cateringTasteTypeListNames').val(listNameArrays).attr('title', listNameArrays);
        $(this).removeClass('active');
    }
    else {
        $(this).addClass('active');
        listNameArrays.push(productName);
        $('#cateringTasteTypeListNames').val(listNameArrays).attr('title', listNameArrays);
    }
});

// 点击是否针对所有菜品 sv_taste_for_all
$(document).unbind("click", "#sv_taste_for_all").on("click", "#sv_taste_for_all", function () {
    var isCheck = $(this).is(':checked');
    listNameArrays = new Array();
    listIdsArrays = new Array();
    $("#CateringTasteTypeListHtml li").removeClass('active');
    $('#cateringTasteTypeListNames').val('').attr('data-id', '').attr('value', '').attr('title', '');
    $('#sv_taste_type').val(-1);
    if (!isCheck) {
        $('#sv_taste_type_li').show();
    }
    else {
        $('#sv_taste_type_li').hide();

        $('#cateringTasteTypeListNames_li').hide();
        $('#productCategorySelect').hide();
        $('#cateringTasteTypeListNames_li').hide();
        $('#showTasteRelationList').hide();
        $('#cateringTasteTypeListNames').val('').attr('data-id', '').attr('value', '').attr('title', '');
        var thisWindowsWidth = $("#addnewmemberpage").parent().width();
        if (thisWindowsWidth >= 720) {
            $("#addnewmemberpage").parent().width($("#addnewmemberpage").parent().width() - 270);
            $("#shareul").addClass("col-xs-12").removeClass("col-xs-8");
        }
    }
});

// 保存数据信息
$(document).unbind("click", "#btnSaveCateringTasteInfo").on("click", "#btnSaveCateringTasteInfo", function () {
    var sv_taste_name = $('#sv_taste_name').val().replace(/\ +/g, "");
    var sv_taste_price = $('#sv_taste_price').val().replace(/\ +/g, "");
    var sv_taste_sort = $('#sv_taste_sort').val().replace(/\ +/g, "");
    var sv_taste_for_all = $('#sv_taste_for_all').is(':checked');
    var sv_taste_type = $('#sv_taste_type').val();
    var sv_enabled = $('#sv_enabled').is(':checked');
    var sv_remark = $('#sv_remark').val();
    var cateringTasteType = $('#CateringTasteType').val();
    var tasteRelationList = [];

    if (!isNullOrWhiteSpace(sv_taste_name)) {
        layer.msg('口味名称不能为空');
        $('#sv_taste_name').focus();
    }
    else if (sv_taste_name.length > 15) {
        layer.msg('口味名称不能大于15个字符串');
        $('#sv_taste_name').focus();
    }
    else if (isNullOrWhiteSpace(sv_taste_sort) && parseInt(sv_taste_sort) < 0) {
        layer.msg('请输入正确的排序数字');
        $('#sv_taste_sort').focus();
    } else if (isNullOrWhiteSpace(sv_taste_price) && parseFloat(sv_taste_price) < 0) {
        layer.msg('请输入正确的金额');
        $('#sv_taste_price').focus();
    }
    else if (isNullOrWhiteSpace(sv_remark) && sv_remark.length > 20) {
        layer.msg('备注信息请输入20字以内');
        $('#sv_remark').focus();
    }
    else {
        if (!sv_taste_for_all) {
            if (sv_taste_type > 0) {
                if (listIdsArrays != null && listIdsArrays != undefined && listIdsArrays != '' && listIdsArrays.length > 0) {
                    if (listIdsArrays.length <= 90) {
                        for (var i = 0; i < listIdsArrays.length; i++) {
                            var model = {
                                sv_taste_type_id: listIdsArrays[i],
                                sv_taste_relation_type: sv_taste_type
                            };
                            tasteRelationList.push(model);
                        }
                    }
                    else {
                        layer.msg('口味所属列表数据最多只能选择90条！');
                        return;
                    }
                }
                else {
                    layer.msg('请选择口味所属列表数据！');
                    return;
                }
            }
            else {
                layer.msg('请选择口味所属种类！');
                return;
            }
        }
        else {
            sv_taste_type = 0;
        }
        var data = {
            sv_taste_id: $('#sv_taste_id').val(),
            sv_taste_name: sv_taste_name,
            sv_taste_price: sv_taste_price,
            sv_taste_sort: sv_taste_sort,
            sv_taste_for_all: sv_taste_for_all,
            sv_taste_type: sv_taste_type,
            sv_enabled: sv_enabled,
            sv_remark: sv_remark,
            tasteRelationList: tasteRelationList
        };
        var loadIndex = commonOpenLoading();
        $.postAsyncJson('/CateringTaste/OperateCateringTaste', data, function (result) {
            commonCloseLoading(loadIndex);
            if (result.succeed) {
                commondResultMsg('保存数据成功', 1, 1000);
                pageLoadCateringTaste('');
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
    }
});

// 读取口味所属种类数据
function getCateringTasteTypeDataList(type, seachStr, productCategory) {
    var typeIds = $('#cateringTasteTypeListNames').attr('data-id');
    var typeNames = $('#cateringTasteTypeListNames').val();
    if (isNullOrWhiteSpace(typeIds)) {
        listIdsArrays = typeIds.split(',');
    }
    if (isNullOrWhiteSpace(typeNames)) {
        listNameArrays = typeNames.split(',');
    }
    var getCateringTasteTypeDataUrl = '/CateringTaste/GetCateringTasteTypeDataList';
    if (!isNullOrWhiteSpace(seachStr) && productCategoryListCache.values.length > 0 && type == 1 && productCategory <= 0) { // 菜类数据
        loadTietTasteTypeList(productCategoryListCache);
    }
    else if (!isNullOrWhiteSpace(seachStr) && productListCache.values.length > 0 && type == 2 && productCategory <= 0) { // 菜品数据
        loadTietTasteTypeList(productListCache);
    }
    else {
        $.getJSON('/CateringTaste/GetCateringTasteTypeDataList', { type: type, seachStr: seachStr, productCategory: productCategory, top: 30 }, function (data) {
            if (data.succeed && data.values != null && data.values.length > 0) {
                if (!isNullOrWhiteSpace(seachStr) && type == 1 && productCategory <= 0) {// 菜类数据
                    productCategoryListCache.values = data.values;
                }
                else if (!isNullOrWhiteSpace(seachStr) && type == 2 && productCategory <= 0) {// 菜品数据
                    productListCache.values = data.values;
                }
                loadTietTasteTypeList(data);
            }
        });
    }
}

// 口味所属种类数据读取
function loadTietTasteTypeList(data) {
    var selectValuesHtml = '';
    var dataList = data.values;
    for (var i = 0; i < dataList.length; i++) {
        var isActive = '';
        for (var j = 0; j < listIdsArrays.length; j++) {
            if (listIdsArrays[j] == dataList[i].id) {
                isActive = 'active';
                //break;
            }
        }
        var productName = dataList[i].name;
        if (productName.length > 17) {
            productName = productName.substring(0, 17);
        }
        selectValuesHtml += '<li class="' + isActive + '" data-id="' + dataList[i].id + '" data-name = "' + dataList[i].name + '"><i class="square"></i><span>' + productName + '</span></li>';
    }
    $('#CateringTasteTypeListHtml').html(selectValuesHtml);
}

// 读取一级分类列表到下拉框
function getProductCategoryList() {
    if (productCategorySelectListCache.values.length > 0) { // 菜类数据
        loadGetProductCategoryListCache(productCategorySelectListCache);
    }
    else {
        $.getJSON('/CateringTaste/GetCateringTasteTypeDataList', { type: 1, seachStr: null, productCategory: 0, top: 100 }, function (data) {
            if (data.succeed && data.values != null && data.values.length > 0) {
                productCategorySelectListCache.values = data.values;
                loadGetProductCategoryListCache(data);
            }
        });
    }
}

// 加载下拉口味分类数据
function loadGetProductCategoryListCache(data) {
    var selectValuesHtml = '';
    selectValuesHtml += '<option value="0">选择菜类</option>';
    var dataList = data.values;
    for (var i = 0; i < dataList.length; i++) {
        selectValuesHtml += '<option value="' + dataList[i].id + '">' + dataList[i].name + '</option>';
    }
    $('#productCategorySelect').html(selectValuesHtml);
}

// 根据口味种类读取相应数据
$(document).unbind("change", "#sv_taste_type").on("change", "#sv_taste_type", function () {
    listNameArrays = new Array();
    listIdsArrays = new Array();
    var typeValue = $(this).val();
    var selectText = $(this).find("option:selected").text();
    tasteTypeLinkage(typeValue, selectText);
});

// 口味种类选择联动操作
function tasteTypeLinkage(tasteType, tasteText) {
    if (tasteType > 0) {
        $('#cateringTasteTypeListNames_li').show();
        $('#showTasteRelationList').show();
        var thisWindowsWidth = $("#addnewmemberpage").parent().width();
        if (thisWindowsWidth < 720) {
            $("#addnewmemberpage").parent().width($("#addnewmemberpage").parent().width() + 270);
            $("#shareul").addClass("col-xs-8").removeClass("col-xs-12");
        }
        $('#cateringTasteTypeListNames_li label').html('所属' + tasteText);
        $('#cateringTasteTypeListNames_li input').attr('placeholder', '请选择右侧' + tasteText + '列表数据');

        if (tasteType == 2) { // 加载菜类下拉
            $('#productCategorySelect').show();
            getProductCategoryList();
        }
        else if (tasteType == 1) {
            $('#productCategorySelect').hide();
        }
        getCateringTasteTypeDataList(tasteType, '', 0);
    }
    else {
        $('#cateringTasteTypeListNames_li').hide();
        $('#productCategorySelect').hide();
        $('#cateringTasteTypeListNames_li').hide();
        $('#showTasteRelationList').hide();
        $('#cateringTasteTypeListNames').val('').attr('data-id', '').attr('value', '').attr('title', '');
        $("#addnewmemberpage").parent().width($("#addnewmemberpage").parent().width() - 270);
        $("#shareul").addClass("col-xs-12").removeClass("col-xs-8");
    }
}

// 点击搜索商品分类或商品名称
$(document).unbind("click", "#btnSeachProductNameOrCategoryName").on("click", "#btnSeachProductNameOrCategoryName", function () {
    var txtSeachText = $('#txtSeachProductNameOrCategoryName').val().replace(/\ +/g, "");
    var category = $('#productCategorySelect').val();
    var sv_taste_type = $('#sv_taste_type').val();
    if (isNullOrWhiteSpace(txtSeachText)) {
        getCateringTasteTypeDataList(sv_taste_type, txtSeachText, category);
    }
    else {
        layer.msg('请输入要查询的数据！');
        $('#txtSeachProductNameOrCategoryName').focus();
        getCateringTasteTypeDataList(sv_taste_type, '', 0);
    }
});

$(document).unbind("keypress", "#txtSeachProductNameOrCategoryName").on("keypress", "#txtSeachProductNameOrCategoryName", function (event) {
    if (event.keyCode == 13) {
        var seachStr = $(this).val().replace(/\ +/g, "");
        var category = $('#productCategorySelect').val();
        var sv_taste_type = $('#sv_taste_type').val();
        if (isNullOrWhiteSpace(seachStr)) {
            getCateringTasteTypeDataList(sv_taste_type, seachStr, category);
        }
        else {
            layer.msg('请输入要查询的数据！');
            getCateringTasteTypeDataList(sv_taste_type, '', 0);
            $(this).focus();
        }
    }
});

// 根据口味分类读取菜品数据
$(document).unbind("change", "#productCategorySelect").on("change", "#productCategorySelect", function () {
    getCateringTasteTypeDataList(2, '', $(this).val());
});

// 新增
$('#btnAddCateringTaste').click(function () {
    Deke.DeKe_dialog.show_Url3('新增', '/CateringTaste/_PartialOperateCateringTaste?tasteId=0', loadAddFunc, ['450px', '520px'], "addnewmemberpage");
});

function loadAddFunc() {
    listNameArrays = new Array();
    listIdsArrays = new Array();
    setTimeout(function () {
    }, 100);
}

// 编辑
$('#btnUpdateCateringTaste').click(function () {
    var id = $('.select_check-box.checkedBox').attr('data-id');
    if (id > 0) {
        Deke.DeKe_dialog.show_Url3('修改', '/CateringTaste/_PartialOperateCateringTaste?tasteId=' + id, funcEditCateringTaste, ['450px', '520px'], "addnewmemberpage");
    }
    else {
        commondResultMsg('请选择编辑的数据', 3, 800);
    }
});

// 编辑方法回调
function funcEditCateringTaste() {
    listNameArrays = new Array();
    listIdsArrays = new Array();
    var isCheck = $("#sv_taste_for_all").is(':checked');
    var sv_taste_type = $('#sv_taste_type').val();
    if (!isCheck) {
        $("#addnewmemberpage").parent().width($("#addnewmemberpage").parent().width() + 270);
        $("#shareul").addClass("col-xs-8").removeClass("col-xs-12");
    }
    if (sv_taste_type == 1) { // 菜类
        getCateringTasteTypeDataList(1, '');
    }
    else if (sv_taste_type == 2) { // 菜品
        $('#productCategorySelect').show();
        getProductCategoryList();
        getCateringTasteTypeDataList(2, '');
    }
}

// 删除
$('#btnDeleteCateringTaste').click(function () {
    var id = $('.select_check-box.checkedBox').attr('data-id');
    if (id > 0) {
        layer.confirm('是否确认删除该数据？', {
            btn: ['是', '否'] //按钮
        }, function () {
            $.postAsyncJson('/CateringTaste/DeleteCateringTaste', { tasteId: id }, function (result) {
                if (result.succeed) {
                    commondResultMsg('删除数据成功！', 1, 800);
                    pageLoadCateringTaste('');
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

// 刷新数据列表
$('#btnRefreshCateringTaste').click(function () {
    pageLoadCateringTaste('');
});

// 取消添加或编辑
$(document).unbind("click", "#btnCancel").on("click", "#btnCancel", function () {
    layer.closeAll();
});

// 模糊查询数据信息
$('#txtSeachCateringTaste').keypress(function (event) {
    if (event.keyCode == 13) {
        var seachStr = $(this).val().replace(/\ +/g, "");
        if (isNullOrWhiteSpace(seachStr)) {
            pageLoadCateringTaste(seachStr);
        }
        else {
            commondResultMsg('请输入要查询的数据！', 3, 800);
        }
    }
});

// 加载分页器
function pageLoadCateringTaste(seachStr) {
    var pageSize = 15;
    $.get("/CateringTaste/GetCateringTasteTotal/", {
        seachStr: seachStr,
    }, function (data) {
        var i = Math.ceil(data.values / pageSize);
        laypage({
            cont: $('.pageCateringTasteList'),
            pages: i, //总页数
            skin: 'molv', //皮肤
            first: '首页', //若不显示，设置false即可
            last: '尾页', //若不显示，设置false即可
            prev: '上一页', //若不显示，设置false即可
            next: '下一页', //若不显示，设置false即可
            jump: function (e, first) {
                getCateringTastePageList(e.curr, pageSize, seachStr);
            }
        });

    });
}

// 数据分页
function getCateringTastePageList(pageIndex, pageSize, seachStr) {
    var cateringTasteListHtml = '';
    var loadIndex = commonOpenLoading();
    $.getJSON('/CateringTaste/GetCateringTastePageList', {
        pageIndex: pageIndex,
        pageSize: pageSize,
        seachStr: seachStr
    }, function (result) {
        commonCloseLoading(loadIndex);
        if (result.succeed && result.values != null && result.values.length > 0) {
            var cateringTasteData = result.values;
            for (var i = 0; i < cateringTasteData.length; i++) {
                var sv_enabled = cateringTasteData[i].sv_enabled == true ? '是' : '否';
                var sv_taste_for_all = cateringTasteData[i].sv_taste_for_all == true ? '是' : '否';
                var sv_remark = cateringTasteData[i].sv_remark != null ? cateringTasteData[i].sv_remark : '';
                var sv_taste_type = '';
                if (cateringTasteData[i].sv_taste_type == 0 && !cateringTasteData[i].sv_taste_for_all) {
                    sv_taste_type = '菜谱';
                }
                else if (cateringTasteData[i].sv_taste_type == 1 && !cateringTasteData[i].sv_taste_for_all) {
                    sv_taste_type = '菜类';
                }
                else if (cateringTasteData[i].sv_taste_type == 2 && !cateringTasteData[i].sv_taste_for_all) {
                    sv_taste_type = '菜品';
                }
                cateringTasteListHtml += '<tr class="selectChk" data-enabled="true">';
                cateringTasteListHtml += '<td><div class="check-box select_check-box" data-id="' + cateringTasteData[i].sv_taste_id + '"><i>';
                cateringTasteListHtml += '<input type="checkbox" name="subbox" data-id="' + cateringTasteData[i].sv_taste_id + '"></i></div></td>';
                cateringTasteListHtml += '<td>' + cateringTasteData[i].sv_taste_name + '</td>';
                cateringTasteListHtml += '<td>' + cateringTasteData[i].sv_taste_price + ' 元</td>';
                cateringTasteListHtml += '<td>' + cateringTasteData[i].sv_taste_sort + '</td>';
                cateringTasteListHtml += '<td>' + sv_taste_for_all + '</td>';
                cateringTasteListHtml += '<td>' + sv_taste_type + '</td>';
                cateringTasteListHtml += '<td>' + new Date(cateringTasteData[i].sv_creation_date).Format("yyyy-MM-dd hh:mm:ss") + '</td>';
                cateringTasteListHtml += '<td>' + sv_enabled + '</td>';
                cateringTasteListHtml += '<td>' + sv_remark + '</td>';
                cateringTasteListHtml += '<td><a href="javascript:void(0);" data-id ="' + cateringTasteData[i].sv_taste_id + '" data-type="' + cateringTasteData[i].sv_taste_type + '" class="tasteinfo">详情</a></td></tr>'
            }
        }
        else {
            commondResultMsg(result.errmsg, 1, 600);
        }
        $('#CateringTasteTableListHtml').html(cateringTasteListHtml);
    });
}

// ----口味详情部分页---- // 

$(document).unbind("click", "#CateringTasteTableListHtml .tasteinfo").on("click", "#CateringTasteTableListHtml .tasteinfo", function () {
    var tasteId = $(this).attr('data-id');
    var type = $(this).attr('data-type');
    if (tasteId > 0) {
        Deke.DeKe_dialog.show_Url2('口味详情信息', '/CateringTaste/TasteRelationInfo', showTasteinfo(tasteId, type), ['750px', '520px']);
    }
});

// 
$(document).unbind("click", "#btnShowCateringTasteInfo, #btnShowTasteRelationList").on("click", "#btnShowCateringTasteInfo, #btnShowTasteRelationList", function () {
    var displayName = $(this).attr('data-name');
    $("#btnShowCateringTasteInfo, #btnShowTasteRelationList").removeClass('active');
    $(this).addClass('active');
    $('#panel_TasteRelationList, #panel_CateringTasteInfo').hide();
    $('#' + displayName).show();
});

function showTasteinfo(tasteId, type) {
    setTimeout(function () {
        $.getJSON('/CateringTaste/GetCateringTasteModelInfo', { tasteId: tasteId }, function (result) {
            if (result) {
                for (var key in result) {
                    $('#' + key).html(result[key]);
                    if (key == 'sv_creation_date') {
                        $('#' + key).html(new Date(result[key]).Format("yyyy-MM-dd hh:mm:ss"));
                    }
                    if (key == 'sv_enabled') {
                        var sv_enabled = result[key] == true ? '启用' : '停用';
                        $('#' + key).html(sv_enabled);
                    }
                    if (key == 'sv_taste_for_all') {
                        var sv_taste_for_all = result[key] == true ? '是' : '否';
                        $('#' + key).html(sv_taste_for_all);
                    }
                    if (key == 'sv_taste_type') {
                        $('#hidden_sv_taste_type').val(result[key]);
                        var sv_taste_type = '';
                        if (result[key] == 0) {
                            sv_taste_type = '菜谱';
                        }
                        else if (result[key] == 1) {
                            sv_taste_type = '菜类';
                        }
                        else if (result[key] == 2) {
                            sv_taste_type = '菜品';
                        }
                        else {
                            sv_taste_type = '';
                        }
                        $('#' + key).html(sv_taste_type);
                    }
                    if (key == 'sv_taste_id') {
                        $('#hidden_sv_taste_id').val(result[key]);
                    }
                }
            }
        });
        if (type > 0) {
            pageLoadCateringTasteRelationList(type, tasteId, '');
        }
    }, 200);
}

function pageLoadCateringTasteRelationList(type, tasteId, seachStr) {
    var pageSize = 10;
    $.get("/CateringTaste/GetTasteRelationTotalByType/", {
        type: type,
        tasteId: tasteId,
        seachStr: seachStr
    }, function (data) {
        if (data.succeed) {
            var i = Math.ceil(data.values / pageSize);
            laypage({
                cont: $('#pageCateringTasteRelationList'),
                pages: i, //总页数
                skin: 'molv', //皮肤
                first: '首页', //若不显示，设置false即可
                last: '尾页', //若不显示，设置false即可
                prev: '上一页', //若不显示，设置false即可
                next: '下一页', //若不显示，设置false即可
                jump: function (e, first) {
                    getCateringTasteRelationList(e.curr, pageSize, seachStr, type, tasteId);
                }
            });
        }
    });
}
// 数据分页
function getCateringTasteRelationList(pageIndex, pageSize, seachStr, type, tasteId) {
    var cateringTasteListHtml = '';
    var loadIndex = commonOpenLoading();
    $.getJSON('/CateringTaste/GetTasteRelationListByType', {
        type: type,
        tasteId: tasteId,
        pageIndex: pageIndex,
        pageSize: pageSize,
        seachStr: seachStr
    }, function (result) {
        commonCloseLoading(loadIndex);
        if (result.succeed && result.values != null && result.values.length > 0) {
            var cateringTasteData = result.values;
            for (var i = 0; i < cateringTasteData.length; i++) {
                var sv_taste_type = '';
                if (cateringTasteData[i].sv_taste_relation_type == 0) {
                    sv_taste_type = '菜谱';
                }
                else if (cateringTasteData[i].sv_taste_relation_type == 1) {
                    sv_taste_type = '菜类';
                }
                else if (cateringTasteData[i].sv_taste_relation_type == 2) {
                    sv_taste_type = '菜品';
                }
                else {
                    sv_taste_type = '';
                }
                cateringTasteListHtml += '<tr>';
                cateringTasteListHtml += '<td>' + cateringTasteData[i].sv_relation_name + '</td>';
                cateringTasteListHtml += '<td>' + sv_taste_type + '</td>';
                cateringTasteListHtml += '<td>' + new Date(cateringTasteData[i].sv_creation_date).Format("yyyy-MM-dd hh:mm:ss") + '</td>';
                cateringTasteListHtml += '</tr>';
            }
        }
        else {
            commondResultMsg(result.errmsg, 1, 600);
        }
        $('#CateringTasteRelationListHtml').html(cateringTasteListHtml);
    });
}

// 模糊查询口味所属类别数据信息
$(document).unbind("keypress", "#textTasteTypeNmae").on("keypress", "#textTasteTypeNmae", function (event) {
    if (event.keyCode == 13) {
        var seachStr = $(this).val().replace(/\ +/g, "");
        var type = $('#hidden_sv_taste_type').val();
        var tasteId = $('#hidden_sv_taste_id').val();
        if (isNullOrWhiteSpace(seachStr)) {
            if (type > 0 && tasteId > 0) {
                pageLoadCateringTasteRelationList(type, tasteId, seachStr);
            }
            else {
                layer.msg('当前口味未添加所属分类，不能进行查询！');
            }
        }
        else {
            layer.msg('请输入要查询的数据！');
        }
    }
});

// ----口味详情部分页---- // 