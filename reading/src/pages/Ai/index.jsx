import {
  useEffect,
  useState,
} from 'react'
import useTitle from '@/hooks/useTitle'
import{
  chat
} from '@/llm'
import styles from './ai.module.css'
import{
  Input,
  Button,
  Loading,
  Toast,
} from 'react-vant'
import {
  ChatO,
  UserO,
} from '@react-vant/icons'
const Trip = () => {
  useTitle('Reading-伴读AI')
  const [text,setText] = useState('')
  const [isSending,setIsSending] = useState(false)
  //数据驱动界面
  //静态界面
  const [messages,setMessages] = useState([
    {
      id:1,
      content:'hello~',
      role:'user'
    },
    {
      id:2,
      content:'hello,I am your assistant ,I can help you with your travel',
      role:'assistant'
    },
    
  ])
  const handleChat =async()=>{  
    if(text.trim() === '') {
    Toast.info({
      message:'内容不能为空'
    })
    return
  }
  setIsSending(true)
  setText('')

  setMessages((prev)=>{
    return [
    ...prev,
    {
      role:'user',
      content:text
    }
  ]
  })
  const newMessage = await chat([{
    role:'user',
    content:text
  }]);
  setMessages((prev)=>{
    return [
      ...prev,
      newMessage.data
    ]
  })
  setIsSending(false)
  }
  // useEffect(()=>{
  //   const fetchChat = async()=>{
  //     const res = await kimiChat([
  //       {
  //         role:'user',
  //         content:'赣州旅游推荐'
  //       }
  //     ])
  //     console.log(res)
  //   }
  //   fetchChat()
  // },[])
  
  return (
    <div className='flex flex-col h-all'>
      <div className={`flex-1 ${styles.chatArea}`}>
        {
          messages.map((msg,index)=>{
            // 格式化AI回复的消息
            const formatMessage = (content) => {
              if (msg.role !== 'assistant') return content;
               
              // 处理标题 (# 标记)
              content = content.replace(/^(#{1,6})\s+(.*?)(?=\n|$)/gm, (match, p1, p2) => {
                const level = p1.length; // 获取 # 的数量作为标题级别
                return `<h${level}>${p2}</h${level}>`;
              });
               
              // 处理列表项 (数字列表)
              content = content.replace(/(\d+\.)\s+(.*?)(?=\n|$)/g, '<li class="numbered-item">$1 $2</li>');
               
              // 处理项目符号列表 (- 标记)
              content = content.replace(/(-)\s+(.*?)(?=\n|$)/g, '<li class="bullet-item">$1 $2</li>');
               
              // 处理粗体 (** 标记)
              content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
               
              // 处理斜体 (* 标记)
              content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
               
              // 处理代码块 (``` 标记)
              content = content.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
               
              // 处理段落
              content = content.replace(/^(?!<h|<li|<pre|<strong|<em)(.*?)(?=\n|$)/g, '<p>$1</p>');
               
              return content;
            };
            
            return (
              <div 
              key={index}
              className={`
                flex items-start
                ${msg.role === 'user' ? styles.messageRight : styles.messageLeft}
              `}
              >
                {msg.role === 'assistant' ? <ChatO className={styles.messageIcon} /> : <UserO className={styles.messageIcon} />}
                <div 
                  className={styles.messageContent}
                  dangerouslySetInnerHTML={{
                    __html: formatMessage(msg.content)
                  }}
                />
              </div>
            )
          })
        }
      </div>
      <div className={`flex ${styles.inputArea}`}>
        <Input 
          value={text}
          onChange={(e)=>setText(e)}
          placeholder='请输入消息'
          className={`flex-1 ${styles.input}`}
        />
        <Button
          type='primary'
          onClick={handleChat}
          disabled={isSending}
        >
          发送
        </Button>
      </div>
       {isSending && (<div className='fixed-loading'>{/*离开文档流 */}
        <Loading type='ball'/>
      </div>)}

    </div>
  )
}
export default Trip
