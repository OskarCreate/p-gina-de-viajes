import { Navbar } from "./components/Navbar";
import { SearchForm } from "./components/SearchForm";
import { DestinationCard } from "./components/DestinationCard";
import { PackageCard } from "./components/PackageCard";
import { ReservationView } from "./components/ReservationView";
import { AuthModal } from "./components/AuthModal";
import { MyReservations } from "./components/MyReservations";
import { useState, useEffect } from "react";

export default function App() {
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'reservation' | 'myReservations'>('home');

  useEffect(() => {
    const savedUser = localStorage.getItem("peruTravelsCurrentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: { email: string; name: string }) => {
    setUser(userData);
    localStorage.setItem("peruTravelsCurrentUser", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("peruTravelsCurrentUser");
    setCurrentView('home');
  };

  const handleTripSelect = (trip: any) => {
    if (!user) {
      alert("Debes iniciar sesión para realizar una reservación");
      setShowAuthModal(true);
      return;
    }
    setSelectedTrip(trip);
    setCurrentView('reservation');
  };

  const featuredDestinations = [
    {
      id: 1,
      city: "Cusco",
      image: "cusco-machu-picchu",
      priceUSD: 198,
      pricePEN: 756,
      badge: "OFERTA ESPECIAL"
    },
    {
      id: 2,
      city: "Arequipa",
      image: "arequipa-peru",
      priceUSD: 156,
      pricePEN: 595,
      badge: "OFERTA ESPECIAL"
    },
    {
      id: 3,
      city: "Iquitos",
      image: "iquitos-amazon",
      priceUSD: 234,
      pricePEN: 893,
      badge: "OFERTA ESPECIAL"
    },
    {
      id: 4,
      city: "Puno",
      image: "puno-titicaca",
      priceUSD: 187,
      pricePEN: 714,
      badge: "OFERTA ESPECIAL"
    }
  ];

  const packages = [
    {
      id: 1,
      title: "Cusco Mágico + Machu Picchu",
      image: "machu-picchu-peru",
      days: 4,
      nights: 3,
      priceUSD: 520,
      pricePEN: 1985,
      includes: "INCLUYE IMPUESTOS, TASAS Y CARGOS"
    },
    {
      id: 2,
      title: "Arequipa & Colca 4D",
      image: "colca-canyon-peru",
      days: 4,
      nights: 3,
      priceUSD: 380,
      pricePEN: 1450,
      includes: "INCLUYE IMPUESTOS, TASAS Y CARGOS"
    },
    {
      id: 3,
      title: "Iquitos Aventura Amazónica",
      image: "amazon-rainforest-peru",
      days: 5,
      nights: 4,
      priceUSD: 650,
      pricePEN: 2480,
      includes: "INCLUYE IMPUESTOS, TASAS Y CARGOS"
    },
    {
      id: 4,
      title: "Puno & Lago Titicaca",
      image: "lake-titicaca-peru",
      days: 3,
      nights: 2,
      priceUSD: 290,
      pricePEN: 1107,
      includes: "INCLUYE IMPUESTOS, TASAS Y CARGOS"
    },
    {
      id: 5,
      title: "Paracas & Huacachina",
      image: "huacachina-peru",
      days: 3,
      nights: 2,
      priceUSD: 310,
      pricePEN: 1183,
      includes: "INCLUYE IMPUESTOS, TASAS Y CARGOS"
    },
    {
      id: 6,
      title: "Trujillo & Chan Chan",
      image: "trujillo-peru",
      days: 3,
      nights: 2,
      priceUSD: 265,
      pricePEN: 1011,
      includes: "INCLUYE IMPUESTOS, TASAS Y CARGOS"
    }
  ];

  if (currentView === 'myReservations' && user) {
    return <MyReservations onBack={() => setCurrentView('home')} userEmail={user.email} />;
  }

  if (currentView === 'reservation' && selectedTrip) {
    return (
      <ReservationView 
        trip={selectedTrip} 
        onBack={() => {
          setSelectedTrip(null);
          setCurrentView('home');
        }}
        userEmail={user!.email}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        user={user}
        onLoginClick={() => setShowAuthModal(true)}
        onLogout={handleLogout}
        onMyReservationsClick={() => setCurrentView('myReservations')}
      />
      
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />
      
      <div className="bg-gradient-to-b from-gray-200 to-gray-100 pb-8">
        <SearchForm />
      </div>

      {/* Featured Destinations */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDestinations.map((destination) => (
            <DestinationCard 
              key={destination.id} 
              {...destination}
              onSelect={() => handleTripSelect({
                title: `Vuelo a ${destination.city}`,
                image: destination.image,
                priceUSD: destination.priceUSD,
                pricePEN: destination.pricePEN,
                city: destination.city,
                type: 'destination'
              })}
            />
          ))}
        </div>
      </section>

      {/* Packages Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="mb-8">Ahorra más comprando Paquetes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <PackageCard 
              key={pkg.id} 
              {...pkg}
              onSelect={() => handleTripSelect({
                title: pkg.title,
                image: pkg.image,
                priceUSD: pkg.priceUSD,
                pricePEN: pkg.pricePEN,
                days: pkg.days,
                nights: pkg.nights,
                type: 'package'
              })}
            />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button className="px-8 py-3 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
            Ver más paquetes
          </button>
        </div>
      </section>
    </div>
  );
}