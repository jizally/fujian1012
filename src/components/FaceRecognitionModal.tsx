import React, { useState, useEffect, useRef } from 'react';
import { X, ShieldCheck, CheckCircle2, RefreshCw, UserCheck } from 'lucide-react';
import type { FaceAuthData } from '../types.ts';

interface FaceRecognitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: FaceAuthData) => void;
  legalPersonName?: string;
}

export const FaceRecognitionModal: React.FC<FaceRecognitionModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  legalPersonName = '孙刚',
}) => {
  const [step, setStep] = useState<'ready' | 'scanning' | 'verifying' | 'success'>('ready');
  const [subPrompt, setSubPrompt] = useState('请保持面部处于取景框内');
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);

  // Clean state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('ready');
      setProgress(0);
      setSubPrompt('请保持面部处于取景框内');
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const startCamera = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 480 }, height: { ideal: 480 } },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraActive(true);
        }
      }
    } catch {
      // Camera permission or hardware unavailable, fallback to biometric simulation
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  const runDetection = () => {
    setStep('scanning');
    setSubPrompt('请平视摄像头，保持光线均匀');
    setProgress(20);

    setTimeout(() => {
      setSubPrompt('活体检测中：请缓慢眨眨眼');
      setProgress(50);
    }, 1200);

    setTimeout(() => {
      setSubPrompt('请缓慢向左转头，再转回正中');
      setProgress(75);
    }, 2400);

    setTimeout(() => {
      setStep('verifying');
      setSubPrompt('正在连接全国公民身份认证数据库核验中...');
      setProgress(95);
    }, 3600);

    setTimeout(() => {
      setStep('success');
      setProgress(100);
      setSubPrompt('人脸核验通过，公安信息比对一致');
      stopCamera();

      setTimeout(() => {
        onSuccess({
          status: 'success',
          isVerified: true,
          name: legalPersonName,
          idCard: '110108********1234',
          verifiedAt: new Date().toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        });
        onClose();
      }, 1400);
    }, 4800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-sm bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center p-6 relative border border-slate-800">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Security badge header */}
        <div className="flex items-center gap-1.5 text-xs text-blue-400 bg-blue-950/80 border border-blue-800/60 px-3 py-1 rounded-full mb-6">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>公安部全国公民身份信息核验安全通道</span>
        </div>

        {/* Target name */}
        <div className="text-center mb-5">
          <h3 className="text-lg font-semibold tracking-wide">CA实名身份认证</h3>
          <p className="text-xs text-slate-400 mt-1">
            待核验人员：
            <span className="text-white font-medium">{legalPersonName}</span>
            （法定代表人）
          </p>
        </div>

        {/* Face circle container */}
        <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-[#1677ff] shadow-[0_0_30px_rgba(22,119,255,0.4)] flex items-center justify-center bg-slate-950">
          {cameraActive ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover scale-x-[-1]"
            />
          ) : (
            /* Biometric silhouette avatar when camera not used */
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-800 to-slate-950 text-slate-400">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-blue-400/50 flex items-center justify-center mb-2">
                <UserCheck className="w-12 h-12 text-blue-400/80" />
              </div>
              <span className="text-[11px] text-slate-400">智能生物识别模拟取景</span>
            </div>
          )}

          {/* Oval face guide wireframe */}
          <div className="absolute inset-4 rounded-full border-2 border-blue-400/40 pointer-events-none flex items-center justify-center">
            {/* Crosshairs */}
            <div className="w-full h-[1px] bg-blue-400/20" />
            <div className="absolute h-full w-[1px] bg-blue-400/20" />
          </div>

          {/* Scanning radar line animation */}
          {step === 'scanning' && (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1677ff]/30 to-transparent animate-pulse pointer-events-none" />
          )}

          {/* Success overlay check */}
          {step === 'success' && (
            <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-xs flex flex-col items-center justify-center animate-in zoom-in-75">
              <CheckCircle2 className="w-16 h-16 text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-300 mt-2">
                认证成功
              </span>
            </div>
          )}
        </div>

        {/* Live Prompt */}
        <div className="mt-6 text-center h-14 flex flex-col items-center justify-center">
          <p className="text-sm font-medium text-slate-200">{subPrompt}</p>
          {step === 'verifying' && (
            <div className="flex items-center gap-1.5 text-xs text-blue-400 mt-1">
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span>公安部可信数据通道校验中</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2 mb-6">
          <div
            className="bg-[#1677ff] h-full transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Action Button */}
        {step === 'ready' ? (
          <button
            type="button"
            onClick={runDetection}
            className="w-full py-3 rounded-full bg-[#1677ff] hover:bg-[#1890ff] text-white font-medium text-sm transition cursor-pointer shadow-lg shadow-blue-500/20 active:scale-98"
          >
            开始人脸活体扫描
          </button>
        ) : step === 'scanning' || step === 'verifying' ? (
          <div className="text-xs text-slate-400 flex items-center gap-1.5 py-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>人脸识别处理中，请勿遮挡面部...</span>
          </div>
        ) : (
          <div className="text-xs text-emerald-400 py-3 font-medium">
            实名认证已完成，正在同步结果...
          </div>
        )}
      </div>
    </div>
  );
};
