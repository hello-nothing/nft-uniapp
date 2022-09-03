const install = (Vue, vm) => {
    // 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
    vm.$u.api = {
        // 登录认证相关接口
        login: (params = {}, header = {}) => vm.$u.post('/auth/oauth/token', params, header),
        vxLogin: (params = {}, header = {}) => vm.$u.post('/auth/oauth/token?grant_type=mobile&mobile=MINI@' +
            params.code + '&code=' + params.code, {}, header),
        bingUser: (params = {}, header = {}) => vm.$u.post('/admin/social/bind?state=MINI&code=' + params
            .code, {}, header),
        smsLogin: (params = {}, header = {}) => vm.$u.post('/auth/oauth/token?mobile=SMS@' + params.mobile +
            '&code=' + params.code + '&grant_type=mobile', {}, header),
        sendCode: (params = {}, header = {}) => vm.$u.get('/admin/mobile/' + params.mobile, {}, header),
        logout: (params = {}) => vm.$u.delete('/auth/token/logout', params),

        // 字典
        dictData: (params = {}) => vm.$u.get('/admin/dict/type/' + params.dictType),

        // 个人信息
        user: {
            getUserInfo: () => vm.$u.get('/admin/user/info'),
            updateUserInfo: (params = {}) => vm.$u.put('/admin/user/edit', params),
            infoSaveBase: (params = {}) => vm.$u.post('/admin/sys/user/infoSaveBase', params),
            infoSavePwd: (params = {}) => vm.$u.post('/admin/sys/user/infoSavePwd', params),
        },

        // 字典
        dict: {
            type: (params = {}) => vm.$u.get('/admin/dict/type/' + params)
        },

        // pigx文件管理
        pigxFile: {
            upload: (params = {}) => vm.$u.post('/admin/sys-file/upload')
        },

        // pigx 部门管理
        pigxDept: {
            list: (params = {}) => vm.$u.get('/admin/dept/list', params)
        },

        // pigx 岗位管理
        pigxPost: {
            // 列出所有
            list: (params = {}) => vm.$u.get('/admin/post/list', params),

            // 分页
            fetchList: (params = {}) => vm.$u.get('/admin/post/page', params),

            // 新增
            addObj: (obj = {}) => vm.$u.post('/admin/post', obj),

            // 修改
            putObj: (obj = {}) => vm.$u.put('/admin/post', obj),

            // 删除
            delObj: (params) => vm.$u.delete('/admin/post/' + params.id),

            // 查询
            getObj: (params) => vm.$u.get('/admin/post/' + params.id)
        },

        // pigx 角色管理
        pigxRole: {
            // 列出所有
            list: (params = {}) => vm.$u.get('/admin/role/list', params),

            // 分页
            fetchList: (params = {}) => vm.$u.get('/admin/role/page', params),

            // 新增
            addObj: (obj = {}) => vm.$u.post('/admin/role', obj),

            // 修改
            putObj: (obj = {}) => vm.$u.put('/admin/role', obj),

            // 删除
            delObj: (params) => vm.$u.delete('/admin/role/' + params.id),

            // 查询
            getObj: (params) => vm.$u.get('/admin/role/' + params.id)
        },

        // pigx 用户管理
        pigxUser: {
            page: (params = {}) => vm.$u.get('/admin/user/page', params),
            delete: (params = {}) => vm.$u.delete('/admin/user/' + params.id),
            getOne: (params = {}) => vm.$u.get('/admin/user/' + params.id),
            putObj: (params = {}) => vm.$u.put('/admin/user', params)
        },

        //pigx 令牌管理
        pigxToken: {
            page: (params = {}) => vm.$u.get('/admin/token/page', params),
            delete: (params = {}) => vm.$u.delete('/admin/token/' + params.token),
        },

        //pigx 日志管理
        pigxLog: {
            page: (params = {}) => vm.$u.get('/admin/log/page', params),
            delete: (params = {}) => vm.$u.delete('/admin/log/' + params.id),
        },

        // pigx 工作流
        pigxOA: {
            queryTodos: (params = {}) => vm.$u.get('/act/task/todo', params),
            queryBill: (params = {}) => vm.$u.get('/act/leave-bill/' + params.leaveId),
            delBill: (params = {}) => vm.$u.delete('/act/leave-bill/' + params.leaveId),
            submitBill: (params = {}) => vm.$u.get('/act/leave-bill/submit/' + params.leaveId),
            queryBillPage: (params = {}) => vm.$u.get('/act/leave-bill/page', params),
            getTask: (params = {}) => vm.$u.get('/act/task/' + params.taskId),
            addTask: (params = {}) => vm.$u.post('/act/leave-bill', params),
            doTask: (params = {}) => vm.$u.post('/act/task', params),
        },

        // pigx 租户管理
        pigxTenant: {
            // 分页
            fetchList: (params = {}) => vm.$u.get('/admin/tenant/page', params),

            // 新增
            addObj: (obj = {}) => vm.$u.post('/admin/tenant', obj),

            // 修改
            putObj: (obj = {}) => vm.$u.put('/admin/tenant', obj),

            // 删除
            delObj: (params) => vm.$u.delete('/admin/tenant/' + params.id),

            // 查询
            getObj: (params) => vm.$u.get('/admin/tenant/', params)
        },

        // pigx 参数管理
        pigxParam: {
            // 分页
            fetchList: (params = {}) => vm.$u.get('/admin/param/page', params),

            // 新增
            addObj: (obj = {}) => vm.$u.post('/admin/param', obj),

            // 修改
            putObj: (obj = {}) => vm.$u.put('/admin/param', obj),

            // 删除
            delObj: (params) => vm.$u.delete('/admin/param/' + params.id),

            // 查询
            getObj: (params) => vm.$u.get('/admin/param/' + params.id)
        }

    };

}

export default {
    install
}
