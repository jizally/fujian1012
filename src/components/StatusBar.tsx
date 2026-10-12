import React from 'react';

interface StatusBarProps {
  time?: string;
  className?: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  time = '9:41',
  className = '',
}) => {
  return (
    <div
      className={`w-full px-6 pt-3 pb-2 flex items-center justify-between text-black select-none text-[15px] font-medium tracking-tight ${className}`}
    >
      {/* Time */}
      <span className="font-semibold tracking-normal text-[15px]">{time}</span>

      {/* Dynamic Island or Speaker Notch area (Subtle) */}
      <div className="hidden sm:block w-24 h-4 rounded-full bg-black/10 mx-auto opacity-0" />

      {/* Right icons: Signal, Wi-Fi, Battery */}
      <div className="flex items-center gap-1.5">
        {/* Cellular signal: 4 bars */}
        <div className="flex items-end gap-[2px] h-[11px] pb-[1px]" aria-label="Cellular signal">
          <span className="w-[3px] h-[4px] bg-black rounded-xs" />
          <span className="w-[3px] h-[6px] bg-black rounded-xs" />
          <span className="w-[3px] h-[8px] bg-black rounded-xs" />
          <span className="w-[3px] h-[10px] bg-black rounded-xs" />
        </div>

        {/* Wi-Fi Icon */}
        <svg
          className="w-4 h-4 fill-current ml-0.5"
          viewBox="0 0 24 24"
          aria-label="Wi-Fi"
        >
          <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4zm0 3.5c3.78 0 7.21 1.5 9.73 3.93L12 19.34 2.27 11.43C4.79 9 8.22 7.5 12 7.5z" />
        </svg>

        {/* Battery Icon */}
        <div className="flex items-center ml-0.5" aria-label="Battery 100%">
          <div className="w-[22px] h-[11px] border border-black rounded-[3.5px] p-[1.5px] flex items-center">
            <div className="w-full h-full bg-black rounded-[1.5px]" />
          </div>
          <div className="w-[1.5px] h-[4px] bg-black rounded-r-[1px] ml-[0.5px]" />
        </div>
      </div>
    </div>
  );
};
