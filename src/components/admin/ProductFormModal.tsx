import { useState, useRef, type FormEvent } from 'react';
import { X, Loader2, ImageIcon, Plus, Trash2 } from 'lucide-react';
import { createProduct, updateProduct, PRODUCT_CATEGORIES, type Product } from '@/lib/admin/auth';
import { getProductImage } from '@/lib/api/products.functions';

interface Props {
  product?: Product | null;
  onClose: () => void;
  onSaved: () => void;
}

type Spec = { label: string; value: string };

export default function ProductFormModal({ product, onClose, onSaved }: Props) {
  const isEdit = !!product;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<string>(product?.imageUrl ? getProductImage(product.imageUrl) : '');
  const fileRef = useRef<HTMLInputElement>(null);

  const [specs, setSpecs] = useState<Spec[]>(product?.specs ?? [{ label: '', value: '' }]);
  const [applications, setApplications] = useState<string[]>(product?.applications ?? ['']);
  const [industries, setIndustries] = useState<string[]>(product?.industries ?? ['']);
  const [benefits, setBenefits] = useState<string[]>(product?.benefits ?? ['']);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const fd = new FormData(e.currentTarget);
    fd.set('featured', String((e.currentTarget.elements.namedItem('featured') as HTMLInputElement).checked));
    fd.set('active', String((e.currentTarget.elements.namedItem('active') as HTMLInputElement).checked));
    fd.set('specs', JSON.stringify(specs.filter(s => s.label && s.value)));
    fd.set('applications', JSON.stringify(applications.filter(Boolean)));
    fd.set('industries', JSON.stringify(industries.filter(Boolean)));
    fd.set('benefits', JSON.stringify(benefits.filter(Boolean)));

    try {
      if (isEdit) await updateProduct(product._id, fd);
      else await createProduct(fd);
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  const label = 'text-xs font-semibold uppercase tracking-wider text-muted-foreground';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-[var(--shadow-elevated)] animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-card z-10">
          <h2 className="font-display font-bold text-foreground">{isEdit ? 'Edit Product' : 'Add Product'}</h2>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-muted transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-5">
          {error && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</div>
          )}

          {/* Name */}
          <div>
            <label className={label}>Product Name *</label>
            <input name="name" required defaultValue={product?.name} className="input-field mt-1.5" placeholder="e.g. Barcode Labels" disabled={loading} />
          </div>

          {/* Category */}
          <div>
            <label className={label}>Category *</label>
            <select name="category" required defaultValue={product?.category ?? ''} className="input-field mt-1.5" disabled={loading}>
              <option value="" disabled>Select category</option>
              {PRODUCT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Short Description */}
          <div>
            <label className={label}>Short Description</label>
            <input name="short" defaultValue={product?.short} className="input-field mt-1.5" placeholder="One-line summary shown on product cards" disabled={loading} />
          </div>

          {/* Full Description */}
          <div>
            <label className={label}>Full Description *</label>
            <textarea name="description" required rows={3} defaultValue={product?.description} className="input-field mt-1.5 resize-none" placeholder="Detailed product description..." disabled={loading} />
          </div>

          {/* Image Upload */}
          <div>
            <label className={label}>Product Image</label>
            <div
              className="mt-1.5 border-2 border-dashed border-border rounded-xl p-4 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
              onClick={() => fileRef.current?.click()}
            >
              {preview ? (
                <div>
                  <img src={preview} alt="Preview" className="mx-auto h-36 w-full object-cover rounded-lg" />
                  <p className="text-xs text-muted-foreground mt-2">Click to change image</p>
                </div>
              ) : (
                <div className="py-4">
                  <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload image</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">JPG, PNG, WebP — max 5MB</p>
                </div>
              )}
            </div>
            <input ref={fileRef} name="image" type="file" accept=".jpg,.jpeg,.png,.webp" onChange={handleFileChange} className="hidden" />
          </div>

          {/* Specs */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className={label}>Technical Specifications</label>
              <button type="button" onClick={() => setSpecs([...specs, { label: '', value: '' }])} className="flex items-center gap-1 text-xs text-primary hover:text-accent-orange">
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            <div className="space-y-2">
              {specs.map((spec, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input value={spec.label} onChange={(e) => { const s = [...specs]; s[i].label = e.target.value; setSpecs(s); }} placeholder="Label (e.g. Material)" className="input-field flex-1" disabled={loading} />
                  <input value={spec.value} onChange={(e) => { const s = [...specs]; s[i].value = e.target.value; setSpecs(s); }} placeholder="Value (e.g. Nylon 6/6)" className="input-field flex-1" disabled={loading} />
                  <button type="button" onClick={() => setSpecs(specs.filter((_, j) => j !== i))} className="text-destructive hover:opacity-70">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Applications */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className={label}>Common Applications</label>
              <button type="button" onClick={() => setApplications([...applications, ''])} className="flex items-center gap-1 text-xs text-primary hover:text-accent-orange">
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            <div className="space-y-2">
              {applications.map((app, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input value={app} onChange={(e) => { const a = [...applications]; a[i] = e.target.value; setApplications(a); }} placeholder="e.g. Carton labeling" className="input-field flex-1" disabled={loading} />
                  <button type="button" onClick={() => setApplications(applications.filter((_, j) => j !== i))} className="text-destructive hover:opacity-70">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Industries */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className={label}>Industries Served</label>
              <button type="button" onClick={() => setIndustries([...industries, ''])} className="flex items-center gap-1 text-xs text-primary hover:text-accent-orange">
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            <div className="space-y-2">
              {industries.map((ind, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input value={ind} onChange={(e) => { const a = [...industries]; a[i] = e.target.value; setIndustries(a); }} placeholder="e.g. Automotive" className="input-field flex-1" disabled={loading} />
                  <button type="button" onClick={() => setIndustries(industries.filter((_, j) => j !== i))} className="text-destructive hover:opacity-70">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className={label}>Key Benefits</label>
              <button type="button" onClick={() => setBenefits([...benefits, ''])} className="flex items-center gap-1 text-xs text-primary hover:text-accent-orange">
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            <div className="space-y-2">
              {benefits.map((ben, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input value={ben} onChange={(e) => { const a = [...benefits]; a[i] = e.target.value; setBenefits(a); }} placeholder="e.g. UV & weather resistant" className="input-field flex-1" disabled={loading} />
                  <button type="button" onClick={() => setBenefits(benefits.filter((_, j) => j !== i))} className="text-destructive hover:opacity-70">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input name="featured" type="checkbox" defaultChecked={product?.featured ?? false} className="h-4 w-4 rounded border-border accent-primary" disabled={loading} />
              <span className="text-sm font-medium text-foreground">Featured Product</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input name="active" type="checkbox" defaultChecked={product?.active ?? true} className="h-4 w-4 rounded border-border accent-primary" disabled={loading} />
              <span className="text-sm font-medium text-foreground">Active</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-ghost flex-1">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 disabled:opacity-70">
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</> : isEdit ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
