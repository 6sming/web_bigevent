$(function() {
    getUserInfo();
});
// 1.获取用户信息函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取信息失败');
            }
            // 调用renderAvatar
            renderAvatar(res.data);
        },
        // 无论成功或失败,最终都会调用complete 回调函数
        // complete: function(res) {
        //     // console.log(11);
        //     // console.log(res);
        //     // 在complete中可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // (1) 强制清空token
        //         localStorage.removeItem('token');
        //         // (2) 返回登录界面
        //         location.href = 'login.html';
        //     }
        // }
    })
};
// 2.渲染用户头像
function renderAvatar(user) {
    // (1).获取用户名称
    var name = user.nickname || user.username;
    // (2).设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // (3). 按需求渲染用户头像
    if (user.user_pic !== null) {
        // (1) 渲染图像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // (2) 渲染文本图像
        $('.layui-nav-img').hide();
        // (3) 获取用户名第一个字母并将其设置为大写.
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    };
};
// 3.给退出按钮绑定点击事件
var layer = layui.layer;
$('#btnLogout').on('click', function() {
    // 弹出提示框 提示用户是否退出
    layer.confirm('是否退出登录?', { icon: 3, title: '提示' }, function(index) {
        //do something
        // (1).清空本地存储的token
        localStorage.removeItem('token');
        // (2).重新跳转到登录界面
        location.href = 'login.html';
        // (3) 关闭confirm问候框
        layer.close(index);
    });
});