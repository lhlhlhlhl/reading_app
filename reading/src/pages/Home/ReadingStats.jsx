import { useState } from 'react';
import styles from './home.module.css';

const ReadingStats = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedDay, setSelectedDay] = useState('today');

  // 阅读统计数据
  const weekDays = ['一', '二', '三', '四', '五', '六', '日'];
  // 不同天数的阅读时长数据
  const readingData = {
    today: [0, 0, 30, 0, 0, 0, 0],
    week: [15, 45, 30, 60, 20, 90, 40],
    month: [20, 50, 35, 65, 25, 95, 45],
  };

  // 切换阅读统计卡片展开/收起状态
  const toggleReadingStats = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`${styles.readingStats} ${expanded ? styles.expanded : ''}`} onClick={toggleReadingStats}>
      <div className={styles.statsHeader}>
        <div className={styles.statsTitle}>阅读统计</div>
        <div className={styles.daySelector}>
          <button className={selectedDay === 'today' ? styles.selectedDay : ''} onClick={(e) => {
            e.stopPropagation();
            setSelectedDay('today');
          }}>今日</button>
          <button className={selectedDay === 'week' ? styles.selectedDay : ''} onClick={(e) => {
            e.stopPropagation();
            setSelectedDay('week');
          }}>本周</button>
          <button className={selectedDay === 'month' ? styles.selectedDay : ''} onClick={(e) => {
            e.stopPropagation();
            setSelectedDay('month');
          }}>本月</button>
        </div>
      </div>
      <div className={styles.statsContent}>
        <div>
          <span className={styles.readingTime}>{selectedDay === 'today' ? '30' : selectedDay === 'week' ? '300' : '1233'}</span>
          <span className={styles.timeText}>分钟</span>
        </div>
      </div>
      {expanded && (
        <div className={styles.statsChart}>
          <div className={styles.chartTitle}>{selectedDay === 'today' ? '今日阅读时段分布' : selectedDay === 'week' ? '本周阅读时长分布' : '本月阅读时长分布'}</div>
          <div className={styles.chartContainer}>
            {weekDays.map((day, index) => (
              <div key={index} className={styles.chartBarWrapper}>
                <div className={styles.chartBar} style={{ height: `${readingData[selectedDay][index] * 2}px` }}></div>
                <div className={styles.chartDay}>{day}</div>
                <div className={styles.chartValue}>{readingData[selectedDay][index]}m</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingStats;