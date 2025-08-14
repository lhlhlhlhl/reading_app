import Mock from 'mockjs';
// login 模块的 mock,模拟发送请求，生成token，进行鉴权判断
import jwt from 'jsonwebtoken'
//安全性 编码的时候用于加密
// 解码的时候用于解密
//加盐
const secret = 'ababab';// 加密的字符串,这个token只有我们的服务器可以打开

// 定义主分类和子分类
const CATEGORIES = {
  'fiction': { name: '小说', subCategories: ['玄幻', '奇幻', '武侠', '仙侠', '都市', '历史', '军事', '科幻', '悬疑', '言情'] },
  'non-fiction': { name: '非虚构', subCategories: ['传记', '历史', '哲学', '心理', '科学', '技术', '商业', '教育'] },
  'comics': { name: '漫画', subCategories: ['热血', '恋爱', '悬疑', '科幻', '奇幻', '日常', '搞笑'] },
  'kids': { name: '少儿', subCategories: ['童话', '绘本', '科普', '成长', '益智'] }
};

// 生成mock书籍数据
const generateMockBooks = (count = 100) => {
  const books = [];
  const categoryKeys = Object.keys(CATEGORIES);

  for (let i = 0; i < count; i++) {
    // 随机选择主分类
    const category = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
    // 随机选择子分类
    const subCategories = CATEGORIES[category].subCategories;
    const subCategory = subCategories[Math.floor(Math.random() * subCategories.length)];

    const book = Mock.mock({
      id: Mock.Random.guid(),
      bookName: Mock.Random.ctitle(5, 15),
      cover: Mock.Random.image('300x400', Mock.Random.color(), '#fff', 'book'),
      author: Mock.Random.cname(),
      publishTime: Mock.Random.date('yyyy-MM-dd'),
      description: Mock.Random.cparagraph(3, 5),
      category: category,
      subCategory: subCategory,
      // isInBookshelf: Mock.Random.boolean(0.1), // 30%的概率在书架中
      isInBookshelf: false, // 30%的概率在书架中
      isRead: Mock.Random.boolean(0.2), // 20%的概率已读完
      isTop: false,
      isFinished: Mock.Random.boolean(0.7), // 70%的概率已完本
      rating: Mock.Random.float(0, 10, 1, 1),
      readProgress: Mock.Random.integer(0, 100),
      readCount: Mock.Random.integer(100, 10000),
      rank: Mock.Random.integer(1, 100),
      collectionCount: Mock.Random.integer(50, 5000)
    });
    books.push(book);
  }
  return books;
};

//每页10个，两列，一列5个 瀑布流 翻页
 const getImages = (page,pageSize=10)=>{
   return Array.from({length:pageSize},(_,i)=>({
    id:`${page}-${i}`,
    height:Mock.Random.integer(300,600),
    url:Mock.Random.image('300x400',Mock.Random.color(),'#fff','img')
   }))
 }

// 导出书籍数据API
const mockBooks = generateMockBooks();

export default [
  {
    url: '/api/books',
    method: 'get',
    timeout: 1000,
    response: () => {
      return {
        code: 0,
        data: mockBooks
      };
    }
  }, 
  {
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
              title:'@ctitle'
            })
            console.log(randomData)
            list.push(`${randomData.title}${keyword}`)
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
        }
    }
},
 {
        url: '/api/login',
        method: 'post',
        timeout:2000,//请求耗时
        response: (req,res) => {
            const {username,password} = req.body
            if(username !== 'a'||password!=='1'){
                return {
                    code:1,
                    message:'用户名或密码出错了'
                }
            }
            // json用户数据对象
            const token = jwt.sign({
              user:{
                id:'001',
                username:'a'
              }  
            },secret,{
                expiresIn:86400
            })
            console.log(token,'----')

            //生成token 颁发令牌
            return {
                token,
                data:{
                    id:"001",
                    username:"a"
                }
            }
           
        }
    },
    {
        url:'/api/user',
        method:'get',
        response:(req,res)=>{
            //用户端 token headers
            const token = req.headers["authorization"].split(' ')[1];
            console.log(token)
            try{
                const decode = jwt.decode(token,secret)
                console.log(decode)
                return {
                    code:0,
                    data:decode.user
                }
            }catch(err){
                return {
                    code:1,
                    message:'Invalid token'
                }
            }
            return {
                token
            }
        }
    }
]