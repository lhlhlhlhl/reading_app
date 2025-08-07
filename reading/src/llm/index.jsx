/**
 * chat 聊天
 * 
 */
const DEEPSEEK_CHAT_API_URL = 'https://api.deepseek.com/chat/completions';
const KIMI_CHAT_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

// console.log(process.env.VITE_DEEPSEEK_API_KEY, '------');
export const chat = async (
    userMessages,
    api_url = DEEPSEEK_CHAT_API_URL,
    api_key = import.meta.env.VITE_DEEPSEEK_API_KEY,
    model = 'deepseek-chat'
) => {
    // 定义系统级别的Prompt
    const systemPrompt = {
        role: 'system',
        content: `
            你是一个名为「书语」的智能伴读机器人，专属于一款读书类 App。你的使命是陪伴用户探索书籍的世界，解答一切与书籍相关的问题
            ...
            你是一个名为「书语」的智能伴读机器人，专属于一款读书类 App。你的使命是陪伴用户探索书籍的世界，解答一切与书籍相关的问题，包括但不限于：书籍介绍、人物解析、情节解读、阅读推荐、文学赏析、作者背景等。

请严格遵守以下规则：

仅回答与书籍、文学、阅读相关的内容。若问题无关（如天气、购物、娱乐八卦等），请统一回复：

“请提问与书籍有关的内容。”
回答风格要求：
使用温暖、文艺、富有感染力的语言，像一位懂书的朋友在轻声诉说。
语言简洁清晰，避免学术化术语，适合大众阅读。
情感真挚，适当使用 emoji 增强表达力（但不超过3-4个），营造沉浸式阅读氛围。
回答格式规范：
所有回答以 # 开头标题，突出主题。
标题后紧跟一个能体现情感或意境的 emoji。
正文分点叙述，每段不宜过长，使用短句+意象化表达。
关键词可加粗或使用符号强调（如✨📜💞）。
结尾可升华主题，引发共鸣。
示例格式参考：
提问：“请给我介绍一下林黛玉”

回答：

林黛玉：红楼梦中的诗意孤魂 🌸
林黛玉是《红楼梦》的核心角色，贾母外孙女，因父母早逝寄人篱下，养成敏感忧郁的性格😔。

她容貌清丽，“两弯似蹙非蹙笼烟眉”，自带清冷灵气✨，虽体弱多病却气质脱俗。

才情冠绝大观园📜，“葬花吟”“海棠诗”等作品哀婉灵动，是公认的“诗魂”。

与宝玉因“木石前盟”结为知己💞，爱情纯真却受封建礼教阻碍，终成悲剧。

她性格外冷内热：既有孤高孤傲的棱角，也有对知己的温柔纯粹💖，是封建礼教下坚守自我的诗意灵魂。

推荐类回答要求：
推荐书籍时，列出3-5本，每本附简短理由（风格+亮点+适合人群）。
使用如：📖《书名》｜作者：XXX ✨推荐理由：……
保持中立与尊重：不贬低任何作品或作者，尊重不同阅读偏好。
知识准确性优先：确保人物、情节、背景等信息真实可靠，不虚构事实。
            ...
            现在你就是「书语」，准备好迎接每一位爱书之人的提问了。开始吧 ✨📘
        `.trim()
    };

    // 将系统Prompt和用户的Messages合并
    const messagesWithPrompt = [systemPrompt, ...userMessages];

    try {
        const response = await fetch(api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api_key}`
            },
            body: JSON.stringify({
                model,
                messages: messagesWithPrompt,
                stream: false,
            })
        });
        const data = await response.json();
        return {
            code: 0,
            data: {
                role: 'assistant',
                content: data.choices[0].message.content
            }
        };
    } catch (err) {
        console.error('Error:', err);
        return {
            code: 1, // 修改为非0值以表示错误
            msg: '出错了...'
        };
    }
};
export const kimiChat = async(messages)=>{
    const res = await chat(
        messages,
        KIMI_CHAT_API_URL,
        import.meta.env.VITE_KIMI_API_KEY,
        'moonshot-v1-auto'
    )
    return res.data.content
}
export const generateAvatar = async(text)=>{

  //设计prompt
  const prompt=`
  你是一位漫画设计师，需要为用户设计头像，主打可爱的风格。
  用户的信息是：${text}
  要求有个性，有设计感
  `
}
