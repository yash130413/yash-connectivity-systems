import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { PRODUCTS } from '@/lib/site-data';

interface BreadcrumbItem {
  label: string;
  path: string;
}

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Don't show breadcrumbs on home page
  if (pathnames.length === 0) {
    return null;
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', path: '/' },
  ];

  // Build breadcrumb trail
  let currentPath = '';
  pathnames.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // Format label
    let label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    // Special handling for product detail pages
    if (pathnames[index - 1] === 'products' && index === pathnames.length - 1) {
      const product = PRODUCTS.find(p => p.slug === segment);
      if (product) {
        label = product.name;
      }
    }

    breadcrumbs.push({ label, path: currentPath });
  });

  return (
    <nav aria-label="Breadcrumb" className="bg-muted/30 border-b border-border">
      <div className="container-page py-3">
        <ol 
          className="flex flex-wrap items-center gap-2 text-sm"
          itemScope 
          itemType="https://schema.org/BreadcrumbList"
        >
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            
            return (
              <li
                key={crumb.path}
                className="flex items-center gap-2"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {index === 0 ? (
                  <Link
                    to={crumb.path}
                    className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                    itemProp="item"
                  >
                    <Home className="h-3.5 w-3.5" />
                    <span itemProp="name" className="sr-only sm:not-sr-only">{crumb.label}</span>
                    <meta itemProp="position" content={String(index + 1)} />
                  </Link>
                ) : isLast ? (
                  <span
                    className="font-medium text-foreground"
                    itemProp="item"
                    aria-current="page"
                  >
                    <span itemProp="name">{crumb.label}</span>
                    <meta itemProp="position" content={String(index + 1)} />
                  </span>
                ) : (
                  <Link
                    to={crumb.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    itemProp="item"
                  >
                    <span itemProp="name">{crumb.label}</span>
                    <meta itemProp="position" content={String(index + 1)} />
                  </Link>
                )}
                
                {!isLast && (
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
