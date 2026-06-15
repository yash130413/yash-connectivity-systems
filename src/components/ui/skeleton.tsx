// Base Skeleton component (used by shadcn sidebar and other UI components)
export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton ${className}`} />;
}

export function SkeletonBox({ className = "" }: { className?: string }) {
  return <div className={`skeleton ${className}`} />;
}

export function SkeletonText({ className = "", lines = 1 }: { className?: string; lines?: number }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="skeleton h-4 rounded" style={{ width: `${100 - i * 10}%` }} />
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="card-surface overflow-hidden animate-pulse">
      <div className="skeleton aspect-[5/3] w-full" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-6 w-3/4 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-5/6 rounded" />
        <div className="skeleton h-4 w-1/3 rounded mt-4" />
      </div>
    </div>
  );
}

export function SkeletonProductCard() {
  return (
    <div className="card-surface overflow-hidden animate-pulse">
      <div className="skeleton aspect-[5/3] w-full" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-6 w-2/3 rounded" />
        <div className="space-y-2">
          <div className="skeleton h-3 w-full rounded" />
          <div className="skeleton h-3 w-4/5 rounded" />
        </div>
        <div className="skeleton h-4 w-24 rounded mt-4" />
      </div>
    </div>
  );
}

export function SkeletonBlogCard() {
  return (
    <div className="card-surface rounded-2xl p-6 animate-pulse">
      <div className="skeleton h-6 w-20 rounded-full" />
      <div className="skeleton h-6 w-full rounded mt-4" />
      <div className="space-y-2 mt-3">
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-3/4 rounded" />
      </div>
      <div className="flex items-center justify-between mt-6">
        <div className="skeleton h-3 w-16 rounded" />
        <div className="skeleton h-4 w-12 rounded" />
      </div>
    </div>
  );
}

export function SkeletonTestimonial() {
  return (
    <div className="card-surface p-7 animate-pulse">
      <div className="skeleton h-8 w-8 rounded" />
      <div className="space-y-2 mt-4">
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-3/4 rounded" />
      </div>
      <div className="pt-4 border-t border-border mt-6 space-y-2">
        <div className="skeleton h-4 w-32 rounded" />
        <div className="skeleton h-3 w-24 rounded" />
      </div>
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="container-page py-16 md:py-24 animate-pulse">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <div className="skeleton h-6 w-32 rounded-full mx-auto" />
        <div className="skeleton h-12 w-full rounded mx-auto" />
        <div className="skeleton h-12 w-4/5 rounded mx-auto" />
        <div className="space-y-2 mt-6">
          <div className="skeleton h-4 w-3/4 rounded mx-auto" />
          <div className="skeleton h-4 w-2/3 rounded mx-auto" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonForm() {
  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i}>
          <div className="skeleton h-3 w-24 rounded mb-2" />
          <div className="skeleton h-11 w-full rounded" />
        </div>
      ))}
      <div className="skeleton h-11 w-32 rounded mt-6" />
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <div className="skeleton h-10 w-1/3 rounded" />
          <div className="skeleton h-10 flex-1 rounded" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonClientCard() {
  return (
    <div className="card-surface flex h-24 items-center justify-center rounded-xl px-6 animate-pulse">
      <div className="skeleton h-6 w-24 rounded" />
    </div>
  );
}

export function SkeletonIndustryCard() {
  return (
    <div className="card-surface rounded-2xl p-6 animate-pulse">
      <div className="skeleton h-6 w-6 rounded-lg" />
      <div className="skeleton h-6 w-3/4 rounded mt-4" />
      <div className="space-y-2 mt-3">
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-5/6 rounded" />
      </div>
    </div>
  );
}

export function SkeletonStats() {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4 animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="skeleton h-10 w-24 rounded" />
          <div className="skeleton h-4 w-32 rounded" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonPageContent() {
  return (
    <div className="container-page py-12 space-y-8 animate-pulse">
      <div className="space-y-4">
        <div className="skeleton h-10 w-3/4 rounded" />
        <div className="skeleton h-6 w-full rounded" />
        <div className="skeleton h-6 w-5/6 rounded" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
