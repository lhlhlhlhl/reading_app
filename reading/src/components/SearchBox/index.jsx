import {
    memo,
    useEffect,
    useRef,
    useState,
    useMemo
} from 'react';
import {
    ArrowLeft,
    Close
} from '@react-vant/icons';
import styles from './search.module.css'
import {
    debounce//防抖
} from '@/utils'
const SearchBox = (props) => {
   
    // 子父通信 单向数据流
    const [query, setQuery] = useState('');
    const { handleQuery } = props;
    const queryRef = useRef(null);
    const handleChange = (e) => {
    //    setQuery(queryRef.current.value)
        // 处理用户输入的空格
        if (e.target.value.trim() === '') {
            setQuery('');
            return;
        }
        setQuery(e.target.value.trim())
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (props.onSubmit) {
            props.onSubmit();
        }
    }
    const clearQuery = () => {
        setQuery('');
        queryRef.current.value = '';
        queryRef.current.focus();
    }
    // 1. 防抖
    // const handleDebounce = debounce(handleQuery, 500);
    // 2. useMemo 缓存debounce结果 (debounce需要计算的)，否则会反复执行
    // 闭包造成的开销大，不会被清理(性能优化)
    const handleQueryDebounce = useMemo(() => {
        return debounce(handleQuery, 300)
    }, [])

    const displayStyle = query.trim() ? { display: 'block' } : { display: 'none' };
    // 非受控组件
    useEffect(() => {
        console.log('//////', query)
       handleQueryDebounce(query);
    }, [query])
    return (
        <div className={`${styles.wrapper}`}>
            <ArrowLeft onClick={() => history.go(-1)}  />
            <input 
                type="text"
                className={styles.ipt} 
                placeholder="搜索旅游相关"
                ref={queryRef}
                onChange={handleChange}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleSubmit(e);
                    }
                }}
            />
            {/* 移动端用户体验 */}
            <Close onClick={clearQuery} style={displayStyle}/>
        </div>
    )
}

export default memo(SearchBox);