<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>会员资料编辑-后台管理系统-Admin 1.0</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/font.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/weadmin.css">
    <script src="${pageContext.request.contextPath}/lib/layui/layui.js" charset="utf-8"></script>
    <!-- 让IE8/9支持媒体查询，从而兼容栅格 -->
    <!--[if lt IE 9]>
    <script src="https://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script>
    <script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body>
<div class="weadmin-body">
    <form class="layui-form">
        <div class="layui-form-item">
            <label for="L_username" class="layui-form-label">
                <span class="we-red">*</span>登录名
            </label>
            <div class="layui-input-inline">
                <input type="text" id="L_username" name="username" lay-verify="required|nikename" autocomplete="off" class="layui-input">
            </div>
            <div class="layui-form-mid layui-word-aux">
                请设置至少5个字符，将会成为您唯一的登录名
            </div>
        </div>
        <div class="layui-form-item">
            <label for="L_sex" class="layui-form-label">性别</label>
            <div class="layui-input-block" id="L_sex">
                <input type="radio" name="sex" value="男" title="男" checked>
                <input type="radio" name="sex" value="女" title="女">
                <input type="radio" name="sex" value="未知" title="未知">
            </div>
        </div>

        <div class="layui-form-item">
            <label for="L_email" class="layui-form-label">
                <span class="we-red">*</span>手机
            </label>
            <div class="layui-input-inline">
                <input type="text" id="L_phone" name="phone" lay-verify="required|phone" autocomplete="" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label for="L_email" class="layui-form-label">
                <span class="we-red">*</span>邮箱
            </label>
            <div class="layui-input-inline">
                <input type="text" id="L_email" name="email" lay-verify="email" autocomplete="off" class="layui-input">
            </div>

        </div>
        <div class="layui-form-item">
            <label for="L_address" class="layui-form-label">
                <span class="we-red"></span>地址
            </label>
            <div class="layui-input-inline">
                <input type="text" id="L_address" name="address" autocomplete="off" class="layui-input">
            </div>

        </div>
        <div class="layui-form-item">
            <label for="L_pass" class="layui-form-label">
                <span class="we-red">*</span>密码
            </label>
            <div class="layui-input-inline">
                <input type="password" id="L_pass" name="pass" lay-verify="required|pass" autocomplete="off" class="layui-input">
            </div>
            <div class="layui-form-mid layui-word-aux">
                6到16个字符
            </div>
        </div>
        <div class="layui-form-item">
            <label for="L_repass" class="layui-form-label">
                <span class="we-red">*</span>确认密码
            </label>
            <div class="layui-input-inline">
                <input type="password" id="L_repass" name="repass" lay-verify="required|repass" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label for="L_repass" class="layui-form-label">
            </label>
            <button class="layui-btn" lay-filter="add" lay-submit="">确定</button>
            <input type="hidden" name="dataId" id="dataId" value="" />
        </div>
    </form>
</div>
<script type="text/javascript">
    layui.extend({
        admin: '{/}../../static/js/admin'
    });
    layui.use(['form', 'jquery', 'admin','layer'], function() {
        var form = layui.form,
            $ = layui.jquery,
            admin = layui.admin,
            layer = layui.layer;

        //自定义验证规则
        form.verify({
            nikename: function(value) {
                if(value.length < 5) {
                    return '昵称至少得5个字符啊';
                }
            },
            pass: [/(.+){6,12}$/, '密码必须6到12位'],
            repass: function(value) {
                if($('#L_pass').val() != $('#L_repass').val()) {
                    return '两次密码不一致';
                }
            }
        });
        //页面初始化加载
        $(function(){
            setTimeout(function(){
                var dataId = $('input[name="dataId"]').val();
                var index = parent.layer.getFrameIndex(window.name);
                console.log(dataId);
                parent.$("#memberList tr").each(function(){
                    if($(this).attr('data-id')==dataId){
                        console.log($(this));
                        var tdArr=$(this).children('td');
                        var username = tdArr.eq(2).text(); //姓名
                        var sex = tdArr.eq(3).text(); //性别
                        var phone = tdArr.eq(4).text(); //电话
                        var email = tdArr.eq(5).text(); //邮箱
                        var address = tdArr.eq(6).text(); //地址

                        $('input[name="username"]').val(username);
                        //$('input[name="sex"]').val(sex);
                        console.log("sex:"+sex);
                        //$(':radio[name="sex"][value="' + sex + '"]').prop("checked", "checked");
                        $('input[name="sex"][value="'+sex+'"]').attr("checked",true);
                        //$("input[name='radioName'][value=2]").attr("checked",true);
                        $('input[name="phone"]').val(phone);
                        $('input[name="email"]').val(email);
                        $('input[name="address"]').val(address);

//								$('[name=sex]').each(function(i,item){
//								    if($(item).val()==res.sex){
//								        $(item).prop('checked',true);
//								        layui.use('form',function(){
//								        <span style="white-space:pre">  </span>var form = layui.form();
//								        <span style="white-space:pre">  </span>form.render();
//								    <span style="white-space:pre">  </span>});
//								    }
//								});
                    }else{

                        console.log("aaa");
                    }

                });
            },1000);

            //parent.$("#id").val();
            //var dataTr = parent.$("tr").find("td").attr('data-id','dataId');
        });
        //监听提交
        form.on('submit(add)', function(data) {
            console.log(data);
            //发异步，把数据提交给php
            layer.alert("增加成功", {
                icon: 6
            }, function() {
                // 获得frame索引
                var index = parent.layer.getFrameIndex(window.name);
                //关闭当前frame
                parent.layer.close(index);
            });
            return false;
        });

    });
</script>
</body>

</html>