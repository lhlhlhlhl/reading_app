import { useState,useEffect} from 'react';
import styles from './account.module.css';
import { useNavigate } from 'react-router-dom';
import ReadingStats from '../Home/ReadingStats';
import SettingsPanel from '@/components/SettingsPanel';

const ReadingProfile = () => {
  const navigate = useNavigate();
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [settingsPosition, setSettingsPosition] = useState({ x: 0, y: 0 });

  const handleSettingsClick = (e) => {
    e.stopPropagation();
    const rect = e.target.getBoundingClientRect();
    setSettingsPosition({
      x: rect.right - 150, // 面板宽度为280px，使其出现在图标左侧
      y: rect.top + window.scrollY
    });
    setSettingsVisible(true);
  };

  // 点击页面其他区域关闭设置面板
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsVisible) {
        handleSettingsClose();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [settingsVisible]);

  const handleSettingsClose = () => {
    setSettingsVisible(false);
  };

  return (
    <div className={`${styles['profile-container']} bg-gray-50 min-h-screen`}>
      {/* 顶部导航栏 */}
      <div className={styles['header']}>
        <div className={styles['header-left']}>
          <span className={styles['header-icon']}>✉️</span>
        </div>
        <div className={styles['header-title']}>我的</div>
        <div className={styles['header-right']}>
          <span className={styles['header-icon']} onClick={handleSettingsClick}>⚙️</span>
        </div>
      </div>

      {/* 用户信息区 */}
      <div style={{margin: '8px'}}>
        <div className={styles['user-info']}>
          <img className="w-full md:w-1/2 lg:w-1/4 h-auto rounded-full"
            src="https://picx.zhimg.com/v2-d6f44389971daab7e688e5b37046e4e4_720w.jpg?source=172ae18b" 
            alt="User Avatar"
          />
        </div>
         <div className="flex flex-col justify-center items-center w-full margin-bottom-32">
            <div className="flex items-center justify-center text-center">
              <span className="text-xs font-bold text-gray-900 ">AD钙</span>
              <span className={styles['badge']}>勋章</span>
            </div>
          </div>

        {/* 数据卡片区域 */}
        <div className={styles['card-grid']}>
          <div className={styles['data-card']} style={{backgroundColor: '#fff7e6'}}>
            <div className="flex items-center mb-2">
              <span className="text-yellow-500 mr-2">⭐</span>
              <h3 className={styles['card-title']}>成为付费会员</h3>
            </div>
            <p className={styles['card-content']}>首月特惠</p>
            <p className={styles['card-amount']}>9元/月</p>
          </div>

          <div className={styles['data-card']} style={{backgroundColor: '#e6f7ff'}}>
            <div className="flex items-center mb-2">
              <span className="text-blue-500 mr-2">💰</span>
              <h3 className={styles['card-title']}>充值币</h3>
            </div>
            <p className={styles['card-content']}>余额</p>
            <p className={styles['card-amount']}>0.00</p>
          </div>

          <div className={styles['data-card']} style={{backgroundColor: '#fff0f6'}}>
            <div className="flex items-center mb-2">
              <span className="text-pink-500 mr-2">🎁</span>
              <h3 className={styles['card-title']}>福利</h3>
            </div>
            <p className={styles['card-content']}>0天 | 赠币</p>
            <p className={styles['card-amount']}>40.00</p>
          </div>

          <div className={styles['data-card']} style={{backgroundColor: '#e6ffed'}}>
            <div className="flex items-center mb-2">
              <span className="text-green-500 mr-2">🏆</span>
              <h3 className={styles['card-title']}>读书排行榜</h3>
            </div>
            <p className={styles['card-content']}>第1名</p>
            <p className={styles['card-amount']}>小于1分钟</p>
          </div>
        </div>
      </div>

      {/* 阅读时长卡片 */}
      {/* <div className={styles['card']} style={{margin: '0 16px 16px 16px'}}>
        <div className="flex items-center p-4">
          <span className="text-red-500 mr-3">⏱️</span>
          <div>
            <h3 className={styles['card-title']}>阅读时长</h3>
            <p className="text-sm text-gray-500">本月小于1分钟</p>
          </div>
          <div className="ml-auto">
            <p className={styles['card-amount']}>小于1分钟</p>
          </div>
        </div>
      </div> */}
      <div style={{margin: '0 16px 16px 16px'}}>
        <ReadingStats />
      </div>

      {/* 功能卡片区域 */}
      <div className={styles['card-grid']} style={{margin: '0 16px 16px 16px'}}>
        <div className={styles['data-card']} style={{backgroundColor: '#e6ffed'}}>
          <div className="flex flex-col items-center justify-center p-4">
            <span className="text-green-500 text-2xl mb-2">📚</span>
            <h3 className={styles['card-title']}>在读</h3>
            <p className={styles['card-content']}>暂无在读的书</p>
          </div>
        </div>

        <div className={styles['data-card']} style={{backgroundColor: '#e6f7ff'}}>
          <div className="flex flex-col items-center justify-center p-4">
            <span className="text-blue-500 text-2xl mb-2">✅</span>
            <h3 className={styles['card-title']}>读完</h3>
            <p className={styles['card-content']}>暂无读完的书</p>
          </div>
        </div>

        <div className={styles['data-card']} style={{backgroundColor: '#fff0f6'}}>
          <div className="flex flex-col items-center justify-center p-4">
            <span className="text-pink-500 text-2xl mb-2">📝</span>
            <h3 className={styles['card-title']}>笔记</h3>
            <p className={styles['card-content']}>尚未留下笔记</p>
          </div>
        </div>

        <div className={styles['data-card']} style={{backgroundColor: '#f5f5f5'}}>
          <div className="flex flex-col items-center justify-center p-4">
            <span className="text-gray-500 text-2xl mb-2">🔔</span>
            <h3 className={styles['card-title']}>订阅</h3>
            <p className={styles['card-content']}>尚未上架</p>
          </div>
        </div>
      </div>
      <SettingsPanel className={styles['settings-panel']}

      isVisible={settingsVisible}
      onClose={handleSettingsClose}
      position={settingsPosition}
    />
    </div>
    
  );
};

export default ReadingProfile;