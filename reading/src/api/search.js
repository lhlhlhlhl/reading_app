//search模块
import axios from './config'
import Mock from 'mockjs'

// 判断是否为生产环境
const isProduction = window.location.hostname !== 'localhost';

// 生成模拟搜索建议数据
const generateSuggestList = async(keyword) => {
    // 生成0-9个随机建议
    const count = Mock.Random.integer(0, 9);
    const list = [];
    
    for (let i = 0; i < count; i++) {
        const randomTitle = Mock.Random.ctitle(2, 8);
        list.push(`${keyword}${randomTitle}`);
    }
    
    return list;
};

export const getSuggestList = async (keyword) => {
    if (isProduction) {
        // 在生产环境中使用模拟数据
        return {
            code: 0,
            data: generateSuggestList(keyword)
        };
    } else {
        // 在开发环境中使用API
        return axios.get(`/search?keyword=${keyword}`);
    }
}


export const getHotList = async ()=>{
    if (isProduction) {
        // 在生产环境中使用模拟数据
        return {
            code: 0,
           data:[{
                id:'101',
                city:"凡人修仙传"
            },{
                id:'102',
                city:"三体"
            },{
                id:'103',
                city:"中国历史"
            },{
                id:'104',
                city:"长安的荔枝"
            },{
                id:'105',
                city:"我是一个人"
            },{
                id:'106',
                city:"天下"

            },
          ]
        };
    } else {
    return axios.get('/hotList')
    }
}

