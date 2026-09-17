import { existsSync, readFileSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

import { describe, expect, it } from 'vitest';

const projectRoot = resolve(import.meta.dirname, '..');
const documentRoot = resolve(projectRoot, 'httpdocs');

describe('Hoster.kz static build', () => {
  it('produces a self-contained document root without a Node.js server', () => {
    rmSync(documentRoot, { force: true, recursive: true });

    const build = spawnSync('npm', ['run', 'build:hoster'], {
      cwd: projectRoot,
      encoding: 'utf8',
    });

    expect(build.status, `${build.stdout}\n${build.stderr}`).toBe(0);
    expect(existsSync(resolve(documentRoot, 'index.html'))).toBe(true);
    expect(existsSync(resolve(documentRoot, '.htaccess'))).toBe(true);
    expect(existsSync(resolve(documentRoot, 'server'))).toBe(false);

    const html = readFileSync(resolve(documentRoot, 'index.html'), 'utf8');
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('Real Rabota');
    expect(html).toMatch(/_next\/static\/[^"']+\.js/);

    const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1];
    expect(head).toBeDefined();
    expect(head?.match(/googletagmanager\.com\/gtag\/js\?id=G-14Y2CNFXE0/g)).toHaveLength(1);
    expect(head?.match(/gtag\('config', 'G-14Y2CNFXE0'\)/g)).toHaveLength(1);
  }, 30_000);
});
