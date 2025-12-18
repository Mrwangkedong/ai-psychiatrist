
import React, { useState } from 'react';
import { AgeGroup } from './types';
import AgeSelector from './components/AgeSelector';
import ChatWindow from './components/ChatWindow';
import AssessmentSection from './components/AssessmentSection';

const App: React.FC = () => {
  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null);
  const [activeTab, setActiveTab] = useState<'consult' | 'assess' | 'resource'>('consult');

  const renderContent = () => {
    if (!ageGroup) {
      return (
        <div className="py-12 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 mb-4 animate-fade-in">
              AI赋能·全龄守护
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              智能心理咨询辅导软件研发与实践，为全年龄层提供专业、普惠、便捷的心理守护
            </p>
          </div>
          
          <div className="bg-white/40 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-white/50">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-2">
              <i className="fas fa-users text-indigo-500"></i> 请选择您所在的年龄群体
            </h2>
            <AgeSelector onSelect={setAgeGroup} />
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 text-xl">
                <i className="fas fa-shield-halved"></i>
              </div>
              <h3 className="font-bold text-lg mb-2">隐私保护</h3>
              <p className="text-sm text-gray-500">符合《个人信息保护法》，数据全程加密存储，匿名沟通。</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4 text-xl">
                <i className="fas fa-stethoscope"></i>
              </div>
              <h3 className="font-bold text-lg mb-2">专业量表</h3>
              <p className="text-sm text-gray-500">集成SCL-90、CBCL、GDS等国内外权威心理学诊断工具。</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-4 text-xl">
                <i className="fas fa-bell"></i>
              </div>
              <h3 className="font-bold text-lg mb-2">危机预警</h3>
              <p className="text-sm text-gray-500">AI情感识别，针对高危情绪自动触发干预并推送紧急联系方式。</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Nav */}
          <div className="md:w-64 space-y-2">
            <button 
              onClick={() => setActiveTab('consult')}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl transition-all ${activeTab === 'consult' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <i className="fas fa-comments"></i> 智能对话辅导
            </button>
            <button 
              onClick={() => setActiveTab('assess')}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl transition-all ${activeTab === 'assess' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <i className="fas fa-tasks"></i> 心理测评中心
            </button>
            <button 
              onClick={() => setActiveTab('resource')}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl transition-all ${activeTab === 'resource' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <i className="fas fa-book-open"></i> 资源与科普
            </button>
            <div className="pt-8 mt-8 border-t border-gray-200">
               <button 
                onClick={() => setAgeGroup(null)}
                className="w-full flex items-center gap-3 px-6 py-4 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all"
              >
                <i className="fas fa-exchange-alt"></i> 切换年龄群体
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {activeTab === 'consult' && <ChatWindow ageGroup={ageGroup} onReset={() => setAgeGroup(null)} />}
            {activeTab === 'assess' && <AssessmentSection ageGroup={ageGroup} />}
            {activeTab === 'resource' && (
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <h2 className="text-2xl font-bold mb-6">科普与资源衔接</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="group relative overflow-hidden rounded-xl bg-slate-100 aspect-video cursor-pointer">
                      <img src={`https://picsum.photos/seed/${ageGroup}${i}/400/225`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                        <span className="text-white font-bold text-sm">热门科普：心理健康的一百个小常识</span>
                        <span className="text-white/60 text-xs mt-1">发布时间：2023-10-15</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setAgeGroup(null)}>
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <i className="fas fa-heartbeat"></i>
              </div>
              <span className="text-xl font-black text-indigo-900 tracking-tight">AI全龄守护</span>
            </div>
            <div className="flex items-center gap-4">
               <div className="hidden md:flex text-sm text-gray-500 italic">
                “遇见更好的自己，从这一刻开始”
               </div>
               <div className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold border border-red-200">
                紧急求助：400-161-9995
               </div>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-6 text-gray-400">
            <a href="#" className="hover:text-indigo-600"><i className="fab fa-weixin text-xl"></i></a>
            <a href="#" className="hover:text-indigo-600"><i className="fab fa-weibo text-xl"></i></a>
            <a href="#" className="hover:text-indigo-600"><i className="fas fa-envelope text-xl"></i></a>
          </div>
          <p className="text-gray-400 text-sm">© 2024 AI赋能·全龄守护 项目组 - 研发与实践成果</p>
          <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-400">
            <span>指导老师：张英楠</span>
            <span>团队成员：刘冰倩、段沫含</span>
            <span>隐私政策</span>
            <span>使用协议</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
