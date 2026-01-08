# 💠 Quantum-Super Cyber Intelligence Hub

> **SECURITY CLEARANCE LEVEL 4 REQUIRED**  
> *Real-time defense orchestration and quantum-integrity monitoring system.*

The **Quantum-Super Cyber Intelligence Hub** is a cutting-edge command and control (C2) dashboard designed for the next generation of cybersecurity. It integrates deep-learning threat analysis via Google's Gemini API with a high-fidelity diagnostic suite for quantum-encrypted networks.

---

## 🛰️ System Architecture

The hub is built on a distributed reactive architecture, ensuring sub-millisecond telemetry updates across four primary modules:

### 1. Neural Threat Topology (D3.js Core)
- **Engine**: Custom force-directed graph algorithm.
- **Function**: Visualizes the "Neural Mesh" of global network nodes.
- **Diagnostics**: Identifies intrusion vectors in real-time. Red nodes represent confirmed breaches, while blue/cyan nodes represent secure segments.
- **Overlay**: Includes a synchronized "Pulse Scan" that refreshes node status across the viewport.

### 2. Quantum Encryption Diagnostics (Q-Diag)
- **Monitoring**: Tracks Qubit key strength (fixed at 8192-bit) and Entanglement Decay.
- **Diagnostic HUD**: Hovering over metrics activates a high-fidelity glass-morphism HUD providing:
  - **Diagnostic Summary**: Technical breakdown of the specific metric.
  - **Potential Impact**: Analysis of the current value's risk to the network.
  - **Remediation Protocol**: AI-generated defense steps (e.g., *Inject Neural Squelch*, *Resonate Phase Array*).
- **Integrity Alert System**: 
  - **Critical Threshold**: Integrity < 98.0% or Decay > 0.15%/s.
  - **Visual Protocol**: Triggers `RED_ALERT` state with emergency banners and haptic-visual feedback.

### 3. Detailed Threat Simulation
- **Vulnerability Engine**: Simulates advanced attack vectors with deep metadata.
- **Data Points**: Displays specific **Origin** (e.g., *Sub-sector 7G*, *Edge Router 0xAF*) and **Impact** analysis for every injected threat.
- **Logging**: Detailed threat signatures are recorded in the system vulnerabilities cache for forensic review.

### 4. Gemini AI "Core Intelligence"
- **Model**: `gemini-3-pro-preview`
- **Role**: Strategic Cyber-Defense Assistant.
- **Capabilities**: Forensic analysis, threat actor profiling, and automated response strategy formulation via `thinkingConfig` deep reasoning.

---

## 🎨 Visual Design Philosophy

The Hub utilizes a **High-Contrast Cyber-Noir** aesthetic:
- **Palette**: `Slate-950` (Deep Void) base with `Cyan-400` (Information) and `Indigo-500` (Neural Energy) accents. `Rose-500` is reserved strictly for `CRITICAL` status.
- **Typography**: `Orbitron` for cinematic headers and `JetBrains Mono` for high-readability technical data.
- **HUD Effects**: Semi-transparent backdrops with micro-borders and glow-shadows to simulate a futuristic heads-up display.

---

## 🛠 Operational Setup

### Environment Variables
The system requires a Gemini API key to initialize the Core Intelligence module.
```env
API_KEY=your_google_gemini_api_key
```

### Key Components
- `App.tsx`: Global state orchestrator and layout engine.
- `QuantumEncryptionDiagnostics.tsx`: Features the high-fidelity Diagnostic HUD.
- `ThreatMap.tsx`: D3-based topology visualization.
- `AICommandCenter.tsx`: Interface for the Gemini-powered defense advisor.

## 🛡️ Security Disclaimer
This application is a highly sophisticated simulation. In production environments, the data-feed hooks in `App.tsx` should be connected to live ELK stacks, Prometheus exporters, or QKD (Quantum Key Distribution) hardware interfaces.

---

*“In the quantum realm, the only constant is vigilance.”*