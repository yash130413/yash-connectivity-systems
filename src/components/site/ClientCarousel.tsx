import { CLIENTS } from '@/lib/site-data';

interface ClientCarouselProps {
  speed?: number;
  showGradient?: boolean;
}

export function ClientCarousel({ speed = 30, showGradient = true }: ClientCarouselProps) {
  // Duplicate clients array for seamless infinite scroll
  const duplicatedClients = [...CLIENTS, ...CLIENTS];

  return (
    <div className="relative overflow-hidden bg-muted/30 py-8">
      {showGradient && (
        <>
          <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />
        </>
      )}
      
      <div className="carousel-track-wrapper">
        <div 
          className="carousel-track"
          style={{ 
            animationDuration: `${speed}s`,
          }}
        >
          {duplicatedClients.map((client, index) => (
            <div
              key={`${client}-${index}`}
              className="carousel-item flex-shrink-0 w-44 md:w-52 h-20 md:h-24 flex items-center justify-center bg-card border border-border rounded-xl mx-2 md:mx-3 px-4 md:px-6 hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
            >
              <span className="font-display text-sm md:text-base font-bold text-foreground/70 group-hover:text-primary text-center transition-colors">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
