import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './stacks.module.css';
import useBookStore from '@/store/useBookStore';
import  useTitle  from '@/hooks/useTitle';
import Waterfall from '@/components/Waterfall';
import { ArrowUp } from '@react-vant/icons'; // 使用项目中已有的图标库
import { Search } from '@react-vant/icons';
import { PullRefresh } from 'react-vant';



const Stacks = () => {
  useTitle('Reading-书库');
  const navigate = useNavigate();
  const bookStore = useBookStore();
  // const [editMenu, setEditMenu] = useState({ visible: false, x: 0, y: 0, bookId: null });
  // const [selectedBook, setSelectedBook] = useState(null);
  const [showSubCategories, setShowSubCategories] = useState(false);
  // 分页状态管理
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false); // 控制回到顶部按钮显示
  const PAGE_SIZE = 8; // 每页加载数量
  const [refreshing, setRefreshing] = useState(false);
const pullRefreshRef = useRef(null);

  // 切换主分类
  const handleCategoryChange = (categoryId) => {
    bookStore.setActiveCategory(categoryId);
    setShowSubCategories(categoryId !== 'all');
    // 重置分页状态
    resetPagination();
  };

  // 切换子分类
  const handleSubCategoryChange = (subCategoryId) => {
    bookStore.setActiveSubCategory(subCategoryId);
    // 重置分页状态
    resetPagination();
  }

  // 重置分页状态
  const resetPagination = () => {
    setLoading(false);
    loadInitialBooks();
  };

  // 查看书籍详情
  const handleBookClick = (bookId) => {
    navigate(`/detail/${bookId}`);
  };

  // 获取当前页的新书籍
  const getNewPageBooks = (page) => {
    const allBooks = bookStore.getCurrentCategoryBooks();
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = page * PAGE_SIZE;
    return allBooks.slice(startIndex, endIndex);
  }

  // 初始加载和分类切换时加载书籍
  const loadInitialBooks = () => {
    console.log('开始初始加载书籍');
    const allBooks = bookStore.getCurrentCategoryBooks();
    console.log('当前分类下的书籍总数:', allBooks.length);
    const initialBooks = getNewPageBooks(1);
    console.log('初始加载的书籍数量:', initialBooks.length);
    setDisplayedBooks(initialBooks);
    const hasMoreInitial = initialBooks.length === PAGE_SIZE;
    setHasMore(hasMoreInitial);
    console.log('是否有更多书籍:', hasMoreInitial);
    setCurrentPage(1);
  }

  // 加载更多书籍
  const fetchMore = () => {
    console.log('尝试加载更多 - hasMore:', hasMore, 'loading:', loading);
    // 如果已经没有更多书籍或已经在加载中，则不再加载
    if (!hasMore || loading) {
      console.log('不加载更多 - 原因:', !hasMore ? '没有更多书籍' : '已经在加载中');
      return;
    }

    setLoading(true);
    console.log('开始加载第', currentPage + 1, '页');
    // 模拟网络请求延迟
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const newBooks = getNewPageBooks(nextPage);
      
      console.log('加载完成，新增', newBooks.length, '本书籍');
      setDisplayedBooks(prevBooks => [...prevBooks, ...newBooks]);
      setCurrentPage(nextPage);
      // 判断是否还有更多书籍
      const stillHasMore = newBooks.length === PAGE_SIZE;
      setHasMore(stillHasMore);
      console.log('是否还有更多书籍:', stillHasMore);
      setLoading(false);
    }, 800);
  };

  // 初始加载书籍
  useEffect(() => {
    console.log('分类或子分类变化，重新加载书籍');
    loadInitialBooks();
  }, [bookStore.activeCategory, bookStore.activeSubCategory]);

  // 监听displayedBooks变化，调试用
  useEffect(() => {
    console.log('当前显示的书籍数量:', displayedBooks.length);
  }, [displayedBooks]);

  // 检查PullRefresh组件是否正确初始化
  useEffect(() => {
    if (pullRefreshRef.current) {
      console.log('PullRefresh组件已初始化:', pullRefreshRef.current);
    } else {
      console.log('PullRefresh组件未初始化');
    }
  }, []);

  // 监听滚动事件，控制回到顶部按钮显示
  useEffect(() => {
    const handleScroll = () => {
      console.log('滚动事件触发，当前位置:', window.scrollY);
      // 降低阈值以便更容易测试按钮显示
      setShowScrollTop(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    // 初始检查一次滚动位置
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 回到顶部函数
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  //下拉刷新
const onRefresh = async () => {
    console.log('>>> onRefresh函数被触发 <<<');
    setRefreshing(true);
    try {
      // 模拟网络请求延迟
      await new Promise(resolve => setTimeout(resolve, 1500));
      // 随机打乱当前显示的书籍顺序
      setDisplayedBooks(prevBooks => {
        const shuffledBooks = [...prevBooks];
        for (let i = shuffledBooks.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledBooks[i], shuffledBooks[j]] = [shuffledBooks[j], shuffledBooks[i]];
        }
        return shuffledBooks;
      });
      console.log('>>> 刷新完成 <<<');
    } catch (error) {
      console.error('>>> 刷新失败:', error);
    } finally {
      setRefreshing(false);
    }
  };
  const handleAddToBookshelf = (bookId) => {
    bookStore.addToBookshelf(bookId);
    // 更新displayedBooks中的书籍状态
    setDisplayedBooks(prevBooks => 
      prevBooks.map(book => 
        book.id === bookId ? { ...book, isInBookshelf: true } : book
      )
    );
  }


  return (
    <div className={styles.stacks} >
      {/* 搜索栏 */}
      <div className={styles.searchBar} onClick={() => navigate('/search')}>
        <Search className={styles.searchIcon} size={18} />
        <span className={styles.searchText}>搜索书籍、作者、标签...</span>
      </div>
      {/* 顶部主分类导航栏 */}
      <div className={styles.topCategoryNav}>
        <button
            key='all'
            className={`${styles.categoryButton} ${bookStore.activeCategory === 'all' ? styles.activeCategory : ''}`}
            onClick={() => handleCategoryChange('all')}
          >
            全部
          </button>
          
        {bookStore.getAllCategories().map(category => (
          <button
            key={category.id}
            className={`${styles.categoryButton} ${bookStore.activeCategory === category.id ? styles.activeCategory : ''}`}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* 移动设备子分类下拉菜单 */}
      <select
        className={styles.mobileSubCategoryDropdown}
        value={bookStore.activeSubCategory}
        onChange={(e) => handleSubCategoryChange(e.target.value)}
      >
        <option key='all' value='all'>全部</option>
        {bookStore.getSubCategories().map(subCategory => (
          <option key={subCategory.id} value={subCategory.id}>
            {subCategory.name}
          </option>
        ))}
      </select>

      <div className={styles.contentContainer}>
        {/* 左侧子分类导航（桌面设备） */}
        <div className={styles.sideCategoryNav} onClick={(e) => e.stopPropagation()}>
          <button
            key='all'
            className={`${styles.subCategoryButton} ${bookStore.activeSubCategory === 'all' ? styles.activeSubCategory : ''}`}
            onClick={() => handleSubCategoryChange('all')}
          >
            全部
          </button>
          {bookStore.getSubCategories().map(subCategory => (
            <button
              key={subCategory.id}
              className={`${styles.subCategoryButton} ${bookStore.activeSubCategory === subCategory.id ? styles.activeSubCategory : ''}`}
              onClick={() => handleSubCategoryChange(subCategory.id)}
            >
              {subCategory.name}
            </button>
          ))}
        </div>

        {/* 书籍列表瀑布流 - 包裹在PullRefresh中 */}
        <div className={styles.waterfallContainer}>
          <div className={styles.pullRefreshContainer}>
            <PullRefresh
              ref={pullRefreshRef}
              successText="刷新成功"
              pullingText="下拉即可刷新..."
              loosingText="释放立即刷新..."
              loadingText="加载中..."
              onRefresh={onRefresh}
              refreshing={refreshing}
              style={{ minHeight: 'calc(100vh - 160px)', overflow: 'auto' }} // 设置最小高度确保下拉刷新可触发
            >
            <Waterfall
              books={displayedBooks}
              loading={loading}
              fetchMore={fetchMore}
              onBookClick={handleBookClick}
              onAddToBookshelf={handleAddToBookshelf}


              hasMore={hasMore}
            />
            {/* {loading && (
              <div className={styles.loadingIndicator}>加载中...</div>
            )} */}
            </PullRefresh>
          </div>
        </div>
      </div>
     
      {/* 回到顶部按钮 */}
      {showScrollTop && (
        <button
          className={styles.scrollTopButton}
          onClick={scrollToTop}
          aria-label="回到顶部"
        >
          <ArrowUp size={24} />
        </button>
      )}

      
    </div>
  )}
export default Stacks
