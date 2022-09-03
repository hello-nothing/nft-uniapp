//请求工具参考https://ext.dcloud.net.cn/plugin?id=392
const { http } = uni.$u

// 获取公告数据
export const getNoticeData = params => http.get('/app/nft/notice', { params })
