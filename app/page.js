'use client'

import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Moon, MessageCircle, ChevronRight, Music } from 'lucide-react';

const RomanticJourney = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const pages = [
    {
      icon: MessageCircle,
      title: "Hey.",
      content: "Respire, c'est pas une nouvelle déclaration 😅 Promis, pas de drama cette fois.\nJuste moi, et un petit truc que j'ai codé pour toi.",
      buttonText: "Ok, montre-moi ton délire.",
      gradient: "from-purple-600 via-pink-500 to-red-500",
      emoji: "🏁"
    },
    {
      icon: Sparkles,
      title: "Flashback",
      content: "Tu te souviens de la 3e ? On se parlait, on se chambrait, tranquille... J'me disais que j'aurais le temps. Spoiler : j'ai eu tort 😅",
      buttonText: "Et depuis ?",
      gradient: "from-blue-600 via-cyan-500 to-teal-400",
      emoji: "💭"
    },
    {
      icon: Heart,
      title: "L'attachement",
      content: "Depuis, impossible de t'oublier. 5 ans, c'est long. Et pourtant, t'es toujours là, quelque part dans un coin de ma tête.\nJe sais, c'est pas très malin.",
      buttonText: "Têtu, hein ?",
      gradient: "from-red-500 via-pink-500 to-rose-400",
      emoji: "❤️"
    },
    {
      icon: Sparkles,
      title: "La complicité",
      content: "Ouais, têtu, c'est moi.\nEt qu'on le veuille ou non, y'a un truc entre nous. Appelle ça comme tu veux, mais cette complicité-là, elle court pas les rues.\nSérieux, je sais même pas comment tu fais pour me résister 😌",
      buttonText: "T'exagères un peu.",
      gradient: "from-amber-500 via-orange-500 to-red-500",
      emoji: "😏"
    },
    {
      icon: Heart,
      title: "Le message vrai",
      content: "Je suis pas là pour une énième déclaration, ni pour un énième râteau.\nTon choix, je le respecte. Si tu veux pas t'engager, ok. Mais moi, je suis là. Et je compte pas disparaître.\nJ'abandonne pas facilement. C'est pas mon genre.",
      buttonText: "Et donc ?",
      gradient: "from-indigo-600 via-purple-500 to-pink-500",
      emoji: "🤝"
    },
    {
      icon: Moon,
      title: "La promesse douce",
      content: "Tout ce que je veux, c'est te voir sourire. Être là, peu importe le rôle que tu m'accordes.\nMême si, pour l'instant, c'est juste 'le pote relou mais cool'.\nEt ouais, j'espère qu'un jour, j'aurai une place un peu plus près de ton cœur.",
      buttonText: "T'as fini ton speech ? 😅",
      gradient: "from-slate-700 via-indigo-600 to-purple-600",
      emoji: "🌙"
    },
    {
      icon: Sparkles,
      title: "Fin taquine",
      content: "Ouais, j'ai fini. Mais je te préviens : je compte toujours pas te lâcher d'une semelle 😎\n(Et t'as pas intérêt à dire que ça t'a pas fait sourire.)",
      buttonText: "Ok, t'as gagné.",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      emoji: "🌸"
    }
  ];

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage((prev) => (prev + 1) % pages.length);
      setIsAnimating(false);
      if (currentPage === pages.length - 2) {
        setMusicPlaying(true);
      }
    }, 300);
  };

  const page = pages[currentPage];
  const Icon = page.icon;
  const isFinalPage = currentPage === pages.length - 1;

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${page.gradient} opacity-20 transition-all duration-1000`}
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-10"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
              animationDelay: Math.random() * 5 + 's'
            }}
          />
        ))}
      </div>

      {/* Music Indicator */}
      {musicPlaying && (
        <div className="absolute top-8 right-8 z-50 flex items-center gap-2 text-white/60 animate-pulse">
          <Music className="w-5 h-5" />
          <span className="text-sm hidden sm:inline">Musique douce en cours...</span>
        </div>
      )}

      {/* Progress Dots */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {pages.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === currentPage 
                ? 'w-8 bg-white' 
                : index < currentPage 
                  ? 'w-2 bg-white/50' 
                  : 'w-2 bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-8">
        <div
          className={`w-full max-w-2xl transition-all duration-500 ${
            isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          {/* Emoji */}
          <div className="text-center mb-8 animate-bounce-slow">
            <span className="text-6xl sm:text-8xl filter drop-shadow-2xl">
              {page.emoji}
            </span>
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-r ${page.gradient} blur-xl opacity-50 rounded-full animate-pulse`} />
              <div className="relative bg-white/10 backdrop-blur-sm p-4 rounded-full">
                <Icon className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white text-center mb-8 tracking-tight">
            {page.title}
          </h1>

          {/* Content Card */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl mb-8 transform hover:scale-[1.02] transition-all duration-300">
            <p className="text-base sm:text-lg md:text-xl text-white/90 text-center leading-relaxed whitespace-pre-line font-light">
              {page.content}
            </p>
          </div>

          {/* Button */}
          <div className="flex justify-center">
            <button
              onClick={handleNext}
              className={`group relative px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-gradient-to-r ${page.gradient} text-white font-semibold text-base sm:text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden`}
            >
              <span className="relative z-10 flex items-center gap-3">
                {page.buttonText}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
          </div>

          {/* Final Message */}
          {isFinalPage && (
            <div className="mt-12 text-center animate-fade-in">
              <div className="inline-block bg-white/5 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/10">
                <p className="text-white/70 text-sm sm:text-base italic">
                  "C'était juste moi, encore têtu, encore là."
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RomanticJourney;