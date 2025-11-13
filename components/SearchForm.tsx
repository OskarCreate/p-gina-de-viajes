import { ArrowLeftRight, MapPin, Calendar, User } from "lucide-react";

export function SearchForm() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-8 pb-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Trip Type Selection */}
        <div className="flex items-center gap-6 mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="tripType"
              defaultChecked
              className="w-4 h-4 text-red-600"
            />
            <span>Ida y vuelta</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="tripType" className="w-4 h-4 text-red-600" />
            <span>Solo ida</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="tripType" className="w-4 h-4 text-red-600" />
            <span>Multidestino</span>
          </label>
          <div className="ml-auto flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>1 pasajero</span>
          </div>
        </div>

        {/* Search Fields */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Origin */}
          <div className="md:col-span-3 relative">
            <label className="block text-sm text-gray-600 mb-1">Origen</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-600" />
              <input
                type="text"
                defaultValue="Lima"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex items-end justify-center pb-3">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeftRight className="w-5 h-5 text-red-600" />
            </button>
          </div>

          {/* Destination */}
          <div className="md:col-span-3 relative">
            <label className="block text-sm text-gray-600 mb-1">Destino</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Destino"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
          </div>

          {/* Departure Date */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Salida</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
          </div>

          {/* Return Date */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Retorno</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="md:col-span-1 flex items-end">
            <button className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center">
              🔍
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
