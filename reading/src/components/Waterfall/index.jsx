import styles from './waterfall.module.css'
import { useRef, useState, useEffect } from 'react'
import ImageCard from '@/components/ImageCard'

const Waterfall = (props) =>{
      
    const {        
        loading,
        books,
        fetchMore,
        onBookClick,
        onEditMenuClick,
        hasMore = true // 是否还有更多书籍可加载，默认为true
    } = props
    const [columns, setColumns] = useState([[], []]);

    useEffect(() => {
        // 初始化两列数组
        const newColumns = [[], []];

        // 按顺序将书籍分配到两列
        books.forEach((book, index) => {
            // 简单的奇偶分配：奇数索引到第一列，偶数索引到第二列
            const targetColumn = index % 2 === 0 ? 0 : 1;
            newColumns[targetColumn].push(book);
        });

        setColumns(newColumns);
        // 不再需要列高度状态
    }, [books])
    const loader = useRef(null)
    
    // 监听加载状态变化，重新观察loader元素
useEffect(() => {
    if (!loading && loader.current) {
        // 创建新的观察者实例
        const newObserver = new IntersectionObserver(([entry]) => {
            console.log('IntersectionObserver entry:', entry);
            if (entry.isIntersecting && !loading) {
                fetchMore();
                // 加载后不立即取消观察，而是等待加载完成后由useEffect重新设置
            }
        }, {
            threshold: 0.1 // 降低阈值，让加载触发更容易
        });
        newObserver.observe(loader.current);
        return () => newObserver.disconnect();
    }
}, [loading, fetchMore])
    return (
        <div className={styles.wrapper}>
            <div className={styles.column}>
                {columns[0].map(book => {
                    console.log(book,'瀑布流左')
                    return (
                    <ImageCard 
                        key={book.id} 
                        book={book} 
                        onClick={() => onBookClick && onBookClick(book.id)} 
                        onEditMenuClick={onEditMenuClick} 
                        {...book}

                    />
                )})}
            </div>
            {/* <div className={styles.column}>
                {columns[0].map(img => (
                    <ImageCard key={img.id} {...img} />
                ))}
            </div> */}
            <div className={styles.column}>
                {columns[1].map(book => {
                    console.log(book,'瀑布流右')
                    return (
                        <ImageCard 
                            key={book?.id} 
                            book={book}
                            onClick={() => onBookClick && onBookClick(book?.id)} 
                            onEditMenuClick={onEditMenuClick} 
                            {...book}

                        />
                    )
                })}
            </div>
            <div ref={loader} className={styles.loader}>
                {loading ? '加载中' : (hasMore ? '下拉加载更多' : '已经到底部')}
            </div>
        </div>
    )
}
export default Waterfall