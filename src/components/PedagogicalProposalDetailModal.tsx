import React from 'react';
import { PedagogicalProposal, NavScreen } from '../types';

interface PedagogicalProposalDetailModalProps {
  proposal: PedagogicalProposal | null;
  onClose: () => void;
  onNavigate?: (screen: NavScreen) => void;
  onShowToast: (msg: string) => void;
}

export const PedagogicalProposalDetailModal: React.FC<PedagogicalProposalDetailModalProps> = ({
  proposal,
  onClose,
  onNavigate,
  onShowToast,
}) => {
  if (!proposal) return null;

  const handleCopyReference = () => {
    const text = `${proposal.autor.toUpperCase()}. ${proposal.titulo}. Proposta Pedagógica (${proposal.segmento} - ${proposal.disciplina}). Tremembé: Estação da Memória, ${proposal.dataPublicacao}.`;
    navigator.clipboard.writeText(text);
    onShowToast('Referência pedagógica copiada para a área de transferência!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#342f30]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="w-full max-w-[900px] max-h-[92vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-[#dec0bb]">
        
        {/* Topbar */}
        <div className="bg-[#efe6e7] px-4 sm:px-6 py-4 flex items-center justify-between border-b border-[#dec0bb]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#8b261d] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[22px]">menu_book</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#775a19] uppercase tracking-wider font-mono">
                  {proposal.codigo}
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-[#ffdea5] text-[#261900] font-bold rounded">
                  {proposal.segmento}
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-[#f5eced] text-[#6b0d09] font-bold rounded border border-[#dec0bb]/60">
                  {proposal.disciplina}
                </span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl text-[#1e1b1c] font-bold leading-tight mt-0.5">
                {proposal.titulo}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#dec0bb]/50 text-[#57423f] hover:text-[#6b0d09] transition-colors"
            title="Fechar"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-[#1e1b1c]">
          
          {/* Card de Autoria & Curadoria */}
          <div className="p-4 rounded-xl bg-[#fbf1f2] border border-[#dec0bb] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#dec0bb] flex items-center justify-center text-[#6b0d09] font-bold font-serif">
                {proposal.autor.charAt(0)}
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-[#775a19] tracking-wider block">
                  Autoria Docente
                </span>
                <span className="font-bold text-sm sm:text-base text-[#1e1b1c] block">
                  {proposal.autor}
                </span>
                <span className="text-xs text-[#57423f]">
                  {proposal.escola}
                </span>
              </div>
            </div>

            <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-[#dec0bb]">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#6b0d09] bg-white px-2.5 py-1 rounded-full border border-[#dec0bb]">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                <span>{proposal.publicadoPor}</span>
              </span>
              <span className="text-[11px] text-[#57423f] block mt-1">
                Datação: {proposal.dataPublicacao}
              </span>
            </div>
          </div>

          {/* Resumo & Objetivo Central */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-[#6b0d09] flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#775a19]">description</span>
              <span>Visão Geral &amp; Objetivo de Aprendizagem</span>
            </h4>
            <p className="text-sm text-[#57423f] leading-relaxed">
              {proposal.resumoProposta}
            </p>
            <div className="p-3.5 rounded-lg bg-[#f5eced] border border-[#dec0bb]/60">
              <span className="text-xs font-bold text-[#775a19] uppercase tracking-wider block mb-1">
                Objetivo Geral da Proposta:
              </span>
              <p className="text-xs sm:text-sm text-[#1e1b1c] font-medium leading-relaxed">
                {proposal.objetivoGeral}
              </p>
            </div>
          </div>

          {/* Habilidades BNCC & Fontes do Acervo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white border border-[#dec0bb] flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#775a19] uppercase tracking-wider block mb-2">
                  Habilidades BNCC Articuladas
                </span>
                <div className="flex flex-wrap gap-2 mb-2">
                  {proposal.habilidadesBNCC.map((hab, i) => (
                    <span key={i} className="px-2 py-1 rounded bg-[#efe6e7] text-[#6b0d09] font-mono text-xs font-bold">
                      {hab}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-[#57423f]">
                  Tema: <strong>{proposal.temaPatrimonio}</strong>
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#dec0bb] flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#775a19] uppercase tracking-wider block mb-2">
                  Fontes Históricas do Acervo
                </span>
                <p className="text-xs text-[#57423f] leading-relaxed">
                  {proposal.fontesAcervo}
                </p>
              </div>
              {onNavigate && (
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('acervo-digital');
                  }}
                  className="mt-3 text-xs text-[#6b0d09] font-bold hover:underline flex items-center gap-1 self-start"
                >
                  <span className="material-symbols-outlined text-[16px]">photo_library</span>
                  <span>Consultar fotografias no Acervo Digital</span>
                </button>
              )}
            </div>
          </div>

          {/* Metodologia Passo a Passo */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-[#6b0d09] flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#775a19]">format_list_numbered</span>
              <span>Encaminhamento Metodológico em Sala de Aula</span>
            </h4>
            <div className="space-y-2.5">
              {proposal.etapasMetodologia.map((etapa, idx) => (
                <div key={idx} className="p-3.5 rounded-lg bg-[#fbf1f2] border border-[#dec0bb]/60 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#6b0d09] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-bold text-[#1e1b1c]">{etapa.fase}</span>
                      <span className="text-[11px] font-mono text-[#775a19] font-semibold">{etapa.duracao}</span>
                    </div>
                    <p className="text-xs text-[#57423f] leading-relaxed">{etapa.descricao}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Produção Final dos Alunos */}
          <div className="p-4 rounded-xl bg-[#ffdea5]/25 border border-[#ffdea5] flex items-start gap-3">
            <span className="material-symbols-outlined text-[#775a19] text-[22px] flex-shrink-0 mt-0.5">
              workspace_premium
            </span>
            <div>
              <span className="text-xs uppercase font-bold text-[#775a19] tracking-wider block">
                Produção Esperada dos Estudantes
              </span>
              <p className="text-xs sm:text-sm text-[#1e1b1c] leading-relaxed font-medium mt-0.5">
                {proposal.producaoFinal}
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-[#efe6e7] px-4 sm:px-6 py-3 border-t border-[#dec0bb] flex flex-wrap items-center justify-between gap-2">
          <button
            onClick={handleCopyReference}
            className="px-3.5 py-2 rounded bg-white hover:bg-[#fbf1f2] text-[#6b0d09] text-xs font-semibold border border-[#dec0bb] flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">content_copy</span>
            <span>Copiar Referência da Proposta</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-[#6b0d09] hover:bg-[#8b261d] text-white text-xs font-semibold transition-colors"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
