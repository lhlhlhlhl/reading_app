import { memo } from 'react';


// 页面特定骨架屏组件
// Home页面骨架屏
export const HomeSkeleton = memo(() => {
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm">
      {/* 搜索栏骨架 */}
      <div className="flex items-center gap-3 mb-6 p-3 bg-gray-100 rounded-lg animate-pulse">
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <div className="flex-1 h-6 bg-gray-300 rounded"></div>
      </div>

      {/* 阅读统计骨架 */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg animate-pulse">
        <div className="h-6 w-1/4 bg-gray-300 rounded mb-4"></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="h-8 w-1/2 mx-auto bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-3/4 mx-auto bg-gray-300 rounded"></div>
          </div>
          <div className="text-center">
            <div className="h-8 w-1/2 mx-auto bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-3/4 mx-auto bg-gray-300 rounded"></div>
          </div>
          <div className="text-center">
            <div className="h-8 w-1/2 mx-auto bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-3/4 mx-auto bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      {/* 书架骨架 */}
      <div className="mb-6">
        <div className="h-6 w-1/3 bg-gray-100 rounded mb-4 animate-pulse"></div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-full aspect-[2/3] bg-gray-100 rounded-lg animate-pulse"></div>
              <div className="h-4 w-4/5 mt-2 bg-gray-100 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      {/* 轮播图骨架 */}
      <div className="mb-6">
        <div className="w-full h-40 bg-gray-100 rounded-lg animate-pulse"></div>
      </div>

      {/* 推荐书籍骨架 */}
      <div className="mb-6">
        <div className="h-6 w-1/3 bg-gray-100 rounded mb-4 animate-pulse"></div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex flex-col">
              <div className="w-full aspect-[2/3] bg-gray-100 rounded-lg animate-pulse"></div>
              <div className="h-4 w-4/5 mt-2 bg-gray-100 rounded animate-pulse"></div>
              <div className="h-3 w-3/5 mt-1 bg-gray-100 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
export const StacksSkeleton = memo(() => {
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm">
      {/* 搜索栏骨架 */}
      <div className="flex items-center gap-3 mb-6 p-3 bg-gray-100 rounded-lg animate-pulse">
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <div className="flex-1 h-6 bg-gray-300 rounded"></div>
      </div>

      {/* 分类导航骨架 */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex-shrink-0 px-4 py-2 bg-gray-100 rounded-full h-10 animate-pulse"></div>
        ))}
      </div>

      {/* 书籍列表骨架 */}
      <div className="mb-6">
        <div className="h-8 w-1/3 bg-gray-100 rounded mb-4 animate-pulse"></div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="aspect-[2/3] bg-gray-100 rounded-lg animate-pulse"></div>
              <div className="h-4 w-4/5 bg-gray-100 rounded animate-pulse"></div>
              <div className="h-3 w-3/5 bg-gray-100 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      {/* 加载更多按钮骨架 */}
      <div className="flex justify-center mt-6">
        <div className="px-6 py-2 bg-gray-100 rounded-full h-10 w-40 animate-pulse"></div>
      </div>
    </div>
  );
});
// Login页面骨架屏
export const LoginSkeleton = memo(() => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      {/* 返回按钮 */}
      <div className="absolute top-4 left-4 w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>

      <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* 左侧面板 */}
          <div className="md:w-1/3 bg-gray-100 p-6 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gray-300 mb-4 animate-pulse"></div>
            <div className="w-3/4 h-5 bg-gray-300 rounded animate-pulse"></div>
          </div>

          {/* 右侧面板 */}
          <div className="md:w-2/3 p-6">
            <div className="w-1/2 h-6 bg-gray-100 rounded mb-6 animate-pulse"></div>
            
            <div className="space-y-4">
              {/* 输入字段 */}
              <div className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>
              <div className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>

              {/* 选项 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-24 h-4 bg-gray-100 rounded animate-pulse"></div>
                </div>
                <div className="w-20 h-4 bg-gray-100 rounded animate-pulse"></div>
              </div>

              {/* 登录按钮 */}
              <div className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>

              {/* 注册链接 */}
              <div className="flex justify-center mt-4">
                <div className="w-32 h-4 bg-gray-100 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// Account页面骨架屏
export const AccountSkeleton = memo(() => {
  return (
    <div className="profile-container bg-gray-50 min-h-screen">
      {/* 顶部导航栏骨架 */}
      <div className="skeleton-header h-16 bg-gray-100 rounded-b-lg"></div>

      {/* 用户信息区骨架 */}
      <div style={{ margin: '8px' }}>
        <div className="skeleton-user-info p-4 bg-white rounded-xl mb-4">
          <div className="skeleton-avatar w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4"></div>
          <div className="flex flex-col items-center">
            <div className="skeleton-username w-32 h-5 bg-gray-200 rounded mb-2"></div>
            <div className="skeleton-badge w-16 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* 数据卡片区域骨架 */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="skeleton-data-card h-32 bg-gray-100 rounded-xl p-3"></div>
          ))}
        </div>
      </div>

      {/* 阅读统计区域骨架 */}
      <div style={{ margin: '0 16px 16px 16px' }}>
        <div className="skeleton-reading-stats h-48 bg-white rounded-xl p-4"></div>
      </div>

      {/* 功能卡片区域骨架 */}
      <div className="grid grid-cols-2 gap-3" style={{ margin: '0 16px 16px 16px' }}>
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="skeleton-feature-card h-36 bg-gray-100 rounded-xl p-3"></div>
        ))}
      </div>
    </div>
  );
});
export const CozeSkeleton = memo(()=>{
  return (
    <div className="coze-container bg-gray-50 min-h-screen p-4">
      {/* 标题区域骨架 */}
      <div className="skeleton-coze-title mb-4">
        <div className="flex items-center mb-2">
          <div className="w-6 h-6 bg-gray-200 rounded-full mr-2"></div>
        </div>
        <div className="w-64 h-4 bg-gray-200 rounded"></div>
      </div>

      {/* 输入区域骨架 */}
      <div className="skeleton-input-section bg-white rounded-lg p-4 mb-4 space-y-4">
        <div className="skeleton-input-group space-y-2">
          <div className="w-20 h-4 bg-gray-200 rounded"></div>
        </div>

        <div className="skeleton-input-group space-y-2">
          <div className="w-20 h-4 bg-gray-200 rounded"></div>
        </div>

        <div className="skeleton-input-group space-y-2">
          <div className="w-20 h-4 bg-gray-200 rounded"></div>
        </div>

        <div className="skeleton-style-section space-y-2">
          <div className="grid grid-cols-3 gap-2 mb-2">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-8 bg-gray-100 rounded-lg"></div>
            ))}
          </div>
          <div className="w-full h-10 bg-gray-100 rounded-lg"></div>
        </div>

        <div className="skeleton-generate-button w-full h-12 bg-gray-200 rounded-lg"></div>
      </div>

      {/* 状态和结果区域骨架 */}
      <div className="space-y-4">
        <div className="skeleton-image-container bg-white rounded-lg p-4">
          <div className="w-full h-64 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
          </div>
          <div className="skeleton-scene-description space-y-2">
            <div className="w-full h-6 bg-gray-100 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  )
})
// Ai页面骨架屏
export const AiSkeleton = memo(() => {
  return (
    <div className="ai-container bg-gray-50 min-h-screen p-4">
      {/* 标题区域骨架 */}
      <div className="skeleton-ai-title h-12 bg-gray-100 rounded-lg mb-4 flex items-center px-4">
        <div className="w-6 h-6 bg-gray-200 rounded-full mr-2"></div>
        <div className="w-32 h-5 bg-gray-200 rounded"></div>
      </div>

      {/* 提问示例区域骨架 */}
      <div className="skeleton-question-examples bg-white rounded-lg p-4 mb-4">
        <div className="w-24 h-4 bg-gray-200 rounded mb-3"></div>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map((item) => (
            <div key={item} className="skeleton-example-button h-10 bg-gray-100 rounded-lg px-3 flex items-center"></div>
          ))}
        </div>
      </div>

      {/* 聊天区域骨架 */}
      <div className="skeleton-chat-area flex-1 bg-white rounded-lg p-4 mb-4">
        {[1, 2].map((item) => (
          <div key={item} className={`flex items-start mb-4 ${item % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
            <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
            <div className="skeleton-message-content w-3/4 h-16 bg-gray-100 rounded-lg p-2"></div>
          </div>
        ))}
      </div>

      {/* 输入区域骨架 */}
      <div className="skeleton-input-area flex items-center bg-white rounded-lg p-3">
        <div className="skeleton-input flex-1 h-10 bg-gray-100 rounded-lg mr-2"></div>
        <div className="skeleton-send-button w-16 h-10 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
});

