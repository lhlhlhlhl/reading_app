 import Mock from 'mockjs';

 //每页10个，两列，一列5个 瀑布流 翻页
 const getImages = (page,pageSize=10)=>{
   return Array.from({length:pageSize},(_,i)=>({
    id:`${page}-${i}`,
    height:Mock.Random.integer(300,600),
    url:Mock.Random.image('300x400',Mock.Random.color(),'#fff','img')
   }))
 }

export default [{
    url: '/api/search',
    method: 'get',
    timeout: 1000,
    response:(req, res) => {
        // ?keyword=释小龙
        const keyword = req.query.keyword;
        let num = Math.floor(Math.random() * 10);//生成0~9的随机数，floor向下取整
        let list = []
        for(let i=0;i<num;i++){
            //随机的内容，标题，描述，用户名，头像
            const randomData = Mock.mock({
              title:'@ctitle',
               desc:'@cparagraph(10,30)',
            images:
                {
                    url:'@image(300x200,@color,#fff,图片)',
                    alt:'@ctitle(5,10)'
                },
            })
            console.log(randomData)
            list.push({
                title:randomData.title,
                desc:randomData.desc,
                images:randomData.images
            })
        }
        return {
            code: 0,
            data: list
        }
    }
},
{
    url:'/api/hotlist',
    method:'get',
    timeout:1000,
    response:(req,res)=>{
        return {
            code:0,
            data:[{
                id:'101',
                city:"凡人修仙传"
            },{
                id:'102',
                city:"三体"
            },{
                id:'103',
                city:"中国历史"
            }]
        }
    }
},
{
    url:"/api/detail/:id",
    method:'get',
    timeout:1000,
    response:(req,res)=>{
        const randomData = Mock.mock({
            bookName:'@ctitle(5,10)',//书名
            bookDesc:'@cparagraph(10,30)',//描述
            images:
                {
                    url:'@image(300x200,@color,#fff,图片)',
                    alt:'@ctitle(5,10)'
                },//封面
            credit:'@float(0,10,2)',//评分
            keyword:'@cword(2, 3)',//关键词
            author:'@cname()',//作者
            publishTime:'@date()',//发布时间
            readNum:'@integer(1000, 10000)',//在线阅读量
            stacksNum:'@integer(100, 1000)',//加入书架量
            rank:'@integer(1, 100)',//排名
        })
        return {
            code:0,
            data:randomData
        }
    }
},
{
    //?page=1 queryString
    url:'/api/images',
    method:'get',
    response:({query})=>{
        const page = Number(query.page) || 1;
        return {
            code:0,
            data:getImages(page)
        }
    }
}
]