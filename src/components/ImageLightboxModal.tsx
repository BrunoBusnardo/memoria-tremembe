import React, { useState } from 'react';

interface ImageLightboxModalProps {
  isOpen: boolean;
  imageUrl: string;
  title: string;
  altText: string;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  isOpen,
  imageUrl,
  title,
  altText,
  onClose,
  onShowToast,
}) => {
  const [zoom, setZoom] = useState<number>(1);

  if (!isOpen) return null;

  const copyLink = () => {
    navigator.clipboard.writeText(imageUrl).then(() => {
      onShowToast('Link direto da imagem copiado para a área de transferência!');
    }).catch(() => {
      onShowToast(`Link: ${imageUrl}`);
    });
  };

  const openInNewTab = () => {
    window.open(imageUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1e1b1c]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="w-full max-w-[1100px] max-h-[92vh] bg-[#fff8f8] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-[#dec0bb]">
        
        {/* Top bar */}
        <div className="bg-[#efe6e7] px-4 py-3 flex items-center justify-between border-b border-[#dec0bb]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#6b0d09] text-[20px]">photo_camera</span>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#775a19] tracking-wider block">
                Acervo Iconográfico &amp; Fototeca Digital
              </span>
              <h4 className="font-serif text-sm sm:text-base font-bold text-[#1e1b1c] truncate max-w-[500px]">
                {title || 'Fotografia Histórica'}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyLink}
              className="px-2.5 py-1 bg-white hover:bg-[#f5eced] text-[#6b0d09] text-xs font-semibold rounded border border-[#dec0bb] flex items-center gap-1 transition-colors"
              title="Copiar URL direta da imagem"
            >
              <span className="material-symbols-outlined text-[15px]">link</span>
              <span className="hidden sm:inline">Copiar Link Direto</span>
            </button>

            <button
              onClick={openInNewTab}
              className="px-2.5 py-1 bg-[#8b261d] hover:bg-[#6b0d09] text-white text-xs font-semibold rounded flex items-center gap-1 transition-colors"
              title="Abrir imagem em alta resolução em nova aba"
            >
              <span className="material-symbols-outlined text-[15px]">open_in_new</span>
              <span className="hidden sm:inline">Abrir Original</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded text-[#57423f] hover:bg-[#dec0bb] hover:text-[#1e1b1c] transition-colors"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>
        </div>

        {/* Image viewport */}
        <div className="relative flex-grow bg-[#231f20] p-4 flex items-center justify-center min-h-[350px] overflow-hidden select-none">
          <img
            src={imageUrl}
            alt={altText || title}
            style={{
              transform: `scale(${zoom})`,
              transition: 'transform 0.2s ease-out',
            }}
            className="max-w-full max-h-[58vh] object-contain shadow-2xl rounded"
          />

          {/* Floating zoom control */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#1e1b1c]/85 text-white px-3 py-1 rounded-full flex items-center gap-3 backdrop-blur-sm border border-white/15 text-xs font-mono">
            <button 
              onClick={() => setZoom(Math.max(0.6, Number((zoom - 0.2).toFixed(1))))}
              className="hover:text-[#ffdea5] p-0.5"
            >
              <span className="material-symbols-outlined text-[16px]">zoom_out</span>
            </button>
            <span className="w-12 text-center text-[#ffdea5] font-bold">
              {Math.round(zoom * 100)}%
            </span>
            <button 
              onClick={() => setZoom(Math.min(2.8, Number((zoom + 0.2).toFixed(1))))}
              className="hover:text-[#ffdea5] p-0.5"
            >
              <span className="material-symbols-outlined text-[16px]">zoom_in</span>
            </button>
            <span className="w-px h-3 bg-white/20"></span>
            <button 
              onClick={() => setZoom(1)}
              className="hover:text-[#ffdea5] p-0.5"
            >
              <span className="material-symbols-outlined text-[16px]">fit_screen</span>
            </button>
          </div>
        </div>

        {/* Footer info and direct URL display */}
        <div className="bg-[#fbf1f2] px-4 py-3 border-t border-[#dec0bb] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex flex-col text-xs text-[#57423f] max-w-[650px]">
            <span className="font-semibold text-[#1e1b1c]">Legenda &amp; Acessibilidade:</span>
            <p className="line-clamp-2 italic">{altText}</p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <div className="text-[11px] font-mono bg-white px-2 py-1 rounded border border-[#dec0bb] text-[#57423f] max-w-[200px] truncate hidden md:block">
              {imageUrl}
            </div>
            <button
              onClick={copyLink}
              className="px-3 py-1.5 bg-[#775a19] hover:bg-[#5d4201] text-white text-xs font-semibold rounded flex items-center gap-1 shadow-xs"
            >
              <span className="material-symbols-outlined text-[15px]">content_copy</span>
              <span>Copiar URL</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
