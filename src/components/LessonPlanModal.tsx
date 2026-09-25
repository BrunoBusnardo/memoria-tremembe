import React, { useState } from 'react';
import { LessonPlan } from '../types';

interface LessonPlanModalProps {
  plan: LessonPlan | null;
  mode: 'plano' | 'aluno';
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const LessonPlanModal: React.FC<LessonPlanModalProps> = ({
  plan,
  mode: initialMode,
  onClose,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'plano' | 'aluno' | 'bncc'>(initialMode);

  if (!plan) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#342f30]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="w-full max-w-[1000px] max-h-[92vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-[#dec0bb]">
        
        {/* Modal Topbar */}
        <div className="bg-[#efe6e7] px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-[#dec0bb]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#8b261d] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">school</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#775a19] uppercase tracking-wider font-mono">
                  {plan.codigo}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 bg-[#ffdea5] text-[#261900] font-bold rounded">
                  {plan.segmento}
                </span>
              </div>
              <h3 className="font-serif text-base sm:text-lg text-[#1e1b1c] font-bold leading-tight line-clamp-1">
                {plan.titulo}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-[#f5eced] text-[#57423f] hover:text-[#6b0d09] transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Tab switcher */}
        <div className="bg-[#fbf1f2] px-4 sm:px-6 pt-2 flex items-center gap-2 border-b border-[#dec0bb]">
          <button
            onClick={() => setActiveTab('plano')}
            className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'plano'
                ? 'bg-white text-[#6b0d09] border-t-2 border-[#6b0d09] shadow-xs'
                : 'text-[#57423f] hover:text-[#1e1b1c]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">menu_book</span>
            <span>Plano de Aula Completo</span>
          </button>

          <button
            onClick={() => setActiveTab('aluno')}
            className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'aluno'
                ? 'bg-white text-[#6b0d09] border-t-2 border-[#6b0d09] shadow-xs'
                : 'text-[#57423f] hover:text-[#1e1b1c]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">assignment</span>
            <span>Caderno do Aluno &amp; Fichas</span>
          </button>

          <button
            onClick={() => setActiveTab('bncc')}
            className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'bncc'
                ? 'bg-white text-[#6b0d09] border-t-2 border-[#6b0d09] shadow-xs'
                : 'text-[#57423f] hover:text-[#1e1b1c]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>Habilidades BNCC</span>
          </button>
        </div>

        {/* Modal content body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-grow flex flex-col gap-5 text-[#1e1b1c]">
          
          {activeTab === 'plano' && (
            <div className="flex flex-col gap-4">
              <div className="p-4 bg-[#fbf1f2] rounded-lg border border-[#dec0bb]/80 flex flex-col gap-2">
                <span className="text-[11px] font-bold text-[#775a19] uppercase tracking-wider">
                  Objetivo Estratégico de Aprendizagem
                </span>
                <p className="text-sm sm:text-base leading-relaxed text-[#1e1b1c]">
                  {plan.objetivoCentral}
                </p>
                <div className="flex flex-wrap gap-4 pt-2 text-xs text-[#57423f]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-[#775a19]">timer</span>
                    Duração: <strong>{plan.duracao}</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-[#775a19]">auto_stories</span>
                    Disciplina: <strong>{plan.disciplina}</strong>
                  </span>
                </div>
              </div>

              {/* Etapas de aula */}
              <div className="flex flex-col gap-2.5">
                <h4 className="font-serif text-base font-bold text-[#6b0d09]">
                  Roteiro de Desenvolvimento da Sequência (Passo a Passo)
                </h4>
                <div className="space-y-3">
                  {plan.etapas.map((etapa, idx) => (
                    <div key={idx} className="p-3.5 bg-white rounded-lg border border-[#dec0bb]/60 flex items-start gap-3 shadow-xs">
                      <span className="w-7 h-7 rounded-full bg-[#8b261d] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="flex flex-col gap-1 flex-grow">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-[#1e1b1c]">{etapa.etapa}</span>
                          <span className="text-xs font-mono text-[#775a19] bg-[#ffdea5] px-1.5 py-0.2 rounded font-semibold">
                            {etapa.tempo}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#57423f] leading-relaxed">
                          {etapa.descricao}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Perguntas investigativas */}
              <div className="p-4 bg-[#f5eced] rounded-lg border border-[#dec0bb]">
                <h4 className="text-xs uppercase font-bold text-[#775a19] tracking-wider mb-2">
                  Questões Disparadoras de Investigação Histórica
                </h4>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#57423f]">
                  {plan.perguntasInvestigativas.map((perg, i) => (
                    <li key={i}>{perg}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'aluno' && (
            <div className="flex flex-col gap-4">
              <div className="p-4 bg-[#fbf1f2] rounded-lg border border-[#dec0bb]/80">
                <span className="text-[11px] font-bold text-[#775a19] uppercase tracking-wider block mb-1">
                  Conteúdo do Caderno Didático do Aluno
                </span>
                <p className="text-sm leading-relaxed text-[#1e1b1c]">
                  {plan.materialAlunoResumo}
                </p>
              </div>

              <div className="border border-[#dec0bb] rounded-lg p-5 bg-white">
                <div className="flex items-center justify-between border-b pb-3 mb-4">
                  <div>
                    <span className="text-xs uppercase font-bold text-[#6b0d09]">Atividade Prática Investigativa</span>
                    <h5 className="font-serif font-bold text-base">Ficha de Campo &amp; Análise de Fonte Histórica</h5>
                  </div>
                  <span className="text-xs font-mono bg-[#efe6e7] px-2 py-1 rounded text-[#57423f]">
                    Nome do Aluno: ___________________________
                  </span>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-[#57423f]">
                  <p><strong>1. Identificação da Fonte:</strong> Observe a fotografia / documento fornecido pelo professor. Qual é o tombo ou código arquivístico indicado?</p>
                  <p><strong>2. Análise Espacial:</strong> Quais elementos arquitetônicos demonstram a presença da tecnologia a vapor ou da produção agrícola?</p>
                  <p><strong>3. Vozes da Cidade:</strong> Converse com um familiar ou morador do município. Qual memória ele guarda a respeito da Estrada de Ferro ou das cheias do Rio Paraíba?</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bncc' && (
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase font-bold text-[#775a19] tracking-wider">
                Competências Gerais e Específicas da BNCC
              </span>
              <div className="grid grid-cols-1 gap-3">
                {plan.habilidadesBNCC.map((hab, idx) => (
                  <div key={idx} className="p-4 bg-[#fbf1f2] rounded-lg border border-[#dec0bb] flex items-start gap-3">
                    <span className="px-2 py-1 bg-[#8b261d] text-white text-xs font-bold rounded font-mono">
                      {hab}
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-[#1e1b1c]">
                        Alinhamento com História e Geografia Regional
                      </span>
                      <p className="text-xs sm:text-sm text-[#57423f] leading-relaxed">
                        A habilidade {hab} orienta o estudante a reconhecer transformações territoriais, marcos da história local e fontes materiais/orais como documentos legítimos de análise crítica da sociedade brasileira.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal footer actions */}
        <div className="bg-[#efe6e7] px-4 sm:px-6 py-3 border-t border-[#dec0bb] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs text-[#57423f]">
            <span className="material-symbols-outlined text-[16px] text-[#775a19]">verified</span>
            <span>Material sob licença CC BY 4.0 • Livre reprodução pedagógica</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onShowToast(`Gerando PDF completo do plano [${plan.codigo}] com cadernos do aluno...`);
              }}
              className="px-4 py-2 bg-[#6b0d09] hover:bg-[#8b261d] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Baixar Guia Completo (PDF)</span>
            </button>

            <button
              onClick={() => {
                window.print();
              }}
              className="px-3 py-2 bg-white hover:bg-[#f5eced] text-[#1e1b1c] text-xs sm:text-sm font-semibold rounded-lg border border-[#dec0bb] flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">print</span>
              <span>Imprimir</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
