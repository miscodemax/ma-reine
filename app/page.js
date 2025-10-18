'use client'

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Heart, Sparkles, Moon, MessageCircle, ChevronRight, Music, Star, Zap, CloudRain } from 'lucide-react';

const RomanticJourney = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const [isClient, setIsClient] = useState(false);
  const [particleStyles, setParticleStyles] = useState([]);
  const [isAudioPaused, setIsAudioPaused] = useState(true);

  const contentRef = useRef(null);
  const bgRef = useRef(null);
  const audioRef = useRef(null);
  
  useEffect(() => {
    setIsClient(true);

    const styles = Array.from({ length: 30 }).map(() => ({
      width: `${Math.random() * 6 + 2}px`,
      height: `${Math.random() * 6 + 2}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.3 + 0.1,
      animation: `floatParticle ${Math.random() * 15 + 10}s infinite ease-in-out`,
      animationDelay: `${Math.random() * 5}s`
    }));
    setParticleStyles(styles);
  }, []);

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
      bgGradient: "from-purple-900/30 via-pink-900/20 to-red-900/30",
      emoji: "🏁",
      bgIcons: [Heart, Sparkles, Star]
    },
    {
      icon: Sparkles,
      title: "Flashback",
      content: "Tu te souviens de la 3e ? On se parlait, on se chambrait, tranquille... J'me disais que j'aurais le temps. Spoiler : j'ai eu tort 😅",
      buttonText: "Et depuis ?",
      gradient: "from-blue-600 via-cyan-500 to-teal-400",
      bgGradient: "from-blue-900/30 via-cyan-900/20 to-teal-900/30",
      emoji: "💭",
      bgIcons: [CloudRain, Moon, Star]
    },
    {
      icon: Heart,
      title: "L'attachement",
      content: "Depuis, impossible de t'oublier. 5 ans, c'est long. Et pourtant, t'es toujours là, quelque part dans un coin de ma tête.\nJe sais, c'est fou mais c'est la vérité.",
      buttonText: "Têtu, hein ?",
      gradient: "from-red-500 via-pink-500 to-rose-400",
      bgGradient: "from-red-900/30 via-pink-900/20 to-rose-900/30",
      emoji: "❤️",
      bgIcons: [Heart, Sparkles, Zap]
    },
    {
      icon: Sparkles,
      title: "La complicité",
      content: "Ouais, têtu, c'est moi.\nEt qu'on le veuille ou non, y'a un truc entre nous. Appelle ça comme tu veux, mais cette complicité-là, elle court pas les rues.\nSérieux, je sais même pas comment tu fais pour me résister 😌",
      buttonText: "T'exagères un peu.",
      gradient: "from-amber-500 via-orange-500 to-red-500",
      bgGradient: "from-amber-900/30 via-orange-900/20 to-red-900/30",
      emoji: "😏",
      bgIcons: [Star, Sparkles, Zap],
      image: "/preuve.jpg"
    },
    {
      icon: Heart,
      title: "C'est toi que je veux",
      content: "Je suis pas là pour une énième déclaration, ni pour un énième râteau.\nTon choix, je le respecte. Si tu veux pas t'engager, ok. Mais moi, je suis là. Et je compte pas disparaître.\nJ'abandonne pas facilement. C'est pas mon genre.",
      buttonText: "Et donc ?",
      gradient: "from-indigo-600 via-purple-500 to-pink-500",
      bgGradient: "from-indigo-900/30 via-purple-900/20 to-pink-900/30",
      emoji: "🤝",
      bgIcons: [Heart, Moon, Star]
    },
    {
      icon: Moon,
      title: "La promesse douce",
      content: "Tout ce que je veux, c'est te voir sourire. Être là, peu importe le rôle que tu m'accordes.\nMême si, pour l'instant, c'est juste 'le pote relou mais cool'.\nEt ouais, j'espère qu'un jour, j'aurai une place un peu plus près de ton cœur.",
      buttonText: "T'as fini ton speech ? 😅",
      gradient: "from-slate-700 via-indigo-600 to-purple-600",
      bgGradient: "from-slate-900/30 via-indigo-900/20 to-purple-900/30",
      emoji: "🌙",
      bgIcons: [Moon, Star, Sparkles]
    },
    {
      icon: Sparkles,
      title: "bref je t'aime",
      content: "Ouais, j'ai fini. Mais je te préviens : je compte toujours pas te lâcher d'une semelle 😎\n(Et t'as pas intérêt à dire que ça t'a pas fait sourire.)",
      buttonText: "Ok, t'as gagné.",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      bgGradient: "from-emerald-900/30 via-teal-900/20 to-cyan-900/30",
      emoji: "🌸",
      bgIcons: [Heart, Sparkles, Star]
    }
  ];

  const handleNext = () => {
    if (isAnimating) return;
    
    if (currentPage === 0 && audioRef.current && !musicPlaying) {
      audioRef.current.play().catch(err => console.log('Erreur lecture audio:', err));
      setMusicPlaying(true);
      setIsAudioPaused(false);
    }
    
    setIsAnimating(true);
    
    if (contentRef.current) {
      contentRef.current.style.animation = 'exitPage 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';
    }
    
    setTimeout(() => {
      setCurrentPage((prev) => (prev + 1) % pages.length);
      
      if (contentRef.current) {
        contentRef.current.style.animation = 'enterPage 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';
      }
      
      setTimeout(() => {
        setIsAnimating(false);
        if (contentRef.current) {
          contentRef.current.style.animation = 'none';
        }
      }, 800);
    }, 800);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsAudioPaused(false);
      } else {
        audioRef.current.pause();
        setIsAudioPaused(true);
      }
    }
  };

  const page = pages[currentPage];
  const Icon = page.icon;
  const isFinalPage = currentPage === pages.length - 1;

  return (
    <div className="relative min-h-screen bg-black overflow-y-auto overflow-x-hidden scrollbar-custom">
      <div ref={bgRef} className="fixed inset-0 w-screen h-full overflow-hidden">
        <div 
          className={`absolute inset-0 w-full h-full bg-gradient-to-br ${page.bgGradient} transition-all duration-1000 ease-in-out overflow-hidden w-screen`}
          style={{
            transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px) scale(1.1)`
          }}
        />
        
        {page.bgIcons.map((BgIcon, idx) => (
          <div
            key={`${currentPage}-${idx}`}
            className="absolute text-white/5"
            style={{
              left: `${Math.min(20 + idx*30, 100 - 16)}%`, // 16% approx largeur de l’icone
              top: `${15 + idx * 25}%`,
              animation: `floatIcon ${8 + idx * 2}s ease-in-out infinite`,
              animationDelay: `${idx * 0.5}s`
            }}
          >
            <BgIcon className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64" />
          </div>
        ))}
        
        {isClient && particleStyles.map((style, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={style}
          />
        ))}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_50%)] opacity-50" />
      </div>

      <audio 
        ref={audioRef} 
        loop 
        preload="auto"
      >
        <source src="/DanielCaesar-Superpowers.mp3" type="audio/mpeg" />
      </audio>

      {musicPlaying && (
        <div className="fixed top-6 right-6 sm:top-8 sm:right-8 z-50 flex items-center gap-2 text-white/60 backdrop-blur-md bg-white/5 px-4 py-2 rounded-full border border-white/10 animate-slideInRight">
          <Music className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
          <span className="text-xs sm:text-sm hidden sm:inline">Musique d'ambiance...</span>
          <button
            onClick={toggleMusic}
            className="ml-2 text-white/80 hover:text-white transition-colors"
            aria-label="Pause/Play musique"
          >
            {isAudioPaused ? '▶️' : '⏸️'}
          </button>
        </div>
      )}

      <div className="fixed top-6 sm:top-8 left-1/2 -translate-x-1/2 z-50 flex gap-2 backdrop-blur-md bg-white/5 px-4 py-2 rounded-full border border-white/10">
        {pages.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-700 ${
              index === currentPage 
                ? 'w-8 bg-white shadow-lg shadow-white/50' 
                : index < currentPage 
                  ? 'w-2 bg-white/50' 
                  : 'w-2 bg-white/20'
            }`}
          />
        ))}
      </div>

      <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-20 sm:py-24">
        <div
          ref={contentRef}
          className="w-full max-w-4xl"
        >
          <div className="text-center mb-6 sm:mb-8 animate-floatEmoji">
            <span className="text-7xl sm:text-8xl md:text-9xl filter drop-shadow-2xl inline-block">
              {page.emoji}
            </span>
          </div>

          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-r ${page.gradient} blur-2xl opacity-60 rounded-full animate-pulse group-hover:blur-3xl group-hover:opacity-80 transition-all duration-300`} />
              <div className="relative bg-white/10 backdrop-blur-xl p-4 sm:p-6 rounded-full border border-white/20 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white text-center mb-6 sm:mb-8 tracking-tight drop-shadow-2xl">
            {page.title}
          </h1>

          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-12 border border-white/10 shadow-2xl mb-6 sm:mb-8 transform hover:scale-[1.02] hover:bg-white/10 transition-all duration-500 group">
            <div className={`flex flex-col ${page.image ? 'md:flex-row' : ''} gap-6 md:gap-8 items-center`}>
              <p className={`text-base sm:text-xl md:text-2xl text-white/90 leading-relaxed whitespace-pre-line font-light group-hover:text-white transition-colors duration-300 ${page.image ? 'md:flex-1 text-center md:text-left' : 'text-center'}`}>
                {page.content}
              </p>

              {page.image && (
                <div className="flex-shrink-0">
                  <Image 
                    src={page.image} 
                    alt="Preuve de complicité" 
                    width={280} 
                    height={280} 
                    className="rounded-2xl shadow-2xl object-cover w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px]"
                    priority={currentPage === pages.findIndex(p => p.image)}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleNext}
              disabled={isAnimating}
              className={`group relative px-8 sm:px-14 md:px-16 py-4 sm:py-5 md:py-6 rounded-full bg-gradient-to-r ${page.gradient} text-white font-bold text-base sm:text-lg md:text-xl shadow-2xl transform hover:scale-110 active:scale-95 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white/20`}
            >
              <span className="relative z-10 flex items-center gap-3">
                {page.buttonText}
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
          </div>

          {isFinalPage && (
            <div className="mt-8 sm:mt-12 text-center animate-fadeInUp">
              <div className="inline-block bg-white/5 backdrop-blur-2xl rounded-2xl sm:rounded-3xl px-6 sm:px-8 py-4 sm:py-5 border border-white/10 shadow-2xl">
                <p className="text-white/80 text-sm sm:text-base md:text-lg italic font-light">
                  &ldquo;C&apos;était juste moi, encore têtu, encore là.&rdquo;
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        /* Scrollbar personnalisée */
        .scrollbar-custom::-webkit-scrollbar {
          width: 10px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(147, 51, 234, 0.6), rgba(236, 72, 153, 0.6));
          border-radius: 10px;
          border: 2px solid rgba(0, 0, 0, 0.3);
        }
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(147, 51, 234, 0.8), rgba(236, 72, 153, 0.8));
        }
        
        .scrollbar-custom {
          scrollbar-width: thin;
          scrollbar-color: rgba(147, 51, 234, 0.6) rgba(255, 255, 255, 0.05);
        }

        @keyframes floatParticle {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.1; }
          25% { transform: translate(30px, -40px) rotate(90deg); opacity: 0.3; }
          50% { transform: translate(-20px, -80px) rotate(180deg); opacity: 0.2; }
          75% { transform: translate(40px, -60px) rotate(270deg); opacity: 0.25; }
        }
        @keyframes floatIcon {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          25% { transform: translate(20px, -30px) rotate(5deg) scale(1.1); }
          50% { transform: translate(-15px, -50px) rotate(-5deg) scale(0.95); }
          75% { transform: translate(30px, -40px) rotate(3deg) scale(1.05); }
        }
        @keyframes floatEmoji {
          0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
          50% { transform: translateY(-20px) scale(1.1) rotate(5deg); }
        }
        @keyframes exitPage {
          0% { opacity: 1; transform: translateX(0) scale(1) rotateY(0deg); }
          100% { opacity: 0; transform: translateX(-100px) scale(0.8) rotateY(-20deg); }
        }
        @keyframes enterPage {
          0% { opacity: 0; transform: translateX(100px) scale(0.8) rotateY(20deg); }
          100% { opacity: 1; transform: translateX(0) scale(1) rotateY(0deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-floatEmoji { animation: floatEmoji 4s ease-in-out infinite; }
        .animate-fadeInUp { animation: fadeInUp 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .animate-slideInRight { animation: slideInRight 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
      `}</style>
    </div>
  );
};

export default RomanticJourney;