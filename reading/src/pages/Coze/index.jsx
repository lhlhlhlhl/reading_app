// src/components/LiteraryCharacterGenerator.jsx
import { useState, useEffect } from 'react';
import styles from './coze.module.css';
import useTitle from '@/hooks/useTitle';

const Coze = () => {
  useTitle('Reading——创造')
  const workflowUrl = 'https://api.coze.cn/v1/workflow/run';
  const workflow_id = '7534590579121143860'; // 替换为您的实际工作流ID
  const patToken = import.meta.env.VITE_PAT_TOKEN;

  // 状态管理
  const [bookTitle, setBookTitle] = useState('');
  const [character, setCharacter] = useState('');
  const [scene, setScene] = useState('');
  const [style, setStyle] = useState('写实');
  const [imgUrl, setImgUrl] = useState('');
  const [status, setStatus] = useState('');
  const [customStyle, setCustomStyle] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('写实');
  const [enhancedScene, setEnhancedScene] = useState('');
  
  // 经典书籍和默认场景
  const classicBooks = {
    '红楼梦': {
      characters: ['林黛玉', '贾宝玉', '薛宝钗'],
      scenes: ['葬花', '大观园诗会', '宝黛共读西厢']
    },
    '西游记': {
      characters: ['孙悟空', '唐僧', '猪八戒'],
      scenes: ['大闹天宫', '三打白骨精', '火焰山借扇']
    },
    '三国演义': {
      characters: ['诸葛亮', '关羽', '曹操'],
      scenes: ['桃园三结义', '三顾茅庐', '赤壁之战']
    },
    '水浒传': {
      characters: ['宋江', '武松', '林冲'],
      scenes: ['武松打虎', '倒拔垂杨柳', '风雪山神庙']
    },
    '哈利波特': {
      characters: ['哈利·波特', '赫敏·格兰杰', '罗恩·韦斯莱'],
      scenes: ['九又四分之三站台', '魁地奇比赛', '霍格沃茨大战']
    },
    '简爱': {
      characters: ['简·爱', '罗切斯特', '伯莎·梅森'],
      scenes: ['桑菲尔德庄园', '火灾救罗切斯特', '婚礼中断']
    },
    '傲慢与偏见': {
      characters: ['伊丽莎白·班纳特', '达西先生', '简·班纳特'],
      scenes: ['尼日斐花园舞会', '雨中求婚', '彭伯里庄园重逢']
    }
  };

  // 当书名变化时，更新人物和场景建议
  useEffect(() => {
    if (bookTitle && classicBooks[bookTitle]) {
      setCharacter(classicBooks[bookTitle].characters[0] || '');
      setScene(classicBooks[bookTitle].scenes[0] || '');
    }
  }, [bookTitle]);

  // 处理风格选择
  const handleStyleSelect = (style) => {
    setSelectedStyle(style);
    if (style === 'custom') {
      setTimeout(() => document.getElementById('customStyleInput')?.focus(), 0);
    }
  };

  // 当自定义风格变化时更新实际使用的风格
  useEffect(() => {
    if (selectedStyle === 'custom' && customStyle) {
      setStyle(customStyle);
    } else if (selectedStyle !== 'custom') {
      setStyle(selectedStyle);
    }
  }, [selectedStyle, customStyle]);

  // 生成图像
  const generateImage = async () => {
    if (!bookTitle || !character) {
      setStatus('请填写书名和人物');
      return;
    }

    setStatus('正在分析人物特征并生成图像...');
    setImgUrl('');
    setEnhancedScene('');

    const parameters = {
      book_title: bookTitle,
      character: character,
      scene: scene, // 场景可选
      style: style,
    };

    try {
      const response = await fetch(workflowUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${patToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workflow_id,
          parameters,
          additional_headers: {
            'Accept': 'application/json',
          },
        }),
      });

      const result = await response.json();

      if (result.code !== 0) {
        setStatus(`错误：${result.msg}`);
        return;
      }

      // 解析工作流返回数据
      let workflowData;
      try {
        workflowData = typeof result.data === 'string' ? 
                        JSON.parse(result.data) : result.data;
      } catch (e) {
        setStatus('解析工作流返回数据失败');
        console.error(e);
        return;
      }

      // 提取图像URL和增强场景描述
      const imageUrl = workflowData.data?.image_url || 
                      workflowData.image_url || 
                      workflowData.image;
                      
      const sceneDescription = workflowData.data?.enhanced_scene || 
                              workflowData.enhanced_scene || 
                              workflowData.scene_description;
      console.log(sceneDescription)

      if (imageUrl) {
        setImgUrl(imageUrl);
        setEnhancedScene(sceneDescription || '');
        setStatus('生成成功！');
      } else {
        setStatus('未收到图像链接');
      }

    } catch (error) {
      setStatus('请求失败，请检查网络或token');
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>文学人物图像生成</h1>

        <p>输入书名和人物，生成符合原著描述的图像场景</p>
      </div>
      
      <div className={styles.inputSection}>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>书名</label>
          <input
            type="text"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            placeholder="输入书名，如：红楼梦"
            list="bookSuggestions"
          />
          <datalist id="bookSuggestions">
            {Object.keys(classicBooks).map(book => (
              <option key={book} value={book} />
            ))}
          </datalist>
        </div>
        
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>人物</label>
          <input
            type="text"
            value={character}
            onChange={(e) => setCharacter(e.target.value)}
            placeholder="输入人物名称"
            list="characterSuggestions"
          />
          <datalist id="characterSuggestions">
            {bookTitle && classicBooks[bookTitle]?.characters.map(char => (
              <option key={char} value={char} />
            ))}
          </datalist>
        </div>
        
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>
            场景 <span className={styles.optional}>(可选)</span>
          </label>
          <input
            type="text"
            value={scene}
            onChange={(e) => setScene(e.target.value)}
            placeholder="输入场景描述，如：葬花"
            list="sceneSuggestions"
          />
          <datalist id="sceneSuggestions">
            {bookTitle && classicBooks[bookTitle]?.scenes.map(scene => (
              <option key={scene} value={scene} />
            ))}
          </datalist>
        </div>
        
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>艺术风格</label>
          <div className={styles.styleSelector}>
            <div className={styles.styleOptions}>
              {['写实', '水墨', '工笔画', '奇幻', '动漫', '油画', '自定义'].map((option) => (
                <button
                  key={option}
                  className={`${styles.styleOption} ${selectedStyle === option ? styles.active : ''}`}
                  onClick={() => handleStyleSelect(option)}
                >
                  {option === 'custom' ? '自定义' : option}
                </button>
              ))}
            </div>
            
            {selectedStyle === '自定义' && (
              <div className={styles.customStyleInput}>
                <input
                  id="customStyleInput"
                  type="text"
                  value={customStyle}
                  onChange={(e) => setCustomStyle(e.target.value)}
                  placeholder="输入自定义风格，如：赛博朋克"
                />
              </div>
            )}
          </div>
        </div>
        
        <div className={styles.generateButton}>
          <button 
            onClick={generateImage} 
            disabled={status.includes('...')}
          >
            {status.includes('...') ? '生成中...' : '生成图像'}
          </button>
        </div>
        
        {status && <div className={styles.status}>{status}</div>}
      </div>
      
      <div className={styles.outputSection}>
        {imgUrl ? (
          <>
            <div className={styles.imageContainer}>
              <img 
                src={imgUrl} 
                alt={`${bookTitle}中的${character}`} 
                className={styles.generatedImage}
              />
            </div>
            
            {enhancedScene && (
              <div className={styles.sceneDescription}>
                <p>场景描述</p>
                <p>{enhancedScene}</p>
              </div>
            )}
          </>
        ) : (
          <div className={styles.placeholder}>
            <div className={styles.placeholderIcon}>📚</div>
            <p>输入书名和人物开始生成</p>
            <div className={styles.example}>
              <p>示例：</p>
              <ul>
                <li>《红楼梦》 - 林黛玉 - 葬花</li>
                <li>《哈利波特》 - 哈利·波特 - 九又四分之三站台</li>
                <li>《傲慢与偏见》 - 伊丽莎白 - 雨中求婚</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coze;