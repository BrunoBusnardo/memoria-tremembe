import React from 'react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
  icon?: string;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose, icon = 'check_circle' }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-[#342f30] text-[#f8efef] px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3 font-sans text-sm animate-bounce-short border border-[#8b716e]/40">
      <span className="material-symbols-outlined text-[#ffdea5] text-[20px]">{icon}</span>
      <span className="leading-snug">{message}</span>
      <button 
        onClick={onClose}
        className="ml-2 text-[#f8efef]/60 hover:text-white transition-colors"
        title="Fechar notificação"
      >
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  );
};
