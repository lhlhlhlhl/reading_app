import  useTitle  from '@/hooks/useTitle'
import{
    Search,
} from '@react-vant/icons'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  useTitle('Reading-首页')
  const navigate = useNavigate()
  return (
    <div>
      <Search onClick={()=>{
        navigate('/search')
      }}/>
      <h1>Home</h1>
    </div>
  )
}
export default Home
