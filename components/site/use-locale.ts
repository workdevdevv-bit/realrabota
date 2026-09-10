'use client';

import { useCallback, useEffect, useSyncExternalStore } from 'react';

import { isLocale, LOCALE_STORAGE_KEY, type Locale } from '@/lib/i18n';

const listeners = new Set<() => void>();

function getBrowserLocale(): Locale {
  const queryLocale = new URLSearchParams(window.location.search).get('lang');

  if (queryLocale !== null) {
    return isLocale(queryLocale) ? queryLocale : 'ru';
  }

  const savedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return isLocale(savedLocale) ? savedLocale : 'ru';
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener('popstate', listener);
  window.addEventListener('storage', listener);

  return () => {
    listeners.delete(listener);
    window.removeEventListener('popstate', listener);
    window.removeEventListener('storage', listener);
  };
}

function saveLocale(locale: Locale) {
  const url = new URL(window.location.href);
  url.searchParams.set('lang', locale);

  window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  document.documentElement.lang = locale;
}

export function useLocale() {
  const locale = useSyncExternalStore<Locale>(subscribe, getBrowserLocale, () => 'ru');

  useEffect(() => {
    saveLocale(locale);
  }, [locale]);

  const setLocale = useCallback((nextLocale: Locale) => {
    saveLocale(nextLocale);
    listeners.forEach((listener) => listener());
  }, []);

  return { locale, setLocale };
}
