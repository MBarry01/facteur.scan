import React, { useState } from 'react';
import { Bird, Search, Filter } from 'lucide-react';

interface Animal {
  id: string;
  name: string;
  category: 'mammifere' | 'oiseau' | 'reptile' | 'amphibien' | 'insecte';
  lastSeen: string;
  location: string;
  count: number;
  image: string;
  description: string;
}

const animals: Animal[] = [
  {
    id: '1',
    name: 'Renard roux',
    category: 'mammifere',
    lastSeen: 'Aujourd\'hui à 10:30',
    location: 'Jardin des Tuileries',
    count: 2,
    image: 'https://plus.unsplash.com/premium_photo-1664297547495-dae7e2fdd9e1?q=80&w=1798&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Couple de renards observé en train de chasser'
  },
  {
    id: '2',
    name: 'Mésange charbonnière',
    category: 'oiseau',
    lastSeen: 'Hier à 15:45',
    location: 'Parc Monceau',
    count: 5,
    image: 'https://images.unsplash.com/photo-1490199444786-9d1faf6fbeb8?auto=format&fit=crop&w=800&q=80',
    description: 'Groupe observé sur les mangeoires'
  },
  {
    id: '3',
    name: 'Lézard des murailles',
    category: 'reptile',
    lastSeen: 'Il y a 2 jours',
    location: 'Square du Temple',
    count: 3,
    image: 'https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?auto=format&fit=crop&w=800&q=80',
    description: 'Plusieurs individus en plein bain de soleil'
  },
  {
    id: '4',
    name: 'Paon',
    category: 'insecte',
    lastSeen: 'Aujourd\'hui à 14:20',
    location: 'Jardin des Plantes',
    count: 8,
    image: 'https://images.unsplash.com/photo-1546008523-a2840156b297?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Paon observés sur les fleurs de lavande'
  },
  {
    id: '5',
    name: 'Hérisson d\'Europe',
    category: 'mammifere',
    lastSeen: 'Hier à 23:15',
    location: 'Parc des Buttes-Chaumont',
    count: 1,
    image: 'https://images.unsplash.com/photo-1470854989922-5be2f7456d78?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Individu aperçu dans les buissons'
  },
  {
    id: '6',
    name: 'Crapaud commun',
    category: 'amphibien',
    lastSeen: 'Il y a 3 jours',
    location: 'Bois de Vincennes',
    count: 4,
    image: 'https://images.unsplash.com/photo-1551189014-fe516aed0e9e?auto=format&fit=crop&w=800&q=80',
    description: 'Groupe observé près d\'une mare'
  },
  {
    id: '7',
    name: 'Machaon',
    category: 'insecte',
    lastSeen: 'Aujourd\'hui à 11:30',
    location: 'Jardin du Luxembourg',
    count: 3,
    image: 'https://images.unsplash.com/photo-1685733179906-ef03fbc85e73?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Papillons butinant les fleurs'
  },
  {
    id: '8',
    name: 'Pic épeiche',
    category: 'oiseau',
    lastSeen: 'Ce matin à 08:45',
    location: 'Bois de Boulogne',
    count: 2,
    image: 'https://images.unsplash.com/photo-1711482434688-537e55020c4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Couple observé sur un vieux chêne'
  },
  {
    id: '9',
    name: 'Lucane cerf-volant',
    category: 'insecte',
    lastSeen: 'Hier à 21:30',
    location: 'Forêt de Saint-Germain',
    count: 2,
    image: 'https://plus.unsplash.com/premium_photo-1723221134129-a59dd7713980?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Mâle et femelle observés sur un tronc mort'
  },
  {
    id: '10',
    name: 'Couleuvre à collier',
    category: 'reptile',
    lastSeen: 'Il y a 4 jours',
    location: 'Parc de Sceaux',
    count: 1,
    image: 'https://plus.unsplash.com/premium_photo-1661854791838-6997f74a678c?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Individu observé près d\'un point d\'eau'
  },
  {
    id: '11',
    name: 'Triton palmé',
    category: 'amphibien',
    lastSeen: 'Il y a 2 jours',
    location: 'Étang de Ville-d\'Avray',
    count: 6,
    image: 'https://images.unsplash.com/photo-1654284637080-c71e4fa24d53?q=80&w=1952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Groupe observé dans une mare forestière'
  },
  {
    id: '12',
    name: 'mante religieuse',
    category: 'insecte',
    lastSeen: 'Hier à 22:15',
    location: 'Parc de la Villette',
    count: 1,
    image: 'https://images.unsplash.com/photo-1541339179819-8b37015cb0f6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Plus grand papillon d\'Europe observé près des lampadaires'
  }
];

const AnimalSpecies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredAnimals = animals.filter(animal => {
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || animal.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Bird className="text-[#FFCD00]" size={32} />
          <h1 className="text-2xl font-bold">Espèces Animales Recensées</h1>
        </div>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher une espèce..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFCD00] focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="all">Toutes les catégories</option>
            <option value="mammifere">Mammifères</option>
            <option value="oiseau">Oiseaux</option>
            <option value="reptile">Reptiles</option>
            <option value="amphibien">Amphibiens</option>
            <option value="insecte">Insectes</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAnimals.map(animal => (
          <div key={animal.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <img
              src={animal.image}
              alt={animal.name}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1579170053380-58064b2dee67?auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{animal.name}</h3>
                <span className="px-3 py-1 bg-[#FFCD00] bg-opacity-20 text-gray-800 rounded-full text-sm">
                  {animal.category}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{animal.description}</p>
              <div className="space-y-1 text-sm text-gray-500">
                <p>📍 {animal.location}</p>
                <p>👥 {animal.count} individu{animal.count > 1 ? 's' : ''}</p>
                <p>🕒 Dernière observation : {animal.lastSeen}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimalSpecies;