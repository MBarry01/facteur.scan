export interface Observation {
  id: string;
  type: 'infrastructure' | 'environnement' | 'socio' | 'citoyen' | 'faune';
  description: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  status: 'pending' | 'verified' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  photos?: string[];
  species?: {
    name: string;
    category: 'mammifere' | 'oiseau' | 'reptile' | 'amphibien' | 'insecte';
    count?: number;
    behavior?: string;
  };
}

export interface DashboardStats {
  totalObservations: number;
  resolvedIssues: number;
  pendingIssues: number;
  criticalIssues: number;
  animalSpecies: number;
}