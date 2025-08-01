import {
    create
} from 'zustand'
import {getDetail} from '@/api/detail'

const useDetailStore = create((set) => ({
    detail: {
        bookName:'书名',//书名
        bookDesc:'描述--------------------------啊啊啊',//描述
        images:
            {
                alt: '图片',
                url: 'https://dummyimage.com/300x200/79f291/fff&text=%E5%9B%BE%E7%89%87'
            },//封面
        credit:'8.5',//评分
        keyword:'关键词',//关键词
        author:'作者',//作者
        publishTime:'2020-01-01',//发布时间
        readNum:'1000',//在线阅读量
        stacksNum:'100',//加入书架量
        rank:'10',//排名
    },
    loading: false,
    setDetail: async()=>{
        set({loading:true})
        const res =await getDetail();
        set({
            loading:false,
            detail:res.data
        })
    },
}))

export default useDetailStore