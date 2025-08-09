import useTitle from '@/hooks/useTitle';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Search, Plus, Delete, Success, Clock, Star } from '@react-vant/icons';
import useBookStore from '@/store/useBookStore';
import styles from './home.module.css';
import ReadingStats from './ReadingStats';
import Bookshelf from './Bookshelf';
import RecommendedBooks from './RecommendedBooks';
import SwiperBook from './SwiperBook';


const Home = () => {
  useTitle('首页');

  const navigate = useNavigate();
  const bookStore = useBookStore();
  const [editMenu, setEditMenu] = useState({ visible: false, x: 0, y: 0, bookId: null });

  // 关闭编辑菜单
  const closeEditMenu = () => {
    setEditMenu({ visible: false, x: 0, y: 0, bookId: null });
  };

  // 初始加载获取详情数据
  useEffect(() => {
    bookStore.getBookshelfBooks();

  }, []);

  return (
    <div className={styles.home} onClick={closeEditMenu}>
      {/* 搜索栏 */}
      <div className={styles.searchBar} onClick={() => navigate('/search')}>
        <Search className={styles.searchIcon} size={18} />
        <span className={styles.searchText}>搜索书籍、作者、标签...</span>
      </div>

      {/* 阅读统计卡片 */}
      <ReadingStats />

      {/* 书架 */}
      <Bookshelf setEditMenu={setEditMenu} closeEditMenu={closeEditMenu} editMenu={editMenu} />

      {/* 轮播图 */}
      <SwiperBook />


      {/* 为你推荐 */}
      <RecommendedBooks />

      {/* 编辑菜单 */}
        {/* <div
        className={`${styles.longPressMenu} ${editMenu.visible ? styles.menuActive : ''}`}
        style={{ 
          left: editMenu.x,
          top: editMenu.y,
          display: editMenu.visible ? 'block' : 'none'
        }}
        onClick={(e) => e.stopPropagation()}
      >
          <div className={styles.menuItem}>
            <span className={styles.menuIcon}>📖</span>
            阅读
          </div>
          <div className={styles.menuItem}>
            <span className={styles.menuIcon}>🔝</span>
            移至顶部
          </div>
          <div className={styles.menuItem}>
            <Success className={styles.menuIcon} size={16} />
            标为已读完
          </div>
          <div className={styles.menuItem}>
            <Clock className={styles.menuIcon} size={16} />
            标为未读
          </div>
          <div className={styles.menuItem}>
            <Star className={styles.menuIcon} size={16} />
            修改封面
          </div>
          <div className={styles.menuItem + ' ' + styles.delete}>
            <Delete className={styles.menuIcon} size={16} />
            移除书架
          </div>
        </div> */}
      
    </div>
  );
};

export default Home;
