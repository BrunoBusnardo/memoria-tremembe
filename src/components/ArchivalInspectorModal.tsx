import React, { useState } from 'react';
import { ArchivalItem } from '../types';

interface ArchivalInspectorModalProps {
  item: ArchivalItem | null;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const ArchivalInspectorModal: React.FC<ArchivalInspectorModalProps> = ({
  item,
  onClose,
  onShowToast,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isInverted, setIsInverted] = useState<boolean>(false);

  if (!item) return null;

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => {
      const next = Math.min(Math.max(0.6, prev + delta), 3.0);
      return Number(next.toFixed(1));
    });
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setIsInverted(false);
  };

  const copyABNT = () => {
    navigator.clipboard.writeText(item.abnt).then(() => {
      onShowToast(`Referência ABNT de [${item.code}] copiada com sucesso!`);
    }).catch(() => {
      onShowToast(`Copiado: ${item.abnt}`);
    });
  };

  const copyDirectImageUrl = () => {
    navigator.clipboard.writeText(item.imageUrl).then(() => {
      onShowToast(`Link direto da imagem em alta resolução copiado!`);
    }).catch(() => {
      onShowToast(`URL da imagem: ${item.imageUrl}`);
    });
  };

  const openDirectImageUrl = () => {
    window.open(item.imageUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#342f30]/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div className="w-full max-w-[1240px] max-h-[92vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-[#dec0bb]">
        
        {/* Modal Topbar */}
        <div className="bg-[#efe6e7] px-4 sm:px-6 py-3 flex items-center justify-between border-b border-[#dec0bb]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#6b0d09] text-[24px]">history_edu</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#775a19] uppercase tracking-wider font-mono">
                  {item.code}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 bg-[#ffdea5] text-[#261900] font-bold rounded">
                  ISAD(G) NÍVEL ITEM
                </span>
              </div>
              <h3 className="font-serif text-base sm:text-lg text-[#1e1b1c] font-bold leading-tight line-clamp-1">
                {item.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={copyDirectImageUrl}
              className="p-1.5 sm:px-2.5 sm:py-1 rounded bg-[#f5eced] hover:bg-[#e9e0e1] text-[#6b0d09] text-xs font-semibold flex items-center gap-1 transition-colors"
              title="Copiar URL direta da imagem original"
            >
              <span className="material-symbols-outlined text-[16px]">link</span>
              <span className="hidden sm:inline">Link Direto</span>
            </button>

            <button
              onClick={openDirectImageUrl}
              className="p-1.5 sm:px-2.5 sm:py-1 rounded bg-[#f5eced] hover:bg-[#e9e0e1] text-[#775a19] text-xs font-semibold flex items-center gap-1 transition-colors"
              title="Abrir imagem em nova guia"
            >
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              <span className="hidden sm:inline">Ver Original</span>
            </button>

            <button
              onClick={() => {
                setIsInverted(!isInverted);
                onShowToast(!isInverted ? 'Modo Alto Contraste ativado' : 'Visualização natural restaurada');
              }}
              className={`p-1.5 rounded transition-colors ${
                isInverted ? 'bg-[#342f30] text-white' : 'hover:bg-[#f5eced] text-[#57423f]'
              }`}
              title="Inverter Contraste para Leitura de Tinta Ferrogálica"
            >
              <span className="material-symbols-outlined text-[18px]">invert_colors</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded hover:bg-[#f5eced] text-[#57423f] hover:text-[#6b0d09] transition-colors"
              title="Fechar (Esc)"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>
        </div>

        {/* Modal Body: Split Canvas & Metadata Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-grow overflow-y-auto min-h-0">
          
          {/* Left: Zoomable Inspection Canvas */}
          <div className="lg:col-span-7 bg-[#3d3231] p-4 flex flex-col items-center justify-center relative min-h-[340px] sm:min-h-[420px] lg:min-h-[520px] overflow-hidden select-none">
            <div 
              className="relative max-w-full max-h-full flex items-center justify-center overflow-auto rounded transition-transform duration-200"
            >
              <img
                src={item.imageUrl}
                alt={item.imageAlt}
                style={{
                  transform: `scale(${zoomLevel})`,
                  filter: isInverted ? 'invert(1) contrast(1.4) brightness(0.95)' : 'none',
                  transition: 'transform 0.2s ease, filter 0.3s ease'
                }}
                className="max-w-full max-h-[460px] object-contain shadow-2xl rounded"
              />
            </div>

            {/* Canvas Floating Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#1e1b1c]/90 text-white px-4 py-1.5 rounded-full shadow-xl flex items-center gap-3 backdrop-blur-sm border border-white/10 z-10">
              <button
                onClick={() => handleZoom(-0.2)}
                className="hover:text-[#ffdea5] transition-colors p-1"
                title="Diminuir Zoom"
              >
                <span className="material-symbols-outlined text-[18px]">zoom_out</span>
              </button>
              <span className="font-mono text-xs font-bold w-12 text-center text-[#ffdea5]">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => handleZoom(0.2)}
                className="hover:text-[#ffdea5] transition-colors p-1"
                title="Aumentar Zoom"
              >
                <span className="material-symbols-outlined text-[18px]">zoom_in</span>
              </button>
              <span className="w-px h-3 bg-white/20"></span>
              <button
                onClick={handleResetZoom}
                className="hover:text-[#ffdea5] transition-colors p-1"
                title="Ajustar à Tela"
              >
                <span className="material-symbols-outlined text-[18px]">fit_screen</span>
              </button>
            </div>
          </div>

          {/* Right: Archival Metadata Ledger & Paleographic Transcription */}
          <div className="lg:col-span-5 p-4 sm:p-6 flex flex-col gap-4 bg-[#fbf1f2] overflow-y-auto">
            {/* Metatags Pill Group */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="px-2 py-0.5 bg-[#8b261d] text-white text-[11px] font-bold rounded uppercase tracking-wider">
                {item.category === 'photo' ? 'FOTOGRAFIA HISTÓRICA' : item.category === 'map' ? 'CARTOGRAFIA' : item.category === 'audio' ? 'MEMÓRIA ORAL' : 'DOCUMENTO TEXTUAL'}
              </span>
              <span className="px-2 py-0.5 bg-[#e9e0e1] text-[#1e1b1c] text-[11px] font-bold rounded">
                ANO: {item.year}
              </span>
              {item.isRare && (
                <span className="px-2 py-0.5 bg-[#ba1a1a] text-white text-[11px] font-bold rounded animate-pulse">
                  RARIDADE ABSOLUTA
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#775a19] font-bold block mb-1">
                Ementa / Resumo Historiográfico
              </span>
              <p className="text-sm text-[#1e1b1c] leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Metadata Key-Value Table from Spreadsheet */}
            <div className="bg-white p-3 rounded-lg shadow-xs border border-[#dec0bb]/60">
              <span className="text-[11px] uppercase tracking-wider text-[#6b0d09] font-bold block mb-2">
                Ficha Técnica do Catálogo • Coleção José Manfredini
              </span>
              <div className="flex flex-col gap-1.5 text-xs text-[#1e1b1c]">
                <div className="flex justify-between py-0.5 border-b border-[#f5eced]">
                  <span className="text-[#57423f]">Código de Referência:</span>
                  <span className="font-mono font-bold text-[#6b0d09]">{item.code}</span>
                </div>
                {item.nomeArquivo && (
                  <div className="flex justify-between py-0.5 border-b border-[#f5eced]">
                    <span className="text-[#57423f]">Nome do Arquivo:</span>
                    <span className="font-mono text-[11px] text-right text-[#57423f]">{item.nomeArquivo}</span>
                  </div>
                )}
                <div className="flex justify-between py-0.5 border-b border-[#f5eced]">
                  <span className="text-[#57423f]">Coleção:</span>
                  <span className="font-semibold text-right max-w-[240px] truncate">{item.colecao || item.fundo}</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-[#f5eced]">
                  <span className="text-[#57423f]">Procedência:</span>
                  <span className="font-semibold text-right">{item.procedencia || item.localizacao}</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-[#f5eced]">
                  <span className="text-[#57423f]">Fotógrafo:</span>
                  <span className="font-semibold text-right text-[#775a19]">{item.fotografo || 'Desconhecido'}</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-[#f5eced]">
                  <span className="text-[#57423f]">Ano / Datação:</span>
                  <span className="font-semibold text-right">{item.year}</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-[#57423f]">Técnica:</span>
                  <span className="font-semibold text-right max-w-[240px] truncate">{item.tecnica || item.suporte}</span>
                </div>
              </div>
            </div>

            {/* Diplomatic Transcription Panel */}
            <div className="bg-white p-3 rounded-lg shadow-xs border border-[#dec0bb]/60">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] uppercase tracking-wider text-[#6b0d09] font-bold">
                  Transcrição Diplomática / Notas de Campo
                </span>
                <span className="text-[10px] font-bold bg-[#ffdea5] text-[#261900] px-1.5 py-0.5 rounded">
                  {item.conditionStatus || 'Revisada'}
                </span>
              </div>
              <div className="p-2.5 bg-[#fbf1f2] rounded font-serif text-sm italic text-[#57423f] leading-relaxed border-l-2 border-[#8b261d]">
                {item.transcription}
              </div>
            </div>

            {/* Citation Block (ABNT) */}
            <div className="bg-[#f5eced] p-3 rounded-lg border border-[#dec0bb]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase text-[#1e1b1c]">
                  Referência Normativa (ABNT NBR 6023)
                </span>
                <button
                  onClick={copyABNT}
                  className="text-[#6b0d09] hover:text-[#8b261d] text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-[14px]">content_copy</span>
                  <span>Copiar</span>
                </button>
              </div>
              <p className="font-mono text-xs text-[#57423f] leading-normal select-all">
                {item.abnt}
              </p>
            </div>

            {/* Action Bar inside Modal */}
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
              <button
                onClick={() => {
                  onShowToast(`Download do artefato [${item.code}] em formato de preservação iniciado.`);
                }}
                className="w-full sm:flex-1 py-2.5 px-3 bg-[#6b0d09] hover:bg-[#8b261d] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">file_download</span>
                <span>Baixar {item.downloadType || 'TIFF (600 DPI)'}</span>
              </button>

              <button
                onClick={openDirectImageUrl}
                className="w-full sm:w-auto py-2.5 px-3 bg-white hover:bg-[#efe6e7] text-[#775a19] text-xs sm:text-sm font-semibold rounded-lg border border-[#dec0bb] transition-colors flex items-center justify-center gap-1"
                title="Abrir o link direto da imagem no navegador"
              >
                <span className="material-symbols-outlined text-[16px]">image</span>
                <span>Ver Imagem (URL)</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
