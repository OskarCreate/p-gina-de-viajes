import { Phone, Store, Bell, User } from "lucide-react";

interface NavbarProps {
  user: { email: string; name: string } | null;
  onLoginClick: () => void;
  onLogout: () => void;
  onMyReservationsClick: () => void;
}

export function Navbar({ user, onLoginClick, onLogout, onMyReservationsClick }: NavbarProps) {
  return (
    <nav className="bg-white border-b">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-red-600">Peru</span>
          <span className="text-gray-600">travels</span>
        </div>

        <div className="flex items-center gap-4">
          <button className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50 transition-colors">
            Para ventas (01) 610-9200
          </button>
          <button className="p-2 hover:bg-gray-100 rounded">
            <Store className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-600">Tiendas</span>
          {user && (
            <>
              <button 
                onClick={onMyReservationsClick}
                className="p-2 hover:bg-gray-100 rounded relative"
              >
                <Bell className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-600">Mis Reservaciones</span>
            </>
          )}
          {user ? (
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-sm">{user.name}</p>
                <button 
                  onClick={onLogout}
                  className="text-xs text-red-600 hover:text-red-700"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={onLoginClick}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Iniciar sesión
            </button>
          )}
        </div>
      </div>

      {/* Menu Bar */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-8 py-3">
            <button className="text-gray-700 hover:text-red-600 transition-colors flex items-center gap-2">
              ✈️ Vuelos
            </button>
            <button className="relative text-gray-700 hover:text-red-600 transition-colors flex items-center gap-2">
              📦 Paquetes
              <span className="absolute -top-1 -right-8 bg-red-600 text-white text-xs px-2 py-0.5 rounded">
                AHORRA
              </span>
            </button>
            <button className="text-gray-700 hover:text-red-600 transition-colors flex items-center gap-2">
              🏨 Hoteles
            </button>
            <button className="text-gray-700 hover:text-red-600 transition-colors flex items-center gap-2">
              ⚡ OFERTAS FLASH
            </button>
            <button className="text-gray-700 hover:text-red-600 transition-colors flex items-center gap-2">
              🌴 Costa
            </button>
            <button className="text-gray-700 hover:text-red-600 transition-colors flex items-center gap-2">
              🏔️ Sierra
            </button>
            <button className="text-gray-700 hover:text-red-600 transition-colors flex items-center gap-2">
              🌳 Selva
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}