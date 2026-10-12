import React from 'react';
import { CheckCircle2, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

interface SubmitSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicationNo?: string;
}

export const SubmitSuccessModal: React.FC<SubmitSuccessModalProps> = ({
  isOpen,
  onClose,
  applicationNo = 'CA2026092998821',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 animate-in zoom-in">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-1">
          附件资料已提交成功
        </h3>
        <p className="text-xs text-slate-500 mb-5">
          CA数字证书签发机构正在核验您的资质
        </p>

        {/* Card info */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-left text-xs space-y-2 mb-5">
          <div className="flex justify-between">
            <span className="text-slate-500">业务流水号：</span>
            <span className="font-mono font-medium text-slate-800">
              {applicationNo}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">企业主体：</span>
            <span className="text-slate-800 font-medium truncate max-w-[170px]">
              北京妙妙轩商务服务有限公司
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">法定代表人：</span>
            <span className="text-slate-800">孙刚（已实名核验）</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">预计审核耗时：</span>
            <span className="text-amber-600 font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              1~2个工作日
            </span>
          </div>
        </div>

        {/* Audit timeline */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-6 px-1">
          <div className="flex flex-col items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mb-1" />
            <span className="text-emerald-600 font-medium">资料已提交</span>
          </div>
          <div className="w-8 h-[1px] bg-emerald-300" />
          <div className="flex flex-col items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse mb-1" />
            <span className="text-blue-600 font-medium">资质核验中</span>
          </div>
          <div className="w-8 h-[1px] bg-slate-200" />
          <div className="flex flex-col items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 mb-1" />
            <span>证书制作</span>
          </div>
          <div className="w-8 h-[1px] bg-slate-200" />
          <div className="flex flex-col items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 mb-1" />
            <span>生效颁发</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-5">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
          <span>审核结果将通过短信即时通知经办人</span>
        </div>

        {/* Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 rounded-full bg-[#1677ff] hover:bg-[#1890ff] text-white text-sm font-medium transition cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
        >
          <span>完成并返回</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
