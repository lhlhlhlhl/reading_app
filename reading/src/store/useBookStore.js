import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// 假设已配置路径别名，否则使用相对路径
import {mockBooksData} from '@/api/books';


// 定义主分类和子分类（与mock保持一致）
const CATEGORIES = {
  'fiction': { name: '小说', subCategories: ['玄幻', '奇幻', '武侠', '仙侠', '都市', '历史', '军事', '科幻', '悬疑', '言情'] },
  'non-fiction': { name: '非虚构', subCategories: ['传记', '历史', '哲学', '心理', '科学', '技术', '商业', '教育'] },
  'comics': { name: '漫画', subCategories: ['热血', '恋爱', '悬疑', '科幻', '奇幻', '日常', '搞笑'] },
  'kids': { name: '少儿', subCategories: ['童话', '绘本', '科普', '成长', '益智'] }
};

// 获取所有模拟书籍数据
//const mockBooks = mockBooksData.default.find(api => api.url === '/api/books')?.response()?.data || [];
const res =await mockBooksData();
const mockBooks = res.data;
console.log(mockBooks)

// 创建书籍存储
const useBookStore = create(
    (set, get) => ({
      // 所有书籍数据
      allBooks: mockBooks,
      // 当前分类（主分类）
      activeCategory: 'all',
      // 当前子分类
      activeSubCategory: 'all',
      // 推荐书籍列表
      recommendedBooks: [],
      // 书架书籍列表
      bookshelf: [],

      // 初始化推荐书籍
      initRecommendedBooks: () => {
        // 从所有书籍中随机选择9本作为推荐
        const shuffledBooks = [...get().allBooks].sort(() => 0.5 - Math.random());
        set({ recommendedBooks: shuffledBooks.slice(0, 9) });
      },
       // 获取书架上的书籍
      getBookshelfBooks: () => {
        console.log(get().allBooks.filter(book => book.isInBookshelf));
        set({ bookshelf: get().allBooks.filter(book => book.isInBookshelf) });
        // console.log(get().bookshelf,"777");

        return get().bookshelf;

      },
      //将isInBookshelf为true的书放在localstorage
      saveBookshelfToLocalStorage: () => {
        const bookshelf = get().getBookshelfBooks();

        console.log(bookshelf,"书放在localstorage");

        // console.log(bookshelf,"1111");
        localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
        return bookshelf;
      },
      // 从本地存储获取书架书籍
      getBookshelfFromLocalStorage: () => {
        const bookshelf = localStorage.getItem('bookshelf');
        console.log(JSON.parse(bookshelf),"从本地存储获取书架书籍");

        return bookshelf ? JSON.parse(bookshelf) : [];
      },
     
      // 添加书籍到书架
      addToBookshelf: (bookId) => {
        set(state => ({
          allBooks: state.allBooks.map(book =>
            book.id === bookId ? { ...book, isInBookshelf: true } : book
          )
        }));
        get().saveBookshelfToLocalStorage();
        //刷新stacks页面
        get().getBookshelfBooks();

      },
      // 从书架移除书籍
      removeFromBookshelf: (bookId) => {
        set(state => ({
            allBooks: state.allBooks.map(book =>
            book.id === bookId ? { ...book, isInBookshelf: false, isTop: false } : book
          )
        }));
        get().saveBookshelfToLocalStorage();
        //刷新
        get().getBookshelfBooks();


      },
      // 标记书籍为已读
      markAsRead: (bookId) => {
        set(state => ({
          allBooks: state.allBooks.map(book =>
            book.id === bookId ? { ...book, isRead: true, readProgress: 100 } : book
          )
        }));
        get().saveBookshelfToLocalStorage();
        //刷新
        get().getBookshelfBooks();
      },
      // 标记书籍为未读
      markAsUnread: (bookId) => {
        set(state => ({
          allBooks: state.allBooks.map(book =>
            book.id === bookId ? { ...book, isRead: false, readProgress: 0 } : book
          )
        }));
        get().saveBookshelfToLocalStorage();
        //刷新
        get().getBookshelfBooks();
      },
      // 设置书籍置顶状态
      setBookTopStatus: (bookId, isTop) => {
        console.log('调用 setBookTopStatus，bookId:', bookId, 'isTop:', isTop);

        console.log(bookId,isTop,'999');

        set(state => ({
          allBooks: state.allBooks.map(book =>
            book.id === bookId ? { ...book, isTop } : book
          )
        }));
        console.log(get().getBookById(bookId),'888');

         get().saveBookshelfToLocalStorage();
        // get().getBookshelfFromLocalStorage();
        get().getBookshelfBooks();


      },
      // 更新书籍封面
      updateBookCover: (bookId, newCover) => {
        set(state => ({
          allBooks: state.allBooks.map(book =>
            book.id === bookId ? { ...book, cover: newCover } : book
          )
        }));
        get().saveBookshelfToLocalStorage();
        //刷新
        get().getBookshelfBooks();
      },
      // 更改当前分类
      setActiveCategory: (category) => {
        set({ activeCategory: category, activeSubCategory: 'all' });
      },
      // 更改当前子分类
      setActiveSubCategory: (subCategory) => {
        set({ activeSubCategory: subCategory });
      },
      // 获取当前分类的书籍
      getCurrentCategoryBooks: () => {
        const { allBooks, activeCategory, activeSubCategory } = get();

        if (activeCategory === 'all') {
          return allBooks;
        }

        // 先按主分类过滤
        let filteredBooks = allBooks.filter(book => book.category === activeCategory);

        // 再按子分类过滤
        if (activeSubCategory !== 'all') {
          filteredBooks = filteredBooks.filter(book => book.subCategory === activeSubCategory);
        }

        return filteredBooks;
      },
      // 刷新推荐书籍
      refreshRecommendations: () => {
        const shuffledBooks = [...get().allBooks].sort(() => 0.5 - Math.random());
        set({ recommendedBooks: shuffledBooks.slice(0, 9) });
      },
      // 获取书籍详情
      getBookById: (bookId) => {
        // get().getBookshelfFromLocalStorage();

        console.log(get().allBooks.find(book => book.id === bookId),'55555');


        return get().allBooks.find(book => book.id === bookId) || null;
      },
      // 获取所有主分类
      getAllCategories: () => {
        return Object.entries(CATEGORIES).map(([id, { name }]) => ({
          id,
          name
        }));
      },
      // 获取当前主分类下的所有子分类
      getSubCategories: () => {
        const { activeCategory } = get();
        if (activeCategory === 'all' || !CATEGORIES[activeCategory]) {
          return [];
        }
        return CATEGORIES[activeCategory].subCategories.map(subCat => ({
          id: subCat,
          name: subCat
        }));
      }
    }),
    
);

export default useBookStore;