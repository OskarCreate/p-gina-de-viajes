import { ImageWithFallback } from './figma/ImageWithFallback';

interface DestinationCardProps {
  city: string;
  image: string;
  priceUSD: number;
  pricePEN: number;
  badge: string;
  onSelect: () => void;
}

const imageMap: { [key: string]: string } = {
  "cusco-machu-picchu": "https://images.unsplash.com/photo-1601226261548-82fa0b3e8e91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXNjbyUyMG1hY2h1JTIwcGljY2h1fGVufDF8fHx8MTc2MzAwNTY5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
  "arequipa-peru": "https://images.unsplash.com/photo-1590545651636-f0e7f151239f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmVxdWlwYSUyMHBlcnV8ZW58MXx8fHwxNzYzMDAxNTE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "iquitos-amazon": "https://images.unsplash.com/photo-1508920769365-bb1609961277?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcXVpdG9zJTIwYW1hem9ufGVufDF8fHx8MTc2MzAwNTY5NHww&ixlib=rb-4.1.0&q=80&w=1080",
  "puno-titicaca": "https://images.unsplash.com/photo-1536704918791-c1b9079f933b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdW5vJTIwdGl0aWNhY2F8ZW58MXx8fHwxNzYzMDA1Njk0fDA&ixlib=rb-4.1.0&q=80&w=1080"
};

export function DestinationCard({ city, image, priceUSD, pricePEN, badge, onSelect }: DestinationCardProps) {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer" onClick={onSelect}>
      <div className="aspect-[4/5] relative">
        <ImageWithFallback
          src={imageMap[image]}
          alt={city}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        
        {/* Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs">
            {badge}
          </div>
        </div>

        {/* City Label */}
        <div className="absolute top-4 left-4">
          <div className="bg-red-600 text-white px-4 py-2 rounded">
            {city}
          </div>
        </div>

        {/* Price Info */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-white">
            <p className="text-xs opacity-80 mb-1">Ida y vuelta - 1 pasajero</p>
            <div className="flex items-baseline gap-2">
              <span className="text-sm">ahora desde</span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl">US$ {priceUSD}</span>
              <span className="text-lg">| S/ {pricePEN.toLocaleString()}</span>
            </div>
            <p className="text-xs opacity-80 mt-1">incluye impuestos y cargos</p>
          </div>
          <button className="w-full mt-3 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors">
            Para viajar del 16 de diciembre 2024 al 30 de junio 2025
          </button>
        </div>
      </div>
    </div>
  );
}