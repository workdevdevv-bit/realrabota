export type Locale = 'ru' | 'kk';

export const LOCALE_STORAGE_KEY = 'real-rabota-locale';

export function isLocale(value: string | null): value is Locale {
  return value === 'ru' || value === 'kk';
}
