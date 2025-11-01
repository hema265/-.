
import { Strategy } from './types';
import {
  BrainstormIcon, BookOpenIcon, HatsIcon, MapIcon, CheckCircleIcon,
  BriefcaseIcon, PuzzleIcon, SearchIcon, MaskIcon, DramaIcon,
  GameControllerIcon, HeartIcon, CogIcon
} from './components/Icons';

export const TEACHING_STRATEGIES: Strategy[] = [
  {
    id: 'reciprocal-teaching',
    name: 'التدريس التبادلي',
    description: 'حوار بين المعلم والطلاب حول نص معين، يتبادلون فيه الأدوار.',
    icon: BookOpenIcon,
  },
  {
    id: 'six-hats',
    name: 'القبعات الست',
    description: 'أداة للتفكير الجماعي وحل المشكلات من زوايا مختلفة.',
    icon: HatsIcon,
  },
  {
    id: 'brainstorming',
    name: 'العصف الذهني',
    description: 'توليد أكبر عدد ممكن من الأفكار حول موضوع معين دون قيود.',
    icon: BrainstormIcon,
  },
  {
    id: 'thinking-maps',
    name: 'خرائط التفكير',
    description: 'أدوات بصرية لتنظيم الأفكار وعرضها بطريقة منظمة.',
    icon: MapIcon,
  },
  {
    id: 'formative-assessment',
    name: 'التقويم التكويني',
    description: 'تقييم مستمر لمراقبة تعلم الطلاب وتقديم تغذية راجعة.',
    icon: CheckCircleIcon,
  },
  {
    id: 'project-based',
    name: 'التعلم القائم على المشاريع',
    description: 'يكتسب الطلاب المعرفة والمهارات من خلال العمل في مشروع.',
    icon: BriefcaseIcon,
  },
  {
    id: 'problem-solving',
    name: 'حل المشكلات',
    description: 'استراتيجية تركز على إيجاد حلول للمشكلات المعقدة.',
    icon: PuzzleIcon,
  },
  {
    id: 'inquiry-based',
    name: 'التعلم القائم على الاستقصاء',
    description: 'عملية تعلم تبدأ بطرح الأسئلة والمشكلات بدلاً من الحقائق.',
    icon: SearchIcon,
  },
  {
    id: 'mantle-of-expert',
    name: 'عباءة الخبير',
    description: 'يتقمص الطلاب دور خبراء لحل مشكلة واقعية.',
    icon: MaskIcon,
  },
  {
    id: 'process-drama',
    name: 'الدراما التكوينية',
    description: 'استخدام الدراما لاستكشاف القضايا والأفكار والمشاعر.',
    icon: DramaIcon,
  },
  {
    id: 'fun-learning',
    name: 'التعلم الممتع',
    description: 'دمج الألعاب والأنشطة الممتعة في عملية التعلم.',
    icon: GameControllerIcon,
  },
  {
    id: 'social-emotional',
    name: 'التعلم العاطفي والاجتماعي',
    description: 'تنمية المهارات الاجتماعية والعاطفية لدى الطلاب.',
    icon: HeartIcon,
  },
  {
    id: 'adaptive-learning',
    name: 'التعلم التكيفي',
    description: 'تخصيص مسار التعلم لكل طالب بناءً على احتياجاته.',
    icon: CogIcon,
  },
];
