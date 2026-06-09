import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, ArrowLeft, Tag } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/site-data';
import { QuoteForm } from '@/components/site/QuoteForm';

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} - Yash Connect Systems`;
    }
  }, [post]);

  if (!post) {
    return (
      <div className="section">
        <div className="container-page text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="btn-primary">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Article Header */}
      <section className="section pt-12">
        <div className="container-page">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-primary hover:text-accent-orange mb-6">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>
            
            <div className="inline-flex items-center gap-2 rounded-full bg-accent-orange/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent-orange mb-4">
              <Tag className="h-3 w-3" />
              {post.tag}
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.read}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section pt-0">
        <div className="container-page">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="card-surface rounded-2xl p-8 md:p-12">
                <div className="space-y-6 text-foreground leading-relaxed">
                  <p className="text-lg text-muted-foreground">
                    {post.excerpt}
                  </p>
                  
                  <div className="border-l-4 border-primary pl-6 py-4 bg-primary/5 rounded-r-lg">
                    <p className="text-base text-foreground">
                      <strong>Note:</strong> This is a placeholder article. Full content coming soon. 
                      For detailed product information and specifications, please contact our team.
                    </p>
                  </div>

                  <h2 className="font-display text-2xl font-bold text-foreground mt-8 mb-4">
                    Overview
                  </h2>
                  <p>
                    This comprehensive guide covers everything you need to know about {post.title.toLowerCase()}. 
                    Our team has compiled industry best practices, technical specifications, and practical 
                    recommendations based on years of experience serving automotive, packaging, and manufacturing sectors.
                  </p>

                  <h2 className="font-display text-2xl font-bold text-foreground mt-8 mb-4">
                    Key Considerations
                  </h2>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Material selection and compatibility</li>
                    <li>Application-specific requirements</li>
                    <li>Quality standards and certifications</li>
                    <li>Cost optimization strategies</li>
                    <li>Supply chain considerations</li>
                  </ul>

                  <h2 className="font-display text-2xl font-bold text-foreground mt-8 mb-4">
                    Need Expert Advice?
                  </h2>
                  <p>
                    Our technical team can help you choose the right products for your specific application. 
                    We provide customized solutions based on your industry requirements, volume needs, and budget constraints.
                  </p>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-12">
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">Related Articles</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2).map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    to={`/blog/${relatedPost.slug}`}
                    className="card-surface rounded-xl p-6 hover:border-primary/30 transition-colors"
                  >
                    <span className="inline-flex items-center gap-2 rounded-full bg-accent-orange/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent-orange">
                      {relatedPost.tag}
                    </span>
                    <h4 className="mt-3 font-display text-lg font-bold text-foreground">
                      {relatedPost.title}
                    </h4>
                    <p className="mt-2 text-sm text-muted-foreground">{relatedPost.excerpt}</p>
                    <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{relatedPost.read}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-muted/40">
        <div className="container-page">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl font-bold text-foreground mb-3">
                Get a Custom Quote
              </h2>
              <p className="text-muted-foreground">
                Share your requirements and we'll respond with pricing and specifications within 2 hours.
              </p>
            </div>
            <div className="card-surface rounded-2xl p-8">
              <QuoteForm source={`blog-${slug}`} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
