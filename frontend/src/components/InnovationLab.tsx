import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Brain, Cpu, Database, Zap, Activity, Radio, Thermometer, 
  ArrowRight, Share2, Network, Volume2, Target, RotateCw, Sun, Waves, 
  Magnet, MessageSquare, Bot, Send, Globe,
  Power, Wifi, Navigation, Lightbulb, RefreshCcw, Megaphone, Disc, Fingerprint,
  CheckCircle
} from 'lucide-react';

const getColorHex = (color: string) => {
  const colors: { [key: string]: string } = {
    'red-500': '#ef4444',
    'yellow-500': '#eab308',
    'red-600': '#dc2626',
    'yellow-400': '#facc15',
    'orange-500': '#f97316',
    'indigo-500': '#6366f1',
    'orange-400': '#fb923c',
    'red-400': '#f87171',
    'yellow-300': '#fde047',
    'slate-400': '#94a3b8',
    'rose-500': '#f43f5e',
    'cyan-400': '#22d3ee',
    'amber-600': '#d97706',
    'orange-300': '#fdba74',
    'gray-400': '#9ca3af',
    'indigo-400': '#818cf8',
    'red-300': '#fca5a5',
    'yellow-600': '#ca8a04',
    'orange-600': '#ea580c',
    'rose-400': '#fb7185',
    'amber-400': '#fbbf24',
  };
  return colors[color] || '#f97316';
};

const InnovationLab: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'ai' | 'iot' | 'sentinel'>('ai');
  const [activeSensor, setActiveSensor] = useState('heartbeat');
  const [sensorData, setSensorData] = useState({
    val: 72,
    cpu: 42,
    latency: 12,
    connectivity: 98
  });
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [isManual, setIsManual] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [waveformData, setWaveformData] = useState<number[]>(Array(40).fill(20));
  const [agentStep, setAgentStep] = useState(0);
  const [username, setUsername] = useState<string>(localStorage.getItem('lab_username') || '');
  const [showUserModal, setShowUserModal] = useState(false);
  const [labStatus, setLabStatus] = useState({
    last_user: 'System',
    last_action: 'Initialized',
    last_sensor: 'All',
    timestamp: new Date().toISOString()
  });

  const sensors = [
    { id: 'heartbeat', icon: <Activity />, color: 'text-red-500', unit: 'BPM', type: 'pulse' },
    { id: 'joystick', icon: <Network />, color: 'text-orange-500', unit: 'X/Y', type: 'coord' },
    { id: 'flame', icon: <Zap />, color: 'text-orange-500', unit: 'ADC', type: 'bars' },
    { id: 'sound', icon: <Volume2 />, color: 'text-yellow-500', unit: 'dB', type: 'bars' },
    { id: 'temp', icon: <Thermometer />, color: 'text-orange-500', unit: '°C', type: 'area' },
    { id: 'laser', icon: <Target />, color: 'text-red-600', unit: 'STATE', type: 'binary' },
    { id: 'tilt', icon: <RotateCw />, color: 'text-orange-500', unit: 'DEG', type: 'gauge' },
    { id: 'light', icon: <Sun />, color: 'text-yellow-400', unit: 'LUX', type: 'area' },
    { id: 'vibration', icon: <Waves />, color: 'text-orange-400', unit: 'Hz', type: 'bars' },
    { id: 'hall', icon: <Magnet />, color: 'text-indigo-500', unit: 'mT', type: 'area' },
    { id: 'relay', icon: <Power />, color: 'text-orange-500', unit: 'STATE', type: 'binary' },
    { id: 'ir_receiver', icon: <Wifi />, color: 'text-orange-400', unit: 'RAW', type: 'pulse' },
    { id: 'obstacle', icon: <Navigation />, color: 'text-red-400', unit: 'DIST', type: 'gauge' },
    { id: 'touch', icon: <Fingerprint />, color: 'text-orange-500', unit: 'TOUCH', type: 'binary' },
    { id: 'led_rgb', icon: <Lightbulb />, color: 'text-yellow-300', unit: 'RGB', type: 'color' },
    { id: 'encoder', icon: <RefreshCcw />, color: 'text-white', unit: 'STEP', type: 'gauge' },
    { id: 'buzzer', icon: <Megaphone />, color: 'text-rose-500', unit: 'FREQ', type: 'bars' },
    { id: 'reed', icon: <Activity />, color: 'text-cyan-400', unit: 'MAG', type: 'binary' },
    { id: 'knock', icon: <Disc />, color: 'text-amber-600', unit: 'VIB', type: 'bars' },
    { id: 'line_sensor', icon: <Navigation />, color: 'text-orange-400', unit: 'LINE', type: 'binary' },
    { id: 'magic_cup', icon: <Lightbulb />, color: 'text-orange-400', unit: 'TILT', type: 'gauge' },
    { id: 'passive_buzzer', icon: <Megaphone />, color: 'text-red-400', unit: 'PWM', type: 'bars' },
    { id: 'digital_temp', icon: <Thermometer />, color: 'text-orange-300', unit: '°C', type: 'area' },
    { id: 'broken_light', icon: <Target />, color: 'text-white', unit: 'BREAK', type: 'binary' },
    { id: 'mercury', icon: <RotateCw />, color: 'text-indigo-400', unit: 'ANGLE', type: 'gauge' },
    { id: 'led_7color', icon: <Lightbulb />, color: 'text-orange-400', unit: 'COLOR', type: 'color' },
    { id: 'button', icon: <Zap />, color: 'text-orange-500', unit: 'PRESS', type: 'binary' },
    { id: 'tracking', icon: <Activity />, color: 'text-orange-600', unit: 'TRACK', type: 'coord' },
    { id: 'ir_emit', icon: <Wifi />, color: 'text-red-300', unit: 'TX', type: 'pulse' },
    { id: 'analog_temp', icon: <Thermometer />, color: 'text-orange-300', unit: 'ADC', type: 'area' },
    { id: 'dual_color', icon: <Lightbulb />, color: 'text-yellow-600', unit: 'BI', type: 'color' },
    { id: 'analog_hall', icon: <Magnet />, color: 'text-orange-600', unit: 'GAUSS', type: 'area' },
    { id: 'tap_module', icon: <Waves />, color: 'text-rose-400', unit: 'TAP', type: 'bars' },
    { id: 'ball_switch', icon: <RotateCw />, color: 'text-amber-400', unit: 'ROLL', type: 'gauge' },
  ];

  // Mock real-time sensor updates and logs
  useEffect(() => {
    const interval = setInterval(() => {
      if (isManual) {
        // In manual mode, we just keep the current waveform static or slightly jittering
        // but not random-walking far from the manual value
        setWaveformData(prev => [...prev.slice(1), sensorData.val + (Math.random() - 0.5) * 2]);
        return;
      }
      let newVal = 0;
      const now = Date.now();
      
      switch(activeSensor) {
        case 'heartbeat':
          newVal = 40 + Math.sin(now / 150) * 15 + (Math.random() > 0.92 ? 40 : 0);
          break;
        case 'sound':
          newVal = 20 + Math.random() * 70;
          break;
        case 'temp':
          newVal = 50 + Math.sin(now / 4000) * 8 + Math.random() * 2;
          break;
        case 'flame':
          newVal = Math.random() > 0.96 ? 85 + Math.random() * 15 : 12 + Math.random() * 4;
          break;
        case 'vibration':
          newVal = Math.random() > 0.85 ? 40 + Math.random() * 55 : 8;
          break;
        case 'joystick':
          newVal = 50 + Math.sin(now / 800) * 25 + Math.cos(now / 1200) * 15;
          break;
        case 'light':
          newVal = 60 + Math.sin(now / 2000) * 30;
          break;
        case 'relay':
          newVal = Math.random() > 0.95 ? 100 : 0;
          break;
        case 'ir_receiver':
          newVal = Math.floor(Math.random() * 1024);
          break;
        case 'obstacle':
          newVal = 10 + Math.random() * 90;
          break;
        case 'touch':
          newVal = Math.random() > 0.9 ? 100 : 0;
          break;
        case 'led_rgb':
          newVal = 50 + Math.sin(now / 1000) * 50;
          break;
        case 'encoder':
          newVal = (Math.floor(now / 500) % 20) * 5;
          break;
        case 'buzzer':
          newVal = 200 + Math.sin(now / 100) * 150;
          break;
        case 'reed':
          newVal = Math.random() > 0.9 ? 80 : 20;
          break;
        case 'knock':
          newVal = Math.random() > 0.98 ? 95 : 5;
          break;
        case 'line_sensor':
          newVal = Math.random() > 0.5 ? 90 : 10;
          break;
        case 'magic_cup':
          newVal = Math.sin(now / 500) * 50 + 50;
          break;
        case 'passive_buzzer':
          newVal = 440 + Math.sin(now / 100) * 100;
          break;
        case 'digital_temp':
          newVal = 24 + Math.sin(now / 10000) * 2;
          break;
        case 'broken_light':
          newVal = Math.random() > 0.99 ? 0 : 100;
          break;
        case 'mercury':
          newVal = Math.cos(now / 800) * 90;
          break;
        case 'led_7color':
          newVal = (Math.floor(now / 200) % 7) * 14;
          break;
        case 'button':
          newVal = Math.random() > 0.97 ? 100 : 0;
          break;
        case 'tracking':
          newVal = 50 + Math.sin(now / 300) * 40;
          break;
        case 'ir_emit':
          newVal = Math.random() > 0.8 ? 1024 : 0;
          break;
        case 'analog_temp':
          newVal = 300 + Math.sin(now / 5000) * 100;
          break;
        case 'dual_color':
          newVal = Math.sin(now / 400) * 100;
          break;
        case 'analog_hall':
          newVal = 512 + Math.cos(now / 1500) * 200;
          break;
        case 'tap_module':
          newVal = Math.random() > 0.95 ? 90 : 10;
          break;
        case 'ball_switch':
          newVal = Math.cos(now / 1200) * 180;
          break;
        default:
          newVal = Math.random() * 50 + 20;
      }
      
      if (activeSensor === 'joystick' || activeSensor === 'tracking') {
        setCoords({
          x: 50 + Math.sin(now / 800) * 30 + Math.cos(now / 1200) * 10,
          y: 50 + Math.cos(now / 800) * 30 + Math.sin(now / 1500) * 10
        });
      }

      setWaveformData(prev => [...prev.slice(1), newVal]);
      
      setSensorData(() => ({
        val: +newVal.toFixed(1),
        cpu: Math.floor(Math.random() * 15 + 35),
        latency: Math.floor(Math.random() * 4 + 8),
        connectivity: Math.floor(Math.random() * 2 + 97)
      }));

      if (Math.random() > 0.8) {
        setLogs(() => [
          `[${new Date().toLocaleTimeString()}] Agent: ${activeSensor} telemetry stabilized`,
          ...logs.slice(0, 4)
        ]);
      }
    }, 150);
    return () => clearInterval(interval);
  }, [activeSensor, isManual, sensorData.val]);

  // Fetch initial lab status and poll for updates
  useEffect(() => {
    const fetchStatus = () => {
      fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/lab/status`)
        .then(res => res.json())
        .then(data => {
          setLabStatus(data);
          // Sync manual mode from server state
          setIsManual(data.manual_mode);
        })
        .catch(err => console.error("Failed to fetch lab status", err));
    };

    fetchStatus();
    const pollInterval = setInterval(fetchStatus, 5000);
    return () => clearInterval(pollInterval);
  }, []);

  const triggerAction = async (action: string, sensor: string, value?: string) => {
    if (!username) {
      setShowUserModal(true);
      return false;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/lab/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, action, sensor, value })
      });
      const data = await res.json();
      if (data.status === 'success') {
        setLabStatus(data.state);
        return true;
      }
    } catch (err) {
      console.error("Action failed", err);
    }
    return false;
  };

  // Agent Step Animation
  useEffect(() => {
    if (activeTab === 'sentinel') {
      const interval = setInterval(() => {
        setAgentStep(step => (step + 1) % 4);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  return (
    <section id="innovation-lab" className="py-24 relative overflow-hidden bg-[#030712]">
      <div className="absolute inset-0 z-0 opacity-40">
        <img 
          src="/ai_iot_lab_background.png" 
          alt="Innovation Lab Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-sm font-bold tracking-widest uppercase mb-4 inline-block"
          >
            {t('lab.badge', 'Innovation Lab')}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6"
          >
            {t('lab.title.1', 'The Future')} <span className="gradient-text">{t('lab.title.2', 'Engineered')}</span>
          </motion.h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-900/50 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'ai' 
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' 
                : 'text-white hover:text-white'
              }`}
            >
              <Brain className="w-5 h-5" />
              {t('lab.tab.ai', 'AI Forge')}
            </button>
            <button
              onClick={() => setActiveTab('iot')}
              className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'iot' 
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' 
                : 'text-white hover:text-white'
              }`}
            >
              <Radio className="w-5 h-5" />
              {t('lab.tab.iot', 'IoT Ecosystem')}
            </button>
            <button
              onClick={() => setActiveTab('sentinel')}
              className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'sentinel' 
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' 
                : 'text-white hover:text-white'
              }`}
            >
              <Bot className="w-5 h-5" />
              {t('lab.tab.sentinel', 'AI & Bot Solutions')}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'ai' && (
            <motion.div
              key="ai-lab"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
            >
              <div className="bg-gray-900/40 backdrop-blur-md rounded-[2.5rem] border border-white/5 p-10 flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <Database className="text-orange-500" />
                    {t('lab.ai.rag.title', 'RAG Pipelines')}
                  </h3>
                  <div className="space-y-8 relative">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
                        <Share2 />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-white font-bold mb-1">{t('lab.ai.rag.s1.title', 'Data Ingestion')}</h4>
                        <p className="text-white text-sm">{t('lab.ai.rag.s1.desc', 'Vectorizing unstructured data into high-dimensional space.')}</p>
                      </div>
                    </div>
                    <div className="absolute left-8 top-16 bottom-16 w-px bg-gradient-to-b from-orange-500 to-orange-500 opacity-20" />
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
                        <Network />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-white font-bold mb-1">{t('lab.ai.rag.s2.title', 'Semantic Retrieval')}</h4>
                        <p className="text-white text-sm">{t('lab.ai.rag.s2.desc', 'Context-aware searching using embedding similarity.')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
                        <Brain />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-white font-bold mb-1">{t('lab.ai.rag.s3.title', 'LLM Synthesis')}</h4>
                        <p className="text-white text-sm">{t('lab.ai.rag.s3.desc', 'Generating hallucination-free, grounded responses.')}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="mt-12 flex items-center gap-2 text-orange-400 font-bold hover:gap-4 transition-all">
                  {t('lab.ai.cta', 'Build Custom AI')} <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-gradient-to-br from-orange-600/20 to-orange-600/20 backdrop-blur-md rounded-[2.5rem] border border-orange-500/20 p-10">
                <div className="h-full flex flex-col">
                  <div className="flex-grow">
                    <div className="inline-block px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-lg text-orange-400 text-xs font-bold mb-6">
                      {t('lab.ai.status', 'DEPLOYED')}
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">{t('lab.ai.agents.title', 'Autonomous Agents')}</h3>
                    <p className="text-white leading-relaxed mb-8">
                      {t('lab.ai.agents.desc', 'We develop multi-agent systems that can autonomously plan, reason, and execute complex business processes—from automated customer support to advanced data research.')}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {['ReAct Prompting', 'Chain-of-Thought', 'Auto-GPT', 'BabyAGI'].map(tag => (
                        <div key={tag} className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-white text-sm text-center">
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-10 p-6 bg-black/40 rounded-3xl border border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-white uppercase font-bold tracking-tighter">AI Inference Engine</span>
                      <span className="text-xs text-orange-400 font-mono">1.2ms latency</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div 
                        animate={{ x: [-100, 400] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                        className="w-24 h-full bg-gradient-to-r from-transparent via-orange-500 to-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'iot' && (
            <motion.div
              key="iot-lab"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 lg:grid-cols-4 gap-8"
            >
              {/* Sensor Grid Selection */}
              <div className="lg:col-span-1 space-y-4">
                <h3 className="text-xl font-bold text-white mb-6 px-2">{t('lab.iot.sensor.grid', '37-in-1 Sensor Kit')}</h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {sensors.map((sensor) => (
                    <button
                      key={sensor.id}
                      onClick={() => setActiveSensor(sensor.id)}
                      className={`p-4 rounded-2xl border transition-all duration-300 flex items-center gap-3 text-left ${
                        activeSensor === sensor.id
                        ? 'bg-orange-600/20 border-orange-500 shadow-lg shadow-orange-500/10'
                        : 'bg-gray-900/40 border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className={`${sensor.color} bg-white/5 p-2 rounded-lg`}>
                        {sensor.icon}
                      </div>
                      <span className={`text-xs font-bold ${activeSensor === sensor.id ? 'text-white' : 'text-white'}`}>
                        {t(`lab.iot.sensor.${sensor.id}`)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Dashboard Area */}
              <div className="lg:col-span-3 bg-gray-900/40 backdrop-blur-md rounded-[2.5rem] border border-white/5 p-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                      <Activity className="text-orange-500 animate-pulse" />
                      {t(`lab.iot.sensor.${activeSensor}`)}
                    </h3>
                    <p className="text-white text-sm mt-1">Real-time Stream from Arduino Module</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-black/40 px-4 py-2 rounded-xl border border-white/5 text-center">
                      <div className="text-xl font-bold text-orange-400 font-mono">{sensorData.val}{sensors.find(s => s.id === activeSensor)?.unit}</div>
                      <div className="text-[10px] text-white uppercase font-bold">Current Value</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full animate-ping" />
                      <span className="text-xs text-orange-400 font-bold uppercase tracking-widest">Live Node</span>
                    </div>
                  </div>
                </div>

                {/* Diverse Chart Renderer */}
                <div className="h-80 bg-black/40 rounded-3xl border border-white/5 p-8 relative overflow-hidden mb-8 flex items-center justify-center">
                  {(() => {
                    const sensor = sensors.find(s => s.id === activeSensor);
                    const color = sensor?.color.replace('text-', '') || 'orange-500';
                    
                    switch(sensor?.type) {
                      case 'pulse':
                        return (
                          <div className="relative w-full h-full flex items-center justify-center">
                            <motion.div 
                              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className={`absolute w-32 h-32 rounded-full border-4 border-${color} blur-xl`}
                            />
                            <div className="flex items-end gap-1 w-full h-3/4">
                              {waveformData.map((v, i) => (
                                <motion.div 
                                  key={i}
                                  animate={{ height: `${v}%` }}
                                  className={`flex-grow bg-${color} rounded-full opacity-60`}
                                  style={{ width: '4px' }}
                                />
                              ))}
                            </div>
                          </div>
                        );
                      case 'coord':
                        return (
                          <div className="w-64 h-64 border border-white/10 rounded-full relative bg-white/5">
                            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-10">
                              {Array(16).fill(0).map((_, i) => <div key={i} className="border border-white/20" />)}
                            </div>
                            <motion.div 
                              animate={{ x: `${coords.x - 50}%`, y: `${coords.y - 50}%` }}
                              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-${color} rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)]`}
                            >
                              <div className={`absolute -inset-2 bg-${color} rounded-full animate-ping opacity-50`} />
                            </motion.div>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white">
                              X: {coords.x.toFixed(1)} Y: {coords.y.toFixed(1)}
                            </div>
                          </div>
                        );
                      case 'area':
                        const hex = getColorHex(color);
                        return (
                          <div className="w-full h-full relative pt-12">
                            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                              <defs>
                                <linearGradient id={`areaGradient-${activeSensor}`} x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor={hex} stopOpacity="0.4" />
                                  <stop offset="100%" stopColor={hex} stopOpacity="0" />
                                </linearGradient>
                              </defs>
                              <motion.path
                                initial={false}
                                animate={{ d: `M 0 100 ${waveformData.map((v, i) => `L ${i * (100/39)} ${100 - v}`).join(' ')} L 100 100 Z` }}
                                fill={`url(#areaGradient-${activeSensor})`}
                                stroke={hex}
                                strokeWidth="0.5"
                              />
                            </svg>
                          </div>
                        );
                      case 'binary':
                        return (
                          <div className="flex flex-col items-center gap-6">
                            <motion.div 
                              animate={{ 
                                scale: sensorData.val > 50 ? 1.1 : 1,
                                backgroundColor: sensorData.val > 50 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                borderColor: sensorData.val > 50 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'
                              }}
                              className="w-32 h-32 rounded-3xl border-4 flex items-center justify-center transition-colors duration-500"
                            >
                              <Power className={`w-16 h-16 ${sensorData.val > 50 ? 'text-orange-500' : 'text-red-500'} transition-colors duration-500`} />
                            </motion.div>
                            <span className={`text-2xl font-black uppercase tracking-[0.3em] ${sensorData.val > 50 ? 'text-orange-400' : 'text-red-400'}`}>
                              {sensorData.val > 50 ? 'ACTIVE' : 'IDLE'}
                            </span>
                          </div>
                        );
                      case 'gauge':
                        return (
                          <div className="relative w-64 h-64 flex items-center justify-center">
                            <svg className="w-full h-full rotate-[-90deg]">
                              <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-white/5" />
                              <motion.circle 
                                cx="50%" cy="50%" r="45%" 
                                stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="283"
                                animate={{ strokeDashoffset: 283 - (283 * sensorData.val) / 100 }}
                                className={`text-${color}`}
                                strokeLinecap="round"
                              />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                              <span className="text-4xl font-black text-white font-mono">{sensorData.val}</span>
                              <span className="text-[10px] text-white font-bold uppercase tracking-widest">{sensor?.unit}</span>
                            </div>
                          </div>
                        );
                      case 'color':
                        const hue = (sensorData.val * 3.6).toFixed(0);
                        return (
                          <div className="flex flex-col items-center gap-8">
                            <motion.div 
                              animate={{ backgroundColor: `hsl(${hue}, 80%, 60%)`, boxShadow: `0 0 50px hsl(${hue}, 80%, 50%, 0.5)` }}
                              className="w-40 h-40 rounded-full border-8 border-white/10"
                            />
                            <div className="grid grid-cols-3 gap-4 text-center w-full max-w-xs">
                              {['R', 'G', 'B'].map((l) => (
                                <div key={l} className="bg-white/5 p-2 rounded-lg border border-white/10">
                                  <div className="text-[10px] text-white font-bold">{l}</div>
                                  <div className="text-sm font-bold text-white font-mono">{Math.floor(Math.random() * 255)}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      default:
                        return (
                          <div className="absolute inset-0 flex items-end gap-[3px] px-8 pb-8 pt-20">
                            {waveformData.map((val, idx) => (
                              <motion.div 
                                key={idx}
                                initial={false}
                                animate={{ height: `${val}%` }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className={`flex-grow bg-gradient-to-t from-${color}/20 via-${color} to-${color} rounded-t-sm w-1`}
                              />
                            ))}
                          </div>
                        );
                    }
                  })()}
                  <div className="absolute top-8 left-8 right-8 flex justify-between items-center pointer-events-none">
                    <div className="text-xs text-white uppercase font-bold tracking-widest">Frequency Spectrum / Time Domain</div>
                    <div className="text-[10px] text-orange-400 font-mono bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20">Active_Link: 921600 baud</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* MQTT Log Feed */}
                  <div className="h-48 bg-black/60 rounded-3xl border border-white/5 p-6 font-mono overflow-hidden">
                    <div className="text-xs text-white uppercase font-bold mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                      Serial Log / MQTT Feed
                    </div>
                    <div className="space-y-2">
                      <AnimatePresence>
                        {logs.map((log) => (
                          <motion.div
                            key={log}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-[10px] text-orange-300/80 break-all border-l border-orange-500/30 pl-3"
                          >
                            {log}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Health Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/30 p-5 rounded-2xl border border-white/5 flex flex-col items-center justify-center">
                      <Cpu className="w-5 h-5 text-orange-400 mb-2" />
                      <div className="text-lg font-bold text-white font-mono">{sensorData.cpu}%</div>
                      <div className="text-[9px] text-white uppercase font-bold">Edge AI Load</div>
                    </div>
                    <div className="bg-black/30 p-5 rounded-2xl border border-white/5 flex flex-col items-center justify-center">
                      <div className="flex gap-1 mb-2">
                        {Array(5).fill(0).map((_, index) => (
                          <CheckCircle key={index} className="w-3 h-3 text-orange-400" />
                        ))}
                      </div>
                      <div className="text-lg font-bold text-white font-mono">{sensorData.connectivity}%</div>
                      <div className="text-[9px] text-white uppercase font-bold">Packet Yield</div>
                    </div>
                  </div>
                </div>

                {/* Manual Simulation Control Panel */}
                <div className="mt-8 bg-orange-600/5 border border-orange-500/20 rounded-3xl p-8 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Zap className={`w-5 h-5 ${isManual ? 'text-yellow-400 animate-pulse' : 'text-white'}`} />
                      <h4 className="text-white font-bold tracking-tight">{t('lab.iot.manual.title', 'Manual Simulation Override')}</h4>
                    </div>
                    <button 
                      onClick={async () => {
                        if (!username) {
                          setShowUserModal(true);
                          return;
                        }
                        const nextState = !isManual;
                        const success = await triggerAction(
                          nextState ? 'Enabled Manual Control' : 'Disabled Manual Control', 
                          sensors.find(s => s.id === activeSensor)?.id || 'unknown'
                        );
                        if (success) setIsManual(nextState);
                      }}
                      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                        isManual 
                        ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/20' 
                        : 'bg-white/5 text-white border border-white/10'
                      }`}
                    >
                      {isManual ? 'Manual Control' : 'Auto-Pilot'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                      <p className="text-white text-sm mb-4 leading-relaxed">
                        {t('lab.iot.manual.desc', 'Toggle manual mode to interact with the sensor hardware simulator directly.')}
                      </p>
                      <div className="flex flex-col gap-2">
                        {!isManual ? (
                          <div className="text-[10px] text-orange-400 font-bold bg-orange-500/10 px-3 py-2 rounded-lg inline-block border border-orange-500/20">
                            {t('lab.iot.manual.auto', 'AUTO-PILOT ACTIVE: Receiving live telemetry...')}
                          </div>
                        ) : (
                          <div className="text-[10px] text-yellow-400 font-bold bg-yellow-500/10 px-3 py-2 rounded-lg inline-block border border-yellow-500/20">
                            MANUAL OVERRIDE: Interaction logged as {username}
                          </div>
                        )}
                        <div className="text-[10px] text-white bg-white/5 px-3 py-2 rounded-lg border border-white/5">
                          LAST ACTIVITY: <span className="text-white">{labStatus.last_user}</span> {labStatus.last_action} on {labStatus.last_sensor}
                        </div>
                      </div>
                    </div>

                    <div className={`space-y-6 transition-opacity duration-300 ${isManual ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
                      {(() => {
                        const sensor = sensors.find(s => s.id === activeSensor);
                        const color = sensor?.color.replace('text-', '') || 'orange-500';
                        
                        if (sensor?.type === 'coord') {
                          return (
                            <div className="space-y-4">
                              <div className="flex justify-between text-xs font-mono text-white">
                                <span>X-AXIS</span>
                                <span>{coords.x.toFixed(1)}%</span>
                              </div>
                              <input 
                                type="range" min="0" max="100" value={coords.x}
                                onChange={(e) => setCoords(prev => ({ ...prev, x: +e.target.value }))}
                                onMouseUp={() => triggerAction('Adjusted X-Axis', activeSensor, coords.x.toFixed(0))}
                                className={`w-full accent-${color}`}
                              />
                              <div className="flex justify-between text-xs font-mono text-white">
                                <span>Y-AXIS</span>
                                <span>{coords.y.toFixed(1)}%</span>
                              </div>
                              <input 
                                type="range" min="0" max="100" value={coords.y}
                                onChange={(e) => setCoords(prev => ({ ...prev, y: +e.target.value }))}
                                onMouseUp={() => triggerAction('Adjusted Y-Axis', activeSensor, coords.y.toFixed(0))}
                                className={`w-full accent-${color}`}
                              />
                            </div>
                          );
                        }

                        if (sensor?.type === 'binary') {
                          return (
                            <div className="flex justify-center">
                              <button 
                                onClick={async () => {
                                  const newVal = sensorData.val > 50 ? 0 : 100;
                                  setSensorData(prev => ({ ...prev, val: newVal }));
                                  setWaveformData(prev => [...prev.slice(1), newVal]);
                                  await triggerAction(`Toggled Binary to ${newVal > 50 ? 'ON' : 'OFF'}`, activeSensor);
                                }}
                                className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] border-2 transition-all ${
                                  sensorData.val > 50 
                                  ? 'bg-orange-500/20 border-orange-500 text-orange-400' 
                                  : 'bg-red-500/20 border-red-500 text-red-400'
                                }`}
                              >
                                Trigger {sensorData.val > 50 ? 'OFF' : 'ON'}
                              </button>
                            </div>
                          );
                        }

                        return (
                          <div className="space-y-4">
                            <div className="flex justify-between text-xs font-mono text-white">
                              <span>SIMULATOR VALUE</span>
                              <span>{sensorData.val}{sensor?.unit}</span>
                            </div>
                            <input 
                              type="range" min="0" max={sensor?.type === 'pulse' ? 200 : 100} value={sensorData.val}
                              onChange={(e) => {
                                const newVal = +e.target.value;
                                setSensorData(prev => ({ ...prev, val: newVal }));
                                setWaveformData(prev => [...prev.slice(1), newVal]);
                              }}
                              onMouseUp={() => triggerAction('Set Manual Value', activeSensor, sensorData.val.toString())}
                              className={`w-full accent-${color}`}
                            />
                            {sensor?.type === 'pulse' && (
                              <button 
                                onClick={async () => {
                                  setSensorData(prev => ({ ...prev, val: 180 }));
                                  setWaveformData(prev => [...prev.slice(1), 180]);
                                  triggerAction('Triggered Pulse Spike', activeSensor);
                                  setTimeout(() => {
                                    setSensorData(prev => ({ ...prev, val: 60 }));
                                    setWaveformData(prev => [...prev.slice(1), 60]);
                                  }, 100);
                                }}
                                className="w-full py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] text-white font-bold uppercase tracking-widest hover:bg-white/10"
                              >
                                Manual Pulse Spike
                              </button>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'sentinel' && (
            <motion.div
              key="sentinel-lab"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Sentinel Identity & Description */}
                <div className="lg:col-span-2 bg-gray-900/40 backdrop-blur-md rounded-[2.5rem] border border-white/5 p-10">
                  <motion.span className="px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-lg text-orange-400 text-xs font-bold mb-6 inline-block">
                    {t('lab.sentinel.badge', 'Business Automation')}
                  </motion.span>
                  <h3 className="text-4xl font-black text-white mb-6">{t('lab.sentinel.title', 'AI & Bot Solutions')}</h3>
                  <p className="text-white text-lg leading-relaxed mb-10">
                    {t('lab.sentinel.desc', 'We build autonomous digital workforces. From intelligent customer support to complex multi-platform automation, our bots drive efficiency.')}
                  </p>
                  
                  {/* Capabilities List */}
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { label: 'Telegram Business Bots', icon: <Send className="text-sky-400" />, desc: 'Custom tools for trading, support, and alerts.' },
                      { label: 'WhatsApp AI Integration', icon: <MessageSquare className="text-orange-400" />, desc: 'Lead generation and sales automation via Meta API.' },
                      { label: 'Autonomous AI Agents', icon: <Brain className="text-orange-400" />, desc: 'Self-reasoning agents for research and data tasks.' },
                      { label: 'Workflow Automation', icon: <Zap className="text-yellow-400" />, desc: 'Connecting your stack into a seamless engine.' }
                    ].map((item, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-colors group"
                      >
                        <div className="flex items-center gap-4 mb-2">
                          <div className="p-2 bg-white/5 rounded-lg group-hover:scale-110 transition-transform">{item.icon}</div>
                          <span className="text-white font-bold">{item.label}</span>
                        </div>
                        <p className="text-xs text-white ml-12">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Workflow & Output Visualizer */}
                <div className="lg:col-span-3 flex flex-col gap-8">
                  {/* Telegram Dispatch Mockup */}
                  <div className="bg-gradient-to-br from-orange-600/10 to-orange-600/10 rounded-[2.5rem] border border-orange-500/20 p-8 flex-grow flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="text-orange-400 w-5 h-5" />
                        <span className="text-sm font-bold text-white uppercase tracking-widest">{t('lab.sentinel.telegram.title', 'Live Bot Preview')}</span>
                      </div>
                      <div className="px-3 py-1 bg-orange-500/20 rounded-full text-[10px] text-orange-400 font-black">ENCRYPTED</div>
                    </div>
                    
                    <div className="flex-grow flex items-center justify-center py-10">
                      <div className="w-full max-w-md">
                        <motion.div 
                          key={agentStep}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="bg-[#1c2431] rounded-[2rem] p-6 shadow-2xl border border-white/5 relative overflow-hidden"
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white">
                              <Bot className="w-6 h-6" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white">SharmaStack AI Bot</div>
                              <div className="text-[10px] text-orange-400 uppercase font-black">Typing...</div>
                            </div>
                          </div>
                          <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-2xl rounded-tl-none">
                            <p className="text-sm text-white leading-relaxed font-mono">
                              {agentStep === 0 && "> Initializing market scan..."}
                              {agentStep === 1 && "> Found 3 new high-potential leads in Berlin. Processing profiles..."}
                              {agentStep === 2 && "> Alert: Backend CPU spike detected. Scaling cluster automatically..."}
                              {agentStep === 3 && "> Research complete. Summary PDF dispatched to your email."}
                            </p>
                            <div className="mt-3 pt-3 border-t border-orange-500/10 flex justify-between items-center">
                              <span className="text-[10px] text-white font-mono">ID: SH-BOT-992</span>
                              <span className="text-[10px] text-orange-500 font-bold">READY TO DEPLOY</span>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <button 
                        onClick={() => setAgentStep((agentStep + 1) % 4)}
                        className="flex-grow py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold text-xs transition-all shadow-lg shadow-orange-600/20"
                      >
                        Simulate Next Bot Action
                      </button>
                      <button className="px-6 py-3 bg-orange-500 border border-orange-600 text-white rounded-xl font-bold text-xs hover:bg-orange-600 transition-all">
                        Connect API
                      </button>
                    </div>
                  </div>

                  {/* Portfolio Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-900/40 p-6 rounded-3xl border border-white/5 group hover:border-orange-500/30 transition-all">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 mb-4 group-hover:scale-110 transition-transform">
                        <Globe />
                      </div>
                      <h4 className="text-white font-bold mb-1">Market Sentinel</h4>
                      <p className="text-[10px] text-white mb-3 uppercase font-black">Telegram • Fintech</p>
                      <p className="text-xs text-white leading-relaxed">Real-time crypto and stock analysis bot with customized technical indicator alerts.</p>
                    </div>
                    <div className="bg-gray-900/40 p-6 rounded-3xl border border-white/5 group hover:border-orange-500/30 transition-all">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 mb-4 group-hover:scale-110 transition-transform">
                        <MessageSquare />
                      </div>
                      <h4 className="text-white font-bold mb-1">LeadGen WhatsApp</h4>
                      <p className="text-[10px] text-white mb-3 uppercase font-black">WhatsApp • CRM</p>
                      <p className="text-xs text-white leading-relaxed">Automated lead qualification agent that interacts with users and syncs directly to your CRM.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Value Proposition */}
              <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-10 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
                  <Network className="w-64 h-64 text-orange-500" />
                </div>
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10">
                  <div className="md:col-span-2">
                    <h4 className="text-2xl font-bold text-white mb-4">Why Automate with SharmaStack?</h4>
                    <p className="text-white leading-relaxed mb-6 max-w-2xl">
                      Our bots aren't just scripts; they are intelligent agents built on top of the Sentinel Framework. They reduce human error, operate 24/7, and scale with your business demands without increasing overhead.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {['300% ROI average', '99.9% Uptime', 'Custom Integrations'].map(badge => (
                        <span key={badge} className="px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-xs text-orange-400 font-bold uppercase tracking-widest">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-center md:justify-end">
                    <button className="px-8 py-4 bg-orange-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 hover:bg-orange-600 transition-all shadow-2xl">
                      Get a Bot Quote
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Username Identification Modal */}
      <AnimatePresence>
        {showUserModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUserModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-gray-900 border border-white/10 p-8 rounded-[2rem] shadow-2xl"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-orange-400">
                  <Fingerprint className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Identify Yourself</h3>
                <p className="text-white text-sm mt-2">Enter your name to interact with the hardware lab. Your actions will be logged for the administrator.</p>
              </div>
              
              <input 
                type="text"
                placeholder="Enter your name..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 mb-4 transition-colors"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const name = (e.target as HTMLInputElement).value.trim();
                    if (name) {
                      setUsername(name);
                      localStorage.setItem('lab_username', name);
                      setShowUserModal(false);
                    }
                  }
                }}
              />
              
              <button 
                onClick={(e) => {
                  const input = (e.currentTarget.previousSibling as HTMLInputElement);
                  const name = input.value.trim();
                  if (name) {
                    setUsername(name);
                    localStorage.setItem('lab_username', name);
                    setShowUserModal(false);
                  }
                }}
                className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg shadow-orange-600/20"
              >
                Access Lab Control
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default InnovationLab;
