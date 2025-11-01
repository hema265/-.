
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-700/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-cyan-400">
          مولّد خطط الدروس الذكي
        </h1>
        <p className="text-sm sm:text-base text-slate-400 mt-1">
          أدخل عنوان درسك، اختر استراتيجية، واحصل على خطة متكاملة فورًا
        </p>
      </div>
    </header>
  );
};
