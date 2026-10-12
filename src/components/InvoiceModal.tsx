import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import type { InvoiceData } from '../types.ts';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: InvoiceData;
  onSave: (data: InvoiceData) => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose,
  currentData,
  onSave,
}) => {
  const [formData, setFormData] = useState<InvoiceData>(currentData);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="w-full max-w-lg bg-white rounded-t-2xl sm:rounded-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-4 bg-[#1677ff] rounded-full" />
            <h3 className="text-base font-semibold text-slate-900">
              设置发票抬头与信息
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <div className="p-5 overflow-y-auto space-y-4 text-sm">
          {/* Invoice Type selection */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-2">
              发票种类
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { type: 'general' as const, label: '增值税普通发票' },
                { type: 'special' as const, label: '增值税专用发票' },
                { type: 'none' as const, label: '暂不开具发票' },
              ].map((item) => (
                <button
                  key={item.type}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      type: item.type,
                      enabled: item.type !== 'none',
                    }))
                  }
                  className={`py-2 px-2 rounded-lg text-xs font-medium border text-center transition cursor-pointer ${
                    formData.type === item.type
                      ? 'border-[#1677ff] bg-blue-50/60 text-[#1677ff]'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {formData.type !== 'none' && (
            <>
              {/* Title Type */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-2">
                  抬头属性
                </label>
                <div className="flex gap-4 text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="titleType"
                      checked={formData.titleType === 'enterprise'}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          titleType: 'enterprise',
                        }))
                      }
                      className="text-[#1677ff] focus:ring-0"
                    />
                    <span>企业单位</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="titleType"
                      checked={formData.titleType === 'personal'}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          titleType: 'personal',
                        }))
                      }
                      className="text-[#1677ff] focus:ring-0"
                    />
                    <span>个人 / 非企业单位</span>
                  </label>
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  发票抬头名称 <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      companyName: e.target.value,
                    }))
                  }
                  placeholder="请输入企业完整全称"
                  className="w-full text-xs sm:text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-[#1677ff]"
                />
              </div>

              {/* Tax Number */}
              {formData.titleType === 'enterprise' && (
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    纳税人识别号 / 统一社会信用代码{' '}
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.taxNumber}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        taxNumber: e.target.value,
                      }))
                    }
                    placeholder="18位纳税人识别号"
                    className="w-full text-xs sm:text-sm font-mono border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-[#1677ff]"
                  />
                </div>
              )}

              {/* Special invoice extra requirements */}
              {formData.type === 'special' && (
                <div className="space-y-3 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <p className="text-[11px] text-amber-700 font-medium">
                    专票需准确填写企业基本户开户行与工商注册地址电话
                  </p>
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-1">
                      开户银行
                    </label>
                    <input
                      type="text"
                      value={formData.bankName || ''}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          bankName: e.target.value,
                        }))
                      }
                      placeholder="例如：招商银行股份有限公司北京建国路支行"
                      className="w-full text-xs border border-slate-200 rounded px-2.5 py-1.5 bg-white outline-none focus:border-[#1677ff]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-1">
                      银行账号
                    </label>
                    <input
                      type="text"
                      value={formData.bankAccount || ''}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          bankAccount: e.target.value,
                        }))
                      }
                      placeholder="企业对公银行账号"
                      className="w-full text-xs font-mono border border-slate-200 rounded px-2.5 py-1.5 bg-white outline-none focus:border-[#1677ff]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-1">
                      注册地址及电话
                    </label>
                    <input
                      type="text"
                      value={formData.address || ''}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                      placeholder="北京市朝阳区建国路87号 010-85888888"
                      className="w-full text-xs border border-slate-200 rounded px-2.5 py-1.5 bg-white outline-none focus:border-[#1677ff]"
                    />
                  </div>
                </div>
              )}

              {/* Recipient Email */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  电子发票接收邮箱 <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="用于接收电子发票PDF/OFD文件"
                  className="w-full text-xs sm:text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-[#1677ff]"
                />
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-white flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full border border-slate-200 text-slate-700 font-medium text-sm hover:bg-slate-50 transition cursor-pointer"
          >
            取消
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 py-2.5 rounded-full bg-[#1677ff] hover:bg-[#1890ff] text-white font-medium text-sm transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Check className="w-4 h-4" />
            <span>确认保存</span>
          </button>
        </div>
      </div>
    </div>
  );
};
