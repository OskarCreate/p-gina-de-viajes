import { ArrowLeft, Calendar, User, Mail, Phone, MapPin, CreditCard } from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from "react";

interface ReservationViewProps {
  trip: {
    title: string;
    image: string;
    days?: number;
    nights?: number;
    priceUSD: number;
    pricePEN: number;
    city?: string;
    type: 'destination' | 'package';
  };
  onBack: () => void;
  userEmail: string;
}

export function ReservationView({ trip, onBack, userEmail }: ReservationViewProps) {
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

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    document: "",
    birthDate: "",
    email: "",
    phone: "",
    address: "",
    departureDate: "",
    returnDate: "",
    paymentMethod: "Tarjeta de Crédito / Débito",
    specialRequests: "",
    acceptTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptTerms) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }

    const reservation = {
      userEmail,
      trip,
      passengerInfo: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        document: formData.document,
        birthDate: formData.birthDate
      },
      contactInfo: {
        email: formData.email,
        phone: formData.phone,
        address: formData.address
      },
      travelDates: {
        departure: formData.departureDate,
        return: formData.returnDate
      },
      paymentMethod: formData.paymentMethod,
      specialRequests: formData.specialRequests,
      createdAt: new Date().toISOString()
    };

    const existingReservations = JSON.parse(localStorage.getItem("peruTravelsReservations") || "[]");
    existingReservations.push(reservation);
    localStorage.setItem("peruTravelsReservations", JSON.stringify(existingReservations));

    alert("¡Reservación confirmada exitosamente!");
    onBack();
  };

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
            Volver a la búsqueda
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="mb-6">Detalles de la Reservación</h2>

              {/* Passenger Information */}
              <div className="mb-8">
                <h3 className="mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-red-600" />
                  Información del Pasajero
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Nombres</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="Ingrese sus nombres"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Apellidos</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Ingrese sus apellidos"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">DNI / Pasaporte</label>
                    <input
                      type="text"
                      required
                      value={formData.document}
                      onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                      placeholder="Número de documento"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Fecha de Nacimiento</label>
                    <input
                      type="date"
                      required
                      value={formData.birthDate}
                      onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-8">
                <h3 className="mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-red-600" />
                  Información de Contacto
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Correo Electrónico</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="correo@ejemplo.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Teléfono</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+51 999 999 999"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-600 mb-2">Dirección</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Ingrese su dirección completa"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                </div>
              </div>

              {/* Travel Dates */}
              <div className="mb-8">
                <h3 className="mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-red-600" />
                  Fechas de Viaje
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Fecha de Salida</label>
                    <input
                      type="date"
                      required
                      value={formData.departureDate}
                      onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Fecha de Retorno</label>
                    <input
                      type="date"
                      required
                      value={formData.returnDate}
                      onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-8">
                <h3 className="mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-red-600" />
                  Método de Pago
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={formData.paymentMethod === "Tarjeta de Crédito / Débito"}
                      onChange={() => setFormData({ ...formData, paymentMethod: "Tarjeta de Crédito / Débito" })}
                      className="w-4 h-4 text-red-600" 
                    />
                    <div className="flex-1">
                      <p>Tarjeta de Crédito / Débito</p>
                      <p className="text-sm text-gray-500">Visa, Mastercard, American Express</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={formData.paymentMethod === "Transferencia Bancaria"}
                      onChange={() => setFormData({ ...formData, paymentMethod: "Transferencia Bancaria" })}
                      className="w-4 h-4 text-red-600" 
                    />
                    <div className="flex-1">
                      <p>Transferencia Bancaria</p>
                      <p className="text-sm text-gray-500">BCP, Interbank, BBVA, Scotiabank</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={formData.paymentMethod === "Yape / Plin"}
                      onChange={() => setFormData({ ...formData, paymentMethod: "Yape / Plin" })}
                      className="w-4 h-4 text-red-600" 
                    />
                    <div className="flex-1">
                      <p>Yape / Plin</p>
                      <p className="text-sm text-gray-500">Pago instantáneo</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Special Requests */}
              <div className="mb-6">
                <h3 className="mb-4">Solicitudes Especiales (Opcional)</h3>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  placeholder="Ingrese cualquier solicitud especial, preferencias alimentarias, necesidades de accesibilidad, etc."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                ></textarea>
              </div>

              {/* Terms */}
              <div className="mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.acceptTerms}
                    onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                    className="mt-1 w-4 h-4 text-red-600" 
                  />
                  <span className="text-sm text-gray-600">
                    Acepto los términos y condiciones, políticas de privacidad y políticas de cancelación de Peru travels
                  </span>
                </label>
              </div>

              <button 
                type="submit"
                className="w-full bg-red-600 text-white py-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                Confirmar Reservación
              </button>
            </form>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h3 className="mb-4">Resumen de Reservación</h3>
              
              <div className="mb-4">
                <ImageWithFallback
                  src={imageMap[trip.image] || trip.image}
                  alt={trip.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              <div className="mb-4">
                <h4 className="mb-2">{trip.title}</h4>
                {trip.city && (
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{trip.city}</span>
                  </div>
                )}
                {trip.days && trip.nights && (
                  <p className="text-sm text-gray-600">{trip.days} días | {trip.nights} noches</p>
                )}
              </div>

              <div className="border-t pt-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Tipo de viaje:</span>
                  <span>{trip.type === 'package' ? 'Paquete' : 'Solo vuelo'}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Pasajeros:</span>
                  <span>1 adulto</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span>US$ {trip.priceUSD}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Impuestos y cargos:</span>
                  <span>Incluido</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-gray-600">Total:</span>
                  <div className="text-right">
                    <p className="text-red-600 text-xl">US$ {trip.priceUSD}</p>
                    <p className="text-gray-600 text-sm">S/ {trip.pricePEN.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  💡 <strong>Consejo:</strong> Reserve ahora y asegure su precio. La tarifa puede cambiar según disponibilidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}