
import React, { useState, useRef, useEffect } from 'react';
import { AgeGroup, ChatMessage } from '../types';
import { chatWithAI } from '../services/geminiService';

interface ChatWindowProps {
  ageGroup: AgeGroup;
  onReset: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ ageGroup, onReset }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: '你好，我是你的AI心理伙伴。今天有什么想和我聊聊的吗？无论是生活压力、情绪困扰，还是单纯想找人说说话，我都在这里听着。',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await chatWithAI(input, ageGroup, history);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: response,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const isEmergency = (text: string) => {
    const keywords = ['自杀', '死', '想不开', '自残', '绝望', '伤人'];
    return keywords.some(k => text.includes(k));
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <i className="fas fa-brain"></i>
          </div>
          <div>
            <h2 className="font-bold">心理辅导专家</h2>
            <p className="text-xs opacity-80">当前模式：{ageGroup === AgeGroup.YOUTH ? '青少年' : ageGroup === AgeGroup.YOUNG_ADULT ? '中青年' : ageGroup === AgeGroup.MIDDLE_AGED ? '中年' : '老年'}专护</p>
          </div>
        </div>
        <button onClick={onReset} className="text-white/80 hover:text-white transition-colors">
          <i className="fas fa-arrow-left mr-1"></i> 返回
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
              <span className={`text-[10px] mt-1 block opacity-50 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              {m.role === 'model' && isEmergency(m.text) && (
                <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-xs font-bold animate-pulse">
                  <i className="fas fa-exclamation-triangle mr-1"></i> 检测到高危情绪，请即刻联系：400-161-9995
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-400 rounded-2xl px-4 py-3 shadow-sm rounded-tl-none border border-gray-100">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="在这里输入您想聊的话题..."
            className="flex-1 bg-gray-100 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 transition-all"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
        <p className="text-[10px] text-center text-gray-400 mt-2">
          注意：AI助手不能替代临床医学诊断，紧急情况请务必拨打120或求助专业医师。
        </p>
      </div>
    </div>
  );
};

export default ChatWindow;
