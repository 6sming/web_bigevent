$(function() {
    // 1..点击"前往注册时"跳转到注册界面
    $('#link_reg').on('click', function() {
        // alert('11');
        $('.loginBox').hide();
        $('.registerBox').show();
    });
    $('#link_login').on('click', function() {
        $('.loginBox').show();
        $('.registerBox').hide();
    });
});
// 2.从layui中获取元素
var form = layui.form;
var layer = layui.layer;
// 3.通过 form.vertify() 函数自定义校验规则
form.verify({
    // (1)自定义一个pwd的校验规则
    pwd: [
        /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    // (2)校验两次密码是否一致的规则
    repwd: function(value) {
        // 通过形参拿到确认密码中的内容
        // 还需拿到密码框中的内容
        var pwd = $('.registerBox [name=password]').val();
        // 进行两者对比等于判断
        if (pwd !== value) {
            return '两次输入的密码不一致!'
        }
        // 判断失败则返回一个提示消息
    }
});

//3.监听注册表提交事件
$('#form_reg').on('submit', function(e) {
    // (1).阻止默认行为
    e.preventDefault();
    // (2).设置用户注册数据
    var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() };
    // (3).发起Ajax的POST请求
    $.post('/api/reguser', data,
        function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功!');
            //模拟人的点击行为
            $('#link_login').click();
        });
});
// 4. 监听登录表单提交事件
$('#form_login').submit(function(e) {
    // (1).阻止默认行为
    e.preventDefault();
    // (2).
    $.ajax({
        url: '/api/login',
        method: 'POST',
        // serialize() 快速获取表单中的数据
        data: $(this).serialize(),
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('登录失败')
            }
            layer.msg('登录成功')
                // 将登录成功的token字符串保存到localStrorage中
            localStorage.setItem('token', res.token);
            console.log(res.token);
            // 跳到后台主页
            location.href = 'index.html';
            // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjM2NTcsInVzZXJuYW1lIjoiYTExMjNhYSIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOiIiLCJlbWFpbCI6IiIsInVzZXJfcGljIjoiIiwiaWF0IjoxNjI1NzI0NzEyLCJleHAiOjE2MjU3NjA3MTJ9.3SS-MUBKQJyTJPRS-uUpNkVZ8ScbY4Onr-f7aOEgt4M
        }
    })
})