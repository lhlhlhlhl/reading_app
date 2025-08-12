import axios from 'axios'

// 检测是否为Vercel环境
const isVercel = window.location.hostname.includes('vercel.app');


const isProduction = window.location.hostname !== 'localhost';


// 根据环境设置baseURL
axios.defaults.baseURL = isProduction ? (isVercel ? '' : '/api') //Vercel 环境使用空路径，其他生产环境使用相对路径
: `http://${window.location.hostname}:${window.location.port}/api`//开发环境支持所有本地端口


// 导出环境变量，供其他模块使用
export const envConfig = {
  isProduction,
  isVercel
};


axios.interceptors.request.use((config)=>{
    // token
    return config
})
// 响应拦截器
axios.interceptors.response.use((data)=>{
    return data.data
})


export default axios