import React, { useRef, useState } from 'react';
import { Download, HelpCircle, X, CheckCircle2, FileText, Send, PhoneCall } from 'lucide-react';
import { CameraPlusIcon } from './CameraPlusIcon.tsx';
import type { AuthMethod } from '../types.ts';

interface AuthorizationLetterSectionProps {
  onOpenTemplate: () => void;
  onOpenInstructions: () => void;
  onPreviewImage?: (url: string) => void;
}

export const AuthorizationLetterSection: React.FC<AuthorizationLetterSectionProps> = ({
  onOpenTemplate,
  onOpenInstructions,
  onPreviewImage,
}) => {
  const [activeTab, setActiveTab] = useState<AuthMethod>('self');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [adminPhone, setAdminPhone] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminSent, setAdminSent] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
    }
  };

  const handleUseSampleAuth = () => {
    // Generate a high fidelity SVG/Canvas data URL for sample Corporate Authorization Letter
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800" style="background:#fff; font-family:sans-serif;">
        <rect width="100%" height="100%" fill="#ffffff" />
        <rect x="20" y="20" width="560" height="760" fill="none" stroke="#e2e8f0" stroke-width="2" />
        <text x="300" y="90" font-size="24" font-weight="bold" text-anchor="middle" fill="#1e293b">企业授权委托书</text>
        <line x1="80" y1="110" x2="520" y2="110" stroke="#cbd5e1" stroke-width="1" />
        
        <text x="60" y="160" font-size="14" fill="#334155" font-weight="bold">本授权委托书声明：</text>
        <text x="60" y="195" font-size="13" fill="#475569">委托单位：北京妙妙轩商务服务有限公司</text>
        <text x="60" y="225" font-size="13" fill="#475569">统一社会信用代码：91110108MA01EBFH9B</text>
        <text x="60" y="255" font-size="13" fill="#475569">法定代表人：孙刚</text>
        
        <text x="60" y="300" font-size="13" fill="#475569">兹授权本公司经办人 孙刚（身份证号：110108198808291234）</text>
        <text x="60" y="325" font-size="13" fill="#475569">代表本单位全权办理电子认证服务（CA数字证书）申领、</text>
        <text x="60" y="350" font-size="13" fill="#475569">绑定、变更等相关业务。被授权人在办理上述业务过程中</text>
        <text x="60" y="375" font-size="13" fill="#475569">所签署的一切文件，本单位均予以承认并承担法律责任。</text>
        
        <text x="60" y="440" font-size="13" fill="#475569">授权有效期限：2026年01月01日 至 2027年12月31日</text>
        
        <text x="380" y="550" font-size="13" fill="#334155">法定代表人（签字）：孙刚</text>
        <text x="380" y="580" font-size="13" fill="#334155">委托单位（公章）：</text>
        <text x="380" y="660" font-size="13" fill="#64748b">日期：2026年09月29日</text>

        <!-- Red circular official seal -->
        <g transform="translate(420, 560)">
          <circle cx="50" cy="50" r="46" fill="none" stroke="#dc2626" stroke-width="3" opacity="0.85" />
          <path d="M50 36 L53.5 45 L63 45 L55 51 L58 60 L50 54 L42 60 L45 51 L37 45 L46.5 45 Z" fill="#dc2626" opacity="0.85" />
          <text x="50" y="24" font-size="9" fill="#dc2626" text-anchor="middle" font-weight="bold" opacity="0.85">北京妙妙轩商务服务有限公司</text>
          <text x="50" y="80" font-size="8" fill="#dc2626" text-anchor="middle" font-weight="bold" opacity="0.85">★ 业务专用章 ★</text>
        </g>
      </svg>
    `;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    setUploadedImage(url);
  };

  return (
    <section className="px-4 pt-4">
      {/* Section Title */}
      <h2 className="text-[17px] font-semibold text-[#222222] mb-2 flex items-center">
        <span>企业授权书</span>
        <span className="text-[#ff4d4f] ml-0.5">*</span>
      </h2>

      {/* Card wrapper */}
      <div className="rounded-xl overflow-hidden shadow-xs border border-[#e5ecf6]">
        {/* Tabs Header */}
        <div className="flex h-11 bg-[#edf1f7] text-[15px] font-medium select-none">
          {/* Left Tab: 自行上传 */}
          <button
            type="button"
            onClick={() => setActiveTab('self')}
            className={`flex-1 flex items-center justify-center transition-colors relative cursor-pointer ${
              activeTab === 'self'
                ? 'bg-white text-[#1677ff] font-semibold rounded-tl-xl'
                : 'bg-[#edf1f7] text-[#556987] hover:text-[#1677ff]'
            }`}
          >
            自行上传
            {/* Top decorative blue line for active tab */}
            {activeTab === 'self' && (
              <span className="absolute top-0 inset-x-0 h-[2.5px] bg-[#1677ff]" />
            )}
          </button>

          {/* Right Tab: 管理员授权 */}
          <button
            type="button"
            onClick={() => setActiveTab('admin')}
            className={`flex-1 flex items-center justify-center transition-colors relative cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-white text-[#1677ff] font-semibold rounded-tr-xl'
                : 'bg-[#edf1f7] text-[#556987] hover:text-[#1677ff]'
            }`}
          >
            管理员授权
            {activeTab === 'admin' && (
              <span className="absolute top-0 inset-x-0 h-[2.5px] bg-[#1677ff]" />
            )}
          </button>
        </div>

        {/* Tab Body: Light ice-blue background */}
        <div className="bg-[#f4f8fd] p-4">
          {activeTab === 'self' ? (
            <>
              {/* Buttons row: 下载模板 & 操作说明 */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  type="button"
                  onClick={onOpenTemplate}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-white border border-[#1677ff] text-[#1677ff] text-[14px] font-medium hover:bg-blue-50/60 active:scale-[0.98] transition cursor-pointer"
                >
                  <Download className="w-4 h-4 stroke-[2]" />
                  <span>下载模板</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenInstructions}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-white border border-[#1677ff] text-[#1677ff] text-[14px] font-medium hover:bg-blue-50/60 active:scale-[0.98] transition cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 stroke-[2]" />
                  <span>操作说明</span>
                </button>
              </div>

              {/* Upload area or Preview */}
              {!uploadedImage ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white rounded-lg p-7 border border-[#e5ecf6] flex flex-col items-center justify-center cursor-pointer hover:border-[#1677ff]/40 transition group"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  {/* Camera icon with plus */}
                  <div className="mb-3 transition-transform group-hover:scale-105">
                    <CameraPlusIcon className="w-12 h-10" />
                  </div>

                  {/* Main text */}
                  <p className="text-[14px] text-[#4a5568] font-normal mb-1">
                    点击上传/识别
                  </p>

                  {/* Sub hint text */}
                  <p className="text-[12px] text-[#8c9ba5] text-center">
                    请保证图片真实、清晰、非对屏幕拍摄
                  </p>

                  {/* Quick sample loader for testing */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUseSampleAuth();
                    }}
                    className="mt-3 text-[12px] text-[#1677ff] hover:underline flex items-center gap-1 cursor-pointer bg-blue-50/80 px-2.5 py-1 rounded-full"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>填入标准授权书示例</span>
                  </button>
                </div>
              ) : (
                /* Uploaded Preview state */
                <div className="relative bg-white rounded-lg p-3 border border-[#d6e4ff]">
                  <div className="relative rounded overflow-hidden max-h-56 bg-slate-50 flex items-center justify-center">
                    <img
                      src={uploadedImage}
                      alt="已上传的企业授权书"
                      className="max-h-56 w-auto object-contain cursor-pointer"
                      onClick={() => onPreviewImage?.(uploadedImage)}
                    />

                    {/* Delete button in top right */}
                    <button
                      type="button"
                      onClick={() => setUploadedImage(null)}
                      className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-sm p-1 transition cursor-pointer"
                      title="删除并重新上传"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Info footer */}
                  <div className="mt-2.5 flex items-center justify-between text-xs text-slate-600 px-1">
                    <span className="flex items-center gap-1 text-emerald-600 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      已识别法人印章与签字
                    </span>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[#1677ff] hover:underline cursor-pointer"
                    >
                      更换文件
                    </button>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              )}
            </>
          ) : (
            /* Tab: 管理员授权 Content */
            <div className="bg-white rounded-lg p-5 border border-[#e5ecf6]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#1677ff]">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[14px] font-medium text-slate-800">
                    法定代表人或管理员远程在线授权
                  </h4>
                  <p className="text-[12px] text-slate-500">
                    无需打印盖章，发送授权邀请短信/微信一键签署
                  </p>
                </div>
              </div>

              {!adminSent ? (
                <div className="space-y-3 mt-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      管理员姓名 / 法定代表人
                    </label>
                    <input
                      type="text"
                      placeholder="例如：孙刚"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-[#1677ff]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      管理员手机号码
                    </label>
                    <input
                      type="tel"
                      placeholder="请输入11位手机号"
                      value={adminPhone}
                      onChange={(e) => setAdminPhone(e.target.value)}
                      className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-[#1677ff]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!adminPhone) {
                        alert('请填写管理员手机号码');
                        return;
                      }
                      setAdminSent(true);
                    }}
                    className="w-full mt-2 py-2.5 bg-[#1677ff] hover:bg-[#1890ff] text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>发送授权请求短信</span>
                  </button>
                </div>
              ) : (
                <div className="py-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h5 className="text-sm font-medium text-slate-800">
                    授权请求已发送至 {adminPhone || '138****8888'}
                  </h5>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    请提醒管理员在24小时内打开短信链接完成实名刷脸或电子签章。签署完成后页面将自动更新。
                  </p>
                  <button
                    type="button"
                    onClick={() => setAdminSent(false)}
                    className="mt-3 text-xs text-[#1677ff] hover:underline cursor-pointer"
                  >
                    修改手机号码重新发送
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
