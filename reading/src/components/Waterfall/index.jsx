import styles from './waterfall.module.css'
import { useRef, useState, useEffect } from 'react'
import ImageCard from '@/components/ImageCard'
import {PullRefresh} from 'react-vant'


const Waterfall = (props) =>{
      
    const {
        loading,
        books,
        fetchMore,
        onBookClick,
        onAddToBookshelf,
        hasMore = true // 是否还有更多书籍可加载，默认为true
    } = props
    const [columns, setColumns] = useState([[], []]);
    const [showLoader, setShowLoader] = useState(true); // 控制加载指示器显示
    const timerRef = useRef(null); // 存储计时器引用

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
// 监听滚动事件，实现加载指示器自动隐藏
useEffect(() => {
    const handleScroll = () => {
        // 显示加载指示器
        setShowLoader(true);
        
        // 清除之前的计时器
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        
        // 设置新的计时器，3秒后隐藏加载指示器
        timerRef.current = setTimeout(() => {
            setShowLoader(false);
        }, 1000);
    };

    window.addEventListener('scroll', handleScroll);
    
    // 初始设置计时器
    timerRef.current = setTimeout(() => {
        setShowLoader(false);
    }, 3000);
    
    return () => {
        window.removeEventListener('scroll', handleScroll);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    };
}, []);

// 当加载状态变化时显示加载指示器
useEffect(() => {
    if (loading) {
        setShowLoader(true);
    } else if (hasMore) {
        // 加载完成后，如果还有更多数据，3秒后隐藏
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            setShowLoader(false);
        }, 3000);
    } else {
        // 没有更多数据时一直显示
        setShowLoader(true);
    }
}, [loading, hasMore]);

// 监听可见性和加载状态，触发加载
useEffect(() => {
    if (!loading && loader.current && showLoader) {
        // 创建新的观察者实例
        const newObserver = new IntersectionObserver(([entry]) => {
            console.log('IntersectionObserver entry:', entry);
            if (entry.isIntersecting && !loading) {
                fetchMore();
            }
        }, {
            threshold: 0.1
        });
        newObserver.observe(loader.current);
        return () => newObserver.disconnect();
    }
}, [loading, fetchMore, showLoader])

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
                        onAddToBookshelf={onAddToBookshelf} 
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
                            onAddToBookshelf={onAddToBookshelf} 
                            {...book}

                        />
                    )
                })}
            </div>
            {showLoader && (
                <div ref={loader} className={styles.loader}>
                    {loading ? '加载中' : (hasMore ? '下拉加载更多' : '已经到底部')}
                </div>
            )}
           
        </div>
    )
}
export default Waterfall