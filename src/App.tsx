import React, { useState, useEffect } from 'react';
import { NavScreen, ArchivalItem, LessonPlan } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { ArchivalInspectorModal } from './components/ArchivalInspectorModal';
import { ImageLightboxModal } from './components/ImageLightboxModal';
import { LessonPlanModal } from './components/LessonPlanModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';

import { HomeScreen } from './screens/HomeScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { AcervoScreen } from './screens/AcervoScreen';
import { ProfessorScreen } from './screens/ProfessorScreen';
import { PublicationsScreen } from './screens/PublicationsScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<NavScreen>('inicio');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Modals state
  const [inspectedDoc, setInspectedDoc] = useState<ArchivalItem | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<{ plan: LessonPlan; mode: 'plano' | 'aluno' } | null>(null);
  const [lightboxData, setLightboxData] = useState<{ url: string; title: string; alt: string } | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Keyboard shortcut for ⌘K search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (screen: NavScreen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 3800);
  };

  const handleOpenImage = (url: string, title: string, alt: string) => {
    setLightboxData({ url, title, alt });
  };

  const handleOpenLessonPlan = (plan: LessonPlan, mode: 'plano' | 'aluno') => {
    setSelectedPlan({ plan, mode });
  };

  const handleInspectDoc = (item: ArchivalItem) => {
    setInspectedDoc(item);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fff8f8] text-[#1e1b1c] font-sans selection:bg-[#fed488] selection:text-[#6b0d09]">
      {/* Fixed Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenImage={handleOpenImage}
      />

      {/* Main Content Area */}
      <main className="flex-grow pt-24">
        {currentScreen === 'inicio' && (
          <HomeScreen
            onNavigate={handleNavigate}
            onInspectDoc={handleInspectDoc}
            onOpenImage={handleOpenImage}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'historia-de-tremembe' && (
          <HistoryScreen
            onNavigate={handleNavigate}
            onInspectDoc={handleInspectDoc}
            onOpenImage={handleOpenImage}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'acervo-digital' && (
          <AcervoScreen
            onNavigate={handleNavigate}
            onInspectDoc={handleInspectDoc}
            onOpenImage={handleOpenImage}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'espaco-do-professor' && (
          <ProfessorScreen
            onNavigate={handleNavigate}
            onOpenLessonPlan={handleOpenLessonPlan}
            onOpenImage={handleOpenImage}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'publicacoes-e-artigos' && (
          <PublicationsScreen
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onShowToast={showToast}
      />

      {/* Archival Deep Zoom & Paleography Inspector Modal */}
      {inspectedDoc && (
        <ArchivalInspectorModal
          item={inspectedDoc}
          onClose={() => setInspectedDoc(null)}
          onShowToast={showToast}
        />
      )}

      {/* Universal Image Lightbox with Direct Image Links */}
      {lightboxData && (
        <ImageLightboxModal
          isOpen={!!lightboxData}
          imageUrl={lightboxData.url}
          title={lightboxData.title}
          altText={lightboxData.alt}
          onClose={() => setLightboxData(null)}
          onShowToast={showToast}
        />
      )}

      {/* Lesson Plan & Student Worksheet Inspector Modal */}
      {selectedPlan && (
        <LessonPlanModal
          plan={selectedPlan.plan}
          mode={selectedPlan.mode}
          onClose={() => setSelectedPlan(null)}
          onShowToast={showToast}
        />
      )}

      {/* Global Quick Search (⌘K) Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
        onSelectDoc={handleInspectDoc}
      />

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
