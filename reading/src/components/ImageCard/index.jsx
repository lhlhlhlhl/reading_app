import { useState, useEffect, useRef } from 'react';
import styles from './imageCard.module.css';

const ImageCard = (props) => {
  const { book, onClick, onAddToBookshelf } = props;
  const imgRef = useRef(null);
  // console.log(onAddToBookshelf)
  // 图片懒加载实现
  useEffect(() => {
    const observer = new IntersectionObserver(([entry], obs) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const oImg = document.createElement('img');
        oImg.src = img.dataset.src; // 预加载图片
        oImg.onload = () => {
          img.src = img.dataset.src; // 图片加载完成后设置src
        };
        obs.unobserve(img); // 观察一次后取消观察
      }
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [imgRef.current]);

  return (
    <div className={styles.bookItem} onClick={onClick}>
      <div className={styles.bookCoverWrapper}>
        <img 
          data-src={book?.cover} 
          alt={book?.name || book?.bookName} 
          className={styles.bookCover} 
          ref={imgRef} 
        />
        {/* 已读书籍标记 - 右上角小三角 */}
        {book?.isRead && <div className={styles.readMarker}>已读</div>}
        {/* 完本标记 */}
        {book?.isFinished && <div className={styles.finishedMarker}>完本</div>}
      </div>
      <div className={styles.bookInfo}>
        <div className={styles.bookName}>{book?.name || book?.bookName}</div>
        <div className={styles.bookAuthor}>{book?.author}</div>
        <div className={styles.bookMetaWithButton}>
          <div className={styles.bookMeta}>
            <span className={styles.rating}>{book?.rating?.toFixed(1) || book?.rating}</span>
            <span className={styles.readCount}>{book?.readCount}</span>
          </div>
          {/* 添加到书架按钮 */}
          {!book?.isInBookshelf && (
            <div 
              className={styles.addToBookshelf}
              onClick={(e) => {
                e.stopPropagation();
                onAddToBookshelf(book.id);
              }}
            >
              +
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCard;