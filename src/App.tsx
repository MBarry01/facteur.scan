import React, { useState } from 'react';
import { MapPin, BarChart3, Bell, Settings, Menu, X, Plus, AlertTriangle, ChevronLeft, ChevronRight, Bird } from 'lucide-react';
import { Observation } from './types';
import Dashboard from './components/Dashboard';
import Map from './components/Map';
import AnimalSpecies from './components/AnimalSpecies';
import NewObservation from './components/NewObservation';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState<'map' | 'dashboard' | 'animals'>('dashboard');
  const [showNewObservation, setShowNewObservation] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#FFCD00] text-gray-900">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-[#FFE180] rounded-lg"
            >
              {isMenuOpen ? <X size={25} /> : <Menu size={25} />}
            </button>
            <div className="flex items-center space-x-2">
              <img 
                src="https://i.ibb.co/D8ycmHz/logo-laposte.png" 
                alt="Logo La Poste" 
                className="h-8"
              />
              <h1 className="text-xl font-bold"></h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-[#FFE180] rounded-lg">
              <Bell size={24} />
            </button>
            <button className="p-2 hover:bg-[#FFE180] rounded-lg">
              <Settings size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-[#0046C0] text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Left side - Text content */}
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Optimisez <span className="text-[#FFCD00]">la collecte de données</span><br />
                publiques avec votre facteur
              </h1>
              <p className="text-lg mb-8">
                Découvrez une application innovante pour recueillir des données sociologiques, environnementales et infrastructurelles, au service des collectivités et citoyens.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-[#FFCD00] text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-[#FFE180] transition-colors">
                  Essayer maintenant
                </button>
                <button className="border-2 border-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-[#0046C0] transition-colors flex items-center gap-2">
                  <span>En savoir plus</span>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Right side - Image with vignette effect */}
            <div className="lg:w-1/2 relative">
              <div className="relative">
                <div className="absolute inset-0 rounded-[25px]" style={{
                  background: 'radial-gradient(circle at center, transparent 50%, #0046C0 100%)',
                  mixBlendMode: 'multiply',
                  pointerEvents: 'none'
                }}></div>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <nav className={`lg:w-64 ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="space-y-2">
                <button
                  onClick={() => setActiveView('dashboard')}
                  className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
                    activeView === 'dashboard' ? 'bg-[#FFCD00] bg-opacity-20 text-gray-900' : 'hover:bg-gray-50'
                  }`}
                >
                  <BarChart3 size={20} />
                  <span>Infrastructure</span>
                </button>
                <button
                  onClick={() => setActiveView('map')}
                  className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
                    activeView === 'map' ? 'bg-[#FFCD00] bg-opacity-20 text-gray-900' : 'hover:bg-gray-50'
                  }`}
                >
                  <MapPin size={20} />
                  <span>Environnement</span>
                </button>
                <button
                  onClick={() => setActiveView('dashboard')}
                  className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  <BarChart3 size={20} />
                  <span>Socio-démographique</span>
                </button>
                <button
                  onClick={() => setActiveView('dashboard')}
                  className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  <AlertTriangle size={20} />
                  <span>Remontée citoyenne</span>
                </button>
                <button
                  onClick={() => setActiveView('animals')}
                  className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
                    activeView === 'animals' ? 'bg-[#FFCD00] bg-opacity-20 text-gray-900' : 'hover:bg-gray-50'
                  }`}
                >
                  <Bird size={20} />
                  <span>Espèce animale</span>
                </button>
              </div>
            </div>
          </nav>

          {/* Main Content Area */}
          <main className="flex-1">
            {activeView === 'dashboard' && <Dashboard />}
            {activeView === 'map' && <Map />}
            {activeView === 'animals' && <AnimalSpecies />}
          </main>
        </div>

        {/* Image Grid Section */}
        <div className="mt-12 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm transform hover:scale-105 transition-transform">
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
                alt="Capteurs intelligents"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Capteurs Intelligents</h3>
              <p className="text-gray-600">Nos véhicules sont équipés de capteurs de dernière génération pour collecter des données environnementales en temps réel.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm transform hover:scale-105 transition-transform">
              <img 
                src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=800&q=80"
                alt="Analyse des données"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Analyse en Temps Réel</h3>
              <p className="text-gray-600">Nos algorithmes analysent instantanément les données collectées pour identifier les zones nécessitant une intervention.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm transform hover:scale-105 transition-transform">
              <img 
                src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80"
                alt="Collaboration urbaine"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Collaboration Urbaine</h3>
              <p className="text-gray-600">Une synergie unique entre services postaux et gestion urbaine pour des villes plus intelligentes.</p>
            </div>
          </div>

          {/* Additional Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=800&q=80"
                alt="Centre de contrôle"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Centre de Contrôle</h3>
              <p className="text-gray-600">Surveillance et analyse en temps réel des données collectées par notre flotte.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1581093458791-9d15cc3e6355?auto=format&fit=crop&w=800&q=80"
                alt="Innovation urbaine"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Innovation Urbaine</h3>
              <p className="text-gray-600">Des solutions intelligentes pour une ville plus durable et connectée.</p>
            </div>
          </div>

          {/* Full Width Image Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?auto=format&fit=crop&w=1600&q=80"
              alt="Smart City"
              className="w-full h-96 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold mb-2">La Ville de Demain</h3>
            <p className="text-gray-600">Notre vision d'une ville intelligente où chaque tournée postale contribue à l'amélioration de la qualité de vie urbaine.</p>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowNewObservation(true)}
        className="fixed bottom-6 right-6 bg-[#FFCD00] text-gray-900 p-4 rounded-full shadow-lg hover:bg-[#FFE180] transition-colors"
      >
        <Plus size={24} />
      </button>

      {/* New Observation Modal */}
      {showNewObservation && (
        <NewObservation onClose={() => setShowNewObservation(false)} />
      )}
    </div>
  );
}

export default App;