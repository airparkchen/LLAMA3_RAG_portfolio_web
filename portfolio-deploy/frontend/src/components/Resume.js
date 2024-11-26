import React from 'react';

const Resume = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      {/* 個人資訊區域 */}
      <div className="p-8 border-b">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1">
          <img 
            src="/images/profile.jpg"
            alt="Profile" 
            className="w-[200px] h-[200px] object-cover rounded-lg shadow-md"  // 固定 200x200
            />
          </div>
          <div className="col-span-2">
            <h1 className="text-3xl font-bold mb-2">陳重瑜 Chen Chung-Yu</h1>
            <p className="text-gray-600 mb-4">AI Research & Development Engineer</p>
            <div className="space-y-2">
              <p className="flex items-center text-gray-600">
                <span className="font-semibold mr-2">Email:</span>
                airparkchen@gmail.com
              </p>
              <p className="flex items-center text-gray-600">
                <span className="font-semibold mr-2">Location:</span>
                台北市內湖區(Neihu District, Taipei City)
              </p>
              <p className="flex items-center text-gray-600">
                <span className="font-semibold mr-2">Language:</span>
                English (TOEIC: 830)、中文
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 教育背景 */}
      <div className="p-8 border-b">
        <h2 className="text-2xl font-bold mb-6">Education</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-semibold">
                電機工程學系研究所 Master's in Electrical Engineering (智慧生活科技實驗室 SLTLab)
              </h3>
              <p className="text-gray-600">國立臺灣海洋大學 National Taiwan Ocean University</p>
            </div>
            <span className="text-gray-500">2022/9 - 2024/9</span>
          </div>
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-semibold">
              電機工程學系 Bachelor's in Electrical Engineering
              </h3>
              <p className="text-gray-600">國立臺灣海洋大學 National Taiwan Ocean University</p>
            </div>
            <span className="text-gray-500">2017/9 - 2022/9</span>
          </div>
        </div>
      </div>

      {/* 工作經驗 */}
      <div className="p-8 border-b">
        <h2 className="text-2xl font-bold mb-6">Work Experience</h2>
        <div className="space-y-6">
          <div>
          <div>
            <div className="flex justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold">國立臺灣海洋大學 National Taiwan Ocean University</h3>
                <p className="text-gray-600">研究生 Teaching Assistant</p>
              </div>
              <span className="text-gray-500">2020/10 - 2024/6</span>
            </div>
            <ul className="list-disc list-inside text-gray-600">
                <li>協助研究室專案與研究事務：</li>
                <li>協助研究所計畫研究（AI、機器學習、影像處理）</li>
                <li>指導輔助學弟妹進行科學、程式研究（課程協助、研究指導）</li>
                <li>擔任課程助教</li>
                <li>Linux 伺服器、NAS 維護與使用</li>
            </ul>
            <ul>
                <li className="h-4"></li>  {/* 空白行 */}
            </ul>
          </div>

            <div className="flex justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold">昶裕國際股份有限公司 Chang Yu International Co., Ltd.</h3>
                <p className="text-gray-600">量化交易系統維運及優化 Quantitative Trading System Maintenance</p>
              </div>
              <span className="text-gray-500">2021/11 - 2022/1</span>
            </div>
            <ul className="list-disc list-inside text-gray-600">
                <li>參與量化交易專案，負責協助金融演算法工程師於虛擬貨幣平台之操作</li>
                <li>工作內容:</li>
                <li>維護及管理量化交易系統</li>
                <li>精簡程式碼以提升運作效率</li>
                <li>設計並維護監控系統（網頁及 Telegram）</li>
            </ul>

          </div>
        </div>
      </div>

      {/* 技能 */}
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Skills</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Programming Languages & Tools</h3>
            <div className="flex flex-wrap gap-2">
              {['Python', 'C/C++', 'Linux', 'Git', 'Github', 'Docker'].map((skill) => (
                <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">AI & Machine Learning</h3>
            <div className="flex flex-wrap gap-2">
              {[
                'Deep Learning',
                'Computer Vision',
                'PyTorch',
                'TensorFlow',
                'NLP',
                'LLM',
                'Vision Transformer'
              ].map((skill) => (
                <span key={skill} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;