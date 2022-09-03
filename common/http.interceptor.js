/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */

import errorCode from "./errorCode";

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作
const install = (Vue, vm) => {

    // 通用请求头设定
    const ajaxHeader = 'x-ajax';
    const sessionIdHeader = 'Authorization';
    const rememberMeHeader = 'x-remember';

    // 请求参数默认配置
    Vue.prototype.$u.http.setConfig({
        baseUrl: vm.vuex_config.baseUrl,
        originalData: true,
        // 默认头部，http2约定header名称统一小写 ThinkGem
        header: {
            'x-requested-with': 'XMLHttpRequest'
        }
    });

    // 请求拦截，配置Token等参数
    Vue.prototype.$u.http.interceptor.request = (req) => {

        // vm.$u.toast("加载中....", 0);

        if (!req.header) {
            req.header = [];
        }

        // 默认指定返回 JSON 数据
        if (!req.header[ajaxHeader]) {
            req.header[ajaxHeader] = 'json';
        }

        // 设定传递 Token 认证参数 ThinkGem
        if (!req.header[sessionIdHeader] && vm.vuex_token) {
            req.header[sessionIdHeader] = 'Bearer ' + vm.vuex_token;
        }

        // 为节省流量，记住我数据不是每次都发送的，当会话失效后，尝试重试登录 ThinkGem
        if (!req.header[rememberMeHeader] && vm.vuex_remember && req.remember) {
            req.header[rememberMeHeader] = vm.vuex_remember;
            req.remember = false;
        }

        // console.log('request', req);
        return req;
    }

    // 响应拦截，判断状态码是否通过
    Vue.prototype.$u.http.interceptor.response = async (res, req) => {

        const status = Number(res.statusCode) || 200
        const message = res.data.msg || errorCode[status] || errorCode['default']

        // 后台定义 424 针对令牌过去的特殊响应码
        if (status === 424) {
            vm.$u.toast('令牌过期，请重新登录');
            vm.$u.api.logout().then(res => {
                //清空存储信息
                vm.$u.vuex('vuex_token', '')
                vm.$u.vuex('vuex_refresh_token', '')
                vm.$u.vuex('vuex_username', '')
                vm.$u.vuex('vuex_userId', '')
                vm.$u.vuex('vuex_client_id', '')
                vm.$u.vuex('vuex_user', {})

                setTimeout(() => {
                    uni.reLaunch({
                        url: '/pages/sys/login/index'
                    });
                }, 500);

            });
            return
        }

        if (status !== 200 || res.data.code === 1) {
            vm.$u.toast(message);
            return Promise.reject(new Error(message))
        }

        return res.data;
    }

    // 封装 get text 请求
    vm.$u.getText = (url, data = {}, header = {}) => {
        return vm.$u.http.request({
            dataType: 'text',
            method: 'GET',
            url,
            header,
            data
        })
    }

    // 封装 post json 请求
    vm.$u.postJson = (url, data = {}, header = {}) => {
        header['content-type'] = 'application/json';
        return vm.$u.http.request({
            url,
            method: 'POST',
            header,
            data
        })
    }

}

export default {
    install
}
