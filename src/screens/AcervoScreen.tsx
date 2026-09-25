import React, { useState, useMemo } from 'react';
import { NavScreen, ArchivalItem } from '../types';
import { featuredDocument, archivalItems } from '../data/acervoData';

interface AcervoScreenProps {
  onNavigate: (screen: NavScreen) => void;
  onInspectDoc: (item: ArchivalItem) => void;
  onOpenImage: (url: string, title: string, alt: string) => void;
  onShowToast: (msg: string) => void;
}

type DecadaOption = 'all' | '1910' | '1940' | '1950' | '1960' | '1970';
type TemaOption = 'all' | 'praca' | 'ponte' | 'basilica' | 'saude' | 'outros';
type TecnicaOption = 'all' | 'pb' | 'sepia' | 'colorida';
type FotografoOption = 'all' | 'rezende' | 'desconhecido';
type SortOption = 'code-asc' | 'code-desc' | 'date-asc' | 'date-desc' | 'name-asc';

export const AcervoScreen: React.FC<AcervoScreenProps> = ({
  onNavigate,
  onInspectDoc,
  onOpenImage,
  onShowToast,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDecada, setSelectedDecada] = useState<DecadaOption>('all');
  const [selectedTema, setSelectedTema] = useState<TemaOption>('all');
  const [selectedTecnica, setSelectedTecnica] = useState<TecnicaOption>('all');
  const [selectedFotografo, setSelectedFotografo] = useState<FotografoOption>('all');
  const [sortBy, setSortBy] = useState<SortOption>('code-asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Multiplatform Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(12); // Default 12 is optimal for 1 (mobile), 2 (tablet), 3/4 (desktop)

  // Cloudinary thumbnail optimization helper
  const getOptimizedThumb = (url: string, width = 600) => {
    if (!url) return url;
    if (url.includes('res.cloudinary.com') && url.includes('/image/upload/')) {
      return url.replace('/image/upload/', `/image/upload/w_${width},c_limit,q_auto,f_auto/`);
    }
    return url;
  };

  // Themes list with counts
  const temas: { id: TemaOption; label: string; count: number }[] = [
    { id: 'all', label: 'Todos os Temas', count: archivalItems.length },
    { id: 'ponte', label: 'Pontes & Rio Paraíba', count: archivalItems.filter(i => i.tema === 'ponte').length },
    { id: 'praca', label: 'Praça Geraldo Costa & Centro', count: archivalItems.filter(i => i.tema === 'praca').length },
    { id: 'basilica', label: 'Basílica do Bom Jesus & Jardins', count: archivalItems.filter(i => i.tema === 'basilica').length },
    { id: 'saude', label: 'Saúde & Hospital', count: archivalItems.filter(i => i.tema === 'saude').length },
    { id: 'outros', label: 'Personalidades & Memória', count: archivalItems.filter(i => i.tema === 'outros').length },
  ];

  // Decades list with counts
  const decadas: { id: DecadaOption; label: string; count: number }[] = [
    { id: 'all', label: 'Todas as Décadas', count: archivalItems.length },
    { id: '1910', label: 'Anos 1910', count: archivalItems.filter(i => i.decada === '1910').length },
    { id: '1940', label: 'Anos 1940', count: archivalItems.filter(i => i.decada === '1940').length },
    { id: '1950', label: 'Anos 1950', count: archivalItems.filter(i => i.decada === '1950').length },
    { id: '1960', label: 'Anos 1960', count: archivalItems.filter(i => i.decada === '1960').length },
    { id: '1970', label: 'Anos 1970', count: archivalItems.filter(i => i.decada === '1970').length },
  ];

  // Filtering & Sorting
  const filteredItems = useMemo(() => {
    let list = [...archivalItems];

    // Search input across all spreadsheet columns
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter((item) => {
        const inCode = item.code.toLowerCase().includes(q);
        const inName = item.nomeArquivo ? item.nomeArquivo.toLowerCase().includes(q) : false;
        const inTitle = item.title.toLowerCase().includes(q);
        const inDesc = item.description.toLowerCase().includes(q) || (item.descricaoAnalitica ? item.descricaoAnalitica.toLowerCase().includes(q) : false);
        const inYear = item.year.toLowerCase().includes(q);
        const inPhotog = item.fotografo ? item.fotografo.toLowerCase().includes(q) : false;
        const inProced = item.procedencia ? item.procedencia.toLowerCase().includes(q) : false;
        const inCol = item.colecao ? item.colecao.toLowerCase().includes(q) : false;
        const inTec = item.tecnica ? item.tecnica.toLowerCase().includes(q) : false;
        return inCode || inName || inTitle || inDesc || inYear || inPhotog || inProced || inCol || inTec;
      });
    }

    // Decade filter
    if (selectedDecada !== 'all') {
      list = list.filter((item) => item.decada === selectedDecada);
    }

    // Theme filter
    if (selectedTema !== 'all') {
      list = list.filter((item) => item.tema === selectedTema);
    }

    // Technique filter
    if (selectedTecnica !== 'all') {
      if (selectedTecnica === 'sepia') {
        list = list.filter((item) => item.tecnica?.toLowerCase().includes('sépia'));
      } else if (selectedTecnica === 'colorida') {
        list = list.filter((item) => item.tecnica?.toLowerCase().includes('colorida'));
      } else if (selectedTecnica === 'pb') {
        list = list.filter((item) => item.tecnica?.toLowerCase().includes('preto e branco') && !item.tecnica?.toLowerCase().includes('sépia'));
      }
    }

    // Photographer filter
    if (selectedFotografo !== 'all') {
      if (selectedFotografo === 'rezende') {
        list = list.filter((item) => item.fotografo?.toLowerCase().includes('rezende'));
      } else if (selectedFotografo === 'desconhecido') {
        list = list.filter((item) => !item.fotografo || item.fotografo.toLowerCase().includes('desconhecido'));
      }
    }

    // Sorting
    if (sortBy === 'code-asc') {
      list.sort((a, b) => a.code.localeCompare(b.code));
    } else if (sortBy === 'code-desc') {
      list.sort((a, b) => b.code.localeCompare(a.code));
    } else if (sortBy === 'date-asc') {
      list.sort((a, b) => {
        const yearA = parseInt(a.year.replace(/\D/g, '')) || 0;
        const yearB = parseInt(b.year.replace(/\D/g, '')) || 0;
        return yearA - yearB;
      });
    } else if (sortBy === 'date-desc') {
      list.sort((a, b) => {
        const yearA = parseInt(a.year.replace(/\D/g, '')) || 0;
        const yearB = parseInt(b.year.replace(/\D/g, '')) || 0;
        return yearB - yearA;
      });
    } else if (sortBy === 'name-asc') {
      list.sort((a, b) => (a.nomeArquivo || a.title).localeCompare(b.nomeArquivo || b.title));
    }

    return list;
  }, [searchTerm, selectedDecada, selectedTema, selectedTecnica, selectedFotografo, sortBy]);

  // Total pages and safe active page
  const totalItems = filteredItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = totalItems === 0 ? 0 : (safeCurrentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const paginatedItems = useMemo(() => {
    return filteredItems.slice(startIndex, endIndex);
  }, [filteredItems, startIndex, endIndex]);

  const handlePageChange = (page: number) => {
    const targetPage = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(targetPage);
    // Smooth scroll back to top of gallery on mobile, tablet or desktop
    setTimeout(() => {
      const el = document.getElementById('catalogo-galeria');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedDecada('all');
    setSelectedTema('all');
    setSelectedTecnica('all');
    setSelectedFotografo('all');
    setSortBy('code-asc');
    setCurrentPage(1);
    onShowToast('Filtros restaurados. Exibindo todos os 30 registros da planilha.');
  };

  const handleCopyCitation = (item: ArchivalItem) => {
    navigator.clipboard.writeText(item.abnt).then(() => {
      onShowToast(`Referência ABNT de [${item.code}] copiada com sucesso!`);
    }).catch(() => {
      onShowToast(`Copiado: ${item.abnt}`);
    });
  };

  const handleCopyImageUrl = (url: string, code: string) => {
    navigator.clipboard.writeText(url).then(() => {
      onShowToast(`Link direto do Cloudinary de [${code}] copiado!`);
    }).catch(() => {
      onShowToast(`Link: ${url}`);
    });
  };

  return (
    <div className="flex flex-col w-full animate-fadeIn">
      
      {/* Top Ribbon */}
      <section className="w-full bg-[#fbf1f2] px-4 md:px-6 lg:px-8 py-3 border-b border-[#dec0bb]/60">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 bg-[#ffdea5] text-[#261900] font-bold rounded uppercase tracking-wider text-[10px]">
              Catálogo Oficial • Coleção José Manfredini
            </span>
            <span className="text-[#57423f] flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#775a19] inline-block"></span>
              Documentos catalogados com links diretos em alta definição (Cloudinary)
            </span>
          </div>

          <div className="flex items-center gap-4 text-[#57423f] text-xs font-mono">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#6b0d09]">photo_library</span>
              <span><strong>30</strong> Fotografias Históricas</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#775a19]">cloud_done</span>
              <span>Cloudinary CDN Ativo</span>
            </div>
            <button
              onClick={() => onShowToast('Exportação dos 30 registros da Coleção José Manfredini gerada.')}
              className="flex items-center gap-1 text-[#6b0d09] font-bold hover:underline"
            >
              <span className="material-symbols-outlined text-[16px]">table_view</span>
              <span>Planilha Catalogada</span>
            </button>
          </div>
        </div>
      </section>

      {/* Editorial Header */}
      <section className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 pt-8 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-8 flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-[#775a19] text-xs font-mono uppercase tracking-widest font-bold">
              <span className="material-symbols-outlined text-[16px]">history_edu</span>
              <span>Acervo Digital • Catálogo Historiográfico de Tremembé</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#6b0d09] font-bold tracking-tight">
              Coleção Fotográfica José Manfredini
            </h1>
            <p className="text-sm text-[#57423f] max-w-3xl pt-1 leading-relaxed">
              Explore o acervo fotográfico histórico com as imagens originais da Praça Geraldo Costa, a monumental ponte em arcos e as cheias do Rio Paraíba do Sul, a Basílica do Senhor Bom Jesus, o Posto de Saúde e o Dr. Paulo de Frontin.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-2 bg-[#f5eced] p-4 rounded-xl border border-[#dec0bb] shadow-xs">
            <div className="flex items-center justify-between text-xs">
              <span className="text-xs uppercase text-[#57423f] font-bold">Autenticação do Acervo</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-[#e9e0e1] text-[#6b0d09] rounded font-mono">
                Coleção Manfredini
              </span>
            </div>
            <div className="w-full bg-[#e9e0e1] rounded-full h-2 overflow-hidden">
              <div className="bg-[#6b0d09] h-full w-[100%] rounded-full"></div>
            </div>
            <div className="flex justify-between text-[11px] font-mono text-[#57423f]">
              <span>Indexação Planilha: 30 de 30</span>
              <span className="font-bold text-[#775a19]">Tremembé - SP, Brasil</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Curatorial Focus (Visual Banner) */}
      <section className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 pb-8">
        <div className="bg-[#fbf1f2] p-5 sm:p-7 rounded-xl shadow-xs border border-[#dec0bb] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-7 flex flex-col gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 bg-[#8b261d] text-white text-[10px] uppercase font-bold tracking-wider rounded">
                  Destaque do Catálogo
                </span>
                <span className="text-xs font-mono font-bold text-[#6b0d09]">
                  {featuredDocument.code}
                </span>
                <span className="text-xs font-mono text-[#775a19]">
                  • {featuredDocument.year}
                </span>
                <span className="text-xs font-mono text-[#57423f]">
                  • {featuredDocument.tecnica}
                </span>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl text-[#1e1b1c] font-bold leading-tight">
                {featuredDocument.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#57423f] leading-relaxed">
                {featuredDocument.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onInspectDoc(featuredDocument)}
                  className="px-4 py-2.5 bg-[#6b0d09] hover:bg-[#8b261d] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">zoom_in</span>
                  <span>Abrir Mesa de Inspeção</span>
                </button>

                <button
                  onClick={() => handleCopyImageUrl(featuredDocument.imageUrl, featuredDocument.code)}
                  className="px-3 py-2 bg-white hover:bg-[#efe6e7] text-[#6b0d09] text-xs font-semibold rounded-lg border border-[#dec0bb] transition-colors flex items-center gap-1 cursor-pointer"
                  title="Copiar link direto do Cloudinary"
                >
                  <span className="material-symbols-outlined text-[16px]">link</span>
                  <span>Copiar Link Cloudinary</span>
                </button>

                <button
                  onClick={() => onOpenImage(featuredDocument.imageUrl, featuredDocument.title, featuredDocument.imageAlt)}
                  className="px-3 py-2 bg-white hover:bg-[#efe6e7] text-[#775a19] text-xs font-semibold rounded-lg border border-[#dec0bb] transition-colors flex items-center gap-1 cursor-pointer"
                  title="Ver imagem em tamanho real"
                >
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  <span>Ver Original</span>
                </button>

                <span className="text-xs text-[#57423f] flex items-center gap-1 ml-auto">
                  <span className="material-symbols-outlined text-[16px] text-[#775a19]">verified</span>
                  Fotógrafo: <strong>{featuredDocument.fotografo}</strong>
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-xl border border-[#dec0bb] aspect-[4/3]"
                onClick={() => onInspectDoc(featuredDocument)}
                title="Clique para abrir exame de detalhes da imagem"
              >
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={featuredDocument.imageUrl}
                  alt={featuredDocument.imageAlt}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1b1c]/80 via-transparent to-transparent flex items-end p-4">
                  <div className="flex items-center justify-between w-full text-white text-xs font-mono">
                    <span className="font-semibold">{featuredDocument.nomeArquivo}</span>
                    <span className="flex items-center gap-1 bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded text-[11px]">
                      <span className="material-symbols-outlined text-[16px]">zoom_in</span>
                      Ampliar
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Faceted Search & Advanced Query Workbench (Aligned with Spreadsheet Parameters) */}
      <section className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 pb-8">
        <div className="bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-[#dec0bb] flex flex-col gap-5">
          
          {/* Primary Search Input */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-8 flex items-center bg-[#fbf1f2] px-3.5 py-2.5 rounded-lg border border-[#dec0bb]">
              <span className="material-symbols-outlined text-[#6b0d09] text-[22px] mr-2 flex-shrink-0">
                search
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pesquisar por Código (TRM_HIST_...), nome do arquivo (.jpg), palavra da descrição, fotógrafo, ano..."
                className="w-full bg-transparent text-sm text-[#1e1b1c] placeholder:text-[#57423f]/60 focus:outline-none"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-[#57423f] hover:text-[#6b0d09] p-1"
                  title="Limpar pesquisa"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
            </div>

            <div className="md:col-span-4 flex items-center gap-2">
              <div className="relative w-full">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full appearance-none bg-[#fbf1f2] px-3 py-2.5 rounded-lg text-xs font-semibold text-[#1e1b1c] border border-[#dec0bb] focus:outline-none cursor-pointer pr-8"
                >
                  <option value="code-asc">Ordem da Planilha (TRM_HIST_001 → 030)</option>
                  <option value="code-desc">Código Decrescente (TRM_HIST_030 → 001)</option>
                  <option value="date-asc">Datação Mais Antiga (Cronológico)</option>
                  <option value="date-desc">Datação Mais Recente</option>
                  <option value="name-asc">Nome do Arquivo (A-Z)</option>
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#57423f] text-[18px]">
                  expand_more
                </span>
              </div>

              <button
                onClick={handleResetFilters}
                className="px-3 py-2.5 bg-[#f5eced] hover:bg-[#efe6e7] text-[#57423f] hover:text-[#1e1b1c] rounded-lg text-xs font-semibold border border-[#dec0bb] transition-colors flex items-center gap-1 whitespace-nowrap cursor-pointer"
                title="Limpar todos os filtros"
              >
                <span className="material-symbols-outlined text-[16px]">refresh</span>
                <span>Limpar</span>
              </button>
            </div>
          </div>

          {/* Filter Rails Based on Spreadsheet Data */}
          <div className="flex flex-col gap-4 pt-2 border-t border-[#dec0bb]/50">
            
            {/* Tema / Local Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-[#775a19] font-bold min-w-[130px] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                Tema / Local:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {temas.map((tema) => {
                  const isActive = selectedTema === tema.id;
                  return (
                    <button
                      key={tema.id}
                      onClick={() => setSelectedTema(tema.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#8b261d] text-white font-semibold shadow-xs'
                          : 'bg-[#f5eced] hover:bg-[#efe6e7] text-[#57423f]'
                      }`}
                    >
                      {tema.label} ({tema.count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Década / Ano Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-[#775a19] font-bold min-w-[130px] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                Década / Ano:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {decadas.map((dec) => {
                  const isActive = selectedDecada === dec.id;
                  return (
                    <button
                      key={dec.id}
                      onClick={() => setSelectedDecada(dec.id)}
                      className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#775a19] text-white font-bold shadow-xs'
                          : 'bg-[#f5eced] hover:bg-[#efe6e7] text-[#57423f]'
                      }`}
                    >
                      {dec.label} ({dec.count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Técnica & Fotógrafo Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-[#57423f] font-bold min-w-[130px] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">filter_b_and_w</span>
                  Técnica:
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => setSelectedTecnica('all')}
                    className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                      selectedTecnica === 'all' ? 'bg-[#6b0d09] text-white font-bold' : 'bg-[#f5eced] text-[#57423f]'
                    }`}
                  >
                    Todas
                  </button>
                  <button
                    onClick={() => setSelectedTecnica('pb')}
                    className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                      selectedTecnica === 'pb' ? 'bg-[#6b0d09] text-white font-bold' : 'bg-[#f5eced] text-[#57423f]'
                    }`}
                  >
                    Preto e Branco (17)
                  </button>
                  <button
                    onClick={() => setSelectedTecnica('sepia')}
                    className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                      selectedTecnica === 'sepia' ? 'bg-[#6b0d09] text-white font-bold' : 'bg-[#f5eced] text-[#57423f]'
                    }`}
                  >
                    Sépia (10)
                  </button>
                  <button
                    onClick={() => setSelectedTecnica('colorida')}
                    className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                      selectedTecnica === 'colorida' ? 'bg-[#6b0d09] text-white font-bold' : 'bg-[#f5eced] text-[#57423f]'
                    }`}
                  >
                    Colorida (3)
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-[#57423f] font-bold min-w-[100px] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">person</span>
                  Fotógrafo:
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => setSelectedFotografo('all')}
                    className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                      selectedFotografo === 'all' ? 'bg-[#775a19] text-white font-bold' : 'bg-[#f5eced] text-[#57423f]'
                    }`}
                  >
                    Todos (30)
                  </button>
                  <button
                    onClick={() => setSelectedFotografo('rezende')}
                    className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                      selectedFotografo === 'rezende' ? 'bg-[#775a19] text-white font-bold' : 'bg-[#f5eced] text-[#57423f]'
                    }`}
                  >
                    Foto Rezende (1)
                  </button>
                  <button
                    onClick={() => setSelectedFotografo('desconhecido')}
                    className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                      selectedFotografo === 'desconhecido' ? 'bg-[#775a19] text-white font-bold' : 'bg-[#f5eced] text-[#57423f]'
                    }`}
                  >
                    Desconhecido (29)
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Gallery Results Grid: Thumbnails Side by Side with Brief Descriptions */}
      <section id="catalogo-galeria" className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 pb-16 scroll-mt-20">
        
        {/* Responsive Results Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-[#dec0bb]/60 mb-6 gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <div className="flex items-center gap-2 font-serif text-lg text-[#6b0d09] font-bold">
              <span>Galeria de Fotografias Catalogadas</span>
              <span className="text-xs font-sans font-normal bg-[#efe6e7] px-2.5 py-0.5 rounded-full text-[#57423f]">
                {totalItems} {totalItems === 1 ? 'imagem' : 'imagens'}
              </span>
            </div>
            {totalItems > 0 && (
              <span className="text-xs text-[#57423f] font-mono sm:border-l sm:border-[#dec0bb] sm:pl-2">
                Mostrando <strong>{startIndex + 1}–{endIndex}</strong> de <strong>{totalItems}</strong>
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-[#57423f]">
            {/* Items Per Page Selector */}
            <div className="flex items-center gap-1.5 bg-[#f5eced] px-2.5 py-1 rounded-lg border border-[#dec0bb]">
              <span className="text-[11px] text-[#57423f] whitespace-nowrap">Por página:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-transparent text-xs font-bold text-[#6b0d09] focus:outline-none cursor-pointer"
              >
                <option value={8}>8 fotos</option>
                <option value={12}>12 fotos</option>
                <option value={16}>16 fotos</option>
                <option value={24}>24 fotos</option>
                <option value={60}>Todas (30+)</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#f5eced] rounded-lg p-0.5 border border-[#dec0bb]">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#6b0d09] font-bold shadow-xs'
                    : 'text-[#57423f] hover:text-[#1e1b1c]'
                }`}
                title="Miniaturas lado a lado"
              >
                <span className="material-symbols-outlined text-[18px]">grid_view</span>
                <span className="hidden sm:inline">Grade</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white text-[#6b0d09] font-bold shadow-xs'
                    : 'text-[#57423f] hover:text-[#1e1b1c]'
                }`}
                title="Lista detalhada"
              >
                <span className="material-symbols-outlined text-[18px]">view_list</span>
                <span className="hidden sm:inline">Lista</span>
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {totalItems === 0 ? (
          <div className="p-12 text-center bg-white rounded-xl border border-[#dec0bb] flex flex-col items-center gap-2">
            <span className="material-symbols-outlined text-[42px] text-[#775a19]">search_off</span>
            <h4 className="font-serif text-lg font-bold text-[#6b0d09]">Nenhuma fotografia encontrada para estes filtros</h4>
            <p className="text-xs text-[#57423f] max-w-md">
              Não encontramos resultados com o termo "{searchTerm}" ou filtros ativos. Clique no botão abaixo para restaurar todos os registros catalogados.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-2 px-4 py-2 bg-[#8b261d] text-white text-xs font-semibold rounded-lg hover:bg-[#6b0d09] transition-colors cursor-pointer"
            >
              Exibir Todas as Fotos
            </button>
          </div>
        ) : (
          /* Grid View: Side-by-Side Thumbnails with Brief Description */
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5'
                : 'flex flex-col gap-4'
            }
          >
            {paginatedItems.map((item) => {
              const isSepia = item.tecnica?.toLowerCase().includes('sépia');
              const isColor = item.tecnica?.toLowerCase().includes('color');

              return (
                <article
                  key={item.id}
                  className={`bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 border border-[#dec0bb] flex ${
                    viewMode === 'grid' ? 'flex-col' : 'flex-col sm:flex-row'
                  } group`}
                >
                  {/* Visual Thumbnail */}
                  <div
                    className={`relative ${
                      viewMode === 'grid' ? 'aspect-[4/3] w-full' : 'sm:w-64 h-52 flex-shrink-0'
                    } bg-[#f5eced] overflow-hidden cursor-pointer`}
                    onClick={() => onInspectDoc(item)}
                    title="Clique para abrir a mesa de inspeção com zoom"
                  >
                    <img
                      src={getOptimizedThumb(item.imageUrl, 600)}
                      alt={item.imageAlt}
                      loading="lazy"
                      className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                        isSepia ? 'filter sepia-[0.35]' : ''
                      }`}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80';
                      }}
                    />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#6b0d09] text-white rounded shadow-xs">
                        {item.code}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-white/95 text-[#1e1b1c] rounded backdrop-blur-xs shadow-xs">
                        {item.year}
                      </span>
                    </div>

                    {/* Technique Badge */}
                    <span className="absolute bottom-2.5 left-2.5 text-[9px] font-bold px-1.5 py-0.5 bg-[#1e1b1c]/80 text-white rounded backdrop-blur-xs">
                      {isSepia ? 'Sépia' : isColor ? 'Cor' : 'P&B'}
                    </span>

                    {/* Quick Expand Icon */}
                    <div className="absolute inset-0 bg-[#1e1b1c]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <span className="p-2 bg-white/90 text-[#6b0d09] rounded-full shadow-md flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px]">zoom_in</span>
                      </span>
                    </div>
                  </div>

                  {/* Content Details & Brief Description */}
                  <div className="p-3.5 sm:p-4 flex flex-col flex-grow justify-between gap-3">
                    <div className="flex flex-col gap-1.5">
                      {/* File Name & Collection */}
                      <div className="flex items-center justify-between gap-1 text-[11px] font-mono text-[#775a19]">
                        <span className="truncate" title={item.nomeArquivo}>
                          {item.nomeArquivo}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyImageUrl(item.imageUrl, item.code);
                          }}
                          className="text-[#57423f] hover:text-[#6b0d09] p-0.5 transition-colors flex items-center cursor-pointer"
                          title="Copiar URL direta do Cloudinary"
                        >
                          <span className="material-symbols-outlined text-[16px]">link</span>
                        </button>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => onInspectDoc(item)}
                        className="font-serif text-sm font-bold text-[#1e1b1c] group-hover:text-[#6b0d09] transition-colors leading-snug cursor-pointer line-clamp-2"
                        title={item.title}
                      >
                        {item.title}
                      </h3>

                      {/* Brief Analytical Description from Spreadsheet */}
                      <p
                        className="text-xs text-[#57423f] line-clamp-3 leading-relaxed"
                        title={item.descricaoAnalitica || item.description}
                      >
                        {item.descricaoAnalitica || item.description}
                      </p>
                    </div>

                    {/* Footer Metadata & Action Buttons */}
                    <div className="pt-2 border-t border-[#dec0bb]/50 flex flex-col gap-2">
                      <div className="flex items-center justify-between text-[11px] text-[#57423f] font-mono">
                        <span className="truncate max-w-[130px]">
                          {item.fotografo !== 'Desconhecido' ? `Foto: ${item.fotografo}` : 'Autor: Desconhecido'}
                        </span>
                        <span className="text-[#775a19] font-semibold truncate max-w-[110px]">
                          {item.colecao || 'José Manfredini'}
                        </span>
                      </div>

                      {/* Action Button Strip */}
                      <div className="grid grid-cols-3 gap-1 pt-0.5">
                        <button
                          onClick={() => onInspectDoc(item)}
                          className="px-2 py-2 bg-[#f5eced] hover:bg-[#6b0d09] text-[#6b0d09] hover:text-white text-[11px] font-semibold rounded text-center transition-colors flex items-center justify-center gap-1 cursor-pointer min-h-[36px]"
                          title="Abrir mesa de inspeção com zoom e paleografia"
                        >
                          <span className="material-symbols-outlined text-[14px]">visibility</span>
                          <span>Inspecionar</span>
                        </button>

                        <button
                          onClick={() => handleCopyImageUrl(item.imageUrl, item.code)}
                          className="px-2 py-2 bg-[#f5eced] hover:bg-[#efe6e7] text-[#775a19] text-[11px] font-semibold rounded text-center transition-colors flex items-center justify-center gap-1 cursor-pointer min-h-[36px]"
                          title="Copiar link direto do Cloudinary"
                        >
                          <span className="material-symbols-outlined text-[14px]">link</span>
                          <span>Link</span>
                        </button>

                        <button
                          onClick={() => onOpenImage(item.imageUrl, item.title, item.imageAlt)}
                          className="px-2 py-2 bg-[#f5eced] hover:bg-[#efe6e7] text-[#1e1b1c] text-[11px] font-semibold rounded text-center transition-colors flex items-center justify-center gap-1 cursor-pointer min-h-[36px]"
                          title="Abrir imagem em tamanho real"
                        >
                          <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                          <span>Original</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Multiplatform Responsive Pagination Bar */}
        {totalPages > 1 && (
          <div className="mt-8 pt-6 border-t border-[#dec0bb]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Mobile / Compact Pagination Indicator */}
            <div className="text-xs text-[#57423f] font-medium order-2 sm:order-1 flex items-center gap-2">
              <span>
                Página <strong className="text-[#6b0d09]">{safeCurrentPage}</strong> de <strong>{totalPages}</strong>
              </span>
              <span className="text-[#dec0bb]">•</span>
              <span>
                ({totalItems} registros)
              </span>
            </div>

            {/* Pagination Controls - Responsive */}
            <div className="flex items-center gap-1.5 order-1 sm:order-2 flex-wrap justify-center">
              {/* First Page Button (Desktop & Tablet) */}
              <button
                onClick={() => handlePageChange(1)}
                disabled={safeCurrentPage === 1}
                className={`hidden md:flex items-center justify-center w-9 h-9 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                  safeCurrentPage === 1
                    ? 'border-[#dec0bb]/40 text-[#57423f]/40 cursor-not-allowed bg-[#f5eced]/40'
                    : 'border-[#dec0bb] text-[#57423f] hover:bg-[#f5eced] hover:text-[#6b0d09] bg-white'
                }`}
                title="Primeira página"
              >
                <span className="material-symbols-outlined text-[18px]">first_page</span>
              </button>

              {/* Previous Page Button */}
              <button
                onClick={() => handlePageChange(safeCurrentPage - 1)}
                disabled={safeCurrentPage === 1}
                className={`flex items-center gap-1 px-3.5 h-9 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                  safeCurrentPage === 1
                    ? 'border-[#dec0bb]/40 text-[#57423f]/40 cursor-not-allowed bg-[#f5eced]/40'
                    : 'border-[#dec0bb] text-[#6b0d09] hover:bg-[#6b0d09] hover:text-white bg-white shadow-xs'
                }`}
                title="Página anterior"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                <span className="hidden sm:inline">Anterior</span>
              </button>

              {/* Numbered Page Buttons (Desktop & Tablet) */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  const isCurrent = pageNum === safeCurrentPage;
                  // Show current page, edges, and adjacent pages
                  const isNear =
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    Math.abs(pageNum - safeCurrentPage) <= 1;

                  if (!isNear) {
                    // Render ellipsis once between distant pages
                    if (pageNum === 2 || pageNum === totalPages - 1) {
                      return (
                        <span key={`ellipsis-${pageNum}`} className="px-1 text-xs text-[#57423f]">
                          ...
                        </span>
                      );
                    }
                    return null;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-9 h-9 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-[#6b0d09] text-white shadow-xs scale-105'
                          : 'bg-white hover:bg-[#f5eced] text-[#57423f] hover:text-[#6b0d09] border border-[#dec0bb]'
                      }`}
                      aria-current={isCurrent ? 'page' : undefined}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              {/* Next Page Button */}
              <button
                onClick={() => handlePageChange(safeCurrentPage + 1)}
                disabled={safeCurrentPage === totalPages}
                className={`flex items-center gap-1 px-3.5 h-9 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                  safeCurrentPage === totalPages
                    ? 'border-[#dec0bb]/40 text-[#57423f]/40 cursor-not-allowed bg-[#f5eced]/40'
                    : 'border-[#dec0bb] text-[#6b0d09] hover:bg-[#6b0d09] hover:text-white bg-white shadow-xs'
                }`}
                title="Próxima página"
              >
                <span className="hidden sm:inline">Próxima</span>
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>

              {/* Last Page Button (Desktop & Tablet) */}
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={safeCurrentPage === totalPages}
                className={`hidden md:flex items-center justify-center w-9 h-9 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                  safeCurrentPage === totalPages
                    ? 'border-[#dec0bb]/40 text-[#57423f]/40 cursor-not-allowed bg-[#f5eced]/40'
                    : 'border-[#dec0bb] text-[#57423f] hover:bg-[#f5eced] hover:text-[#6b0d09] bg-white'
                }`}
                title="Última página"
              >
                <span className="material-symbols-outlined text-[18px]">last_page</span>
              </button>
            </div>

          </div>
        )}

        {/* Catalog Summary Footer */}
        <div className="mt-10 p-4 bg-[#fbf1f2] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs border border-[#dec0bb]">
          <div className="text-xs text-[#57423f] font-mono">
            Exibindo <strong>{filteredItems.length}</strong> de um total de <strong>30</strong> fotografias catalogadas da <strong>Coleção José Manfredini</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onShowToast('Citações ABNT de todo o acervo exportadas.');
              }}
              className="px-3 py-1.5 bg-white hover:bg-[#efe6e7] text-[#6b0d09] text-xs font-semibold rounded-lg border border-[#dec0bb] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">format_quote</span>
              <span>Copiar Referências ABNT</span>
            </button>
            <button
              onClick={() => onNavigate('historia-de-tremembe')}
              className="px-3 py-1.5 bg-[#6b0d09] hover:bg-[#8b261d] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Ver História de Tremembé</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

      </section>

      {/* Educational & Contribution Collaboration Strip */}
      <section className="w-full bg-[#f5eced] py-10 px-4 md:px-6 lg:px-8 border-t border-[#dec0bb]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-[#6b0d09] text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
              <span>Colaboração Cidadã • Acervo Histórico</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl text-[#1e1b1c] font-bold">
              Possui Fotos ou Documentos Antigos de Tremembé?
            </h2>
            <p className="text-xs sm:text-sm text-[#57423f] leading-relaxed">
              O acervo é construído coletivamente. Contribua com registros da família, da Praça da Basílica ou do Rio Paraíba. O original físico permanece com você; apenas a cópia digital integra o patrimônio público com os devidos créditos.
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col gap-3 bg-white p-4 rounded-xl border border-[#dec0bb] shadow-xs">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#ffdea5] text-[#6b0d09] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[22px]">attach_file_add</span>
              </div>
              <div className="flex flex-col gap-1 text-xs">
                <span className="font-bold text-[#6b0d09] text-sm">
                  Como enviar suas fotos e documentos:
                </span>
                <p className="text-[#57423f] leading-relaxed">
                  Clique no botão para abrir o e-mail oficial da curadoria (<strong>brunobusnardo.his@edutremembe.com.br</strong>) já formatado.
                </p>
                <p className="text-[#1e1b1c] font-semibold bg-[#f5eced] p-2 rounded border border-[#dec0bb]/60 mt-0.5">
                  📎 Na tela do Gmail que abrir, clique no ícone de <strong>clipe</strong> para anexar suas fotos e envie!
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const targetEmail = 'brunobusnardo.his@edutremembe.com.br';
                const emailSubject = '[Acervo Tremembé] Nova Contribuição Cidadã';
                const emailBody = 
                  `CONTRIBUIÇÃO PARA O ACERVO HISTÓRICO DE TREMEMBÉ\n` +
                  `===================================================\n\n` +
                  `Olá, Prof. Bruno Busnardo,\n\n` +
                  `Gostaria de contribuir com materiais históricos para o acervo digital de Tremembé.\n\n` +
                  `* ATENÇÃO: Anexe suas fotos ou documentos diretamente nesta mensagem (usando o ícone de clipe do Gmail) antes de enviar!\n\n` +
                  `Enviado através do Acervo Digital de Tremembé`;

                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
                window.open(gmailUrl, '_blank', 'noopener,noreferrer');
                onShowToast('Aba do Gmail aberta com a mensagem pronta!');
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#6b0d09] hover:bg-[#8b261d] text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">open_in_new</span>
              <span>Enviar Contribuição Direta no Gmail</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
