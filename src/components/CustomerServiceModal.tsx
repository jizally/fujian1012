import React, { useState } from 'react';
import { X, Headphones, Phone, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

interface CustomerServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReverify?: () => void;
}

export const CustomerServiceModal: React.FC<CustomerServiceModalProps> = ({
  isOpen,
  onClose,
  onReverify,
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'cs' | 'user'; text: string; time: string }>>([
    {
      sender: 'cs',
      text: '您好！我是CA认证实名核验专属客服。检测到您的人脸识别审核未通过，请问有什么可以帮您？',
      time: '刚刚',
    },
  ]);
  const [inputVal, setInputVal] = useState('');

  if (!isOpen) return null;

  const handleSend = () => {
    if (!inputVal.trim()) return;
    const userMsg = inputVal.trim();
    setInputVal('');
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userMsg, time: '刚刚' },
    ]);

    // Simulated instant reply
    setTimeout(() => {
      let reply = '收到您的反馈。经系统复核，通常原因为活体采集时光线较暗或戴了眼镜产生反光。建议您摘下眼镜，在采光均匀处重新进行活体扫描即可顺利通过。';
      if (userMsg.includes('电话') || userMsg.includes('人工')) {
        reply = '已为您安排人工专席客服，您也可以随时拨打我们的直连热线：400-880-9988。';
      }
      setMessages((prev) => [
        ...prev,
        { sender: 'cs', text: reply, time: '刚刚' },
      ]);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/90">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-[#1677ff] flex items-center justify-center">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-800">
                CA认证人工在线客服
              </h3>
              <p className="text-[11px] text-emerald-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                客服在席 (服务时间 8:30 - 21:00)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Contact Bar */}
        <div className="bg-blue-50/70 border-b border-blue-100/60 px-4 py-2 flex items-center justify-between text-xs text-[#1677ff]">
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" />
            <span>客服直通专线：400-880-9988</span>
          </div>
          <a
            href="tel:4008809988"
            className="text-[11px] bg-[#1677ff] text-white px-2.5 py-0.5 rounded-full hover:bg-blue-600"
          >
            立即拨打
          </a>
        </div>

        {/* Chat message list */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 min-h-[220px] max-h-[360px] text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                m.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl ${
                  m.sender === 'user'
                    ? 'bg-[#1677ff] text-white rounded-tr-xs'
                    : 'bg-white text-slate-800 border border-slate-200/70 shadow-xs rounded-tl-xs'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">
                {m.time}
              </span>
            </div>
          ))}
        </div>

        {/* FAQ Quick suggestions */}
        <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <span className="text-slate-400 shrink-0">快捷提问：</span>
          <button
            type="button"
            onClick={() => {
              setInputVal('为什么提示我人脸与公安底册不符？');
            }}
            className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded-md shrink-0 cursor-pointer"
          >
            为什么不通过？
          </button>
          <button
            type="button"
            onClick={() => {
              setInputVal('如何提高实名核验通过率？');
            }}
            className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded-md shrink-0 cursor-pointer"
          >
            核验技巧
          </button>
          <button
            type="button"
            onClick={() => {
              setInputVal('请转人工客服');
            }}
            className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded-md shrink-0 cursor-pointer"
          >
            转人工
          </button>
        </div>

        {/* Input box */}
        <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="输入您的问题..."
            className="flex-1 bg-slate-100 border-none rounded-full px-4 py-2 text-xs outline-none focus:ring-1 focus:ring-[#1677ff]"
          />
          <button
            type="button"
            onClick={handleSend}
            className="w-8 h-8 rounded-full bg-[#1677ff] hover:bg-blue-600 text-white flex items-center justify-center shrink-0 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Reverify trigger button */}
        {onReverify && (
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              onClick={() => {
                onClose();
                onReverify();
              }}
              className="text-xs text-[#1677ff] font-medium hover:underline flex items-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>准备好了，前往重新认证</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
