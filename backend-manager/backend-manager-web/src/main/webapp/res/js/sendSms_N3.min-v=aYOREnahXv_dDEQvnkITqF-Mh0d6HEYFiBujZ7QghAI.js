$(document).ready(function(){sms.sendSms()});var sms={sendSms:function(){function e(n){var t=n;s(t)}function s(n){$.getJSON("/sms/Getmtemolate/"+n,function(t){var r,i;if(t&&t.length>0){for(r="",i=0;i<t.length;i++)r+=o==t[i].sms_mes_id?'<li class="active" data-id="'+t[i].sms_mes_id+'"><i class="circle"><\/i><span>'+t[i].sms_mes_text+"<\/span><\/li>":'<li data-id="'+t[i].sms_mes_id+'"><i class="circle"><\/i><span>'+t[i].sms_mes_text+"<\/span><\/li>";$("#exclusivelist_"+n).html(r)}})}function h(){$("#messagestext").text($("#smscontent").val());var t=parseInt($("#unsubscribe").text().length)+parseInt($("#signature").text().length),n=63-(t+parseInt($("#smscontent").val().trim().length));n<0?($("#tiao").text(Math.ceil($("#wordcountbox").text().trim().length/63)),$("#number").text("0")):($("#tiao").text(1),$("#number").text(n))}function a(){$("#signature2").text($("#signature").text());$("#messagestext2").text($("#smscontent").val())}function v(){var r;if(n!=""||t!=""||i!=""){for(r=0;r<n.length;r++)$("#memberlevel_id").append("<option value='"+n[r].memberlevel_id+"'>"+n[r].sv_ml_name+"<\/option>");for(r=0;r<t.length;r++)$("#membergroup_id").append("<option value='"+t[r].membergroup_id+"'>"+t[r].sv_mg_name+"<\/option>");for(r=0;r<i.length;r++)$("#memberlabel_id").append("<option value='"+i[r].membertag_id+"'>"+i[r].sv_mt_name+"<\/option>")}else $.get("/Ajaxdata/GetUserconfig",function(r){var u;for(r.GetUserLevel||(n=r.getUserLevel),r.GetMembergroup||(t=r.getMembergroup),r.GetSv_membertag||(i=r.getSv_membertag),u=0;u<n.length;u++)$("#memberlevel_id").append("<option value='"+n[u].memberlevel_id+"'>"+n[u].sv_ml_name+"<\/option>");for(u=0;u<t.length;u++)$("#membergroup_id").append("<option value='"+t[u].membergroup_id+"'>"+t[u].sv_mg_name+"<\/option>");for(u=0;u<i.length;u++)$("#memberlabel_id").append("<option value='"+i[u].membertag_id+"'>"+i[u].sv_mt_name+"<\/option>")});y()}function y(){u="";f="";$("#filtermember li").each(function(){var n=$(this).data("id"),t=$(this).find('.checkinput[name="filter_checked"]').is(":checked");t&&(n==0?u=$("#sv_last_sendsmsdate").val().trim():f=$("#sv_last_salesdate").val().trim())});r()}function r(){$.get("/ajaxdata/GetUserListTop100/1",{key:$("#searchinput_like").val().trim(),memberlevel_id:$("#memberlevel_id").val(),membergroup_id:$("#membergroup_id").val(),tag:$("#memberlabel_id").val(),pageSize:5e4,sendsmsdate:u,salesdate:f},function(n){var i,t;if(n&&n.length>0){for(i="",t=0;t<n.length;t++)i+='<tr data-id="'+n[t].member_id+'">',i+='<td><input data-phone="'+n[t].sv_mr_mobile+'" data-name="'+n[t].sv_mr_name+'" data-id="'+n[t].member_id+'" class="checkinput selectcheckbox" type="checkbox" name="checked_" id="" value="" /><\/td>',i+='<td class="amountcolor2"><span>'+n[t].sv_mr_name+"<\/span><\/td>",i+=isNullOrWhiteSpace(n[t].sv_ml_name)?"<td><span>"+n[t].sv_ml_name+"<\/span><\/td>":"<td><span><\/span><\/td>",i+="<td><span>"+n[t].sv_mr_mobile+"<\/span><\/td>",i+="<\/tr>";$("#memberlist_sms").html(i)}else $("#memberlist_sms").html('<tr><td class="text-center sad" style="text-align:center !important;" colspan="4"><img src="../skin_N3/images/sad.png" /><i class="padd0">\u6682\u65e0\u6570\u636e<\/i><\/td><\/tr>')})}var o="",c,l;$("#exclusive").click(function(){layerpage.Deke_layerpage.getpage2("1","\u72ec\u5bb6\u77ed\u4fe1","/ajaxHtml_N3/sms/exclusiveSMS.html?="+getTimeStamp(),["740px","520px"],e,9)});$("#blessing").click(function(){layerpage.Deke_layerpage.getpage2("1","\u795d\u798f\u77ed\u4fe1","/ajaxHtml_N3/sms/blessingSMS.html?="+getTimeStamp(),["740px","520px"],e,20)});$("#marketing").click(function(){layerpage.Deke_layerpage.getpage2("1","\u8425\u9500\u77ed\u4fe1","/ajaxHtml_N3/sms/marketingSMS.html?="+getTimeStamp(),["740px","520px"],e,16)});$(document).unbind("click","#exclusivelist>li").on("click","#exclusivelist>li",function(){var n=$(this).index(),u=$(this).data("id"),t,i,r;$(".messagescontent").eq(n).fadeIn(100).siblings(".messagescontent").fadeOut(0);t=123;i=n*t;$(".moveborder").animate({left:i+"px"},300);r=$(this).hasClass("clickSwitch");r||($(this).addClass("clickSwitch"),s(u))});$(document).unbind("click",".shareClickSelect li").on("click",".shareClickSelect li",function(){$(".shareClickSelect li").removeClass("active");$(this).addClass("active")});$(document).unbind("click","#determineSelectTemplateBtn").on("click","#determineSelectTemplateBtn",function(){if($(".shareClickSelect li.active").length>0){var n=$(".shareClickSelect li.active").find("span").text().replace("\u3010\u5546\u94fa\u540d\u79f0\u3011",$("#username").text()).trim();o=$(".shareClickSelect li.active").data("id");$("#smscontent").val(n);layer.closeAll();h()}else layer.msg("\u8fd8\u6ca1\u6709\u9009\u62e9\u77ed\u4fe1\u7684\u6a21\u677f\uff01")});$(document).on("keyup change","#smscontent",function(){h()});c=parseInt($("#unsubscribe").text().length)+parseInt($("#signature").text().length-2);wordNumber_=63-c;$("#number").text(wordNumber_);l='<div class="sendMessages"><div class="messagesPreview" style="display: block;width: 100%;"><div class="preview"><div class="viewcontent"><span class="messagestext" id="messagestext2"><\/span><i>\u9000\u8ba2\u56deT<\/i><i id="signature2"><\/i><\/div><\/div><\/div><\/div>';shareSmallWindowFn(".clickperview",null,"\u77ed\u4fe1\u9884\u89c8",["380px","615px"],l,a);$(document).unbind("click","#addsendmessages").on("click","#addsendmessages",function(){layerpage.Deke_layerpage.show_Url2("1","\u9009\u62e9\u4f1a\u5458","/ajaxHtml_N3/sms/selectSendMember.html?="+getTimeStamp(),["740px","520px"],v)});var n="",t="",i="",u="",f="";$(document).on("change","#memberlevel_id,#membergroup_id,#memberlabel_id",function(){r()});$(document).on("keyup","#searchinput_like",function(){r()});$(document).unbind("click","#sendsmsdate_checked").on("click","#sendsmsdate_checked",function(){var n=$(this).is(":checked");u=n?$("#sv_last_sendsmsdate").val().trim():"";r()});$(document).unbind("click","#salesdate_checked").on("click","#salesdate_checked",function(){var n=$(this).is(":checked");f=n?$("#sv_last_salesdate").val().trim():"";r()});$(document).unbind("keyup","#sv_last_sendsmsdate,#sv_last_salesdate").on("keyup","#sv_last_sendsmsdate,#sv_last_salesdate",function(){r()});shareCheckBoxFn("memberlist_sms");$(document).unbind("click","#confirmSelectMember").on("click","#confirmSelectMember",function(){var n=$("#memberlist_sms tr").find('.selectcheckbox[name="checked_"]:checked'),t;n.length>0?(t='<i class="addsendmessages icon-plus" id="addsendmessages"><\/i>',n.each(function(){var i="",u=$(this).data("id"),n=String($(this).data("name")),r;n!=""&&(i=n.substr(0,1));r=$(this).data("phone");t+='<i class="i" data-name="'+n+'" data-id="'+u+'" data-phone="'+r+'">'+i+"<\/i>"}),$("#sendmemberlist").html(t),$("#memberListCounts").text(n.length),n.length>10&&$("#sendmemberlist").append('<span class="lasttype">...<\/span>'),layer.closeAll()):layer.msg("\u8bf7\u9009\u62e9\u4f1a\u5458")});$("#sendems_Btn").click(function(){var n=$("#sv_us_shortname").val().trim();if($("#sv_us_shortname").val()==null||$("#sv_us_shortname").val()==""){layer.msg("\u60a8\u8fd8\u6ca1\u6709\u8bbe\u7f6e\u5e97\u94fa\u7b80\u79f0\uff0c\u4e0d\u80fd\u53d1\u9001\u77ed\u4fe1\u54e6\uff01~");return}if(n.length<3||n.length>8){layer.msg("\u60a8\u7684\u5e97\u94fa\u7b80\u79f0\u5fc5\u987b\u4e3a3\u52308\u4e2a\u5b57\u4f5c\u4e3a\u7b7e\u540d\u624d\u80fd\u53d1\u9001\u77ed\u4fe1\uff01");return}if($(".sendmemberlist i.i").length<1){layer.msg("\u8fd8\u6ca1\u6709\u9009\u62e9\u8981\u63a5\u6536\u7684\u4f1a\u5458\u54e6\uff01~");return}if($("#smscontent").val().length<1){layer.msg("\u90fd\u8fd8\u6ca1\u6709\u5185\u5bb9\uff01~");return}layer.confirm("\u786e\u8ba4\u8981\u7fa4\u53d1\u4fe1\u606f\u5417\uff1f\u4e00\u4f46\u786e\u8ba4\u6240\u6709\u4fe1\u606f\u4e0d\u80fd\u64a4\u56de\uff01",{btn:["\u786e\u8ba4","\u53d6\u6d88"]},function(){layer.open({type:1,skin:"layui-layer-rim",area:["420px","240px"],content:'<br><span style="padding:15px;">\u77ed\u4fe1\u5728\u6279\u91cf\u53d1\u9001\u4e2d\uff0c\u8bf7\u4e0d\u8981\u5173\u95ed\u8be5\u9875\u9762\uff0c\u76f4\u5230\u77ed\u4fe1\u53d1\u9001\u5b8c\u6210\u540e\uff0c\u4f1a\u81ea\u52a8\u5173\u95ed\uff01<\/span>',skin:"layui-layer-demo",closeBtn:0,shift:2,shadeClose:!1});var n=[];$(".sendmemberlist i.i").each(function(t){n[t]={moble:$(this).data("phone"),id:$(this).data("id"),txt:$(this).data("name")}});$.post("/Sms/PubSenDSems",{MobleKist:JSON.stringify(n),mes:$("#messagestext").text()+$("#unsubscribe").text().trim()},function(n){layer.closeAll();n==-3?layer.msg("\u7cfb\u7edf\u51fa\u9519"):n==-2?layer.msg("\u60a8\u7684\u77ed\u4fe1\u6570\u91cf\u4e0d\u591f\u4e86\uff01"):($("#shulixns").text(n),$("#txtMoblie").val(""),layer.msg("\u64cd\u4f5c\u6210\u529f"))})})});$("#btnTestSendSms").click(function(){var n=$("#txtMoblie").val().trim(),t;n==null||n==""?($("#txtMoblie").focus(),layer.msg("\u8bf7\u8f93\u5165\u8981\u6d4b\u8bd5\u53d1\u9001\u7684\u624b\u673a\u53f7\u7801\uff01")):/^1[3|4|5|7|8]\d{9}$/.test(n)?(t=layer.load(1,{shade:[.1,"#000"]}),$.postAsyncJson("/Sms/TestSendSms",{moblie:n},function(n){n==!0?(layer.closeAll(),layer.msg("\u77ed\u4fe1\u53d1\u9001\u6210\u529f\uff01"),$("#txtMoblie").val("")):n==-1?(layer.closeAll(),$("#txtMoblie").val(""),layer.msg("\u60a8\u5e97\u94fa\u7cfb\u7edf\u77ed\u4fe1\u4e0d\u8db3\uff0c\u8bf7\u5145\u503c\u540e\u518d\u53d1\u9001\uff01")):(layer.closeAll(),layer.msg("\u77ed\u4fe1\u53d1\u9001\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01"))})):($("#txtMoblie").focus(),layer.msg("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801\uff01"))})}};