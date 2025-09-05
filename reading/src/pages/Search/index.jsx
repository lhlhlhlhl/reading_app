import SearchBox from '@/components/SearchBox'
import useSearchStore from '@/store/useSearchStore'
import styles from './search.module.css'
import { useState, useEffect, memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const Search = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const {
    searchHistory,
    suggestList,
    setSuggestList,
    setSearchHistory,
    hotList,
    setHotList
  } = useSearchStore()
  //单向数据流
  const HotListItems = memo((props) => {
    console.log('--------------', props)
    const { hotList } = props
    return (
      <div className={styles.hot}>
        <h1>热门推荐</h1>
        {
          hotList.map((item, index) => (
            <div
              className={styles.item}
              key={`hot-${index}-${item?.id || index}`}
              onClick={() => navigate(`/detail/1`)}

            >
              {item?.city || item?.title || item}
            </div>
          ))
        }
      </div>
    )
  })
  //搜索历史
  const SearchHistoryItems = memo((props) => {
    const { searchHistory, onDeleteItem, onClearAll } = props
    return (
      <div className={styles.history}>
        <div className={styles.historyHeader}>
          <h2>搜索历史</h2>
          <button className={styles.clearBtn} onClick={onClearAll}>清空</button>
        </div>
        {
          searchHistory.map((item, index) => (
            <div
              className={styles.item}
              key={`history-${index}-${item}`}
            >
              <span className={styles.itemText} onClick={() => navigate(`/detail/1`)}>{item}</span>

              <button
                className={styles.deleteBtn}
                onClick={() => onDeleteItem(index)}
              >×</button>
            </div>
          ))
        }
      </div>
    )
  })
  useEffect(() => {
    setHotList();
    // 确保正确初始化搜索历史
    const history = localStorage.getItem('searchHistory');
    setSearchHistory(history ? JSON.parse(history) : []);
  }, [setHotList, setSearchHistory]);
  //反复重新生成，使用useCallback
  const handleQuery = (query) => {
    //api请求交流
    console.log('debounce后', query)
    setQuery(query);
    if (!query) {
      return;
    }
    setSuggestList(query)
    // 搜索历史
  }
  const handleClick = useCallback(() => {
    if (!query.trim()) return;
    // 合并新查询和历史记录，并去重
    const newHistory = [...new Set([query, ...searchHistory])]
    localStorage.setItem('searchHistory', JSON.stringify(newHistory))
    setSearchHistory(newHistory)
    // 跳转到书本详情页，假设需要传递搜索关键词作为参数
    navigate(`/detail/1`)
  }, [query, searchHistory, navigate])

  // 删除单个历史记录
  const handleDeleteItem = useCallback((index) => {
    const newHistory = [...searchHistory];
    newHistory.splice(index, 1);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    setSearchHistory(newHistory);
  }, [searchHistory, setSearchHistory]);

  // 清空所有历史记录
  const handleClearAll = useCallback(() => {
    localStorage.removeItem('searchHistory');
    setSearchHistory([]);
  }, [setSearchHistory])
  const suggestListStyle = {
    display: query == '' ? 'none' : 'block', id: query
  }
  console.log('suggestList', suggestList)

  return (

    <div className={styles.container}>
      <div className={styles.wrapper}>
        <SearchBox handleQuery={handleQuery} onSubmit={handleClick} />

        {/* 当没有搜索查询时显示搜索历史和热门推荐 */}
        {query === '' ? (
          <>
            {searchHistory.length > 0 ? (
              <SearchHistoryItems
                searchHistory={searchHistory}
                onDeleteItem={handleDeleteItem}
                onClearAll={handleClearAll}
              />
            ) : (
              <div className={styles.empty}>暂无搜索历史</div>
            )}

            <HotListItems hotList={hotList} />
          </>
        ) : (
          /* 有搜索查询时显示建议列表 */
          <div className={styles.list}>
            {/* 增强的搜索建议渲染逻辑 */}
            {/* 多层次安全检查确保数据正确性 */}
            {suggestList && Array.isArray(suggestList) && suggestList.length > 0 ? (
              // 再次确保这是一个有效的数组
              [...suggestList].filter(item => item !== null && item !== undefined).map((item, index) => (
                <div
                  key={`suggest-${index}-${typeof item === 'object' ? 
                    (item?.title || 
                     Object.values(item)[0] || 
                     index) : 
                    item || index}`}
                  className={styles.item}
                  onClick={() => navigate(`/detail/1`)}
                >
                  {/* 智能处理不同类型的数据显示 */}
                  {typeof item === 'object' && item !== null ? (
                    // 优先显示title，没有则尝试显示第一个可用值，否则显示字符串化结果
                    item.title || 
                    (Object.values(item).length > 0 ? Object.values(item)[0] : JSON.stringify(item))
                  ) : (
                    // 对于非对象类型，直接显示或转为字符串
                    item || '未知项'
                  )}
                </div>
              ))
            ) : (
              <div className={styles.empty}>未找到相关结果</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
export default Search
