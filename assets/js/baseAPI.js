//注意:每次调用 $.get()或者$.post 或者$.ajax()都会优先调用该函数$.ajaxPrefilter()
// 在这个函数中可以拿到给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的 Ajax请求之前 统一拼接请求的路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
});