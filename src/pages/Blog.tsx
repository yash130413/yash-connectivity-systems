import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { PageHero } from '@/components/site/SectionHeader';
import { BLOG_POSTS } from '@/lib/site-data';
import { SkeletonBlogCard } from '@/components/ui/skeleton';

export default function BlogPage() {
  const [isLoading, setIsLoading] = useState(true);
  const featuredPost = BLOG_POSTS[0];
  const regularPosts = BLOG_POSTS.slice(1);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Industrial resource center"
        subtitle="Buyer guides, application notes and product explainers — written for procurement and production teams."
      />

      <section className="section">
        <div className="container-page">
          {/* Featured Post */}
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 mb-12 md:mb-16">
            <div className="bg-primary rounded-2xl md:rounded-3xl p-7 md:p-10 lg:p-12 text-primary-foreground flex flex-col justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent-orange px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent-orange-foreground w-fit">
                Featured · Barcode
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold md:text-3xl lg:text-4xl leading-tight">
                What Are Barcode Labels? A Buyer's Guide
              </h2>
              <p className="mt-4 text-primary-foreground/85 leading-relaxed text-sm md:text-base">
                Material grades, adhesives, sizes and how to pick the right label for your line.
              </p>
              <div className="mt-5 flex items-center gap-2 text-sm text-primary-foreground/70">
                <Clock className="h-4 w-4" />
                <span>6 min read</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl md:rounded-3xl border border-border p-7 md:p-10 lg:p-12 flex flex-col justify-center shadow-sm">
              <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3">
                Read the full guide
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Specifications, materials and selection criteria explained in plain language for buyers.
              </p>
              <Link to={`/blog/${featuredPost.slug}`} className="btn-primary mt-6 inline-flex items-center gap-2 w-fit text-sm md:text-base">
                Read article <span>→</span>
              </Link>
            </div>
          </div>

          {/* Regular Posts Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => <SkeletonBlogCard key={i} />)
            ) : (
              regularPosts.map((post) => (
                <article key={post.slug} className="card-surface rounded-2xl p-6 flex flex-col">
                  <span className="inline-flex items-center gap-2 rounded-full bg-accent-orange/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent-orange w-fit">
                    {post.tag}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold text-foreground">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{post.read}</span>
                    </div>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-sm font-semibold text-primary hover:text-accent-orange transition-colors"
                    >
                      Read →
                    </Link>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
