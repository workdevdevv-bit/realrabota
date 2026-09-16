import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const staticExport = resolve(projectRoot, 'dist', 'client');
const documentRoot = resolve(projectRoot, 'httpdocs');

if (!existsSync(resolve(staticExport, 'index.html'))) {
  throw new Error('Static export is missing dist/client/index.html. Run npm run build first.');
}

rmSync(documentRoot, { force: true, recursive: true });
mkdirSync(documentRoot, { recursive: true });
cpSync(staticExport, documentRoot, { recursive: true });
cpSync(resolve(projectRoot, 'public', '.htaccess'), resolve(documentRoot, '.htaccess'));

console.log('Hoster.kz package is ready in httpdocs/');
