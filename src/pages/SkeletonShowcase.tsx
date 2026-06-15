import { 
  SkeletonBox, 
  SkeletonText, 
  SkeletonCard, 
  SkeletonProductCard, 
  SkeletonBlogCard,
  SkeletonTestimonial,
  SkeletonHero,
  SkeletonForm,
  SkeletonTable,
  SkeletonClientCard,
  SkeletonIndustryCard,
  SkeletonStats,
  SkeletonPageContent
} from '@/components/ui/skeleton';
import { LoadingSpinner, LoadingSection, LoadingOverlay } from '@/components/ui/Loading';
import { useState } from 'react';

export default function SkeletonShowcase() {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container-page space-y-16">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold">Skeleton Loaders Showcase</h1>
          <p className="mt-3 text-muted-foreground">All loading states used across the website</p>
        </div>

        {/* Loading Spinners */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-6">Loading Spinners</h2>
          <div className="card-surface p-8 flex items-center gap-8">
            <div className="text-center">
              <LoadingSpinner size="sm" />
              <p className="mt-2 text-xs text-muted-foreground">Small</p>
            </div>
            <div className="text-center">
              <LoadingSpinner size="md" />
              <p className="mt-2 text-xs text-muted-foreground">Medium</p>
            </div>
            <div className="text-center">
              <LoadingSpinner size="lg" />
              <p className="mt-2 text-xs text-muted-foreground">Large</p>
            </div>
          </div>
        </section>

        {/* Product Cards */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-6">Product Cards</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <SkeletonProductCard />
            <SkeletonProductCard />
            <SkeletonProductCard />
          </div>
        </section>

        {/* Blog Cards */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-6">Blog Cards</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <SkeletonBlogCard />
            <SkeletonBlogCard />
            <SkeletonBlogCard />
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-6">Testimonials</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            <SkeletonTestimonial />
            <SkeletonTestimonial />
            <SkeletonTestimonial />
          </div>
        </section>

        {/* Hero Section */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-6">Hero Section</h2>
          <div className="card-surface">
            <SkeletonHero />
          </div>
        </section>

        {/* Form */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-6">Form</h2>
          <div className="card-surface p-8 max-w-2xl">
            <SkeletonForm />
          </div>
        </section>

        {/* Stats */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-6">Stats</h2>
          <div className="card-surface p-8">
            <SkeletonStats />
          </div>
        </section>

        {/* Client Cards */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-6">Client Cards</h2>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            <SkeletonClientCard />
            <SkeletonClientCard />
            <SkeletonClientCard />
            <SkeletonClientCard />
          </div>
        </section>

        {/* Industry Cards */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-6">Industry Cards</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <SkeletonIndustryCard />
            <SkeletonIndustryCard />
            <SkeletonIndustryCard />
          </div>
        </section>

        {/* Text Skeletons */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-6">Text Skeletons</h2>
          <div className="card-surface p-8 space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Single Line</p>
              <SkeletonText lines={1} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Multiple Lines</p>
              <SkeletonText lines={3} />
            </div>
          </div>
        </section>

        {/* Table */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-6">Table</h2>
          <div className="card-surface p-8">
            <SkeletonTable />
          </div>
        </section>

        {/* Loading Section */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-6">Loading Section</h2>
          <div className="card-surface">
            <LoadingSection />
          </div>
        </section>

        {/* Loading Overlay */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-6">Loading Overlay</h2>
          <div className="card-surface p-8">
            <button 
              onClick={() => setShowOverlay(true)}
              className="btn-primary"
            >
              Show Loading Overlay
            </button>
            {showOverlay && (
              <div className="relative">
                <LoadingOverlay message="Processing your request..." />
                <button 
                  onClick={() => setShowOverlay(false)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] btn-ghost"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
