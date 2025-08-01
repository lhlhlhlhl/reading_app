import SearchBox from '@/components/SearchBox'
 import  useSearchStore  from '@/store/useSearchStore'
 import styles from './search.module.css'
 import { useState,useEffect,memo, useCallback } from 'react'
 import { useNavigate } from 'react-router-dom'

const Search = () => {
  const[query,setQuery] = useState('')
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
const HotListItems =memo((props)=>{
  console.log('--------------',props)
  const{hotList} = props
 return(
  <div className={styles.hot}>
    <h1>热门推荐</h1>
    {
      hotList.map((item, index)=>(
        <div 
        className={styles.item} 
        key={`hot-${index}-${item?.id || index}`}
        >
          {item?.city || item?.title || item}
        </div>
      ))
    }
  </div>
 )
})
//搜索历史
const SearchHistoryItems = memo((props)=>{
  const {searchHistory} = props
  return(
    <div className={styles.history}>
      <h2>搜索历史</h2>
      {
        searchHistory.map((item, index)=>(
          <div 
          className={styles.item} 
          key={`history-${index}-${item}`}
          >
            {item}
            {console.log(item,'1111')}
          </div>
        ))
      }
    </div>
  )
})
useEffect(()=>{
  setHotList()
  setSearchHistory(localStorage.getItem('searchHistory'))
},[])
  //反复重新生成，使用useCallback
  const handleQuery = (query) =>{
    //api请求交流
    console.log('debounce后',query)
    setQuery(query);
    if(!query){
        return;
    }
    setSuggestList(query)
    // 搜索历史
  }
  const handleClick = useCallback(()=>{
    if (!query.trim()) return;
    // 合并新查询和历史记录，并去重
    const newHistory = [...new Set([query, ...searchHistory])]
    localStorage.setItem('searchHistory',JSON.stringify(newHistory))
    setSearchHistory(newHistory)
    // 跳转到书本详情页，假设需要传递搜索关键词作为参数
    navigate(`/detail/id=${encodeURIComponent(query)}`)
  }, [query, searchHistory, navigate])
  const suggestListStyle = {
    display: query=='' ?'none' : 'block',id:query
  }
 
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
      <SearchBox handleQuery={handleQuery} onSubmit={handleClick}/>
      {/* 维护性，性能 */}
      <SearchHistoryItems searchHistory={searchHistory}/>
      <HotListItems hotList={hotList}/>
      <div className={styles.list} style={suggestListStyle}>
        {
          suggestList.map((item, index) => 
            (
              <div key={`suggest-${index}-${item?.title || index}`} className={styles.item}>
                {item?.title || item}
              </div>
            )
          )
        }
      </div>
      </div>
    </div>
  )
}
export default Search
