import { ReactNode } from 'react';

interface LoadingWrapperProps {
  isLoading: boolean;
  skeleton: ReactNode;
  children: ReactNode;
  minHeight?: string;
}

export function LoadingWrapper({ isLoading, skeleton, children, minHeight }: LoadingWrapperProps) {
  if (isLoading) {
    return (
      <div style={{ minHeight }} className="w-full">
        {skeleton}
      </div>
    );
  }

  return <>{children}</>;
}

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4'
  };

  return (
    <div className={`inline-block ${sizeClasses[size]} border-primary border-t-transparent rounded-full animate-spin ${className}`} />
  );
}

export function LoadingOverlay({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="card-surface p-8 rounded-2xl text-center space-y-4">
        <LoadingSpinner size="lg" className="mx-auto" />
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

export function LoadingSection({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <div className="text-center space-y-3">
        <LoadingSpinner size="lg" className="mx-auto" />
        <p className="text-sm text-muted-foreground">Loading content...</p>
      </div>
    </div>
  );
}
