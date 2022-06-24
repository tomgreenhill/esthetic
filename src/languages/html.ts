import type { LanguagePattern } from 'types/language';

export const html: LanguagePattern[] = [
  {
    pattern: /<!DOCTYPE (html|HTML PUBLIC .+)>/,
    type: 'meta.module',
    nearTop: true
  },
  {
    pattern: /<[a-z0-9]+(\s*[\w]+=('|").+('|")\s*)?>.*<\/[a-z0-9]+>/g,
    type: 'keyword'
  },
  {
    pattern: /<!--(.*)(-->)?/,
    type: 'comment.block'
  },
  {
    pattern: /[a-z-]+=("|').+("|')/g,
    type: 'keyword.other'
  }
];