import {create} from 'zustand'
import {getImages} from '../api/home'

export const useImagesStore = create((set,get)=>({
    images:[],
    pages:1,
    loading:false,
    fetchMore:async ()=>{
        //如果还在请求中，不再发起新的请求
        if(get().loading) return
        set({loading:true})//请求中
        const res = await getImages(get().pages)
        console.log(res)
        // newImages = res.data
        // console.log(newImages)
        //拿到之前的状态
        set((state)=>({
            images:[...state.images,...res.data],
            pages:state.pages+1,
            loading:false
        }))
    }
}))