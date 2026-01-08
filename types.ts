
export interface ThreatNode {
  id: string;
  name: string;
  level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  type: string;
  location: string;
  timestamp: string;
}

export interface VulnerabilityDetail {
  name: string;
  impact: string;
  origin: string;
  timestamp: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  mitigation: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'INFO' | 'WARNING' | 'ERROR' | 'SYSTEM';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface SystemMetrics {
  cpu: number;
  memory: number;
  network: number;
  quantumStability: number;
}

export interface QuantumDiagnostics {
  keyStrength: number; // in Qubits
  entanglementDecay: number; // percentage
  noiseLevel: number; // dB
  activeVulnerabilities: (string | VulnerabilityDetail)[];
  integrityScore: number;
}

export interface ScriptMetadata {
  id: string;
  filename: string;
  language: 'PHP' | 'PYTHON' | 'SQL';
  content: string;
  status: 'IDLE' | 'RUNNING' | 'SUCCESS' | 'ERROR';
}

export interface NewsItem {
  title: string;
  url: string;
  snippet: string;
}

export interface SatelliteIntercept {
  id: string;
  lat: number;
  lng: number;
  target: string;
  intensity: number;
}
