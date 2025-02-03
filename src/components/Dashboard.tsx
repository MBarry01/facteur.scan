import React, { useState } from 'react';
import { BarChart3, AlertTriangle, CheckCircle, Clock, MapPin, Filter, Bird } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const activities = [
  {
    location: { lat: 48.8566, lng: 2.3522 },
    description: "Boîte aux lettres endommagée",
    address: "12 Rue de Rivoli, 75001 Paris",
    time: "2 heures",
    priority: "high"
  },
  {
    location: { lat: 48.8606, lng: 2.3376 },
    description: "Dépôt sauvage",
    address: "45 Rue du Louvre, 75001 Paris",
    time: "3 heures",
    priority: "medium"
  },
  {
    location: { lat: 48.8744, lng: 2.3526 },
    description: "Éclairage défectueux",
    address: "23 Rue de la Fayette, 75009 Paris",
    time: "1 heure",
    priority: "low"
  },
  {
    location: { lat: 48.8619, lng: 2.3186 },
    description: "Renard roux observé",
    address: "Jardin des Tuileries",
    time: "30 minutes",
    priority: "medium",
    type: "faune",
    species: {
      name: "Renard roux",
      category: "mammifere",
      count: 1,
      behavior: "En chasse"
    }
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-500';
    case 'medium':
      return 'bg-orange-500';
    case 'low':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};

const Dashboard = () => {
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  
  const filteredActivities = activities.filter(activity => 
    (selectedPriority === 'all' || activity.priority === selectedPriority) &&
    (selectedType === 'all' || activity.type === selectedType)
  );

  const stats = {
    totalObservations: 1234,
    resolvedIssues: 890,
    pendingIssues: 234,
    criticalIssues: 110,
    animalSpecies: 45
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total des observations</p>
              <p className="text-2xl font-bold">{stats.totalObservations}</p>
            </div>
            <BarChart3 className="text-[#FFCD00]" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Problèmes résolus</p>
              <p className="text-2xl font-bold">{stats.resolvedIssues}</p>
            </div>
            <CheckCircle className="text-green-600" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En attente</p>
              <p className="text-2xl font-bold">{stats.pendingIssues}</p>
            </div>
            <Clock className="text-orange-600" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Problèmes critiques</p>
              <p className="text-2xl font-bold">{stats.criticalIssues}</p>
            </div>
            <AlertTriangle className="text-red-600" size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Espèces observées</p>
              <p className="text-2xl font-bold">{stats.animalSpecies}</p>
            </div>
            <Bird className="text-purple-600" size={24} />
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-4">
          <Filter size={20} className="text-gray-500" />
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="all">Toutes les priorités</option>
            <option value="high">Haute priorité</option>
            <option value="medium">Priorité moyenne</option>
            <option value="low">Basse priorité</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="all">Tous les types</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="environnement">Environnement</option>
            <option value="socio">Socio-démographique</option>
            <option value="citoyen">Remontée citoyenne</option>
            <option value="faune">Espèce animale</option>
          </select>
        </div>
      </div>
      
      {/* Interactive Map */}
      <div className="h-[600px] rounded-lg overflow-hidden shadow-inner">
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
          {filteredActivities.map((activity, index) => (
            <Marker
              key={index}
              position={[activity.location.lat, activity.location.lng]}
            >
              <Popup>
                <div className="p-2">
                  <div className="flex items-center space-x-2">
                    <span className={`${getPriorityColor(activity.priority)} w-2 h-2 rounded-full`} />
                    <p className="font-medium text-sm">{activity.description}</p>
                  </div>
                  {activity.species && (
                    <div className="mt-2 text-sm">
                      <p className="font-medium">Espèce : {activity.species.name}</p>
                      <p>Catégorie : {activity.species.category}</p>
                      {activity.species.count && <p>Nombre : {activity.species.count}</p>}
                      {activity.species.behavior && <p>Comportement : {activity.species.behavior}</p>}
                    </div>
                  )}
                  <p className="text-xs text-gray-600 mt-1">{activity.address}</p>
                  <p className="text-xs text-gray-500 mt-1">Il y a {activity.time}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Dashboard;