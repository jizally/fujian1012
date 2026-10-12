import React, { useState } from 'react';
import { Bell, CheckCircle2, Phone, XCircle } from 'lucide-react';
import type { FaceAuthData, FaceAuthStatus } from '../types.ts';

interface FaceAuthSectionProps {
  authData: FaceAuthData;
  onStartAuth: () => void;
  onStatusChange?: (status: FaceAuthStatus) => void;
  onContactSupport?: () => void;
  onRefreshReview?: () => void;
}

export const FaceAuthSection: React.FC<FaceAuthSectionProps> = ({
  authData,
  onStartAuth,
  onStatusChange,
  onContactSupport,
}) => {
  const [copied, setCopied] = useState(false);
  const status = authData.status || (authData.isVerified ? 'success' : 'pending');

  const hotline = authData.caContact?.hotline || '400-880-9988';
  const workHours = authData.caContact?.workHours || '周一至周日 8:30-20:00';

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(hotline);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="px-4 pt-4 pb-6">
      {/* State Switcher for Reviewing / Testing */}
      {onStatusChange && (
        <div className="mb-4 flex items-center justify-between bg-slate-100/90 p-1 rounded-lg text-[11px]">
          {[
            { id: 'pending' as const, label: '待认证' },
            { id: 'success' as const, label: '1. 认证成功' },
            { id: 'reviewing' as const, label: '2. 审核中' },
            { id: 'rejected' as const, label: '3. 审核不通过' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onStatusChange(tab.id)}
              className={`flex-1 py-1 px-1 rounded-md font-medium text-center transition cursor-pointer ${
                status === tab.id
                  ? 'bg-white text-[#1677ff] shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* 1. Top Alert Notification */}
      <div className="flex items-center gap-1.5 text-[#e0433e] text-[15px] font-normal mb-3">
        <Bell className="w-4 h-4 fill-[#e0433e] text-[#e0433e] shrink-0" />
        <span>请在下方进行身份认证</span>
      </div>

      {/* 2. Section Title */}
      <h3 className="text-[17px] font-semibold text-[#222222] mb-2 flex items-center">
        <span>人脸识别认证</span>
        <span className="text-[#ff4d4f] ml-0.5">*</span>
      </h3>

      {/* 3. Base Description Paragraph */}
      <p className="text-[14px] text-[#666666] leading-relaxed mb-3 font-normal">
        根据CA 认证要求，申领证书需完成人脸实名验证。请您点击下方按键进行实名认证。
      </p>

      {/* CASE 0: 待认证 (pending) - Original State */}
      {status === 'pending' && (
        <div className="flex justify-center pt-3">
          <button
            type="button"
            onClick={onStartAuth}
            className="w-[190px] h-[42px] rounded-full border border-black bg-white text-black text-[15px] font-normal flex items-center justify-center hover:bg-slate-50 active:scale-95 transition cursor-pointer"
          >
            开始认证
          </button>
        </div>
      )}

      {/* CASE 1: 认证成功 (success) - 只改按钮 */}
      {status === 'success' && (
        <div className="flex justify-center pt-3">
          <button
            type="button"
            onClick={onStartAuth}
            className="w-[190px] h-[42px] rounded-full border border-[#52c41a] bg-[#f6ffed] text-[#52c41a] text-[15px] font-normal flex items-center justify-center gap-1.5 hover:bg-[#d9f7be]/60 active:scale-95 transition cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-[#52c41a]" />
            <span>认证成功</span>
          </button>
        </div>
      )}

      {/* CASE 2: 审核中 (reviewing) - 按钮黄色，电话一行，服务时间一行 */}
      {status === 'reviewing' && (
        <div className="flex flex-col items-center pt-3">
          {/* Button: 置灰药丸按钮 */}
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
              href={`tel:${hotline}`}
              className="text-[#1677ff] font-medium hover:underline"
            >
              {hotline}
            </a>
            <button
              type="button"
              onClick={handleCopyPhone}
              className="text-[#1677ff] text-[12px] ml-1.5 hover:underline cursor-pointer"
            >
              {copied ? '已复制' : '复制'}
            </button>
          </div>

          {/* 服务时间一行 */}
          <div className="mt-1 text-[13px] text-[#888888] text-center">
            服务时间：{workHours}
          </div>
        </div>
      )}

      {/* CASE 3: 审核不通过 (rejected) - 大号文字告知审核不通过 + 一行字说明原因 + 按钮 */}
      {status === 'rejected' && (
        <div className="pt-1">
          {/* 大号文字突出告知审核不通过 */}
          <div className="flex items-center gap-1.5 text-[17px] font-semibold text-[#e0433e] mb-1.5">
            <XCircle className="w-5 h-5 text-[#e0433e] shrink-0 stroke-[2.2]" />
            <span>审核不通过</span>
          </div>

          {/* 一行字说明原因 */}
          <p className="text-[13px] text-[#666666] mb-5">
            审核不通过原因：{authData.rejectReason || '人脸比对相似度未达到认证要求'}
          </p>

          {/* Action buttons: 重新认证 + 联系客服 */}
          <div className="flex items-center justify-center gap-3">
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
      )}
    </section>
  );
};
