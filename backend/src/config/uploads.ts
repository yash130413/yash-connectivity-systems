import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Absolute path to backend/uploads (stable regardless of process.cwd()). */
export const UPLOAD_DIR = path.resolve(__dirname, '../../uploads');

export function ensureUploadDir(): void {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

export function getUploadFilePath(imageUrl: string): string {
  return path.join(UPLOAD_DIR, path.basename(imageUrl));
}
