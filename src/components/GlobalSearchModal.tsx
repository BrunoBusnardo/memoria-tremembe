import React, { useState, useEffect, useRef } from 'react';
import { archivalItems, featuredDocument } from '../data/acervoData';
import { historyModules } from '../data/historyData';
import { lessonPlans } from '../data/pedagogicalData';
import { NavScreen, ArchivalItem } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: NavScreen) => void;
  onSelectDoc: (item: ArchivalItem) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectDoc,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const allItems = [featuredDocument, ...archivalItems];

  const matchedDocs = normalizedQuery
    ? allItems.filter(
        (doc) =>
          doc.title.toLowerCase().includes(normalizedQuery) ||
          doc.code.toLowerCase().includes(normalizedQuery) ||
          doc.description.toLowerCase().includes(normalizedQuery) ||
          (doc.descricaoAnalitica && doc.descricaoAnalitica.toLowerCase().includes(normalizedQuery)) ||
          (doc.nomeArquivo && doc.nomeArquivo.toLowerCase().includes(normalizedQuery)) ||
          (doc.fotografo && doc.fotografo.toLowerCase().includes(normalizedQuery)) ||
          doc.fundo.toLowerCase().includes(normalizedQuery)
      )
    : allItems.slice(0, 4);

  const matchedHistory = normalizedQuery
    ? historyModules.filter(
        (mod) =>
          mod.titulo.toLowerCase().includes(normalizedQuery) ||
          mod.subtitulo.toLowerCase().includes(normalizedQuery) ||
          mod.periodo.toLowerCase().includes(normalizedQuery) ||
          mod.codigoFoto.toLowerCase().includes(normalizedQuery)
      )
    : historyModules.slice(0, 3);

  const matchedLessons = normalizedQuery
    ? lessonPlans.filter(
        (plan) =>
          plan.titulo.toLowerCase().includes(normalizedQuery) ||
          plan.codigo.toLowerCase().includes(normalizedQuery) ||
          plan.habilidadesBNCC.some((h) => h.toLowerCase().includes(normalizedQuery)) ||
          plan.objetivoCentral.toLowerCase().includes(normalizedQuery)
      )
    : lessonPlans.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 bg-[#1e1b1c]/80 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6 animate-fadeIn">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden border border-[#dec0bb] flex flex-col max-h-[80vh]">
        
        {/* Search header */}
        <div className="p-4 bg-[#fbf1f2] border-b border-[#dec0bb] flex items-center gap-3">
          <span className="material-symbols-outlined text-[#6b0d09] text-[22px]">manage_search</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar por trem, estação, trapistas, bom jesus, 1914, BNCC..."
            className="w-full bg-transparent text-sm sm:text-base text-[#1e1b1c] placeholder:text-[#57423f]/60 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#57423f] hover:text-[#1e1b1c] p-1"
            >
              <span className="material-symbols-outlined text-[18px]">clear</span>
            </button>
          )}
          <kbd className="text-[10px] font-mono text-[#57423f] bg-[#efe6e7] px-1.5 py-0.5 rounded border border-[#dec0bb]">
            ESC
          </kbd>
        </div>

        {/* Results container */}
        <div className="overflow-y-auto p-4 flex flex-col gap-5 text-[#1e1b1c]">
          
          {/* Archival documents section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#775a19] uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">inventory_2</span>
                Acervo Digital ({matchedDocs.length})
              </span>
              <button
                onClick={() => {
                  onNavigate('acervo-digital');
                  onClose();
                }}
                className="text-[11px] text-[#6b0d09] hover:underline font-semibold"
              >
                Ver tudo no Acervo
              </button>
            </div>
            
            {matchedDocs.length === 0 ? (
              <p className="text-xs text-[#57423f] italic py-1">Nenhum documento encontrado no acervo.</p>
            ) : (
              <div className="flex flex-col gap-1.5">
                {matchedDocs.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => {
                      onSelectDoc(doc);
                      onClose();
                    }}
                    className="p-2.5 rounded-lg bg-[#fff8f8] hover:bg-[#f5eced] border border-[#dec0bb]/60 cursor-pointer flex items-center justify-between gap-3 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <img
                        src={doc.imageUrl}
                        alt={doc.imageAlt}
                        className="w-10 h-10 object-cover rounded flex-shrink-0 border border-[#dec0bb]"
                      />
                      <div className="flex flex-col truncate">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono font-bold text-[#8b261d]">
                            {doc.code}
                          </span>
                          <span className="text-[10px] text-[#57423f]">• {doc.year}</span>
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-[#1e1b1c] group-hover:text-[#6b0d09] truncate">
                          {doc.title}
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[18px] text-[#57423f]/50 group-hover:text-[#6b0d09]">
                      arrow_forward
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* History modules section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#775a19] uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">history_edu</span>
                Módulos Historiográficos ({matchedHistory.length})
              </span>
              <button
                onClick={() => {
                  onNavigate('historia-de-tremembe');
                  onClose();
                }}
                className="text-[11px] text-[#6b0d09] hover:underline font-semibold"
              >
                Ver Ensaio Completo
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              {matchedHistory.map((mod) => (
                <div
                  key={mod.id}
                  onClick={() => {
                    onNavigate('historia-de-tremembe');
                    onClose();
                  }}
                  className="p-2.5 rounded-lg bg-[#fff8f8] hover:bg-[#f5eced] border border-[#dec0bb]/60 cursor-pointer flex items-center justify-between gap-2 transition-colors group"
                >
                  <div className="flex flex-col truncate">
                    <span className="text-[10px] uppercase font-bold text-[#775a19]">
                      Módulo {mod.numero} • {mod.periodo}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[#1e1b1c] group-hover:text-[#6b0d09] truncate">
                      {mod.titulo}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[18px] text-[#57423f]/50 group-hover:text-[#6b0d09]">
                    arrow_forward
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pedagogical section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#775a19] uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">school</span>
                Planos de Aula &amp; BNCC ({matchedLessons.length})
              </span>
              <button
                onClick={() => {
                  onNavigate('espaco-do-professor');
                  onClose();
                }}
                className="text-[11px] text-[#6b0d09] hover:underline font-semibold"
              >
                Ver Espaço do Professor
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              {matchedLessons.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => {
                    onNavigate('espaco-do-professor');
                    onClose();
                  }}
                  className="p-2.5 rounded-lg bg-[#fff8f8] hover:bg-[#f5eced] border border-[#dec0bb]/60 cursor-pointer flex items-center justify-between gap-2 transition-colors group"
                >
                  <div className="flex flex-col truncate">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold text-[#775a19]">{plan.codigo}</span>
                      <span className="text-[10px] text-[#57423f]">({plan.habilidadesBNCC.join(', ')})</span>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-[#1e1b1c] group-hover:text-[#6b0d09] truncate">
                      {plan.titulo}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[18px] text-[#57423f]/50 group-hover:text-[#6b0d09]">
                    arrow_forward
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-[#efe6e7] px-4 py-2 border-t border-[#dec0bb] flex items-center justify-between text-[11px] text-[#57423f]">
          <span>Dica: Use <strong>Enter</strong> para selecionar ou <strong>Esc</strong> para fechar</span>
          <span className="font-semibold text-[#6b0d09]">Estação da Memória • Tremembé</span>
        </div>

      </div>
    </div>
  );
};
