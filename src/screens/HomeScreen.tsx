import React, { useState, useEffect, useRef } from 'react';
import { NavScreen, ArchivalItem } from '../types';
import { timelineData } from '../data/timelineData';
import { archivalItems } from '../data/acervoData';
import { historyModules } from '../data/historyData';
import { bnccCompetencies } from '../data/pedagogicalData';

interface HeroSlideItem {
  id: string;
  url: string;
  title: string;
  year: string;
  subtitle: string;
  collection: string;
  tombo: string;
  alt: string;
}

const heroSlides: HeroSlideItem[] = [
  {
    id: 'hero-basilica-1940',
    url: 'https://res.cloudinary.com/hjw9p1xw/image/upload/v1790277791/copy_of_whatsapp_image_2026-08-26_at_175709.jpg',
    title: 'Basílica do Senhor Bom Jesus a partir do Jardim Central',
    year: 'c. 1940',
    subtitle: 'Fachada Monumental, Torre Sineira e Passeio Público com Pedestre • Foto Rezende',
    collection: 'Coleção José Manfredini • Ref. TRM_HIST_027',
    tombo: 'Ref.: TRM_HIST_027',
    alt: 'Vista frontal da Basílica do Senhor Bom Jesus de Tremembé com jardim público e pedestre em c. 1940',
  },
  {
    id: 'hero-praca-1950',
    url: 'https://res.cloudinary.com/hjw9p1xw/image/upload/v1789170300/pra%C3%A7a_geraldo_costa.jpg',
    title: 'Praça Geraldo Costa: Vista Panorâmica com Bancos de Alvenaria',
    year: 'c. 1950',
    subtitle: 'Convivência Comunitária, Casario Colonial e Infraestrutura Elétrica de Época',
    collection: 'Coleção José Manfredini • Fundo Urbano Municipal',
    tombo: 'Ref.: TRM_HIST_001',
    alt: 'Praça Geraldo Costa com bancos de praça em alvenaria e pedestres sentados em c. 1950',
  },
  {
    id: 'hero-praca-elevada-1950',
    url: 'https://res.cloudinary.com/hjw9p1xw/image/upload/v1789170300/pra%C3%A7a_geraldo_costa_4.jpg',
    title: 'Praça Geraldo Costa: Vista Panorâmica Elevada e Entorno',
    year: 'c. 1950',
    subtitle: 'Perspectiva Elevada do Traçado Urbanístico e Relevo ao Horizonte',
    collection: 'Coleção José Manfredini • Fundo Urbano Municipal',
    tombo: 'Ref.: TRM_HIST_002',
    alt: 'Vista panorâmica elevada da Praça Geraldo Costa mostrando o relevo e casario histórico',
  },
  {
    id: 'hero-chafariz-1970',
    url: 'https://res.cloudinary.com/hjw9p1xw/image/upload/v1789170300/pra%C3%A7a_geraldo_costa_7.jpg',
    title: 'Chafariz Central em Alvenaria da Praça Geraldo Costa',
    year: 'c. 1970',
    subtitle: 'Fonte Geométrica Circular e Espaço de Convivência Cívica',
    collection: 'Coleção José Manfredini • Fundo Urbano Municipal',
    tombo: 'Ref.: TRM_HIST_004',
    alt: 'Chafariz circular em alvenaria da Praça Geraldo Costa em c. 1970',
  },
  {
    id: 'hero-portal-1940',
    url: 'https://res.cloudinary.com/hjw9p1xw/image/upload/v1789170300/pra%C3%A7a_geraldo_costa_5.jpg',
    title: 'Portal Comemorativo "Jesus Homo Salvator" na Praça',
    year: 'c. 1940',
    subtitle: 'Arcos Decorados com Folhagens e Populares em Trajes Formais',
    collection: 'Coleção José Manfredini • Fundo Religioso',
    tombo: 'Ref.: TRM_HIST_006',
    alt: 'Portal decorativo com arcos de folhagem e inscrição Jesus Homo Salvator em c. 1940',
  },
  {
    id: 'hero-ponte-1940',
    url: 'https://res.cloudinary.com/hjw9p1xw/image/upload/v1789170298/ponte6.jpg',
    title: 'Construção da Ponte em Arcos sobre o Rio Paraíba do Sul',
    year: 'c. 1940',
    subtitle: 'Cimbramentos e Andaimes de Madeira na Montagem dos Arcos de Concreto',
    collection: 'Fundo Engenharia Fluvial • Coleção José Manfredini',
    tombo: 'Ref.: TRM_HIST_014',
    alt: 'Andaimes e cimbramentos de madeira sob os arcos da ponte sobre o Rio Paraíba do Sul em c. 1940',
  },
  {
    id: 'hero-ponte-madeira-1940',
    url: 'https://res.cloudinary.com/hjw9p1xw/image/upload/v1789170299/PONTE10.jpg',
    title: 'Ponte de Madeira em Cavaletes sobre Curso d\'Água Rural',
    year: 'c. 1940',
    subtitle: 'Estrutura de Cavaletes e Margens Arborizadas no Vale',
    collection: 'Coleção José Manfredini • Fundo Fluvial',
    tombo: 'Ref.: TRM_HIST_008',
    alt: 'Ponte de madeira sobre cavaletes em curso d\'água rural em c. 1940',
  },
  {
    id: 'hero-saude-1960',
    url: 'https://res.cloudinary.com/hjw9p1xw/image/upload/v1789170299/POSTO_DE_SA%C3%9ADE_2.jpg',
    title: 'Edificação do Posto de Saúde de Tremembé com Jardim',
    year: 'c. 1960',
    subtitle: 'Arquitetura Institucional e Assistência Médico-Sanitária',
    collection: 'Coleção José Manfredini • Fundo de Saúde',
    tombo: 'Ref.: TRM_HIST_009',
    alt: 'Fachada do Posto de Saúde de Tremembé com jardim frontal e janelas amplas em c. 1960',
  },
  {
    id: 'hero-jardim-basilica-1940',
    url: 'https://res.cloudinary.com/hjw9p1xw/image/upload/v1789170295/JARDIM_BAS%C3%8DLICA4.jpg',
    title: 'Chafariz Monumental e Jardim da Basílica do Bom Jesus',
    year: 'c. 1940',
    subtitle: 'Jato d\'Água em Funcionamento e Canteiros Arborizados',
    collection: 'Coleção José Manfredini • Paisagismo Histórico',
    tombo: 'Ref.: TRM_HIST_030',
    alt: 'Chafariz com jato d\'água em funcionamento e famílias passeando pelo jardim em c. 1940',
  },
  {
    id: 'hero-hospital-1960',
    url: 'https://res.cloudinary.com/hjw9p1xw/image/upload/v1789170295/hospital_2.jpg',
    title: 'Fachada do Hospital Bom Jesus e Veículo de Época',
    year: 'c. 1960',
    subtitle: 'Entrada Principal e Automóvel Antigo Estacionado',
    collection: 'Coleção José Manfredini • Fundo de Saúde e Assistência',
    tombo: 'Ref.: TRM_HIST_029',
    alt: 'Fachada do Hospital Bom Jesus com letreiro e automóvel antigo estacionado na calçada em c. 1960',
  },
];

interface HomeScreenProps {
  onNavigate: (screen: NavScreen) => void;
  onInspectDoc: (item: ArchivalItem) => void;
  onOpenImage: (url: string, title: string, alt: string) => void;
  onShowToast: (msg: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onInspectDoc,
  onOpenImage,
  onShowToast,
}) => {
  const [selectedTimelineIdx, setSelectedTimelineIdx] = useState<number>(0);

  // Infinite Hero Slide State
  const [heroSlideIdx, setHeroSlideIdx] = useState<number>(0);
  const [isHeroPaused, setIsHeroPaused] = useState<boolean>(false);

  // Auto-advance infinitely every 4.8 seconds
  useEffect(() => {
    if (isHeroPaused) return;
    const interval = setInterval(() => {
      setHeroSlideIdx((prev) => (prev + 1) % heroSlides.length);
    }, 4800);
    return () => clearInterval(interval);
  }, [isHeroPaused]);

  const activeHeroSlide = heroSlides[heroSlideIdx];

  const handleNextHeroSlide = () => {
    setHeroSlideIdx((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrevHeroSlide = () => {
    setHeroSlideIdx((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const selectedNode = timelineData[selectedTimelineIdx];
  const previewCards = archivalItems.slice(0, 4);

  // Estados do Formulário de Colaboração Cidadã
  const [collabNome, setCollabNome] = useState('');
  const [collabEmail, setCollabEmail] = useState('');
  const [collabTelefone, setCollabTelefone] = useState('');
  const [collabTitulo, setCollabTitulo] = useState('');
  const [collabAno, setCollabAno] = useState('');
  const [collabCategoria, setCollabCategoria] = useState('Fotografia Histórica');
  const [collabDescricao, setCollabDescricao] = useState('');
  const [collabSubmitting, setCollabSubmitting] = useState(false);
  const [collabSuccess, setCollabSuccess] = useState(false);

  const handleCollabSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!collabNome.trim() || !collabEmail.trim() || !collabTitulo.trim() || !collabDescricao.trim()) {
      onShowToast('Por favor, preencha todos os campos obrigatórios (*).');
      return;
    }

    setCollabSubmitting(true);

    const targetEmail = 'brunobusnardo.his@edutremembe.com.br';
    const emailSubject = `[Acervo Tremembé] Contribuição: ${collabTitulo}`;

    const emailBody = 
      `CONTRIBUIÇÃO PARA O ACERVO HISTÓRICO DE TREMEMBÉ\n` +
      `===================================================\n\n` +
      `DADOS DO COLABORADOR:\n` +
      `Nome: ${collabNome}\n` +
      `E-mail: ${collabEmail}\n` +
      `Telefone/WhatsApp: ${collabTelefone || 'Não informado'}\n\n` +
      `IDENTIFICAÇÃO DO MATERIAL:\n` +
      `Título / Objeto: ${collabTitulo}\n` +
      `Categoria: ${collabCategoria}\n` +
      `Ano ou Época Estimada: ${collabAno || 'Não determinado'}\n\n` +
      `HISTÓRIA, CONTEXTO E LOCAL EM TREMEMBÉ:\n` +
      `${collabDescricao}\n\n` +
      `---------------------------------------------------\n` +
      `* ATENÇÃO COLABORADOR: Anexe suas fotos ou documentos diretamente neste e-mail (usando o ícone de clipe do Gmail) antes de enviar!\n` +
      `---------------------------------------------------\n\n` +
      `Submetido através do Portal da Memória e História de Tremembé`;

    // Abre diretamente o Gmail Web em nova aba com todos os dados preenchidos
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    setTimeout(() => {
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
      setCollabSubmitting(false);
      setCollabSuccess(true);
      onShowToast('Aba do Gmail aberta com a mensagem pronta!');
    }, 500);
  };

  const handleResetCollabForm = () => {
    setCollabNome('');
    setCollabEmail('');
    setCollabTelefone('');
    setCollabTitulo('');
    setCollabAno('');
    setCollabDescricao('');
    setCollabSuccess(false);
  };

  return (
    <div className="flex flex-col w-full animate-fadeIn">
      {/* 1. HERO BANNER IMERSIVO COM SLIDER INFINITO E RECORTE EDITORIAL */}
      <section className="relative w-full overflow-hidden bg-[#fbf1f2] shadow-sm border-b border-[#dec0bb]/50">
        <div className="max-w-[1360px] mx-auto px-4 md:px-6 lg:px-8 pt-8 md:pt-10 pb-14 md:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Bloco Textual Editorial (5 colunas) */}
            <div className="lg:col-span-5 flex flex-col gap-4 z-10">
              <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded bg-[#fed488] text-[#261900] shadow-xs">
                <span className="material-symbols-outlined text-[16px] text-[#775a19]">verified_user</span>
                <span className="text-[11px] uppercase tracking-widest font-bold">
                  Patrimônio Historiográfico Oficial
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-widest text-[#775a19] font-bold">
                  Vale do Paraíba • Acervo Digital
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-[3.25rem] text-[#6b0d09] tracking-tight leading-[1.1] font-bold">
                  Das Várzeas aos Trilhos da História
                </h1>
              </div>

              <p className="text-sm sm:text-base lg:text-lg text-[#57423f] leading-relaxed">
                Preservação historiográfica, acervo iconográfico digital e formação pedagógica sobre a memória cultural, social e econômica de Tremembé (SP) ao longo dos séculos.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('acervo-digital')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#6b0d09] hover:bg-[#8b261d] text-white text-sm font-semibold shadow-md transition-all group cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">photo_library</span>
                  <span>Explorar o Acervo Digital</span>
                </button>

                <button
                  onClick={() => onNavigate('espaco-do-professor')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#e9e0e1] hover:bg-[#f5eced] text-[#775a19] hover:text-[#6b0d09] text-sm font-semibold shadow-xs transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">school</span>
                  <span>Espaço do Professor (BNCC)</span>
                </button>
              </div>

              <div className="flex items-center gap-3 pt-2 text-xs">
                <span className="text-[#57423f] font-mono font-semibold">{activeHeroSlide.tombo}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#775a19]"></span>
                <span className="text-[#775a19] font-bold tracking-wider uppercase">ACESSO ABERTO E GRATUITO</span>
              </div>
            </div>

            {/* Bloco do Slide Infinito com as 5 Melhores Imagens Históricas (7 colunas) */}
            <div 
              className="lg:col-span-7 relative"
              onMouseEnter={() => setIsHeroPaused(true)}
              onMouseLeave={() => setIsHeroPaused(false)}
            >
              <div 
                className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#231f20] border-2 border-[#dec0bb] group select-none cursor-pointer"
                onClick={() => onOpenImage(
                  activeHeroSlide.url, 
                  `${activeHeroSlide.title} (${activeHeroSlide.year})`, 
                  activeHeroSlide.alt
                )}
                title="Clique para ampliar em alta definição"
              >
                {/* Camada das 5 Imagens com Crossfade Suave */}
                <div className="relative w-full h-[360px] sm:h-[430px] lg:h-[480px]">
                  {heroSlides.map((slide, idx) => (
                    <img
                      key={slide.id}
                      alt={slide.alt}
                      src={slide.url}
                      className={`absolute inset-0 w-full h-full object-cover filter contrast-[1.03] sepia-[0.10] transition-all duration-700 ease-in-out ${
                        idx === heroSlideIdx
                          ? 'opacity-100 scale-100 z-10'
                          : 'opacity-0 scale-[1.03] z-0 pointer-events-none'
                      }`}
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 z-10 pointer-events-none"></div>
                </div>

                {/* Controles de Navegação do Slide (Botões Anterior / Próximo) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevHeroSlide();
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 hover:bg-[#6b0d09] text-white flex items-center justify-center backdrop-blur-md border border-white/30 transition-all duration-200 shadow-lg cursor-pointer opacity-90 hover:opacity-100 hover:scale-110"
                  aria-label="Imagem anterior"
                  title="Imagem anterior"
                >
                  <span className="material-symbols-outlined text-[24px]">chevron_left</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextHeroSlide();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 hover:bg-[#6b0d09] text-white flex items-center justify-center backdrop-blur-md border border-white/30 transition-all duration-200 shadow-lg cursor-pointer opacity-90 hover:opacity-100 hover:scale-110"
                  aria-label="Próxima imagem"
                  title="Próxima imagem"
                >
                  <span className="material-symbols-outlined text-[24px]">chevron_right</span>
                </button>

                {/* Top Bar: Tombo e Indicador de Slides 01/05 */}
                <div className="absolute top-3 inset-x-3 z-20 flex items-center justify-between gap-2 pointer-events-none">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-mono">
                    <span className="w-2 h-2 rounded-full bg-[#fed488] animate-pulse"></span>
                    <span className="font-bold text-[#fed488]">SLIDE {heroSlideIdx + 1} DE {heroSlides.length}</span>
                  </div>

                  <div className="flex items-center gap-1.5 pointer-events-auto">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsHeroPaused(!isHeroPaused);
                      }}
                      className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white transition-colors cursor-pointer"
                      title={isHeroPaused ? 'Retomar reprodução automática' : 'Pausar slide'}
                    >
                      <span className="material-symbols-outlined text-[16px] block">
                        {isHeroPaused ? 'play_arrow' : 'pause'}
                      </span>
                    </button>
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-mono text-[#fbf1f2]">
                      {activeHeroSlide.year}
                    </span>
                  </div>
                </div>

                {/* Tarja Inferior de Identificação Documental */}
                <div className="absolute bottom-0 inset-x-0 bg-[#fff8f8]/95 backdrop-blur-md p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl border-t border-[#dec0bb] z-20">
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#775a19] bg-[#ffdea5] px-2 py-0.5 rounded">
                        {activeHeroSlide.tombo}
                      </span>
                      <span className="text-xs font-bold text-[#6b0d09]">{activeHeroSlide.year}</span>
                    </div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#6b0d09] truncate" title={activeHeroSlide.title}>
                      {activeHeroSlide.title}
                    </h3>
                    <p className="text-xs text-[#57423f] truncate" title={activeHeroSlide.subtitle}>
                      {activeHeroSlide.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(activeHeroSlide.url);
                        onShowToast(`Link direto copiado: ${activeHeroSlide.title}`);
                      }}
                      className="px-2.5 py-1.5 bg-white hover:bg-[#efe6e7] text-[#6b0d09] text-xs font-semibold rounded-lg border border-[#dec0bb] flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                      title="Copiar URL direta da foto"
                    >
                      <span className="material-symbols-outlined text-[16px]">link</span>
                      <span className="hidden sm:inline">Copiar Link</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenImage(activeHeroSlide.url, activeHeroSlide.title, activeHeroSlide.alt);
                      }}
                      className="text-xs font-bold bg-[#6b0d09] hover:bg-[#8b261d] text-white px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                      title="Ampliar em alta resolução"
                    >
                      <span className="material-symbols-outlined text-[16px]">zoom_in</span>
                      <span>AMPLIAR</span>
                    </button>
                  </div>
                </div>

                {/* Barra de Progresso / Indicadores Rápidos de Slide */}
                <div className="absolute bottom-[92px] sm:bottom-[82px] inset-x-0 z-20 flex justify-center items-center gap-2 px-4 pointer-events-auto">
                  {heroSlides.map((slide, idx) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setHeroSlideIdx(idx);
                      }}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === heroSlideIdx
                          ? 'w-8 bg-[#fed488] shadow-md'
                          : 'w-2 bg-white/50 hover:bg-white/90'
                      }`}
                      aria-label={`Ir para foto ${idx + 1}`}
                      title={slide.title}
                    />
                  ))}
                </div>

              </div>

              {/* Micro Folheto Arquivístico Flutuante com Acervo */}
              <div className="hidden sm:flex absolute -top-3 -right-3 bg-white rounded-xl shadow-xl p-3 flex-col max-w-[240px] z-30 border border-[#dec0bb]">
                <div className="flex items-center gap-1 text-[10px] text-[#6b0d09] uppercase font-bold tracking-wider">
                  <span className="material-symbols-outlined text-[14px]">auto_stories</span>
                  <span>Coleção Historiográfica</span>
                </div>
                <span className="text-xs font-semibold text-[#1e1b1c] truncate">
                  {activeHeroSlide.collection}
                </span>
                <span className="text-[11px] font-mono text-[#775a19] mt-0.5">
                  Foto {heroSlideIdx + 1} de {heroSlides.length} • Loop Infinito
                </span>
              </div>
            </div>

          </div>

          {/* 3 Indicadores Numéricos do Acervo com Iconografia Correta e Dados Reais do Portal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-12 md:mt-14">
            
            {/* Card 1: Acervo Iconográfico Digital */}
            <div 
              onClick={() => onNavigate('acervo-digital')}
              className="p-5 rounded-xl bg-white hover:bg-[#fffcfc] shadow-sm hover:shadow-md flex flex-col justify-between gap-3 border-2 border-[#dec0bb] hover:border-[#6b0d09] transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-[#f5eced] group-hover:bg-[#6b0d09] flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-[24px] text-[#775a19] group-hover:text-white transition-colors">
                    photo_library
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#f5eced] text-[#775a19] border border-[#dec0bb]/50">
                  ACERVO DIGITAL
                </span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-3xl lg:text-4xl text-[#6b0d09] font-bold group-hover:scale-105 transition-transform origin-left">
                    31
                  </span>
                  <span className="text-xs text-[#775a19] font-bold uppercase font-mono">Imagens</span>
                </div>
                <h4 className="font-serif text-sm font-bold text-[#1e1b1c] mt-0.5">
                  Fotografias Históricas Catalogadas
                </h4>
                <p className="text-xs text-[#57423f] mt-1 leading-snug">
                  Coleção Manfredini e EFCB com fichas ABNT, alta definição e transcrição analítica.
                </p>
              </div>

              <div className="pt-2 border-t border-[#dec0bb]/40 flex items-center justify-between text-xs text-[#6b0d09] font-semibold group-hover:underline">
                <span>Explorar galeria completa</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* Card 2: Historiografia e Capítulos Oficiais */}
            <div 
              onClick={() => onNavigate('historia-de-tremembe')}
              className="p-5 rounded-xl bg-white hover:bg-[#fffcfc] shadow-sm hover:shadow-md flex flex-col justify-between gap-3 border-2 border-[#dec0bb] hover:border-[#6b0d09] transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-[#f5eced] group-hover:bg-[#6b0d09] flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-[24px] text-[#775a19] group-hover:text-white transition-colors">
                    auto_stories
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#f5eced] text-[#775a19] border border-[#dec0bb]/50">
                  HISTORIOGRAFIA
                </span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-3xl lg:text-4xl text-[#6b0d09] font-bold group-hover:scale-105 transition-transform origin-left">
                    {historyModules.length}
                  </span>
                  <span className="text-xs text-[#775a19] font-bold uppercase font-mono">Capítulos</span>
                </div>
                <h4 className="font-serif text-sm font-bold text-[#1e1b1c] mt-0.5">
                  Capítulos Historiográficos Oficiais
                </h4>
                <p className="text-xs text-[#57423f] mt-1 leading-snug">
                  Da gênese territorial e religiosa em 1672 à consolidação urbana no século XX.
                </p>
              </div>

              <div className="pt-2 border-t border-[#dec0bb]/40 flex items-center justify-between text-xs text-[#6b0d09] font-semibold group-hover:underline">
                <span>Navegar pela Linha do Tempo</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* Card 3: Espaço do Professor & BNCC */}
            <div 
              onClick={() => onNavigate('espaco-do-professor')}
              className="p-5 rounded-xl bg-white hover:bg-[#fffcfc] shadow-sm hover:shadow-md flex flex-col justify-between gap-3 border-2 border-[#dec0bb] hover:border-[#6b0d09] transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-[#f5eced] group-hover:bg-[#6b0d09] flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-[24px] text-[#775a19] group-hover:text-white transition-colors">
                    school
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#f5eced] text-[#775a19] border border-[#dec0bb]/50">
                  ESPAÇO DOCENTE
                </span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-3xl lg:text-4xl text-[#6b0d09] font-bold group-hover:scale-105 transition-transform origin-left">
                    {bnccCompetencies.length}
                  </span>
                  <span className="text-xs text-[#775a19] font-bold uppercase font-mono">BNCC</span>
                </div>
                <h4 className="font-serif text-sm font-bold text-[#1e1b1c] mt-0.5">
                  Competências Articuladas
                </h4>
                <p className="text-xs text-[#57423f] mt-1 leading-snug">
                  Propostas colaborativas com anexo real de arquivos e envio à curadoria docente.
                </p>
              </div>

              <div className="pt-2 border-t border-[#dec0bb]/40 flex items-center justify-between text-xs text-[#6b0d09] font-semibold group-hover:underline">
                <span>Acessar propostas docentes</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. SEÇÃO DA IMAGEM ORIGINAL */}
      <section className="w-full bg-[#fff8f8] py-12">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6">
          <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-[#dec0bb] bg-black group cursor-pointer"
            onClick={() => onOpenImage(
              'https://res.cloudinary.com/hjw9p1xw/image/upload/v1790277434/ChatGPT_Image_27_de_ago._de_2026_15_15_05.png',
              'Patrimônio Histórico de Tremembé',
              'Imagem oficial do patrimônio histórico de Tremembé'
            )}
            title="Clique para ampliar em alta definição"
          >
            <img
              src="https://res.cloudinary.com/hjw9p1xw/image/upload/v1790277434/ChatGPT_Image_27_de_ago._de_2026_15_15_05.png"
              alt="Patrimônio Histórico de Tremembé"
              className="w-full h-auto object-cover max-h-[520px] transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </div>
        </div>
      </section>

      {/* 3. LINHA DO TEMPO CRONOLÓGICA INTERATIVA */}
      <section className="w-full bg-[#fbf1f2] py-16 border-y border-[#dec0bb]/50">
        <div className="max-w-[1360px] mx-auto px-4 md:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-widest text-[#775a19] font-bold">
                Cronologia Fundamental
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-[#6b0d09] font-bold">
                Marcos Históricos de Tremembé
              </h2>
              <p className="text-sm text-[#57423f]">
                Das raízes coloniais quinhentistas à efervescência republicana e ferroviária.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-[#57423f] text-xs font-medium">
              <span className="material-symbols-outlined text-[18px] text-[#775a19]">swipe</span>
              <span>Clique em um marco para expandir a documentação</span>
            </div>
          </div>

          {/* Navegação dos 5 Nós Cronológicos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            {timelineData.map((node, index) => {
              const isSelected = selectedTimelineIdx === index;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedTimelineIdx(index)}
                  className={`text-left p-4 rounded-lg transition-all flex flex-col gap-1 border ${
                    isSelected
                      ? 'bg-[#6b0d09] text-white shadow-md border-[#6b0d09]'
                      : 'bg-[#f5eced] text-[#1e1b1c] hover:bg-[#efe6e7] border-[#dec0bb]'
                  }`}
                >
                  <span className={`text-[11px] uppercase tracking-wider font-semibold ${
                    isSelected ? 'text-[#ffdad5]' : 'text-[#775a19]'
                  }`}>
                    {node.categoria}
                  </span>
                  <span className={`font-serif text-xl font-bold ${
                    isSelected ? 'text-white' : 'text-[#6b0d09]'
                  }`}>
                    {node.ano}
                  </span>
                  <span className="text-xs truncate font-medium">
                    {node.titulo}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Card Detalhado do Marco Histórico Selecionado */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-[#dec0bb]">
            <div className="lg:col-span-7 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="font-serif text-3xl font-bold text-[#6b0d09]">{selectedNode.ano}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#775a19]"></span>
                <span className="text-[11px] uppercase px-2 py-0.5 rounded bg-[#ffdea5] text-[#261900] font-bold">
                  {selectedNode.tag}
                </span>
              </div>

              <div className="flex flex-col">
                <h3 className="font-serif text-xl md:text-2xl text-[#6b0d09] font-bold">
                  {selectedNode.titulo}
                </h3>
                <span className="font-serif text-sm md:text-base text-[#775a19] italic">
                  {selectedNode.subtitulo}
                </span>
              </div>

              <p className="text-sm md:text-base text-[#57423f] leading-relaxed">
                {selectedNode.desc}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-[#57423f] text-xs">
                  <span className="material-symbols-outlined text-[16px] text-[#775a19]">menu_book</span>
                  <span className="font-mono font-bold">{selectedNode.registro}</span>
                </div>

                <button
                  onClick={() => onNavigate('historia-de-tremembe')}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#6b0d09] hover:underline"
                >
                  <span>Ler Ensaio Historiográfico Completo</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div 
                className="relative rounded-lg overflow-hidden bg-[#efe6e7] shadow-md group cursor-pointer border border-[#dec0bb]"
                onClick={() => onOpenImage(selectedNode.imageUrl, selectedNode.titulo, selectedNode.imageAlt)}
                title="Clique para ver imagem com link direto"
              >
                <img
                  src={selectedNode.imageUrl}
                  alt={selectedNode.imageAlt}
                  className="w-full h-72 object-cover filter sepia-[0.15] transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 inset-x-0 bg-white/90 backdrop-blur-sm p-2 text-center text-xs font-mono text-[#6b0d09] font-semibold flex items-center justify-between px-3">
                  <span>Arquivo Documental • Marco de {selectedNode.ano}</span>
                  <span className="material-symbols-outlined text-[16px] text-[#775a19]">zoom_in</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. CATÁLOGO FOTOGRÁFICO EM DESTAQUE (PREVIEW DA GALERIA) */}
      <section className="w-full bg-[#fff8f8] py-16">
        <div className="max-w-[1360px] mx-auto px-4 md:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-widest text-[#775a19] font-bold">
                Fototeca Digital Pública
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-[#6b0d09] font-bold">
                Documentos Iconográficos em Evidência
              </h2>
              <p className="text-sm text-[#57423f]">
                Fotografias restauradas e fichadas sob normas arquivísticas internacionais.
              </p>
            </div>

            <button
              onClick={() => onNavigate('acervo-digital')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#efe6e7] text-[#6b0d09] hover:bg-[#6b0d09] hover:text-white text-sm font-semibold shadow-xs transition-all self-start md:self-auto"
            >
              <span>Visualizar Catálogo Completo (PDF / Acervo)</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          {/* Grid de 4 Fotografias Históricas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewCards.map((card) => (
              <div
                key={card.id}
                className="flex flex-col rounded-lg overflow-hidden bg-[#f5eced] shadow-xs hover:shadow-lg transition-all duration-300 border border-[#dec0bb]/60 group"
              >
                <div 
                  className="relative aspect-[4/3] bg-[#efe6e7] overflow-hidden cursor-pointer"
                  onClick={() => onInspectDoc(card)}
                >
                  <img
                    src={card.imageUrl}
                    alt={card.imageAlt}
                    className="w-full h-full object-cover filter sepia-[0.2] group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-white/90 text-[#6b0d09] font-mono text-[10px] font-bold shadow-xs">
                    {card.code}
                  </span>
                  <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-[#775a19] text-white text-[10px] font-bold shadow-xs">
                    {card.year}
                  </span>
                </div>

                <div className="p-3.5 flex flex-col flex-grow justify-between gap-2">
                  <div>
                    <h4 
                      onClick={() => onInspectDoc(card)}
                      className="font-serif text-base font-bold text-[#6b0d09] hover:underline cursor-pointer line-clamp-1"
                    >
                      {card.title}
                    </h4>
                    <p className="text-xs text-[#57423f] line-clamp-2 mt-1">
                      {card.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#dec0bb]/50 flex items-center justify-between">
                    <span className="text-[11px] font-mono font-semibold text-[#775a19]">
                      {card.fundo}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onOpenImage(card.imageUrl, card.title, card.imageAlt)}
                        className="p-1 rounded text-[#57423f] hover:text-[#6b0d09] hover:bg-[#efe6e7] transition-colors"
                        title="Ver Imagem e Link Direto"
                      >
                        <span className="material-symbols-outlined text-[16px]">link</span>
                      </button>
                      <button
                        onClick={() => onInspectDoc(card)}
                        className="p-1 rounded text-[#57423f] hover:text-[#6b0d09] hover:bg-[#efe6e7] transition-colors"
                        title="Abrir Mesa de Inspeção"
                      >
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. ESPAÇO DO PROFESSOR: PROPOSTAS PEDAGÓGICAS DOS EDUCADORES */}
      <section className="w-full bg-[#fbf1f2] py-16 border-y border-[#dec0bb]/50">
        <div className="max-w-[1360px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-6 md:p-10 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-[#dec0bb]">
            
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[#775a19]">
                <span className="material-symbols-outlined text-[20px]">school</span>
                <span className="text-xs uppercase tracking-wider font-bold">
                  Espaço do Professor • Produção Docente &amp; Memória Local
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <h2 className="font-serif text-2xl md:text-3xl text-[#6b0d09] font-bold">
                  Propostas Pedagógicas &amp; Saberes Docentes
                </h2>
                <p className="text-sm md:text-base text-[#57423f] leading-relaxed">
                  Um espaço concebido por e para professores: repositório colaborativo de propostas pedagógicas desenvolvidas pelos educadores da rede, articulando a história, fontes documentais e fotografias de Tremembé à investigação em sala de aula. Envie sua proposta com anexo de arquivos (PDFs, fotos de trabalhos dos alunos e documentos) diretamente para a curadoria docente.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded bg-[#f5eced] flex flex-col gap-1 border border-[#dec0bb]/50">
                  <span className="font-serif text-xl font-bold text-[#775a19]">Autoria</span>
                  <span className="text-xs font-semibold text-[#1e1b1c]">Feito por Professores</span>
                  <span className="text-[11px] text-[#57423f]">Fund. I, II e Médio</span>
                </div>

                <div className="p-3 rounded bg-[#f5eced] flex flex-col gap-1 border border-[#dec0bb]/50">
                  <span className="font-serif text-xl font-bold text-[#775a19]">Curadoria</span>
                  <span className="text-xs font-semibold text-[#1e1b1c]">Prof. Bruno Busnardo</span>
                  <span className="text-[10px] text-[#6b0d09] font-mono truncate font-semibold">brunobusnardo.his@edutremembe.com.br</span>
                </div>

                <div className="p-3 rounded bg-[#f5eced] flex flex-col gap-1 border border-[#dec0bb]/50">
                  <span className="font-serif text-xl font-bold text-[#775a19]">Anexos</span>
                  <span className="text-xs font-semibold text-[#1e1b1c]">PDF, Fotos e Docs</span>
                  <span className="text-[11px] text-[#57423f]">Envio real ao e-mail</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('espaco-do-professor')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded bg-[#6b0d09] hover:bg-[#8b261d] text-white text-sm font-semibold shadow-md transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">menu_book</span>
                  <span>Acessar Propostas Pedagógicas / Enviar Minha Proposta</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div 
                className="rounded-lg overflow-hidden bg-[#efe6e7] shadow-md border border-[#dec0bb] cursor-pointer group"
                onClick={() => onOpenImage(
                  'https://res.cloudinary.com/hjw9p1xw/image/upload/v1790277791/copy_of_whatsapp_image_2026-08-26_at_175709.jpg',
                  'Educadores e Professores em Desenvolvimento de Propostas Pedagógicas',
                  'Professores da rede em produção pedagógica articulada ao patrimônio de Tremembé'
                )}
                title="Clique para ver imagem com link direto"
              >
                <img
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                  alt="Educadores e professores em desenvolvimento de propostas pedagógicas sobre o patrimônio de Tremembé"
                  src="https://res.cloudinary.com/hjw9p1xw/image/upload/v1790277791/copy_of_whatsapp_image_2026-08-26_at_175709.jpg"
                />
              </div>

              <div className="mt-3 p-3 rounded bg-[#f5eced] flex items-center gap-3 border border-[#dec0bb]/50">
                <span className="material-symbols-outlined text-[#775a19] text-[24px]">verified</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#1e1b1c]">Comunidade Docente</span>
                  <span className="text-[11px] text-[#57423f]">
                    Repositório colaborativo de propostas pedagógicas sobre Tremembé
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. COLABORAÇÃO COM O ACERVO HISTÓRICO: INSTRUÇÕES PRÁTICAS + FORMULÁRIO INTERATIVO */}
      <section className="w-full bg-[#fff8f8] py-16 border-b border-[#dec0bb]/60">
        <div className="max-w-[1360px] mx-auto px-4 md:px-6 lg:px-8">
          
          <div className="bg-white rounded-2xl p-6 md:p-10 shadow-lg border-2 border-[#dec0bb] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Coluna da Esquerda: Instruções Práticas & Orientações de Salvaguarda (5 colunas) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="flex items-center gap-2 text-[#775a19]">
                <span className="material-symbols-outlined text-[22px]">volunteer_activism</span>
                <span className="text-xs font-mono uppercase tracking-wider font-bold">
                  Colaboração Cidadã • Salvaguarda da Memória
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="font-serif text-2xl sm:text-3xl text-[#6b0d09] font-bold tracking-tight">
                  Como Colaborar com Fotos, Documentos &amp; Memórias
                </h2>
                <p className="text-sm text-[#57423f] leading-relaxed">
                  O acervo histórico de Tremembé é construído a muitas mãos. Se você possui fotografias antigas da cidade, retratos de família, certidões, cartas, carteiras de trabalho de época ou recortes de jornais, veja como é simples colaborar:
                </p>
              </div>

              {/* Guia de 4 Passos Rápidos */}
              <div className="flex flex-col gap-3">
                <div className="p-3.5 rounded-xl bg-[#fbf1f2] border border-[#dec0bb]/70 flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#6b0d09] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#1e1b1c]">Localize o Material</span>
                    <span className="text-[11px] text-[#57423f] leading-snug">
                      Busque fotos antigas, retratos, documentos ou recortes em guardados de família. Os originais continuam com você!
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#fbf1f2] border border-[#dec0bb]/70 flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#6b0d09] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#1e1b1c]">Digitalize ou Fotografe</span>
                    <span className="text-[11px] text-[#57423f] leading-snug">
                      Fotografe com a luz do dia sem sombras e sem cortar as margens, ou use scanner de mesa (JPG, PNG ou PDF).
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#fbf1f2] border border-[#dec0bb]/70 flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#6b0d09] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#1e1b1c]">Identifique os Detalhes</span>
                    <span className="text-[11px] text-[#57423f] leading-snug">
                      Indique ano aproximado, local em Tremembé (Largo da Basílica, Estação, etc.) e o nome das pessoas.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#fbf1f2] border border-[#dec0bb]/70 flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#6b0d09] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    4
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#1e1b1c]">Envio Direto à Curadoria</span>
                    <span className="text-[11px] text-[#57423f] leading-snug">
                      Preencha o formulário ao lado ou envie direto para o e-mail oficial com garantia de créditos ao doador.
                    </span>
                  </div>
                </div>
              </div>

              {/* Informação e Contato do Curador */}
              <div className="p-4 rounded-xl bg-[#f5eced] border border-[#dec0bb] flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#775a19] font-bold">
                    E-mail Oficial da Curadoria
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText('brunobusnardo.his@edutremembe.com.br');
                      onShowToast('E-mail institucional copiado!');
                    }}
                    className="text-[11px] text-[#6b0d09] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">content_copy</span>
                    Copiar
                  </button>
                </div>
                <span className="font-mono text-xs sm:text-sm font-bold text-[#6b0d09] break-all select-all">
                  brunobusnardo.his@edutremembe.com.br
                </span>
                <p className="text-[11px] text-[#57423f] leading-snug pt-1 border-t border-[#dec0bb]/60">
                  Responsável: <strong>Prof. Bruno Busnardo</strong> (Historiador e Pesquisador do Acervo de Tremembé).
                </p>
              </div>

              {/* Garantia Ética de Preservação */}
              <div className="p-3.5 rounded-xl bg-white border border-[#dec0bb]/80 flex items-start gap-2.5 text-xs text-[#57423f]">
                <span className="material-symbols-outlined text-[20px] text-[#775a19] flex-shrink-0">
                  verified
                </span>
                <p className="leading-relaxed text-[11px]">
                  <strong>Salvaguarda e Direitos:</strong> Todo acervo catalogado atribui os devidos créditos históricos à família doadora. O original físico nunca precisa ser entregue; apenas a reprodução digital integra a pesquisa histórica pública.
                </p>
              </div>
            </div>

            {/* Coluna da Direita: Formulário Interativo com Upload de Arquivos (7 colunas) */}
            <div className="lg:col-span-7 bg-[#fbf1f2] p-5 sm:p-7 rounded-2xl border border-[#dec0bb]">
              {collabSuccess ? (
                <div className="flex flex-col items-center justify-center text-center p-6 sm:p-8 bg-white rounded-xl border border-[#dec0bb] shadow-sm animate-fadeIn gap-3">
                  <div className="w-14 h-14 rounded-full bg-[#ffdea5] text-[#6b0d09] flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-[32px]">mark_email_read</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#6b0d09]">
                    Ficha Aberta no Gmail!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#57423f] max-w-md leading-relaxed">
                    Uma nova aba do <strong>Gmail Web</strong> foi aberta com todos os campos e a história preenchida para <strong>brunobusnardo.his@edutremembe.com.br</strong>.
                  </p>
                  <div className="p-3 bg-[#f5eced] rounded-lg border border-[#dec0bb] text-xs text-[#6b0d09] font-medium text-left flex items-start gap-2 max-w-md">
                    <span className="material-symbols-outlined text-[18px] text-[#775a19] flex-shrink-0 mt-0.5">info</span>
                    <span>
                      Verifique a nova aba do seu navegador, confirme os dados e clique em <strong>"Enviar"</strong> no Gmail para entregar sua colaboração ao acervo!
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetCollabForm}
                    className="mt-2 px-5 py-2.5 rounded-lg bg-[#6b0d09] hover:bg-[#8b261d] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">add_circle</span>
                    <span>Enviar Nova Contribuição</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCollabSubmit} className="flex flex-col gap-4">
                  <div className="border-b border-[#dec0bb] pb-2">
                    <h3 className="font-serif text-lg font-bold text-[#6b0d09] flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px] text-[#775a19]">edit_document</span>
                      <span>Formulário de Envio de Material</span>
                    </h3>
                    <p className="text-xs text-[#57423f]">
                      Preencha os campos abaixo para catalogação. Campos marcados com (*) são obrigatórios.
                    </p>
                  </div>

                  {/* Nome Completo e E-mail */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1e1b1c]">
                        Seu Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={collabNome}
                        onChange={(e) => setCollabNome(e.target.value)}
                        placeholder="Ex: Maria Antonia Guimarães"
                        className="px-3 py-2 bg-white rounded-lg border border-[#dec0bb] text-sm text-[#1e1b1c] focus:outline-none focus:ring-2 focus:ring-[#6b0d09]/30"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1e1b1c]">
                        Seu E-mail para Contato *
                      </label>
                      <input
                        type="email"
                        required
                        value={collabEmail}
                        onChange={(e) => setCollabEmail(e.target.value)}
                        placeholder="seuemail@exemplo.com"
                        className="px-3 py-2 bg-white rounded-lg border border-[#dec0bb] text-sm text-[#1e1b1c] focus:outline-none focus:ring-2 focus:ring-[#6b0d09]/30"
                      />
                    </div>
                  </div>

                  {/* Telefone e Tipo de Material */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1e1b1c]">
                        Telefone / WhatsApp (Opcional)
                      </label>
                      <input
                        type="tel"
                        value={collabTelefone}
                        onChange={(e) => setCollabTelefone(e.target.value)}
                        placeholder="(12) 99999-0000"
                        className="px-3 py-2 bg-white rounded-lg border border-[#dec0bb] text-sm text-[#1e1b1c] focus:outline-none focus:ring-2 focus:ring-[#6b0d09]/30"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1e1b1c]">
                        Tipo de Material *
                      </label>
                      <select
                        value={collabCategoria}
                        onChange={(e) => setCollabCategoria(e.target.value)}
                        className="px-3 py-2 bg-white rounded-lg border border-[#dec0bb] text-sm text-[#1e1b1c] focus:outline-none focus:ring-2 focus:ring-[#6b0d09]/30"
                      >
                        <option value="Fotografia Histórica">Fotografia Histórica</option>
                        <option value="Documento / Escritura / Certidão">Documento / Escritura / Certidão</option>
                        <option value="Carta / Correspondência Antiga">Carta / Correspondência Antiga</option>
                        <option value="Recorte de Jornal / Periódico">Recorte de Jornal / Periódico</option>
                        <option value="Mapa / Planta de Época">Mapa / Planta de Época</option>
                        <option value="Memória Escrita / Depoimento">Memória Escrita / Depoimento</option>
                        <option value="Outro Objeto Histórico">Outro Objeto Histórico</option>
                      </select>
                    </div>
                  </div>

                  {/* Título e Ano Estimado */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div className="sm:col-span-2 flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1e1b1c]">
                        Título / Identificação do Registro *
                      </label>
                      <input
                        type="text"
                        required
                        value={collabTitulo}
                        onChange={(e) => setCollabTitulo(e.target.value)}
                        placeholder="Ex: Foto da família reunida na Praça da Basílica"
                        className="px-3 py-2 bg-white rounded-lg border border-[#dec0bb] text-sm text-[#1e1b1c] focus:outline-none focus:ring-2 focus:ring-[#6b0d09]/30"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1e1b1c]">
                        Ano Estimado
                      </label>
                      <input
                        type="text"
                        value={collabAno}
                        onChange={(e) => setCollabAno(e.target.value)}
                        placeholder="Ex: c. 1952"
                        className="px-3 py-2 bg-white rounded-lg border border-[#dec0bb] text-sm text-[#1e1b1c] focus:outline-none focus:ring-2 focus:ring-[#6b0d09]/30"
                      />
                    </div>
                  </div>

                  {/* Descrição e Contexto */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#1e1b1c]">
                      Descrição, Contexto &amp; Memória do Registro *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={collabDescricao}
                      onChange={(e) => setCollabDescricao(e.target.value)}
                      placeholder="Conte quem são as pessoas retratadas, o local em Tremembé e qualquer detalhe histórico que você souber..."
                      className="px-3 py-2 bg-white rounded-lg border border-[#dec0bb] text-sm text-[#1e1b1c] focus:outline-none focus:ring-2 focus:ring-[#6b0d09]/30"
                    />
                  </div>

                  {/* Caixa Explicativa Direta e Sem Dúvidas sobre o Envio e Anexos */}
                  <div className="p-4 rounded-xl bg-white border-2 border-[#dec0bb] flex items-start gap-3 shadow-xs">
                    <div className="w-10 h-10 rounded-lg bg-[#ffdea5] text-[#6b0d09] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[22px]">attach_file_add</span>
                    </div>
                    <div className="flex flex-col gap-1 text-xs">
                      <span className="font-bold text-[#6b0d09] text-sm">
                        Como funciona o envio dos arquivos e fotos:
                      </span>
                      <p className="text-[#57423f] leading-relaxed">
                        Ao clicar no botão abaixo, uma nova aba do <strong>Gmail</strong> se abrirá com todos os dados preenchidos.
                      </p>
                      <p className="text-[#1e1b1c] font-semibold bg-[#f5eced] p-2 rounded border border-[#dec0bb]/60 mt-0.5">
                        📎 Na tela do Gmail, basta clicar no ícone de <strong>clipe</strong> para anexar suas fotos/documentos originais e clicar em <strong>Enviar</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Botão de Envio Principal */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={collabSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#6b0d09] hover:bg-[#8b261d] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {collabSubmitting ? (
                        <>
                          <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                          <span>Abrindo o Gmail...</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-[20px]">open_in_new</span>
                          <span>Continuar e Anexar Fotos no Gmail</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
