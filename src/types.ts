/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  duration: string;
  type: 'individual' | 'group' | 'event' | 'online';
  details: string[];
  location: string;
  spotsLeft?: number;
  highlighted?: boolean;
}

export interface ScheduleEvent {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  time: string;
  title: string;
  type: 'individual' | 'group' | 'event' | 'online';
  location: string;
  spotsTotal: number;
  spotsTaken: number;
  price: string;
  isSpecial?: boolean;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  episodesCount: number;
  price: string;
  benefits: string[];
  episodes: {
    title: string;
    duration: string;
    description: string;
    videoUrl?: string;
  }[];
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  iconName: string; // Used to look up Lucide icons dynamically
}

export interface Testimonial {
  id: string;
  name: string;
  age: number;
  occupation: string;
  text: string;
  rating: number;
  avatarUrl?: string;
  achievement: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface BookingSubmission {
  serviceId: string;
  serviceTitle: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  telegram?: string;
  notes?: string;
}
