
import React from 'react';

interface LessonInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LessonInput: React.FC<LessonInputProps> = ({ value, onChange }) => {
  return (
    <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 shadow-lg">
      <label htmlFor="lesson-title" className="block text-lg font-medium text-cyan-400 mb-2">
        1. أدخل عنوان الدرس
      </label>
      <input
        id="lesson-title"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="مثال: دورة حياة النبات"
        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 text-lg"
      />
    </div>
  );
};
