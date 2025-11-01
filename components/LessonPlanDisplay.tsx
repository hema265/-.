import React, { useRef, useState, useEffect } from 'react';
import { Strategy, InteractiveExplanation, InteractiveStep } from '../types';
import { 
    LightBulbIcon, PdfIcon, InfoIcon, SparklesIcon, ArrowRightIcon, 
    PredictIcon, QuestionIcon, ClarifyIcon, SummarizeIcon, GroupIcon, 
    DiscussIcon, CreateIcon, PresentIcon, EvaluateIcon, ReflectIcon, 
    SearchIcon, GameControllerIcon, BrainstormIcon, MapIcon,
    WhiteHatIcon, RedHatIcon, BlackHatIcon, YellowHatIcon, GreenHatIcon, BlueHatIcon
} from './Icons';

// Add declarations for CDN libraries to avoid TS errors
declare var jspdf: any;
declare var html2canvas: any;

interface LessonPlanDisplayProps {
  isLoading: boolean;
  lessonPlan: string;
  explanationContent: InteractiveExplanation | null;
  error: string | null;
  strategy: Strategy | null;
  lessonTitle: string;
  activeView: 'welcome' | 'plan' | 'strategyExplanation' | 'lessonExplanation';
  onExplainStrategy: () => void;
  onExplainLesson: () => void;
  onShowPlan: () => void;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center p-8 h-full">
    <svg className="animate-spin h-12 w-12 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <p className="mt-4 text-lg font-semibold text-slate-300">جاري التحميل... قد يستغرق الأمر بضع لحظات</p>
    <p className="text-slate-400">يقوم الذكاء الاصطناعي بإعداد المحتوى خصيصًا لك</p>
  </div>
);

const WelcomeMessage: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center p-8 h-full">
     <LightBulbIcon className="w-20 h-20 text-cyan-500/50" />
    <h2 className="mt-6 text-2xl font-bold text-slate-200">مستعد للإبداع؟</h2>
    <p className="mt-2 max-w-md mx-auto text-slate-400">
      ابدأ بكتابة عنوان لدرسك في الأعلى، ثم اختر إحدى استراتيجيات التدريس المبتكرة لتوليد خطة درس متكاملة وتفاعلية.
    </p>
  </div>
);

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => (
  <div className="prose prose-invert prose-lg max-w-none p-6 md:p-8 whitespace-pre-wrap">
    {content.split('\n').map((line, index) => {
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold mt-6 mb-3 text-cyan-300 border-b border-cyan-300/20 pb-2">{line.substring(3)}</h2>;
      }
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold mt-4 mb-4 text-cyan-200">{line.substring(2)}</h1>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index} className="font-bold my-2 text-slate-200">{line.substring(2, line.length - 2)}</p>;
      }
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        return <li key={index} className="my-1.5">{line.trim().substring(2)}</li>;
      }
       if (/^\d+\.\s/.test(line.trim())) {
        const contentIndex = line.indexOf(' ') + 1;
        return <li key={index} className="my-1.5 list-decimal ms-6">{line.substring(contentIndex)}</li>;
      }
      return <p key={index} className="my-2 leading-relaxed">{line}</p>;
    })}
  </div>
);

const InteractiveStepIcon: React.FC<{ iconName: string; className?: string }> = ({ iconName, className }) => {
    switch (iconName) {
        case 'predict': return <PredictIcon className={className} />;
        case 'question': return <QuestionIcon className={className} />;
        case 'clarify': return <ClarifyIcon className={className} />;
        case 'summarize': return <SummarizeIcon className={className} />;
        case 'group': return <GroupIcon className={className} />;
        case 'discuss': return <DiscussIcon className={className} />;
        case 'create': return <CreateIcon className={className} />;
        case 'present': return <PresentIcon className={className} />;
        case 'evaluate': return <EvaluateIcon className={className} />;
        case 'reflect': return <ReflectIcon className={className} />;
        case 'search': return <SearchIcon className={className} />;
        case 'play': return <GameControllerIcon className={className} />;
        case 'brainstorm': return <BrainstormIcon className={className} />;
        case 'map': return <MapIcon className={className} />;
        case 'white_hat': return <WhiteHatIcon className={className} />;
        case 'red_hat': return <RedHatIcon className={className} />;
        case 'black_hat': return <BlackHatIcon className={className} />;
        case 'yellow_hat': return <YellowHatIcon className={className} />;
        case 'green_hat': return <GreenHatIcon className={className} />;
        case 'blue_hat': return <BlueHatIcon className={className} />;
        default: return <SparklesIcon className={className} />; // Fallback icon
    }
};

const InteractiveStepsDisplay: React.FC<{ steps: InteractiveStep[] }> = ({ steps }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        setActiveIndex(0);
    }, [steps]);
    
    const activeStep = steps[activeIndex];

    return (
        <div className="p-4 md:p-6 flex flex-col h-full">
            <div className="flex-shrink-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-4">
                {steps.map((step, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`flex flex-col items-center justify-center p-3 text-center rounded-lg border-2 transition-all duration-200 ease-in-out cursor-pointer ${
                            activeIndex === index
                                ? 'bg-cyan-500/20 border-cyan-400 ring-2 ring-cyan-400 text-cyan-300'
                                : 'bg-slate-700/50 border-slate-600 hover:bg-cyan-500/10 hover:border-cyan-400'
                        }`}
                    >
                        <InteractiveStepIcon iconName={step.icon} className="w-8 h-8 mb-2" />
                        <span className="text-xs font-semibold">{step.title}</span>
                    </button>
                ))}
            </div>
            <div className="flex-grow bg-slate-800/50 rounded-lg p-1 border border-slate-700 overflow-y-auto">
                {activeStep && <MarkdownRenderer content={activeStep.content} />}
            </div>
        </div>
    )
}


export const LessonPlanDisplay: React.FC<LessonPlanDisplayProps> = ({ 
    isLoading, lessonPlan, explanationContent, error, strategy, lessonTitle, activeView, 
    onExplainStrategy, onExplainLesson, onShowPlan 
}) => {
    const contentRef = useRef<HTMLDivElement>(null);

    const handleDownloadPdf = () => {
        if (activeView !== 'plan' || !contentRef.current || typeof jspdf === 'undefined' || typeof html2canvas === 'undefined') {
            alert('التصدير متاح لخطة الدرس فقط.');
            return;
        }
        const { jsPDF } = jspdf;
        
        // Temporarily make all text visible for PDF generation
        const scrollableContent = contentRef.current.querySelector('.overflow-y-auto') as HTMLElement | null;
        const originalHeight = scrollableContent ? scrollableContent.style.height : '';
        if (scrollableContent) {
            scrollableContent.style.height = 'auto';
        }

        html2canvas(contentRef.current, {
            backgroundColor: '#1e293b', scale: 2, useCORS: true, allowTaint: true
        }).then((canvas: any) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF({
            orientation: 'p', unit: 'px', format: [canvas.width, canvas.height], hotfixes: ['px_scaling'],
          });
          pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
          pdf.save(`${lessonTitle.replace(/ /g, '_') || 'lesson-plan'}.pdf`);
          // Restore original height
          if(scrollableContent) scrollableContent.style.height = originalHeight;
        }).catch((err: any) => {
            console.error("PDF generation failed:", err);
            alert('حدث خطأ أثناء إنشاء ملف PDF.');
            if(scrollableContent) scrollableContent.style.height = originalHeight;
        });
    };

  const renderContent = () => {
    if (isLoading) return <LoadingSpinner />;
    if (error) return <div className="p-8 text-center text-red-400">{error}</div>;

    if (activeView === 'plan' && lessonPlan) return <MarkdownRenderer content={lessonPlan} />;

    if (activeView === 'lessonExplanation' && explanationContent) {
        if (explanationContent.interactive_steps && explanationContent.interactive_steps.length > 0) {
            return <InteractiveStepsDisplay steps={explanationContent.interactive_steps} />;
        }
        if (explanationContent.interactive_content) {
            return <MarkdownRenderer content={explanationContent.interactive_content} />;
        }
    }
    
    if (activeView === 'strategyExplanation' && explanationContent?.interactive_content) {
         return <MarkdownRenderer content={explanationContent.interactive_content} />;
    }

    return <WelcomeMessage />;
  };

  const renderHeader = () => {
    switch (activeView) {
      case 'plan':
        return strategy && (
          <>
            <div className="flex items-center flex-shrink-1 overflow-hidden">
                <strategy.icon className="w-6 h-6 text-cyan-400 mr-3 shrink-0" />
                <h3 className="text-lg font-bold text-white truncate">
                    خطة الدرس: {strategy.name}
                </h3>
            </div>
            <div className="flex items-center gap-2 flex-wrap justify-end">
              <button onClick={onExplainStrategy} className="flex items-center gap-2 text-sm bg-purple-600/50 hover:bg-purple-600 text-white font-semibold py-1.5 px-3 rounded-md transition-colors duration-200 border border-purple-500" title="شرح هذه الاستراتيجية">
                <InfoIcon className="w-5 h-5" /> <span>شرح الاستراتيجية</span>
              </button>
              <button onClick={onExplainLesson} className="flex items-center gap-2 text-sm bg-teal-600/50 hover:bg-teal-600 text-white font-semibold py-1.5 px-3 rounded-md transition-colors duration-200 border border-teal-500" title="شرح تفاعلي للدرس">
                <SparklesIcon className="w-5 h-5" /> <span>شرح تفاعلي</span>
              </button>
              <button onClick={handleDownloadPdf} className="flex items-center gap-2 text-sm bg-red-600/50 hover:bg-red-600 text-white font-semibold py-1.5 px-3 rounded-md transition-colors duration-200 border border-red-500" title="تحميل كملف PDF">
                <PdfIcon className="w-5 h-5" /> <span>PDF</span>
              </button>
            </div>
          </>
        );
      case 'strategyExplanation':
      case 'lessonExplanation':
        const title = activeView === 'strategyExplanation' ? `شرح: ${strategy?.name}` : `شرح: ${lessonTitle}`;
        const Icon = activeView === 'strategyExplanation' ? InfoIcon : SparklesIcon;
        return (
            <>
              <div className="flex items-center flex-shrink-1 overflow-hidden">
                <Icon className="w-6 h-6 text-cyan-400 mr-3 shrink-0" />
                <h3 className="text-lg font-bold text-white truncate">{title}</h3>
              </div>
              <button onClick={onShowPlan} className="flex items-center gap-2 text-sm bg-slate-600/50 hover:bg-slate-600 text-white font-semibold py-1.5 px-3 rounded-md transition-colors duration-200 border border-slate-500" title="العودة إلى خطة الدرس">
                <ArrowRightIcon className="w-5 h-5" /> <span>العودة للخطة</span>
              </button>
            </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-slate-900/70 p-4 border-b border-slate-700 flex items-center justify-between flex-wrap gap-2 min-h-[70px]">
        {!isLoading && renderHeader()}
      </div>
      <div ref={contentRef} className={`flex-grow overflow-y-auto ${activeView === 'welcome' && !isLoading ? 'flex items-center justify-center' : ''}`}>
        {renderContent()}
      </div>
    </div>
  );
};