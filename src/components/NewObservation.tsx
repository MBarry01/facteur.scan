import React, { useState, useRef } from 'react';
import { X, Camera, MapPin } from 'lucide-react';

interface NewObservationProps {
  onClose: () => void;
}

interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

const NewObservation: React.FC<NewObservationProps> = ({ onClose }) => {
  const [type, setType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [speciesName, setSpeciesName] = useState('');
  const [speciesCategory, setSpeciesCategory] = useState('');
  const [speciesCount, setSpeciesCount] = useState('');
  const [behavior, setBehavior] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
      setPhotos(prev => [...prev, ...newPhotos]);
    }
  };

  const handleGetLocation = () => {
    setIsLoadingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            setLocation({
              latitude,
              longitude,
              address: data.display_name
            });
          } catch (error) {
            setLocation({ latitude, longitude });
          }
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error("Erreur de géolocalisation:", error);
          setIsLoadingLocation(false);
          alert("Impossible d'obtenir votre position. Veuillez vérifier vos paramètres de localisation.");
        }
      );
    } else {
      alert("La géolocalisation n'est pas supportée par votre navigateur.");
      setIsLoadingLocation(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      type,
      description,
      photos,
      location,
      species: type === 'faune' ? {
        name: speciesName,
        category: speciesCategory,
        count: parseInt(speciesCount),
        behavior
      } : undefined
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Nouvelle observation</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type d'observation
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              >
                <option value="">Sélectionner un type</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="environnement">Environnement</option>
                <option value="socio">Socio-démographique</option>
                <option value="citoyen">Remontée citoyenne</option>
                <option value="faune">Espèce animale</option>
              </select>
            </div>

            {type === 'faune' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom de l'espèce
                  </label>
                  <input
                    type="text"
                    value={speciesName}
                    onChange={(e) => setSpeciesName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Ex: Renard roux"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Catégorie
                  </label>
                  <select
                    value={speciesCategory}
                    onChange={(e) => setSpeciesCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  >
                    <option value="">Sélectionner une catégorie</option>
                    <option value="mammifere">Mammifère</option>
                    <option value="oiseau">Oiseau</option>
                    <option value="reptile">Reptile</option>
                    <option value="amphibien">Amphibien</option>
                    <option value="insecte">Insecte</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre d'individus
                  </label>
                  <input
                    type="number"
                    value={speciesCount}
                    onChange={(e) => setSpeciesCount(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    min="1"
                    placeholder="Ex: 2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Comportement observé
                  </label>
                  <textarea
                    value={behavior}
                    onChange={(e) => setBehavior(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24"
                    placeholder="Ex: En train de se nourrir, nidification..."
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 h-32"
                placeholder="Décrivez votre observation..."
                required
              />
            </div>

            {photos.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setPhotos(photos.filter((_, i) => i !== index))}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {location && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin size={16} />
                  <span>
                    {location.address || 
                     `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`}
                  </span>
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                <Camera size={20} />
                <span>Photo</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                accept="image/*"
                multiple
                className="hidden"
              />
              <button
                type="button"
                onClick={handleGetLocation}
                disabled={isLoadingLocation}
                className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 disabled:opacity-50"
              >
                <MapPin size={20} />
                <span>{isLoadingLocation ? 'Chargement...' : 'Position'}</span>
              </button>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-[#FFCD00] text-gray-900 rounded-lg hover:bg-[#FFE180]"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewObservation;