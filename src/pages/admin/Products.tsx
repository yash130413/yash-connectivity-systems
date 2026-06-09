import { useEffect, useState, useCallback } from 'react';
import { Plus, Search, Pencil, Trash2, AlertTriangle, Star, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { fetchProducts, deleteProduct, PRODUCT_CATEGORIES, type Product } from '@/lib/admin/auth';
import ProductFormModal from '@/components/admin/ProductFormModal';
import { getProductImage } from '@/lib/api/products.functions';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const PAGE_SIZE = 12;

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchProducts({ category: category || undefined, search: search || undefined, page });
      setProducts(data.products);
      setTotal(data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [category, search, page]);

  useEffect(() => {
    const t = setTimeout(load, search ? 400 : 0);
    return () => clearTimeout(t);
  }, [load, search]);

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteProduct(deleteTarget._id);
      setDeleteTarget(null);
      load();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  }

  function openAdd() { setEditProduct(null); setShowModal(true); }
  function openEdit(p: Product) { setEditProduct(p); setShowModal(true); }
  function onSaved() { setShowModal(false); load(); }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Products</h1>
          <p className="text-sm text-muted-foreground mt-1">{total} total products</p>
        </div>
        <button onClick={openAdd} className="btn-primary gap-2">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search products..."
            className="input-field pl-9"
          />
        </div>
        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); setPage(1); }}
          className="input-field w-auto"
        >
          <option value="">All Categories</option>
          {PRODUCT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="skeleton h-44 w-full" />
              <div className="p-4 space-y-2">
                <div className="skeleton h-4 w-3/4 rounded" />
                <div className="skeleton h-3 w-1/2 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-16 text-center">
          <p className="text-muted-foreground text-sm">No products found</p>
          <button onClick={openAdd} className="btn-primary mt-4 gap-2">
            <Plus className="h-4 w-4" /> Add First Product
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div key={p._id} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm group">
              {/* Image */}
              <div className="relative h-44 bg-muted overflow-hidden">
                {p.imageUrl ? (
                  <img src={getProductImage(p.imageUrl)} alt={p.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-muted-foreground text-xs">No Image</div>
                )}
                {/* Badges */}
                <div className="absolute top-2 left-2 flex gap-1.5">
                  {p.featured && (
                    <span className="flex items-center gap-1 bg-accent-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      <Star className="h-2.5 w-2.5" /> Featured
                    </span>
                  )}
                  {!p.active && (
                    <span className="bg-muted text-muted-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Inactive
                    </span>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{p.category}</p>
                <h3 className="font-display font-bold text-foreground mt-0.5 truncate">{p.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{p.description}</p>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={() => openEdit(p)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-border text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => setDeleteTarget(p)}
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-destructive/30 text-xs font-semibold text-destructive hover:bg-destructive/5 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-muted disabled:opacity-40 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`h-9 w-9 rounded-lg text-sm font-semibold transition-colors ${
                page === n ? 'bg-primary text-primary-foreground' : 'border border-border hover:bg-muted text-foreground'
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-muted disabled:opacity-40 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Product Form Modal */}
      {showModal && (
        <ProductFormModal
          product={editProduct}
          onClose={() => setShowModal(false)}
          onSaved={onSaved}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl w-full max-w-sm p-6 shadow-[var(--shadow-elevated)] animate-fade-up">
            <div className="flex items-center gap-3 mb-4">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-destructive/10 text-destructive">
                <AlertTriangle className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display font-bold text-foreground">Delete Product</h3>
                <p className="text-xs text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to delete <strong className="text-foreground">"{deleteTarget.name}"</strong>?
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="btn-ghost flex-1">Cancel</button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-destructive text-destructive-foreground font-semibold text-sm hover:opacity-90 disabled:opacity-60 transition-opacity"
              >
                {deleting ? <><Loader2 className="h-4 w-4 animate-spin" /> Deleting…</> : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

