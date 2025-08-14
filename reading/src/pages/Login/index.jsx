import { ArrowLeft } from '@react-vant/icons'
import {
    useState,
    useEffect,
    useRef,
} from "react"
import {
    useNavigate, // Navigate 组件 js 跳转
    useLocation
} from 'react-router-dom'
import {
    userStore
}from '@/store/userStore'

import  useTitle  from '@/hooks/useTitle'
import styles from './login.module.css'
import { LoginSkeleton } from '@/components/Skeleton'
const Login = () => {
  useTitle('Reading-登录')
    const location = useLocation();//获取当前的路径
    // console.log(location.state.from);
    const navigate = useNavigate(); // navigate 能力
    const usernameRef = useRef()
    const passwordRef = useRef()
    const {login} = userStore()
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);

    // 模拟加载完成
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }, []);
    const handleSubmit = (event) => {
        event.preventDefault();
       const username = usernameRef.current.value
        const password = passwordRef.current.value
        if(!username||!password){
            alert('请输入用户名或密码')
            return;
        }
        login({username,password})
         setTimeout(()=>{
            navigate('/')
        },1000)
    }
    return (
        <div className={styles.loginContainer}>
            {loading ? (
                <LoginSkeleton />
            ) : (
                <>        <div className={styles.backButton} onClick={() => navigate('/')}>
                    <ArrowLeft size={20} color="white" />
                </div>
                <div className={styles.loginWrapper}>
                    <div className={styles.leftPanel}>
                        <img 
                            src="https://bpic.588ku.com/back_list_pic/22/08/05/0909b08a5f45f19af2d15760518e5eef.jpg" 
                            alt="用户头像" 
                            className={styles.avatar}
                        />
                        <div className={styles.username}>Reading</div>
                    </div>
                    <div className={styles.rightPanel}>
                        <h2 className={styles.loginTitle}>登录</h2>
                        <form onSubmit={handleSubmit} className={styles.loginForm}>
                            <div className={styles.inputGroup}>
                                <input 
                                    type="text" 
                                    ref={usernameRef} 
                                    //required 
                                    placeholder='请输入用户名'
                                    //onChange={(event) => setUsername(event.target.value)}
                                    className={styles.inputField}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <input 
                                    type="password" 
                                    ref={passwordRef} 
                                    //required 
                                    placeholder='请输入密码'
                                    //value={password}
                                    //onChange={(event) => setPassword(event.target.value)}
                                    className={styles.inputField}
                                />
                            </div>
                            <div className={styles.options}>
                                <label className={styles.checkboxLabel}>
                                    <input type="checkbox" className={styles.checkbox} /> 记住密码
                                </label>
                                <a href="#" className={styles.forgotPassword}>忘记密码</a>
                            </div>
                            <button type="submit" className={styles.loginButton}>立即登录</button>
                            <div className={styles.registerLink}>
                                没有账号？<a href="/register">立即注册</a>
                            </div>
                        </form>
                    </div>
                </div>
                </>
            )}
        </div>
    )
}

export default Login