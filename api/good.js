const { http } = uni.$u

// 创建订单
export const creatOrder = params => http.post('/app-api/nft/order/goods/create', params)

// 支付
export const toPay = params => http.post('/app-api/pay/order/submit', params)

// 获取藏品分类列表
export const getCateList = params => http.get('/app-api/app/nft/cate/list', params)

// 获取藏品二级分类树
export const getCateTree = params => http.get('/app-api/app/nft/cate/list/tree', params)
export const getSecondCateList = params => http.get('/app-api/app/nft/cate/second/list?pid='+ params)
