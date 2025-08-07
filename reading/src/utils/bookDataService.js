import Mock from 'mockjs';

// 定义书籍数据结构
const BookModel = {
  id: '',
  bookName: '',
  cover: '',
  author: '',
  publishTime: '',
  description: '',
  isInBookshelf: false,
  isRead: false,
  isTop: false,
  rating: 0,
  readProgress: 0
};

// 书籍数据管理服务
class BookDataService {
  constructor() {
    this.localStorageKey = 'reading_app_books';
    this.mockBooksCount = 100; // 生成的mock书籍数量
    this.initData();
  }

  // 初始化数据
  initData() {
    // 检查localStorage中是否有数据
    const storedBooks = localStorage.getItem(this.localStorageKey);
    if (!storedBooks) {
      // 如果没有数据，生成mock数据并存储
      const mockBooks = this.generateMockBooks();
      localStorage.setItem(this.localStorageKey, JSON.stringify(mockBooks));
    }
  }

  // 生成mock书籍数据
  generateMockBooks() {
    const books = [];
    for (let i = 0; i < this.mockBooksCount; i++) {
      const book = Mock.mock({
        id: Mock.Random.guid(),
        bookName: Mock.Random.ctitle(5, 15),
        cover: Mock.Random.image('300x400', Mock.Random.color(), '#fff', 'book'),
        author: Mock.Random.cname(),
        publishTime: Mock.Random.date('yyyy-MM-dd'),
        description: Mock.Random.cparagraph(3, 5),
        isInBookshelf: Mock.Random.boolean(),
        isRead: Mock.Random.boolean(),
        isTop: false,
        rating: Mock.Random.float(0, 10, 1, 1),
        readProgress: Mock.Random.integer(0, 100)
      });
      books.push(book);
    }
    return books;
  }

  // 获取所有书籍
  getAllBooks() {
    const storedBooks = localStorage.getItem(this.localStorageKey);
    return storedBooks ? JSON.parse(storedBooks) : [];
  }

  // 获取书架上的书籍
  getBookshelfBooks() {
    const allBooks = this.getAllBooks();
    return allBooks.filter(book => book.isInBookshelf);
  }

  // 获取推荐书籍 (随机选择12本)
  getRecommendedBooks() {
    const allBooks = this.getAllBooks();
    // 随机排序并取前50本
    return [...allBooks].sort(() => 0.5 - Math.random()).slice(0, 50);
  }

  // 根据id获取书籍
  getBookById(id) {
    const allBooks = this.getAllBooks();
    return allBooks.find(book => book.id === id);
  }

  // 添加书籍到书架
  addToBookshelf(id) {
    this.updateBookStatus(id, { isInBookshelf: true });
  }

  // 从书架移除书籍
  removeFromBookshelf(id) {
    this.updateBookStatus(id, { isInBookshelf: false, isTop: false });
  }

  // 标记书籍为已读
  markAsRead(id) {
    this.updateBookStatus(id, { isRead: true, readProgress: 100 });
  }

  // 标记书籍为未读
  markAsUnread(id) {
    this.updateBookStatus(id, { isRead: false, readProgress: 0 });
  }

  // 设置书籍置顶状态
  setBookTopStatus(id, isTop) {
    this.updateBookStatus(id, { isTop });
  }

  // 修改书籍封面
  updateBookCover(id, newCover) {
    this.updateBookStatus(id, { cover: newCover });
  }

  // 更新书籍状态
  updateBookStatus(id, updates) {
    const allBooks = this.getAllBooks();
    const index = allBooks.findIndex(book => book.id === id);
    if (index !== -1) {
      allBooks[index] = { ...allBooks[index], ...updates };
      localStorage.setItem(this.localStorageKey, JSON.stringify(allBooks));
      return true;
    }
    return false;
  }

  // 添加新书籍
  addNewBook(bookData) {
    const allBooks = this.getAllBooks();
    const newBook = {
      ...BookModel,
      id: Mock.Random.guid(),
      isInBookshelf: true,
      ...bookData
    };
    allBooks.push(newBook);
    localStorage.setItem(this.localStorageKey, JSON.stringify(allBooks));
    return newBook;
  }
}

// 导出单例实例
export default new BookDataService();