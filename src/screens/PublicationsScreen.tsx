import React, { useState } from 'react';
import { NavScreen, PublicationItem } from '../types';
import { publicationsData } from '../data/publicationsData';

interface PublicationsScreenProps {
  onNavigate: (screen: NavScreen) => void;
  onShowToast: (msg: string) => void;
}

export const PublicationsScreen: React.FC<PublicationsScreenProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const filteredPubs = publicationsData.filter((pub) => {
    const matchesType = selectedType === 'all' || pub.tipo === selectedType;
    const matchesSearch =
      searchFilter === '' ||
      pub.titulo.toLowerCase().includes(searchFilter.toLowerCase()) ||
      pub.autor.toLowerCase().includes(searchFilter.toLowerCase()) ||
      pub.resumo.toLowerCase().includes(searchFilter.toLowerCase()) ||
      pub.palavrasChave.some((kw) => kw.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const copyCitation = (pub: PublicationItem) => {
    const citation = `${pub.autor.toUpperCase()}. ${pub.titulo}. ${pub.instituicao}, ${pub.ano}. ${pub.doiOrRef}.`;
    navigator.clipboard.writeText(citation).then(() => {
      onShowToast(`Citação de [${pub.titulo.slice(0, 30)}...] copiada em ABNT!`);
    });
  };

  return (
    <div className="flex flex-col w-full animate-fadeIn">
      {/* Top Banner */}
      <section className="w-full bg-[#fbf1f2] px-4 md:px-6 lg:px-8 py-10 border-b border-[#dec0bb]/60">
        <div className="max-w-[1360px] mx-auto flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#6b0d09] text-white text-[10px] uppercase font-bold tracking-wider rounded">
              Biblioteca Científica &amp; Repositório Editorial
            </span>
            <span className="text-xs font-mono text-[#775a19] font-bold">
              • NPH / UNITAU &amp; SEDUC
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#6b0d09] font-bold">
            Publicações, Ensaios &amp; Artigos Historiográficos
          </h1>

          <p className="text-sm sm:text-base text-[#57423f] max-w-3xl leading-relaxed">
            Produções acadêmicas, relatórios de conservação preventiva, monografias e artigos revisados por pares que investigam o desenvolvimento agrário, patrimonial e ferroviário de Tremembé e do Vale do Paraíba.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center bg-white px-3 py-2 rounded-lg border border-[#dec0bb] shadow-xs w-full sm:w-80">
              <span className="material-symbols-outlined text-[18px] text-[#57423f] mr-2">search</span>
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filtrar por autor, tema ou palavra-chave..."
                className="w-full bg-transparent text-xs text-[#1e1b1c] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1 bg-[#f5eced] p-1 rounded-lg border border-[#dec0bb]">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                  selectedType === 'all'
                    ? 'bg-[#6b0d09] text-white'
                    : 'text-[#57423f] hover:bg-[#efe6e7]'
                }`}
              >
                Todos ({publicationsData.length})
              </button>
              <button
                onClick={() => setSelectedType('Monografia')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                  selectedType === 'Monografia'
                    ? 'bg-[#6b0d09] text-white'
                    : 'text-[#57423f] hover:bg-[#efe6e7]'
                }`}
              >
                Monografias
              </button>
              <button
                onClick={() => setSelectedType('Artigo Científico')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                  selectedType === 'Artigo Científico'
                    ? 'bg-[#6b0d09] text-white'
                    : 'text-[#57423f] hover:bg-[#efe6e7]'
                }`}
              >
                Artigos
              </button>
              <button
                onClick={() => setSelectedType('Relatório Histórico')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                  selectedType === 'Relatório Histórico'
                    ? 'bg-[#6b0d09] text-white'
                    : 'text-[#57423f] hover:bg-[#efe6e7]'
                }`}
              >
                Relatórios Técnicos
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Publications List */}
      <section className="w-full max-w-[1360px] mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPubs.map((pub) => (
            <article
              key={pub.id}
              className="bg-white rounded-xl p-6 shadow-xs hover:shadow-md transition-all duration-300 border border-[#dec0bb] flex flex-col justify-between"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#ffdea5] text-[#261900]">
                    {pub.tipo}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#775a19]">
                    {pub.ano} • {pub.paginas} páginas
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#6b0d09] leading-snug">
                  {pub.titulo}
                </h3>

                <div className="flex flex-col text-xs text-[#57423f]">
                  <span className="font-bold text-[#1e1b1c]">{pub.autor}</span>
                  <span className="italic">{pub.instituicao}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#57423f] leading-relaxed line-clamp-3">
                  {pub.resumo}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {pub.palavrasChave.map((kw, i) => (
                    <span key={i} className="text-[10px] bg-[#f5eced] text-[#775a19] px-2 py-0.5 rounded font-mono">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#dec0bb]/50 flex items-center justify-between">
                <button
                  onClick={() => onShowToast(`Download do arquivo PDF [${pub.titulo.slice(0, 25)}...] iniciado.`)}
                  className="px-4 py-2 bg-[#6b0d09] hover:bg-[#8b261d] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                  <span>Baixar Publicação (PDF)</span>
                </button>

                <button
                  onClick={() => copyCitation(pub)}
                  className="p-2 text-[#775a19] hover:text-[#6b0d09] hover:bg-[#f5eced] rounded-lg transition-colors text-xs font-semibold flex items-center gap-1"
                  title="Copiar referência bibliográfica ABNT"
                >
                  <span className="material-symbols-outlined text-[16px]">format_quote</span>
                  <span>Citação</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
