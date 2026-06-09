const LOCALHOST_ORIGIN_PATTERN = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i;

export function validateEnv(): void {
  const errors: string[] = [];

  if (!process.env.MONGODB_URI) {
    errors.push('MONGODB_URI is required');
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    errors.push('JWT_SECRET is required');
  } else if (jwtSecret.length < 32) {
    errors.push('JWT_SECRET must be at least 32 characters');
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const corsOrigin = process.env.CORS_ORIGIN;

  if (isProduction) {
    if (!corsOrigin) {
      errors.push('CORS_ORIGIN is required when NODE_ENV=production');
    } else if (LOCALHOST_ORIGIN_PATTERN.test(corsOrigin)) {
      errors.push('CORS_ORIGIN must not be a localhost URL when NODE_ENV=production');
    }
  }

  if (errors.length > 0) {
    throw new Error(`Environment validation failed:\n  - ${errors.join('\n  - ')}`);
  }
}

export function getCorsOrigin(): string {
  return process.env.CORS_ORIGIN || 'http://localhost:5173';
}

export function isAdminSeedAllowed(): boolean {
  return process.env.ALLOW_ADMIN_SEED === 'true';
}

export function shouldTrustProxy(): boolean {
  return process.env.NODE_ENV === 'production' || process.env.TRUST_PROXY === 'true';
}
