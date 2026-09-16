'use client';

/* oxlint-disable next/no-img-element -- country artwork and tiny local flag assets are pre-optimized */

import { useState } from 'react';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Clock3,
  FileCheck2,
  House,
  MessageCircle,
  ShieldCheck,
  X,
} from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import type { Locale } from '@/lib/i18n';

type FormCopy = {
  name: string;
  namePlaceholder: string;
  direction: string;
  directionPlaceholder: string;
  options: ReadonlyArray<readonly [string, string]>;
  submit: string;
  whatsappIntro: string;
  whatsappNameLabel: string;
  notice: string;
};

type ConsultationFormProps = {
  variant?: 'dark' | 'light';
  copy: FormCopy;
};

const WHATSAPP_NUMBER = '77071101533';

export function ConsultationForm({ copy, variant = 'dark' }: ConsultationFormProps) {
  const [notice, setNotice] = useState('');
  const id = variant === 'dark' ? 'hero-consultation' : 'final-consultation';
  const nameId = `${id}-name`;
  const directionId = `${id}-direction`;

  return (
    <form
      className={`consultation-form consultation-form-${variant}`}
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const nameInput = form.elements.namedItem('name') as HTMLInputElement;
        const directionSelect = form.elements.namedItem('direction') as HTMLSelectElement;
        const message = [
          copy.whatsappIntro,
          '',
          `${copy.whatsappNameLabel}: ${nameInput.value}`,
          `${copy.direction}: ${directionSelect.selectedOptions[0]?.text ?? ''}`,
        ].join('\n');

        window.open(
          `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
          '_blank',
          'noopener,noreferrer',
        );
        setNotice('shown');
      }}
    >
      <label htmlFor={nameId}>
        <span>{copy.name}</span>
        <Input id={nameId} name="name" autoComplete="name" placeholder={copy.namePlaceholder} required />
      </label>
      <label htmlFor={directionId}>
        <span>{copy.direction}</span>
        <NativeSelect id={directionId} name="direction" defaultValue="" className="direction-select" required>
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

type CountryCardCopy = {
  label: string;
  imageAlt: string;
  text: string;
  tags: ReadonlyArray<string>;
  dialogTitle: string;
  dialogLead: string;
  conditions: ReadonlyArray<readonly [string, string]>;
  jobs: ReadonlyArray<readonly [string, string, string]>;
};

type CountryDialogLabels = {
  open: string;
  kicker: string;
  conditions: string;
  jobs: string;
  salary: string;
  cta: string;
  close: string;
  disclaimer: string;
};

type CountryJobsDialogProps = {
  country: CountryCardCopy;
  image: string;
  flag: string;
  cardClassName: string;
  labels: CountryDialogLabels;
};

const conditionIcons = [Clock3, FileCheck2, House];

export function CountryJobsDialog({
  country,
  image,
  flag,
  cardClassName,
  labels,
}: CountryJobsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <button
            type="button"
            className={`direction-card ${cardClassName}`}
            aria-label={`${country.label} — ${labels.open}`}
          />
        }
      >
        <span className="direction-media">
          <img
            src={image}
            width="1200"
            height="800"
            loading="lazy"
            decoding="async"
            alt={country.imageAlt}
          />
          <span className="direction-card-top">
            <span className="direction-flag">
              <img src={flag} width="34" height="24" alt="" aria-hidden="true" />
            </span>
            <ArrowUpRight aria-hidden="true" />
          </span>
        </span>
        <span className="direction-copy">
          <span className="direction-title">{country.label}</span>
          <span className="direction-description">{country.text}</span>
          <span className="tag-row">
            {country.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </span>
        </span>
      </DialogTrigger>

      <DialogContent className="jobs-dialog" showCloseButton={false}>
        <DialogClose className="jobs-dialog-close" aria-label={labels.close}>
          <X aria-hidden="true" />
        </DialogClose>
        <DialogHeader className="jobs-dialog-header">
          <div className="jobs-dialog-country">
            <span className="jobs-dialog-flag"><img src={flag} width="38" height="27" alt="" aria-hidden="true" /></span>
            <span>{labels.kicker}</span>
          </div>
          <DialogTitle className="jobs-dialog-title">{country.dialogTitle}</DialogTitle>
          <DialogDescription className="jobs-dialog-lead">{country.dialogLead}</DialogDescription>
        </DialogHeader>

        <section className="jobs-dialog-section" aria-labelledby={`conditions-${country.label}`}>
          <h3 id={`conditions-${country.label}`}>{labels.conditions}</h3>
          <div className="job-condition-grid">
            {country.conditions.map(([title, text], index) => {
              const Icon = conditionIcons[index];
              return (
                <div className="job-condition" key={title}>
                  <span><Icon aria-hidden="true" /></span>
                  <div><small>{title}</small><strong>{text}</strong></div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="jobs-dialog-section" aria-labelledby={`jobs-${country.label}`}>
          <h3 id={`jobs-${country.label}`}>{labels.jobs}</h3>
          <div className="job-list">
            {country.jobs.map(([title, salary, details]) => (
              <article className="job-row" key={title}>
                <span className="job-icon"><BriefcaseBusiness aria-hidden="true" /></span>
                <div className="job-copy"><strong>{title}</strong><span>{details}</span></div>
                <div className="job-salary"><small>{labels.salary}</small><strong>{salary}</strong></div>
              </article>
            ))}
          </div>
        </section>

        <div className="jobs-dialog-footer">
          <p><ShieldCheck aria-hidden="true" />{labels.disclaimer}</p>
          <DialogClose
            render={
              <a
                className="button button-primary jobs-dialog-cta"
                href="#consultation"
                aria-label={labels.cta}
              />
            }
          >
            {labels.cta}<ArrowUpRight aria-hidden="true" />
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
