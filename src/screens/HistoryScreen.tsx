import React, { useState } from 'react';
import { NavScreen, ArchivalItem } from '../types';
import { historyModules, cronologiaConsolidada } from '../data/historyData';
import { archivalItems } from '../data/acervoData';

interface HistoryScreenProps {
  onNavigate: (screen: NavScreen) => void;
  onInspectDoc: (item: ArchivalItem) => void;
  onOpenImage: (url: string, title: string, alt: string) => void;
  onShowToast: (msg: string) => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  onNavigate,
  onInspectDoc,
  onOpenImage,
  onShowToast,
}) => {
  const [activeModuleId, setActiveModuleId] = useState<string>('modulo-1');
  // Track expanded state for each chapter's "Continue lendo" button
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  const toggleExpand = (modId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  const scrollToModule = (id: string) => {
    setActiveModuleId(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSourceClick = (docId?: string) => {
    if (docId) {
      const found = archivalItems.find((item) => item.id === docId || item.code === docId);
      if (found) {
        onInspectDoc(found);
        return;
      }
    }
    onNavigate('acervo-digital');
  };

  return (
    <div className="flex flex-col w-full animate-fadeIn">
      {/* Editorial Header Ribbon */}
      <section className="relative w-full bg-[#fbf1f2] px-4 md:px-6 lg:px-8 py-10 overflow-hidden shadow-xs border-b border-[#dec0bb]/60">
        <div className="absolute -right-16 -bottom-16 w-96 h-96 rounded-full bg-[#ffdea5]/20 blur-3xl pointer-events-none"></div>
        <div className="max-w-[1360px] mx-auto flex flex-col gap-4 relative z-10">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 bg-[#6b0d09] text-white text-[10px] font-bold rounded uppercase tracking-wider">
              Eixo Historiográfico I
            </span>
            <span className="text-[#57423f] text-xs font-mono">
              SÉRIE DOCUMENTAL VALE DO PARAÍBA PAULISTA
            </span>
            <span className="text-[#775a19] text-xs font-mono font-bold">
              • CUSTÓDIA ARQUIVÍSTICA NPH/UNITAU
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8 flex flex-col gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#6b0d09] tracking-tight leading-tight font-bold">
                História de Tremembé: Estudo Historiográfico e Documental Completo
              </h1>
              <p className="text-sm sm:text-base text-[#57423f] max-w-3xl leading-relaxed">
                Reconstrução minuciosa, sistemática e academicamente fundamentada da evolução territorial, eclesiástica, política, socioeconômica e infraestrutural do município de Tremembé (SP), cobrindo o arco temporal que se estende do século XVII até meados do século XX.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-end bg-[#f5eced] p-4 rounded-xl shadow-xs border border-[#dec0bb]">
              <div className="flex items-center gap-1.5 text-[#775a19] mb-1">
                <span className="material-symbols-outlined text-[18px]">auto_stories</span>
                <span className="text-xs font-mono uppercase tracking-wider font-bold">
                  Ficha Técnica do Ensaio
                </span>
              </div>
              <p className="text-xs text-[#1e1b1c] font-semibold">Coordenação: Núcleo de Pesquisa Histórica</p>
              <p className="text-[11px] text-[#57423f]">Metodologia: Fontes Primárias, Cartoriais e Bibliografia Acadêmica</p>
              
              <div className="mt-2 pt-2 border-t border-[#dec0bb]/60 flex items-center justify-between text-xs text-[#6b0d09] font-bold">
                <span>5 CAPÍTULOS + CRONOLOGIA</span>
                <span className="flex items-center gap-1 text-[#775a19]">
                  <span className="material-symbols-outlined text-[14px]">history</span>
                  1628 – 1972
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Layout with Sticky Sidebar */}
      <section className="max-w-[1360px] mx-auto w-full px-4 md:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sticky Summary Index Sidebar (4 cols) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28">
            <div className="bg-[#fbf1f2] p-4 rounded-xl shadow-xs border border-[#dec0bb] flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#dec0bb]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#6b0d09] text-[20px]">sort</span>
                  <span className="text-xs uppercase tracking-widest text-[#6b0d09] font-bold">
                    Sumário dos Capítulos
                  </span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 bg-[#ffdea5] text-[#261900] font-bold rounded">
                  CRONOLÓGICO
                </span>
              </div>

              <nav className="flex flex-col gap-1.5">
                {historyModules.map((mod) => {
                  const isActive = activeModuleId === mod.id;
                  return (
                    <button
                      key={mod.id}
                      onClick={() => scrollToModule(mod.id)}
                      className={`text-left group flex items-start gap-2.5 p-2.5 rounded-lg transition-all border ${
                        isActive
                          ? 'bg-[#efe6e7] border-[#8b261d] shadow-xs'
                          : 'bg-white hover:bg-[#f5eced] border-transparent'
                      }`}
                    >
                      <span className={`text-[11px] font-bold px-1.5 py-0.2 rounded mt-0.5 ${
                        isActive ? 'bg-[#8b261d] text-white' : 'bg-[#e9e0e1] text-[#57423f]'
                      }`}>
                        {mod.numero}
                      </span>
                      <div className="flex flex-col">
                        <span className={`font-serif text-sm font-semibold leading-snug ${
                          isActive ? 'text-[#6b0d09]' : 'text-[#1e1b1c] group-hover:text-[#6b0d09]'
                        }`}>
                          {mod.titulo.split(':')[0]}
                        </span>
                        <span className="text-[11px] text-[#57423f] truncate max-w-[200px]">
                          {mod.subtitulo}
                        </span>
                      </div>
                    </button>
                  );
                })}

                {/* Botão de navegação para a Cronologia */}
                <button
                  onClick={() => scrollToModule('cronologia')}
                  className={`text-left group flex items-start gap-2.5 p-2.5 rounded-lg transition-all border ${
                    activeModuleId === 'cronologia'
                      ? 'bg-[#efe6e7] border-[#8b261d] shadow-xs'
                      : 'bg-[#fffcf7] hover:bg-[#f5eced] border-transparent'
                  }`}
                >
                  <span className={`text-[11px] font-bold px-1.5 py-0.2 rounded mt-0.5 ${
                    activeModuleId === 'cronologia' ? 'bg-[#8b261d] text-white' : 'bg-[#fed488] text-[#6b0d09]'
                  }`}>
                    VI
                  </span>
                  <div className="flex flex-col">
                    <span className="font-serif text-sm font-semibold leading-snug text-[#6b0d09]">
                      Cronologia
                    </span>
                    <span className="text-[11px] text-[#57423f]">
                      Tabela Consolidada (1628–1972)
                    </span>
                  </div>
                </button>
              </nav>

              <div className="p-3 bg-[#f5eced] rounded-lg border border-[#dec0bb]/60 flex flex-col gap-1">
                <span className="text-[10px] uppercase text-[#775a19] font-bold tracking-wider">
                  Instrumentos de Pesquisa
                </span>
                <p className="text-xs text-[#57423f] leading-relaxed">
                  Todas as referências contam com código de identificação do acervo documental para consulta física ou digital.
                </p>
                <div 
                  onClick={() => onShowToast('Normas de transcrição paleográfica: Regras da Associação dos Arquivistas Brasileiros (AAB).')}
                  className="flex items-center gap-1 text-[#6b0d09] text-xs font-bold pt-1 cursor-pointer hover:underline"
                >
                  <span className="material-symbols-outlined text-[16px]">help_center</span>
                  Guia de Normas Paleográficas
                </div>
              </div>
            </div>
          </aside>

          {/* Articles Flow (8 cols) */}
          <main className="lg:col-span-8 flex flex-col gap-12 min-w-0">
            {historyModules.map((mod) => {
              const isExpanded = !!expandedModules[mod.id];
              // First 2 paragraphs are shown initially
              const initialParagraphs = mod.paragrafos.slice(0, 2);
              const remainingParagraphs = mod.paragrafos.slice(2);
              const hasMoreContent = remainingParagraphs.length > 0;

              return (
                <article
                  key={mod.id}
                  id={mod.id}
                  className="flex flex-col gap-4 scroll-mt-28 bg-white p-5 sm:p-7 rounded-xl border border-[#dec0bb] shadow-xs"
                >
                  {/* Module Bar */}
                  <div className="flex items-center justify-between bg-[#f5eced] px-4 py-2 rounded-lg border border-[#dec0bb]/60">
                    <span className="text-[11px] bg-[#6b0d09] text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      Módulo Historiográfico {mod.numero}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#775a19]">
                      {mod.periodo}
                    </span>
                  </div>

                  <h2 className="font-serif text-xl sm:text-2xl text-[#6b0d09] tracking-tight leading-snug font-bold">
                    {mod.titulo}
                  </h2>

                  {/* Historic Image Block */}
                  <div className="bg-[#fbf1f2] p-2.5 rounded-xl border border-[#dec0bb] flex flex-col gap-2">
                    <div 
                      className="relative overflow-hidden rounded-lg bg-[#e1d8d9] cursor-pointer group"
                      onClick={() => onOpenImage(mod.fotoUrl, mod.titulo, mod.fotoAlt)}
                      title="Clique para ver imagem com link direto"
                    >
                      <img
                        src={mod.fotoUrl}
                        alt={mod.fotoAlt}
                        className="w-full h-72 sm:h-84 object-cover filter saturate-60 contrast-105 group-hover:saturate-100 transition-all duration-500 group-hover:scale-105"
                      />
                      
                      <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] font-mono text-[#1e1b1c] font-bold shadow-xs border border-[#dec0bb]/60 flex items-center gap-1.5">
                        <span>CÓDIGO: {mod.codigoFoto}</span>
                        <span className="material-symbols-outlined text-[14px] text-[#775a19]">zoom_in</span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(mod.fotoUrl);
                          onShowToast(`Link direto da imagem [${mod.codigoFoto}] copiado!`);
                        }}
                        className="absolute top-2 right-2 bg-white/90 hover:bg-white text-[#6b0d09] p-1 rounded text-xs shadow-xs border border-[#dec0bb] flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity"
                        title="Copiar URL direta desta imagem"
                      >
                        <span className="material-symbols-outlined text-[14px]">link</span>
                        <span className="text-[10px] font-bold pr-1">Link Direto</span>
                      </button>
                    </div>

                    <p className="text-xs text-[#57423f] italic px-1 leading-normal">
                      {mod.legendaFoto}
                    </p>
                  </div>

                  {/* Narrative Paragraphs */}
                  <div className="flex flex-col gap-3.5 text-sm sm:text-base text-[#1e1b1c] leading-relaxed">
                    {/* Parágrafos Iniciais */}
                    {initialParagraphs.map((par, pIdx) => (
                      <p key={pIdx} className="text-justify sm:text-left">{par}</p>
                    ))}

                    {/* Citação em destaque no texto */}
                    {mod.citacaoDestaque && (
                      <div className="bg-[#efe6e7] p-4 rounded-lg border-l-4 border-[#6b0d09] my-2 shadow-2xs">
                        <span className="text-[10px] uppercase text-[#6b0d09] font-bold tracking-widest block mb-1">
                          {mod.citacaoDestaque.tipo}
                        </span>
                        <blockquote className="font-serif text-sm sm:text-base italic text-[#57423f] leading-relaxed">
                          {mod.citacaoDestaque.texto}
                        </blockquote>
                        <span className="font-mono text-xs text-[#775a19] block text-right mt-1.5 font-semibold">
                          {mod.citacaoDestaque.fonte}
                        </span>
                      </div>
                    )}

                    {/* Parágrafos restantes visíveis quando expandido */}
                    {isExpanded && remainingParagraphs.map((par, rIdx) => (
                      <p key={`rem-${rIdx}`} className="text-justify sm:text-left animate-fadeIn">
                        {par}
                      </p>
                    ))}

                    {/* Botão Continue Lendo / Recolher Texto */}
                    {hasMoreContent && (
                      <div className="pt-2 flex justify-start">
                        <button
                          type="button"
                          onClick={() => toggleExpand(mod.id)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f5eced] hover:bg-[#6b0d09] text-[#6b0d09] hover:text-white border border-[#dec0bb] font-semibold text-xs sm:text-sm transition-all duration-200 shadow-2xs cursor-pointer group"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {isExpanded ? 'unfold_less' : 'auto_stories'}
                          </span>
                          <span>{isExpanded ? 'Recolher texto' : 'Continue lendo'}</span>
                          <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                            {isExpanded ? 'expand_less' : 'expand_more'}
                          </span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Related Documentary Sources */}
                  <div className="bg-[#f5eced] p-4 rounded-xl border border-[#dec0bb]/80 flex flex-col gap-2.5 mt-2">
                    <div className="flex items-center gap-1.5 text-[#6b0d09]">
                      <span className="material-symbols-outlined text-[18px]">folder_special</span>
                      <span className="text-xs font-mono uppercase tracking-wider font-bold">
                        Fontes Documentais Relacionadas no Acervo Digital
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {mod.fontesRelacionadas.map((fonte, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSourceClick(fonte.docId)}
                          className="p-2.5 bg-white rounded-lg hover:bg-[#efe6e7] transition-all flex items-start gap-2 border border-[#dec0bb]/60 text-left shadow-2xs group cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[#775a19] text-[18px] mt-0.5 flex-shrink-0">
                            {fonte.icone}
                          </span>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-[#6b0d09] group-hover:underline">
                              {fonte.titulo}
                            </span>
                            <span className="text-[11px] text-[#57423f]">
                              {fonte.subtitulo}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                </article>
              );
            })}

            {/* Nova Caixa Especial: Cronologia Consolidada (1628–1972) */}
            <article
              id="cronologia"
              className="flex flex-col gap-4 scroll-mt-28 bg-white p-5 sm:p-7 rounded-xl border-2 border-[#775a19]/40 shadow-sm"
            >
              {/* Header da Cronologia */}
              <div className="flex items-center justify-between bg-[#ffdea5]/40 px-4 py-2.5 rounded-lg border border-[#fed488]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#6b0d09] text-[20px]">calendar_month</span>
                  <span className="text-[11px] bg-[#6b0d09] text-white px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
                    Análise Cronológica Consolidada
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-[#775a19]">
                  1628 – 1972
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <h2 className="font-serif text-2xl sm:text-3xl text-[#6b0d09] font-bold tracking-tight">
                  Cronologia
                </h2>
                <p className="text-xs sm:text-sm text-[#57423f] leading-relaxed">
                  Quadro sinótico dos eventos estruturantes da história de Tremembé validados por fontes primárias cartoriais, legislação oficial e teses acadêmicas de referência.
                </p>
              </div>

              {/* Tabela Cronológica Responsiva */}
              <div className="overflow-x-auto rounded-xl border border-[#dec0bb] shadow-2xs mt-2">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f5eced] border-b border-[#dec0bb]">
                      <th className="py-3 px-4 text-xs font-mono uppercase tracking-wider font-bold text-[#6b0d09] w-36 sm:w-44">
                        Data / Período
                      </th>
                      <th className="py-3 px-4 text-xs font-mono uppercase tracking-wider font-bold text-[#6b0d09]">
                        Evento Histórico Fundamental
                      </th>
                      <th className="py-3 px-4 text-xs font-mono uppercase tracking-wider font-bold text-[#775a19] w-40 sm:w-48">
                        Fonte / Referência
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dec0bb]/50 text-xs sm:text-sm">
                    {cronologiaConsolidada.map((item, idx) => (
                      <tr 
                        key={idx}
                        className={idx % 2 === 0 ? 'bg-white hover:bg-[#fff9f9]' : 'bg-[#fbf1f2]/40 hover:bg-[#fff9f9]'}
                      >
                        <td className="py-3 px-4 font-mono font-bold text-[#6b0d09] align-top whitespace-nowrap">
                          {item.dataPeriodo}
                        </td>
                        <td className="py-3 px-4 text-[#1e1b1c] align-top leading-relaxed">
                          {item.evento}
                        </td>
                        <td className="py-3 px-4 text-[#57423f] align-top font-mono text-xs">
                          {item.fonte}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            {/* Bottom Callout: Access Full Catalog */}
            <div className="bg-[#efe6e7] p-6 sm:p-8 rounded-xl border border-[#dec0bb] flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono uppercase tracking-wider text-[#775a19] font-bold">
                  Continuidade da Pesquisa Histórica
                </span>
                <h3 className="font-serif text-xl font-bold text-[#6b0d09]">
                  Explore os Manuscritos Originais no Acervo Digital
                </h3>
                <p className="text-xs sm:text-sm text-[#57423f] max-w-xl">
                  Fotografias em alta definição, fichas documentais completas conforme as normas ABNT e transcrições históricas.
                </p>
              </div>

              <button
                onClick={() => onNavigate('acervo-digital')}
                className="px-5 py-3 bg-[#6b0d09] text-white rounded-lg text-sm font-semibold hover:bg-[#8b261d] transition-colors shadow-sm flex items-center gap-2 whitespace-nowrap self-start md:self-auto cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">travel_explore</span>
                <span>Acessar Acervo Completo</span>
              </button>
            </div>

          </main>

        </div>
      </section>
    </div>
  );
};
