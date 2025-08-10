import React, { useState, useEffect } from 'react';
import styles from './settingsPanel.module.css';
import { useNavigate } from 'react-router-dom';

const SettingsPanel = ({ isVisible, onClose, position }) => {
  const navigate = useNavigate();
  const [panelStyle, setPanelStyle] = useState({});

  useEffect(() => {
    if (position) {
      setPanelStyle({
        left: `${position.x}px`,
        top: `${position.y}px`,
      });
    }
  }, [position]);

  const handleLogout = () => {
    // 清除登录状态
    localStorage.removeItem('isLogin');
    // 重定向到登录页
    navigate('/login');
    // 关闭面板
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className={styles['settings-panel-overlay']} onClick={onClose}>
      <div 
        className={styles['settings-panel']} 
        style={panelStyle} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles['panel-header']}>
          <h3 className={styles['panel-title']}>设置</h3>
        </div>
        <div className={styles['panel-content']}>
          <div className={styles['setting-item']}>个人资料</div>
          <div className={styles['setting-item']}>阅读设置</div>
          <div className={styles['setting-item']}>通知设置</div>
          <div className={styles['setting-item']}>关于我们</div>
          <div className={styles['setting-item']}>帮助中心</div>
          <div className={styles['setting-item logout']} onClick={handleLogout}>
            退出登录
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;