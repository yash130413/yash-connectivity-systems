import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { BSONError } from 'bson';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
  }
}

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({ success: false, message: 'Route not found.' });
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof multer.MulterError) {
    const message =
      err.code === 'LIMIT_FILE_SIZE'
        ? 'File too large. Maximum size is 5 MB.'
        : err.message;
    res.status(400).json({ success: false, message });
    return;
  }

  if (err instanceof Error && err.message === 'Only jpg, jpeg, png and webp images are allowed') {
    res.status(400).json({ success: false, message: err.message });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({ success: false, message: err.message });
    return;
  }

  if (err instanceof BSONError) {
    res.status(400).json({ success: false, message: 'Invalid ID format.' });
    return;
  }

  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Internal server error.' });
}
