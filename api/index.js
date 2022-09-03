//请求工具参考https://ext.dcloud.net.cn/plugin?id=392
const { http } = uni.$u

// 获取滚动图数据
export const getBannerData = params => http.get('/app-api/app/nft/banner/list', { params })
// 获取滚动通知数据
export const getNoticeData = params => http.get('/app-api/app/nft/notice/page', { params })
// 藏品分页
export const getGoodsData = params => http.get('/app-api/app/nft/goods/issue/page', { params })

// 首页轮播置顶 - 藏品分页
export const getTopGoodsData = params => http.get('/app-api/app/nft/goods/index/top', { params })

// 公告
export const getNotice = params => http.get('/app-api/app/nft/notice/page', { params })
// 获取藏品详情
export const getGoodsDetails = params => http.get('/app-api/app/nft/goods/get', { params })

// 获取订单详情
export const getOrderDetails = params => http.get('/app-api/nft/order/get?id='+params)

// 获取字典类型
export const getDictList = params => http.get('/app-api/sys/dict/list', { params })

// 获取openid
export const getOpenId = params => http.post('/app-api/system/social-user/openId', params)

// 获取授权url
export const getSocialAuthUrl = (url, type) => http.get('/app-api/member/auth/social-auth-redirect?type='+type+'&redirectUri='+url)