import { ImageWithFallback } from './figma/ImageWithFallback';

interface PackageCardProps {
  title: string;
  image: string;
  days: number;
  nights: number;
  priceUSD: number;
  pricePEN: number;
  includes: string;
  onSelect: () => void;
}

const imageMap: { [key: string]: string } = {
  "machu-picchu-peru": "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNodSUyMHBpY2NodSUyMHBlcnV8ZW58MXx8fHwxNzYzMDA1Njk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "colca-canyon-peru": "https://images.unsplash.com/photo-1570958295340-278c2ad5f639?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xjYSUyMGNhbnlvbiUyMHBlcnV8ZW58MXx8fHwxNzYyOTAyNTIzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "amazon-rainforest-peru": "https://images.unsplash.com/photo-1701091490268-2ae3de5f5f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWF6b24lMjByYWluZm9yZXN0JTIwcGVydXxlbnwxfHx8fDE3NjMwMDU2OTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "lake-titicaca-peru": "https://images.unsplash.com/photo-1578920677448-75b94bb00339?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwdGl0aWNhY2ElMjBwZXJ1fGVufDF8fHx8MTc2MzAwNTY5NXww&ixlib=rb-4.1.0&q=80&w=1080",
  "huacachina-peru": "https://images.unsplash.com/photo-1739737066627-5812a41bde68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodWFjYWNoaW5hJTIwcGVydXxlbnwxfHx8fDE3NjMwMDU2OTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "trujillo-peru": "https://images.unsplash.com/photo-1592322053945-88b9b538becc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cnVqaWxsbyUyMHBlcnV8ZW58MXx8fHwxNzYzMDA1Njk1fDA&ixlib=rb-4.1.0&q=80&w=1080"
};

export function PackageCard({ title, image, days, nights, priceUSD, pricePEN, includes, onSelect }: PackageCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative aspect-[4/3]">
        <ImageWithFallback
          src={imageMap[image]}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-5">
        <div className="mb-3">
          <span className="text-xs text-gray-600 uppercase tracking-wide">PAQUETE</span>
          <h3 className="mt-1">{title}</h3>
        </div>

        <div className="mb-4">
          <span className="inline-block bg-red-600 text-white text-xs px-3 py-1 rounded">
            {days} DÍAS | {nights} NOCHES
          </span>
          <p className="text-xs text-gray-500 mt-2">DESDE LIMA</p>
        </div>

        <div className="mb-4">
          <p className="text-xs text-gray-600 mb-1">PRECIO DESDE:</p>
          <div className="flex items-baseline gap-2">
            <span className="text-red-600 text-xl">US$ {priceUSD.toLocaleString()}</span>
            <span className="text-gray-700">S/ {pricePEN.toLocaleString()}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{includes}</p>
        </div>

        <button className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition-colors" onClick={onSelect}>
          ¡Lo quiero!
        </button>
      </div>
    </div>
  );
}