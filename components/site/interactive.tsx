'use client';

import { useState } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import type { Locale } from '@/lib/i18n';

type FormCopy = {
  name: string;
  namePlaceholder: string;
  phone: string;
  direction: string;
  directionPlaceholder: string;
  options: ReadonlyArray<readonly [string, string]>;
  submit: string;
  notice: string;
};

type ConsultationFormProps = {
  variant?: 'dark' | 'light';
  copy: FormCopy;
};

export function ConsultationForm({ copy, variant = 'dark' }: ConsultationFormProps) {
  const [notice, setNotice] = useState('');
  const id = variant === 'dark' ? 'hero-consultation' : 'final-consultation';
  const nameId = `${id}-name`;
  const phoneId = `${id}-phone`;
  const directionId = `${id}-direction`;

  return (
    <form
      className={`consultation-form consultation-form-${variant}`}
      onSubmit={(event) => {
        event.preventDefault();
        setNotice('shown');
      }}
    >
      <label htmlFor={nameId}>
        <span>{copy.name}</span>
        <Input id={nameId} name="name" autoComplete="name" placeholder={copy.namePlaceholder} />
      </label>
      <label htmlFor={phoneId}>
        <span>{copy.phone}</span>
        <Input
          id={phoneId}
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+7 (___) ___-__-__"
        />
      </label>
      <label htmlFor={directionId}>
        <span>{copy.direction}</span>
        <NativeSelect id={directionId} name="direction" defaultValue="" className="direction-select">
          <NativeSelectOption value="" disabled>
            {copy.directionPlaceholder}
          </NativeSelectOption>
          {copy.options.map(([value, label]) => (
            <NativeSelectOption key={value} value={value}>{label}</NativeSelectOption>
          ))}
        </NativeSelect>
      </label>
      <Button className="form-button" type="submit">
        {copy.submit}
        <ArrowUpRight aria-hidden="true" />
      </Button>
      {notice ? (
        <output className="form-notice">
          {copy.notice}
        </output>
      ) : null}
    </form>
  );
}

type FaqAccordionProps = {
  questions: ReadonlyArray<readonly [string, string, string]>;
};

export function FaqAccordion({ questions }: FaqAccordionProps) {
  return (
    <Accordion className="faq-list">
      {questions.map(([value, question, answer], index) => (
        <AccordionItem key={value} value={value} className="faq-item">
          <AccordionTrigger className="faq-trigger">
            <span className="faq-number">0{index + 1}</span>
            <span>{question}</span>
          </AccordionTrigger>
          <AccordionContent className="faq-answer">
            <p>{answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

type MobileConsultationCtaProps = {
  label: string;
  ariaLabel: string;
};

export function MobileConsultationCta({ label, ariaLabel }: MobileConsultationCtaProps) {
  return (
    <a
      className="mobile-consultation-cta"
      href="#consultation"
      aria-label={ariaLabel}
    >
      <MessageCircle aria-hidden="true" />
      {label}
    </a>
  );
}

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
  onChange: (locale: Locale) => void;
};

export function LanguageSwitcher({ locale, label, onChange }: LanguageSwitcherProps) {
  return (
    <fieldset className="language-switcher">
      <legend className="sr-only">{label}</legend>
      <button
        type="button"
        className={locale === 'ru' ? 'is-active' : undefined}
        aria-pressed={locale === 'ru'}
        onClick={() => onChange('ru')}
      >
        RU
      </button>
      <span aria-hidden="true" />
      <button
        type="button"
        className={locale === 'kk' ? 'is-active' : undefined}
        aria-pressed={locale === 'kk'}
        onClick={() => onChange('kk')}
      >
        ҚАЗ
      </button>
    </fieldset>
  );
}
