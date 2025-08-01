// search全局共享状态
import {
    create
} from 'zustand'
import {
    getSuggestList,
    getHotList,
} from '@/api/search'

const useSearchStore = create((set,get) => {
    // get 读操作
   //const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []
   return {
    searchHistory:[],//搜索历史
    suggestList: [],//suggest 返回list
    hotList:[],//热门搜索
    setSuggestList:async(keyword)=>{
        const res = await getSuggestList(keyword)
        console.log(res)
        set({
            suggestList:res.data
        })
    },
    setSearchHistory:(history)=>{
        // 确保history是数组
        if (!Array.isArray(history)) {
            try {
                history = JSON.parse(history) || [];
            } catch (e) {
                history = [];
            }
        }
        // 去重并限制长度
        const newHistory = [...new Set(history)].slice(0, 10);
        //localStorage.setItem('searchHistory',JSON.stringify(newHistory))
        set({
            searchHistory:newHistory
        })
    },
   setHotList:async()=>{
    const res = await getHotList()
    console.log(res)
    set({
        hotList:res.data
    })
   }
   }
})

export default useSearchStore
