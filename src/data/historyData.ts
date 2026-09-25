import { HistoryModule } from '../types';

export interface TimelineEntry {
  dataPeriodo: string;
  evento: string;
  fonte: string;
}

export const cronologiaConsolidada: TimelineEntry[] = [
  {
    dataPeriodo: '1628 / 1640',
    evento: 'Concessão de sesmaria e fixação do Capitão Jacques Felix nas terras de Tremembé.',
    fonte: 'Carvalho (1957)'
  },
  {
    dataPeriodo: '1663',
    evento: 'Provisão de 18 de janeiro autorizando altar do Bom Jesus na capela de N. Sra. da Conceição.',
    fonte: 'IHGSP (1912)'
  },
  {
    dataPeriodo: '20 de Abril de 1672',
    evento: 'Provisão Eclesiástica que autoriza a construção da ermida pública do Bom Jesus.',
    fonte: 'IHGSP (1912); Rocha (1997)'
  },
  {
    dataPeriodo: '24 de Outubro de 1736',
    evento: 'Aprovação episcopal dos Estatutos da Irmandade do Senhor Bom Jesus de Tremembé.',
    fonte: 'Rocha (1997)'
  },
  {
    dataPeriodo: '20 de Fevereiro de 1866',
    evento: 'Lei Provincial nº 1 eleva Tremembé à categoria de Freguesia.',
    fonte: 'Carvalho (1957)'
  },
  {
    dataPeriodo: '3 de Março de 1891',
    evento: 'Decreto Estadual nº 132 cria o Distrito de Paz de Tremembé.',
    fonte: 'Carvalho (1957)'
  },
  {
    dataPeriodo: '26 de Novembro de 1896',
    evento: 'Lei Estadual nº 458 promulga a Emancipação Político-Administrativa do Município.',
    fonte: 'Diário Oficial SP (1896)'
  },
  {
    dataPeriodo: '13 a 15 de Agosto de 1903',
    evento: 'Romaria solene e transladação da imagem do Bom Jesus a Taubaté após epidemia.',
    fonte: 'Manfredini Jr. (2003)'
  },
  {
    dataPeriodo: '13 de Setembro de 1904',
    evento: 'Chegada dos 13 monges Trapistas e fundação da Trapa de Nossa Senhora Maristela.',
    fonte: 'Silva (2014); Audrá (1951)'
  },
  {
    dataPeriodo: '7 de Janeiro de 1905',
    evento: 'Instalação solene da Primeira Câmara Municipal e posse do Major Alexandre M. Patto.',
    fonte: 'Atas da Câmara (1905)'
  },
  {
    dataPeriodo: '1906',
    evento: 'Início da rizicultura irrigada por inundação na Várzea do Berisal.',
    fonte: 'Silva (2014)'
  },
  {
    dataPeriodo: '16 de Outubro de 1907',
    evento: 'Elevação da igreja à categoria de Santuário Episcopal por Dom Duarte Leopoldo e Silva.',
    fonte: 'Silva (2014)'
  },
  {
    dataPeriodo: '23 de Janeiro de 1908',
    evento: 'Chegada das monjas Trapistinas e fundação do Mosteiro do Sagrado Coração.',
    fonte: 'Silva (2014)'
  },
  {
    dataPeriodo: '27 de Abril de 1908',
    evento: 'Visita do Presidente eleito Albuquerque Lins e do Secretário da Agricultura Carlos Botelho.',
    fonte: 'Manfredini Jr. (2004)'
  },
  {
    dataPeriodo: '13 de Abril de 1909',
    evento: 'Inauguração da usina hidrelétrica particular dos Trapistas no ribeirão Chaveco.',
    fonte: 'Silva (2014)'
  },
  {
    dataPeriodo: '26 de Julho de 1914',
    evento: 'Inauguração solene da Estação Ferroviária e da Variante da EFCB em Tremembé.',
    fonte: 'Manfredini Jr. (2012)'
  },
  {
    dataPeriodo: '1927 – 1931',
    evento: 'Retorno dos monges Trapistas à Europa e liquidação das terras da Maristela.',
    fonte: 'Silva (2014)'
  },
  {
    dataPeriodo: '1972',
    evento: 'Desativação da variante ferroviária da EFCB e remoção dos trilhos em Tremembé.',
    fonte: 'Manfredini Jr. (2012)'
  }
];

export const historyModules: HistoryModule[] = [
  {
    id: 'modulo-1',
    numero: 'I',
    titulo: 'Capítulo I: Origens & Devoção (1672) – O Encontro da Imagem e a Gênese do Povoado',
    subtitulo: 'O Encontro da Imagem e a Gênese do Povoado',
    periodo: 'SÉCULO XVII • 1672',
    codigoFoto: 'TRM_HIST_027',
    fotoUrl: 'https://res.cloudinary.com/hjw9p1xw/image/upload/v1789170296/jardim_da_bas%C3%ADlica1.jpg',
    fotoAlt: 'Basílica do Senhor Bom Jesus de Tremembé a partir do seu jardim público (Foto Rezende, TRM_HIST_027)',
    legendaFoto: 'Fig. 1.1 — Vista frontal da Basílica do Senhor Bom Jesus de Tremembé a partir de seu jardim público. Fotografia histórica original de época assinada pelo estúdio Foto Rezende (Coleção José Manfredini, ref. TRM_HIST_027).',
    paragrafos: [
      '1.1 A Topografia Aluvial e a Etimologia Tupi: A compreensão das origens humanas e territoriais do município de Tremembé exige o exame prévio de seu ecossistema aluvial. Situado no curso médio da bacia hidrográfica do Rio Paraíba do Sul, entre as escarpas da Serra da Mantiqueira e os terrenos aplainados de várzea, o território caracterizava-se por um complexo sistema de brejos, pântanos e meandros sujeitos a inundações sazonais periódicas.',
      'É justamente essa condição fisiográfica que fundamenta a etimologia consagrada do toponímico. Derivado da matriz linguística Tupi-Guarani — a partir das variantes tiri-membé, terembé, tyme’mbé ou cerê-membé —, o vocábulo designa a "terra alagadiça", o "pântano", a "lagoa de água trêmula" ou a "fonte de água afamada" [Carvalho, 1957; Sampaio, 1912]. A tradição oral e os relatórios cartográficos do século XVII aludem expressamente à existência da chamada "Água Santa", uma nascente natural de águas medicinais e potáveis localizada nas proximidades das margens do Rio Paraíba. Essa fonte serviu como ponto de abastecimento estratégico para as bandeiras e tropas de pedestres que partiam da Vila de São Francisco das Chagas de Taubaté rumo ao sertão das minas em busca de ouro e indígena para apresamento.',
      '1.2 Os Povos Originários e a Estrutura Social Colonial: Antes do estabelecimento do domínio sesmeiro europeu, o território de Tremembé era povoado por grupos indígenas originários do tronco Tupi e de etnias e subgrupos da região interiorana. Documentos históricos e achados arqueológicos confirmam que a área urbana primitiva abrigava um assentamento de aborígenes Guayanás (Guaianases) e Carijós [Carvalho, 1957]. A presença de igaçabas (urnas funerárias de cerâmica) em escavações no perímetro central do município atesta o costume guarani de realizar sepultamentos sob o solo das próprias habitações.',
      'Além dos Guayanás, as margens do Paraíba eram habitadas por populações ribeirinhas conhecidas pela denominação tupi de piraquaras (pirakuára, significando "comedor de peixe" ou "aquele que vive da pesca"). Com a destruição da Vila de Santo André da Borda do Campo (entre 1561 e 1565) e a expansão paulistana rumo ao Vale do Paraíba, os povoadores vicentinos adentraram a região a partir do início do século XVII.',
      'Conforme demonstra a análise paleográfica e sociológica efetuada por Amanda V. de O. Monteiro (2014) sobre os 37 testamentos do século XVII preservados em Taubaté, a população indígena submetida ("gentio da terra") constituía a esmagadora maioria demográfica do Vale do Paraíba, representando entre 60% e 80% do contingente populacional total. Classificados genericamente pelos testadores como "peças do gentio da terra", esses indígenas aprisionados e seus descendentes caboclos/piraquaras formaram a base da mão de obra agrícola, doméstica e de transporte fluvial sobre a qual se assentou a colonização de Taubaté e do bairro de Tremembé [Monteiro, 2014].',
      '1.3 A Origem do Culto ao Senhor Bom Jesus e a Família Fundadora: A gênese urbana do arraial de Tremembé está umbilicalmente ligada ao fenômeno da devoção ao Senhor Bom Jesus da Cana Verde (representação do Ecce Homo, o Cristo flagelado e coroado de espinhos). A imagem sacra, uma escultura barroca em madeira policromada de tamanho natural, possui sua origem remetida ao litoral paulista: segundo a tradição historiográfica, a imagem fora encontrada boiando nas águas do mar de Iguape no ano de 1579 (ou 1647 em registros cartoriais secundários) [Rocha, 1997; Rosada, 2014].',
      'Em 1663, o Capitão-Mor Manuel da Costa Cabral — fidalgo paulistano, descendente da nobre casa portuguesa dos Cabrais de Belmonte, filho do Capitão Manuel da Costa Cabral e de Francisca Cardoso (falecida em Taubaté em 1655) e casado em segundas núpcias com D. Anna Ribeiro de Alvarenga — trasladou a imagem do Bom Jesus para a sua fazenda em Tremembé [Instituto Histórico e Geográfico de SP, 1912]. Em 18 de janeiro de 1663, Costa Cabral obteve do Prelado Administrador do Bispado do Rio de Janeiro, Dr. Manuel de Souza de Almeida, uma primeira provisão eclesiástica que lhe facultava erguer um altar lateral dedicado ao Santo Cristo no interior da Capela particular de Nossa Senhora da Conceição, situada dentro de sua propriedade (nas proximidades do atual cemitério municipal).',
      '1.4 O Marco Fundacional de 20 de Abril de 1672: O rápido crescimento da fama dos milagres atribuídos ao Bom Jesus atraiu uma afluência crescente de peregrinos vindos de diversas paragens da Capitania de São Vicente. A capela doméstica de taipa tornou-se manifestamente incapaz de comportar as multidões nos dias festivos. Diante disso, o Capitão-Mor Manuel da Costa Cabral decidiu doar uma gleba de suas terras nobres junto às margens do Rio Paraíba e custear a edificação de um templo público autônomo.',
      'Inaugurada solenemente entre 1672 e 1673, a primeira ermida de taipa do Senhor Bom Jesus converteu-se no nó de atração em torno do qual se desenhou o traçado urbano radial das primeiras ruas, praças e habitações rústicas do povoado de Tremembé.'
    ],
    citacaoDestaque: {
      tipo: 'Provisão Eclesiástica de 20 de Abril de 1672 • Bispado do Rio de Janeiro',
      texto: '“O licenciado Francisco da Silveira Dias, Vigario Geral e Administrador desta cidade de São Sebastião do Rio de Janeiro e mais capitanias da sua Repartição, por Sua Alteza, etc. [...] Fazemos saber que a nós nos enviou a dizer por sua petição Manoel da Costa Cabral, dizendo-nos em ella que elle tinha uma fazenda na villa de Taubaté, em um sitio em que chamam Tremembé [...] lhe concedemos licença para que na dita sua fazenda possa levantar uma igreja da invocação do Bom Jesus, em logar mais conveniente e afastada das casas da dita fazenda e obrigará a sua dita fazenda ao ornato e rectificações da dita igreja para a decencia do culto divino [...]. Dada nesta cidade do Rio de Janeiro sob o nosso signal e sello aos vinte dias do mez de abril de mil seiscentos e setenta e dous annos.”',
      fonte: '— Provisão Eclesiástica assinada pelo Vigário-Geral Francisco da Silveira Dias (20 de abril de 1672)'
    },
    fontesRelacionadas: [
      {
        titulo: 'Registro TRM_HIST_027',
        subtitulo: 'Santuário do Bom Jesus e Jardim Público',
        icone: 'photo_camera',
        docId: 'TRM_HIST_027'
      },
      {
        titulo: 'Registro TRM_HIST_028',
        subtitulo: 'Jardim da Basílica e Circulação de Pedestres',
        icone: 'photo_camera',
        docId: 'TRM_HIST_028'
      }
    ]
  },
  {
    id: 'modulo-2',
    numero: 'II',
    titulo: 'Capítulo II: Ordem Religiosa (1866) – A Elevação Canônica e Civil a Freguesia',
    subtitulo: 'A Elevação Canônica e Civil a Freguesia',
    periodo: 'SÉCULO XIX • 1866',
    codigoFoto: 'TRM_HIST_025',
    fotoUrl: 'https://res.cloudinary.com/hjw9p1xw/image/upload/v1789170296/JARDIM_DA_BAS%C3%8DLICA5.jpg',
    fotoAlt: 'Vista panorâmica do jardim público em frente à Basílica do Senhor Bom Jesus de Tremembé (TRM_HIST_025)',
    legendaFoto: 'Fig. 2.1 — Amplo jardim público e torre da Basílica do Senhor Bom Jesus de Tremembé, centro da vida devocional e comunitária elevada a Freguesia (Coleção José Manfredini, ref. TRM_HIST_025).',
    paragrafos: [
      '2.1 A Irmandade do Senhor Bom Jesus de Tremembé (1736): Durante todo o período colonial, a administração do templo e a organização da vida comunitária de Tremembé não estiveram a cargo de um corpo burocrático municipal, mas sim da Irmandade do Senhor Bom Jesus de Tremembé.',
      'Em 1731, Manuel de Arruda Cabral (neto do fundador) formalizou por escritura pública a doação definitiva das terras que constituíam o patrimônio imobiliário da igreja. Em 24 de outubro de 1736, o Bispo do Rio de Janeiro aprovou canonicamente os primeiros Estatutos da Irmandade. A partir de uma sentença proferida em 29 de setembro de 1742, que encerrou litígios entre os herdeiros do sesmeiro e os devotos, a Mesa Diretora da Irmandade assumiu a posse exclusiva do acervo, regularizando o aforamento de lotes urbanos ao redor do adro e promovendo a cobrança de rendas para a manutenção dos cultos [Rocha, 1997]. A partir de 1785, a gestão da igreja deixou de ser hereditária e passou a ser exercida mediante eleições anuais do sodalício leigo.',
      '2.2 As Romarias Coloniais e o Fenômeno Devocional: O calendário anual do arraial articulava-se em torno do 6 de agosto, dia da Festa Solene do Padroeiro. Coincidindo com o período de estiagem e entre-safra agrícola, a festa atraía milhares de romeiros que acampavam na vasta praça que circundava o templo. A celebração dividia-se estritamente entre o espaço sagrado (novenários, missas campestres, confissões e a solene procissão do Ecce Homo) e o espaço profano (quermesses, leilões de prendas, cavalhadas e bancas de jogo) [Rocha, 1997].',
      'Um evento devocional de extraordinária repercussão regional ocorreu entre 15 e 30 de agosto de 1903: a grande transladação da imagem do Bom Jesus de Tremembé até a matriz de Taubaté [Manfredini Jr., 2003]. Tratou-se de uma "romaria invertida", organizada em ação de graças pelo fim de uma devastadora epidemia de gripe que assolara o Vale do Paraíba. Durante 15 dias, a imagem permaneceu em Taubaté, mobilizando todas as camadas sociais em uma festa popular decorada com arcos floridos, iluminação a gás e procissões noturnas que reafirmaram a centralidade simbólica do padroeiro na identidade valeparaibana.',
      '2.3 A Elevação a Freguesia (1866) e o Contexto Institucional: Com a expansão da cafeicultura no Médio Vale do Paraíba durante o Império e o consequente adensamento demográfico, a condição de simples "bairro rural" de Taubaté tornou-se incompatível com as necessidades administrativas de Tremembé.',
      'Em 20 de fevereiro de 1866, a Assembleia Legislativa Provincial promulgou a Lei Provincial nº 1, elevando oficialmente a povoação à categoria de Freguesia (paróquia civil e eclesiástica). Embora essa lei tenha sofrido uma revogação temporária pela Lei nº 1 de 14 de março de 1868, a estrutura da Freguesia do Bom Jesus de Tremembé reestabeleceu-se em definitivo nos anos subsequentes. A elevação a Freguesia instituiu o Juizado de Paz local e descentralizou os registros cartoriais de batismos, casamentos e óbitos, concedendo a Tremembé autonomia eclesiástica e representação jurídica preliminar perante a comarca de Taubaté [Carvalho, 1957; IHGSP, 1912].',
      '2.4 As Transformações Arquitetônicas e o Santuário Episcopal: O templo original do século XVII passou por profundas intervenções arquitetônicas que acompanharam a evolução econômica da região: em 1795, ocorreu a grande ampliação da nave e edificação dos altares laterais de talha em madeira dedicados a Nossa Senhora da Glória e São Francisco de Paula (trabalhos atribuídos ao Grupo de entalhadores de João da Cruz) [Rosada, 2014]; em 16 de outubro de 1907, o Bispo Diocesano de São Paulo, Dom Duarte Leopoldo e Silva, elevou formalmente o templo à dignidade de Santuário Episcopal, confiando a direção espiritual e a reitoria aos monges cistercienses da Ordem Trapista [Silva, 2014]; e em 1915 deu-se a conclusão da reforma estética interna do Santuário, que revestiu suas paredes com linhas neoclássicas e afrescos decorativos (complementados em 1972 pelas pinturas em estêncil do artista Álvaro Pereira) [Rosada, 2014].'
    ],
    citacaoDestaque: {
      tipo: 'Lei Provincial SP nº 1 • 20 de Fevereiro de 1866',
      texto: '“Artigo 1º — Fica elevada à categoria de Freguesia a povoação do Senhor Bom Jesus de Tremembé, com as mesmas divisas do actual districto de paz, pertencendo ao município de Taubaté.”',
      fonte: '— Presidência da Província de São Paulo (1866)'
    },
    fontesRelacionadas: [
      {
        titulo: 'Registro TRM_HIST_025',
        subtitulo: 'Fachada e Jardim da Basílica do Bom Jesus',
        icone: 'photo_camera',
        docId: 'TRM_HIST_025'
      },
      {
        titulo: 'Registro TRM_HIST_006',
        subtitulo: 'Portal Comemorativo "Jesus Homo Salvator"',
        icone: 'photo_camera',
        docId: 'TRM_HIST_006'
      }
    ]
  },
  {
    id: 'modulo-3',
    numero: 'III',
    titulo: 'Capítulo III: Política & Cidadania (1896) – A Emancipação Político-Administrativa',
    subtitulo: 'A Emancipação Político-Administrativa',
    periodo: 'ERA REPUBLICANA • 1896-1905',
    codigoFoto: 'TRM_HIST_001',
    fotoUrl: 'https://res.cloudinary.com/hjw9p1xw/image/upload/v1789170300/pra%C3%A7a_geraldo_costa.jpg',
    fotoAlt: 'Praça Geraldo Costa, centro histórico e cívico de Tremembé com bancos em alvenaria e casario (TRM_HIST_001)',
    legendaFoto: 'Fig. 3.1 — Praça Geraldo Costa em Tremembé. Núcleo cívico e comercial onde se instalaram os poderes autônomos municipais (Coleção José Manfredini, ref. TRM_HIST_001).',
    paragrafos: [
      '3.1 A Criação do Distrito de Paz (1891): Com o advento da República em 1889 e a promulgação da Constituição Estadual de São Paulo de 1891, rompeu-se o regime do Padroado e reorganizou-se a divisão territorial do Estado. Em 3 de março de 1891, o Governo paulista baixou o Decreto Estadual nº 132, criando formalmente o Distrito de Paz de Tremembé dentro do município de Taubaté e fixando, pela primeira vez em documento oficial, os seus limites e divisas territoriais [Carvalho, 1957; IHGSP, 1912].',
      '3.2 A Causa Emancipacionista e a Lei nº 458 de 1896: Apesar da criação do Distrito de Paz, a elite agrária, os comerciantes e os moradores de Tremembé ressentiam-se da marginalização política promovida pela Câmara Municipal de Taubaté. Os impostos arrecadados no distrito raramente retornavam em benfeitorias públicas. A principal queixa concentrava-se na precariedade do "aterrado" — a via intermunicipal de 5 km que atravessava as várzeas alagadiças do Rio Paraíba — e na falta de manutenção das dez pontes de madeira que garantiam o trânsito de pessoas e mercadorias rumo à Serra da Mantiqueira [IHGSP, 1912].',
      'Liderados por proprietários rurais como o Major Alexandre Monteiro Patto, o Coronel Antonio Monteiro Patto e o Dr. Ismael Dias da Silva, os cidadãos articularam junto à Assembleia Legislativa do Estado de São Paulo o projeto de desmembramento. Em 26 de novembro de 1896, o Presidente do Estado de São Paulo assinou e promulgou a Lei Estadual nº 458, elevando o distrito à categoria de município autônomo [Carvalho, 1957; IHGSP, 1912].',
      '3.3 A Transição Institucional e a Primeira Câmara Municipal (1904–1905): A promulgação da Lei nº 458 em 1896 não significou a instalação imediata do governo autônomo. Devido a pendências administrativas e disputas de poder entre grupos políticos locais e a oligarquia de Taubaté, o governo estadual retardou por oito anos a convocação das eleições municipais.',
      'O pleito fundador ocorreu finalmente em 30 de outubro de 1904. Em 7 de janeiro de 1905, no edifício da antiga praça central, realizou-se a instalação solene da Primeira Câmara Municipal de Tremembé, ocasião em que tomaram posse os primeiros governantes eleitos do município [Carvalho, 1957; Manfredini Jr., 2004]: Vereadores Titulares: Major Alexandre Monteiro Patto (Presidente da Câmara / Executivo Municipal), Tenente Hermínio Cardoso da Cunha Coimbra, Maximiano Antunes, Antonio Lourenço Xavier, Silvério Banhara e Francisco Coelho Ferreira; Juízes de Paz Eleitos: Coronel Antonio Monteiro Patto, Silvano Luiz de Souza e João Luiz de Souza Ribeiro.',
      'Com a posse da edilidade em 1905, Tremembé promulgou seu primeiro Código de Posturas, organizou o serviço de fiscalização tributária, assumiu a manutenção das estradas e pontes do aterrado e deu início ao planejamento de obras de saneamento, iluminação pública e construção do Matadouro Municipal (inaugurado em agosto de 1916) [Carvalho, 1957].'
    ],
    citacaoDestaque: {
      tipo: 'Lei Estadual nº 458 de 26 de Novembro de 1896 • Diário Oficial SP',
      texto: '“O Dr. Manoel Ferraz de Campos Salles, Presidente do Estado de São Paulo, Faço saber que a Assembleia Legislativa do Estado decreta e eu promulgo a lei seguinte: Artigo 1º — Fica elevado á categoria de município o districto de paz de Tremembé, com as divisas actuaes, pertencendo á comarca de Taubaté. Artigo 2º — Revogam-se as disposições em contrario. Palácio do Governo do Estado de São Paulo, 26 de Novembro de 1896.”',
      fonte: '— Dr. Manoel Ferraz de Campos Salles, Presidente do Estado de São Paulo'
    },
    fontesRelacionadas: [
      {
        titulo: 'Registro TRM_HIST_001',
        subtitulo: 'Praça Geraldo Costa e Casario Histórico',
        icone: 'photo_camera',
        docId: 'TRM_HIST_001'
      },
      {
        titulo: 'Registro TRM_HIST_002',
        subtitulo: 'Vista Aérea e Urbanismo de Tremembé',
        icone: 'photo_camera',
        docId: 'TRM_HIST_002'
      }
    ]
  },
  {
    id: 'modulo-4',
    numero: 'IV',
    titulo: 'Capítulo IV: Economia & Inovação (1904) – A Instalação da Trapa e a Revolução da Rizicultura',
    subtitulo: 'A Instalação da Trapa e a Revolução da Rizicultura',
    periodo: 'SÉCULO XX • 1904-1909',
    codigoFoto: 'TRM_HIST_013',
    fotoUrl: 'https://res.cloudinary.com/hjw9p1xw/image/upload/v1789170299/ponte.jpg',
    fotoAlt: 'Transbordamento das margens do Rio Paraíba do Sul e áreas alagadiças de Tremembé (TRM_HIST_013)',
    legendaFoto: 'Fig. 4.1 — Várzeas e curso do Rio Paraíba do Sul em Tremembé. Área aluvial onde os monges trapistas executaram obras de drenagem e canais de irrigação para a cultura do arroz (Coleção José Manfredini, ref. TRM_HIST_013).',
    paragrafos: [
      '4.1 O Refúgio Francês e a Escolha de Tremembé: No início do século XX, o ambiente político francês era marcado pelas leis de laicização e combate às ordens religiosas promovidas pelo governo de Émile Combes na Terceira República Francesa. Diante da ameaça iminente de expulsão e confisco de bens, o Abade da Abadia Cisterciense de Notre-Dame de Sept-Fons, Dom Jean-Baptiste Chautard, decidiu buscar preventivamente um refúgio para sua comunidade fora da Europa [Silva, 2014; Audrá, 1951].',
      'Após descartar uma proposta inicial em Cananéia no litoral paulista, Dom Chautard e o Padre Alexis Ducrey (ex-oficial do exército francês convertido em monge trapista) foram informados em 1903 pelo médico brasileiro Dr. Ismael Dias da Silva (e Dr. Gabriel Dias da Silva) sobre a disponibilidade de uma grande propriedade em Tremembé [Notícia n. 132-14, 1988; Manfredini Jr., 2004]. Em meados de 1904, o Padre Alexis Ducrey firmou com o proprietário, Eloy Bicudo Varella Lessa (Barão de Lessa), o contrato de compra da Fazenda das Palmeiras — uma extensão de aproximadamente 2.500 hectares que se encontrava em estado de quase completo abandono desde a abolição da escravidão em 1888 e a subsequente decadência da lavoura cafeeira [Silva, 2014; Audrá, 1951].',
      '4.2 A Chegada dos Religiosos e a Fundação de Maristela: Em 13 de setembro de 1904, desembarcou na estação de Taubaté e seguiu para Tremembé o primeiro contingente de 13 religiosos trapistas oriundos de Sept-Fons, sob a liderança do Prior Padre Nivard Cavanat e do Vice-Prior Padre Antoine Giguelay [Silva, 2014; Manfredini Jr., 2004]. Os religiosos tomaram posse da Fazenda das Palmeiras e a rebatizaram oficialmente como Trapa de Nossa Senhora Maristela (Stella Maris). Em ato solene realizado na presença do Vigário Cônego Nascimento Castro, os monges ergueram a Crux Benedicta, marcando o nascimento do primeiro mosteiro cisterciense da América do Sul [Silva, 2014]. Complementando a presença monástica, em 23 de janeiro de 1908, chegaram a Tremembé as monjas Cistercienses da Estrita Observância (Trapistinas), vindas de Maçón (França), fundando ao lado do Santuário do Bom Jesus o Mosteiro de Nossa Senhora do Sagrado Coração [Silva, 2014; Manfredini Jr., 2004].',
      '4.3 A Revolução Agronômica e Tecnológica nas Várzeas do Berisal: A atuação da Trapa Maristela promoveu uma autêntica revolução técnica na agricultura do Estado de São Paulo. Dividindo a propriedade em duas seções — a parte alta dedicada à cafeicultura (com a recuperação e replantio de até 250 mil cafeeiros), pomares e pecuária leiteira (com a fabricação do famoso queijo Port-du-Salut) —, os monges voltaram sua atenção principal para a parte baixa: uma extensão de 400 a 600 hectares de terrenos pantanosos e alagadiços na várzea do Rio Paraíba do Sul, rebatizada como Várzea do Berisal (ou São José) [Silva, 2014; Manfredini Jr., 2004].',
      'Sob a orientação técnica do Padre Alexis Ducrey e do Frei Theodule (especialista agrícola trazido da França), os Trapistas executaram o primeiro projeto de rizicultura irrigada por inundação em larga escala no Brasil [Silva, 2014; Guisard Filho, 1930]: drenaram os pântanos, abriram canais de irrigação e escoamento, e ergueram diques sistemáticos de 40 a 50 cm com comportas reguláveis; instalaram na margem esquerda do Rio Paraíba bombas de sucção de alta potência com capacidade para captar e injetar até 500 litros de água por segundo nos campos de cultivo; trouxeram da Europa e dos Estados Unidos tratores, cortadeiras-enfardadeiras, secadores industriais, silos com capacidade para 10.000 sacas e uma gigantesca debulhadora a vapor com balança automática (premiada na Exposição de Nova Iorque em 1910), capaz de beneficiar 3.500 kg de arroz por jornada [Silva, 2014]; e, em 13 de abril de 1909, inauguraram uma usina hidrelétrica particular no ribeirão Chaveco (30 a 40 HP), garantindo eletricidade ao mosteiro, aos maquinários e às instalações do Berisal quatro anos antes da instalação da rede elétrica pública na cidade [Silva, 2014; Manfredini Jr., 2004].',
      '4.4 O Trabalhador Nacional (Rerum Novarum) e o Reconhecimento Oficial: Contrariando as diretrizes oficiais do governo paulista, que incentivava a imigração europeia para promover o "branqueamento" da população, os Trapistas optaram por contratar e capacitar a população rural local — os caboclos e ex-escravizados conhecidos como piraquaras [Manfredini Jr., 2004]. Apoiados nos preceitos sociais da encíclica Rerum Novarum do Papa Leão XIII, os monges empregavam rotineiramente entre 200 e 500 trabalhadores nacionais, oferecendo salários justos, alimentação, assistência médica e construindo na Vila do Berisal casas higiênicas de alvenaria, uma capela (dedicada a São José) e uma escola agrícola para meninos [Silva, 2014; Manfredini Jr., 2004].',
      'A Trapa Maristela converteu-se na principal "escola agrícola prática" do Estado. Em 27 de abril de 1908, a fazenda recebeu a visita oficial do Presidente eleito do Estado de São Paulo, Albuquerque Lins, do Secretário da Agricultura, Dr. Carlos Botelho, e de delegações internacionais (como o Ministro do Japão, Sadatsuchi, em 1907) [Silva, 2014; Manfredini Jr., 2004]. Com uma produção anual que oscilava entre 10.000 e 20.000 sacas de arroz de superior qualidade (variedade Arroz Dourado), a experiência de Tremembé difundiu a rizicultura irrigada por todo o curso do Rio Paraíba (de Jacareí a Guaratinguetá), permitindo ao Brasil abastecer o mercado interno e exportar o cereal para a Europa durante a Primeira Guerra Mundial (1914–1918) [Silva, 2014; Manfredini Jr., 2004].'
    ],
    citacaoDestaque: {
      tipo: 'Relato Histórico • Dr. Carlos Botelho, Secretário da Agricultura (1908)',
      texto: '“O Vale do Paraíba, que eu já vira em outro tempo com o aspecto das charnecas abandonadas, transforma-se hoje numa pradaria extensa sob o manto verde aveludado dos arrozais. Os padres da Trapa de Tremembé fizeram incomparável grangearia de arroz, jardim toda ela, entre canais que regam, canais que enxugam ou drenam... grangearia que é escola para toda aquela região, estímulo e exemplo para a vizinhança de lavradores.”',
      fonte: '— Dr. Carlos Botelho, Secretário da Agricultura do Estado de São Paulo (27 de abril de 1908)'
    },
    fontesRelacionadas: [
      {
        titulo: 'Registro TRM_HIST_013',
        subtitulo: 'Transbordamento do Paraíba e Várzeas Rurais',
        icone: 'photo_camera',
        docId: 'TRM_HIST_013'
      },
      {
        titulo: 'Registro TRM_HIST_018',
        subtitulo: 'Ocupação Ribeirinha e Curso Fluvial',
        icone: 'photo_camera',
        docId: 'TRM_HIST_018'
      }
    ]
  },
  {
    id: 'modulo-5',
    numero: 'V',
    titulo: 'Capítulo V: Transporte & Ferrovia (1914) – A Variante da EFCB e a Conexão com a Modernidade',
    subtitulo: 'A Variante da EFCB e a Conexão com a Modernidade',
    periodo: 'MODERNIDADE FERROVIÁRIA • 1914',
    codigoFoto: 'TRM_HIST_021',
    fotoUrl: 'https://res.cloudinary.com/hjw9p1xw/image/upload/v1789170297/paulo_de_frontin.jpg',
    fotoAlt: 'Retrato formal do Dr. Paulo de Frontin, Diretor da Estrada de Ferro Central do Brasil (TRM_HIST_021)',
    legendaFoto: 'Fig. 5.1 — Retrato autografado do engenheiro Dr. André Gustavo Paulo de Frontin, Diretor da Estrada de Ferro Central do Brasil, patrono da variante férrea de Tremembé (Coleção José Manfredini, ref. TRM_HIST_021).',
    paragrafos: [
      '5.1 O Gargalo do Transporte e a Articulação Política: O volume volumoso da safra agrícola de Maristela e do Berisal tornou insustentável o sistema tradicional de escoamento realizado por lentos carros de bois e tropas de mulas até a estação ferroviária de Taubaté. Diante desse gargalo logístico, o Abade Dom Jean-Baptiste Chautard assumiu pessoalmente em 1912 a articulação política perante o Governo Federal e a diretoria da Estrada de Ferro Central do Brasil (EFCB) [Manfredini Jr., 2004, 2012]: o Abade viajou ao Rio de Janeiro e reuniu-se com o Diretor da EFCB, o renomado engenheiro Dr. André Gustavo Paulo de Frontin, demonstrando a urgência econômica de construir um desvio no tronco ferroviário Rio de Janeiro–São Paulo para servir a Tremembé; o Deputado Federal Cônego Valois de Castro apresentou e aprovou na Câmara dos Deputados as emendas orçamentárias que destinaram 1.000 contos de réis para o financiamento público da variante ferroviária; e, em maio de 1912, o engenheiro inspetor da EFCB, Dr. Sá Freire, realizou os primeiros levantamentos topográficos, seguidos pelos estudos definitivos executados pelo engenheiro Affonso Mello [Manfredini Jr., 2012].',
      '5.2 A Construção da Variante e da Estação (1913–1914): Para acelerar os trabalhos e otimizar o orçamento, Dr. Paulo de Frontin determinou em junho de 1913 que a EFCB adquirisse o leito da antiga linha de bondes a vapor entre Taubaté e Tremembé (concedida originalmente em 1880). A transação foi formalizada por 74:290$000 (setenta e quatro contos e duzentos e noventa mil réis) em maio de 1914 [Manfredini Jr., 2012]. As obras da variante de 16 quilômetros iniciaram-se em outubro de 1913, sob a direção do engenheiro Heitor de Mello, mobilizando mais de 300 operários da Central do Brasil. Os trabalhos envolveram a substituição dos trilhos, o alinhamento da bitola, a terraplanagem dos aterrados e a montagem de uma impressionante ponte metálica sobre o Rio Una [Manfredini Jr., 2012]. Apesar de uma breve paralisação causada por uma greve de operários em fevereiro de 1914, o assentamento dos trilhos foi concluído em 9 de julho de 1914 [Manfredini Jr., 2012].',
      '5.3 A Inauguração Solene de 26 de Julho de 1914: Em 26 de julho de 1914, com a cidade festivamente ornamentada com arcos floridos e faixas comemorativas, ocorreu a inauguração solene da Estação Ferroviária de Tremembé e da variante da EFCB [Manfredini Jr., 2012]. O trem inaugural, vindo do Rio de Janeiro, conduziu o Diretor Dr. Paulo de Frontin, recebido com jotas e "vivas" pela população, vereadores e pelas bandas de música locais. No largo da estação, o Abade Dom Jean-Baptiste Chautard proferiu a bênção sacerdotal sobre o prédio e os trilhos, procedendo-se ao enterro comemorativo de uma urna de bronze contendo moedas e jornais da época [Manfredini Jr., 2012].',
      'Em seguida, o cortejo dirigiu-se ao Santuário do Bom Jesus, onde foi celebrada missa em ação de graças, culminando com uma sessão solene no prédio da Câmara Municipal. Na ocasião, o Dr. Paulo de Frontin discursou registrando que a chegada da ferrovia a Tremembé era um triunfo devido ao empenho incansável de Dom Chautard, do Cônego Valois de Castro e do Marechal Hermes da Fonseca [Manfredini Jr., 2012; Atas da Câmara de Tremembé, 1914].',
      '5.4 O Impacto Urbano e o Declínio da Variante: A chegada do trem e a iluminação elétrica converteram Tremembé em um município plenamente integrado à modernidade do século XX. O apito das locomotivas passou a regular o tempo urbano, enquanto o largo da estação transformou-se no centro cívico e de recepção para milhares de romeiros e visitantes. Com a decisão do Capítulo Geral da Ordem Trapista em 1920 de suprimir o mosteiro no Brasil (motivada pela escassez de vocações locais e pela necessidade de redirecionar monges para a reconstrução da Abadia de Orval na Bélgica), os religiosos iniciaram o retorno gradual à Europa entre 1927 e 1931 [Silva, 2014; Manfredini Jr., 2004]. As terras do Berisal e de Maristela foram fatiadas e vendidas a particulares (como Mário Audrá), encerrando o ciclo cisterciense em novembro de 1931.',
      'Sem o volume agroindustrial do mosteiro e com o posterior crescimento do transporte rodoviário na Via Dutra, o tráfego da variante ferroviária entrou em declínio. Em 1972, a linha foi oficialmente desativada e os trilhos retirados [Manfredini Jr., 2012]. O prédio da Estação Ferroviária de Tremembé permanece de pé na praça central como patrimônio histórico tombado, testemunho perpétuo do período de apogeu, fé e inovação técnica que marcou a formação da cidade.'
    ],
    citacaoDestaque: {
      tipo: 'Registro de Tráfego Agrícola • Jornal O Lábaro (07/02/1918)',
      texto: '“A estatistica de exportação dos produtos do município de Tremembé, pela Estrada de Ferro Central do Brasil, durante o ano próximo findo, foi o seguinte: arroz, 1.011.630 kg; tijolos para construção, 1.811.000 kg; palha de arroz, 561.768 kg; palhões para garrafas, 182.559 kg. Convém notar que a estatistica acima foi só o que passou pela Estrada de ferro... Quanto concorreram, directa e indirectamente para esse progresso agrícola, os Trapistas de Maristela, pode-se imaginar.”',
      fonte: '— Jornal O Lábaro (Edição de 7 de Fevereiro de 1918)'
    },
    fontesRelacionadas: [
      {
        titulo: 'Registro TRM_HIST_021',
        subtitulo: 'Dr. Paulo de Frontin (Retrato Histórico)',
        icone: 'photo_camera',
        docId: 'TRM_HIST_021'
      },
      {
        titulo: 'Registro TRM_HIST_014',
        subtitulo: 'Construção e Cimbramentos da Ponte',
        icone: 'photo_camera',
        docId: 'TRM_HIST_014'
      }
    ]
  }
];
