function funcAddCoupon(){selectexpirationdateTime("sv_coupon_bendate");selectexpirationdateTime("sv_coupon_enddate");$("#sv_coupon_bendate").val((new Date).Format("yyyy-MM-dd"));$("#sv_coupon_enddate").val((new Date).Format("yyyy-MM-dd"))}function funcGenerateCoupon(){setTimeout(function(){(memberLevelCacheJson.length==0||memberLevelCacheJson==null)&&$.get("/Ajaxdata/GetUserconfig",function(n){n&&(memberLevelCacheJson=n.getUserLevel,memberGroupCacheJson=n.getMembergroup)})},200)}function pushListIdsArrays(n,t,i){var f=!1,e=!0,r,u;if(generateCouponUseInfoJson.length>0)if(generateCouponUseInfoJson.length<9e3){for(r=0;r<generateCouponUseInfoJson.length;r++)generateCouponUseInfoJson[r].UseIds==n&&(f=!0);f||(u={UseIds:n,sv_mr_mobile:t,sv_mr_name:i},generateCouponUseInfoJson.push(u))}else e=!1,layer.msg("\u6700\u591a\u53ea\u80fd\u9009\u62e99000\u6761\u6570\u636e\uff01");else u={UseIds:n,sv_mr_mobile:t,sv_mr_name:i},generateCouponUseInfoJson.push(u);return e}function generateCoponWeindowsAuto(n,t){generateCouponUseInfoJson=[];$("#SelectMemberNum").html(0);var i=$("#generateCouponBodyId").parent().width();i>=700&&n==0&&($("#generateCouponBodyId").parent().width($("#generateCouponBodyId").parent().width()-200),$("#shareul").addClass("col-xs-12").removeClass("col-xs-8"),$("#showCouponMemberList").hide(),$("#generateCouponNum_li").show(),$("#SelectMemberNum_li").hide(),$(".memberLevelListSelect").hide());i<700&&n==1&&($("#generateCouponBodyId").parent().width($("#generateCouponBodyId").parent().width()+200),$("#shareul").addClass("col-xs-8").removeClass("col-xs-12"),$("#showCouponMemberList").show(),$("#generateCouponNum_li").hide(),$("#GenerateCouponNum").val(""),$("#SelectMemberNum_li").show(),t?($(".memberLevelListSelect").show(),$("#memberLevelListSelect").show()):($("#memberLevelListSelect").hide(),$(".memberLevelListSelect").hide()))}function getMemberLevelCacheJson(n,t){var r,i;if($("#pageMemberLists").html(""),r="",t&&(r+='<option value="-1" selected>\u9009\u62e9\u4f1a\u5458\u7b49\u7ea7\u7b5b\u9009<\/option>'),n==0){if(memberLevelCacheJson!=null&&memberLevelCacheJson.length>0)for(i=0;i<memberLevelCacheJson.length;i++)r+=t?'<option value="'+memberLevelCacheJson[i].memberlevel_id+'">'+memberLevelCacheJson[i].sv_ml_name+"<\/option>":'<li data-id="'+memberLevelCacheJson[i].memberlevel_id+'"><i class="square"><\/i><span>'+memberLevelCacheJson[i].sv_ml_name+"<\/span><\/li>"}else if(n==1&&memberGroupCacheJson!=null&&memberGroupCacheJson.length>0)for(i=0;i<memberGroupCacheJson.length;i++)r+='<li data-id="'+memberGroupCacheJson[i].membergroup_id+'"><i class="square"><\/i><span>'+memberGroupCacheJson[i].sv_mg_name+"<\/span><\/li>";t?$("#memberLevelListSelect").html(r):$("#SelectMemberListHtml").html(r)}function pageMemberList(n,t,i){var r=20;$.getJSON("/CouponRecord/GetMemberIdTotal",{levelIdOrGroupId:n,type:t,seachStr:i},function(u){var f=Math.ceil(u.values/r);laypage({cont:"pageMemberLists",pages:f,groups:0,first:!1,last:!1,jump:function(u){getMemberIdList(n,t,u.curr,r,i)}})})}function getMemberIdList(n,t,i,r,u){$.getJSON("/CouponRecord/GetMemberIdList",{levelIdOrGroupId:n,type:t,pageIndex:i,top:r,seachStr:u},function(n){if(n.values!=null&&n.values.length>0){var i=n.values;t==-1&&(memberListCacheJson=i);getMemberListCacheJson(i)}else $("#SelectMemberListHtml").html("")})}function getMemberListCacheJson(n){for(var u,r,i=n,f="",t=0;t<i.length;t++){if(u="",generateCouponUseInfoJson!=null&&generateCouponUseInfoJson.length>0)for(r=0;r<generateCouponUseInfoJson.length;r++)if(generateCouponUseInfoJson[r].UseIds==i[t].useIds){u="active";break}f+='<li class="'+u+'" data-id="'+i[t].useIds+'" data-mobile="'+i[t].sv_mr_mobile+'" data-name="'+i[t].sv_mr_name+'"><i class="square"><\/i><span>'+i[t].sv_mr_mobile+"("+i[t].sv_mr_name+")<\/span><\/li>"}$("#SelectMemberListHtml").html(f)}function hideLiHtml(){$("#memberLevelListSelect").hide();$(".memberLevelListSelect").hide();$(".selecctseachproduct").hide();$("#generateCouponToMemberConsume_li").hide()}function funcEditCoupon(){setTimeout(function(){$("#addcouponlist input").attr("disabled","disabled");$("#addcouponlist select").attr("disabled","disabled");$("#sv_coupon_name, #sv_remark").removeAttr("disabled")},200)}$(document).ready(function(){coupon.getCouponPage("");coupon.operating()});var memberLevelCacheJson=[],memberGroupCacheJson=[],memberListCacheJson=[],generateCouponUseInfoJson=[],coupon={getCouponPage:function(n){var t=15;$.get("/Coupon/GetCouponTotal/",{seachStr:n,couponState:$("#selectCouponState").val()},function(i){var r=Math.ceil(i.values/t);laypage({cont:$("#pageCouponList"),pages:r,skin:"molv",skip:!0,first:"\u9996\u9875",last:"\u5c3e\u9875",prev:"\u4e0a\u4e00\u9875",next:"\u4e0b\u4e00\u9875",curr:location.hash.replace("#!page=",""),hash:"page",jump:function(i){coupon.getCouponPageList(i.curr,t,n)}})})},getCouponPageList:function(n,t,i){var r="",u=commonOpenLoading();$.getAsyncJson("/Coupon/GetCouponPageList",{pageIndex:n,pageSize:t,seachStr:i,couponState:$("#selectCouponState").val()},function(n){var i,t,f;if(commonCloseLoading(u),n.succeed&&n.values!=null&&n.values.length>0){for(i=n.values,t=0;t<i.length;t++){var o=i[t].sv_coupon_type==0?"\u4ee3\u91d1\u5238":"\u6298\u6263\u5238",s=i[t].sv_coupon_type==0?"\u5143":"%",h=i[t].sv_coupon_is_superposition==!0?"\u662f":"\u5426",c=i[t].sv_coupon_termofvalidity_type==1?"\u5929\u6570":"\u65e5\u671f",l=i[t].sv_coupon_is_sale==!0?"\u662f":"\u5426",e="";e&&(e=couponDatap[t].sv_remark);f="";i[t].sv_coupon_state==0?f="\u5f85\u53d1\u653e":i[t].sv_coupon_state==1?f="\u5df2\u53d1\u653e":i[t].sv_coupon_state==2&&(f="\u5df2\u8fc7\u671f");r+='<tr class="selectChk" data-enabled="true">';r+='<td><input data-id="'+i[t].sv_coupon_id+'" class="checkinput" type="radio" name="checkedcoupon" value=""><\/td>';r+="<td>"+i[t].sv_coupon_name+"<\/td>";r+="<td>"+o+"<\/td>";r+="<td>"+i[t].sv_coupon_money+s+"<\/td>";r+="<td>\u6ee1"+i[t].sv_coupon_use_conditions+"\u5143<\/td>";r+="<td>"+h+"<\/td>";r+="<td>"+c+"<\/td>";r+=i[t].sv_coupon_termofvalidity_type==1?"<td>"+i[t].sv_coupon_numday+"\u5929<\/td>":"<td>"+new Date(i[t].sv_coupon_bendate).Format("yyyy-MM-dd")+"\u81f3"+new Date(i[t].sv_coupon_enddate).Format("yyyy-MM-dd")+"<\/td>";r+="<td>"+i[t].sv_coupon_toal_num+"<\/td>";r+="<td>"+i[t].sv_coupon_surplus_num+"<\/td>";r+="<td>"+f+"<\/td>";r+='<td class="minhide">'+new Date(i[t].sv_creation_date).Format("yyyy-MM-dd")+"<\/td>";r+='<td class="operatinglist"><a data-id="'+i[t].sv_coupon_id+'" data-sv_mr_status="0" class="fl editThisCoupon" href="javascript: void(0);">\u4fee\u6539<\/a>';r+='<a data-id="'+i[t].sv_coupon_id+'" class="fl deleteThisCoupon" href="javascript: void(0);">\u5220\u9664<\/a><\/td>';r+="<\/tr>"}$("#couponTableListHtml").html(r)}else $("#couponTableListHtml").html('<tr><td class="text-center sad" style="text-align:center !important;" colspan="12"><img src="../skin_N3/images/sad.png" /><i class="padd0">\u6682\u65e0\u4f18\u60e0\u5238\u6570\u636e<\/i><\/td><\/tr>')})},operating:function(){$("#selectCouponState").change(function(){coupon.getCouponPage("")})}};$("#btnAddCoupon").click(function(){layerpage.Deke_layerpage.show_Url2("1","\u65b0\u589e\u4f18\u60e0\u5238","/Coupon/_PartialOperateCoupon_N3?couponId=0",["780px","520px"],funcAddCoupon)});$("#btnGenerateCoupon").click(function(){var n=$("#couponTableListHtml").find('input[name="checkedcoupon"]:checked').attr("data-id");n>0?layerpage.Deke_layerpage.getpage3("\u53d1\u653e\u4f18\u60e0\u5238","/CouponRecord/_PartialOperateCouponRecord_N3?couponId="+n,funcGenerateCoupon(n),["500px","600px"],"generateCouponBodyId"):commondResultMsg("\u8bf7\u9009\u62e9\u8981\u53d1\u653e\u7684\u4f18\u60e0\u5238",3,800)});$(document).unbind("click","#SelectMemberListHtml li").on("click","#SelectMemberListHtml li",function(){var r=$(this).hasClass("active"),t=$(this).attr("data-id"),u=$(this).attr("data-mobile"),f=$(this).attr("data-name"),n,i;if(r){for(n=0;n<generateCouponUseInfoJson.length;n++)generateCouponUseInfoJson[n].UseIds==t&&generateCouponUseInfoJson.splice(n,1);console.log(generateCouponUseInfoJson);$(this).removeClass("active")}else $(this).addClass("active"),i={UseIds:t,sv_mr_mobile:u,sv_mr_name:f},generateCouponUseInfoJson.push(i);console.log(generateCouponUseInfoJson);$("#SelectMemberNum").html(generateCouponUseInfoJson.length)});$(document).unbind("click","#selectCheckAll").on("click","#selectCheckAll",function(){var t=$("#SelectMemberListHtml li"),n=!0;$.each(t,function(){n=pushListIdsArrays($(this).attr("data-id"),$(this).attr("data-mobile"),$(this).attr("data-name"))});n&&($("#SelectMemberNum").html(generateCouponUseInfoJson.length),$("#SelectMemberListHtml li").addClass("active"))});$(document).unbind("click","#selectUnCheckAll").on("click","#selectUnCheckAll",function(){generateCouponUseInfoJson=[];$("#SelectMemberListHtml li").removeClass("active");$("#SelectMemberNum").html(generateCouponUseInfoJson.length)});$(document).unbind("keypress","#txtSeachSeachMemberName").on("keypress","#txtSeachSeachMemberName",function(n){n.keyCode==13&&$("#btnSeachMemberList").click()});$(document).unbind("click","#btnSeachMemberList").on("click","#btnSeachMemberList",function(){var n=$("#txtSeachSeachMemberName").val().replace(/\ +/g,""),t=$("#memberLevelListSelect").val();isNullOrWhiteSpace(n)?t>0?pageMemberList(t,0,n):pageMemberList(0,-1,n):(layer.msg("\u8bf7\u8f93\u5165\u4f60\u8981\u67e5\u8be2\u7684\u4f1a\u5458"),$("#txtSeachSeachMemberName").focus())});$(document).unbind("change","#memberLevelListSelect").on("change","#memberLevelListSelect",function(){var n=$(this).val();n>0?(location.hash.replace("#!page=",""),pageMemberList(n,0,null)):pageMemberList(0,-1,null)});$(document).unbind("change","#GenerateCouponType").on("change","#GenerateCouponType",function(){var n=$(this).val();n==0?(pageMemberList(0,-1,null),generateCoponWeindowsAuto(1,!0),getMemberLevelCacheJson(0,!0),$(".memberLevelListSelect").show(),$(".selecctseachproduct").show()):n==1?(getMemberLevelCacheJson(0),generateCoponWeindowsAuto(1),hideLiHtml()):n==2?(getMemberLevelCacheJson(1),generateCoponWeindowsAuto(1),hideLiHtml()):n==3?(generateCoponWeindowsAuto(0),$("#generateCouponNum_li").hide(),$("#GenerateCouponNum").val(""),hideLiHtml()):n==4?(generateCoponWeindowsAuto(0),hideLiHtml(),$("#generateCouponNum_li").show()):n==5&&(generateCoponWeindowsAuto(0),hideLiHtml(),$("#generateCouponNum_li").hide(),$("#generateCouponToMemberConsume_li").show())});$(document).unbind("click","#btnSaveGenerateCouponInfo").on("click","#btnSaveGenerateCouponInfo",function(){var n=$("#GenerateCouponType").val(),t=$("#GenerateCouponNum").val(),i=$("#GenerateCouponToMemberConsume").val().trim(),r,u;if(n==4&&!isNullOrWhiteSpace(t)){layer.msg("\u8bf7\u8f93\u5165\u53d1\u653e\u4f18\u60e0\u5238\u6570\u91cf\uff01");$("#GenerateCouponNum").focus();return}if(n==4&&parseInt(t<=0)){layer.msg("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u4f18\u60e0\u5238\u6570\u91cf\uff01");$("#GenerateCouponNum").focus();return}if(n==4&&parseInt(t>9999)){layer.msg("\u4f18\u60e0\u5238\u6570\u91cf\u4e0d\u80fd\u8d85\u8fc79999");$("#GenerateCouponNum").focus();return}if(n==5&&(!i||i<=0||i>=365)){layer.msg("\u8bf7\u8f93\u5165\u4f1a\u5458\u6700\u540e\u6d88\u8d39\u5929\u6570\u5e76\u4e14\u4e0d\u80fd\u5927\u4e8e365\u5929\uff01");$("#GenerateCouponToMemberConsume").focus();return}if(n!=4&&n!=3&&n!=5&&(generateCouponUseInfoJson==null||generateCouponUseInfoJson==""||generateCouponUseInfoJson==undefined||generateCouponUseInfoJson.length<=0)){layer.msg("\u8bf7\u9009\u62e9\u53f3\u4fa7\u4f18\u60e0\u5238\u53d1\u653e\u5bf9\u8c61\uff01");return}r={sv_coupon_id:$("#sv_coupon_id").val(),GenerateCouponType:n,GenerateUseIds:generateCouponUseInfoJson,GenerateCouponNum:t,ConsumeToDay:i};u=commonOpenLoading();$.post("/CouponRecord/GenerateCoupon",r,function(n){commonCloseLoading(u);n.succeed?(commondResultMsg("\u53d1\u653e\u4f18\u60e0\u5238\u6210\u529f\uff01",1,1e3),coupon.getCouponPage("")):n.errmsg!=null?commondResultMsg(n.errmsg,3,1e3):commondResultMsg("\u53d1\u653e\u4f18\u60e0\u5238\u5931\u8d25,\u8bf7\u7a0d\u540e\u518d\u8bd5\uff01",3,1e3)})});$(document).unbind("click","#sv_coupon_is_sale").on("click","#sv_coupon_is_sale",function(){var n=$("#sv_coupon_is_sale").is(":checked");n?$("#sv_coupon_selling_price_li").show():($("#sv_coupon_selling_price_li").hide(),$("#sv_coupon_selling_price").val(""))});$(document).unbind("change","input[name='sv_coupon_type']").on("change","input[name='sv_coupon_type']",function(){var n=$(this).val();n==1?($("#sv_coupon_is_superposition").val(""),$("#sv_coupon_type_text").html("\u6298\u6263"),$("#sv_coupon_is_superposition").val(!1),$("#sv_coupon_money_type").text("%")):($("#sv_coupon_type_text").html("\u9762\u503c"),$("#sv_coupon_is_superposition").attr("checked",!1),$("#sv_coupon_money_type").text("\u5143"))});$(document).unbind("change","#sv_coupon_termofvalidity_type").on("change","#sv_coupon_termofvalidity_type",function(){var n=$(this).val();n==1?($("#sv_coupon_bendate_li").hide(),$("#sv_coupon_enddate_li").hide(),$("#sv_coupon_numday_li").show(),$("#sv_coupon_numday").val("")):($("#sv_coupon_bendate_li").show(),$("#sv_coupon_enddate_li").show(),$("#sv_coupon_numday_li").hide())});$(document).unbind("click","#btnSaveCouponInfo").on("click","#btnSaveCouponInfo",function(){var p=$("#sv_coupon_id").val().replace(/\ +/g,""),c=$("#sv_coupon_name").val().replace(/\ +/g,""),i=$("input[name='sv_coupon_type']:checked").val(),n=$("#sv_coupon_money").val().replace(/\ +/g,""),f=$("#sv_coupon_use_conditions").val().replace(/\ +/g,""),w=$("#sv_coupon_is_superposition").is(":checked"),t=$("#sv_coupon_termofvalidity_type").val(),e=$("#sv_coupon_bendate").val().replace(/\ +/g,""),o=$("#sv_coupon_enddate").val().replace(/\ +/g,""),s=$("#sv_coupon_is_sale").is(":checked"),b=$("#sv_coupon_is_donation").is(":checked"),h=$("#sv_coupon_selling_price").val().replace(/\ +/g,""),k=$("#sv_coupon_is_crossshop").is(":checked"),r=$("#sv_coupon_toal_num").val().replace(/\ +/g,""),d=$("#sv_coupon_grant_is_num").is(":checked"),g=$("#sv_remark").val().replace(/\ +/g,""),u=$("#sv_coupon_numday").val().replace(/\ +/g,""),l,a,v,y;if(!isNullOrWhiteSpace(c)){layer.msg("\u8bf7\u8f93\u5165\u4f18\u60e0\u5238\u540d\u79f0");$("#sv_coupon_name").focus();return}if(i==0&&!isNullOrWhiteSpace(n)){layer.msg("\u4f18\u60e0\u5238\u9762\u503c\u4e0d\u80fd\u4e3a\u7a7a\uff0c\u5e76\u4e14\u5927\u4e8e\u96f6\uff01");$("#sv_coupon_money").focus();return}if(i==0&&parseFloat(n)<0){layer.msg("\u4f18\u60e0\u5238\u9762\u503c\u5fc5\u987b\u5927\u4e8e\u96f6\uff01");$("#sv_coupon_money").focus();return}if(i==1&&!isNullOrWhiteSpace(n)){layer.msg("\u4f18\u60e0\u5238\u6298\u6263\u4e0d\u80fd\u4e3a\u7a7a\uff0c\u5e76\u4e14\u5927\u4e8e\u96f6\uff01");$("#sv_coupon_money").focus();return}if(i==1&&(parseFloat(n)<0||parseFloat(n)>100)){layer.msg("\u4f18\u60e0\u5238\u6298\u6263\u8f93\u5165\u8303\u56f4\u5fc5\u987b\u662f1\u5230100\uff01");$("#sv_coupon_money").focus();return}if(!isNullOrWhiteSpace(f)){layer.msg("\u4f18\u60e0\u5238\u4f7f\u7528\u6761\u4ef6\u91d1\u989d\u4e0d\u80fd\u4e3a\u7a7a\uff01");$("#sv_coupon_use_conditions").focus();return}if(parseFloat(f)<0){layer.msg("\u4f18\u60e0\u5238\u4f7f\u7528\u6761\u4ef6\u91d1\u989d\u5fc5\u987b\u5927\u4e8e\u96f6\uff01");$("#sv_coupon_use_conditions").focus();return}if(s&&!isNullOrWhiteSpace(h)){layer.msg("\u4f18\u60e0\u5238\u552e\u5356\u91d1\u989d\u4e0d\u80fd\u4e3a\u7a7a\uff01");$("#sv_coupon_selling_price").focus();return}if(s&&parseFloat(h)<0){layer.msg("\u4f18\u60e0\u5238\u552e\u5356\u91d1\u989d\u5fc5\u987b\u5927\u4e8e\u96f6\uff01");$("#sv_coupon_selling_price").focus();return}if(!isNullOrWhiteSpace(r)){layer.msg("\u4f18\u60e0\u5238\u6570\u91cf\u4e0d\u80fd\u4e3a\u7a7a\uff01");$("#sv_coupon_toal_num").focus();return}if(parseInt(r)<0){layer.msg("\u4f18\u60e0\u5238\u6570\u91cf\u5fc5\u987b\u5927\u4e8e\u96f6\uff01");$("#sv_coupon_toal_num").focus();return}if(parseInt(r)>9999){layer.msg("\u4f18\u60e0\u5238\u6570\u91cf\u4e0d\u80fd\u5927\u4e8e9999\uff01");$("#sv_coupon_toal_num").focus();return}if(t==1&&!isNullOrWhiteSpace(u)){layer.msg("\u4f18\u60e0\u5238\u6709\u6548\u5929\u6570\u4e0d\u80fd\u4e3a\u7a7a\uff01");$("#sv_coupon_numday").focus();return}if(t==1&&parseInt(u)<0){layer.msg("\u4f18\u60e0\u5238\u6709\u6548\u5929\u6570\u5fc5\u987b\u5927\u4e8e\u96f6\uff01");$("#sv_coupon_numday").focus();return}if(t==1&&parseInt(u)>365){layer.msg("\u4f18\u60e0\u5238\u6709\u6548\u5929\u6570\u5fc5\u987b\u4e0d\u80fd\u5927\u4e8e365\u5929\uff01");$("#sv_coupon_numday").focus();return}if(t==0&&!isNullOrWhiteSpace(e)){layer.msg("\u8bf7\u9009\u62e9\u4f18\u60e0\u5238\u6709\u6548\u5f00\u59cb\u65e5\u671f\uff01");$("#sv_coupon_bendate").focus();return}if(t==0&&!isNullOrWhiteSpace(o)){layer.msg("\u8bf7\u9009\u62e9\u4f18\u60e0\u5238\u6709\u6548\u7ed3\u675f\u65e5\u671f\uff01");$("#sv_coupon_enddate").focus();return}if(l=new Date(e).getTime(),a=new Date(o).getTime(),l>a){layer.msg("\u5f00\u59cb\u65e5\u671f\u5927\u4e8e\u7ed3\u675f\u65e5\u671f,\u8bf7\u91cd\u65b0\u9009\u62e9\u5f00\u59cb\u65f6\u95f4");$("#sv_coupon_bendate").focus();return}v={sv_coupon_id:p,sv_coupon_name:c,sv_coupon_type:i,sv_coupon_money:n,sv_coupon_use_conditions:f,sv_coupon_is_superposition:w,sv_coupon_termofvalidity_type:t,sv_coupon_bendate:e,sv_coupon_enddate:o,sv_coupon_is_sale:s,sv_coupon_is_donation:b,sv_coupon_selling_price:h,sv_coupon_is_crossshop:k,sv_coupon_toal_num:r,sv_coupon_grant_is_num:d,sv_enabled:!0,sv_remark:g,sv_coupon_numday:u};y=commonOpenLoading();$.postAsyncJson("/Coupon/OperateCoupon",v,function(n){commonCloseLoading(y);n.succeed?($("#sv_coupon_id").val(""),commondResultMsg("\u4fdd\u5b58\u6570\u636e\u6210\u529f",1,2e3),coupon.getCouponPage("")):(n.errmsg,2e3)})});$(document).unbind("click","#couponTableListHtml .editThisCoupon").on("click","#couponTableListHtml .editThisCoupon",function(){var n=$(this).attr("data-id");n>0?layerpage.Deke_layerpage.show_Url2("1","\u4fee\u6539\u4f18\u60e0\u5238","/Coupon/_PartialOperateCoupon_N3?couponId="+n,["780px","520px"],funcEditCoupon):layer.msg("\u8bf7\u9009\u62e9\u7f16\u8f91\u7684\u6570\u636e")});$(document).unbind("click","#couponTableListHtml .deleteThisCoupon").on("click","#couponTableListHtml .deleteThisCoupon",function(){var n=$(this).attr("data-id");n>0?layer.confirm("\u662f\u5426\u786e\u8ba4\u5220\u9664\u8be5\u6570\u636e\uff1f",{btn:["\u662f","\u5426"]},function(){$.postAsyncJson("/Coupon/DeleteCoupon",{couponId:n},function(n){n.succeed?(commondResultMsg("\u5220\u9664\u6570\u636e\u6210\u529f\uff01",1,800),coupon.getCouponPage("")):commondResultMsg(n.errmsg,2,800)})}):layer.msg("\u8bf7\u9009\u62e9\u8981\u5220\u9664\u7684\u4f18\u60e0\u5238")});$(document).unbind("click","#btnCancel").on("click","#btnCancel",function(){layer.closeAll()});$("#btnRefreshCoupon").click(function(){coupon.getCouponPage("")});