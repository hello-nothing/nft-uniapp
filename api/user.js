//请求工具参考https://ext.dcloud.net.cn/plugin?id=392
const { http } = uni.$u

//获取用户信息
export const getUserInfo = params => http.get('/app-api/member/user/get', params)
//修改用户头像
export const updateAvatar = filePath =>
  http.upload('/member/user/update-avatar', {
    name: 'avatarFile',
    fileType: 'image',
    filePath: filePath
  })
//修改用户昵称
export const updateNickname = params => http.put('/member/user/update-nickname', { params })

// 获取余额
export const getBillBalance = params => http.get('/app-api/app/nft/center/bill/balance', { params })

// 获取提现手续费
export const getBillCharge = params => http.get('/app-api/app/nft/center/bill/withdraw/charge', { params })

// 获取订单列表
export const getOrderList = params => http.get('/app-api/nft/order/my/page', { params })

// 获取账单流水
export const getBillList = params => http.get('/app-api/app/nft/center/bill/page', { params })

// 取消订单
export const cancelOrder = params => http.post('/app-api/nft/order/cancel', params)

// 我的藏品列表
export const myGoods = params => http.get('/app-api/app/nft/goods/my/page', { params })

// 提现
export const cashOut = params => http.post('/app-api/app/nft/center/bill/withdraw',  params )

// 藏品合成设置
export const composeSetting = params => http.get('/app-api/app/nft/compound/config/get', { params })

// 获取合成藏品材料列表
export const materialList = params => http.get('/app-api/app/nft/compound/meta/list', { params })

// 合成
export const startCompose = params => http.post('/app-api/app/nft/compound/start', params)

// 获取实名认证验证码
export const getRealPhoneCode = params => http.get('/app-api/app/nft/center/real-people/sms', { params })

// 提交实名认证
export const toRealPeople = params => http.post('/app-api/app/nft/center/real-people/validate', params)

// 实名认证-详情
export const realPeopleInfo = params => http.get('/app-api/app/nft/center/real-people/info', params)

// 个人中心-统计
export const userSummary = params => http.get('/app-api/app/nft/center/user/summary', params)

// 更改个人信息
export const updateUserInfo = params => http.put('/app-api/member/user/update-nickname', params)



