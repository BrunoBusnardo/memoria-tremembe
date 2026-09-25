import React, { useState } from 'react';
import { NavScreen } from '../types';

interface HeaderProps {
  currentScreen: NavScreen;
  onNavigate: (screen: NavScreen) => void;
  onOpenSearch: () => void;
  onOpenImage?: (url: string, title: string, alt: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onOpenSearch,
  onOpenImage
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoUrl = 'https://lh3.googleusercontent.com/aida/AEtjO1Xs0LIZME5tfLan3Zn72pZmy5FZyP2HE5enQXPH7T0dt-zXL-hyI5FPiP5R7TdbhNPolplLbPvhZ_PEog5Ao2ygL3H0BMhdhoqawkSQ84F2uppKF01JAX1H6-rSSUnpRudKbkIJOLXBw9Kkq9N8oDdZItKxfEAz5KxFmhKGnXsXqBqWaD0CUybVuO3JeT5fwJaZovrEU3rBANxdZeJaRHLai0ey22TMNNspB1udNdCQuIYqbbN3SbXggl0h';

  const navItems: { id: NavScreen; label: string }[] = [
    { id: 'inicio', label: 'Início' },
    { id: 'historia-de-tremembe', label: 'História de Tremembé' },
    { id: 'acervo-digital', label: 'Acervo Digital' },
    { id: 'espaco-do-professor', label: 'Espaço do Professor' },
    { id: 'publicacoes-e-artigos', label: 'Publicações & Artigos' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#fff8f8]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(35,31,32,0.06)] border-b border-[#dec0bb]/50">
      {/* Top Ledger Ribbon */}
      <div className="bg-[#efe6e7] px-4 lg:px-8 py-1 flex items-center justify-between text-xs border-b border-[#dec0bb]/40">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[14px] text-[#775a19]">account_balance</span>
          <span className="font-semibold text-[#57423f] uppercase tracking-wider text-[11px]">
            Portal Historiográfico e Acervo Digital • Vale do Paraíba
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline font-semibold text-[#775a19] text-[11px] tracking-wide">
            ESTRADA DE FERRO CENTRAL DO BRASIL
          </span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 bg-[#ffdea5] text-[#261900] rounded tracking-wider">
            ACERVO PÚBLICO
          </span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="h-20 max-w-[1360px] mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Logo & Brand */}
        <div 
          onClick={() => onNavigate('inicio')}
          className="flex items-center gap-3 flex-shrink-0 cursor-pointer group"
          title="Ir para o Início"
        >
          <img 
            alt="Logo Estação da Memória Tremembé" 
            className="h-9 w-auto object-contain transition-transform group-hover:scale-105" 
            src={logoUrl}
            onClick={(e) => {
              if (e.altKey && onOpenImage) {
                e.stopPropagation();
                onOpenImage(logoUrl, 'Emblema Oficial • Estação da Memória', 'Brasão Histórico da Estação da Memória de Tremembé');
              }
            }}
          />
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold text-[#6b0d09] tracking-tight leading-tight group-hover:text-[#8b261d] transition-colors">
              Estação da Memória
            </span>
            <span className="text-[11px] font-semibold text-[#775a19] uppercase tracking-wider">
              Tremembé • Patrimônio &amp; História
            </span>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden xl:flex items-center gap-1 p-1 bg-[#f5eced] rounded-lg border border-[#dec0bb]/60">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm px-3.5 py-1.5 rounded transition-all font-medium ${
                  isActive
                    ? 'bg-[#8b261d] text-white font-semibold shadow-sm'
                    : 'text-[#57423f] hover:bg-[#efe6e7] hover:text-[#1e1b1c]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Search & Profile Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSearch}
            className="flex items-center bg-white px-3 py-1.5 rounded-lg border border-[#dec0bb] shadow-[0_1px_3px_rgba(35,31,32,0.04)] w-48 sm:w-60 lg:w-72 text-left hover:border-[#8b261d] transition-colors group"
            title="Pesquisar no Acervo (Atalho ⌘K)"
          >
            <span className="material-symbols-outlined text-[18px] text-[#57423f] mr-2 group-hover:text-[#6b0d09]">
              search
            </span>
            <span className="text-xs sm:text-sm text-[#57423f]/70 flex-grow truncate">
              Pesquisar acervo ou fotos...
            </span>
            <kbd className="text-[10px] font-semibold text-[#57423f]/80 bg-[#efe6e7] px-1.5 py-0.5 rounded border border-[#dec0bb]/80 shadow-xs">
              ⌘K
            </kbd>
          </button>

          <div 
            className="w-9 h-9 rounded-full bg-[#6b0d09] hover:bg-[#8b261d] text-white flex items-center justify-center flex-shrink-0 cursor-pointer shadow-sm transition-all"
            title="Acesso de Pesquisadores & Docentes (NPH/UNITAU)"
          >
            <span className="material-symbols-outlined text-[20px]">person</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-[#57423f] hover:bg-[#efe6e7] hover:text-[#6b0d09] transition-colors"
            aria-label="Abrir menu móvel"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#fff8f8] border-b border-[#dec0bb] px-4 py-3 shadow-lg flex flex-col gap-1 animate-fadeIn">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-sm px-3 py-2 rounded transition-all font-medium ${
                  isActive
                    ? 'bg-[#8b261d] text-white font-semibold'
                    : 'text-[#57423f] hover:bg-[#f5eced] hover:text-[#1e1b1c]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
