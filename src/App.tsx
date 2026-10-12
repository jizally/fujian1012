import React, { useState } from 'react';
import { StatusBar } from './components/StatusBar.tsx';
import { NavBar } from './components/NavBar.tsx';
import { AuthorizationLetterSection } from './components/AuthorizationLetterSection.tsx';
import { BusinessLicenseSection, defaultLicenseData } from './components/BusinessLicenseSection.tsx';
import { InvoiceSection } from './components/InvoiceSection.tsx';
import { FaceAuthSection } from './components/FaceAuthSection.tsx';
import { BottomActionBar } from './components/BottomActionBar.tsx';
import { InstructionModal } from './components/InstructionModal.tsx';
import { TemplateModal } from './components/TemplateModal.tsx';
import { LicensePreviewModal } from './components/LicensePreviewModal.tsx';
import { InvoiceModal } from './components/InvoiceModal.tsx';
import { FaceRecognitionModal } from './components/FaceRecognitionModal.tsx';
import { SubmitSuccessModal } from './components/SubmitSuccessModal.tsx';
import { CustomerServiceModal } from './components/CustomerServiceModal.tsx';
import { ThreeCasesShowcase } from './components/ThreeCasesShowcase.tsx';
import type { InvoiceData, FaceAuthData, BusinessLicenseData, FaceAuthStatus } from './types.ts';
import { Smartphone, Monitor, RotateCcw, AlertCircle, LayoutGrid, Layers } from 'lucide-react';

export default function App() {
  // Page mode: 'full-app' (the complete mobile upload page) vs 'cases-showcase' (dedicated 3 cases comparison)
  const [pageMode, setPageMode] = useState<'full-app' | 'cases-showcase'>('full-app');

  // Device frame mode: 'device' (iPhone mockup) vs 'full' (fluid responsive)
  const [viewMode, setViewMode] = useState<'device' | 'full'>('device');

  // Modal visibility states
  const [showInstructions, setShowInstructions] = useState(false);
  const [showTemplate, setShowTemplate] = useState(false);
  const [showLicensePreview, setShowLicensePreview] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showFaceAuthModal, setShowFaceAuthModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCustomerServiceModal, setShowCustomerServiceModal] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Active preview image & data
  const [activePreviewUrl, setActivePreviewUrl] = useState<string>('');
  const [activeLicenseData, setActiveLicenseData] = useState<BusinessLicenseData>(defaultLicenseData);
  const [hasLicense, setHasLicense] = useState(true);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Form states
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    enabled: false,
    type: 'none',
    titleType: 'enterprise',
    companyName: '北京妙妙轩商务服务有限公司',
    taxNumber: '91110108MA01EBFH9B',
    bankName: '招商银行股份有限公司北京建国路支行',
    bankAccount: '1109 0882 1290 8821',
    address: '北京市朝阳区建国路87号15层1506号 010-85888888',
    email: 'finance@miaomiaoxuan.com',
  });

  // Face auth data with initial status: 'pending' (can switch to 'success' | 'reviewing' | 'rejected')
  const [faceAuthData, setFaceAuthData] = useState<FaceAuthData>({
    status: 'pending',
    isVerified: false,
    name: '孙刚',
    idCard: '110108********1234',
    verifiedAt: '2026-09-29 02:15',
    caContact: {
      hotline: '400-880-9988',
      workHours: '周一至周日 08:30 - 20:00',
      email: 'ca-support@bjca-service.org.cn',
      centerName: '北京数字认证中心（CA授权受理点）',
    },
    rejectReason: '人脸比对相似度未达到认证要求',
    rejectTime: '2026-09-29 02:15',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenLicensePreview = (url: string, data?: BusinessLicenseData) => {
    setActivePreviewUrl(url);
    if (data) setActiveLicenseData(data);
    setShowLicensePreview(true);
  };

  const handleBack = () => {
    setShowExitConfirm(true);
  };

  const handleStatusChange = (newStatus: FaceAuthStatus) => {
    setFaceAuthData((prev) => ({
      ...prev,
      status: newStatus,
      isVerified: newStatus === 'success',
    }));

    const statusTexts: Record<FaceAuthStatus, string> = {
      pending: '已切换为：初始待认证状态',
      success: '已切换为：情况1 - 认证成功（仅改按钮）',
      reviewing: '已切换为：情况2 - 审核中（展示状态与CA联系方式）',
      rejected: '已切换为：情况3 - 审核不通过（展示原因与客服入口）',
    };
    showToast(statusTexts[newStatus]);
  };

  const handleSubmit = () => {
    if (!hasLicense) {
      showToast('请先上传营业执照或统一社会信用代码证');
      return;
    }

    if (faceAuthData.status === 'reviewing') {
      showToast('人脸识别尚在CA核验审核中，请稍候再提交');
      return;
    }

    if (faceAuthData.status === 'rejected') {
      showToast('人脸识别实名核验未通过，请重新认证或联系客服');
      return;
    }

    if (faceAuthData.status === 'pending' && !faceAuthData.isVerified) {
      showToast('根据CA机构要求，请先完成法定代表人实名核验');
      setShowFaceAuthModal(true);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 1000);
  };

  const handleResetData = () => {
    setFaceAuthData({
      status: 'pending',
      isVerified: false,
      name: '孙刚',
      idCard: '110108********1234',
      verifiedAt: '刚刚',
      caContact: {
        hotline: '400-880-9988',
        workHours: '周一至周日 08:30 - 20:00',
        email: 'ca-support@bjca-service.org.cn',
        centerName: '北京数字认证中心（CA授权受理点）',
      },
      rejectReason: '人脸比对相似度未达到认证要求',
      rejectTime: '2026-09-29 02:15',
    });
    setInvoiceData({
      enabled: false,
      type: 'none',
      titleType: 'enterprise',
      companyName: '北京妙妙轩商务服务有限公司',
      taxNumber: '91110108MA01EBFH9B',
      email: 'finance@miaomiaoxuan.com',
    });
    setHasLicense(true);
    showToast('已重置认证演示数据');
  };

  // The actual mobile page layout
  const MobileAppContent = (
    <div className="w-full bg-white min-h-screen flex flex-col font-sans select-none antialiased">
      {/* 1. iOS Status Bar */}
      <StatusBar time="9:41" />

      {/* 2. Navigation Top Bar */}
      <NavBar title="附件上传" onBack={handleBack} />

      {/* Main Content Area */}
      <main className="flex-1 pb-4">
        {/* Section 1: 企业授权书* */}
        <AuthorizationLetterSection
          onOpenTemplate={() => setShowTemplate(true)}
          onOpenInstructions={() => setShowInstructions(true)}
          onPreviewImage={(url) => {
            setActivePreviewUrl(url);
            setShowLicensePreview(true);
          }}
        />

        {/* Section 2: 统一社会信用代码证或营业执照* */}
        <BusinessLicenseSection
          onPreview={handleOpenLicensePreview}
          onLicenseChanged={(val) => setHasLicense(val)}
        />

        {/* Section 3: 开具发票 */}
        <InvoiceSection
          invoiceData={invoiceData}
          onClick={() => setShowInvoiceModal(true)}
        />

        {/* Section 4: 提示与人脸识别认证* (with 3 interactive states) */}
        <FaceAuthSection
          authData={faceAuthData}
          onStartAuth={() => setShowFaceAuthModal(true)}
          onStatusChange={handleStatusChange}
          onContactSupport={() => setShowCustomerServiceModal(true)}
          onRefreshReview={() => {
            showToast('已刷新CA核验状态：仍在人工复核中');
          }}
        />
      </main>

      {/* 5. Sticky / Anchored Bottom Action Bar */}
      <BottomActionBar
        onExit={() => setShowExitConfirm(true)}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-start text-slate-800">
      {/* Top Helper Toolbar */}
      <nav className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 py-2 flex items-center justify-between text-xs text-slate-600 shadow-xs z-40 sticky top-0">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-900 tracking-tight text-sm">
            人脸识别三种状态定制
          </span>

          {/* Mode Switch: Full App vs 3 Cases Dedicated Showcase */}
          <div className="bg-slate-100 p-0.5 rounded-lg flex items-center">
            <button
              type="button"
              onClick={() => setPageMode('full-app')}
              className={`px-3 py-1 rounded-md flex items-center gap-1.5 font-medium transition cursor-pointer ${
                pageMode === 'full-app'
                  ? 'bg-white text-[#1677ff] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>真机页面 (实时切状态)</span>
            </button>
            <button
              type="button"
              onClick={() => setPageMode('cases-showcase')}
              className={`px-3 py-1 rounded-md flex items-center gap-1.5 font-medium transition cursor-pointer ${
                pageMode === 'cases-showcase'
                  ? 'bg-white text-[#1677ff] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>三种情况对比专页</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {pageMode === 'full-app' && (
            /* Switch View Width */
            <div className="hidden sm:flex bg-slate-100 p-0.5 rounded-lg items-center">
              <button
                type="button"
                onClick={() => setViewMode('device')}
                className={`px-2 py-0.5 rounded-md flex items-center gap-1 text-[11px] font-medium transition cursor-pointer ${
                  viewMode === 'device'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Smartphone className="w-3 h-3" />
                <span>手机框</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('full')}
                className={`px-2 py-0.5 rounded-md flex items-center gap-1 text-[11px] font-medium transition cursor-pointer ${
                  viewMode === 'full'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Monitor className="w-3 h-3" />
                <span>铺满</span>
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={handleResetData}
            title="重置测试状态"
            className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-md transition cursor-pointer flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">重置</span>
          </button>
        </div>
      </nav>

      {/* Main Content Render */}
      {pageMode === 'cases-showcase' ? (
        <ThreeCasesShowcase
          onStartAuth={() => setShowFaceAuthModal(true)}
          onContactSupport={() => setShowCustomerServiceModal(true)}
        />
      ) : (
        <div className="w-full flex-1 flex justify-center items-start p-0 sm:py-6">
          {viewMode === 'device' ? (
            /* Phone Device Frame */
            <div className="w-full max-w-[420px] bg-black rounded-[42px] p-[10px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] ring-1 ring-slate-900/10 transition-all">
              {/* Inner Phone Screen */}
              <div className="w-full bg-white rounded-[34px] overflow-hidden relative shadow-inner">
                {MobileAppContent}
              </div>
            </div>
          ) : (
            /* Full Width Responsive View */
            <div className="w-full max-w-lg bg-white shadow-md sm:rounded-xl overflow-hidden">
              {MobileAppContent}
            </div>
          )}
        </div>
      )}

      {/* Floating Toast Notice */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-black/85 text-white text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals & Drawers */}
      <InstructionModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
        onOpenTemplate={() => {
          setShowInstructions(false);
          setShowTemplate(true);
        }}
      />

      <TemplateModal
        isOpen={showTemplate}
        onClose={() => setShowTemplate(false)}
      />

      <LicensePreviewModal
        isOpen={showLicensePreview}
        onClose={() => setShowLicensePreview(false)}
        imageUrl={activePreviewUrl}
        data={activeLicenseData}
      />

      <InvoiceModal
        isOpen={showInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
        currentData={invoiceData}
        onSave={(newData) => {
          setInvoiceData(newData);
          showToast('发票抬头信息已保存');
        }}
      />

      <FaceRecognitionModal
        isOpen={showFaceAuthModal}
        onClose={() => setShowFaceAuthModal(false)}
        legalPersonName="孙刚"
        onSuccess={(authResult) => {
          setFaceAuthData((prev) => ({
            ...prev,
            ...authResult,
            status: 'success',
            isVerified: true,
          }));
          showToast('法定代表人实名核验通过！已更新为“认证成功”');
        }}
      />

      <SubmitSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />

      <CustomerServiceModal
        isOpen={showCustomerServiceModal}
        onClose={() => setShowCustomerServiceModal(false)}
        onReverify={() => setShowFaceAuthModal(true)}
      />

      {/* Exit Confirmation Dialog */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-xs bg-white rounded-2xl p-5 shadow-2xl text-center">
            <h4 className="text-base font-bold text-slate-900 mb-2">
              确定要退出本次认证吗？
            </h4>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              当前填写的认证资料已自动为您暂存至草稿箱，您可以随时返回继续办理。
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 py-2.5 rounded-full border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 cursor-pointer"
              >
                继续填写
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowExitConfirm(false);
                  showToast('已退出当前申请并保存草稿');
                }}
                className="flex-1 py-2.5 rounded-full bg-[#1677ff] text-white text-xs font-medium hover:bg-[#1890ff] cursor-pointer"
              >
                确认退出
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
