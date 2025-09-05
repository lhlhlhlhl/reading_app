// search全局共享状态
import {
    create
} from 'zustand'
import {
    getSuggestList,
    getHotList,
} from '@/api/search'

const useSearchStore = create((set, get) => {
    // get 读操作
    //const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []
    return {
        searchHistory: [],//搜索历史
        suggestList: [],//suggest 返回list
        hotList: [],//热门搜索
        setSuggestList: async (keyword) => {
            try {
                const res = await getSuggestList(keyword);
                console.log('getSuggestList返回结果:', res);
                
                // 安全检查，确保res和res.data存在
                const listData = res && res.data && Array.isArray(res.data) ? res.data : [];
                console.log('处理后的suggestList数据:', listData);
                
                set({
                    suggestList: listData
                })
            } catch (error) {
                console.error('设置搜索建议列表失败:', error);
                // 出错时设置为空数组
                set({ suggestList: [] });
            }
        },
        setSearchHistory: (history) => {
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
                searchHistory: newHistory
            })
        },
        setHotList: async () => {
            // 定义默认的热门搜索列表数据
            const defaultHotList = [
                { id: '101', city: "凡人修仙传" },
                { id: '102', city: "三体" },
                { id: '103', city: "中国历史" },
                { id: '104', city: "长安的荔枝" },
                { id: '105', city: "我是一个人" },
                { id: '106', city: "天下" }
            ];

            try {
                const res = await getHotList();
                // 如果API返回了有效数据，则使用API数据，否则使用默认数据
                set({
                    hotList: res?.data?.length > 0 ? res.data : defaultHotList
                });
            } catch (error) {
                console.error('获取热门搜索列表失败:', error);
                // 请求失败时使用默认数据
                set({ hotList: defaultHotList });
            }
        }
    }
})

export default useSearchStore
