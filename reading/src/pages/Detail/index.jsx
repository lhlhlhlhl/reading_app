import useTitle from '@/hooks/useTitle';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from '@react-vant/icons';
import useBookStore from '@/store/useBookStore';
import { useEffect } from 'react';
import styles from './detail.module.css';

const Detail = () => {
  useTitle('Reading详情页');
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
