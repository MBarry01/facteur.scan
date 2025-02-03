import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Truck } from 'lucide-react';
import L from 'leaflet';

// Données simulées des véhicules
const vehicles = [
  {
    id: 'V001',
    type: 'Utilitaire électrique',
    driver: 'Jean Dupont',
    status: 'En tournée',
    route: 'Route 12',
    location: { lat: 48.8566, lng: 2.3522 },
    lastUpdate: '2 minutes',
    speed: '30 km/h'
  },
  {
    id: 'V002',
    type: 'Camionnette',
    driver: 'Marie Martin',
    status: 'En livraison',
    route: 'Route 15',
    location: { lat: 48.8606, lng: 2.3376 },
    lastUpdate: '5 minutes',
    speed: '25 km/h'
  },
  {
    id: 'V003',
    type: 'Vélo cargo',
    driver: 'Lucas Bernard',
    status: 'Retour dépôt',
    route: 'Route 8',
    location: { lat: 48.8744, lng: 2.3526 },
    lastUpdate: '1 minute',
    speed: '15 km/h'
  }
];

const Map = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  // Icône personnalisée pour les véhicules
  const vehicleIcon = new L.DivIcon({
    html: `<div class="bg-[#FFCD00] p-2 rounded-full">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 17h4V5H10v12zm-8-3h4v-6H2v6zm16 0h4v-6h-4v6z"/>
            </svg>
           </div>`,
    className: 'custom-div-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Véhicules en circulation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                selectedVehicle === vehicle.id
                  ? 'border-[#FFCD00] bg-[#FFCD00] bg-opacity-10'
                  : 'border-gray-200 hover:border-[#FFCD00]'
              }`}
              onClick={() => setSelectedVehicle(vehicle.id)}
            >
              <div className="flex items-center space-x-3">
                <Truck className="text-[#FFCD00]" size={24} />
                <div>
                  <h3 className="font-medium">{vehicle.type}</h3>
                  <p className="text-sm text-gray-600">{vehicle.driver}</p>
                </div>
              </div>
              <div className="mt-2 space-y-1 text-sm">
                <p className="text-gray-600">Status: {vehicle.status}</p>
                <p className="text-gray-600">Route: {vehicle.route}</p>
                <p className="text-gray-600">Vitesse: {vehicle.speed}</p>
                <p className="text-gray-500">Dernière mise à jour: {vehicle.lastUpdate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[600px] rounded-lg overflow-hidden">
        <MapContainer
          center={[48.8566, 2.3522]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {vehicles.map((vehicle) => (
            <Marker
              key={vehicle.id}
              position={[vehicle.location.lat, vehicle.location.lng]}
              icon={vehicleIcon}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-medium">{vehicle.type}</h3>
                  <p className="text-sm">{vehicle.driver}</p>
                  <div className="mt-2 space-y-1 text-sm">
                    <p>Status: {vehicle.status}</p>
                    <p>Route: {vehicle.route}</p>
                    <p>Vitesse: {vehicle.speed}</p>
                    <p className="text-gray-500">Mise à jour: {vehicle.lastUpdate}</p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;