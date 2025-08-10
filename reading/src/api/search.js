//search模块
import axios from './config'

export const getSuggestList = async(keyword) => {
    console.log(keyword,'api里面的数据')
    return axios.get(`/search?keyword=${keyword}`)
}

export const getHotList = async ()=>{
    return axios.get('/hotList')
}

