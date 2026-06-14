import { Router, Request, Response } from 'express';
import { getDatabase } from '../db/connection.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import { Product, generateSlug } from '../models/Product.js';
import { parsePagination } from '../utils/pagination.js';
import { parseObjectId } from '../utils/objectId.js';
import fs from 'fs';
import { getUploadFilePath } from '../config/uploads.js';

const router = Router();

// GET /api/products - public
router.get('/', async (req: Request, res: Response) => {
  try {
    const db = getDatabase();
    const { category, search, page, limit, active } = req.query;
    const { page: pageNum, limit: limitNum, skip } = parsePagination(
      page as string | undefined,
      limit as string | undefined,
    );

    const filter: Record<string, unknown> = {};
    if (category && typeof category === 'string') filter.category = category;
    if (active !== undefined) filter.active = active === 'true';
    if (search && typeof search === 'string') {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const [products, total] = await Promise.all([
      db.collection('products')
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .toArray(),
      db.collection('products').countDocuments(filter),
    ]);

    res.json({ success: true, products, total, page: pageNum });
  } catch (error) {
    console.error('Fetch products error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch products.' });
  }
});

// All routes below are protected
router.use(authMiddleware);

// POST /api/products
router.post('/', upload.single('image'), async (req: AuthRequest, res: Response) => {
  try {
    const db = getDatabase();
    const { name, category, description, short, featured, active } = req.body;

    if (!name || !category || !description) {
      res.status(400).json({ success: false, message: 'Name, category and description are required.' });
      return;
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const slug = generateSlug(name);

    const product: Product = {
      name: name.trim(),
      slug,
      category,
      short: short?.trim() ?? '',
      description: description.trim(),
      imageUrl,
      specs: JSON.parse(req.body.specs || '[]'),
      applications: JSON.parse(req.body.applications || '[]'),
      industries: JSON.parse(req.body.industries || '[]'),
      benefits: JSON.parse(req.body.benefits || '[]'),
      featured: featured === 'true',
      active: active !== 'false',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('products').insertOne(product);
    console.log('✅ Product created');
    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ success: false, message: 'Failed to create product.' });
  }
});

// PUT /api/products/:id
router.put('/:id', upload.single('image'), async (req: AuthRequest, res: Response) => {
  const objectId = parseObjectId(req.params.id, res);
  if (!objectId) return;

  try {
    const db = getDatabase();
    const { name, category, description, short, featured, active } = req.body;

    const existing = await db.collection('products').findOne({ _id: objectId });
    if (!existing) {
      res.status(404).json({ success: false, message: 'Product not found.' });
      return;
    }

    let imageUrl = existing.imageUrl as string;
    if (req.file) {
      if (imageUrl) {
        const oldPath = getUploadFilePath(imageUrl);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const updates: Partial<Product> = {
      ...(name && { name: name.trim(), slug: generateSlug(name) }),
      ...(category && { category }),
      ...(description && { description: description.trim() }),
      ...(short !== undefined && { short: short.trim() }),
      ...(req.body.specs !== undefined && { specs: JSON.parse(req.body.specs) }),
      ...(req.body.applications !== undefined && { applications: JSON.parse(req.body.applications) }),
      ...(req.body.industries !== undefined && { industries: JSON.parse(req.body.industries) }),
      ...(req.body.benefits !== undefined && { benefits: JSON.parse(req.body.benefits) }),
      imageUrl,
      featured: featured === 'true',
      active: active !== 'false',
      updatedAt: new Date(),
    };

    await db.collection('products').updateOne(
      { _id: objectId },
      { $set: updates }
    );

    console.log('✅ Product updated');
    res.json({ success: true, message: 'Product updated.' });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ success: false, message: 'Failed to update product.' });
  }
});

// DELETE /api/products/:id
router.delete('/:id', async (req: AuthRequest, res: Response) => {
  const objectId = parseObjectId(req.params.id, res);
  if (!objectId) return;

  try {
    const db = getDatabase();
    const product = await db.collection('products').findOne({ _id: objectId });

    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found.' });
      return;
    }

    // Delete image file
    if (product.imageUrl) {
      const imgPath = getUploadFilePath(product.imageUrl as string);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await db.collection('products').deleteOne({ _id: objectId });
    console.log('✅ Product deleted');
    res.json({ success: true, message: 'Product deleted.' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete product.' });
  }
});

export default router;
