import { ArrowLeft } from '@react-vant/icons'
import {
    useState
} from "react"
import {
    useNavigate, // Navigate 组件 js 跳转
    useLocation
} from 'react-router-dom'
import  useTitle  from '@/hooks/useTitle'
import styles from './login.module.css'
const Login = () => {
  useTitle('Reading-登录')
    const location = useLocation();//获取当前的路径
    // console.log(location.state.from);
    const navigate = useNavigate(); // navigate 能力

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(username, password);
        if (username === 'a' && password === '1') {
            localStorage.setItem('isLogin', 'true');
            navigate(location?.state?.from || '/');
        } else {
            alert('用户名或密码错误');
        }
    }
    return (
        <div className={styles.loginContainer}>
      <div className={styles.backButton} onClick={() => navigate('/')}>
        <ArrowLeft size={20} color="white" />
      </div>
            <div className={styles.loginWrapper}>
                <div className={styles.leftPanel}>
                    <img 
                        src="https://i.imgur.com/6bP4ZHZ.png" 
                        alt="用户头像" 
                        className={styles.avatar}
                    />
                    <div className={styles.username}>代号大学生</div>
                </div>
                <div className={styles.rightPanel}>
                    <h2 className={styles.loginTitle}>登录</h2>
                    <form onSubmit={handleSubmit} className={styles.loginForm}>
                        <div className={styles.inputGroup}>
                            <input 
                                type="text" 
                                placeholder="用户名" 
                                required
                                value={username} 
                                onChange={(event) => setUsername(event.target.value)}
                                className={styles.inputField}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <input 
                                type="password" 
                                placeholder="密码" 
                                required 
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
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
        </div>
    )
}

export default Login