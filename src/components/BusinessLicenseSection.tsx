import React, { useRef, useState } from 'react';
import { X, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { CameraPlusIcon } from './CameraPlusIcon.tsx';
import businessLicenseImg from '../assets/images/business_license_1790673081317.jpg';
import type { BusinessLicenseData } from '../types.ts';

interface BusinessLicenseSectionProps {
  onPreview: (imageUrl: string, data?: BusinessLicenseData) => void;
  onLicenseChanged?: (hasLicense: boolean) => void;
}

export const defaultLicenseData: BusinessLicenseData = {
  code: '91110108MA01EBFH9B',
  name: '北京妙妙轩商务服务有限公司',
  type: '其他有限责任公司',
  legalPerson: '孙刚',
  capital: '1000万元',
  establishDate: '2018年08月29日',
  validPeriod: '2018年08月29日至 长期',
  businessScope:
    '民用零售（不含烟花爆竹、电子烟）；技术开发、技术服务；软件开发；计算机系统服务；会议服务；影视策划；企业管理；商务咨询；公共关系服务。（依法须经批准的项目，经相关部门批准后依批准的内容开展经营活动）',
  address: '北京市朝阳区建国路87号15层1506号',
  registerAuthority: '北京市朝阳区市场监督管理局',
  issueDate: '2020年02月21日',
};

export const BusinessLicenseSection: React.FC<BusinessLicenseSectionProps> = ({
  onPreview,
  onLicenseChanged,
}) => {
  const [currentImage, setCurrentImage] = useState<string | null>(businessLicenseImg);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage(null);
    onLicenseChanged?.(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCurrentImage(url);
      onLicenseChanged?.(true);
    }
  };

  const handleRestoreDefault = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage(businessLicenseImg);
    onLicenseChanged?.(true);
  };

  return (
    <section className="px-4 pt-5">
      {/* Section Title */}
      <h2 className="text-[17px] font-semibold text-[#222222] mb-3 flex items-center">
        <span>统一社会信用代码证或营业执照</span>
        <span className="text-[#ff4d4f] ml-0.5">*</span>
      </h2>

      {/* Container with soft ice-blue background matching the screenshot */}
      <div className="rounded-xl overflow-hidden bg-[#f4f8fd] border border-[#e5ecf6] p-3 relative">
        {currentImage ? (
          <div className="relative group">
            {/* The Business License Document Photo Preview */}
            <div
              onClick={() => onPreview(currentImage, defaultLicenseData)}
              className="relative w-full rounded-lg overflow-hidden bg-white shadow-xs border border-[#d6e3f2] cursor-pointer"
            >
              <img
                src={currentImage}
                alt="统一社会信用代码证或营业执照"
                className="w-full h-auto max-h-[260px] object-cover sm:object-contain mx-auto block transition-transform group-hover:scale-[1.01]"
              />

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="bg-black/70 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  点击查看大图及OCR识别信息
                </span>
              </div>
            </div>

            {/* Gray Square Delete Button with '×' in Top Right - exactly like screenshot */}
            <button
              type="button"
              onClick={handleDelete}
              title="删除此执照照片"
              aria-label="删除"
              className="absolute -top-1.5 -right-1.5 bg-[#8c8c8c] hover:bg-[#595959] active:scale-95 text-white w-6 h-6 rounded-xs flex items-center justify-center shadow-xs transition z-10 cursor-pointer"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* OCR Success recognition badge */}
            <div className="mt-2.5 flex items-center justify-between px-1 text-xs">
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                OCR识别成功：北京妙妙轩商务服务有限公司
              </span>
              <button
                type="button"
                onClick={() => onPreview(currentImage, defaultLicenseData)}
                className="text-[#1677ff] hover:underline"
              >
                核对详情
              </button>
            </div>
          </div>
        ) : (
          /* Empty upload state */
          <div
            onClick={() => fileInputRef.current?.click()}
            className="bg-white rounded-lg p-8 border border-dashed border-[#c2d7f2] flex flex-col items-center justify-center cursor-pointer hover:border-[#1677ff] transition group"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <div className="mb-3 transition-transform group-hover:scale-105">
              <CameraPlusIcon className="w-12 h-10" />
            </div>

            <p className="text-[14px] text-[#4a5568] font-normal mb-1">
              点击上传/识别
            </p>

            <p className="text-[12px] text-[#8c9ba5] text-center">
              请保证图片真实、清晰、非对屏幕拍摄
            </p>

            <button
              type="button"
              onClick={handleRestoreDefault}
              className="mt-3 text-[12px] text-[#1677ff] hover:underline flex items-center gap-1 cursor-pointer bg-blue-50/80 px-2.5 py-1 rounded-full"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>恢复默认营业执照照片</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
