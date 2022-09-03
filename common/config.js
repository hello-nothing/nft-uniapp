module.exports = {
  //后端接口地址-生产
  baseUrl: 'http://120.79.208.84:48090/',
  // dev
  // baseUrl: 'http://114.115.138.152:48090/',
  // baseUrl: 'http://localhost:48090/',
  // 超时
  timeout: 30000,
  // 禁用 Cookie 等信息
  withCredentials: false,
  header: {
    //租户ID
    'tenant-id': 1
  }
}