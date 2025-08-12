// 这是一个简单的Vercel Serverless Function示例
// 访问路径: /api/hello

export default function handler(req, res) {
  res.status(200).json({
    message: 'Hello from Vercel Serverless Function!',
    timestamp: new Date().toISOString()
  });
}