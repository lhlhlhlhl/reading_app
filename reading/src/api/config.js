import axios from 'axios'

// 检测是否为Vercel环境
const isVercel = window.location.hostname.includes('vercel.app');


const isProduction = window.location.hostname !== 'localhost';


// 根据环境设置baseURL
// 在Vercel环境中，API请求应该发送到/api路径
axios.defaults.baseURL = isProduction ? '/api' : `http://${window.location.hostname}:${window.location.port}/api`


// 导出环境变量，供其他模块使用
export const envConfig = {
  isProduction,
  isVercel
};


//拦截请求  interceptors 拦截器
axios.interceptors.request.use((config)=>{
    // const token = localStorage.getItem('token')
    // if(token){
    //     config.headers.Authorization = token
    // }
    // console.log('/////')
    const token = localStorage.getItem('token')||""
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    // config.headers.Authorization = token
    return config
})
//拦截响应,请求结束
axios.interceptors.response.use((res)=>{
    console.log('||||')
    return res
})


export default axios