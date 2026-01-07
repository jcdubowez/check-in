
import React from 'react';
import { SatisfactionEmoji } from './types';

export const SATISFACTION_EMOJIS: SatisfactionEmoji[] = [
  { level: 1, emoji: '😫', label: 'Muy Insatisfecho', color: 'text-red-500' },
  { level: 2, emoji: '😕', label: 'Insatisfecho', color: 'text-orange-500' },
  { level: 3, emoji: '😐', label: 'Neutral', color: 'text-yellow-500' },
  { level: 4, emoji: '🙂', label: 'Satisfecho', color: 'text-green-400' },
  { level: 5, emoji: '🤩', label: 'Muy Satisfecho', color: 'text-green-600' },
];

export const APP_THEME = {
  primary: 'indigo-600',
  primaryDark: 'indigo-700',
  secondary: 'slate-600',
};
