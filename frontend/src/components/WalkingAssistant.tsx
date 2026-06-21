import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const WalkingAssistant: React.FC = () => {
  const [showBubble, setShowBubble] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Chat State
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initial animation
  useEffect(() => {
    const enterTimer = setTimeout(() => { setHasEntered(true); }, 2000);
    return () => clearTimeout(enterTimer);
  }, []);

  useEffect(() => {
    if (hasEntered && !isChatOpen && messages.length === 0) {
      const bubbleTimer = setTimeout(() => { setShowBubble(true); }, 1500);
      return () => clearTimeout(bubbleTimer);
    }
  }, [hasEntered, isChatOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isChatOpen &&
        chatContainerRef.current &&
        !chatContainerRef.current.contains(event.target as Node)
      ) {
        setIsChatOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isChatOpen]);

  const addBotMessage = (content: string) => {
    setMessages(prev => [...prev, { role: 'assistant', content }]);
  };

  const openChat = () => {
    setShowBubble(false);
    setIsChatOpen(true);
    if (messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        addBotMessage("Hi! I'm your dedicated assistant. How can I help you today?");
        setIsTyping(false);
      }, 800);
    }
  };

  const handleNormalChat = async (text: string) => {
    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    setInput('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messages.concat(userMsg) })
      });
      const data = await res.json();
      addBotMessage(data.response || data.detail || "I'm thinking...");
    } catch (err) {
      addBotMessage("I had a little glitch. Let's try again!");
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    handleNormalChat(input);
  };

  return (
    <>
      {/* Bot Avatar Container */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[90] pointer-events-none flex items-center">
        {/* The Peeking Ninja Bot Avatar */}
        <motion.div
          initial={{ x: -150 }}
          animate={{ x: hasEntered ? -30 : -150 }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
          className="relative flex items-center justify-center pointer-events-auto cursor-pointer"
          onClick={() => { if (!isChatOpen) openChat(); }}
        >
          <motion.div
            animate={{ y: hasEntered ? [-2, 2, -2] : 0, rotate: hasEntered ? [0, 8, -4, 8, -4, 0] : 0 }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", repeatDelay: 1 }}
            className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40"
          >
            <img
              src="/peeking_bot.png"
              alt="Peeking Assistant"
              style={{ mixBlendMode: 'lighten', WebkitMaskImage: 'linear-gradient(to right, black 70%, transparent 100%)' }}
              className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]"
            />
          </motion.div>
        </motion.div>

        {/* Intro Speech Bubble */}
        <AnimatePresence>
          {showBubble && !isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 10 }}
              exit={{ opacity: 0, scale: 0.8, x: -20 }}
              className="relative pointer-events-auto bg-zinc-900 border border-orange-500/30 rounded-2xl p-3 sm:p-4 shadow-2xl shadow-orange-500/20 z-10 ml-2 w-52 sm:w-60 md:w-64"
            >
              <button onClick={() => setShowBubble(false)} className="absolute top-2 right-2 text-zinc-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
              <p className="text-white text-xs sm:text-sm font-medium mb-2 sm:mb-3 cursor-pointer" onClick={openChat}>
                *Psst!* 👋 Let's chat!
              </p>
              <button
                onClick={openChat}
                className="w-full flex items-center justify-center gap-2 px-2 sm:px-3 py-2 sm:py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs sm:text-sm font-bold transition-all shadow-lg shadow-orange-600/30"
              >
                <Bot className="w-4 h-4 sm:w-5 sm:h-5" /> Open Chat
              </button>
              <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 bg-zinc-900 border-b border-l border-orange-500/30 transform rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Box - Separate from bot container for proper mobile positioning */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            {/* Mobile overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setIsChatOpen(false)}
            />

            {/* Chat box - positioned differently for mobile vs desktop */}
            <motion.div
              ref={chatContainerRef}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed z-50 bg-zinc-950/95 backdrop-blur-xl border border-orange-500/30 rounded-3xl shadow-[0_0_40px_rgba(249,115,22,0.15)] flex flex-col overflow-hidden
                /* Mobile: center of screen */
                w-[calc(100vw-2rem)] max-w-[400px] h-[85vh] max-h-[600px]
                left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                /* Desktop: next to bot */
                md:left-[100px] md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:w-[380px] md:h-[500px] md:max-h-[80vh]"
            >
              {/* Header */}
              <div className="p-3 sm:p-4 bg-gradient-to-r from-orange-600/20 to-transparent border-b border-white/5 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-zinc-900 border border-orange-500/50 flex-shrink-0">
                    <img src="/peeking_bot.png" alt="Avatar" className="w-full h-full object-cover scale-150 translate-x-1 translate-y-2" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-xs sm:text-sm leading-tight">Anime Assistant</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-[10px] text-zinc-400 font-medium">Online</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-all flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-grow overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 custom-scrollbar">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-2.5 sm:p-3 rounded-2xl text-xs sm:text-sm max-w-[85%] leading-relaxed ${msg.role === 'user'
                      ? 'bg-orange-600 text-white rounded-br-sm'
                      : 'bg-zinc-800/80 text-zinc-100 rounded-bl-sm border border-white/5'
                      }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="p-3 bg-zinc-800/80 border border-white/5 rounded-2xl rounded-bl-sm flex gap-1 items-center h-9 sm:h-10">
                      <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 sm:p-4 pt-2 border-t border-white/5 bg-zinc-950 flex-shrink-0">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..."
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl pl-3 sm:pl-4 pr-12 py-2.5 sm:py-3 text-white text-sm focus:outline-none focus:border-orange-500/50 transition-all"
                  />
                  <button
                    onClick={handleSend}
                    className="absolute right-1.5 w-8 h-8 bg-orange-600 hover:bg-orange-500 text-white rounded-lg flex items-center justify-center transition-all"
                  >
                    <Send className="w-3 h-3 -ml-0.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(249, 115, 22, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(249, 115, 22, 0.5);
        }
      `}</style>
    </>
  );
};

export default WalkingAssistant;