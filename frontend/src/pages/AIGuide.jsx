import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, MessageSquare, History, ArrowRight, Bot } from 'lucide-react';
import AIChatMessage from '../components/AIChatMessage';
import PageTransition from '../components/PageTransition';

import { HERITAGE_SITES } from '../constants/heritageSites';
import { HERITAGE_CULTURE } from '../constants/heritageCulture';
import { HERITAGE_FESTIVALS } from '../constants/heritageFestivals';
import { HERITAGE_LANGUAGES } from '../constants/heritageLanguages';
import { HERITAGE_DRESSES } from '../constants/heritageDresses';
import { HERITAGE_COMMUNITIES } from '../constants/heritageCommunities';

// Combine all datasets into one Brain
const BHARATSANGAM_BRAIN = [
  ...HERITAGE_SITES,
  ...HERITAGE_CULTURE,
  ...HERITAGE_FESTIVALS,
  ...HERITAGE_LANGUAGES,
  ...HERITAGE_DRESSES,
  ...HERITAGE_COMMUNITIES
];

// Mock Knowledge Base for Demo
const MOCK_KNOWLEDGE = {
  'taj mahal': "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra, Uttar Pradesh. It was commissioned in 1631 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal. It is a UNESCO World Heritage Site and a universal symbol of love.",
  'diwali': "Diwali, the Festival of Lights, is one of India's major festivals. It symbolizes the spiritual victory of light over darkness, good over evil, and knowledge over ignorance. People celebrate by lighting diyas, setting off fireworks, sharing sweets, and praying to Goddess Lakshmi.",
  'sanskrit': "Sanskrit is an ancient Indo-Aryan language and the classical language of Indian civilization. It is the sacred language of Hinduism and contains a vast body of literature, including the Vedas, Upanishads, and epic poetry like the Mahabharata and Ramayana.",
  'dance': "India has 8 officially recognized classical dances: Bharatanatyam, Kathak, Kuchipudi, Odissi, Kathakali, Sattriya, Manipuri, and Mohiniyattam. Each dance form is deeply rooted in regional culture, mythology, and spiritual expression.",
  'hello': "Namaste! I am Virasat AI, your digital guide to India's rich heritage. How can I help you explore our history, culture, or traditions today?",
  'hi': "Namaste! I am Virasat AI, your digital guide to India's rich heritage. How can I help you explore our history, culture, or traditions today?"
};

const SUGGESTED_PROMPTS = [
  "Tell me about the Taj Mahal",
  "What are the classical dances of India?",
  "Explain the significance of Diwali",
  "Who built the Konark Sun Temple?"
];

const AIGuide = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Namaste! I am BharatSangam AI, your personal guide to India's magnificent heritage and culture. Ask me anything about historical monuments, traditional festivals, languages, or art forms.",
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateAIResponse = (userText) => {
    const lowerText = userText.toLowerCase();
    
    // Check for conversational intents
    if (lowerText.match(/hello|hi|hey|namaste/)) {
      return "Namaste! I am BharatSangam AI, your digital guide to India's rich heritage. Ask me about any monument, festival, language, or culture we feature on this platform!";
    }
    if (lowerText.match(/what is this website|about virasat/)) {
      return "BharatSangam 3D is a digital archive of India's timeless heritage. We aim to preserve and showcase India's historical monuments, vibrant festivals, classical languages, and diverse communities through immersive digital experiences.";
    }

    // Keyword extraction (ignore common words)
    const ignoreWords = ['what', 'is', 'the', 'where', 'tell', 'me', 'about', 'explain', 'who', 'built', 'in', 'of', 'and', 'a', 'an'];
    const words = lowerText.split(/\s+/).filter(w => !ignoreWords.includes(w) && w.length > 2);

    if (words.length === 0) {
      return "Could you please provide more details? I can tell you about our heritage sites, festivals, languages, and more.";
    }

    // Scoring system to find the best match
    let bestMatch = null;
    let highestScore = 0;

    VIRASAT_BRAIN.forEach(item => {
      let score = 0;
      const itemName = item.name.toLowerCase();
      const itemDesc = (item.fullDescription || item.description).toLowerCase();
      const itemLoc = item.location?.toLowerCase() || '';

      words.forEach(word => {
        if (itemName.includes(word)) score += 5; // High weight for name matches
        if (itemLoc.includes(word)) score += 2;
        if (itemDesc.includes(word)) score += 1;
      });

      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    });

    if (bestMatch && highestScore >= 3) {
      return `Here is what I found about ${bestMatch.name} (${bestMatch.category}):\n\n${bestMatch.fullDescription || bestMatch.description}\n\nLocation: ${bestMatch.location}, ${bestMatch.state}`;
    }
    
    // Fallback to MOCK_KNOWLEDGE for general terms not explicitly in constants but hardcoded
    let fallbackResponse = "That's a fascinating topic! India's heritage is incredibly deep and diverse. I couldn't find exact details about that in my current database, but you can explore our 'Heritage' and 'Culture' sections on the Home page to discover more historical wonders and living traditions.";
    
    for (const [key, val] of Object.entries(MOCK_KNOWLEDGE)) {
      if (lowerText.includes(key)) {
        fallbackResponse = val;
        break;
      }
    }

    return fallbackResponse;
  };

  const handleSendMessage = (e, customPrompt = null) => {
    if (e) e.preventDefault();
    
    const textToSend = customPrompt || input;
    if (!textToSend.trim()) return;

    // Add user message
    const newUserMsg = {
      id: Date.now(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    if (!customPrompt) setInput('');
    setIsTyping(true);

    // Simulate AI thinking and response delay
    setTimeout(() => {
      const aiResponseText = generateAIResponse(textToSend);
      const newAIMsg = {
        id: Date.now() + 1,
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, newAIMsg]);
      setIsTyping(false);
    }, 1500); // 1.5 second simulated delay
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-8 px-4 sm:px-6 lg:px-12 flex justify-center bg-background">
        
        {/* Main Layout Container */}
        <div className="w-full max-w-[1400px] h-[calc(100vh-140px)] flex flex-col md:flex-row gap-6 relative z-10">
          
          {/* Sidebar - Hidden on mobile, visible on md+ */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex flex-col w-1/4 max-w-[300px] h-full bg-surface-light border border-white/5 rounded-3xl p-6 backdrop-blur-md"
          >
            <div className="flex items-center gap-3 text-primary mb-8">
              <Sparkles size={24} />
              <h2 className="text-xl font-cinzel font-semibold tracking-wide text-text-primary">Virasat AI</h2>
            </div>

            <div className="mb-8">
              <h3 className="text-xs uppercase tracking-widest text-text-secondary/60 mb-4 flex items-center gap-2">
                <MessageSquare size={14} />
                Suggested Prompts
              </h3>
              <div className="space-y-3">
                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSendMessage(null, prompt)}
                    className="w-full text-left text-sm text-text-secondary hover:text-primary p-3 rounded-xl bg-white/5 hover:bg-primary/10 border border-white/5 hover:border-primary/30 transition-all duration-300 flex items-start gap-2 group"
                  >
                    <ArrowRight size={16} className="shrink-0 mt-0.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    <span className="leading-relaxed">{prompt}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-white/5">
              <div className="flex items-center gap-3 text-xs text-text-secondary/50">
                <History size={16} />
                <span>Demo Mode - History not saved</span>
              </div>
            </div>
          </motion.div>

          {/* Main Chat Area */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col h-full bg-surface-light/50 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm relative"
          >
            {/* Mobile Header */}
            <div className="md:hidden flex items-center gap-3 p-4 border-b border-white/5 bg-surface-light/80 backdrop-blur-md">
              <Sparkles size={20} className="text-primary" />
              <h2 className="text-lg font-cinzel font-semibold tracking-wide text-text-primary">Virasat AI</h2>
            </div>

            {/* Chat Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar scroll-smooth">
              {messages.map(msg => (
                <AIChatMessage key={msg.id} message={msg} />
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex w-full gap-4 justify-start mb-6"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary mt-1">
                    <Bot size={20} />
                  </div>
                  <div className="px-5 py-4 rounded-2xl bg-surface-light border border-white/5 rounded-tl-none flex items-center gap-1.5 h-[52px]">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.15 }} className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.3 }} className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 sm:p-6 bg-surface border-t border-white/5">
              <form 
                onSubmit={(e) => handleSendMessage(e)}
                className="relative flex items-center w-full bg-background rounded-full border border-white/10 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all duration-300"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about India's heritage, monuments, or culture..."
                  className="w-full bg-transparent px-6 py-4 text-text-primary placeholder-text-secondary/50 focus:outline-none text-sm md:text-base font-light"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 p-2.5 rounded-full bg-primary/20 text-primary hover:bg-primary hover:text-background disabled:opacity-50 disabled:hover:bg-primary/20 disabled:hover:text-primary transition-all duration-300"
                >
                  <Send size={18} />
                </button>
              </form>
              <div className="text-center mt-3">
                <span className="text-[10px] text-text-secondary/40 font-light tracking-wide">
                  Virasat AI Demo Mode. Responses are simulated for demonstration purposes.
                </span>
              </div>
            </div>

          </motion.div>
        </div>
        
        {/* Background Ambient Glow */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[200px] pointer-events-none rounded-full z-0" />
      </div>
    </PageTransition>
  );
};

export default AIGuide;
