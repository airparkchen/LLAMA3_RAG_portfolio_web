import React from 'react';

const PaperDisplay = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        強健互動手勢估測
        <span className="block text-xl text-gray-600 mt-2">
          Robust Interacting Hand Pose Estimation Based on Deep Learning
        </span>
      </h1>

      {/* 模型架構圖 */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">模型架構</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-center">
            <img 
                src="/images/paper1.jpg" 
                alt="Model Architecture" 
                className="w-[400] h-auto rounded-lg shadow-md"
            />
        </div>
          <p className="text-gray-600 mt-2 text-center">
            圖1: 提出的OurNet模型架構圖
          </p>
        </div>
      </div>

      {/* 數據增強方法 */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">數據增強方法</h2>
        <div className="space-y-4">
        <div className="flex justify-center">
          <img 
            src="/images/paper2.jpg" 
            alt="Data Augmentation" 
            className="w-400 h-auto rounded-lg shadow-md"
          />
          </div>
          <p className="text-gray-600 text-center">
            圖2: 關節點遮罩數據增強示意圖
          </p>
        </div>
      </div>

      {/* 實驗結果 */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">實驗結果</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img 
              src="/images/paper3.jpg" 
              alt="Experimental Results 1" 
              className="w-full h-[250px] rounded-lg shadow-md"
            />
            <p className="text-gray-600 mt-2 text-center">
              圖3: EANet vs OurNet 效果比較
            </p>
          </div>
          <div>
            <img 
              src="/images/paper4.jpg" 
              alt="Experimental Results 2" 
              className="w-full h-[250px] rounded-lg shadow-md"
            />
            <p className="text-gray-600 mt-2 text-center">
              圖4: 實際應用效果展示
            </p>
          </div>
        </div>
      </div>

      {/* 研究內容 */}
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">研究方法</h2>
          <p className="text-gray-700 leading-relaxed">
            本研究透過「模型演算法改良」以及通用的「數據增強方法」，
            嘗試解決雙手辨識中的未知遮擋的問題，並進一步的提升模型的準確度、訓練效率與強健性。
            演算法方面，本研究引入了Transformer為核心的演算法模組，
            增強模型再遮擋情況下的辨識能力，同時能夠加速模型收斂的速度。
            數據增強方法我們利用影像處裡進行特殊的關節點數據增強，
            透過生成不同遮擋範圍的圓型關節點遮罩，以此方法讓其他雙手辨識模型以及本研究新開發的 OurNet模型， 
            在遮擋資料集的效能測試中，能夠大幅降低誤差，回到應有的準確度水準。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">實驗結果</h2>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800">
                            
              我們使用了多種手部辨識模型進行測試和比較，以驗證數據增強方法的有效性。
              具體而言，我們選用了 InterNet、IntagHand 和 EANet 這三種模型來進行實驗。
            
              從實驗結果能看到 OurNet 在各測試集之平均 MPVPE 與 MPJPE 準確度都優於 EANet 的測試效果，
              再次應證 OurNet 的強健性模組改良能夠提升模型整體的強健性。
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PaperDisplay;