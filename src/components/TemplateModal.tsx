import React, { useState } from 'react';
import { X, Download, Copy, Check, Printer } from 'lucide-react';

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TemplateModal: React.FC<TemplateModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const templateText = `企业授权委托书

本授权委托书声明：
委托单位：北京妙妙轩商务服务有限公司
统一社会信用代码：91110108MA01EBFH9B
法定代表人：孙刚

兹授权本公司经办人 _________（身份证号：__________________）代表本单位全权办理电子认证服务（CA数字证书）申领、绑定、补发、变更、注销等相关业务。

被授权人在办理上述业务过程中所签署的一切文件，本单位均予以承认，并承担由此产生的一切法律责任与法律后果。

本授权委托书有效期限：自 2026 年 ___ 月 ___ 日 至 2027 年 ___ 月 ___ 日止。

特此授权。

法定代表人（签字或盖章）：
委托单位（加盖公章）：
授权签署日期：2026 年 ___ 月 ___ 日`;

  const handleCopy = () => {
    navigator.clipboard.writeText(templateText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    // Generate text/pdf file download
    const blob = new Blob([templateText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '企业授权委托书模板_标准版.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>企业授权委托书</title>
            <style>
              body { font-family: SimSun, "宋体", serif; padding: 40px; line-height: 2; font-size: 16px; }
              h1 { text-align: center; margin-bottom: 30px; font-size: 24px; }
              .indent { text-indent: 2em; }
              .sign { margin-top: 60px; float: right; width: 300px; }
            </style>
          </head>
          <body>
            <h1>企业授权委托书</h1>
            <p class="indent"><strong>委托单位：</strong>北京妙妙轩商务服务有限公司</p>
            <p class="indent"><strong>统一社会信用代码：</strong>91110108MA01EBFH9B</p>
            <p class="indent"><strong>法定代表人：</strong>孙刚</p>
            <p class="indent">兹授权本公司经办人 _________（身份证号：__________________）代表本单位全权办理电子认证服务（CA数字证书）申领、绑定、变更等相关业务。被授权人在办理上述业务过程中所签署的一切文件，本单位均予以承认，并承担由此产生的一切法律后果。</p>
            <p class="indent">授权有效期限：自 2026年___月___日 至 2027年___月___日止。</p>
            <div class="sign">
              <p>法定代表人（签字）：</p>
              <p>委托单位（公章）：</p>
              <p>日期：2026年____月____日</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => printWindow.print(), 250);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="w-full max-w-lg bg-white rounded-t-2xl sm:rounded-2xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-4 bg-[#1677ff] rounded-full" />
            <h3 className="text-base font-semibold text-slate-900">
              企业授权委托书模板
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

        {/* Content body: Paper sheet style */}
        <div className="p-5 overflow-y-auto bg-slate-50">
          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
            <h2 className="text-center text-lg font-bold mb-4 tracking-wider text-slate-900">
              企业授权委托书
            </h2>
            <div className="space-y-2.5 text-slate-700">
              <p className="font-semibold">本授权委托书声明：</p>
              <p>委托单位：北京妙妙轩商务服务有限公司</p>
              <p>统一社会信用代码：91110108MA01EBFH9B</p>
              <p>法定代表人：孙刚</p>
              <p className="pt-2 indent-6 text-justify">
                兹授权本公司经办人{' '}
                <span className="border-b border-slate-400 px-3 py-0.5 inline-block text-slate-400">
                  经办人姓名
                </span>
                （身份证号：
                <span className="border-b border-slate-400 px-3 py-0.5 inline-block text-slate-400">
                  经办人身份证号
                </span>
                ）代表本单位全权办理电子认证服务（CA数字证书）申领、绑定、补发、变更、注销等相关业务。
              </p>
              <p className="indent-6 text-justify">
                被授权人在办理上述业务过程中所签署的一切文件，本单位均予以承认，并承担由此产生的一切法律责任与后果。
              </p>
              <p className="indent-6">
                授权有效期限：2026年___月___日 至 2027年___月___日
              </p>

              <div className="pt-6 flex justify-end">
                <div className="space-y-2 w-56 text-xs sm:text-sm">
                  <p>法定代表人（签字）：_________</p>
                  <p className="relative">
                    委托单位（加盖公章）：
                    <span className="inline-block w-16 h-16 border-2 border-dashed border-rose-300 rounded-full text-[10px] text-rose-400 text-center leading-16 ml-2 absolute -top-4 right-0">
                      公章处
                    </span>
                  </p>
                  <p>日期：2026 年 ___ 月 ___ 日</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-white flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 py-2.5 rounded-full border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium hover:bg-slate-50 flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>已复制全文</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>复制文本</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="hidden sm:flex py-2.5 px-4 rounded-full border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>打印</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="flex-1 py-2.5 rounded-full bg-[#1677ff] hover:bg-[#1890ff] text-white text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>下载模板文件</span>
          </button>
        </div>
      </div>
    </div>
  );
};
