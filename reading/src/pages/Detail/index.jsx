import useTitle from '@/hooks/useTitle';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from '@react-vant/icons';
import useBookStore from '@/store/useBookStore';
import { useEffect } from 'react';
import styles from './detail.module.css';

const Detail = () => {
  useTitle('Reading-详情页');
  const navigate = useNavigate();
  const { id } = useParams();
  const bookStore = useBookStore();
  const book = bookStore.getBookById(id);

  useEffect(() => {
    // 确保获取最新数据
    if (id) {
      console.log('获取书籍详情:', book);
    }
  }, [id, bookStore]);
  if(id==1){
    return (
       <div className={styles.container} style={{ backgroundImage: `url(https://k.sinaimg.cn/n/ent/transform/527/w550h777/20221212/ccc9-139af6d9d4c70ace0a2f244afd142580.jpg/w700h350z1l10t10fe6.jpg)` }}>
      <div className={styles.header}>
        <ArrowLeft className={styles.backIcon} onClick={() => navigate(-1)} />
      </div>
      <div className={styles.bookCard}>
        <img 
        src='https://picx.zhimg.com/v2-7d3219b61bf2e325a3f330a3d061e4f5_720w.jpg?source=172ae18b' 
        alt='长安的荔枝'
        className={styles.bookCover} />
        <div className={styles.bookInfo}>
          <h2 className={styles.bookName}>长安的荔枝</h2>
          <p className={styles.bookAuthor}>作者: 马伯庸</p>
          <div className={styles.bookRating}>
            <span className={styles.rating}>9.9</span>
            <div className={styles.stars}>
              {'★★★★★'.slice(0, Math.round(5))}
            </div>
          </div>
          <p className={styles.bookCategory}>历史 · 古代</p>

          <p className={styles.bookStatus}>完本</p>
        </div>
      </div>
      <div className={styles.bookDescription}>
        <h3 className={styles.sectionTitle}>内容简介</h3>
        <p className={styles.description}>
          《长安的荔枝》是作家马伯庸创作的一部历史小说。该书以唐代为背景，讲述了唐朝时期一位名叫李善德的小吏，如何在重重困难中完成从岭南运送新鲜荔枝到长安这一几乎不可能的任务。书中不仅描绘了古代官场的生态和小人物的生存智慧，还通过运送荔枝这一细节，展现了唐朝时期物流、交通及宫廷生活的面貌，反映了古代劳动人民的智慧与坚韧。小说情节紧凑，充满张力，是一部不可多得的历史小说佳作。
        </p>
      </div>
    </div>

    )
  }
  if (!book) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <ArrowLeft className={styles.backIcon} onClick={() => navigate(-1)} />
          <h1 className={styles.title}>书籍详情</h1>
        </div>
        <div className={styles.loading}>加载中...</div>
      </div>
    );
  }

  return (
    <div className={styles.container} style={{ backgroundImage: `url(${book.cover})` }}>
      <div className={styles.header}>
        <ArrowLeft className={styles.backIcon} onClick={() => navigate(-1)} />
      </div>
      <div className={styles.bookCard}>
        <img src={book.cover} alt={book.name} className={styles.bookCover} />
        <div className={styles.bookInfo}>
          <h2 className={styles.bookName}>{book.name}</h2>
          <p className={styles.bookAuthor}>作者: {book.author}</p>
          <div className={styles.bookRating}>
            <span className={styles.rating}>{book.rating || '9.9'}</span>
            <div className={styles.stars}>
              {'★★★★★'.slice(0, Math.round(book.rating || 5))}
            </div>
          </div>
          <p className={styles.bookCategory}>{book.categoryName} · {book.subCategory}</p>
          <p className={styles.bookStatus}>{book.isFinished ? '完本' : '连载中'}</p>
        </div>
      </div>
      <div className={styles.bookDescription}>
        <h3 className={styles.sectionTitle}>内容简介</h3>
        <p className={styles.description}>{book.description || '暂无简介'}</p>
      </div>
    </div>
  );
};

export default Detail;
