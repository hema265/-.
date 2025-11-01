
import React from 'react';

export interface Strategy {
  id: string;
  name: string;
  description: string;
  icon: React.FC<{ className?: string }>;
}

export interface InteractiveStep {
  title: string;
  icon: string;
  content: string;
}

export interface InteractiveExplanation {
  strategy: string;
  interactive_steps?: InteractiveStep[];
  interactive_content?: string;
}
