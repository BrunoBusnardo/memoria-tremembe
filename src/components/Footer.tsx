import React from 'react';
import { NavScreen } from '../types';

interface FooterProps {
  onNavigate: (screen: NavScreen) => void;
  onShowToast: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onShowToast }) => {
  return (
    <footer className="w-full bg-[#fbf1f2] mt-16 shadow-[0_-1px_6px_rgba(35,31,32,0.03)] border-t border-[#dec0bb]/60">
      <div className="max-w-[1360px] mx-auto px-4 md:px-6 lg:px-8 pt-12 pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
        {/* Coluna 1: Apresentação Institucional */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-[#8b261d] flex items-center justify-center text-white shadow-xs">
              <span className="material-symbols-outlined text-[16px]">history_edu</span>
            </div>
            <span className="font-serif text-lg text-[#6b0d09] font-bold">Estação da Memória</span>
          </div>
          <p className="text-sm text-[#57423f] leading-relaxed">
            Projeto historiográfico colaborativo voltado ao resgate, preservação e difusão das matrizes históricas, 
            patrimoniais e orais do município de Tremembé e do Vale do Paraíba paulista.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[11px] font-semibold text-[#57423f] uppercase tracking-wider">
              SISTEMA ARQUIVÍSTICO INTEGRADO
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#775a19]"></span>
            <span className="text-[11px] font-bold text-[#775a19] uppercase tracking-wider">
              VERSÃO DIGITAL 2.4
            </span>
          </div>
        </div>

        {/* Coluna 2: Navegação do Acervo */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          <span className="text-xs uppercase tracking-wider text-[#775a19] font-bold">
            Navegação do Acervo
          </span>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2 text-[#57423f] hover:text-[#6b0d09] transition-colors">
              <span className="material-symbols-outlined text-[16px] text-[#775a19]">train</span>
              <button 
                onClick={() => onNavigate('acervo-digital')} 
                className="text-sm text-left hover:underline"
              >
                Manuscritos e Registros da EFCB
              </button>
            </li>
            <li className="flex items-center gap-2 text-[#57423f] hover:text-[#6b0d09] transition-colors">
              <span className="material-symbols-outlined text-[16px] text-[#775a19]">photo_library</span>
              <button 
                onClick={() => onNavigate('acervo-digital')} 
                className="text-sm text-left hover:underline"
              >
                Fototeca Histórica Urbana &amp; Rural
              </button>
            </li>
            <li className="flex items-center gap-2 text-[#57423f] hover:text-[#6b0d09] transition-colors">
              <span className="material-symbols-outlined text-[16px] text-[#775a19]">menu_book</span>
              <button 
                onClick={() => onNavigate('espaco-do-professor')} 
                className="text-sm text-left hover:underline"
              >
                Cadernos Didáticos e BNCC
              </button>
            </li>
            <li className="flex items-center gap-2 text-[#57423f] hover:text-[#6b0d09] transition-colors">
              <span className="material-symbols-outlined text-[16px] text-[#775a19]">article</span>
              <button 
                onClick={() => onNavigate('publicacoes-e-artigos')} 
                className="text-sm text-left hover:underline"
              >
                Ensaios e Monografias do Vale
              </button>
            </li>
          </ul>
        </div>

        {/* Coluna 3: Apoio Institucional & Cooperação */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <span className="text-xs uppercase tracking-wider text-[#775a19] font-bold">
            Apoio Institucional &amp; Cooperação
          </span>
          <div className="pt-1">
            <div className="p-3.5 bg-white rounded-lg shadow-[0_1px_3px_rgba(35,31,32,0.03)] border border-[#dec0bb]/50">
              <span className="text-[10px] uppercase text-[#6b0d09] font-bold tracking-wider block">
                Educação Municipal
              </span>
              <span className="text-sm text-[#1e1b1c] font-semibold block">
                Rede Municipal de Ensino de Tremembé
              </span>
              <span className="text-xs text-[#57423f]">Secretaria de Educação</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tarja Inferior de Direitos */}
      <div className="bg-[#f5eced] px-4 lg:px-8 py-3 border-t border-[#dec0bb]/60">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#57423f]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#775a19] text-[18px]">verified</span>
            <span>
              Licença Aberta <strong>Creative Commons Atribuição 4.0 Internacional (CC BY 4.0)</strong>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span 
              onClick={() => onShowToast('Repositório documental hospedado com versionamento Git')}
              className="flex items-center gap-1 font-mono text-[11px] cursor-pointer hover:text-[#6b0d09]"
            >
              <span className="material-symbols-outlined text-[14px]">terminal</span>
              Hospedado via GitHub Pages
            </span>
            <span className="font-mono text-[11px] text-[#57423f]">
              © 2025 Memória Tremembé
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
