import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { LOCALE_STORAGE_KEY } from '@/lib/i18n';
import { useLocale } from './use-locale';

function LocaleProbe() {
  const { locale, setLocale } = useLocale();

  return (
    <div>
      <output>{locale}</output>
      <button type="button" onClick={() => setLocale('ru')}>
        RU
      </button>
      <button type="button" onClick={() => setLocale('kk')}>
        ҚАЗ
      </button>
    </div>
  );
}

describe('useLocale', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.replaceState({}, '', '/');
    document.documentElement.lang = 'ru';
  });

  it('uses Russian by default', () => {
    render(<LocaleProbe />);

    expect(screen.getByText('ru')).toBeInTheDocument();
  });

  it('prioritizes a valid URL locale over the saved locale', () => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'ru');
    window.history.replaceState({}, '', '/?lang=kk');

    render(<LocaleProbe />);

    expect(screen.getByText('kk')).toBeInTheDocument();
  });

  it('persists a language switch in the page URL and local storage', async () => {
    const user = userEvent.setup();
    render(<LocaleProbe />);

    await user.click(screen.getByRole('button', { name: 'ҚАЗ' }));

    await waitFor(() => {
      expect(screen.getByText('kk')).toBeInTheDocument();
      expect(window.location.search).toBe('?lang=kk');
      expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('kk');
      expect(document.documentElement.lang).toBe('kk');
    });
  });

  it('falls back safely for an invalid URL locale', () => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'kk');
    window.history.replaceState({}, '', '/?lang=de');

    render(<LocaleProbe />);

    expect(screen.getByText('ru')).toBeInTheDocument();
  });
});
