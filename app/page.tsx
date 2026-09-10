'use client';

import {
  ArrowRight, ArrowUpRight, BriefcaseBusiness, Check, CircleCheck,
  ClipboardCheck, Compass, FileCheck2, FileText, Headphones, Mail, MapPin,
  MessageCircle, Plane, SearchCheck, ShieldCheck, Sparkles, Stamp, UserRoundCheck,
} from 'lucide-react';

import {
  ConsultationForm, FaqAccordion, LanguageSwitcher, MobileConsultationCta,
} from '@/components/site/interactive';
import { useLocale } from '@/components/site/use-locale';
import { siteCopy, type SiteCopy } from '@/lib/site-copy';

/* oxlint-disable next/no-img-element -- generated website artwork is pre-optimized WebP */

const benefitIcons = [ShieldCheck, SearchCheck, Headphones];
const processIcons = [MessageCircle, Compass, FileCheck2, Stamp, BriefcaseBusiness];
const visaIcons = [UserRoundCheck, ClipboardCheck, FileText, Plane];

const directionVisuals: Record<string, { image: string; flag: string; className: string }> = {
  europe: { image: '/destination-europe.webp', flag: '/flags/eu.svg', className: 'direction-card-europe' },
  poland: { image: '/destination-poland.webp', flag: '/flags/poland.svg', className: 'direction-card-poland' },
  lithuania: { image: '/destination-lithuania.webp', flag: '/flags/lithuania.svg', className: 'direction-card-lithuania' },
  latvia: { image: '/destination-latvia.webp', flag: '/flags/latvia.svg', className: 'direction-card-latvia' },
  estonia: { image: '/destination-estonia.webp', flag: '/flags/estonia.svg', className: 'direction-card-estonia' },
  usa: { image: '/destination-usa.webp', flag: '/flags/usa.svg', className: 'direction-card-usa' },
  canada: { image: '/destination-canada.webp', flag: '/flags/canada.svg', className: 'direction-card-canada' },
};

function AccentTitle({ title, accent }: { title: string; accent: string }) {
  const [before, after = ''] = title.split(accent);
  return <>{before}<span>{accent}</span>{after}</>;
}

export default function Home() {
  const { locale, setLocale } = useLocale();
  const copy: SiteCopy = siteCopy[locale];

  return (
    <main>
      <section className="hero-shell">
        <div className="hero-grid" aria-hidden="true" />
        <header className="site-header container">
          <a className="brand" href="#top" aria-label={copy.header.homeLabel}>
            <span className="brand-mark">R</span><span>Real Rabota</span>
          </a>
          <nav className="desktop-nav" aria-label={copy.header.navigationLabel}>
            {copy.header.navigation.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </nav>
          <div className="header-actions">
            <LanguageSwitcher locale={locale} label={copy.header.languageLabel} onChange={setLocale} />
            <a className="header-cta" href="#consultation">{copy.header.consultation}<ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </header>

        <div className="hero container" id="top">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" />{copy.hero.eyebrow}</p>
            <h1><AccentTitle title={copy.hero.title} accent={copy.hero.accent} /></h1>
            <p className="hero-lead">{copy.hero.lead}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#consultation">{copy.hero.primary}<span className="button-icon"><ArrowUpRight size={17} aria-hidden="true" /></span></a>
              <a className="text-link" href="#directions">{copy.hero.secondary}<ArrowRight size={17} aria-hidden="true" /></a>
            </div>
            <div className="hero-proof">
              <span className="proof-icon"><ShieldCheck size={20} aria-hidden="true" /></span>
              <p><strong>{copy.hero.proofTitle}</strong><span>{copy.hero.proofText}</span></p>
            </div>
          </div>

          <div className="hero-visual" data-testid="hero-art">
            <div className="hero-halo" aria-hidden="true" />
            <img src="/hero-globe.webp" width="1200" height="800" alt="" aria-hidden="true" fetchPriority="high" />
            <article className="floating-card floating-card-top">
              <span className="floating-icon"><BriefcaseBusiness size={16} aria-hidden="true" /></span>
              <div><strong>{copy.hero.europe}</strong><span>{copy.hero.europeText}</span></div><ArrowUpRight size={15} aria-hidden="true" />
            </article>
            <article className="floating-card floating-card-bottom">
              <span className="floating-icon floating-icon-accent"><Sparkles size={16} aria-hidden="true" /></span>
              <div><strong>{copy.hero.americas}</strong><span>{copy.hero.americasText}</span></div><ArrowUpRight size={15} aria-hidden="true" />
            </article>
          </div>
        </div>

        <div className="consultation-card container" id="consultation">
          <div className="consultation-copy"><span>{copy.hero.formKicker}</span><h2>{copy.hero.formTitle}</h2></div>
          <ConsultationForm copy={copy.form} />
        </div>
      </section>

      <section className="section why-section">
        <div className="container">
          <div className="section-heading split-heading">
            <div><p className="section-kicker">{copy.why.kicker}</p><h2>{copy.why.title}</h2></div><p>{copy.why.lead}</p>
          </div>
          <div className="journey-showcase">
            <div className="journey-showcase-copy"><span>{copy.why.journeyKicker}</span><strong>{copy.why.journeyTitle}</strong></div>
            <img src="/journey-3d.webp" width="1184" height="1200" loading="lazy" decoding="async" alt={copy.why.journeyAlt} />
          </div>
          <div className="benefit-grid">
            {copy.why.benefits.map(([title, text], index) => {
              const Icon = benefitIcons[index];
              return <article className="benefit-card" key={title}><span className="card-index">0{index + 1}</span><span className="feature-icon"><Icon aria-hidden="true" /></span><h3>{title}</h3><p>{text}</p></article>;
            })}
          </div>
          <div className="trust-line"><CircleCheck aria-hidden="true" /><span>{copy.why.trustOne}</span><span className="trust-line-rule" /><span>{copy.why.trustTwo}</span></div>
        </div>
      </section>

      <section className="section directions-section" id="directions">
        <div className="container">
          <div className="section-heading light-heading"><p className="section-kicker">{copy.directions.kicker}</p><h2>{copy.directions.title}</h2><p>{copy.directions.lead}</p></div>
          <div className="direction-grid">
            {copy.directions.cards.map((direction) => {
              const visual = directionVisuals[direction.id];
              return (
                <article className={`direction-card ${visual.className}`} key={direction.id}>
                  <div className="direction-media">
                    <img src={visual.image} width="1200" height="800" loading="lazy" decoding="async" alt={direction.imageAlt} />
                    <div className="direction-card-top"><span className="direction-flag"><img src={visual.flag} width="34" height="24" alt="" aria-hidden="true" /></span><ArrowUpRight aria-hidden="true" /></div>
                  </div>
                  <div className="direction-copy"><h3>{direction.label}</h3><p>{direction.text}</p><div className="tag-row">{direction.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
                </article>
              );
            })}
          </div>
          <a className="section-link light-link" href="#consultation">{copy.directions.cta}<ArrowRight aria-hidden="true" /></a>
        </div>
      </section>

      <section className="section process-section" id="process">
        <div className="container">
          <div className="section-heading centered-heading"><p className="section-kicker">{copy.process.kicker}</p><h2>{copy.process.title}</h2><p>{copy.process.lead}</p></div>
          <div className="process-track">
            {copy.process.steps.map(([number, title, text], index) => {
              const Icon = processIcons[index];
              return <article className="process-step" key={number}><span className="process-number">{number}</span><span className="process-icon"><Icon aria-hidden="true" /></span><h3>{title}</h3><p>{text}</p></article>;
            })}
          </div>
        </div>
      </section>

      <section className="section programs-section" id="programs">
        <div className="container">
          <div className="section-heading split-heading"><div><p className="section-kicker">{copy.programs.kicker}</p><h2>{copy.programs.title}</h2></div><p>{copy.programs.lead}</p></div>
          <div className="program-grid">
            {copy.programs.cards.map(([region, title, text, items], index) => (
              <article className={`program-card ${index === 1 ? 'program-card-featured' : ''}`} key={region}>
                <div className="program-meta"><span>{region}</span>{index === 1 ? <span className="program-badge">{copy.programs.featured}</span> : null}</div>
                <h3>{title}</h3><p>{text}</p><ul>{items.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
                <a href="#consultation">{copy.programs.details}<ArrowUpRight aria-hidden="true" /></a>
              </article>
            ))}
          </div>
          <p className="program-note"><ShieldCheck aria-hidden="true" />{copy.programs.note}</p>
        </div>
      </section>

      <section className="section support-section">
        <div className="container support-grid">
          <div className="support-copy">
            <p className="section-kicker">{copy.visa.kicker}</p><h2>{copy.visa.title}</h2><p>{copy.visa.lead}</p>
            <div className="visa-support-note"><ShieldCheck aria-hidden="true" /><span>{copy.visa.note}</span></div>
            <a className="button button-primary" href="#consultation">{copy.visa.cta}<ArrowUpRight aria-hidden="true" /></a>
          </div>
          <div className="support-panel visa-panel">
            <figure className="visa-photo"><img src="/visa-support.webp" width="1200" height="800" loading="lazy" decoding="async" alt={copy.visa.imageAlt} /><figcaption><ShieldCheck aria-hidden="true" />{copy.visa.imageCaption}</figcaption></figure>
            <div className="visa-panel-heading"><div><span>{copy.visa.panelKicker}</span><strong>{copy.visa.panelTitle}</strong></div><span className="visa-stamp"><Stamp aria-hidden="true" /></span></div>
            {copy.visa.steps.map(([number, label, text], index) => {
              const Icon = visaIcons[index];
              return <article className="support-row" key={label}><span className="support-icon"><Icon aria-hidden="true" /></span><div><span className="visa-row-label"><small>{number}</small><span>{label}</span></span><strong>{text}</strong></div><CircleCheck aria-hidden="true" /></article>;
            })}
            <div className="visa-disclaimer"><ShieldCheck aria-hidden="true" /><div><strong>{copy.visa.disclaimerTitle}</strong><span>{copy.visa.disclaimer}</span></div></div>
          </div>
        </div>
      </section>

      <section className="section stories-section">
        <div className="container stories-grid">
          <div className="stories-visual">
            <img src="/client-stories.webp" width="1200" height="800" loading="lazy" decoding="async" alt={copy.stories.imageAlt} /><div className="stories-visual-shade" aria-hidden="true" />
            <span className="story-point story-point-one">{copy.stories.points[0]}</span><span className="story-point story-point-two">{copy.stories.points[1]}</span><span className="story-point story-point-three">{copy.stories.points[2]}</span>
          </div>
          <div className="stories-copy">
            <p className="section-kicker">{copy.stories.kicker}</p><h2>{copy.stories.title}</h2><p className="stories-lead">{copy.stories.lead}</p>
            <div className="story-topics">{copy.stories.topics.map((topic) => <span key={topic}>{topic}</span>)}</div>
            <a className="section-link" href="#consultation">{copy.stories.cta}<ArrowRight aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="container faq-grid">
          <div className="section-heading faq-heading"><p className="section-kicker">{copy.faq.kicker}</p><h2>{copy.faq.title}</h2><p>{copy.faq.lead}</p><a className="section-link" href="#consultation">{copy.faq.cta}<ArrowRight aria-hidden="true" /></a></div>
          <FaqAccordion questions={copy.faq.questions} />
        </div>
      </section>

      <section className="final-section" id="final-consultation">
        <div className="final-glow" aria-hidden="true" />
        <div className="container final-grid">
          <div className="final-copy">
            <p className="section-kicker">{copy.final.kicker}</p><h2>{copy.final.title}</h2><p>{copy.final.lead}</p>
            <div className="contact-list">
              <a href="tel:+77071101533"><MessageCircle aria-hidden="true" /><span>+7 707 110 15 33</span></a><a href="tel:+77475361219"><MessageCircle aria-hidden="true" /><span>+7 747 536 12 19</span></a>
              <a href="mailto:realrabota77@gmail.com"><Mail aria-hidden="true" /><span>realrabota77@gmail.com</span></a><span><MapPin aria-hidden="true" /><span>{copy.final.address}</span></span>
            </div>
          </div>
          <div className="final-form-card"><span className="final-form-label">{copy.form.finalLabel}</span><ConsultationForm variant="light" copy={copy.form} /></div>
        </div>
        <footer className="site-footer container"><a className="brand footer-brand" href="#top"><span className="brand-mark">R</span><span>Real Rabota</span></a><p>{copy.final.footer}</p><span>© 2026 Real Rabota</span></footer>
      </section>

      <MobileConsultationCta label={copy.form.submit} ariaLabel={copy.form.mobileLabel} />
    </main>
  );
}
