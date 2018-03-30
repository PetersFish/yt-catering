<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>文章列表-后台管理系统-Admin 1.0</title>
    <meta name="Description" content="基于layUI数据表格操作"/>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/font.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/weadmin.css">
    <script type="text/javascript" src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
    <script src="${pageContext.request.contextPath}/lib/layui/layui.js" charset="utf-8"></script>
    <script src="${pageContext.request.contextPath}/static/js/food/list.js" type="text/javascript"
            charset="utf-8"></script>

    <!--<script type="text/javascript" src="../../static/js/admin.js"></script>-->
    <!-- 让IE8/9支持媒体查询，从而兼容栅格 -->
    <!--[if lt IE 9]>
    <script src="https://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script>
    <script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <style type="text/css">
        .layui-form-switch {
            width: 55px;
        }

        .layui-form-switch em {
            width: 40px;
        }

        .layui-form-onswitch i {
            left: 45px;
        }

        body {
            overflow-y: scroll;
        }
    </style>
</head>

<body>
<div class="layui-tab layui-tab-brief">
    <ul class="layui-tab-title">
        <li class="layui-this">全部商品</li>
        <li>库存不足</li>
        <li>已下架</li>
    </ul>
    <div class="layui-tab-content">
        <div class="layui-tab-item layui-show">
            <div class="weadmin-body layui-col-md12">
                <div class="layui-row">
                    <!-- 搜索条 -->
                    <form class="layui-form layui-col-md12 we-search">
                        <label class="layui-form-label">菜品搜索：</label>
                        <div class="layui-input-inline">
                            <select name="cateid">
                                <option value="">请选择分类</option>
                                <c:forEach items="${foodtypeList}" var="ft">
                                    <option value="${ft.ftId}">${ft.ftName}</option>
                                </c:forEach>
                            </select>
                        </div>
                        <div class="layui-inline">
                            <input type="text" name="keyword" placeholder="请输入菜品关键字" autocomplete="off"
                                   class="layui-input">
                        </div>
                        <button class="layui-btn" lay-submit lay-filter="sreach"><i
                                class="layui-icon">&#xe615;</i></button>
                    </form>
                </div>
                <div class="weadmin-block demoTable">
                    <button class="layui-btn layui-btn-danger" data-type="getCheckData"><i class="layui-icon">&#xe640;</i>批量删除
                    </button>
                    <button class="layui-btn" data-type="Recommend"><i class="layui-icon">&#xe6c6;</i>推荐
                    </button>
                    <button class="layui-btn" data-type="Top"><i class="layui-icon">&#xe619;</i>置顶</button>
                    <button class="layui-btn" data-type="Review"><i class="layui-icon">&#xe6b2;</i>审核</button>
                    <button class="layui-btn" onclick="WeAdminShow('添加用户','./add',600,400)"><i
                            class="layui-icon">&#xe61f;</i>添加
                    </button>
                    <span class="fr" style="line-height:40px">共有数据：count 条</span>
                </div>
                <table class="layui-hide" id="foodList"></table>
                <%--<table class="layui-table" lay-data="{ url:'list.do', page:true, id:'test'}" lay-filter="test">
                    <thead>
                    <tr>
                        <th lay-data="{type:checkbox}"><input type="checkbox"></th>
                        <th lay-data="{field:'fdImg', sort: true}">图片</th>
                        <th lay-data="{field:'fdName'}">菜品名称</th>
                        <th lay-data="{field:'fdPrice', sort: true}">价格</th>
                        <th lay-data="{field:'fdMprice', sort: true}">会员价</th>
                        <th lay-data="{field:'fdRecommend'}">推荐</th>
                        <th lay-data="{field:'fdStock', sort: true}">库存</th>
                        <th lay-data="{field:'fdStatus', sort: true}">状态</th>
                        <th lay-data="{field:'fdUnit'}">单位</th>
                        <th lay-data="{field:'fdRemark'}">简介</th>
                    </tr>
                    </thead>
                </table>--%>


                <script type="text/html" id="recommendTpl">
                    <input type="checkbox" name="zzz" lay-skin="switch" lay-text="已推荐|未推荐" {{d.recommend}}>
                </script>
                <script type="text/html" id="topTpl">
                    <input type="checkbox" name="show" lay-skin="switch" lay-text="已置顶|未置顶" {{d.top}}>
                </script>
                <script type="text/html" id="reviewTpl">
                    <input type="checkbox" name="lock" value="10002" title="审核" lay-filter="lockDemo">
                </script>
                <script type="text/html" id="operateTpl">
                    <a title="编辑" onclick="WeAdminEdit('编辑','./edit', 2, 600, 400)" href="javascript:;">
                        <i class="layui-icon">&#xe642;</i>
                    </a>
                    <a title="查看" onclick="WeAdminShow('查看文章','./show',600,400)" href="javascript:;">
                        <i class="layui-icon">&#xe63c;</i>
                    </a>
                    <a title="删除" onclick="member_del(this,'要删除的id')" href="javascript:;">
                        <i class="layui-icon">&#xe640;</i>
                    </a>
                </script>
            </div>
        </div>
        <div class="layui-tab-item">内容2</div>
        <div class="layui-tab-item">内容3</div>
    </div>
</div>

</body>

</html>