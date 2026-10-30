import React, { useState, useMemo } from 'react';
import { 
  Package, 
  Search, 
  Calculator, 
  Bell, 
  ShieldCheck, 
  Truck, 
  Globe, 
  FileText, 
  ArrowRight, 
  CheckCircle, 
  X, 
  User, 
  Lock, 
  Mail, 
  Upload, 
  AlertCircle,
  Menu,
  ChevronRight,
  Plane,
  Anchor,
  Box
} from 'lucide-react';

export default function App() {
  // Mobile Nav Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Auth Modal State
  const [authModal, setAuthModal] = useState({ open: false, mode: 'login' }); // 'login' | 'register'
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [authResponse, setAuthResponse] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Tracking Search State
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [isSearchingTracking, setIsSearchingTracking] = useState(false);

  // Calculator State
  const [calc, setCalc] = useState({
    length: '30',
    width: '20',
    height: '15',
    weight: '2.5',
    unit: 'kg' // 'kg' | 'lb'
  });

  // Pre-Alert State
  const [preAlert, setPreAlert] = useState({
    store: 'Amazon',
    tracking: '',
    value: '',
    description: '',
    fileName: ''
  });
  const [preAlertSubmitted, setPreAlertSubmitted] = useState(false);

  // Calculated values for Shipping Calculator
  const calcResults = useMemo(() => {
    const l = parseFloat(calc.length) || 0;
    const w = parseFloat(calc.width) || 0;
    const h = parseFloat(calc.height) || 0;
    const actualWt = parseFloat(calc.weight) || 0;

    // Volumetric weight formula: (L x W x H) / 5000 in cm/kg
    const volWeightKg = (l * w * h) / 5000;
    
    // Convert if unit is lbs
    const actualKg = calc.unit === 'lb' ? actualWt * 0.453592 : actualWt;
    const chargeableKg = Math.max(actualKg, volWeightKg);

    // Base rate: $8.50 per kg (chargeable) + $5 base handling fee
    const estimatedCost = chargeableKg > 0 ? (chargeableKg * 8.5) + 5 : 0;

    return {
      volumetricKg: volWeightKg.toFixed(2),
      chargeableKg: chargeableKg.toFixed(2),
      estimatedCost: estimatedCost.toFixed(2)
    };
  }, [calc]);

  // Handle Quick Tracking Search
  const handleTrackingSearch = (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;

    setIsSearchingTracking(true);
    setTrackingResult(null);

    // Simulate API Response delay
    setTimeout(() => {
      setIsSearchingTracking(false);
      setTrackingResult({
        id: trackingNumber.toUpperCase(),
        status: 'En Tránsito Internacional',
        origin: 'Almacén Principal Miami, FL',
        destination: 'La Paz / Santa Cruz, Bolivia',
        eta: '3 - 5 Días Hábiles',
        history: [
          { date: 'Hoy, 08:30 AM', event: 'Procesado en Hub de Exportación Miami', icon: Plane },
          { date: 'Ayer, 02:15 PM', event: 'Recibido e Inspeccionado en Almacén', icon: Box },
          { date: 'Hace 2 días', event: 'Pre-alerta registrada por cliente', icon: CheckCircle }
        ]
      });
    }, 800);
  };

  // Handle Auth Submission
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthResponse(null);

    setTimeout(() => {
      setAuthLoading(false);
      if (authModal.mode === 'register') {
        setAuthResponse({
          success: true,
          message: 'Usuario registrado exitosamente',
          user: { name: authForm.name || 'Usuario Tilcayo', email: authForm.email }
        });
      } else {
        setAuthResponse({
          success: true,
          message: 'Inicio de sesión exitoso',
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.simulacion_token_tilcayo_dev',
          token_type: 'bearer'
        });
      }
    }, 1000);
  };

  // Handle Pre-Alert Submission
  const handlePreAlertSubmit = (e) => {
    e.preventDefault();
    if (!preAlert.tracking) return;
    setPreAlertSubmitted(true);
    setTimeout(() => {
      setPreAlertSubmitted(false);
      setPreAlert({ store: 'Amazon', tracking: '', value: '', description: '', fileName: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* 1. HEADER / NAVBAR */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="w-11 h-11 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Box className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent">
                TILCAYO
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-widest text-cyan-400">
                Shipping & Cargo
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#inicio" className="hover:text-cyan-400 transition-colors">Inicio</a>
            <a href="#cotizador" className="hover:text-cyan-400 transition-colors">Cotizador</a>
            <a href="#pre-alerta" className="hover:text-cyan-400 transition-colors">Pre-Alertas</a>
            <a href="#cobertura" className="hover:text-cyan-400 transition-colors">Cobertura</a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => { setAuthModal({ open: true, mode: 'login' }); setAuthResponse(null); }}
              className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => { setAuthModal({ open: true, mode: 'register' }); setAuthResponse(null); }}
              className="px-5 py-2.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-xl hover:from-cyan-300 hover:to-cyan-200 transition-all shadow-md shadow-cyan-500/20 active:scale-95"
            >
              Registrarse
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
            <a href="#inicio" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-cyan-400">Inicio</a>
            <a href="#cotizador" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-cyan-400">Cotizador</a>
            <a href="#pre-alerta" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-cyan-400">Pre-Alertas</a>
            <a href="#cobertura" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-cyan-400">Cobertura</a>
            <div className="pt-2 flex flex-col space-y-2">
              <button
                onClick={() => { setIsMobileMenuOpen(false); setAuthModal({ open: true, mode: 'login' }); }}
                className="w-full py-2.5 text-center text-slate-300 border border-slate-700 rounded-lg"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => { setIsMobileMenuOpen(false); setAuthModal({ open: true, mode: 'register' }); }}
                className="w-full py-2.5 text-center text-slate-950 font-semibold bg-cyan-400 rounded-lg"
              >
                Registrarse
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section id="inicio" className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        {/* Decorative Grid and Blur background */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 text-xs font-medium mb-6">
              <ShieldCheck className="w-4 h-4" />
              <span>Casillero Internacional & Logística Asistida por IA</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
              Logística e Importación Express <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Sin Complicaciones
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-400 leading-relaxed font-normal">
              Gestiona tus envíos internacionales, rastrea tus paquetes en tiempo real y simplifica la pre-alerta de tus compras de forma segura.
            </p>

            {/* Quick Tracking Search Bar */}
            <div className="mt-10 max-w-xl mx-auto">
              <form onSubmit={handleTrackingSearch} className="p-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <div className="relative w-full flex-1">
                  <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Ingresa tu número de tracking (ej: TCK-8923)"
                    className="w-full bg-transparent pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSearchingTracking}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center justify-center space-x-2 shadow-md shadow-cyan-500/20"
                >
                  {isSearchingTracking ? (
                    <span>Buscando...</span>
                  ) : (
                    <>
                      <span>Rastrear Envío</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Tracking Result Card */}
              {trackingResult && (
                <div className="mt-6 p-6 bg-slate-900/90 border border-cyan-500/30 rounded-2xl text-left shadow-2xl animate-fade-in">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div>
                      <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">Guía No.</span>
                      <h4 className="text-lg font-bold text-cyan-400">{trackingResult.id}</h4>
                    </div>
                    <span className="px-3 py-1 bg-cyan-950 text-cyan-400 border border-cyan-800/60 rounded-full text-xs font-semibold">
                      {trackingResult.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 my-4 text-xs">
                    <div>
                      <span className="text-slate-500 block">Origen:</span>
                      <span className="font-medium text-slate-200">{trackingResult.origin}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Destino:</span>
                      <span className="font-medium text-slate-200">{trackingResult.destination}</span>
                    </div>
                  </div>

                  {/* Status Timeline */}
                  <div className="mt-4 pt-2 border-t border-slate-800/80 space-y-3">
                    {trackingResult.history.map((item, idx) => {
                      const IconComponent = item.icon;
                      return (
                        <div key={idx} className="flex items-start space-x-3 text-xs">
                          <div className="p-1.5 bg-slate-800 rounded-lg text-cyan-400 mt-0.5">
                            <IconComponent className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-200">{item.event}</p>
                            <p className="text-slate-500 text-[11px]">{item.date}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE SHIPPING CALCULATOR */}
      <section id="cotizador" className="py-20 bg-slate-900/50 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/50 text-blue-400 text-xs font-semibold mb-3">
              <Calculator className="w-3.5 h-3.5" />
              <span>Transparencia Total</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white">Cotizador Express de Envíos</h2>
            <p className="mt-3 text-slate-400 text-sm">
              Calcula en tiempo real el costo estimado según dimensiones y peso de tus paquetes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
            {/* Input Form */}
            <div className="lg:col-span-7 bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <span>Dimensiones del Paquete</span>
                </h3>
                {/* Unit Switcher */}
                <div className="inline-flex p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                  <button
                    onClick={() => setCalc({ ...calc, unit: 'kg' })}
                    className={`px-3 py-1 rounded-md font-semibold transition-all ${calc.unit === 'kg' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                  >
                    Kilogramos (kg)
                  </button>
                  <button
                    onClick={() => setCalc({ ...calc, unit: 'lb' })}
                    className={`px-3 py-1 rounded-md font-semibold transition-all ${calc.unit === 'lb' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                  >
                    Libras (lb)
                  </button>
                </div>
              </div>

              {/* Dimensions Inputs Grid */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Largo (cm)</label>
                  <input
                    type="number"
                    value={calc.length}
                    onChange={(e) => setCalc({ ...calc, length: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Ancho (cm)</label>
                  <input
                    type="number"
                    value={calc.width}
                    onChange={(e) => setCalc({ ...calc, width: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Alto (cm)</label>
                  <input
                    type="number"
                    value={calc.height}
                    onChange={(e) => setCalc({ ...calc, height: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Weight Input */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Peso Real ({calc.unit})
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={calc.weight}
                  onChange={(e) => setCalc({ ...calc, weight: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs text-slate-400 leading-relaxed">
                <p>
                  * El costo de envío se liquida sobre el mayor valor entre el peso real y el peso volumétrico <span className="text-slate-300 font-mono">(Largo x Ancho x Alto / 5000)</span> según estándar IATA.
                </p>
              </div>
            </div>

            {/* Live Results Card */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-6">
                Resumen de Cotización
              </h4>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Peso Volumétrico:</span>
                  <span className="font-semibold text-slate-200">{calcResults.volumetricKg} kg</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Peso Facturable Aplicado:</span>
                  <span className="font-semibold text-cyan-400">{calcResults.chargeableKg} kg</span>
                </div>
                <div className="pt-4 border-t border-slate-800 flex justify-between items-baseline">
                  <span className="text-sm font-semibold text-slate-300">Estimado Total:</span>
                  <div className="text-right">
                    <span className="text-3xl font-black text-white">${calcResults.estimatedCost}</span>
                    <span className="block text-[11px] text-slate-500">USD (Impuestos no incl.)</span>
                  </div>
                </div>
              </div>

              <a
                href="#pre-alerta"
                className="w-full py-3.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold rounded-xl flex items-center justify-center space-x-2 hover:opacity-95 transition-opacity shadow-lg shadow-cyan-500/20"
              >
                <Bell className="w-4 h-4" />
                <span>Pre-alertar este paquete</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRE-ALERT & "TRAMPA DE DATOS" SECTION */}
      <section id="pre-alerta" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Explanatory Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/50 text-cyan-400 text-xs font-semibold">
                <FileText className="w-3.5 h-3.5" />
                <span>Gestión Digital de Invoices</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Pre-Alerta Inteligente y "Trampa de Datos"
              </h2>

              <p className="text-slate-400 text-base leading-relaxed">
                Registra tus compras en tiendas de EE. UU. y China antes de que arriben a nuestro almacén. Nuestra arquitectura extrae la información clave de tu factura para agilizar el despacho aduanero inmediatamente.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-3">
                  <div className="p-1 bg-cyan-500/10 text-cyan-400 rounded-lg mt-1">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-slate-200">Procesamiento Documental Automático</h5>
                    <p className="text-xs text-slate-400">Soporte directo para guardar los metadatos en formato estructurado.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-1 bg-cyan-500/10 text-cyan-400 rounded-lg mt-1">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-slate-200">Notificación de Arribo en Tiempo Real</h5>
                    <p className="text-xs text-slate-400">Vinculación instantánea al código de casillero del cliente.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Demo Form */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl relative">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center justify-between">
                <span>Registrar Pre-Alerta de Compra</span>
                <span className="text-xs font-normal text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded-full border border-cyan-800/50">
                  Modo Demostración
                </span>
              </h3>

              {preAlertSubmitted ? (
                <div className="p-8 bg-slate-950/80 rounded-2xl border border-cyan-500/50 text-center space-y-4 animate-fade-in">
                  <div className="w-12 h-12 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">¡Pre-Alerta Registrada!</h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    El tracking <span className="text-cyan-400 font-mono">{preAlert.tracking || 'TCK-DEMO-123'}</span> ha sido sincronizado con éxito en la plataforma de Tilcayo.
                  </p>
                </div>
              ) : (
                <form onSubmit={handlePreAlertSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Tienda de Origen</label>
                      <select
                        value={preAlert.store}
                        onChange={(e) => setPreAlert({ ...preAlert, store: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
                      >
                        <option value="Amazon">Amazon US</option>
                        <option value="eBay">eBay</option>
                        <option value="Shein">Shein</option>
                        <option value="AliExpress">AliExpress</option>
                        <option value="Otro">Otra Tienda</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Valor Declarado (USD)</label>
                      <input
                        type="number"
                        placeholder="Ej. 149.99"
                        value={preAlert.value}
                        onChange={(e) => setPreAlert({ ...preAlert, value: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Número de Tracking Original</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. TBA304958201000 (USPS, FedEx, UPS)"
                      value={preAlert.tracking}
                      onChange={(e) => setPreAlert({ ...preAlert, tracking: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  {/* Simulated File Upload Area */}
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Adjuntar Factura / Invoice (PDF / PNG)</label>
                    <div className="border-2 border-dashed border-slate-800 hover:border-cyan-500/50 transition-colors bg-slate-950/50 rounded-2xl p-6 text-center cursor-pointer">
                      <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                      <p className="text-xs text-slate-300 font-medium">Arrastra tu comprobante o haz clic para examinar</p>
                      <p className="text-[10px] text-slate-500 mt-1">Soporta PDF, JPG, PNG hasta 10MB</p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-cyan-400 text-slate-950 font-bold rounded-xl text-sm hover:bg-cyan-300 transition-colors mt-2"
                  >
                    Guardar Pre-Alerta
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. COVERAGE & BENEFITS GRID */}
      <section id="cobertura" className="py-20 bg-slate-900/40 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-white">¿Por qué elegir Tilcayo Shipping?</h2>
            <p className="mt-3 text-slate-400 text-sm">Infraestructura logística optimizada para pequeñas compras y grandes importadores.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Box,
                title: 'Envíos Consolidados',
                desc: 'Agrupa múltiples paquetes en un solo despacho para reducir drásticamente los costos de flete.'
              },
              {
                icon: FileText,
                title: 'Estructura JSONB Flexible',
                desc: 'Soporte de datos ágil en backend para guardar atributos variables de manifiestos y paquetería.'
              },
              {
                icon: Globe,
                title: 'Rastreo Multiorigen 24/7',
                desc: 'Monitoreo constante desde la recepción en Miami hasta la entrega en destino final.'
              },
              {
                icon: ShieldCheck,
                title: 'Asesoría Aduanera',
                desc: 'Cumplimiento normativo y nacionalización segura respaldada por expertos en comercio exterior.'
              }
            ].map((item, index) => {
              const IconComp = item.icon;
              return (
                <div
                  key={index}
                  className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-cyan-500/40 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors mb-4">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE AUTH MODAL (LOGIN / REGISTER) */}
      {authModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-6 sm:p-8 relative shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setAuthModal({ ...authModal, open: false })}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-6">
              <div className="w-10 h-10 bg-cyan-500/10 text-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-3">
                <User className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {authModal.mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {authModal.mode === 'login' 
                  ? 'Accede a tu panel de casillero Tilcayo' 
                  : 'Regístrate para obtener tu dirección de casillero gratuita'}
              </p>
            </div>

            {/* Response Toast Banner */}
            {authResponse && (
              <div className="mb-4 p-3 bg-cyan-950/90 border border-cyan-500/50 rounded-xl text-xs text-cyan-200">
                <p className="font-bold flex items-center space-x-1.5 mb-1">
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                  <span>{authResponse.message}</span>
                </p>
                {authResponse.access_token && (
                  <p className="font-mono text-[10px] break-all opacity-80 mt-1 bg-slate-950 p-1.5 rounded">
                    Token: {authResponse.access_token}
                  </p>
                )}
              </div>
            )}

            {/* Form matching FastAPI schemas */}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authModal.mode === 'register' && (
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Nombre Completo</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      required
                      placeholder="Ej. Carlos Mendoza"
                      value={authForm.name}
                      onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Correo Electrónico</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="usuario@ejemplo.com"
                    value={authForm.email}
                    onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Contraseña</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={authForm.password}
                    onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold rounded-xl text-sm hover:opacity-95 transition-opacity mt-2"
              >
                {authLoading 
                  ? 'Procesando...' 
                  : (authModal.mode === 'login' ? 'Ingresar a la Plataforma' : 'Crear Mi Cuenta')}
              </button>
            </form>

            {/* Toggle Mode */}
            <div className="mt-6 text-center text-xs text-slate-400">
              {authModal.mode === 'login' ? (
                <span>
                  ¿No tienes cuenta?{' '}
                  <button
                    onClick={() => { setAuthModal({ open: true, mode: 'register' }); setAuthResponse(null); }}
                    className="text-cyan-400 font-semibold hover:underline"
                  >
                    Regístrate aquí
                  </button>
                </span>
              ) : (
                <span>
                  ¿Ya tienes cuenta?{' '}
                  <button
                    onClick={() => { setAuthModal({ open: true, mode: 'login' }); setAuthResponse(null); }}
                    className="text-cyan-400 font-semibold hover:underline"
                  >
                    Inicia sesión
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 7. FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-cyan-500/20 text-cyan-400 rounded-lg flex items-center justify-center">
              <Box className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-300">Tilcayo Shipping S.R.L.</span>
          </div>

          <p>© {new Date().getFullYear()} Tilcayo Shipping. Plataforma de Logística Internacional. Todos los derechos reservados.</p>

          <div className="flex space-x-6 text-slate-400">
            <a href="#" className="hover:text-cyan-400">Términos de Servicio</a>
            <a href="#" className="hover:text-cyan-400">Privacidad</a>
            <a href="#" className="hover:text-cyan-400">Soporte</a>
          </div>
        </div>
      </footer>
    </div>
  );
}