import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Mic, MicOff, Bot, Sparkles } from 'lucide-react';
import { useAuth } from '../../utils/supabase/auth';

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export function FloatingChatButton() {
  // try to get current auth user from your AuthProvider (this is the same hook from your auth.tsx)
  let authUser: any = null;
  try {
    const auth = useAuth();
    authUser = auth?.user ?? null;
  } catch (e) {
    // If this component is rendered outside AuthProvider for some reason,
    // authUser stays null. We still guard using local mock_session below.
    authUser = null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hi! I\'m your AI insurance assistant. How can I help you find the perfect insurance policy today? 🛡️',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    // Add user message and set typing indicator
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText('');
    setIsTyping(true);

    try {
      // API Call to your backend
      const response = await fetch('https://askmypolicybackend.onrender.com/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: currentInput }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: data.answer || "I'm sorry, I couldn't process that.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("API Call Error:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "There was an error connecting to the server. Please try again.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
  };

  // New guard: if user is not signed-in (or is demo) -> show message and don't open chat.
  const handleChatClick = () => {
    // detect demo session stored by your demo flow (LoginScreen stored mock_session)
    let isDemoLocal = false;
    try {
      const mock = typeof window !== 'undefined' ? localStorage.getItem('mock_session') : null;
      if (mock) {
        const parsed = JSON.parse(mock);
        // the demo session you set up stores user with id like 'demo_user_...'
        const mockId = parsed?.user?.id;
        if (typeof mockId === 'string' && mockId.startsWith('demo_user_')) {
          isDemoLocal = true;
        }
      }
    } catch (e) {
      isDemoLocal = false;
    }

    // If auth user exists but is a demo user (id starting with demo_user_), block
    if (authUser && typeof authUser.id === 'string' && authUser.id.startsWith('demo_user_')) {
      alert('Please log in with a verified account to use the chatbot.');
      return;
    }

    // If we have a demo stored in local storage (demo flow) and no real auth user, block
    if (!authUser && isDemoLocal) {
      alert('Please log in with a verified account to use the chatbot.');
      return;
    }

    // If no auth user and no demo local session, also block (not signed in)
    if (!authUser && !isDemoLocal) {
      alert('Please log in to use the chatbot.');
      return;
    }

    // Otherwise we have a real signed-in user -> open chat normally
    setIsOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="fixed bottom-24 lg:bottom-6 right-6 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleChatClick} // <-- guarded click
          className="relative w-16 h-16 gradient-orange rounded-full shadow-2xl flex items-center justify-center group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full blur animate-pulse opacity-75" />

          <div className="relative z-10 flex items-center justify-center">
            <MessageCircle size={28} className="text-white group-hover:scale-110 transition-transform" />
          </div>

          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>

          <div className="absolute inset-0 rounded-full border-2 border-orange-300 animate-ping opacity-20" />
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-gradient-to-br from-black/40 via-black/30 to-orange-900/10 backdrop-blur-md z-40"
            />

            <motion.div
              initial={{ opacity: 0, y: "100%", scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: "100%", scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 h-[85vh] z-50"
            >
              <div className="h-full mx-4 mb-4 overflow-hidden">
                <div className="h-full glass-card shadow-2xl flex flex-col relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-orange-50/30" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-100/40 to-transparent rounded-full blur-2xl" />

                  <div className="relative z-10 flex items-center justify-between p-6 border-b border-border/30">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 gradient-orange rounded-xl flex items-center justify-center shadow-lg">
                          <Bot size={24} className="text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse mx-auto mt-0.5" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-lg">AI Assistant</h3>
                          <Sparkles className="w-5 h-5 text-orange-500" />
                        </div>
                        <p className="text-sm text-muted-foreground">Powered by Advanced AI • Always Online</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 hover:bg-orange-50 rounded-xl transition-all duration-200 group"
                    >
                      <X size={24} className="text-foreground group-hover:text-orange-500 group-hover:rotate-90 transition-all" />
                    </button>
                  </div>

                  <div className="relative z-10 flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                      >
                        <div className="flex items-start space-x-3 max-w-[85%]">
                          {message.isBot && (
                            <div className="w-8 h-8 gradient-orange rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                              <Bot size={16} className="text-white" />
                            </div>
                          )}
                          <div
                            className={`p-4 rounded-2xl shadow-sm relative overflow-hidden ${message.isBot
                              ? 'bg-gradient-to-r from-white to-orange-50/50 text-foreground border border-orange-100/50'
                              : 'gradient-orange text-white shadow-lg shadow-orange-200/50'
                              }`}
                          >
                            {message.isBot && (
                              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-400 to-orange-600" />
                            )}
                            <p className="text-sm leading-relaxed">{message.text}</p>
                            <div className={`text-xs mt-2 ${message.isBot ? 'text-muted-foreground' : 'text-orange-100'}`}>
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-start space-x-3 max-w-[85%]">
                          <div className="w-8 h-8 gradient-orange rounded-lg flex items-center justify-center flex-shrink-0">
                            <Bot size={16} className="text-white" />
                          </div>
                          <div className="bg-gradient-to-r from-white to-orange-50/50 p-4 rounded-2xl border border-orange-100/50 relative">
                            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-400 to-orange-600" />
                            <div className="flex space-x-2 items-center">
                              <span className="text-sm text-muted-foreground">AI is thinking</span>
                              <div className="flex space-x-1">
                                <motion.div
                                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                  transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                                  className="w-2 h-2 bg-orange-400 rounded-full"
                                />
                                <motion.div
                                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                  transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                                  className="w-2 h-2 bg-orange-400 rounded-full"
                                />
                                <motion.div
                                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                  transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                                  className="w-2 h-2 bg-orange-400 rounded-full"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="relative z-10 p-6 border-t border-border/30 bg-gradient-to-r from-white/90 to-orange-50/30">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Ask me anything about insurance..."
                          className="w-full h-14 px-6 pr-16 bg-white/80 backdrop-blur-sm border border-orange-100/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 transition-all duration-200 shadow-sm"
                        />
                        <button
                          onClick={toggleVoice}
                          className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-xl transition-all duration-200 ${isListening
                            ? 'bg-orange-500 text-white animate-pulse shadow-lg'
                            : 'text-muted-foreground hover:text-orange-500 hover:bg-orange-50'
                            }`}
                        >
                          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                        </button>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSendMessage}
                        disabled={!inputText.trim() || isTyping}
                        className="w-14 h-14 gradient-orange rounded-2xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl disabled:hover:shadow-lg group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity" />
                        <Send size={22} className="text-white relative z-10 group-hover:scale-110 transition-transform" />
                      </motion.button>
                    </div>

                    <div className="flex items-center justify-center mt-3 space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span>AI Online</span>
                      </div>
                      <span>•</span>
                      <span>Powered by Ask My Policy Pro</span>
                      <span>•</span>
                      <span>End-to-end encrypted</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
