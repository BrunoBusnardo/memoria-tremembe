import { LessonPlan, PedagogicalProposal } from '../types';

export const pedagogicalProposals: PedagogicalProposal[] = [
  {
    id: 'prop-01',
    codigo: 'PROP-DOC-01',
    titulo: 'Dos Trilhos à Cidade: O Trem e as Transformações Urbanas em Tremembé',
    autor: 'Profa. Mariana Siqueira',
    escola: 'EMEF Prof. Américo Bonetti • Rede Municipal de Tremembé',
    segmento: 'Ensino Fundamental II (8º e 9º Anos)',
    disciplina: 'História & Geografia',
    habilidadesBNCC: ['EF08HI16', 'EF09HI05'],
    temaPatrimonio: 'Patrimônio Ferroviário, Urbanização & Estrada de Ferro Central do Brasil',
    fontesAcervo: 'Fototeca Histórica: TRM_HIST_001 (Estação Ferroviária c. 1914) e TRM_HIST_002 (Locomotiva a Vapor)',
    objetivoGeral: 'Investigar a chegada do ramal férreo da EFCB em 1914 como agente catalisador de transformações espaciais, econômicas e sociais em Tremembé, contrastando o ritmo das tropas antigas com a velocidade do vapor.',
    resumoProposta: 'Proposta pedagógica desenvolvida com turmas de 8º e 9º anos que utiliza fotografias históricas e fontes orais para compreender como o trem reconfigurou o cotidiano dos trabalhadores, o comércio e a paisagem urbana de Tremembé.',
    etapasMetodologia: [
      {
        fase: '1. Problematização e Fontes',
        descricao: 'Apresentação em tela das imagens TRM_HIST_001 e TRM_HIST_002. Análise comparativa das vestimentas, tecnologia a vapor e estrutura da gare inglesa.',
        duracao: '1 aula (50 min)'
      },
      {
        fase: '2. Investigação Documental',
        descricao: 'Leitura de manifestos de carga e horários da Central do Brasil. Debate sobre a transição do transporte lento de tração animal para a ferrovia.',
        duracao: '2 aulas (100 min)'
      },
      {
        fase: '3. Produção Estudantil',
        descricao: 'Elaboração em grupos de um mural comparativo "Ontem e Hoje: A Gare e o Município" e redação de memórias ficcionais de maquinistas e passageiros de 1914.',
        duracao: '1 aula (50 min)'
      }
    ],
    producaoFinal: 'Mural histórico ilustrado exposto no pátio escolar e gravação de mini-podcasts narrando as memórias da ferrovia no Vale.',
    publicadoPor: 'Curadoria do Professor Responsável',
    dataPublicacao: 'Março de 2025'
  },
  {
    id: 'prop-02',
    codigo: 'PROP-DOC-02',
    titulo: 'A Água, a Terra e o Arroz: A Engenharia Agrícola dos Trapistas no Vale',
    autor: 'Prof. Carlos Eduardo Mendes',
    escola: 'E.E. Dr. Geraldo Costa • Ensino Médio',
    segmento: 'Ensino Médio',
    disciplina: 'Geografia & Ciências Humanas',
    habilidadesBNCC: ['EM13CHS204', 'EM13CHS302'],
    temaPatrimonio: 'Engenharia Hidráulica, Mosteiro Trapista & Paisagem Agrária',
    fontesAcervo: 'Fototeca Histórica: TRM_HIST_013 (Margens do Rio Paraíba) e TRM_HIST_015 (Inundação e Várzeas)',
    objetivoGeral: 'Analisar o impacto socioambiental e econômico da introdução da rizicultura irrigada por inundação em 1904 pelos monges cistercienses franceses no Mosteiro da Maristela, articulando história agrária e sustentabilidade hídrica atual.',
    resumoProposta: 'Sequência investigativa interdisciplinar para o Ensino Médio sobre como as várzeas antes consideradas improdutivas foram convertidas no maior polo produtor de arroz de São Paulo através de diques, bombas a vapor e canais hidráulicos.',
    etapasMetodologia: [
      {
        fase: '1. Cartografia das Várzeas',
        descricao: 'Mapeamento do curso meândrico do Rio Paraíba do Sul e localização da antiga Fazenda das Palmeiras (Trapa Maristela).',
        duracao: '1 aula (50 min)'
      },
      {
        fase: '2. Análise Técnica e Social',
        descricao: 'Estudo do uso de bombas centrífugas e canais de drenagem. Reflexão crítica sobre a mão de obra ribeirinha e ex-escravizada (os "piraquaras").',
        duracao: '2 aulas (100 min)'
      },
      {
        fase: '3. Debate Ambiental Contemporâneo',
        descricao: 'Seminário em sala: desafios ecológicos das várzeas do Vale do Paraíba, preservação das matas ciliares e segurança hídrica contemporânea.',
        duracao: '1 aula (50 min)'
      }
    ],
    producaoFinal: 'Fanzine digital colaborativo com infográficos hidroagrícolas e ensaios críticos sobre a história socioambiental do Rio Paraíba.',
    publicadoPor: 'Curadoria do Professor Responsável',
    dataPublicacao: 'Fevereiro de 2025'
  },
  {
    id: 'prop-03',
    codigo: 'PROP-DOC-03',
    titulo: 'Pequenos Historiadores: Memórias Orais e a Vida ao Redor da Praça Geraldo Costa',
    autor: 'Profa. Beatriz Faria dos Santos',
    escola: 'EMEF Maria Dulce David de Paiva • Rede Municipal de Tremembé',
    segmento: 'Ensino Fundamental I (4º e 5º Anos)',
    disciplina: 'História & Língua Portuguesa',
    habilidadesBNCC: ['EF04HI01', 'EF05HI07'],
    temaPatrimonio: 'Espaço Público, Memória Familiar e Cotidiano',
    fontesAcervo: 'Fototeca Histórica: TRM_HIST_003 (Praça Geraldo Costa c. 1950) e TRM_HIST_004 (Coreto Histórico)',
    objetivoGeral: 'Iniciar os estudantes dos anos iniciais na metodologia do historiador-investigador através de entrevistas orais com familiares e análise comparativa de imagens antigas do centro de Tremembé.',
    resumoProposta: 'Atividade de pesquisa comunitária em que os estudantes comparam fotos da praça central de 1950 com os dias atuais, colhendo depoimentos de avós e vizinhos sobre encontros no coreto, festividades e brincadeiras tradicionais.',
    etapasMetodologia: [
      {
        fase: '1. Roda de Observação',
        descricao: 'Projeção das fotos TRM_HIST_003 e 004. As crianças descrevem elementos arquitetônicos, tipos de calçamento, carros de época e vestimentas.',
        duracao: '1 aula (50 min)'
      },
      {
        fase: '2. Coleta de Memórias Familiares',
        descricao: 'Roteiro lúdico de entrevista aplicado pelos alunos em casa com familiares mais velhos, registrando memórias de infância em Tremembé.',
        duracao: 'Trabalho de campo domiciliar (1 semana)'
      },
      {
        fase: '3. Varal das Memórias',
        descricao: 'Compartilhamento em círculo dos relatos e montagem de painel coletivo com desenhos, fotos de família e pequenos textos dos alunos.',
        duracao: '2 aulas (100 min)'
      }
    ],
    producaoFinal: 'Exposição escolar "Tremembé no Coração das Nossas Famílias" com varal de relatos, desenhos e fotos antigas trazidas de casa.',
    publicadoPor: 'Curadoria do Professor Responsável',
    dataPublicacao: 'Abril de 2025'
  },
  {
    id: 'prop-04',
    codigo: 'PROP-DOC-04',
    titulo: 'Do Ecce Homo ao Santuário: Religiosidade, Devoção Popular e Patrimônio Imaterial',
    autor: 'Prof. Marcos Vinícius Toledo',
    escola: 'Colégio Municipal de Tremembé',
    segmento: 'Ensino Fundamental II (6º e 7º Anos)',
    disciplina: 'História & Arte',
    habilidadesBNCC: ['EF06HI02', 'EF07HI03'],
    temaPatrimonio: 'Patrimônio Sacro, Barroco Paulista & Tradições Populares',
    fontesAcervo: 'Fototeca Histórica: TRM_HIST_005 (Basílica Menor do Senhor Bom Jesus) e TRM_HIST_006 (Interior do Santuário)',
    objetivoGeral: 'Compreender a gênese de Tremembé a partir da capela de taipa do Capitão-Mor Manuel da Costa Cabral (1672) e a consolidação das romarias de agosto como patrimônio cultural imaterial paulista.',
    resumoProposta: 'Proposta articulada entre História e Arte que investiga como a devoção ao Bom Jesus da Cana Verde gerou a urbanização pioneira e influenciou a arquitetura sacra, a música devocional e a identidade tropeira da localidade.',
    etapasMetodologia: [
      {
        fase: '1. Leitura de Fontes do Século XVII',
        descricao: 'Estudo do documento de provisão eclesiástica de 1672 autorizando a construção da ermida pública de taipa fora da sede da sesmaria.',
        duracao: '1 aula (50 min)'
      },
      {
        fase: '2. Imaginária e Arquitetura Sacra',
        descricao: 'Análise iconográfica das esculturas barrocas em madeira, da imagem do Ecce Homo e das ampliações neoclássicas do santuário.',
        duracao: '2 aulas (100 min)'
      },
      {
        fase: '3. Cartilha Patrimonial Ilustrada',
        descricao: 'Produção em duplas de verbetes explicativos sobre o patrimônio material e imaterial da Basílica Menor.',
        duracao: '1 aula (50 min)'
      }
    ],
    producaoFinal: 'Cartilha digital ilustrada "Patrimônio Vivo de Tremembé: Entre a Fé e a História", elaborada pelos alunos para consulta na biblioteca escolar.',
    publicadoPor: 'Curadoria do Professor Responsável',
    dataPublicacao: 'Janeiro de 2025'
  },
  {
    id: 'prop-05',
    codigo: 'PROP-DOC-05',
    titulo: 'Saúde Pública e Solidariedade: A História da Santa Casa de Misericórdia',
    autor: 'Profa. Luciana Antunes',
    escola: 'E.E. Monsenhor Tremembé',
    segmento: 'Ensino Médio',
    disciplina: 'Sociologia & História',
    habilidadesBNCC: ['EM13CHS103', 'EM13CHS401'],
    temaPatrimonio: 'História da Saúde, Cidadania e Políticas Públicas',
    fontesAcervo: 'Fototeca Histórica: TRM_HIST_028 (Hospital Bom Jesus c. 1950)',
    objetivoGeral: 'Investigar as instituições de saúde comunitárias e beneficentes no Vale do Paraíba durante a primeira metade do século XX, comparando com o desenvolvimento do Sistema Único de Saúde.',
    resumoProposta: 'Investigação sociológica e histórica a partir do Hospital Bom Jesus em Tremembé, refletindo sobre o acesso a cuidados médicos, solidariedade cívica e a evolução das políticas públicas sanitárias no Brasil.',
    etapasMetodologia: [
      {
        fase: '1. O Hospital na Memória Urbana',
        descricao: 'Análise da foto TRM_HIST_028, identificação da arquitetura institucional da época e discussão sobre as doenças endêmicas no Vale.',
        duracao: '1 aula (50 min)'
      },
      {
        fase: '2. Filantropia versus Direito Social',
        descricao: 'Debate orientado: como o cuidado hospitalar transitou de atos de caridade e irmandades religiosas para o dever do Estado.',
        duracao: '2 aulas (100 min)'
      },
      {
        fase: '3. Seminário Temático',
        descricao: 'Apresentação de seminários pelos estudantes sobre a importância histórica dos profissionais de enfermagem e da medicina comunitária.',
        duracao: '1 aula (50 min)'
      }
    ],
    producaoFinal: 'Painel infográfico e artigo de opinião redigido pelos estudantes sobre a história da saúde pública no município.',
    publicadoPor: 'Curadoria do Professor Responsável',
    dataPublicacao: 'Fevereiro de 2025'
  }
];

// Preservado para compatibilidade de tipos
export const lessonPlans: LessonPlan[] = [
  {
    id: 'seq-did-01',
    codigo: 'PROP-DOC-01',
    segmento: 'Ensino Fundamental II',
    disciplina: 'História • 8º e 9º Anos',
    habilidadesBNCC: ['EF08HI16', 'EF09HI05'],
    titulo: 'Dos Trilhos à Cidade: O Trem e as Transformações Urbanas em Tremembé',
    objetivoCentral: 'Investigar a chegada do ramal férreo da EFCB em 1914 como vetor de urbanização, compreendendo as mudanças de temporalidade e novas sociabilidades operárias.',
    duracao: '4 aulas (50 min cada)',
    fontesMobilizadas: 'Fotografias TRM_HIST_001 e TRM_HIST_002, horários de trens e registros de passageiros',
    materialAlunoResumo: 'Caderno de Fontes Primárias com reproduções fotográficas em alta resolução do acervo digital e prancha de análise histórica.',
    perguntasInvestigativas: [
      'De que maneira o apito do trem reorganizou as noções de horário de trabalho e comércio em Tremembé?',
      'Quem eram os passageiros retratados nas fotografias da gare de 1914?',
      'Como a ferrovia possibilitou a substituição da monocultura pelo escoamento ágil da safra do arroz?'
    ],
    etapas: [
      {
        etapa: 'Aula 1: A temporalidade das tropas versus a velocidade do vapor',
        descricao: 'Apresentação dos mapas antigos e comparação do tempo de viagem. Análise das fotos históricas.',
        tempo: '50 min'
      },
      {
        etapa: 'Aula 2: Análise iconográfica da Estação de Tremembé',
        descricao: 'Trabalho com as fotos TRM_HIST_001 e TRM_HIST_002. Identificação de elementos patrimoniais.',
        tempo: '50 min'
      }
    ]
  }
];

export const bnccCompetencies = [
  {
    codigo: 'EF04HI01',
    ano: '4º ANO EF',
    tema: 'Reconhecer a História Local',
    texto: 'Reconhecer a história da formação do município em que reside, identificando as transformações ocorridas na paisagem ao longo do tempo e os diferentes grupos populacionais.',
    seqVinculada: 'Proposta PROP-DOC-03 (Pequenos Historiadores • Praça Geraldo Costa)'
  },
  {
    codigo: 'EF08HI16',
    ano: '8º ANO EF',
    tema: 'Modernização & Ferrovias',
    texto: 'Identificar e caracterizar as transformações econômicas e a modernização da infraestrutura do Brasil na virada do século XIX para o XX, enfatizando as redes de transporte.',
    seqVinculada: 'Proposta PROP-DOC-01 (Dos Trilhos à Cidade • Estação de Tremembé)'
  },
  {
    codigo: 'EM13CHS204',
    ano: 'ENSINO MÉDIO',
    tema: 'Território & Modificação Hídrica',
    texto: 'Comparar e avaliar os impactos socioambientais da exploração dos recursos naturais e apropriação dos cursos d’água pelas sociedades agrárias no Vale do Paraíba.',
    seqVinculada: 'Proposta PROP-DOC-02 (A Água, a Terra e o Arroz • Engenharia Trapista)'
  }
];
