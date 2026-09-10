import { describe, expect, it } from 'vitest';

import { siteCopy } from './site-copy';

describe('siteCopy', () => {
  it('contains equivalent Russian and Kazakh landing sections', () => {
    expect(siteCopy.ru.hero.title).toContain('географию');
    expect(siteCopy.kk.hero.title).toContain('географиясын');
    expect(siteCopy.ru.directions.cards).toHaveLength(7);
    expect(siteCopy.kk.directions.cards).toHaveLength(7);
    expect(siteCopy.kk.visa.title).toContain('Визалық');
    expect(siteCopy.kk.form.submit).toBe('Кеңес алу');
  });
});
