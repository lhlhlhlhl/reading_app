// 自定义hooks 用于修改网页标题，每次路由切换时修改
import { useEffect } from 'react'

function useTitle(title) {
    // useEffect(() => {
        document.title = title
    // }, [])
}
export default useTitle