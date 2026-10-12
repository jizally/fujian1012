import React from 'react';

interface CameraPlusIconProps {
  className?: string;
}

export const CameraPlusIcon: React.FC<CameraPlusIconProps> = ({ className = 'w-12 h-12' }) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Camera outline */}
      <svg
        viewBox="0 0 48 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-[#384252]"
      >
        {/* Top flash / prism bulge */}
        <path
          d="M17 6L19.5 2.5C20 1.8 20.8 1.5 21.6 1.5H26.4C27.2 1.5 28 1.8 28.5 2.5L31 6H40C42.2 6 44 7.8 44 10V33C44 35.2 42.2 37 40 37H10C7.8 37 6 35.2 6 33V10C6 7.8 7.8 6 10 6H17Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Center lens circle */}
        <circle
          cx="24"
          cy="21.5"
          r="8"
          stroke="currentColor"
          strokeWidth="2.5"
        />
      </svg>

      {/* Blue Plus sign at bottom right */}
      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-[2px] shadow-xs">
        <svg
          viewBox="0 0 16 16"
          fill="none"
          className="w-4 h-4 text-[#1677ff]"
        >
          <circle cx="8" cy="8" r="7" fill="#1677ff" />
          <path
            d="M8 4.5V11.5M4.5 8H11.5"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};
