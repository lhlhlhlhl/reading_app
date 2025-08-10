import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './home.module.css';
// import bookDataService from '@/utils/bookDataService';
import useBookStore from '@/store/useBookStore';

const RecommendedBooks = () => {
  const bookStore = useBookStore();
  const navigate = useNavigate();
  

  // 获取推荐书籍数据
  useEffect(() => {
    fetchRecommendedBooks();
  }, []);

  // 从服务获取推荐书籍
  const fetchRecommendedBooks = () => {
    const allRecommendedBooks = bookStore.initRecommendedBooks();
    console.log(allRecommendedBooks)
    // 按批次划分
    // const batchData = allRecommendedBooks.slice(0, BATCH_SIZE);
    // setRecommendedData(bookStore.recommendedBooks);
  };


  // 处理换一批推荐书籍
  const handleChangeBatch = () => {
    bookStore.refreshRecommendations();
  };

  // 点击书籍进入详情页
  const handleBookClick = (bookId) => {
    navigate(`/detail/${bookId}`);
  };

  return (
    <div className={styles.recommendedBooks}>
      <div className={styles.sectionTitle}>为你推荐</div>
      <div className={styles.recommendedContainer}>
        {bookStore.recommendedBooks.map((book) => (
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
  );
};

export default RecommendedBooks;