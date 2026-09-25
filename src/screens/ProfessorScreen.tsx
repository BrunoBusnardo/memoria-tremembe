import React, { useState, useRef, useEffect } from 'react';
import { NavScreen, PedagogicalProposal, LessonPlan } from '../types';
import { pedagogicalProposals, bnccCompetencies } from '../data/pedagogicalData';
import { PedagogicalProposalDetailModal } from '../components/PedagogicalProposalDetailModal';

interface ProfessorScreenProps {
  onNavigate: (screen: NavScreen) => void;
  onOpenLessonPlan?: (plan: LessonPlan, mode: 'plano' | 'aluno') => void;
  onOpenImage: (url: string, title: string, alt: string) => void;
  onShowToast: (msg: string) => void;
}

interface AttachedFileInfo {
  file: File;
  id: string;
  name: string;
  size: number;
  formattedSize: string;
  type: string;
  previewUrl?: string;
}

interface SubmittedRecord {
  id: string;
  title: string;
  author: string;
  email: string;
  school: string;
  segment: string;
  date: string;
  time: string;
  filesCount: number;
  fileNames: string[];
  status: string;
}

export const ProfessorScreen: React.FC<ProfessorScreenProps> = ({
  onNavigate,
  onOpenImage,
  onShowToast,
}) => {
  const [stageFilter, setStageFilter] = useState<'all' | 'fund1' | 'fund2' | 'medio'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProposal, setSelectedProposal] = useState<PedagogicalProposal | null>(null);
  
  const teacherPhotoUrl = 'https://res.cloudinary.com/hjw9p1xw/image/upload/v1790277791/copy_of_whatsapp_image_2026-08-26_at_175709.jpg';

  const filteredProposals = pedagogicalProposals.filter((proposal) => {
    // Stage filter
    if (stageFilter === 'fund1' && !proposal.segmento.includes('Fundamental I')) return false;
    if (stageFilter === 'fund2' && !proposal.segmento.includes('Fundamental II')) return false;
    if (stageFilter === 'medio' && !proposal.segmento.includes('Médio')) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = proposal.titulo.toLowerCase().includes(q);
      const matchAuthor = proposal.autor.toLowerCase().includes(q);
      const matchSchool = proposal.escola.toLowerCase().includes(q);
      const matchSubject = proposal.disciplina.toLowerCase().includes(q);
      const matchTheme = proposal.temaPatrimonio.toLowerCase().includes(q);
      const matchSummary = proposal.resumoProposta.toLowerCase().includes(q);
      const matchBNCC = proposal.habilidadesBNCC.some(h => h.toLowerCase().includes(q));
      if (!matchTitle && !matchAuthor && !matchSchool && !matchSubject && !matchTheme && !matchSummary && !matchBNCC) {
        return false;
      }
    }

    return true;
  });

  // Teacher Submission Form state
  const [teacherName, setTeacherName] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [gradeLevel, setGradeLevel] = useState('Ensino Fundamental II (6º ao 9º Ano)');
  const [practiceTitle, setPracticeTitle] = useState('');
  const [archivalSources, setArchivalSources] = useState('');
  const [practiceReport, setPracticeReport] = useState('');
  const [finalProduct, setFinalProduct] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // File upload state
  const [attachedFiles, setAttachedFiles] = useState<AttachedFileInfo[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Submission status state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [lastSubmission, setLastSubmission] = useState<SubmittedRecord | null>(null);

  // Local storage history of submissions
  const [history, setHistory] = useState<SubmittedRecord[]>(() => {
    try {
      const saved = localStorage.getItem('memoria_tremembe_propostas_enviadas');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const CURATOR_EMAIL = 'brunobusnardo.his@edutremembe.com.br';
  const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileBadge = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase() || '';
    if (ext === 'pdf') {
      return { badge: 'PDF', bg: 'bg-[#ffdad5]', text: 'text-[#410001]', icon: 'picture_as_pdf' };
    }
    if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext)) {
      return { badge: 'FOTO', bg: 'bg-[#d1e8d4]', text: 'text-[#0e3e1a]', icon: 'image' };
    }
    if (['doc', 'docx', 'odt', 'rtf', 'txt'].includes(ext)) {
      return { badge: 'DOC', bg: 'bg-[#d8e2ff]', text: 'text-[#001945]', icon: 'description' };
    }
    if (['ppt', 'pptx'].includes(ext)) {
      return { badge: 'SLIDES', bg: 'bg-[#ffdea5]', text: 'text-[#261900]', icon: 'slideshow' };
    }
    if (['zip', 'rar', '7z'].includes(ext)) {
      return { badge: 'ZIP', bg: 'bg-[#eedcff]', text: 'text-[#290055]', icon: 'folder_zip' };
    }
    return { badge: 'ARQUIVO', bg: 'bg-[#efe6e7]', text: 'text-[#57423f]', icon: 'attach_file' };
  };

  const processFiles = (rawFiles: FileList | File[]) => {
    const newFiles: AttachedFileInfo[] = [];
    const filesArray = Array.from(rawFiles);

    for (const file of filesArray) {
      if (file.size > MAX_FILE_SIZE) {
        onShowToast(`O arquivo "${file.name}" excede o limite de 25 MB.`);
        continue;
      }

      // Check if already added
      const exists = attachedFiles.some((f) => f.name === file.name && f.size === file.size);
      if (exists) continue;

      let previewUrl: string | undefined = undefined;
      if (file.type.startsWith('image/')) {
        previewUrl = URL.createObjectURL(file);
      }

      newFiles.push({
        file,
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        name: file.name,
        size: file.size,
        formattedSize: formatFileSize(file.size),
        type: file.type,
        previewUrl,
      });
    }

    if (newFiles.length > 0) {
      setAttachedFiles((prev) => [...prev, ...newFiles]);
      onShowToast(`${newFiles.length} arquivo(s) anexado(s) com sucesso.`);
    }
  };

  const handleRemoveFile = (id: string) => {
    setAttachedFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target?.previewUrl) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  const handleClearAllFiles = () => {
    attachedFiles.forEach((f) => {
      if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
    });
    setAttachedFiles([]);
  };

  // Drag and drop events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const generateMailtoLink = () => {
    const subject = encodeURIComponent(
      `[Portal Memória Tremembé] Proposta Pedagógica: ${practiceTitle || 'Nova Proposta'} - Prof(a). ${teacherName || 'Docente'}`
    );
    const body = encodeURIComponent(
      `Prezado Professor Bruno Busnardo,

Submeto a proposta pedagógica desenvolvida a partir do Portal Estação da Memória: Tremembé para curadoria e publicação no acervo docente.

--- DADOS DA PROPOSTA PEDAGÓGICA ---
• Professor(a): ${teacherName}
• E-mail: ${teacherEmail}
• Escola / Unidade: ${schoolName}
• Segmento / Ano Escolar: ${gradeLevel}
• Título da Proposta: ${practiceTitle}
• Fontes do Acervo de Tremembé: ${archivalSources || 'Gerais'}
• Produção Esperada dos Estudantes: ${finalProduct || 'Trabalhos investigativos'}

--- DESCRIÇÃO E METODOLOGIA EM SALA DE AULA ---
${practiceReport}

--- TERMO DE AUTORIZAÇÃO ---
Autorizo a publicação desta proposta com os devidos créditos de autoria sob a licença livre Creative Commons Atribuição 4.0 Internacional (CC BY 4.0).
${attachedFiles.length > 0 ? `\n(Arquivos anexados a este e-mail: ${attachedFiles.map((f) => `${f.name} (${f.formattedSize})`).join(', ')})` : ''}

Atenciosamente,
${teacherName}`
    );
    return `mailto:${CURATOR_EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherName.trim() || !teacherEmail.trim() || !schoolName.trim() || !practiceTitle.trim() || !practiceReport.trim() || !termsAccepted) {
      onShowToast('Por favor, preencha todos os campos obrigatórios (*) e autorize a licença.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const record: SubmittedRecord = {
      id: 'PROP-' + Date.now(),
      title: practiceTitle,
      author: teacherName,
      email: teacherEmail,
      school: schoolName,
      segment: gradeLevel,
      date: new Date().toLocaleDateString('pt-BR'),
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      filesCount: attachedFiles.length,
      fileNames: attachedFiles.map((f) => f.name),
      status: `Encaminhado para ${CURATOR_EMAIL}`,
    };

    const emailSubject = `[Portal Memória Tremembé] Proposta Pedagógica: ${practiceTitle} - Prof(a). ${teacherName}`;
    const emailBody = 
      `PROPOSIÇÃO PEDAGÓGICA - ESPAÇO DO PROFESSOR\n` +
      `===================================================\n\n` +
      `DADOS DO(A) DOCENTE:\n` +
      `Professor(a): ${teacherName}\n` +
      `E-mail: ${teacherEmail}\n` +
      `Escola / Unidade: ${schoolName}\n` +
      `Segmento / Ano Escolar: ${gradeLevel}\n\n` +
      `IDENTIFICAÇÃO DA PROPOSTA:\n` +
      `Título: ${practiceTitle}\n` +
      `Fontes do Acervo Utilizadas: ${archivalSources || 'Fontes gerais do portal'}\n` +
      `Produção Esperada dos Estudantes: ${finalProduct || 'Não especificado'}\n\n` +
      `METODOLOGIA E RELATO DE PRÁTICA EM SALA DE AULA:\n` +
      `${practiceReport}\n\n` +
      `---------------------------------------------------\n` +
      `* ATENÇÃO PROFESSOR(A): Anexe seus planos de aula, slides ou fotos dos estudantes diretamente neste e-mail (usando o ícone de clipe do Gmail) antes de enviar!\n` +
      `---------------------------------------------------\n\n` +
      `Submetido através do Portal da Memória e História de Tremembé`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CURATOR_EMAIL)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    setTimeout(() => {
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
      setLastSubmission(record);
      const newHistory = [record, ...history];
      setHistory(newHistory);
      try {
        localStorage.setItem('memoria_tremembe_propostas_enviadas', JSON.stringify(newHistory));
      } catch {}

      setSubmitSuccess(true);
      setIsSubmitting(false);
      onShowToast('Aba do Gmail aberta com sua proposta pronta!');
    }, 500);
  };

  const handleResetForm = () => {
    setTeacherName('');
    setTeacherEmail('');
    setSchoolName('');
    setPracticeTitle('');
    setArchivalSources('');
    setPracticeReport('');
    setFinalProduct('');
    setTermsAccepted(false);
    handleClearAllFiles();
    setSubmitSuccess(false);
    setSubmitError(null);
    setLastSubmission(null);
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('memoria_tremembe_propostas_enviadas');
      onShowToast('Histórico local de envios limpo com sucesso.');
    } catch {}
  };

  return (
    <div className="flex flex-col w-full animate-fadeIn">
      {/* Top Archival Notification Ledger Ribbon */}
      <div className="w-full bg-[#efe6e7] py-1.5 px-4 md:px-6 lg:px-8 border-b border-[#dec0bb]/60">
        <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-2 text-[#57423f] text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#6b0d09] animate-pulse"></span>
            <span className="uppercase tracking-wider font-semibold">
              ESPAÇO DO PROFESSOR • REPOSITÓRIO DE PROPOSTAS PEDAGÓGICAS
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#775a19] font-bold">PROPOSTAS CRIADAS POR EDUCADORES</span>
            <span>•</span>
            <span className="uppercase">ALINHADO À BNCC: HISTÓRIA &amp; GEOGRAFIA</span>
          </div>
        </div>
      </div>

      {/* Editorial Section Header */}
      <section className="relative w-full py-12 lg:py-16 bg-[#fbf1f2] overflow-hidden border-b border-[#dec0bb]/60">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#ffdea5]/40 blur-3xl pointer-events-none"></div>
        <div className="max-w-[1360px] mx-auto px-4 md:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-[#e9e0e1] text-[#6b0d09] text-xs font-mono font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[15px]">school</span>
                <span>Espaço do Professor • Produção e Saberes Docentes</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-[#6b0d09] tracking-tight font-bold leading-tight">
                Propostas Pedagógicas e Produção Docente em História Local
              </h1>

              <p className="text-base sm:text-lg text-[#57423f] max-w-[850px] leading-relaxed">
                Repositório colaborativo de propostas pedagógicas elaboradas por educadores da rede. Um espaço para professores compartilharem práticas, projetos investigativos e atividades que articulam as fontes históricas e iconográficas de Tremembé às competências da BNCC na sala de aula.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#propostas-pedagogicas"
                  className="px-5 py-3 rounded bg-[#6b0d09] hover:bg-[#8b261d] text-white text-sm font-semibold shadow-md transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">menu_book</span>
                  <span>Explorar Propostas Pedagógicas</span>
                </a>

                <a
                  href="#compartilhar-pratica"
                  className="px-5 py-3 rounded bg-[#f5eced] hover:bg-[#efe6e7] text-[#6b0d09] text-sm font-semibold transition-colors flex items-center gap-2 border border-[#dec0bb]"
                >
                  <span className="material-symbols-outlined text-[18px]">rate_review</span>
                  <span>Enviar Proposta para Publicação</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 bg-white p-6 rounded-xl shadow-md border border-[#dec0bb]">
              <div className="flex items-center justify-between pb-2 border-b border-[#dec0bb]">
                <span className="text-xs uppercase font-bold text-[#775a19] tracking-wider">
                  Painel de Propostas
                </span>
                <span className="material-symbols-outlined text-[#775a19] text-[20px]">school</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded bg-[#fbf1f2] flex flex-col border border-[#dec0bb]/50">
                  <span className="font-serif text-2xl text-[#6b0d09] font-bold">
                    {pedagogicalProposals.length < 10 ? `0${pedagogicalProposals.length}` : pedagogicalProposals.length}
                  </span>
                  <span className="text-[11px] text-[#57423f]">Propostas Publicadas</span>
                </div>
                <div className="p-3 rounded bg-[#fbf1f2] flex flex-col border border-[#dec0bb]/50">
                  <span className="font-serif text-2xl text-[#775a19] font-bold">12+</span>
                  <span className="text-[11px] text-[#57423f]">Habilidades BNCC</span>
                </div>
                <div className="p-3 rounded bg-[#fbf1f2] flex flex-col border border-[#dec0bb]/50">
                  <span className="font-serif text-2xl text-[#1e1b1c] font-bold">100%</span>
                  <span className="text-[11px] text-[#57423f]">Autoria Docente</span>
                </div>
                <div className="p-3 rounded bg-[#fbf1f2] flex flex-col border border-[#dec0bb]/50">
                  <span className="font-serif text-2xl text-[#3d3231] font-bold">CC 4.0</span>
                  <span className="text-[11px] text-[#57423f]">Acesso Público Livre</span>
                </div>
              </div>

              <div className="pt-2 text-[#57423f] text-[11px] flex items-center gap-1.5 border-t border-[#dec0bb]/50">
                <span className="material-symbols-outlined text-[14px] text-[#775a19]">verified</span>
                <span>Curadoria docente • Conteúdo feito por professores para professores</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Metodologia de Investigação Histórica na Sala de Aula */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col gap-1 mb-8">
            <div className="flex items-center gap-1.5 text-[#775a19] text-xs font-mono font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              <span>Prática Pedagógica &amp; Investigação Histórica na Escola</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-[#6b0d09] font-bold">
              O Acervo de Tremembé como Laboratório de Cidadania
            </h2>
            <p className="text-sm text-[#57423f] max-w-[820px]">
              Metodologias de ensino ativo que transformam fotografias antigas, relatos de moradores e marcos históricos em objetos de reflexão, pesquisa e autoria para os estudantes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Main Large Card */}
            <div className="md:col-span-7 bg-[#fbf1f2] rounded-xl overflow-hidden shadow-md flex flex-col border border-[#dec0bb]">
              <div 
                className="relative h-72 w-full overflow-hidden cursor-pointer group"
                onClick={() => onOpenImage(
                  teacherPhotoUrl,
                  'Educadores em Desenvolvimento de Propostas Pedagógicas',
                  'Professores da rede em reflexão pedagógica e análise do acervo histórico'
                )}
                title="Clique para ver imagem com link direto"
              >
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt="Educadores da rede pública em trabalho de reflexão e elaboração pedagógica sobre o patrimônio de Tremembé"
                  src="https://res.cloudinary.com/hjw9p1xw/image/upload/v1790277791/copy_of_whatsapp_image_2026-08-26_at_175709.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#6b0d09]/80 via-[#6b0d09]/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#ffdea5] text-[#261900] font-bold uppercase tracking-wider inline-block mb-1">
                    Produção Docente Local
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold leading-tight">
                    A Memória Local na Sala de Aula: Investigando os 4 Eixos de Tremembé
                  </h3>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(teacherPhotoUrl);
                    onShowToast('Link direto da foto dos educadores copiado!');
                  }}
                  className="absolute top-3 right-3 bg-white/90 hover:bg-white text-[#6b0d09] px-2 py-1 rounded text-xs shadow-sm flex items-center gap-1 font-semibold"
                  title="Copiar URL direta"
                >
                  <span className="material-symbols-outlined text-[14px]">link</span>
                  <span>Link Direto</span>
                </button>
              </div>

              <div className="p-6 flex flex-col gap-4 flex-grow justify-between">
                <p className="text-sm text-[#57423f] leading-relaxed">
                  As propostas pedagógicas formuladas pelos professores colocam os alunos em contato direto com reproduções de fontes históricas primárias (fotos de época, plantas, jornais antigos e memórias orais), permitindo que construam noções de temporalidade histórica, permanência e mudança a partir de sua própria cidade.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  <div className="p-2.5 rounded bg-white text-center border border-[#dec0bb]/60">
                    <span className="material-symbols-outlined text-[#6b0d09] text-[20px] block mx-auto">train</span>
                    <span className="text-xs text-[#1e1b1c] font-bold block mt-1">1. A Estação</span>
                    <span className="text-[10px] text-[#57423f]">Trabalho &amp; Vapor</span>
                  </div>
                  <div className="p-2.5 rounded bg-white text-center border border-[#dec0bb]/60">
                    <span className="material-symbols-outlined text-[#6b0d09] text-[20px] block mx-auto">church</span>
                    <span className="text-xs text-[#1e1b1c] font-bold block mt-1">2. A Basílica</span>
                    <span className="text-[10px] text-[#57423f]">Origens &amp; Fé</span>
                  </div>
                  <div className="p-2.5 rounded bg-white text-center border border-[#dec0bb]/60">
                    <span className="material-symbols-outlined text-[#6b0d09] text-[20px] block mx-auto">water</span>
                    <span className="text-xs text-[#1e1b1c] font-bold block mt-1">3. As Várzeas</span>
                    <span className="text-[10px] text-[#57423f]">Rio Paraíba</span>
                  </div>
                  <div className="p-2.5 rounded bg-white text-center border border-[#dec0bb]/60">
                    <span className="material-symbols-outlined text-[#6b0d09] text-[20px] block mx-auto">temple_buddhist</span>
                    <span className="text-xs text-[#1e1b1c] font-bold block mt-1">4. O Mosteiro</span>
                    <span className="text-[10px] text-[#57423f]">Trapa &amp; Arroz</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Column: Methodology & Testimonial */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <div className="bg-[#f5eced] rounded-xl p-6 shadow-xs border border-[#dec0bb] flex flex-col gap-3">
                <span className="text-xs uppercase font-bold text-[#775a19] tracking-wider">
                  Estrutura Pedagógica Recomendada
                </span>
                <h4 className="font-serif text-lg font-bold text-[#6b0d09]">
                  Os 3 Momentos da Investigação com Fontes
                </h4>
                <div className="space-y-3 pt-1">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#8b261d] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#1e1b1c] block">Problematização com Fontes do Acervo:</span>
                      <span className="text-xs text-[#57423f]">Projeção ou impressão de fotografias históricas e questionamentos iniciais sobre as pistas do passado.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#8b261d] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#1e1b1c] block">Investigação e Diálogo Intergeracional:</span>
                      <span className="text-xs text-[#57423f]">Coleta de relatos com familiares e moradores, confronto entre documentos textuais e visuais.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#8b261d] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      3
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#1e1b1c] block">Síntese e Autoria dos Alunos:</span>
                      <span className="text-xs text-[#57423f]">Produção de murais, fanzines, mini-podcasts, cartas de época e exposições escolares.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#ffdea5]/30 rounded-xl p-6 shadow-xs border border-[#ffdea5] flex flex-col gap-2">
                <span className="material-symbols-outlined text-[#775a19] text-[28px]">format_quote</span>
                <p className="font-serif text-base italic text-[#1e1b1c] leading-relaxed">
                  "Trabalhar com as fotografias reais do acervo fez com que os estudantes se sentissem verdadeiros historiadores. Eles reconheceram os lugares por onde passam todos os dias e descobriram histórias incríveis de suas próprias famílias."
                </p>
                <div className="pt-2 border-t border-[#dec0bb]/40">
                  <span className="text-xs font-bold text-[#6b0d09] block">Profa. Mariana Siqueira</span>
                  <span className="text-[11px] text-[#57423f] uppercase">EMEF Prof. Américo Bonetti • Tremembé</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* REPOSITÓRIO DE PROPOSTAS PEDAGÓGICAS DOS PROFESSORES */}
      <section className="w-full py-16 bg-[#fbf1f2] border-t border-[#dec0bb]/60" id="propostas-pedagogicas">
        <div className="max-w-[1360px] mx-auto px-4 md:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-[#6b0d09] text-xs font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px]">folder_special</span>
                <span>Produção Colaborativa dos Educadores</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-[#6b0d09] font-bold">
                Propostas Pedagógicas dos Professores
              </h2>
              <p className="text-sm text-[#57423f] max-w-[700px]">
                Propostas didáticas autorais criadas por educadores da rede e publicadas pela nossa curadoria. Explore os projetos, adapte para sua turma e compartilhe novas experiências!
              </p>
            </div>

            {/* Stage filter buttons */}
            <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-lg border border-[#dec0bb] shadow-xs self-start">
              <button
                onClick={() => setStageFilter('all')}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                  stageFilter === 'all'
                    ? 'bg-[#6b0d09] text-white shadow-xs'
                    : 'text-[#57423f] hover:bg-[#efe6e7]'
                }`}
              >
                Todos ({pedagogicalProposals.length})
              </button>
              <button
                onClick={() => setStageFilter('fund1')}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                  stageFilter === 'fund1'
                    ? 'bg-[#6b0d09] text-white shadow-xs'
                    : 'text-[#57423f] hover:bg-[#efe6e7]'
                }`}
              >
                Fundamental I
              </button>
              <button
                onClick={() => setStageFilter('fund2')}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                  stageFilter === 'fund2'
                    ? 'bg-[#6b0d09] text-white shadow-xs'
                    : 'text-[#57423f] hover:bg-[#efe6e7]'
                }`}
              >
                Fundamental II
              </button>
              <button
                onClick={() => setStageFilter('medio')}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                  stageFilter === 'medio'
                    ? 'bg-[#6b0d09] text-white shadow-xs'
                    : 'text-[#57423f] hover:bg-[#efe6e7]'
                }`}
              >
                Ensino Médio
              </button>
            </div>
          </div>

          {/* Search bar inside repository */}
          <div className="mb-6 bg-white p-3 rounded-xl border border-[#dec0bb] shadow-xs flex flex-col sm:flex-row items-center gap-3">
            <div className="flex-1 flex items-center gap-2 w-full px-2">
              <span className="material-symbols-outlined text-[#775a19] text-[20px]">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por tema, professor, escola, habilidade BNCC ou palavra-chave..."
                className="w-full text-xs sm:text-sm text-[#1e1b1c] bg-transparent focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-[#57423f] hover:text-[#6b0d09]"
                >
                  Limpar
                </button>
              )}
            </div>
            <div className="text-xs text-[#57423f] font-mono px-3 py-1 bg-[#f5eced] rounded border border-[#dec0bb]/60 whitespace-nowrap self-stretch sm:self-auto text-center">
              {filteredProposals.length} {filteredProposals.length === 1 ? 'proposta encontrada' : 'propostas encontradas'}
            </div>
          </div>

          {/* Grid de Propostas Pedagógicas */}
          {filteredProposals.length === 0 ? (
            <div className="bg-white rounded-xl p-10 text-center border border-[#dec0bb] shadow-xs flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-[#775a19] text-[40px]">search_off</span>
              <h4 className="font-serif text-lg font-bold text-[#6b0d09]">Nenhuma proposta encontrada com esses filtros</h4>
              <p className="text-xs text-[#57423f] max-w-md">
                Tente buscar com termos mais amplos ou limpe os filtros para visualizar todas as propostas pedagógicas disponíveis.
              </p>
              <button
                onClick={() => {
                  setStageFilter('all');
                  setSearchQuery('');
                }}
                className="mt-2 px-4 py-2 rounded bg-[#6b0d09] text-white text-xs font-semibold"
              >
                Limpar Todos os Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProposals.map((proposal) => (
                <div
                  key={proposal.id}
                  className="bg-white rounded-xl p-6 shadow-xs hover:shadow-lg transition-all duration-300 border border-[#dec0bb] flex flex-col justify-between group"
                >
                  <div className="flex flex-col gap-3">
                    
                    {/* Header do Card */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#ffdad5] text-[#410001]">
                          {proposal.segmento.split('(')[0].trim()}
                        </span>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#ffdea5] text-[#261900]">
                          {proposal.disciplina}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#775a19]">
                        {proposal.codigo}
                      </span>
                    </div>

                    {/* BNCC Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                      {proposal.habilidadesBNCC.map((hab, i) => (
                        <span key={i} className="text-[11px] font-mono font-bold text-[#6b0d09] bg-[#efe6e7] px-1.5 py-0.5 rounded">
                          {hab}
                        </span>
                      ))}
                      <span className="text-[11px] text-[#57423f]">BNCC</span>
                    </div>

                    {/* Título da Proposta */}
                    <h3 className="font-serif text-lg font-bold text-[#6b0d09] leading-snug group-hover:text-[#8b261d] transition-colors">
                      {proposal.titulo}
                    </h3>

                    {/* Autor & Escola */}
                    <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#fbf1f2] border border-[#dec0bb]/60">
                      <div className="w-8 h-8 rounded-full bg-[#dec0bb] flex items-center justify-center text-[#6b0d09] font-bold font-serif text-xs">
                        {proposal.autor.charAt(0)}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-[#1e1b1c] truncate">{proposal.autor}</span>
                        <span className="text-[10px] text-[#57423f] truncate">{proposal.escola}</span>
                      </div>
                    </div>

                    {/* Resumo da Proposta */}
                    <p className="text-xs text-[#57423f] leading-relaxed line-clamp-3">
                      {proposal.resumoProposta}
                    </p>

                    {/* Fontes do Acervo */}
                    <div className="p-2.5 rounded bg-[#f5eced] border border-[#dec0bb]/50">
                      <span className="text-[10px] uppercase font-bold text-[#775a19] tracking-wider block mb-0.5">
                        Fontes do Acervo Utilizadas
                      </span>
                      <p className="text-[11px] text-[#1e1b1c] line-clamp-2">
                        {proposal.fontesAcervo}
                      </p>
                    </div>

                  </div>

                  {/* Card Footer / Ações */}
                  <div className="pt-4 mt-4 border-t border-[#dec0bb]/60 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-[11px] text-[#57423f]">
                      <span className="flex items-center gap-1 font-semibold text-[#6b0d09]">
                        <span className="material-symbols-outlined text-[14px]">verified</span>
                        <span>{proposal.publicadoPor}</span>
                      </span>
                      <span>{proposal.dataPublicacao}</span>
                    </div>

                    <button
                      onClick={() => setSelectedProposal(proposal)}
                      className="w-full py-2.5 px-3 rounded bg-[#6b0d09] hover:bg-[#8b261d] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[16px]">visibility</span>
                      <span>Visualizar Proposta Completa</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

          {/* Banner de Incentivo à Publicação */}
          <div className="mt-12 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#dec0bb] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#8b261d] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[26px]">edit_note</span>
              </div>
              <div className="flex flex-col">
                <h4 className="font-serif text-lg font-bold text-[#6b0d09]">
                  Você também desenvolve projetos sobre a história de Tremembé?
                </h4>
                <p className="text-xs sm:text-sm text-[#57423f]">
                  Envie sua proposta pedagógica para publicação. Como eu que realizo a publicação deste acervo, sua prática será revisada pela curadoria e divulgada com todos os seus créditos!
                </p>
              </div>
            </div>

            <a
              href="#compartilhar-pratica"
              className="px-5 py-2.5 rounded bg-[#6b0d09] hover:bg-[#8b261d] text-white text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">upload_file</span>
              <span>Enviar Minha Proposta</span>
            </a>
          </div>

        </div>
      </section>

      {/* Matriz Curricular Integrada BNCC */}
      <section className="w-full py-16 bg-[#f5eced] border-t border-[#dec0bb]/60">
        <div className="max-w-[1360px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col gap-1 mb-8 text-center max-w-[760px] mx-auto">
            <span className="text-xs font-mono uppercase font-bold text-[#775a19] tracking-wider">
              Matriz Curricular Integrada
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-[#6b0d09] font-bold">
              Articulação com as Habilidades da BNCC
            </h2>
            <p className="text-sm text-[#57423f]">
              Consulte o enquadramento normativo para justificar e registrar suas propostas didáticas nos diários de classe digitais da rede.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bnccCompetencies.map((comp, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 shadow-xs border border-[#dec0bb] flex flex-col justify-between"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between pb-2 border-b border-[#dec0bb]/50">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#6b0d09] text-white">
                      {comp.codigo}
                    </span>
                    <span className="text-xs font-mono text-[#775a19] font-bold">
                      {comp.ano}
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#1e1b1c]">
                    {comp.tema}
                  </h3>

                  <p className="text-xs text-[#57423f] leading-relaxed italic">
                    "{comp.texto}"
                  </p>
                </div>

                <div className="pt-4 mt-2 border-t border-[#dec0bb]/50">
                  <span className="text-[10px] uppercase text-[#6b0d09] font-bold block">
                    Proposta Vinculada:
                  </span>
                  <span className="text-xs text-[#1e1b1c] font-semibold">
                    {comp.seqVinculada}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Envio de Propostas Pedagógicas para Publicação */}
      <section className="w-full py-16 bg-white border-t border-[#dec0bb]/60" id="compartilhar-pratica">
        <div className="max-w-[1360px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="bg-[#fbf1f2] rounded-2xl p-6 md:p-10 shadow-lg border border-[#dec0bb]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Curatorial Information */}
              <div className="lg:col-span-5 flex flex-col gap-5 justify-between">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-1.5 text-[#6b0d09] text-xs font-mono font-bold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span>Curadoria Docente • Envio Real</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#6b0d09] font-bold leading-tight">
                    Envie sua Proposta Pedagógica para Publicação no Portal
                  </h2>
                  <p className="text-xs sm:text-sm text-[#57423f] leading-relaxed">
                    Você desenvolveu uma atividade, projeto ou proposta sobre a memória e história de Tremembé com seus estudantes? Preencha o formulário ao lado e anexe seus arquivos (PDFs, fotos de trabalhos dos alunos, documentos Word ou apresentações).
                  </p>
                  <p className="text-xs sm:text-sm text-[#57423f] leading-relaxed">
                    Todas as submissões deste canal são encaminhadas diretamente para a caixa institucional do professor curador em <strong className="text-[#6b0d09] font-semibold">{CURATOR_EMAIL}</strong>, responsável pela curadoria e inclusão no acervo público com todos os créditos da sua autoria.
                  </p>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-[#dec0bb]/60 shadow-xs">
                    <span className="material-symbols-outlined text-[#775a19] text-[22px] mt-0.5">verified_user</span>
                    <div>
                      <span className="text-xs font-bold text-[#1e1b1c] block">Autoria &amp; Reconhecimento Docente</span>
                      <span className="text-[11px] text-[#57423f]">Identificação nominal completa do professor, disciplina e unidade escolar.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-[#dec0bb]/60 shadow-xs">
                    <span className="material-symbols-outlined text-[#775a19] text-[22px] mt-0.5">mail</span>
                    <div>
                      <span className="text-xs font-bold text-[#1e1b1c] block">Envio Direto ao E-mail Institucional</span>
                      <span className="text-[11px] text-[#57423f]">
                        Recebimento direto em <strong>{CURATOR_EMAIL}</strong> com todos os arquivos em anexo.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-[#dec0bb]/60 shadow-xs">
                    <span className="material-symbols-outlined text-[#775a19] text-[22px] mt-0.5">attach_file</span>
                    <div>
                      <span className="text-xs font-bold text-[#1e1b1c] block">Suporte a Múltiplos Arquivos</span>
                      <span className="text-[11px] text-[#57423f]">Anexe PDFs, fotos de sala de aula, cadernos de atividades ou slides (até 25 MB por arquivo).</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-[#dec0bb]/60 shadow-xs">
                    <span className="material-symbols-outlined text-[#775a19] text-[22px] mt-0.5">public</span>
                    <div>
                      <span className="text-xs font-bold text-[#1e1b1c] block">Licença Livre Aberta (CC BY 4.0)</span>
                      <span className="text-[11px] text-[#57423f]">Difusão pública sem fins lucrativos para apoio a colegas professores.</span>
                    </div>
                  </div>
                </div>

                {/* Direct Curator Contact Card */}
                <div className="p-4 rounded-xl bg-white border-2 border-[#dec0bb] flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#6b0d09] text-white flex items-center justify-center font-bold text-xs font-serif">
                      B
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#1e1b1c]">Prof. Bruno Busnardo</span>
                      <span className="text-[10px] text-[#775a19] uppercase font-bold tracking-wider">
                        Curador do Acervo &amp; Professor de História
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-[#57423f] break-all pt-1">
                    E-mail Direto: <strong className="text-[#6b0d09]">{CURATOR_EMAIL}</strong>
                  </div>
                  <a
                    href={`mailto:${CURATOR_EMAIL}?subject=[Portal%20Memória%20Tremembé]%20Contato%20Curadoria`}
                    className="mt-1 text-center py-1.5 px-3 rounded bg-[#f5eced] hover:bg-[#efe6e7] text-[#6b0d09] font-semibold text-xs transition-colors border border-[#dec0bb]"
                  >
                    Escrever Diretamente por E-mail
                  </a>
                </div>
              </div>

              {/* Right Column: Form or Success Confirmation Card */}
              <div className="lg:col-span-7 bg-white rounded-xl p-5 sm:p-7 shadow-sm border border-[#dec0bb] flex flex-col justify-between">
                
                {submitSuccess ? (
                  <div className="flex flex-col gap-5 py-4 animate-fadeIn">
                    
                    {/* Header Banner */}
                    <div className="p-4 rounded-xl bg-[#e6f4ea] border border-[#34a853]/40 flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#137333] text-[28px] flex-shrink-0">
                        check_circle
                      </span>
                      <div className="flex flex-col gap-1">
                        <h3 className="font-serif text-lg font-bold text-[#137333]">
                          Proposta Pedagógica Encaminhada com Sucesso!
                        </h3>
                        <p className="text-xs text-[#1e1b1c] leading-relaxed">
                          Sua proposta e os arquivos anexados foram despachados com sucesso para a caixa de e-mail da curadoria em <strong>{CURATOR_EMAIL}</strong>.
                        </p>
                      </div>
                    </div>

                    {submitError && (
                      <div className="p-3.5 rounded-lg bg-[#fff8e1] border border-[#f9ab00] text-xs text-[#7c4d00]">
                        <p className="font-semibold mb-1">Aviso de envio complementar:</p>
                        <p>{submitError}</p>
                      </div>
                    )}

                    {/* Summary of what was sent */}
                    {lastSubmission && (
                      <div className="bg-[#fbf1f2] rounded-xl p-4 sm:p-5 border border-[#dec0bb] flex flex-col gap-3">
                        <div className="flex items-center justify-between pb-2 border-b border-[#dec0bb]/60">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#775a19]">
                            Comprovante de Envio
                          </span>
                          <span className="text-[11px] font-mono text-[#57423f]">
                            {lastSubmission.date} às {lastSubmission.time}
                          </span>
                        </div>

                        <div>
                          <span className="text-xs text-[#57423f] uppercase block font-bold">Título da Proposta:</span>
                          <h4 className="font-serif text-base font-bold text-[#6b0d09] leading-snug">
                            {lastSubmission.title}
                          </h4>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-[#57423f] block font-semibold">Professor(a):</span>
                            <span className="text-[#1e1b1c]">{lastSubmission.author}</span>
                          </div>
                          <div>
                            <span className="text-[#57423f] block font-semibold">E-mail:</span>
                            <span className="text-[#1e1b1c]">{lastSubmission.email}</span>
                          </div>
                          <div>
                            <span className="text-[#57423f] block font-semibold">Escola:</span>
                            <span className="text-[#1e1b1c]">{lastSubmission.school}</span>
                          </div>
                          <div>
                            <span className="text-[#57423f] block font-semibold">Segmento:</span>
                            <span className="text-[#1e1b1c]">{lastSubmission.segment}</span>
                          </div>
                        </div>

                        {lastSubmission.fileNames.length > 0 && (
                          <div className="pt-2 border-t border-[#dec0bb]/60">
                            <span className="text-[11px] font-bold text-[#57423f] block mb-1.5">
                              Arquivos Anexados ({lastSubmission.fileNames.length}):
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {lastSubmission.fileNames.map((name, i) => {
                                const badgeInfo = getFileBadge(name);
                                return (
                                  <div
                                    key={i}
                                    className="flex items-center gap-1.5 px-2 py-1 rounded bg-white border border-[#dec0bb] text-xs text-[#1e1b1c]"
                                  >
                                    <span className={`text-[9px] font-mono font-bold px-1 py-0.5 rounded ${badgeInfo.bg} ${badgeInfo.text}`}>
                                      {badgeInfo.badge}
                                    </span>
                                    <span className="truncate max-w-[200px]">{name}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        <div className="pt-2 border-t border-[#dec0bb]/60 flex items-center justify-between text-xs">
                          <span className="text-[#57423f]">Destino:</span>
                          <span className="font-mono font-bold text-[#6b0d09]">{CURATOR_EMAIL}</span>
                        </div>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        onClick={handleResetForm}
                        className="flex-1 py-3 px-4 rounded-lg bg-[#6b0d09] hover:bg-[#8b261d] text-white text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">add_circle</span>
                        <span>Enviar Nova Proposta</span>
                      </button>

                      <a
                        href={generateMailtoLink()}
                        className="py-3 px-4 rounded-lg bg-[#efe6e7] hover:bg-[#dec0bb] text-[#6b0d09] text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 border border-[#dec0bb] text-center"
                        title="Abre o Gmail / Outlook no seu dispositivo com todos os dados preenchidos"
                      >
                        <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                        <span>Abrir no Meu E-mail (Gmail / Outlook)</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitForm} className="flex flex-col gap-4">
                    
                    {/* Header do Formulário */}
                    <div className="flex items-center justify-between pb-2 border-b border-[#dec0bb]/60">
                      <div>
                        <h3 className="font-serif text-lg font-bold text-[#6b0d09]">
                          Formulário de Submissão de Proposta Pedagógica
                        </h3>
                        <p className="text-[11px] text-[#57423f]">
                          Campos com (*) são obrigatórios. Destino direto: <strong className="text-[#6b0d09]">{CURATOR_EMAIL}</strong>
                        </p>
                      </div>
                      <span className="hidden sm:inline-flex text-[10px] font-mono px-2 py-0.5 rounded bg-[#f5eced] text-[#775a19] font-bold border border-[#dec0bb]">
                        CAMINHO 1: E-MAIL REAL
                      </span>
                    </div>

                    {/* Linha 1: Nome e E-mail */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-[#1e1b1c] uppercase flex items-center justify-between">
                          <span>Nome do Professor *</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={teacherName}
                          onChange={(e) => setTeacherName(e.target.value)}
                          placeholder="Ex.: Profa. Ana Cláudia Silveira"
                          className="w-full bg-[#fbf1f2] px-3 py-2 rounded-lg text-xs text-[#1e1b1c] border border-[#dec0bb] focus:outline-none focus:border-[#6b0d09] transition-colors"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-[#1e1b1c] uppercase">E-mail para Resposta *</label>
                        <input
                          type="email"
                          required
                          value={teacherEmail}
                          onChange={(e) => setTeacherEmail(e.target.value)}
                          placeholder="Ex.: ana.silveira@educa.tremembe.sp.gov.br"
                          className="w-full bg-[#fbf1f2] px-3 py-2 rounded-lg text-xs text-[#1e1b1c] border border-[#dec0bb] focus:outline-none focus:border-[#6b0d09] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Linha 2: Escola e Segmento */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-[#1e1b1c] uppercase">Unidade Escolar / Rede *</label>
                        <input
                          type="text"
                          required
                          value={schoolName}
                          onChange={(e) => setSchoolName(e.target.value)}
                          placeholder="Ex.: EMEF Dr. Geraldo Costa"
                          className="w-full bg-[#fbf1f2] px-3 py-2 rounded-lg text-xs text-[#1e1b1c] border border-[#dec0bb] focus:outline-none focus:border-[#6b0d09] transition-colors"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-[#1e1b1c] uppercase">Segmento / Ano Escolar</label>
                        <select
                          value={gradeLevel}
                          onChange={(e) => setGradeLevel(e.target.value)}
                          className="w-full bg-[#fbf1f2] px-3 py-2 rounded-lg text-xs text-[#1e1b1c] border border-[#dec0bb] focus:outline-none focus:border-[#6b0d09] transition-colors cursor-pointer"
                        >
                          <option>Ensino Fundamental I (1º ao 5º Ano)</option>
                          <option>Ensino Fundamental II (6º ao 9º Ano)</option>
                          <option>Ensino Médio e EJA</option>
                        </select>
                      </div>
                    </div>

                    {/* Linha 3: Título da Proposta */}
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1e1b1c] uppercase">Título da Proposta Pedagógica *</label>
                      <input
                        type="text"
                        required
                        value={practiceTitle}
                        onChange={(e) => setPracticeTitle(e.target.value)}
                        placeholder="Ex.: Redescobrindo a Estação: Análise de Fotos Antigas e Fontes Orais"
                        className="w-full bg-[#fbf1f2] px-3 py-2 rounded-lg text-xs text-[#1e1b1c] border border-[#dec0bb] focus:outline-none focus:border-[#6b0d09] transition-colors"
                      />
                    </div>

                    {/* Linha 4: Fontes do Acervo */}
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1e1b1c] uppercase">
                        Fontes do Acervo de Tremembé Utilizadas (opcional)
                      </label>
                      <input
                        type="text"
                        value={archivalSources}
                        onChange={(e) => setArchivalSources(e.target.value)}
                        placeholder="Ex.: TRM_HIST_001 (Estação Ferroviária), TRM_HIST_003 (Praça Geraldo Costa), etc."
                        className="w-full bg-[#fbf1f2] px-3 py-2 rounded-lg text-xs text-[#1e1b1c] border border-[#dec0bb] focus:outline-none focus:border-[#6b0d09] transition-colors"
                      />
                    </div>

                    {/* Linha 5: Relato e Metodologia */}
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1e1b1c] uppercase">
                        Descrição e Metodologia da Proposta em Sala de Aula *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={practiceReport}
                        onChange={(e) => setPracticeReport(e.target.value)}
                        placeholder="Descreva detalhadamente como a proposta foi desenvolvida ou planejada com os alunos, etapas, questões investigativas e recursos utilizados..."
                        className="w-full bg-[#fbf1f2] px-3 py-2 rounded-lg text-xs text-[#1e1b1c] border border-[#dec0bb] focus:outline-none focus:border-[#6b0d09] resize-none transition-colors"
                      ></textarea>
                    </div>

                    {/* Linha 6: Produção Final */}
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1e1b1c] uppercase">Produção Final dos Estudantes</label>
                      <input
                        type="text"
                        value={finalProduct}
                        onChange={(e) => setFinalProduct(e.target.value)}
                        placeholder="Ex.: Mural coletivo na escola, fanzine digital, podcast de memórias familiares..."
                        className="w-full bg-[#fbf1f2] px-3 py-2 rounded-lg text-xs text-[#1e1b1c] border border-[#dec0bb] focus:outline-none focus:border-[#6b0d09] transition-colors"
                      />
                    </div>

                    {/* Caixa Explicativa Direta e Sem Dúvidas sobre o Envio e Anexos */}
                    <div className="p-4 rounded-xl bg-white border-2 border-[#dec0bb] flex items-start gap-3 shadow-xs">
                      <div className="w-10 h-10 rounded-lg bg-[#ffdea5] text-[#6b0d09] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[22px]">attach_file_add</span>
                      </div>
                      <div className="flex flex-col gap-1 text-xs">
                        <span className="font-bold text-[#6b0d09] text-sm">
                          Como funciona o envio dos arquivos e planos de aula:
                        </span>
                        <p className="text-[#57423f] leading-relaxed">
                          Ao clicar no botão abaixo, uma nova aba do <strong>Gmail</strong> se abrirá com todos os dados preenchidos.
                        </p>
                        <p className="text-[#1e1b1c] font-semibold bg-[#f5eced] p-2 rounded border border-[#dec0bb]/60 mt-0.5">
                          📎 Na tela do Gmail, basta clicar no ícone de <strong>clipe</strong> para anexar seus planos de aula, slides ou fotos e clicar em <strong>Enviar</strong>.
                        </p>
                      </div>
                    </div>

                    {/* Licença CC BY 4.0 Checkbox */}
                    <div className="flex items-start gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="autorizacao-docente"
                        required
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="w-4 h-4 text-[#6b0d09] rounded border-[#dec0bb] focus:ring-0 cursor-pointer mt-0.5"
                      />
                      <label htmlFor="autorizacao-docente" className="text-xs text-[#57423f] cursor-pointer leading-snug">
                        Autorizo a publicação desta proposta pedagógica e anexos pela curadoria do portal sob licença livre aberta <strong>Creative Commons (CC BY 4.0)</strong> com a devida atribuição da minha autoria.
                      </label>
                    </div>

                    {/* Submit Actions */}
                    <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-5 py-3 rounded-lg bg-[#6b0d09] hover:bg-[#8b261d] text-white text-xs sm:text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                          isSubmitting ? 'opacity-80 cursor-wait' : ''
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin material-symbols-outlined text-[18px]">progress_activity</span>
                            <span>Enviando proposta e anexos ao e-mail...</span>
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined text-[18px]">send</span>
                            <span>Enviar Proposta para Curadoria ({CURATOR_EMAIL.split('@')[0]})</span>
                          </>
                        )}
                      </button>

                      <a
                        href={generateMailtoLink()}
                        className="text-center py-2 px-3 text-xs text-[#57423f] hover:text-[#6b0d09] font-semibold transition-colors flex items-center justify-center gap-1 hover:underline"
                        title="Caso prefira redigir ou anexar pelo seu cliente de e-mail local"
                      >
                        <span className="material-symbols-outlined text-[16px]">mail</span>
                        <span>Ou abrir no meu aplicativo de e-mail</span>
                      </a>
                    </div>

                    <div className="text-[11px] text-[#57423f] bg-[#f5eced] p-2 rounded-lg border border-[#dec0bb]/50 text-center sm:text-left">
                      Destinatário oficial: <strong className="text-[#6b0d09]">{CURATOR_EMAIL}</strong> • Todos os dados e arquivos são encaminhados diretamente para a análise editorial.
                    </div>
                  </form>
                )}

              </div>

            </div>

            {/* Minhas Propostas Submetidas neste Dispositivo (LocalStorage History) */}
            {history.length > 0 && (
              <div className="mt-8 pt-6 border-t border-[#dec0bb]/60 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#775a19] text-[20px]">history</span>
                    <h4 className="font-serif text-sm sm:text-base font-bold text-[#6b0d09]">
                      Propostas Enviadas por Você neste Navegador ({history.length})
                    </h4>
                  </div>
                  <button
                    onClick={handleClearHistory}
                    className="text-[11px] text-[#57423f] hover:text-[#ba1a1a] transition-colors underline cursor-pointer"
                  >
                    Limpar histórico
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {history.slice(0, 6).map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-white rounded-lg border border-[#dec0bb] shadow-2xs flex flex-col justify-between gap-2"
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between text-[10px] text-[#57423f] font-mono">
                          <span>{item.date} • {item.time}</span>
                          <span className="px-1.5 py-0.5 rounded bg-[#e6f4ea] text-[#137333] font-bold">
                            ENVIADO
                          </span>
                        </div>
                        <h5 className="font-serif text-xs font-bold text-[#1e1b1c] line-clamp-1">
                          {item.title}
                        </h5>
                        <span className="text-[11px] text-[#57423f] truncate">
                          {item.school} • {item.author}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-[#dec0bb]/40 flex items-center justify-between text-[10px]">
                        <span className="text-[#775a19] font-medium flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">attach_file</span>
                          {item.filesCount} {item.filesCount === 1 ? 'anexo' : 'anexos'}
                        </span>
                        <span className="text-[#6b0d09] truncate max-w-[130px]" title={item.status}>
                          {CURATOR_EMAIL}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-16 bg-[#fbf1f2] border-t border-[#dec0bb]/60">
        <div className="max-w-[1360px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-[850px] mx-auto flex flex-col gap-4">
            <div className="text-center flex flex-col gap-1 mb-2">
              <span className="text-xs font-mono uppercase font-bold text-[#775a19] tracking-wider">
                Perguntas Frequentes
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-[#6b0d09] font-bold">
                Orientações sobre as Propostas Pedagógicas
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              <div className="bg-white rounded-xl p-5 shadow-xs border border-[#dec0bb]">
                <h4 className="font-serif text-base text-[#6b0d09] font-bold mb-1">
                  Como funciona a publicação das propostas pedagógicas no portal?
                </h4>
                <p className="text-xs sm:text-sm text-[#57423f] leading-relaxed">
                  Qualquer professor pode submeter sua proposta pedagógica pelo formulário do portal. Como a publicação é feita pelo professor administrador do site, as propostas enviadas passam por uma organização e curadoria inicial antes de serem publicadas no catálogo com os devidos créditos de autoria e da escola.
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-xs border border-[#dec0bb]">
                <h4 className="font-serif text-base text-[#6b0d09] font-bold mb-1">
                  Posso adaptar as propostas publicadas para minha turma ou outro município?
                </h4>
                <p className="text-xs sm:text-sm text-[#57423f] leading-relaxed">
                  Sim! Todas as propostas pedagógicas são distribuídas sob licença livre Creative Commons (CC BY 4.0). Educadores de Tremembé e de outras cidades do Vale do Paraíba podem utilizar, ajustar os tempos, readequar as fontes e aplicar conforme o nível de maturidade de seus alunos.
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-xs border border-[#dec0bb]">
                <h4 className="font-serif text-base text-[#6b0d09] font-bold mb-1">
                  Como utilizar as fotografias e documentos históricos do acervo nas aulas?
                </h4>
                <p className="text-xs sm:text-sm text-[#57423f] leading-relaxed">
                  No Acervo Digital, cada fotografia conta com link direto de alta definição do Cloudinary, transcrição paleográfica e descrição analítica. Você pode projetar as fotos na tela da sala de aula ou imprimi-las para atividades investigativas em grupo.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Modal de Detalhes da Proposta Pedagógica */}
      {selectedProposal && (
        <PedagogicalProposalDetailModal
          proposal={selectedProposal}
          onClose={() => setSelectedProposal(null)}
          onNavigate={onNavigate}
          onShowToast={onShowToast}
        />
      )}

    </div>
  );
};
