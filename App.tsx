
import React, { useState, useCallback } from 'react';
import { Strategy, InteractiveExplanation } from './types';
import { TEACHING_STRATEGIES } from './constants';
import { generateLessonPlan, explainStrategy, explainLessonInteractively } from './services/geminiService';
import { LessonPlanDisplay } from './components/LessonPlanDisplay';
import { StrategyGrid } from './components/StrategyGrid';
import { Header } from './components/Header';
import { LessonInput } from './components/LessonInput';

type ActiveView = 'welcome' | 'plan' | 'strategyExplanation' | 'lessonExplanation';

export default function App() {
  const [lessonTitle, setLessonTitle] = useState<string>('');
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [lessonPlan, setLessonPlan] = useState<string>('');
  const [explanationContent, setExplanationContent] = useState<InteractiveExplanation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>('welcome');

  const handleStrategySelect = useCallback(async (strategy: Strategy) => {
    if (!lessonTitle.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setLessonPlan('');
    setExplanationContent(null);
    setSelectedStrategy(strategy);

    try {
      const plan = await generateLessonPlan(lessonTitle, strategy.name);
      setLessonPlan(plan);
      setActiveView('plan');
    } catch (err) {
      setError('حدث خطأ أثناء إنشاء الخطة. يرجى المحاولة مرة أخرى.');
      console.error(err);
      setActiveView('welcome');
    } finally {
      setIsLoading(false);
    }
  }, [lessonTitle, isLoading]);

  const handleExplainStrategy = async () => {
    if (!selectedStrategy || isLoading) return;
    setIsLoading(true);
    setError(null);
    // This view still uses simple markdown, so we create a temporary object
    // to fit the new explanationContent structure.
    setActiveView('strategyExplanation'); 
    try {
      const explanationText = await explainStrategy(selectedStrategy.name);
      setExplanationContent({
          strategy: selectedStrategy.name,
          interactive_content: explanationText
      });
    } catch (err) {
      setError('حدث خطأ أثناء شرح الاستراتيجية.');
      console.error(err);
      setActiveView('plan'); // Revert to plan on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleExplainLesson = async () => {
    if (!lessonTitle.trim() || !selectedStrategy || isLoading) return;
    setIsLoading(true);
    setError(null);
    setActiveView('lessonExplanation');
    try {
      const explanation = await explainLessonInteractively(lessonTitle, selectedStrategy.name);
      setExplanationContent(explanation);
    } catch (err) {
      setError('حدث خطأ أثناء إنشاء الشرح التفاعلي.');
      console.error(err);
      setActiveView('plan'); // Revert to plan on error
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/3 lg:max-w-md xl:max-w-lg flex flex-col gap-6">
          <LessonInput 
            value={lessonTitle} 
            onChange={(e) => setLessonTitle(e.target.value)}
          />
          <StrategyGrid
            strategies={TEACHING_STRATEGIES}
            onSelect={handleStrategySelect}
            selectedStrategy={selectedStrategy}
            disabled={!lessonTitle.trim() || isLoading}
          />
        </aside>
        <section className="flex-grow lg:w-2/3 bg-slate-800/50 rounded-2xl shadow-2xl shadow-slate-950/50 flex flex-col overflow-hidden border border-slate-700">
          <LessonPlanDisplay
            isLoading={isLoading}
            lessonPlan={lessonPlan}
            explanationContent={explanationContent}
            error={error}
            strategy={selectedStrategy}
            lessonTitle={lessonTitle}
            activeView={activeView}
            onExplainStrategy={handleExplainStrategy}
            onExplainLesson={handleExplainLesson}
            onShowPlan={() => setActiveView('plan')}
          />
        </section>
      </main>
    </div>
  );
}
