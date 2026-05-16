import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles, Phone, Briefcase, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Message {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const AIChatBot: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          {
            role: 'bot',
            content: t('bot.welcome', "Hello! I'm your SharmaStack AI assistant. How can I help you today? I can tell you about our AI services, IoT solutions, or help you book a call."),
            timestamp: new Date(),
          },
        ]);
        setIsTyping(false);
      }, 1000);
    }
  }, [isOpen, messages.length, t]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Mock AI response logic
    setTimeout(() => {
      let botResponse = "";
      const lowerInput = input.toLowerCase();

      if (lowerInput.includes('services') || lowerInput.includes('offer')) {
        botResponse = t('bot.resp.services', "We offer elite Web Development, AI-driven automation (including RAG and Agents), and Industrial IoT ecosystem development.");
      } else if (lowerInput.includes('price') || lowerInput.includes('cost')) {
        botResponse = t('bot.resp.price', "Our projects typically start at $2,500 for basic solutions. For custom AI/IoT enterprise architectures, we provide custom quotes after a discovery call.");
      } else if (lowerInput.includes('iot')) {
        botResponse = t('bot.resp.iot', "Our IoT stack includes hardware development with Raspberry Pi/ESP32, MQTT protocols, and Edge AI for real-time analytics.");
      } else if (lowerInput.includes('contact') || lowerInput.includes('call') || lowerInput.includes('hire')) {
        botResponse = t('bot.resp.contact', "You can book a discovery call via our contact page or call us directly. Would you like me to take you to the contact section?");
      } else {
        botResponse = t('bot.resp.default', "That's an interesting question! SharmaStack specializes in bridging the gap between stunning design and robust engineering. For specific technical inquiries, I recommend speaking with our lead engineers.");
      }

      setMessages(prev => [...prev, {
        role: 'bot',
        content: botResponse,
        timestamp: new Date(),
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const quickActions = [
    { label: t('bot.qa.services', 'View Services'), icon: <Briefcase className="w-4 h-4" />, action: () => window.location.href = '/services' },
    { label: t('bot.qa.contact', 'Book a Call'), icon: <Phone className="w-4 h-4" />, action: () => window.location.href = '/contact' },
    { label: t('bot.qa.about', 'Who is SharmaStack?'), icon: <Info className="w-4 h-4" />, action: () => setInput('Who is SharmaStack?') },
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[100] w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-blue-500/40 border border-white/20"
      >
        {isOpen ? <X className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-[#030712] animate-pulse"
          />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 100, scale: 0.8, x: 20 }}
            className="fixed bottom-24 right-6 z-[100] w-[90vw] md:w-[400px] h-[600px] bg-[#030712]/90 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white leading-tight">SharmaStack AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Active Now</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                      msg.role === 'user' ? 'bg-purple-600' : 'bg-blue-600'
                    }`}>
                      {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                      ? 'bg-purple-600 text-white rounded-tr-none' 
                      : 'bg-white/5 text-gray-300 border border-white/10 rounded-tl-none'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl rounded-tl-none flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-6 pb-2 flex flex-wrap gap-2">
              {quickActions.map((qa, i) => (
                <button
                  key={i}
                  onClick={qa.action}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] text-gray-400 font-bold transition-all"
                >
                  {qa.icon}
                  {qa.label}
                </button>
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
                  placeholder={t('bot.placeholder', 'Ask anything...')}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 pr-14 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                />
                <button
                  onClick={handleSend}
                  className="absolute right-2 top-2 bottom-2 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-gray-600 mt-4 text-center">
                Powered by SharmaStack AI • Multi-Agent Orchestration
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatBot;
