// 模拟书架数据API的Vercel Serverless Function
// 访问路径: /api/books/bookshelf

// 导入书籍数据
import booksData from '../books.js';

// 过滤出书架中的书籍
const getBookshelfBooks = () => {
  // 由于我们不能直接导入其他Serverless Function，这里重新生成部分书籍数据
  const generateMockBooks = (count = 20) => {
    const books = [];
    const categories = {
      'fiction': { name: '小说', subCategories: ['玄幻', '奇幻', '武侠', '仙侠', '都市', '历史', '军事', '科幻', '悬疑', '言情'] },
      'non-fiction': { name: '非虚构', subCategories: ['传记', '历史', '哲学', '心理', '科学', '技术', '商业', '教育'] },
      'comics': { name: '漫画', subCategories: ['热血', '恋爱', '悬疑', '科幻', '奇幻', '日常', '搞笑'] },
      'kids': { name: '少儿', subCategories: ['童话', '绘本', '科普', '成长', '益智'] }
    };
    const categoryKeys = Object.keys(categories);

    for (let i = 0; i < count; i++) {
      const category = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
      const subCategories = categories[category].subCategories;
      const subCategory = subCategories[Math.floor(Math.random() * subCategories.length)];

      books.push({
        id: `bookshelf-book-${i}`,
        bookName: `书架书籍-${i}`,
        cover: `https://picsum.photos/300/400?random=${i+100}`,
        author: `作者-${i}`,
        publishTime: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        description: `这是书架书籍${i}的详细描述。`,
        category: category,
        subCategory: subCategory,
        isInBookshelf: true,
        isRead: Math.random() > 0.5,
        isTop: Math.random() > 0.8,
        isFinished: Math.random() > 0.3,
        rating: Math.floor(Math.random() * 10) + 1,
        readProgress: Math.floor(Math.random() * 101),
        readCount: Math.floor(Math.random() * 9901) + 100,
        rank: Math.floor(Math.random() * 100) + 1,
        collectionCount: Math.floor(Math.random() * 4951) + 50
      });
    }
    return books;
  };

  return generateMockBooks().filter(book => book.isInBookshelf);
};

export default function handler(req, res) {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理OPTIONS请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 处理GET请求
  if (req.method === 'GET') {
    const bookshelfBooks = getBookshelfBooks();
    return res.status(200).json({
      code: 0,
      data: bookshelfBooks
    });
  }

  // 其他请求方法
  return res.status(405).json({
    code: -1,
    message: 'Method not allowed'
  });
}