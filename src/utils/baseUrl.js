/**
 * @devBaseUrl 开发环境地址
 * @proBaseUrl 生产环境地址
 * @type {string}
 */
// const devBaseUrl = 'http://192.168.1.102:18082/'
// const devBaseUrl = 'http://192.168.1.13:18082/'
const devBaseUrl = 'http://124.71.29.206:80/'

const proBaseUrl = 'http://124.71.29.206:80/'

export default process.env.NODE_ENV === 'development' ? devBaseUrl : proBaseUrl
