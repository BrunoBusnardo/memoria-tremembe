export type NavScreen = 
  | 'inicio' 
  | 'historia-de-tremembe' 
  | 'acervo-digital' 
  | 'espaco-do-professor' 
  | 'publicacoes-e-artigos';

export type CategoryFilter = 'all' | 'photo' | 'doc' | 'map' | 'audio';
export type PeriodFilter = 'all' | 'sec-xvii' | 'sec-xix' | 'era-ferrovia' | 'modernizacao';

export type DecadaFilter = 'all' | '1910' | '1940' | '1950' | '1960' | '1970';
export type TemaFilter = 'all' | 'praca' | 'ponte' | 'basilica' | 'saude' | 'outros';
export type TecnicaFilter = 'all' | 'pb' | 'sepia' | 'cor';

export interface ArchivalItem {
  id: string;
  code: string; // e.g. TRM_HIST_001
  codigo?: string;
  nomeArquivo?: string;
  title: string;
  year: string; // e.g. c. 1950
  ano?: string;
  fotografo?: string;
  procedencia?: string;
  colecao?: string;
  tecnica?: string;
  descricaoAnalitica?: string;
  description: string;
  category: CategoryFilter;
  period: PeriodFilter;
  tema?: string;
  decada?: string;
  fundo: string;
  suporte: string;
  estado: string;
  localizacao: string;
  transcription: string;
  abnt: string;
  imageUrl: string;
  url?: string;
  imageAlt: string;
  conditionStatus?: string;
  scanResolution?: string;
  audioDuration?: string;
  audioQuality?: string;
  downloadType?: string;
  isRare?: boolean;
}

export interface TimelineNode {
  id: number;
  ano: string;
  titulo: string;
  subtitulo: string;
  categoria: string;
  desc: string;
  tag: string;
  registro: string;
  imageUrl: string;
  imageAlt: string;
}

export interface HistoryModule {
  id: string;
  numero: string;
  titulo: string;
  subtitulo: string;
  periodo: string;
  codigoFoto: string;
  fotoUrl: string;
  fotoAlt: string;
  legendaFoto: string;
  paragrafos: string[];
  citacaoDestaque?: {
    tipo: string;
    texto: string;
    fonte: string;
  };
  fontesRelacionadas: {
    titulo: string;
    subtitulo: string;
    icone: string;
    docId?: string;
  }[];
}

export interface SlideItem {
  titulo: string;
  sub: string;
  texto: string;
  notas: string;
  anoRef: string;
  mapaDesc?: string;
}

export interface LessonPlan {
  id: string;
  codigo: string;
  segmento: string;
  disciplina: string;
  habilidadesBNCC: string[];
  titulo: string;
  objetivoCentral: string;
  duracao: string;
  fontesMobilizadas: string;
  etapas: {
    etapa: string;
    descricao: string;
    tempo: string;
  }[];
  materialAlunoResumo: string;
  perguntasInvestigativas: string[];
}

export interface PedagogicalProposal {
  id: string;
  codigo: string;
  titulo: string;
  autor: string;
  escola: string;
  segmento: string; // 'Ensino Fundamental I' | 'Ensino Fundamental II' | 'Ensino Médio'
  disciplina: string;
  habilidadesBNCC: string[];
  temaPatrimonio: string;
  fontesAcervo: string;
  objetivoGeral: string;
  resumoProposta: string;
  etapasMetodologia: {
    fase: string;
    descricao: string;
    duracao: string;
  }[];
  producaoFinal: string;
  publicadoPor: string;
  dataPublicacao: string;
}

export interface PublicationItem {
  id: string;
  titulo: string;
  autor: string;
  instituicao: string;
  ano: string;
  resumo: string;
  palavrasChave: string[];
  paginas: number;
  tipo: 'Monografia' | 'Artigo Científico' | 'Relatório Histórico' | 'Cartilha';
  doiOrRef: string;
}
