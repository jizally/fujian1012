import React from 'react';
import { X, CheckCircle2, AlertTriangle, FileCheck, Stamp, Camera } from 'lucide-react';

interface InstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTemplate: () => void;
}

export const InstructionModal: React.FC<InstructionModalProps> = ({
  isOpen,
  onClose,
  onOpenTemplate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="w-full max-w-lg bg-white rounded-t-2xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-4 bg-[#1677ff] rounded-full" />
            <h3 className="text-base font-semibold text-slate-900">
              企业授权书操作说明
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

        {/* Content body */}
        <div className="p-5 overflow-y-auto space-y-4 text-sm text-slate-600">
          <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3.5 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-[#1677ff] shrink-0 mt-0.5" />
            <p className="text-xs text-[#1677ff] leading-relaxed">
              为保障企业数字身份安全，根据《电子签名法》及国家密码管理局CA认证标准，需提交合法有效的企业公章授权原件。
            </p>
          </div>

          <div className="space-y-4">
            {/* Step 1 */}
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-blue-100 text-[#1677ff] font-semibold flex items-center justify-center shrink-0 text-xs">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-slate-800 text-sm flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-blue-500" />
                  下载并打印模板
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  点击“下载模板”按钮获取标准版《企业授权委托书》，使用标准 A4 纸单面打印，不得修改模板法定条款。
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-blue-100 text-[#1677ff] font-semibold flex items-center justify-center shrink-0 text-xs">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-slate-800 text-sm flex items-center gap-1.5">
                  <Stamp className="w-4 h-4 text-rose-500" />
                  法人签字并加盖公章
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  填写被授权经办人真实姓名及身份证号。由法定代表人黑色签字笔签名，并在委托单位处加盖
                  <span className="text-rose-600 font-medium">清晰企业公章</span>（不得使用财务章、合同章替代）。
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-blue-100 text-[#1677ff] font-semibold flex items-center justify-center shrink-0 text-xs">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-slate-800 text-sm flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-amber-500" />
                  高清拍照或扫描上传
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  平铺纸质原件拍照，四角齐全，字迹清晰。严禁对电脑屏幕拍摄或截屏，图片大小建议在 10MB 以内。
                </p>
              </div>
            </div>
          </div>

          {/* Do's and Don'ts */}
          <div className="border border-slate-100 rounded-xl p-3 bg-slate-50/50 space-y-2 text-xs">
            <div className="font-medium text-slate-700">拍照要求标准：</div>
            <div className="flex items-center gap-1.5 text-emerald-600">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>正对拍摄、平整无折痕、四角完整露出、文字及印章清晰可辨</span>
            </div>
            <div className="flex items-center gap-1.5 text-rose-500">
              <X className="w-3.5 h-3.5 shrink-0" />
              <span>禁止复印件二次拍摄、严禁遮挡印章、禁止对翻拍屏幕拍照</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/80 flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenTemplate();
            }}
            className="flex-1 py-2.5 rounded-full border border-[#1677ff] text-[#1677ff] font-medium text-sm hover:bg-blue-50 transition cursor-pointer"
          >
            下载授权书模板
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full bg-[#1677ff] text-white font-medium text-sm hover:bg-[#1890ff] transition cursor-pointer"
          >
            我知道了
          </button>
        </div>
      </div>
    </div>
  );
};
