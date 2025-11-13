import { ArrowLeft, Calendar, MapPin, User as UserIcon, CreditCard } from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MyReservationsProps {
  onBack: () => void;
  userEmail: string;
}

const imageMap: { [key: string]: string } = {
  "cusco-machu-picchu": "https://images.unsplash.com/photo-1601226261548-82fa0b3e8e91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXNjbyUyMG1hY2h1JTIwcGljY2h1fGVufDF8fHx8MTc2MzAwNTY5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
  "arequipa-peru": "https://images.unsplash.com/photo-1590545651636-f0e7f151239f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmVxdWlwYSUyMHBlcnV8ZW58MXx8fHwxNzYzMDAxNTE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "iquitos-amazon": "https://images.unsplash.com/photo-1508920769365-bb1609961277?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcXVpdG9zJTIwYW1hem9ufGVufDF8fHx8MTc2MzAwNTY5NHww&ixlib=rb-4.1.0&q=80&w=1080",
  "puno-titicaca": "https://images.unsplash.com/photo-1536704918791-c1b9079f933b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdW5vJTIwdGl0aWNhY2F8ZW58MXx8fHwxNzYzMDA1Njk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "machu-picchu-peru": "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNodSUyMHBpY2NodSUyMHBlcnV8ZW58MXx8fHwxNzYzMDA1Njk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "colca-canyon-peru": "https://images.unsplash.com/photo-1570958295340-278c2ad5f639?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xjYSUyMGNhbnlvbiUyMHBlcnV8ZW58MXx8fHwxNzYyOTAyNTIzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "amazon-rainforest-peru": "https://images.unsplash.com/photo-1701091490268-2ae3de5f5f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWF6b24lMjByYWluZm9yZXN0JTIwcGVydXxlbnwxfHx8fDE3NjMwMDU2OTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "lake-titicaca-peru": "https://images.unsplash.com/photo-1578920677448-75b94bb00339?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwdGl0aWNhY2ElMjBwZXJ1fGVufDF8fHx8MTc2MzAwNTY5NXww&ixlib=rb-4.1.0&q=80&w=1080",
  "huacachina-peru": "https://images.unsplash.com/photo-1739737066627-5812a41bde68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodWFjYWNoaW5hJTIwcGVydXxlbnwxfHx8fDE3NjMwMDU2OTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "trujillo-peru": "https://images.unsplash.com/photo-1592322053945-88b9b538becc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cnVqaWxsbyUyMHBlcnV8ZW58MXx8fHwxNzYzMDA1Njk1fDA&ixlib=rb-4.1.0&q=80&w=1080"
};

export function MyReservations({ onBack, userEmail }: MyReservationsProps) {
  const allReservations = JSON.parse(localStorage.getItem("peruTravelsReservations") || "[]");
  const userReservations = allReservations.filter((r: any) => r.userEmail === userEmail);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al inicio
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="mb-8">Mis Reservaciones</h2>

        {userReservations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Calendar className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="mb-2">No tienes reservaciones aún</h3>
            <p className="text-gray-600 mb-6">Explora nuestros destinos y paquetes para comenzar tu próxima aventura</p>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Explorar Destinos
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {userReservations.map((reservation: any, index: number) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                  {/* Image */}
                  <div className="md:col-span-1">
                    <ImageWithFallback
                      src={imageMap[reservation.trip.image] || reservation.trip.image}
                      alt={reservation.trip.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>

                  {/* Details */}
                  <div className="md:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="mb-2">{reservation.trip.title}</h3>
                        {reservation.trip.city && (
                          <div className="flex items-center gap-2 text-gray-600 mb-2">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{reservation.trip.city}</span>
                          </div>
                        )}
                        {reservation.trip.days && reservation.trip.nights && (
                          <p className="text-sm text-gray-600">{reservation.trip.days} días | {reservation.trip.nights} noches</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-red-600 text-xl">US$ {reservation.trip.priceUSD}</p>
                        <p className="text-gray-600 text-sm">S/ {reservation.trip.pricePEN.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                          <UserIcon className="w-4 h-4" />
                          Pasajero
                        </p>
                        <p>{reservation.passengerInfo.firstName} {reservation.passengerInfo.lastName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Fechas de Viaje
                        </p>
                        <p className="text-sm">
                          {reservation.travelDates.departure} - {reservation.travelDates.return}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          Método de Pago
                        </p>
                        <p className="text-sm">{reservation.paymentMethod}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Estado</p>
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          Confirmada
                        </span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-sm text-gray-600">
                        <strong>Fecha de reservación:</strong> {new Date(reservation.createdAt).toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
