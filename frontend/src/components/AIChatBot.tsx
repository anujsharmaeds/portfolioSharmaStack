import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles, Briefcase, Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Message {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isCustom?: boolean;
}

type FlowStep = 'idle' | 'name' | 'project_type' | 'budget' | 'timeline' | 'contact' | 'submitting' | 'finished';

const AIChatBot: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [flowStep, setFlowStep] = useState<FlowStep>('idle');
  const [consultationData, setConsultationData] = useState({
    name: '',
    project_type: '',
    budget: '',
    timeline: '',
    contact: ''
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const addBotMessage = (content: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'bot',
        content,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000);
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(t('bot.welcome', "Hello! I'm your SharmaStack AI assistant. How can I help you today? I can tell you about our services, or we can start a Quick Project Consultation."));
    }
  }, [isOpen, messages.length, t]);

  const startConsultation = () => {
    setFlowStep('name');
    setMessages(prev => [...prev, {
      role: 'user',
      content: '🚀 Start Project Consultation',
      timestamp: new Date()
    }]);
    addBotMessage(t('bot.flow.name', "Great! Let's get started. What is your name?"));
  };

  const handleFlow = async (text: string) => {
    const userMsg: Message = { role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    switch (flowStep) {
      case 'name':
        setConsultationData(prev => ({ ...prev, name: text }));
        setFlowStep('project_type');
        addBotMessage(t('bot.flow.type', { name: text, defaultValue: `Nice to meet you, ${text}! What type of project are you planning? (Web, Mobile App, AI Agent, IoT, etc.)` }));
        break;
      case 'project_type':
        setConsultationData(prev => ({ ...prev, project_type: text }));
        setFlowStep('budget');
        addBotMessage(t('bot.flow.budget', "Understood. What is your approximate budget range for this project?"));
        break;
      case 'budget':
        setConsultationData(prev => ({ ...prev, budget: text }));
        setFlowStep('timeline');
        addBotMessage(t('bot.flow.timeline', "Got it. And what is your target timeline for launch?"));
        break;
      case 'timeline':
        setConsultationData(prev => ({ ...prev, timeline: text }));
        setFlowStep('contact');
        addBotMessage(t('bot.flow.contact', "Almost done! Please provide your WhatsApp number or Email so we can reach out to you with the next steps."));
        break;
      case 'contact':
        const finalData = { ...consultationData, contact: text };
        setConsultationData(finalData);
        setFlowStep('submitting');
        setIsTyping(true);
        
        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/bot/consultation`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finalData)
          });
          if (res.ok) {
            setFlowStep('finished');
            addBotMessage(t('bot.flow.finished', "Thank you! I've sent your requirements to our team. Anuj or one of our lead engineers will reach out to you shortly."));
          }
        } catch (err) {
          addBotMessage("I'm having a bit of trouble reaching the server, but I've saved your info locally. I'll retry in a moment!");
          setFlowStep('idle');
        }
        break;
      default:
        handleNormalChat(text);
    }
  };

  const handleNormalChat = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      let botResponse = "";
      const lowerInput = text.toLowerCase();
      if (lowerInput.includes('services')) botResponse = t('bot.resp.services', "We offer Web Development, AI Automation, and IoT ecosystems.");
      else if (lowerInput.includes('price')) botResponse = t('bot.resp.price', "Projects start at $2,500. Custom AI/IoT solutions vary by complexity.");
      else botResponse = t('bot.resp.default', "I'm specializing in project consultations right now! Would you like to start one?");
      
      setMessages(prev => [...prev, { role: 'bot', content: botResponse, timestamp: new Date() }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    if (flowStep !== 'idle') handleFlow(input);
    else handleNormalChat(input);
    setInput('');
  };

  const getQuickPills = () => {
    if (flowStep === 'idle' && messages.length > 0) {
      return [
        { label: '🚀 Start Consultation', action: startConsultation, icon: <Rocket className="w-3 h-3" /> },
        { label: '🛠 Services', action: () => handleNormalChat('What services do you offer?'), icon: <Briefcase className="w-3 h-3" /> }
      ];
    }
    if (flowStep === 'project_type') {
      return [
        { label: 'Web Application', action: () => handleFlow('Web Application') },
        { label: 'AI Bot / Agent', action: () => handleFlow('AI Bot / Agent') },
        { label: 'IoT Ecosystem', action: () => handleFlow('IoT Ecosystem') }
      ];
    }
    if (flowStep === 'budget') {
      return [
        { label: '$2k - $5k', action: () => handleFlow('$2k - $5k') },
        { label: '$5k - $15k', action: () => handleFlow('$5k - $15k') },
        { label: '$15k+', action: () => handleFlow('$15k+') }
      ];
    }
    if (flowStep === 'timeline') {
      return [
        { label: '< 1 Month', action: () => handleFlow('< 1 Month') },
        { label: '1-3 Months', action: () => handleFlow('1-3 Months') },
        { label: 'Flexible', action: () => handleFlow('Flexible') }
      ];
    }
    return [];
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[100] w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-blue-500/40 border border-white/20"
      >
        {isOpen ? <X className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />}
        {!isOpen && <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-[#030712] animate-pulse" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-[100] w-[90vw] md:w-[420px] h-[650px] bg-gray-900/95 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                  <Bot className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-white text-lg leading-tight">SharmaStack AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Consultation Mode</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-purple-600' : 'bg-blue-600'}`}>
                      {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-purple-600 text-white rounded-tr-none' : 'bg-white/5 text-gray-300 border border-white/10 rounded-tl-none'}`}>
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl rounded-tl-none flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions / Pills */}
            <div className="px-6 pb-2 flex flex-wrap gap-2">
              {getQuickPills().map((pill, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={pill.action}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 rounded-xl text-xs text-blue-400 font-bold transition-all"
                >
                  {'icon' in pill && pill.icon}
                  {pill.label}
                </motion.button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-6">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={flowStep === 'idle' ? "Ask anything..." : "Type your answer..."}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 pr-14 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                />
                <button onClick={handleSend} className="absolute right-2 top-2 bottom-2 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all">
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-gray-600 mt-4 text-center flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3" /> Powered by SharmaStack AI Orchestrator
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatBot;
