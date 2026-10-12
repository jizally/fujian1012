import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCw, CheckCircle2, Copy, Check } from 'lucide-react';
import type { BusinessLicenseData } from '../types.ts';

interface LicensePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  data: BusinessLicenseData;
}

export const LicensePreviewModal: React.FC<LicensePreviewModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  data,
}) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [activeTab, setActiveTab] = useState<'image' | 'ocr'>('image');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-2xl bg-white rounded-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-white z-10">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-semibold text-slate-900">
              营业执照大图与OCR识别结果
            </h3>
            {/* Segmented control */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveTab('image')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  activeTab === 'image'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                执照原图
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('ocr')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  activeTab === 'ocr'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                OCR信息 ({data.code ? '已核验' : '待核验'})
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-auto bg-slate-900/90 relative flex items-center justify-center min-h-[350px]">
          {activeTab === 'image' ? (
            <div className="w-full h-full p-4 flex items-center justify-center overflow-auto">
              <img
                src={imageUrl}
                alt="统一社会信用代码证或营业执照"
                style={{
                  transform: `scale(${zoom}) rotate(${rotation}deg)`,
                  transition: 'transform 0.2s ease-out',
                }}
                className="max-h-[65vh] max-w-full object-contain shadow-2xl rounded-sm"
              />

              {/* Floating zoom controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/75 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-3 text-white text-xs shadow-lg">
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.max(0.6, z - 0.2))}
                  className="hover:text-blue-400 cursor-pointer p-1"
                  title="缩小"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-mono">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))}
                  className="hover:text-blue-400 cursor-pointer p-1"
                  title="放大"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <div className="w-px h-3 bg-white/30" />
                <button
                  type="button"
                  onClick={() => setRotation((r) => (r + 90) % 360)}
                  className="hover:text-blue-400 cursor-pointer p-1 flex items-center gap-1"
                  title="旋转90°"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>旋转</span>
                </button>
              </div>
            </div>
          ) : (
            /* OCR details tab */
            <div className="w-full h-full bg-white p-5 overflow-y-auto text-sm">
              <div className="flex items-center gap-2 mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>
                  国家企业信用信息公示系统校验通过，企业状态存续，信息一致有效。
                </span>
              </div>

              <div className="space-y-3 divide-y divide-slate-100">
                {[
                  { label: '统一社会信用代码', value: data.code, key: 'code' },
                  { label: '企业名称', value: data.name, key: 'name' },
                  { label: '法定代表人', value: data.legalPerson, key: 'lp' },
                  { label: '企业类型', value: data.type, key: 'type' },
                  { label: '注册资本', value: data.capital, key: 'cap' },
                  { label: '成立日期', value: data.establishDate, key: 'date' },
                  { label: '营业期限', value: data.validPeriod, key: 'period' },
                  { label: '住所地址', value: data.address, key: 'addr' },
                  { label: '登记机关', value: data.registerAuthority, key: 'auth' },
                  { label: '核准发照日期', value: data.issueDate, key: 'issue' },
                  { label: '经营范围', value: data.businessScope, key: 'scope' },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="pt-2.5 first:pt-0 flex items-start justify-between gap-4"
                  >
                    <div className="w-32 shrink-0 text-xs text-slate-500 font-medium">
                      {item.label}
                    </div>
                    <div className="flex-1 text-xs text-slate-800 font-sans leading-relaxed">
                      {item.value}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(item.value, item.key)}
                      className="p-1 text-slate-400 hover:text-blue-600 transition shrink-0 cursor-pointer"
                      title="复制"
                    >
                      {copiedKey === item.key ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            原件照片与识别数据将同步至CA电子认证档案库
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-1.5 rounded-full bg-[#1677ff] text-white text-xs font-medium hover:bg-[#1890ff] cursor-pointer"
          >
            完成查看
          </button>
        </div>
      </div>
    </div>
  );
};
