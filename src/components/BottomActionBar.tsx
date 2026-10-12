import React from 'react';

interface BottomActionBarProps {
  onExit: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export const BottomActionBar: React.FC<BottomActionBarProps> = ({
  onExit,
  onSubmit,
  isSubmitting = false,
}) => {
  return (
    <div className="w-full px-4 pt-3 pb-6 bg-white border-t border-[#f0f0f0] transition-colors">
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        {/* Left: 退出 */}
        <button
          type="button"
          onClick={onExit}
          className="h-[46px] rounded-full border border-[#d9d9d9] bg-white text-[#333333] text-[16px] font-normal hover:bg-slate-50 active:scale-[0.98] transition flex items-center justify-center cursor-pointer shadow-xs"
        >
          退出
        </button>

        {/* Right: 提交审核 */}
        <button
          type="button"
          disabled={isSubmitting}
          onClick={onSubmit}
          className="h-[46px] rounded-full bg-[#1677ff] hover:bg-[#1890ff] active:scale-[0.98] text-white text-[16px] font-medium transition flex items-center justify-center shadow-xs cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>提交中...</span>
            </div>
          ) : (
            '提交审核'
          )}
        </button>
      </div>
    </div>
  );
};
