
import type React from 'react';

export interface Project {
  id: number;
  title: string;
  summary: string;
  description: string;
  technologies: string[];
  sectors: string[];
  imageUrl: string;
  icon: React.ReactNode;
  projectUrl?: string;
}

export interface TeamMember {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface Stat {
    value: string;
    label: string;
    description: string;
}
