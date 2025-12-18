
import React, { useState } from 'react';
import { AgeGroup } from '../types';
import { ASSESSMENTS } from '../constants';

interface AssessmentSectionProps {
  ageGroup: AgeGroup;
}

const AssessmentSection: React.FC<AssessmentSectionProps> = ({ ageGroup }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [step, setStep] = useState<'list' | 'info' | 'doing'>('list');

  const availableAssessments = ASSESSMENTS.filter(a => a.ageGroup === ageGroup || a.id === 'scl90');

  if (step === 'list') {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <i className="fas fa-clipboard-list text-indigo-500"></i> 专业心理测评
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableAssessments.map(item => (
            <div key={item.id} className="p-4 border rounded-xl hover:border-indigo-400 transition-colors cursor-pointer group" onClick={() => { setSelectedId(item.id); setStep('info'); }}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                </div>
                <i className="fas fa-chevron-right text-gray-300 group-hover:text-indigo-500 transition-colors"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const current = ASSESSMENTS.find(a => a.id === selectedId);

  return (
    <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 max-w-2xl mx-auto">
      <button onClick={() => setStep('list')} className="text-sm text-gray-500 hover:text-indigo-600 mb-4">
        <i className="fas fa-arrow-left"></i> 返回列表
      </button>
      <h2 className="text-2xl font-bold mb-2">{current?.name}</h2>
      <p className="text-gray-600 mb-6">{current?.description}</p>
      
      <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 mb-8">
        <h4 className="font-bold text-indigo-800 mb-2">测试说明：</h4>
        <ul className="text-sm text-indigo-700 space-y-2">
          <li>• 请根据您过去一周的真实感受进行选择。</li>
          <li>• 选项没有对错之分，请务必真实回答。</li>
          <li>• 测试仅用于筛查参考，不作为最终医疗诊断。</li>
        </ul>
      </div>

      <button 
        className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-colors"
        onClick={() => alert('测评功能正在对接后台数据库，敬请期待 V2.0 版本落地。目前请优先尝试 AI 对话辅导功能。')}
      >
        开始测评
      </button>
    </div>
  );
};

export default AssessmentSection;
