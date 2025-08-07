import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Plus, Delete, Success, Clock, Star } from '@react-vant/icons';
import styles from './home.module.css';
// import bookDataService from '@/utils/bookDataService';
import useBookStore from '@/store/useBookStore';

const Bookshelf = ({ setEditMenu, closeEditMenu, editMenu }) => {
  const bookStore = useBookStore();
  const books = bookStore.getBookshelfFromLocalStorage();
  const navigate = useNavigate();
  const [bookshelfData, setBookshelfData] = useState(books);
  const bookRefs = useRef({});
 
  // 获取书架数据
  useEffect(() => {
    fetchBookshelfData();
    // 可以添加一个监听函数，当localStorage变化时更新数据
    const handleStorageChange = () => {
      refreshBookshelf();
    };
    // 监听localStorage变化
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
    
  }, []);
   
  // 排序
  const sortedBooks = () => {
   books.sort((a, b) => {
      if (a.isTop !== b.isTop) {
        return b.isTop ? 1 : -1;
      }
      return 0;
    });
  console.log(books,'排序后');
  refreshBookshelf();
  };
  const fetchBookshelfData = () => {
      console.log(books,'2222');
      // 按置顶状态和添加时间排序
     sortedBooks();
      // bookStore.setBookshelfBooks(books);
      setBookshelfData(books);
    };
  // 刷新书架数据
  const refreshBookshelf = () => {
    const books = bookStore.getBookshelfFromLocalStorage();
    setBookshelfData(books);
    // sortedBooks();
    console.log(books,'刷新后');
  };
  

  // 长按事件处理
  const longPressTimer = useRef(null);
  const lastTouchTime = useRef(0);
  const LONG_PRESS_DELAY = 200; // 长按触发时间(毫秒)

  // 开始长按检测
  const startLongPress = (e, bookId) => {
    e.preventDefault();
    // 检测是否为双击
    const currentTime = Date.now();
    if (currentTime - lastTouchTime.current < 300) {
      // 双击，不触发长按
      lastTouchTime.current = 0;
      return;
    }
    lastTouchTime.current = currentTime;

    // 设置长按计时器
    const targetElement = e.currentTarget;
    const rect = targetElement.getBoundingClientRect();
    longPressTimer.current = setTimeout(() => {
      setEditMenu({
        visible: true,
        x: rect.left + rect.width / 2, // 显示在书籍中间
        y: rect.top + rect.height / 2,
        bookId,
      });
    }, LONG_PRESS_DELAY);
    console.log(editMenu);
  };

  // 取消长按检测
  const cancelLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  // 点击书籍进入详情页
  const handleBookClick = (bookId) => {
    navigate(`/detail/${bookId}`);

  };

  // 处理文件导入
  const handleImportBook = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf,.epub,.txt';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // 这里可以添加文件上传逻辑
        console.log('导入文件:', file);
        // 使用bookDataService添加新书籍
        const newBook = bookDataService.addNewBook({
          bookName: file.name,
          cover: `https://dummyimage.com/300x400/79a6f2/fff&text=${encodeURIComponent(file.name)}`,
          author: '未知',
          publishTime: new Date().toISOString().split('T')[0],
          description: '通过文件导入的书籍',
        });
        alert(`文件 ${file.name} 导入成功！已添加到书架`);
        refreshBookshelf();
      }
    };
    fileInput.click();
  };

  // 处理编辑菜单操作
  const handleMenuAction = (action, bookId) => {
      console.log('[Menu Action]', action, 'BookId:', bookId);
      if (!bookId) {
        console.warn('⚠️ bookId 为 null 或 undefined');
        return;
      }
      switch (action) {
      case 'read':
        navigate(`/detail/${bookId}`);
        console.log('成功阅读')
        break;
      case 'top':
        
        const book = bookStore.getBookById(bookId);
        bookStore.setBookTopStatus(bookId, !book.isTop);
        refreshBookshelf();
        console.log(book.isTop,'6666',book)
        break;
      case 'markRead':
        bookStore.markAsRead(bookId);
        break;
      case 'markUnread':
        bookStore.markAsUnread(bookId);
        break;
      case 'changeCover':
        // 这里可以实现修改封面的逻辑
        const newCover = prompt('请输入新封面图片URL:');
        if (newCover) {
          bookStore.updateBookCover(bookId, newCover);
          refreshBookshelf();
        }
        break;
      case 'remove':
        if (confirm('确定要从书架移除这本书吗？')) {
          bookStore.removeFromBookshelf(bookId);
          refreshBookshelf();
        }
        break;
      default:
        break;
    }
    closeEditMenu();
  };

  // 跳转到书库
  const handleAddBook = () => {
    navigate('/stacks');
  };

  return (
    <div className={styles.bookshelf} onClick={closeEditMenu}>
      {/* 编辑菜单 - 移动到Bookshelf组件中以便更好地控制 */}
      <div
        className={`${styles.editMenu} ${editMenu?.visible ? styles.menuActive : ''}`}
        style={{
          left: editMenu?.x - 70, // 调整位置使其居中显示
          top: editMenu?.y - 80,
          display: editMenu?.visible ? 'block' : 'none'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.menuItem} onClick={(e) => {
          e.stopPropagation();
          handleMenuAction('read', editMenu?.bookId);
        }}>
          <span className={styles.menuIcon}>📖</span>
          阅读
        </div>
        <div className={styles.menuItem} onClick={(e) => {
          e.stopPropagation();
          handleMenuAction('top', editMenu?.bookId);
        }}>
          <span className={styles.menuIcon}>🔝</span>
          {editMenu?.bookId && bookStore.getBookById(editMenu?.bookId)?.isTop ? '取消置顶':'置顶'}
        </div>
        <div className={styles.menuItem} onClick={(e) => {
          e.stopPropagation();
          handleMenuAction('markRead', editMenu?.bookId);
        }}>
          <Success className={styles.menuIcon} size={16} />
          标为已读完
        </div>
        <div className={styles.menuItem} onClick={(e) => {
          e.stopPropagation();
          handleMenuAction('markUnread', editMenu?.bookId);
        }}>
          <Clock className={styles.menuIcon} size={16} />
          标为未读
        </div>
        <div className={styles.menuItem} onClick={(e) => {
          e.stopPropagation();
          handleMenuAction('changeCover', editMenu?.bookId);
        }}>
          <Star className={styles.menuIcon} size={16} />
          修改封面
        </div>
        <div className={styles.menuItem + ' ' + styles.delete} onClick={(e) => {
          e.stopPropagation();
          handleMenuAction('remove', editMenu?.bookId);
        }}>
          <Delete className={styles.menuIcon} size={16} />
          移除书架
        </div>
      </div>
      <div className={styles.sectionTitle}>
        书架
        <button className={styles.importButton} onClick={(e) => {
          e.stopPropagation();
          handleImportBook();
        }}>
          <Plus size={16} className={styles.menuIcon} /> 导入
        </button>
      </div>
      <div className={styles.booksContainer}>
        {bookshelfData.map((book) => (
          <div
        key={book.id}
        className={styles.bookItem}
        ref={(el) => (bookRefs.current[book.id] = el)}
        onClick={() => handleBookClick(book.id)}
        onTouchStart={(e) => startLongPress(e, book.id)}
        onTouchMove={cancelLongPress}
        onTouchEnd={cancelLongPress}
        onMouseDown={(e) => startLongPress(e, book.id)}
        onMouseMove={cancelLongPress}
        onMouseUp={cancelLongPress}
        onMouseLeave={cancelLongPress}
      >
        {book.isFinished && <div className={styles.finishedMarker}>完本</div>}
        {book.isRead && <div className={styles.readMarker}></div>}
        {book.isTop && <div className={styles.topMarker}>置顶</div>}
        <img src={book.cover || book.coverUrl} alt={book.bookName || book.name} className={styles.bookCover} />
        <div className={styles.bookInfo}>
                <div className={styles.bookName}>{book.name || book.bookName}</div>
                <div className={styles.bookAuthor}>{book.author}</div>
                {/* <div className={styles.bookMeta}>
                  <span className={styles.rating}>{book.rating?.toFixed(1) || book.rating}</span>
                  <span className={styles.readCount}>{book.readCount}</span>
                </div> */}
        </div>
        <div className={styles.editIcon}>...</div>
      </div>
        ))}
        <div className={styles.bookItem} onClick={handleAddBook}>
          <div className={styles.addBook}>
            <Plus className={styles.addIcon} />
            <span>添加书籍</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookshelf;