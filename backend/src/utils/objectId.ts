import { Response } from 'express';
import { ObjectId } from 'mongodb';

export function parseObjectId(id: string, res: Response): ObjectId | null {
  if (!ObjectId.isValid(id)) {
    res.status(400).json({ success: false, message: 'Invalid ID format.' });
    return null;
  }
  return new ObjectId(id);
}
