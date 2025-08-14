//zustand
//用户状态管理
// 登入，登出，获取用户信息

import {
    create
} from 'zustand'
import {
    doLogin
} from '../api/user'

export const userStore = create((set) => ({
    user: null,//用户信息
    isLogin:false,//是否登入
    login:async({username="",password=""})=>{
        const res = await doLogin({username,password})
        console.log(res.data.message,'///////////////')
        const {token,data:user} = res.data
        console.log(token)
        localStorage.setItem('token',token),
        set({
            isLogin:true,
            user
        })
    },
    logout:()=>{
        localStorage.removeItem('token')
        set({
            isLogin:false,
            user:null
        })
    },
    // setUser: (user) => set({ user }),
}))