//1.导入axios 模块  
import axios from "axios"
//2.导出请求函数 
export function request(config) {
  //3.创建axios实例 
  const instance = axios.create({
    //4.定义默认的baseURL路径
    baseURL: "http://152.136.185.210:7878/api/m5",
    //5.定义请求时间
    timeout: 5000
  })
  //6.定义请求拦截器
  instance.interceptors.request.use(config => {
    return config
  })
  //7.定义响应拦截器
  instance.interceptors.response.use(res => {
    return res
  })
  //8.发送请求
  return instance(config)
}



