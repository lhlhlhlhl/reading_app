import Mock from 'mockjs';

// 定义书籍数据结构
const BookModel = {
  id: '',
  bookName: '',
  cover: '',
  author: '',
  publishTime: '',
  description: '',
  category: '', // 主分类
  subCategory: '', // 子分类
  isInBookshelf: false,
  isRead: false,
  isTop: false,
  isFinished: false, // 是否完本
  rating: 0,
  readProgress: 0,
  readCount: 0, // 阅读人数
  rank: 0, // 排名
  collectionCount: 0 // 收藏数量
};

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
    url: '/api/books/bookshelf',
    method: 'get',
    timeout: 1000,
    response: () => {
      const bookshelfBooks = mockBooks.filter(book => book.isInBookshelf);
      return {
        code: 0,
        data: bookshelfBooks
      };
    }
  },
  {
    url: '/api/books/:id',
    method: 'get',
    timeout: 1000,
    response: (req) => {
      const id = req.params.id;
      const book = mockBooks.find(book => book.id === id);
      return {
        code: 0,
        data: book || null
      };
    }
  },
  {
    url: '/api/books/update',
    method: 'post',
    timeout: 1000,
    response: (req) => {
      const { id, updates } = req.body;
      const index = mockBooks.findIndex(book => book.id === id);
      if (index !== -1) {
        mockBooks[index] = { ...mockBooks[index], ...updates };
        return {
          code: 0,
          data: mockBooks[index],
          message: '更新成功'
        };
      }
      return {
        code: -1,
        message: '未找到书籍'
      };
    }
  },{
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