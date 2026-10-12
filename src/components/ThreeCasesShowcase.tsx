import React, { useState } from 'react';
import { Bell, CheckCircle2, XCircle } from 'lucide-react';

interface ThreeCasesShowcaseProps {
  onStartAuth?: () => void;
  onContactSupport?: () => void;
}

export const ThreeCasesShowcase: React.FC<ThreeCasesShowcaseProps> = ({
  onStartAuth,
  onContactSupport,
}) => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'case1' | 'case2' | 'case3'>('all');

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('400-880-9988');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen py-6 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          人脸识别认证模块 · 三种状态设计
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
          保持页面原有极简、清爽的排版风格，无冗余卡片干扰：
        </p>

        {/* Tab switcher */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {[
            { id: 'all' as const, label: '全部三种对比' },
            { id: 'case1' as const, label: '1. 认证成功（只改按钮）' },
            { id: 'case2' as const, label: '2. 审核中（电话+时间）' },
            { id: 'case3' as const, label: '3. 审核不通过（一行原因+客服）' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#1677ff] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div
        className={`max-w-5xl mx-auto grid gap-6 ${
          activeTab === 'all'
            ? 'grid-cols-1 md:grid-cols-3'
            : 'grid-cols-1 max-w-md'
        }`}
      >
        {/* CASE 1: 认证成功 */}
        {(activeTab === 'all' || activeTab === 'case1') && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <span className="font-semibold text-slate-800">
                1. 认证成功
              </span>
              <span className="text-[11px] text-emerald-600 font-medium">
                只改按钮
              </span>
            </div>

            {/* Inner Content - Clean & Native */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-[#e0433e] text-[15px] font-normal mb-3">
                  <Bell className="w-4 h-4 fill-[#e0433e] text-[#e0433e] shrink-0" />
                  <span>请在下方进行身份认证</span>
                </div>

                <h3 className="text-[17px] font-semibold text-[#222222] mb-2 flex items-center">
                  <span>人脸识别认证</span>
                  <span className="text-[#ff4d4f] ml-0.5">*</span>
                </h3>

                <p className="text-[14px] text-[#666666] leading-relaxed mb-6 font-normal">
                  根据CA 认证要求，申领证书需完成人脸实名验证。请您点击下方按键进行实名认证。
                </p>
              </div>

              {/* Button: 认证成功 */}
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={onStartAuth}
                  className="w-[190px] h-[42px] rounded-full border border-[#52c41a] bg-[#f6ffed] text-[#52c41a] text-[15px] font-normal flex items-center justify-center gap-1.5 hover:bg-[#d9f7be]/60 active:scale-95 transition cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#52c41a]" />
                  <span>认证成功</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CASE 2: 审核中 */}
        {(activeTab === 'all' || activeTab === 'case2') && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <span className="font-semibold text-slate-800">
                2. 审核中
              </span>
              <span className="text-[11px] text-blue-600 font-medium">
                展示状态 + 电话与服务时间
              </span>
            </div>

            {/* Inner Content - Clean & Native */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-[#e0433e] text-[15px] font-normal mb-3">
                  <Bell className="w-4 h-4 fill-[#e0433e] text-[#e0433e] shrink-0" />
                  <span>请在下方进行身份认证</span>
                </div>

                <h3 className="text-[17px] font-semibold text-[#222222] mb-2 flex items-center">
                  <span>人脸识别认证</span>
                  <span className="text-[#ff4d4f] ml-0.5">*</span>
                </h3>

                <p className="text-[14px] text-[#666666] leading-relaxed mb-6 font-normal">
                  根据CA 认证要求，申领证书需完成人脸实名验证。请您点击下方按键进行实名认证。
                </p>
              </div>

              {/* Button: 置灰药丸按钮 + 电话与服务时间各一行 */}
              <div className="flex flex-col items-center pt-2">
                <button
                  type="button"
                  disabled
                  className="w-[190px] h-[42px] rounded-full border border-[#d9d9d9] bg-[#f5f5f5] text-[#8c8c8c] text-[15px] font-normal flex items-center justify-center cursor-not-allowed select-none"
                >
                  审核中
                </button>

                {/* 电话一行 */}
                <div className="mt-3.5 flex items-center justify-center gap-1 text-[13px] text-[#555555]">
                  <span>CA服务电话：</span>
                  <a
                    href="tel:4008809988"
                    className="text-[#1677ff] font-medium hover:underline"
                  >
                    400-880-9988
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="text-[#1677ff] text-[12px] ml-1.5 hover:underline cursor-pointer"
                  >
                    {copiedPhone ? '已复制' : '复制'}
                  </button>
                </div>

                {/* 服务时间一行 */}
                <div className="mt-1 text-[13px] text-[#888888] text-center">
                  服务时间：周一至周日 8:30-20:00
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CASE 3: 审核不通过 */}
        {(activeTab === 'all' || activeTab === 'case3') && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <span className="font-semibold text-slate-800">
                3. 审核不通过
              </span>
              <span className="text-[11px] text-rose-600 font-medium">
                一行字原因 + 联系客服
              </span>
            </div>

            {/* Inner Content - Clean & Native */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-[#e0433e] text-[15px] font-normal mb-3">
                  <Bell className="w-4 h-4 fill-[#e0433e] text-[#e0433e] shrink-0" />
                  <span>请在下方进行身份认证</span>
                </div>

                <h3 className="text-[17px] font-semibold text-[#222222] mb-2 flex items-center">
                  <span>人脸识别认证</span>
                  <span className="text-[#ff4d4f] ml-0.5">*</span>
                </h3>

                <p className="text-[14px] text-[#666666] leading-relaxed mb-3 font-normal">
                  根据CA 认证要求，申领证书需完成人脸实名验证。请您点击下方按键进行实名认证。
                </p>

                {/* 大号文字突出告知审核不通过 */}
                <div className="flex items-center gap-1.5 text-[17px] font-semibold text-[#e0433e] mb-1.5">
                  <XCircle className="w-5 h-5 text-[#e0433e] shrink-0 stroke-[2.2]" />
                  <span>审核不通过</span>
                </div>

                {/* Only one clean line explaining the reason, no suggestions, no boxes */}
                <p className="text-[13px] text-[#666666] mb-5">
                  审核不通过原因：人脸比对相似度未达到认证要求
                </p>
              </div>

              {/* Action Buttons: 重新认证 + 联系客服 */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onStartAuth}
                  className="w-[140px] h-[42px] rounded-full border border-black bg-white text-black text-[15px] font-normal hover:bg-slate-50 active:scale-95 transition flex items-center justify-center cursor-pointer"
                >
                  重新认证
                </button>

                <button
                  type="button"
                  onClick={onContactSupport}
                  className="w-[140px] h-[42px] rounded-full border border-[#1677ff] bg-white text-[#1677ff] text-[15px] font-medium hover:bg-blue-50/70 active:scale-95 transition flex items-center justify-center cursor-pointer"
                >
                  联系客服
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
