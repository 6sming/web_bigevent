$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1 ~ 6个字符'
            }
        }
    })
    initUserInfo();
    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                console.log(res);
                // 调用 form.val()快速为表单赋值
                form.val('formUserInfo', res.data);
            }
        })
    };

    //重置表单数据
    $('#btnReset').on('click', function(e) {
        //阻止表单默认行为
        e.preventDefault();
        // 重新获取用户信息
        initUserInfo();
    });
    // 监听表单提交事情
    $('.layui-form').on('submit', function(e) {
        // 阻止表单默认提交行为
        e.preventDefault();
        // 发起ajax 数据请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            // 快速获取表单数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('用户信息更新失败!')
                }
                layer.msg('更新用户信息成功!')
                    // 调用父页面的方法,重新渲染用户的头像和昵称
                window.parent.getUserInfo();
            }
        })
    })
});