declare module 'lucide-react' {
  import React from 'react';

  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    strokeWidth?: number | string;
    color?: string;
  }

  export type Icon = React.ForwardRefExoticComponent<
    LucideProps & React.RefAttributes<SVGSVGElement>
  >;

  export const Users: Icon;
  export const Briefcase: Icon;
  export const ShoppingBag: Icon;
  export const Eye: Icon;
  export const TrendingUp: Icon;
  export const Download: Icon;
  export const RotateCcw: Icon;
  export const LogOut: Icon;
  export const Search: Icon;
  export const Plus: Icon;
  export const ExternalLink: Icon;
  export const Trash2: Icon;
  export const Edit3: Icon;
  export const X: Icon;
  export const CheckCircle2: Icon;
  export const AlertCircle: Icon;
  export const Globe: Icon;
  export const Clock: Icon;
  export const ArrowUpRight: Icon;
  export const Filter: Icon;
  export const Check: Icon;
  export const ChevronDown: Icon;
  export const ChevronUp: Icon;
  export const Activity: Icon;
  export const Layers: Icon;
  export const Sparkles: Icon;
  export const Phone: Icon;
  export const Mail: Icon;
  export const ShieldCheck: Icon;
  export const Smartphone: Icon;
  export const Flame: Icon;
  export const Award: Icon;
  export const Lock: Icon;
  export const Share2: Icon;
  export const GraduationCap: Icon;
  export const Laptop: Icon;
  export const Building2: Icon;
  export const HelpCircle: Icon;
  export const MessageSquare: Icon;
  export const Bell: Icon;
  export const FileCheck: Icon;
  export const GripVertical: Icon;
  export const ArrowUp: Icon;
  export const ArrowDown: Icon;
  export const ArrowUpToLine: Icon;

  const icons: { [key: string]: Icon };
  export default icons;
}

