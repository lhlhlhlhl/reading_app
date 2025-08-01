import useTitle from '@/hooks/useTitle';
// import { Search, BookmarkO, Plus, Trash, Bookmark, Checked, Clock, Star} from '@react-vant/icons';
import {
  Search,
  Plus,
  Delete,
  //Mark,
  //Marked,
  Success,
  Clock,
  Star,
} from '@react-vant/icons';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import useDetailStore from '@/store/useDetailStore';
import styles from './home.module.css';

// 模拟书架数据
const bookshelfData = [
  {
    id: 1,
    bookName: '淮上《银河帝国之刃》',
    cover: 'https://dummyimage.com/300x400/79f291/fff&text=%E9%93%B6%E6%B2%B3%E5%B8%9D%E5%9B%BD%E4%B9%8B%E5%88%83',
  },
  {
    id: 2,
    bookName: '《温柔以待》',
    cover: 'https://dummyimage.com/300x400/f27979/fff&text=%E6%B8%A9%E6%9F%94%E4%BB%A5%E5%BE%85',
  },
  {
    id: 3,
    bookName: 'PDF示例文档',
    cover: 'https://dummyimage.com/300x400/79a6f2/fff&text=PDF%E7%A4%BA%E4%BE%8B',
  },
  {
    id: 4,
    bookName: '使用指南',
    cover: 'https://dummyimage.com/300x400/f2d379/fff&text=%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97',
  },
];

// 第二批推荐书籍数据
const recommendedDataBatch2 = [
  {
    id: 201,
    bookName: '三体',
    cover: 'https://dummyimage.com/300x400/79f2d3/fff&text=%E4%B8%89%E4%BD%93',
    info: '刘慈欣作品',
  },
  {
    id: 202,
    bookName: '活着',
    cover: 'https://dummyimage.com/300x400/f279a6/fff&text=%E6%B4%BB%E7%9D%80',
    info: '余华作品',
  },
  {
    id: 203,
    bookName: '百年孤独',
    cover: 'https://dummyimage.com/300x400/a679f2/fff&text=%E7%99%BE%E5%B9%B4%E5%AD%A4%E7%8B%AC',
    info: '加西亚·马尔克斯作品',
  },
  {
    id: 204,
    bookName: '追风筝的人',
    cover: 'https://dummyimage.com/300x400/f2d379/fff&text=%E8%BF%BD%E9%A3%8E%E7%AD%9D%E7%9A%84%E4%BA%BA',
    info: '卡勒德·胡赛尼作品',
  },
  {
    id: 205,
    bookName: '解忧杂货店',
    cover: 'https://dummyimage.com/300x400/79a6f2/fff&text=%E8%A7%A3%E5%BF%A7%E6%9D%82%E8%97%8F%E5%BA%97',
    info: '东野圭吾作品',
  },
  {
    id: 206,
    bookName: '小王子',
    cover: 'https://dummyimage.com/300x400/f27979/fff&text=%E5%B0%8F%E7%8E%8B%E5%AD%90',
    info: '安托万·德·圣埃克苏佩里作品',
  },
];

// 第三批推荐书籍数据
const recommendedDataBatch3 = [
  {
    id: 301,
    bookName: '人类简史',
    cover: 'https://dummyimage.com/300x400/79f291/fff&text=%E4%BA%BA%E7%B1%BB%E7%AE%80%E5%8F%B2',
    info: '尤瓦尔·赫拉利作品',
  },
  {
    id: 302,
    bookName: '未来简史',
    cover: 'https://dummyimage.com/300x400/f279d3/fff&text=%E6%9C%AA%E6%9D%A5%E7%AE%80%E5%8F%B2',
    info: '尤瓦尔·赫拉利作品',
  },
  {
    id: 303,
    bookName: '今日简史',
    cover: 'https://dummyimage.com/300x400/a679f2/fff&text=%E4%BB%8A%E6%97%A5%E7%AE%80%E5%8F%B2',
    info: '尤瓦尔·赫拉利作品',
  },
  {
    id: 304,
    bookName: '被讨厌的勇气',
    cover: 'https://dummyimage.com/300x400/f2d379/fff&text=%E8%A2%AB%E8%AE%A8%E5%8E%9F%E7%9A%84%E5%8B%87%E6%B0%94',
    info: '岸见一郎作品',
  },
  {
    id: 305,
    bookName: '思考，快与慢',
    cover: 'https://dummyimage.com/300x400/79a6f2/fff&text=%E6%80%9D%E8%80%83%EF%BC%8C%E5%BF%AB%E4%B8%8E%E6%85%A2',
    info: '丹尼尔·卡尼曼作品',
  },
  {
    id: 306,
    bookName: '原则',
    cover: 'https://dummyimage.com/300x400/f27979/fff&text=%E5%8E%9F%E5%88%99',
    info: '瑞·达利欧作品',
  },
];

const Home = () => {
  useTitle('Reading-首页');
  const navigate = useNavigate();
  const detailStore = useDetailStore();
  const [editMenu, setEditMenu] = useState({ visible: false, x: 0, y: 0, bookId: null });
  const [currentBatch, setCurrentBatch] = useState(1);
  const [recommendedData, setRecommendedData] = useState([
    {
      id: 101,
      bookName: '一句顶一万句',
      cover: 'https://dummyimage.com/300x400/bf77e9/fff&text=%E4%B8%80%E5%8F%A5%E9%A1%B6%E4%B8%80%E4%B8%87%E5%8F%A5',
      info: '一周搜索超1万',
    },
    {
      id: 102,
      bookName: '毛泽东传',
      cover: 'https://dummyimage.com/300x400/e97777/fff&text=%E6%AF%9B%E6%B3%BD%E4%B8%9C%E4%BC%A0',
      info: '总阅读超50万',
    },
    {
      id: 103,
      bookName: '寻秦记',
      cover: 'https://dummyimage.com/300x400/77a9e9/fff&text=%E5%AF%BB%E7%A7%A6%E8%AE%B0',
      info: '黄易作品',
    },
    {
      id: 104,
      bookName: '围城',
      cover: 'https://dummyimage.com/300x400/77e9c8/fff&text=%E5%9B%B0%E5%9F%8E',
      info: '超5万人推荐',
    },
    {
      id: 105,
      bookName: '富爸爸财务自由之路',
      cover: 'https://dummyimage.com/300x400/e9d777/fff&text=%E5%AF%8C%E7%88%B8%E7%88%B8',
      info: '畅销全球',
    },
    {
      id: 106,
      bookName: '天龙八部',
      cover: 'https://dummyimage.com/300x400/e977a2/fff&text=%E5%A4%A9%E9%BE%99%E5%85%AB%E9%83%A8',
      info: '总阅读超30万',
    },
  ]);
  const bookRefs = useRef({});

  // 双击事件处理
  const handleDoubleClick = (e, bookId) => {
    e.preventDefault();
    setEditMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      bookId,
    });
  };

  // 关闭编辑菜单
  const closeEditMenu = () => {
    setEditMenu({ visible: false, x: 0, y: 0, bookId: null });
  };

  // 点击书籍进入详情页
  const handleBookClick = (bookId) => {
    navigate(`/detail/${bookId}`);
  };

  // 处理换一批推荐书籍
  const handleChangeBatch = () => {
    setCurrentBatch((prevBatch) => {
      const newBatch = prevBatch % 3 + 1;
      if (newBatch === 1) {
        setRecommendedData([
          {
            id: 101,
            bookName: '一句顶一万句',
            cover: 'https://dummyimage.com/300x400/bf77e9/fff&text=%E4%B8%80%E5%8F%A5%E9%A1%B6%E4%B8%80%E4%B8%87%E5%8F%A5',
            info: '一周搜索超1万',
          },
          {
            id: 102,
            bookName: '毛泽东传',
            cover: 'https://dummyimage.com/300x400/e97777/fff&text=%E6%AF%9B%E6%B3%BD%E4%B8%9C%E4%BC%A0',
            info: '总阅读超50万',
          },
          {
            id: 103,
            bookName: '寻秦记',
            cover: 'https://dummyimage.com/300x400/77a9e9/fff&text=%E5%AF%BB%E7%A7%A6%E8%AE%B0',
            info: '黄易作品',
          },
          {
            id: 104,
            bookName: '围城',
            cover: 'https://dummyimage.com/300x400/77e9c8/fff&text=%E5%9B%B0%E5%9F%8E',
            info: '超5万人推荐',
          },
          {
            id: 105,
            bookName: '富爸爸财务自由之路',
            cover: 'https://dummyimage.com/300x400/e9d777/fff&text=%E5%AF%8C%E7%88%B8%E7%88%B8',
            info: '畅销全球',
          },
          {
            id: 106,
            bookName: '天龙八部',
            cover: 'https://dummyimage.com/300x400/e977a2/fff&text=%E5%A4%A9%E9%BE%99%E5%85%AB%E9%83%A8',
            info: '总阅读超30万',
          },
        ]);
      } else if (newBatch === 2) {
        setRecommendedData(recommendedDataBatch2);
      } else {
        setRecommendedData(recommendedDataBatch3);
      }
      return newBatch;
    });
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
        // 模拟上传成功后添加到书架
        const newBook = {
          id: Date.now(),
          bookName: file.name,
          cover: `https://dummyimage.com/300x400/79a6f2/fff&text=${encodeURIComponent(file.name)}`,
        };
        // 由于使用静态数据，这里只是模拟
        alert(`文件 ${file.name} 导入成功！`);
      }
    };
    fileInput.click();
  };

  // 跳转到书库
  const handleAddBook = () => {
    navigate('/stacks');
  };

  // 阅读统计数据
  const weekDays = ['一', '二', '三', '四', '五', '六', '日'];
  const [expanded, setExpanded] = useState(false);
  const [selectedDay, setSelectedDay] = useState('today');

  // 不同天数的阅读时长数据
  const readingData = {
    today: [0, 0, 30, 0, 0, 0, 0],
    week: [15, 45, 30, 60, 20, 90, 40],
    month: [20, 50, 35, 65, 25, 95, 45],
  };

  // 切换阅读统计卡片展开/收起状态
  const toggleReadingStats = () => {
    setExpanded(!expanded);
  };

  // 初始加载获取详情数据
  useEffect(() => {
    detailStore.setDetail();
  }, []);

  return (
    <div className={styles.home} onClick={closeEditMenu}>
      {/* 搜索栏 */}
      <div className={styles.searchBar} onClick={() => navigate('/search')}>
        <Search className={styles.searchIcon} size={18} />
        <span className={styles.searchText}>搜索书籍、作者、标签...</span>
      </div>

      {/* 阅读统计卡片 */}
      <div className={`${styles.readingStats} ${expanded ? styles.expanded : ''}`} onClick={toggleReadingStats}>
          <div className={styles.statsHeader}>
            <div className={styles.statsTitle}>阅读统计</div>
            <div className={styles.daySelector}>
              <button className={selectedDay === 'today' ? styles.selectedDay : ''} onClick={(e) => {
                e.stopPropagation();
                setSelectedDay('today');
              }}>今日</button>
              <button className={selectedDay === 'week' ? styles.selectedDay : ''} onClick={(e) => {
                e.stopPropagation();
                setSelectedDay('week');
              }}>本周</button>
              <button className={selectedDay === 'month' ? styles.selectedDay : ''} onClick={(e) => {
                e.stopPropagation();
                setSelectedDay('month');
              }}>本月</button>
            </div>
          </div>
          <div className={styles.statsContent}>
            <div>
              <span className={styles.readingTime}>{selectedDay === 'today' ? '30' : selectedDay === 'week' ? '300' : '1233'}</span>
              <span className={styles.timeText}>分钟</span>
            </div>
          </div>
          {expanded && (
            <div className={styles.statsChart}>
              <div className={styles.chartTitle}>{selectedDay === 'today' ? '今日阅读时段分布' : selectedDay === 'week' ? '本周阅读时长分布' : '本月阅读时长分布'}</div>
              <div className={styles.chartContainer}>
                {weekDays.map((day, index) => (
                  <div key={index} className={styles.chartBarWrapper}>
                    <div className={styles.chartBar} style={{ height: `${readingData[selectedDay][index] * 2}px` }}></div>
                    <div className={styles.chartDay}>{day}</div>
                    <div className={styles.chartValue}>{readingData[selectedDay][index]}m</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      {/* 书架 */}
      <div className={styles.bookshelf}>
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
              onDoubleClick={(e) => handleDoubleClick(e, book.id)}
              onTouchStart={(e) => {
                // 移动端双击检测
                const touchTimestamp = e.timeStamp;
                const lastTouchTimestamp = useRef(0);
                if (touchTimestamp - lastTouchTimestamp.current < 300) {
                  handleDoubleClick(e, book.id);
                }
                lastTouchTimestamp.current = touchTimestamp;
              }}
            >
              <img src={book.cover} alt={book.bookName} className={styles.bookCover} />
              <div className={styles.bookName}>{book.bookName}</div>
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

      {/* 为你推荐 */}
      <div className={styles.recommendedBooks}>
        <div className={styles.sectionTitle}>为你推荐</div>
        <div className={styles.recommendedContainer}>
          {recommendedData.map((book) => (
            <div
              key={book.id}
              className={styles.recommendedBook}
              onClick={() => handleBookClick(book.id)}
            >
              <img src={book.cover} alt={book.bookName} className={styles.recommendedCover} />
              <div className={styles.recommendedName}>{book.bookName}</div>
              <div className={styles.recommendedInfo}>{book.info}</div>
            </div>
          ))}
        </div>
        <button className={styles.changeBatch} onClick={handleChangeBatch}>换一批</button>
      </div>

      {/* 编辑菜单 */}
      {editMenu.visible && (
        <div
          className={styles.longPressMenu}
          style={{ left: editMenu.x, top: editMenu.y }}
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
        </div>
      )}
    </div>
  );
};

export default Home;
