$(document).ready(function(){supplier.getSupplierPage("");supplier.operating();supplier.addNewSupplier()});var supplier={getSupplierPage:function(n){$.get("/supplier/suppliercount?key="+n,function(t){loggin.chklogn(t);var i=Math.ceil(t/5);laypage({cont:$("#pageGro"),pages:i,skin:"molv",first:"\u9996\u9875",last:"\u5c3e\u9875",prev:"\u4e0a\u4e00\u9875",next:"\u4e0b\u4e00\u9875",jump:function(t){supplier.getSupplierList(t.curr,n)}})})},getSupplierList:function(n,t){$.getJSON("/supplier/supplierlist?id="+n+"&key="+t,function(n){var i,r,t,u;if(loggin.chklogn(n),n&&n.length>0){for(i="",r=0,t=0;t<n.length;t++)u=new Date(n[t].sv_suaddtime).Format("yyyy-MM-dd hh:mm:ss"),i+='<tr><td><input class="checkinput" data-id="'+n[t].sv_suid+'" type="checkbox" name="checksupplier" id="" value="" /><\/td> ',i+=isNullOrWhiteSpace(n[t].sv_suname)?'<td class="amountcolor2 supplierinfo" data-id="'+n[t].sv_suid+'">'+n[t].sv_suname+"<\/td>":'<td class="amountcolor2 supplierinfo" data-id="'+n[t].sv_suid+'"><\/td>',i+='<td class="colorff"><i>\u00a5'+parseFloat(n[t].arrears).toFixed(2)+"<\/i><\/td>",i+=" <td><i>\u00a5"+parseFloat(n[t].receivable).toFixed(2)+"<\/i><\/td> ",i+=isNullOrWhiteSpace(n[t].sv_sulinkmnm)?"<td><span>"+n[t].sv_sulinkmnm+"<\/span><\/td>":"<td><span><\/span><\/td>",i+=isNullOrWhiteSpace(n[t].sv_sumoble)?"<td><span>"+n[t].sv_sumoble+"<\/span><\/td>":"<td><\/td>",i+="<td>"+u+"<\/td>",i+=isNullOrWhiteSpace(n[t].sv_suoperation)?"<td>"+n[t].sv_suoperation+"<\/td>":"<td><\/td>",i+='<td class="operatinglist" style="width: 120px;">',i+='<a href="javascript:void(0);" class="supplierrepay fl"  data-id="'+n[t].sv_suid+'">\u8fd8\u6b3e<\/a>',i+='<a href="javascript:void(0);" class="showview fl"  data-id="'+n[t].sv_suid+'">\u8fd8\u6b3e\u8bb0\u5f55<\/a>',i+="<\/td>",i+="<\/tr>",r+=n[t].arrears;$("#newwlist").html(i);$("#arrearssupplier").text(r)}else $("#newwlist").html('<tr><td class="text-center sad" style="text-align:center !important;" colspan="9"><img src="../skin_N3/images/sad.png" /><i class="padd0">\u6682\u65e0\u6570\u636e<\/i><\/td><\/tr>')})},addNewSupplier:function(){function n(n,t){$.get("/supplier/supplierlist?pp="+n,function(n){var t,i;loggin.chklogn(n);for(t in n)t=="sv_suaddtime"?(i=new Date(n[t]).Format("yyyy-MM-dd"),i=="1-01-01"&&(i=""),$("#"+t).val(i),$("."+t).text(i)):($("."+t).text(n[t]),$("#"+t).val(n[t]))});t&&($("#suppler_id").val(n),$.getJSON("/supplier/getsupplierlog?logid="+n,function(n){if(n&&n.length>0){var t="";for(i=0;i<n.length;i++)t+="<tr><td><span>"+(i+1)+"<\/span><\/td>",t+="<td><span>"+n[i].sv_p_name+"<\/span><\/td>",t+="<td><span>"+n[i].sv_p_unit+"<\/span><\/td>",t+="<td><span>"+n[i].sv_pc_pnumber+"<\/span><\/td>",t+="<td><i>"+n[i].sv_pc_price+"<\/i><\/td>",t+="<td><span>"+new Date(n[i].sv_pc_date).Format("yyyy-MM-dd")+"<\/span><\/td><\/tr>";$("#product_supplier_list").html(t);$("#addconsumptioncounts").text(n.length)}else $("#product_supplier_list").html('<tr><td class="text-center sad" style="text-align:center !important;" colspan="6"><img src="../skin_N3/images/sad.png" /><i class="padd0">\u6682\u65e0\u6570\u636e<\/i><\/td><\/tr>')}))}$("#addsupplier").click(function(){layerpage.Deke_layerpage.show_Url2("1","\u65b0\u589e\u4f9b\u5e94\u5546","/ajaxHtml_N3/stock/addsupplier.html?="+getTimeStamp(),["430px","450px"],null)});$(document).unbind("click","#determineAddSupplierBtn").on("click","#determineAddSupplierBtn",function(){if($("#sv_suname").val()==""){layer.msg("\u8bf7\u8f93\u5165\u4f9b\u5e94\u5546\u7684\u540d\u5b57");$("#sv_suname").focus();return}if($("#sv_sulinkmnm").val()==""){layer.msg("\u8bf7\u8f93\u5165\u8054\u7cfb\u4eba\u7684\u540d\u5b57");$("#sv_sulinkmnm").focus();return}if($("#sv_sumoble").val()==""){layer.msg("\u8bf7\u8f93\u5165\u8054\u7cfb\u7535\u8bdd");$("#sv_sumoble").focus();return}var n=$("#addsupplierdata").serializeArray();$.ajax({url:"/supplier/Addsupplier",type:"post",data:JSON.stringify(n),contentType:"application/json",async:!1,success:function(n){loggin.chklogn(n);n==1?(layer.closeAll(),layer.msg("\u64cd\u4f5c\u6210\u529f"),supplier.getSupplierPage("")):n==-2?(layer.closeAll(),layer.msg("\u4f9b\u5e94\u5546\u5df2\u7ecf\u5b58\u5728\u8bb0\u5f55\u4e2d")):n==-4?(layer.closeAll(),layer.msg("\u4f60\u6ca1\u6709\u8be5\u64cd\u4f5c\u6743\u9650")):layer.msg("\u4f9b\u5e94\u5546\u64cd\u4f5c\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u91cd\u8bd5")}})});$("#editsupplier").click(function(){var t=$("#newwlist").find('input[name="checksupplier"]:checked'),i=t.data("id");t.length==1?layerpage.Deke_layerpage.show_Url2("1","\u4fee\u6539\u4f9b\u5e94\u5546","/ajaxHtml_N3/stock/addsupplier.html?="+getTimeStamp(),["430px","450px"],n(i)):layer.msg("\u8bf7\u9009\u62e9\u4f9b\u5e94\u5546\u5728\u6267\u884c\u4fee\u6539\u64cd\u4f5c,\u81f3\u591a\u53ea\u80fd\u9009\u62e91\u4e2a\uff01")});$(document).unbind("click","#newwlist .supplierinfo").on("click","#newwlist .supplierinfo",function(){var t=$(this).data("id");layerpage.Deke_layerpage.show_Url2("1","\u4f9b\u5e94\u5546\u4fe1\u606f","/ajaxHtml_N3/stock/supplierInformation.html?="+getTimeStamp(),["740px","520px"],n(t,!0))});$(document).unbind("click","#supplerinfonav>li").on("click","#supplerinfonav>li",function(){var n,t,i;$(this).addClass("active").siblings().removeClass("active");n=$("#supplerinfonav li").index(this);$(".memberinfocontent").eq(n).fadeIn(100).siblings().fadeOut(0);t=370;i=$(this).index()*t+1;$(".border-bottom2").animate({left:i+"px"},300)});$(document).on("keypress","#query_like_supplier",function(n){n.keyCode==13&&$.getJSON("/supplier/getsupplierlog?logid="+$("#suppler_id").val()+"&key="+$(this).val(),function(n){if(n&&n.length>0){var t="";for(i=0;i<n.length;i++)t+="<tr><td><span>"+(i+1)+"<\/span><\/td>",t+="<td><span>"+n[i].sv_p_name+"<\/span><\/td>",t+="<td><span>"+n[i].sv_p_unit+"<\/span><\/td>",t+="<td><span>"+n[i].sv_pc_pnumber+"<\/span><\/td>",t+="<td><i>"+n[i].sv_pc_price+"<\/i><\/td>",t+="<td><span>"+new Date(n[i].sv_pc_date).Format("yyyy-MM-dd")+"<\/span><\/td><\/tr>";$("#product_supplier_list").html(t);$("#addconsumptioncounts").text(n.length)}else $("#product_supplier_list").html('<tr><td class="text-center sad" style="text-align:center !important;" colspan="6"><img src="../skin_N3/images/sad.png" /><i class="padd0">\u6682\u65e0\u6570\u636e<\/i><\/td><\/tr>')})});$(document).unbind("click","#query_like_supplier_btn").on("click","#query_like_supplier_btn",function(){$.getJSON("/supplier/getsupplierlog?logid="+$("#suppler_id").val()+"&key="+$("#query_like_supplier").val(),function(n){if(n&&n.length>0){var t="";for(i=0;i<n.length;i++)t+="<tr><td><span>"+(i+1)+"<\/span><\/td>",t+="<td><span>"+n[i].sv_p_name+"<\/span><\/td>",t+="<td><span>"+n[i].sv_p_unit+"<\/span><\/td>",t+="<td><span>"+n[i].sv_pc_pnumber+"<\/span><\/td>",t+="<td><i>"+n[i].sv_pc_price+"<\/i><\/td>",t+="<td><span>"+new Date(n[i].sv_pc_date).Format("yyyy-MM-dd")+"<\/span><\/td><\/tr>";$("#product_supplier_list").html(t);$("#addconsumptioncounts").text(n.length)}else $("#product_supplier_list").html('<tr><td class="text-center sad" style="text-align:center !important;" colspan="6"><img src="../skin_N3/images/sad.png" /><i class="padd0">\u6682\u65e0\u6570\u636e<\/i><\/td><\/tr>')})})},operating:function(){function n(n){$.getJSON("/supplier/GetSupplierById?id="+n,function(n){var i,t,r;if(n!=""&&n!=null){for(i=0;i<n.length;i++)for(t in n[i])$("#"+t).html(n[i][t]),t=="sv_suid"?$("#"+t).val(n[i][t]):t=="arrears"&&($("#"+t).html(n[i][t]),$("."+t).val(n[i][t]));r=new Date(new Date).Format("yyyy-MM-dd hh:mm:ss");$("#sv_repaydate").val(r)}})}function i(){if($("#sv_repaymoney").val()<=0){layer.msg("\u8bf7\u8f93\u5165\u8fd8\u6b3e\u91d1\u989d");$("#sv_repaymoney").focus();return}if($("#sv_repaydate").val()==""){layer.msg("\u8bf7\u8f93\u5165\u8fd8\u6b3e\u65e5\u671f");$("#sv_repaydate").focus();return}$.ajax({url:"/supplier/SaveSupplierRepay",type:"post",data:JSON.stringify($("#supplierrepaybody").serializeArray()),contentType:"application/json",async:!1,success:function(n){n==1?(supplier.getSupplierPage(""),layer.closeAll(),layer.msg("\u64cd\u4f5c\u6210\u529f")):(layer.closeAll(),layer.msg("\u64cd\u4f5c\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u91cd\u8bd5"))}})}function r(i){t(i);n(i)}function t(n){$.get("/supplier/GetSupplierRepayListById?id="+n,function(n){var t,i;if(n==-2)layer.msg("\u4f60\u6ca1\u6709\u8be5\u64cd\u4f5c\u6743\u9650"),layer.close(index);else if(t="",n&&n.length>0){for(i=0;i<n.length;i++)t+="<tr>",t+="<td><span>"+(i+1)+"<\/span><\/td> ",t+="<td><i>\u00a5"+n[i].sv_repaymoney+"<\/i><\/td>  ",t+="<td><span>"+n[i].sv_createby+"<\/span><\/td> ",t+="<td><span>"+new Date(n[i].sv_repaydate).Format("yyyy-MM-dd")+"<\/span><\/td> ",t+="<td><span>"+n[i].sv_remark+"<\/span><\/td> ",t+='<td class="operatinglist"><a href="javascript:void(0);" class="deleterepay" style="width:100%;"  data-id="'+n[i].sv_repay_id+'" data-suid="'+n[i].sv_suid+'">\u5220\u9664<\/a><\/td>',t+="<\/tr>";$("#repaylist").html(t)}else $("#repaylist").html('<tr><td class="text-center sad" style="text-align:center !important;" colspan="6"><img src="../skin_N3/images/sad.png" /><i class="padd0">\u6682\u65e0\u6570\u636e<\/i><\/td><\/tr>')})}function u(n,i){layer.confirm("\u60a8\u786e\u8ba4\u8981\u5220\u9664\u5417\uff1f",function(){$.post("/supplier/DeleteRepay",{id:n},function(n){loggin.chklogn(n);n==-1?(layer.alert("\u767b\u5f55\u5df2\u5931\u6548\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\uff01"),window.location.href="/login.html"):n==-2?layer.msg("\u4f60\u6ca1\u6709\u8be5\u64cd\u4f5c\u6743\u9650"):(layer.msg("\u5220\u9664\u6210\u529f"),t(i))})})}$("#deletesupplier").click(function(){var n=$("#newwlist").find('input[name="checksupplier"]:checked');n.length==1?layer.confirm("\u60a8\u786e\u8ba4\u8981\u5220\u9664\u5148\u4e2d\u7684\u4f9b\u5e94\u5546\u5417\uff1f",function(){$.post("/supplier/supplierdelete",{id:n.data("id")},function(n){loggin.chklogn(n);n==-1?(layer.alert("\u767b\u5f55\u5df2\u5931\u6548\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\uff01"),window.location.href="/login.html"):n==-2?layer.msg("\u4f60\u6ca1\u6709\u8be5\u64cd\u4f5c\u6743\u9650"):(layer.msg("\u5220\u9664\u6210\u529f"),supplier.getSupplierPage(""))})}):layer.msg("\u8bf7\u9009\u62e9\u4f9b\u5e94\u5546\u5728\u6267\u884c\u4fee\u6539\u64cd\u4f5c,\u81f3\u591a\u53ea\u80fd\u9009\u62e91\u4e2a\uff01")});$("#query_supplier_val").keypress(function(n){n.keyCode==13&&supplier.getSupplierPage($(this).val())});$("#query_supplier_val_btn").click(function(){supplier.getSupplierPage($("#query_supplier_val").val())});$(document).unbind("click","#newwlist .supplierrepay").on("click","#newwlist .supplierrepay",function(){var t=$(this).data("id");layerpage.Deke_layerpage.show_Url2("1","\u4f9b\u5e94\u5546\u8fd8\u6b3e","/ajaxHtml_N3/stock/repayment.html?="+getTimeStamp(),["430px","400px"],n(t))});$(document).on("keyup","#sv_repaymoney",function(){var n=$(this).val(),t=$("#arrears").text();t-n<0&&layer.msg("\u8f93\u5165\u7684\u91d1\u989d\u5927\u4e8e\u8fd8\u6b3e\u7684\u91d1\u989d\uff01");$("#sv_repaybehind").val(t-n)});$(document).unbind("click","#repaySave").on("click","#repaySave",function(){i()});$(document).unbind("click","#newwlist .showview").on("click","#newwlist .showview",function(){var n=$(this).data("id");layerpage.Deke_layerpage.show_Url2("1","\u8fd8\u6b3e\u8bb0\u5f55","/ajaxHtml_N3/stock/repaymentList.html?="+getTimeStamp(),["790px","520px"],r(n))});$(document).on("click",".deleterepay",function(){u($(this).data("id"),$(this).data("suid"))})}};