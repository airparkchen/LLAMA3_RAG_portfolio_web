import React, { useState } from 'react';
import { Maximize2, Minimize2, Loader } from 'lucide-react';

// Lazy load components
const Resume = React.lazy(() => import('./components/Resume'));
const CalorieEstimator = React.lazy(() => import('./components/CalorieEstimator'));
const PaperDisplay = React.lazy(() => import('./components/PaperDisplay')); 


const App = () => {
  // 保留原有的狀態
  const [activeSection, setActiveSection] = useState('resume');
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', content: '您好！有什麼關於履歷的問題需要詢問的嗎？' },
    { type: 'bot', content: '請使用英文/簡單的中文詢問關於履歷的問題。例如: '},
    { type: 'bot', content: 'Who is the candidate?'},
    { type: 'bot', content: '他的學歷背景是?'},
    { type: 'bot', content: '他擅長使用什麼程式語言?'},
    { type: 'bot', content: '可以簡單介紹一下他的碩士論文嗎?'},
    { type: 'bot', content: '礙於硬體限制，部分問題回答等待時間會較長，還請見諒 !!'},
    
  ]);
  const [loading, setLoading] = useState(false);
  const [expandedItems, setExpandedItems] = useState(['projects']);

  const sidebarItems = [
    { id: 'resume', label: '關於我' },
    {
      id: 'projects',
      label: '實作作品集',
      children: [
        { 
          id: 'calories', 
          label: '熱量計算LLM' 
        },
        { 
          id: 'new-project', 
          label: '新專案名稱' 
        }
        // 添加更多項目
      ]
    },
    { id: 'paper', label: '畢業論文結果展示' }
  ];
  // 處理選單展開/收合
  const toggleExpand = (itemId) => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems(expandedItems.filter(id => id !== itemId));
    } else {
      setExpandedItems([...expandedItems, itemId]);
    }
  };
  

  // 更新處理訊息的函數以包含 API 調用
  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setChatMessages(prev => [...prev, { type: 'user', content: message }]);

    // try {
    //   const response = await fetch(`${BACKEND_URL}/api/ask`, {

    try {
      const response = await fetch('http://localhost:8000/api/ask', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: message.trim() }),
      });

      const data = await response.json();
      setChatMessages(prev => [...prev, { type: 'bot', content: data.answer }]);
    } catch (error) {
      console.error('Error:', error);
      setChatMessages(prev => [...prev, { 
        type: 'error', 
        content: '抱歉，處理您的請求時發生錯誤。' 
      }]);
    } finally {
      setLoading(false);
      setMessage('');
    }
  };
  // 渲染導航項目
  const renderNavItem = (item) => {
    if (item.children) {
      const isExpanded = expandedItems.includes(item.id);
      return (
        <div key={item.id}>
          <button
            onClick={() => toggleExpand(item.id)}
            className="w-full text-left px-4 py-2 hover:bg-gray-700 flex justify-between items-center"
          >
            <span>{item.label}</span>
            <span className="text-sm">{isExpanded ? '▼' : '➽'}</span>
          </button>
          {isExpanded && (
            <div className="pl-4">
              {item.children.map(child => (
                <button
                  key={child.id}
                  onClick={() => setActiveSection(child.id)}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-700 ${
                    activeSection === child.id ? 'bg-gray-700' : ''
                  }`}
                >
                  {child.label}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <button
        key={item.id}
        onClick={() => setActiveSection(item.id)}
        className={`w-full text-left px-4 py-2 hover:bg-gray-700 ${
          activeSection === item.id ? 'bg-gray-700' : ''
        }`}
      >
        {item.label}
      </button>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'calories':
        return (
          <React.Suspense fallback={<div>Loading...</div>}>
            <CalorieEstimator />
          </React.Suspense>
        );
      case 'paper':
        return (
          <React.Suspense fallback={<div>Loading...</div>}>
            <PaperDisplay />
          </React.Suspense>
        );
      case 'resume':
        return (
          <React.Suspense fallback={<div>Loading...</div>}>
            <Resume />
          </React.Suspense>
        );
      default:
        return <div>Content coming soon...</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-xl font-bold border-b border-gray-700">陳重瑜的履歷</div>
        <nav className="mt-4">
          {sidebarItems.map(item => renderNavItem(item))}
        </nav>
      </div>
      {/* <div className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-xl font-bold border-b border-gray-700">陳重瑜的履歷</div>
        <nav className="mt-4">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-700 ${
                activeSection === item.id ? 'bg-gray-700' : ''
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div> */}

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        {renderContent()}
      </div>

      {/* Enhanced Floating Chat Window */}
      <div className={`fixed bottom-0 right-0 w-96 bg-white rounded-t-lg shadow-xl ${
        isChatOpen ? 'h-[600px]' : 'h-12'
      } transition-all duration-300 ease-in-out`}>
        {/* Chat Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white rounded-t-lg">
          <span className="font-semibold">與我對話</span>
          <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="hover:text-gray-300"
          >
            {isChatOpen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>

        {isChatOpen && (
          <>
            {/* Chat Messages 對話框  */}
            <div className="h-[480px] overflow-y-auto p-4">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-4 ${
                    msg.type === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block p-2 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-blue-500 text-white'
                        : msg.type === 'error'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Chat Input */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="輸入訊息..."
                  disabled={loading}
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 flex items-center justify-center min-w-[4rem]"
                >
                  {loading ? (
                    <Loader className="h-5 w-5 animate-spin" />
                  ) : (
                    '發送'
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;