import { Db } from 'mongodb';

export async function ensureIndexes(db: Db): Promise<void> {
  await Promise.all([
    db.collection('leads').createIndex({ createdAt: -1 }),
    db.collection('products').createIndex({ slug: 1 }, { unique: true }),
    db.collection('admins').createIndex({ email: 1 }, { unique: true }),
  ]);
  console.log('✅ Database indexes ensured');
}
