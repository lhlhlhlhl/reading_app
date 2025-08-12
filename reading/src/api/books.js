import axios from './config'
import Mock from 'mockjs'
import {envConfig} from './config'

const isProduction = envConfig.isProduction

// 定义主分类和子分类
const CATEGORIES = {
  'fiction': { name: '小说', subCategories: ['玄幻', '奇幻', '武侠', '仙侠', '都市', '历史', '军事', '科幻', '悬疑', '言情'] },
  'non-fiction': { name: '非虚构', subCategories: ['传记', '历史', '哲学', '心理', '科学', '技术', '商业', '教育'] },
  'comics': { name: '漫画', subCategories: ['热血', '恋爱', '悬疑', '科幻', '奇幻', '日常', '搞笑'] },
  'kids': { name: '少儿', subCategories: ['童话', '绘本', '科普', '成长', '益智'] }
};
const generateMockBooks = async (count = 100) => {

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

export const mockBooksData = async () =>{
    if (isProduction) {
        // 在生产环境中使用模拟数据
        return {
            code: 0,
            data: generateMockBooks()
        };
    } else {
        // 在开发环境中使用API
        return axios.get(`/books`)
    }
    
}

