import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Home from './page';

describe('Real Rabota landing', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.replaceState({}, '', '/');
    document.documentElement.lang = 'ru';
  });

  it('opens with the approved employment offer', () => {
    render(<Home />);

    expect(
      screen.getByRole('heading', {
        name: 'Работа, которая меняет географию жизни',
      }),
    ).toBeInTheDocument();
  });

  it('shows the primary consultation path in the first viewport', () => {
    render(<Home />);

    expect(
      screen.getByRole('link', { name: 'Получить консультацию' }),
    ).toHaveAttribute('href', '#consultation');
    expect(screen.getAllByLabelText('Ваше имя')[0]).toBeInTheDocument();
    expect(screen.getAllByLabelText('Телефон')[0]).toBeInTheDocument();
    expect(screen.getByTestId('hero-art')).toBeInTheDocument();
  });

  it('renders every approved conversion section', () => {
    render(<Home />);

    [
      'Почему Real Rabota',
      'Страны и форматы работы',
      'Как проходит трудоустройство',
      'Актуальные программы',
      'Визовое сопровождение',
      'Истории клиентов',
      'Частые вопросы',
      'Получите консультацию',
    ].forEach((heading) => {
      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
    });
  });

  it('explains the visa support scope without promising a visa decision', () => {
    render(<Home />);

    expect(screen.getByText('Стратегия подачи')).toBeInTheDocument();
    expect(screen.getByText('Пакет документов')).toBeInTheDocument();
    expect(screen.getByText('Подготовка к интервью')).toBeInTheDocument();
    expect(screen.getByText('Контроль процесса')).toBeInTheDocument();
    expect(
      screen.getByText(/Решение о выдаче визы принимает консульство/),
    ).toBeInTheDocument();
  });

  it('supports the long-form story with rich destination and service imagery', () => {
    render(<Home />);

    expect(
      screen.getByRole('img', { name: 'Работа и переезд в Европу' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Подготовка документов для визовой подачи' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Клиенты в начале нового этапа' }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBeGreaterThanOrEqual(6);
  });

  it('shows every confirmed contact', () => {
    render(<Home />);

    expect(screen.getAllByText('+7 707 110 15 33').length).toBeGreaterThan(0);
    expect(screen.getAllByText('+7 747 536 12 19').length).toBeGreaterThan(0);
    expect(screen.getAllByText('realrabota77@gmail.com').length).toBeGreaterThan(0);
    expect(
      screen.getAllByText('г. Алматы, пр. Сейфулина 531, офис 110').length,
    ).toBeGreaterThan(0);
  });

  it('opens a prefilled WhatsApp consultation request', async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    render(<Home />);

    await user.type(screen.getAllByLabelText('Ваше имя')[0], 'Айдана');
    await user.type(screen.getAllByLabelText('Телефон')[0], '+7 701 123 45 67');
    await user.selectOptions(screen.getAllByLabelText('Направление')[0], 'poland');
    await user.click(
      screen.getAllByRole('button', { name: 'Получить консультацию' })[0],
    );

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(openSpy).toHaveBeenCalledTimes(1);

    const [url, target, features] = openSpy.mock.calls[0];
    const whatsappUrl = new URL(String(url));
    expect(`${whatsappUrl.origin}${whatsappUrl.pathname}`).toBe('https://wa.me/77071101533');
    expect(whatsappUrl.searchParams.get('text')).toBe(
      'Здравствуйте! Хочу получить консультацию Real Rabota.\n\nИмя: Айдана\nТелефон: +7 701 123 45 67\nНаправление: Польша',
    );
    expect(target).toBe('_blank');
    expect(features).toBe('noopener,noreferrer');

    fetchSpy.mockRestore();
    openSpy.mockRestore();
  });

  it('keeps form controls stable between server and client renders', () => {
    render(<Home />);

    const nameFields = screen.getAllByLabelText('Ваше имя');
    expect(nameFields[0]).toHaveAttribute('id', 'hero-consultation-name');
    expect(nameFields[1]).toHaveAttribute('id', 'final-consultation-name');
  });

  it('requires every consultation detail before opening WhatsApp', () => {
    render(<Home />);

    expect(screen.getAllByLabelText('Ваше имя')[0]).toBeRequired();
    expect(screen.getAllByLabelText('Телефон')[0]).toBeRequired();
    expect(screen.getAllByLabelText('Направление')[0]).toBeRequired();
  });

  it('opens an FAQ answer with an accessible control', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const trigger = screen.getByRole('button', {
      name: /Сколько занимает оформление/,
    });
    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/Срок зависит от страны/)).toBeVisible();
  });

  it('shows seven country directions with local flag artwork', () => {
    const { container } = render(<Home />);

    ['Европа', 'Польша', 'Литва', 'Латвия', 'Эстония', 'США', 'Канада'].forEach(
      (country) => expect(screen.getByRole('button', {
        name: new RegExp(`${country} — Смотреть варианты работы`),
      })).toBeInTheDocument(),
    );
    expect(container.querySelectorAll('.direction-flag img')).toHaveLength(7);
  });

  it('opens country-specific job options from a destination card', async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getByRole('button', { name: /Польша/ }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Варианты работы в Польше' })).toBeInTheDocument();
    expect(screen.getByText('Строитель')).toBeInTheDocument();
    expect(screen.getByText('5 500–8 500 PLN/мес.')).toBeInTheDocument();
    expect(screen.getByText(/Точные условия зависят от работодателя/)).toBeInTheDocument();
  });

  it('localizes the country job dialog in Kazakh', async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getByRole('button', { name: 'ҚАЗ' }));
    await user.click(screen.getByRole('button', { name: /Польша/ }));

    expect(screen.getByRole('heading', { name: 'Польшадағы жұмыс нұсқалары' })).toBeInTheDocument();
    expect(screen.getByText('Құрылысшы')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Кеңес алу' })).toHaveAttribute('href', '#consultation');
  });

  it('switches the complete interface to Kazakh without reloading', async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getByRole('button', { name: 'ҚАЗ' }));

    expect(
      screen.getByRole('heading', { name: 'Өмір географиясын өзгертетін жұмыс' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Визалық сүйемелдеу' })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Кеңес алу' }).length).toBeGreaterThan(0);
    expect(window.location.search).toBe('?lang=kk');
  });
});
