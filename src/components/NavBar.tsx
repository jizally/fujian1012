import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface NavBarProps {
  title?: string;
  onBack?: () => void;
  className?: string;
}

export const NavBar: React.FC<NavBarProps> = ({
  title = '附件上传',
  onBack,
  className = '',
}) => {
  return (
    <header
      className={`sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-[#f0f0f0] transition-colors ${className}`}
    >
      <div className="relative h-12 flex items-center justify-between px-3">
        {/* Left Back Button */}
        <button
          type="button"
          onClick={onBack}
          aria-label="返回上一页"
          className="min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-800 hover:text-slate-600 active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
        </button>

        {/* Center Title */}
        <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none">
          <h1 className="text-[17px] font-medium tracking-tight text-[#1a1a1a]">
            {title}
          </h1>
        </div>

        {/* Right placeholder to keep balance */}
        <div className="min-w-[44px] min-h-[44px] flex items-center justify-end" />
      </div>
    </header>
  );
};
