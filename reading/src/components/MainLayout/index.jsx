import{
    useState,
} from 'react'
import{
    Tabbar,

} from 'react-vant'
import{
    HomeO,
    Search,
    FriendsO,
    SettingO,
    UserO,
    AddO,
} from '@react-vant/icons'
import {
    Outlet,
    useNavigate,
    useLocation,
    
} from 'react-router-dom'
import { useEffect } from 'react'
//菜单栏配置项，更好维护
const tabs = [
    {
        title:'首页',
        icon:<HomeO/>,
        path:'/home',
    },
    {
        title:'书库',
        icon:<FriendsO/>,
        path:'/stacks',
    }, {
        title:'创造',
        icon:<AddO/>,
        path:'/coze',

    },
    {
        title:'书语',
        icon:<SettingO/>,
        path:'/ai',
    },
   
    {
        title:'我的账户',
        icon:<UserO/>,
        path:'/account',
    }
]
const MainLayout = () => {
    const [active,setActive] = useState(0)
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{
        console.log(location.pathname)
        //es6的使用power
        const index = tabs.findIndex(tab => location.pathname.startsWith(tab.path))
        setActive(index)
    },[])
  return (
    <div className='flex flex-col h-screen'
         style={{paddingBottom:'50px'}}
    >
        <div className='flex-1'>
            <Outlet />
        </div>
      {/* <Tabbar /> */}
      <Tabbar value={active} onChange={
        (key)=>{setActive(key)
            navigate(tabs[key].path)
        }
        
      } >
        {
            tabs.map((tab,index)=>(
                    <Tabbar.Item 
                        key={index}  
                        icon={tab.icon} 
                    >
                        {tab.title}
                    </Tabbar.Item>
            
                ))
        }
      </Tabbar>
    </div>
  )
}
export default MainLayout
