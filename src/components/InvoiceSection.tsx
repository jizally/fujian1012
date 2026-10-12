import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { InvoiceData } from '../types.ts';

interface InvoiceSectionProps {
  invoiceData: InvoiceData;
  onClick: () => void;
}

export const InvoiceSection: React.FC<InvoiceSectionProps> = ({
  invoiceData,
  onClick,
}) => {
  const getSubtext = () => {
    if (!invoiceData.enabled || invoiceData.type === 'none') {
      return '请选择发票抬头';
    }
    const typeLabel =
      invoiceData.type === 'special' ? '增值税专用发票' : '增值税普通发票';
    const title = invoiceData.companyName || '北京妙妙轩商务服务有限公司';
    return `${typeLabel} · ${title}`;
  };

  return (
    <section className="mt-5 border-t border-[#f0f0f0] border-b border-[#f0f0f0] bg-white">
      <button
        type="button"
        onClick={onClick}
        className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-50/60 active:bg-slate-100 transition-colors cursor-pointer group"
      >
        <div className="flex flex-col gap-0.5">
          <span className="text-[16px] font-normal text-[#222222] tracking-tight">
            开具发票
          </span>
          <span
            className={`text-[14px] ${
              invoiceData.enabled && invoiceData.type !== 'none'
                ? 'text-[#1677ff] font-medium'
                : 'text-[#999999]'
            }`}
          >
            {getSubtext()}
          </span>
        </div>

        <ChevronRight className="w-5 h-5 text-[#b0b0b0] group-hover:text-slate-600 transition-colors" />
      </button>
    </section>
  );
};
