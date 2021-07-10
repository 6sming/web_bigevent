//注意:每次调用 $.get()或者$.post 或者$.ajax()都会优先调用该函数$.ajaxPrefilter()
// 在这个函数中可以拿到给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的 Ajax请求之前 统一拼接请求的路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    // 统一为有权限的接口 设置headers 请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    };
    // 全局统一挂在complete函数里面
    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // console.log(11);
            // console.log(res);
            // 在complete中可以使用res.responseJSON拿到服务器响应回来的数据
            // (1) 强制清空token
            localStorage.removeItem('token');
            // (2) 返回登录界面
            location.href = 'login.html';
        }
    }
});