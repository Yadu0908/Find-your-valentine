import React, { useState, useEffect, useMemo } from "react";
// Make sure these paths match your actual folder structure
import boyMemeImg from "./assets/pw-memes-alakh-sir-padhai.gif";
import girlMemeImg from "./assets/mirzapur.gif";
import emailjs from "@emailjs/browser";

// --- Built-in SVG Icons (no external dependencies) ---
const HeartIcon = ({ className = "w-6 h-6", fill = "none" }) => (
  <svg
    className={className}
    fill={fill}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SparklesIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
);

const LightbulbIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>
);

const TargetIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
    />
  </svg>
);

// --- Interactive Animated Background ---
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ffe6f2] via-[#ffd4e5] to-[#ffc2d9]"></div>

      {/* Animated Blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 md:w-96 md:h-96 bg-pink-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 md:w-96 md:h-96 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-72 h-72 md:w-96 md:h-96 bg-yellow-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-pink-50/50 via-transparent to-transparent"></div>
    </div>
  );
};

// --- Floating Hearts Component (SVG) ---
const FloatingHearts = () => {
  const hearts = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 15 + 25,
      delay: Math.random() * 8,
      duration: Math.random() * 8 + 12,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-up"
          style={{
            left: `${heart.left}%`,
            bottom: "-50px",
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            fontSize: `${heart.size}px`,
          }}
        >
          <HeartIcon className="text-pink-300/40" fill="currentColor" />
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState("form");
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Initializing...");

  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    gender: "female",
    desperationLevel: 5,
  });

  const loadingMessages = [
    "Scanning the universe...",
    "Filtering out red flags...",
    "Consulting with Cupid...",
    "Reading the stars...",
    "Calculating compatibility...",
    "Checking destiny database...",
    "Almost there...",
  ];

  useEffect(() => {
    if (currentPage === "loading") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setCurrentPage("result"), 500);
            return 100;
          }
          return prev + 1;
        });
      }, 40);

      const messageInterval = setInterval(() => {
        setLoadingMessage(
          loadingMessages[Math.floor(Math.random() * loadingMessages.length)],
        );
      }, 1500);

      return () => {
        clearInterval(interval);
        clearInterval(messageInterval);
      };
    }
  }, [currentPage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.dateOfBirth) {
      alert("Please fill all fields!");
      return;
    }
    // 2. Prepare the data for EmailJS
    const templateParams = {
      user_name: formData.name,
      user_dob: formData.dateOfBirth,
      user_gender: formData.gender,
      user_desperation: `${formData.desperationLevel}/10 - ${getDesperationText(formData.desperationLevel)}`,
    };

    // 3. Send the Email
    // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', and 'YOUR_PUBLIC_KEY' with your actual IDs
    emailjs.send(
      'service_vl9ebtm',
      'template_p8bt5oj',
      templateParams,
      'JEsyUVWyagUZwW-jz'
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
    })
    .catch((err) => {
      console.error('FAILED...', err);
    });

    setCurrentPage("loading");
    setProgress(0);
  };

  const getDesperationText = (level) => {
    if (level === 1) return "Emotionally Stable (Rare Species)";
    if (level === 2) return "Thoda Single Thoda Peaceful";
    if (level === 3) return "Mildly Lonely";
    if (level === 4) return "Casually Manifesting";
    if (level === 5) return "Checking Reels for Signs";
    if (level === 6) return "Actively Manifesting";
    if (level === 7) return "Replying Instantly";
    if (level === 8) return "Desperately Seeking";
    if (level === 9) return "Emotionally Unhinged";
    if (level === 10) return "Certified Down Bad";
    return "Down bad tremendously";
  };

  const resetForm = () => {
    setCurrentPage("form");
    setProgress(0);
    setFormData({
      name: "",
      dateOfBirth: "",
      gender: "female",
      desperationLevel: 5,
    });
  };

  // Get gender-specific message
  const getGenderMessage = () => {
    if (formData.gender === "male") {
      return "bs kr bhai kb tk ye sab krega.";
    } else {
      return "bs kr behan aur pdhai likhai pe dhyaan de";
    }
  };




  // --- LOADING PAGE ---
  if (currentPage === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 font-poppins relative overflow-hidden">
        <AnimatedBackground />
        <FloatingHearts />
        <div className="w-full max-w-sm glass-card rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 text-center z-10">
          <div className="mb-5 sm:mb-6 relative flex justify-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-tr from-[#ff4b8b] to-[#ff9068] rounded-full flex items-center justify-center animate-pulse-slow shadow-2xl shadow-pink-300/50">
              <HeartIcon
                className="w-10 h-10 sm:w-12 sm:h-12 text-white"
                fill="currentColor"
              />
            </div>
          </div>
          <div className="w-full bg-white/30 backdrop-blur-sm rounded-full h-3 sm:h-4 mb-4 sm:mb-5 overflow-hidden shadow-inner border border-white/40">
            <div
              className="h-full bg-gradient-to-r from-[#ff4b8b] to-[#ff9068] transition-all duration-300 rounded-full shadow-lg"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            {progress}%
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium">
            {loadingMessage}
          </p>
        </div>
      </div>
    );
  }

  // --- RESULT PAGE ---
  if (currentPage === "result") {
    const memeToShow = formData.gender === "male" ? boyMemeImg : girlMemeImg;

    return (
      <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 font-poppins relative overflow-hidden">
        <AnimatedBackground />
        <FloatingHearts />

        <div className="w-full max-w-md glass-pink-card rounded-3xl sm:rounded-[32px] shadow-2xl p-5 sm:p-6 md:p-8 text-center relative z-10 animate-fade-in-up border border-pink-200">
          {/* Compatibility Box */}
          <div className="bg-gradient-to-br from-pink-50 to-pink-100/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-5 sm:mb-6 border-2 border-pink-200 shadow-sm">
            <p className="text-lg sm:text-xl md:text-1xl font-bold text-[#ff4b8b] mb-1 sm:mb-2">
              Compatibility Score: Kyun btaau ?
            </p>
            <p className="text-xs sm:text-sm text-gray-700 font-semibold leading-relaxed">
              {getGenderMessage()}
            </p>
          </div>

          {/* Meme Image */}
          <div className="flex justify-center mb-4 sm:mb-5">
            <img
              src={memeToShow}
              alt="Meme"
              className="rounded-xl sm:rounded-2xl shadow-lg w-full object-cover border-3 sm:border-4 border-pink-100"
            />
          </div>

          {/* Added Text */}
          <h2 className="text-xl sm:text-2xl md:text-2xl font-serif font-bold text-[#ff4b8b] mb-5 sm:mb-6 leading-tight">
            PDHAI LIKHAI KI UMAR MAI
            <br /> YE SAB KRNA HAI.
          </h2>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
            <div className="p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl border-2 border-gray-200 shadow-sm">
              <div className="text-xl sm:text-2xl font-bold text-[#ff4b8b] mb-1">
                ∞
              </div>
              <div className="text-[9px] sm:text-[11px] text-gray-600 uppercase tracking-wider font-bold">
                Days Single
              </div>
            </div>
            <div className="p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl border-2 border-gray-200 shadow-sm">
              <div className="text-xl sm:text-2xl font-bold text-[#ff4b8b] mb-1">
                404
              </div>
              <div className="text-[9px] sm:text-[11px] text-gray-600 uppercase tracking-wider font-bold">
                Match Not Found
              </div>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="bg-gradient-to-r from-[#fffbeb] to-[#fef3c7] border-2 border-[#fbbf24] rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-5 sm:mb-6 text-left shadow-sm">
            <p className="text-[11px] sm:text-xs text-gray-800 leading-relaxed font-medium flex items-start gap-2">
              <LightbulbIcon className="w-4 h-4 text-[#d97706] flex-shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#d97706]">Pro Tip:</strong> Mera latest
                gaana check kro, Pdhai likhai karo, aur ma-baap ko proud kro,
                and remember: success is the best Valentine gift for you!
              </span>
            </p>
          </div>

          <button
            onClick={resetForm}
            style={{
              background: "linear-gradient(135deg, #ff5e89, #ff4b8b)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow:
                "0 8px 32px rgba(255, 75, 139, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
            }}
            className="w-full py-3 sm:py-4 rounded-full text-white font-bold text-sm sm:text-base transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, #ff5e89, #ff4b8b)";
              e.currentTarget.style.boxShadow =
                "0 12px 40px rgba(255, 75, 139, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, #ff5e89, #ff4b8b)";
              e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(255, 75, 139, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.4)";
            }}
          >
            <TargetIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            Try Again (It Won't Help Though)
          </button>
        </div>
      </div>
    );
  }

  // --- FORM PAGE (Main Design) ---
  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 font-poppins relative overflow-hidden">
      <AnimatedBackground />
      <FloatingHearts />

      {/* Outer Glass Container */}
      <div className="w-full max-w-4xl glass-card rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] p-2 sm:p-3 md:p-6 shadow-2xl relative z-10">
        {/* Inner Glass-Pink Card */}
        <div className="glass-pink-card rounded-[1.75rem] sm:rounded-[2rem] md:rounded-[2.5rem] p-5 sm:p-6 md:p-10 lg:p-12 grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 relative overflow-hidden shadow-inner">
          {/* Decorative Hearts (Background) */}
          <div className="absolute top-[-10px] sm:top-[-15px] right-[-10px] sm:right-[-15px] text-[#ff4b8b] opacity-15 transform rotate-12 pointer-events-none">
            <HeartIcon
              className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32"
              fill="currentColor"
            />
          </div>
          <div className="absolute bottom-[-15px] sm:bottom-[-20px] left-[-15px] sm:left-[-20px] text-[#ff4b8b] opacity-10 transform -rotate-12 pointer-events-none">
            <HeartIcon
              className="w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28"
              fill="currentColor"
            />
          </div>

          {/* Left Column: Text */}
          <div className="flex flex-col justify-center z-10">
            <div className="mb-3 sm:mb-4">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-pink-50 to-pink-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-2 sm:mb-3 shadow-sm border-2 border-pink-200">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-[#ff4b8b] to-[#ff6b6b] rounded-full flex items-center justify-center shadow-md">
                  <HeartIcon
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                    fill="currentColor"
                  />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-gray-700">
                  Find Your Valentine
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-gray-400 ml-1 font-medium">
                A very serious compatibility check
              </p>
            </div>
            <div className="text-left md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#2d2d2d] leading-tight mb-3 sm:mb-4">
                Find Your <br className="hidden md:block mt-1" />
                <span className="bg-gradient-to-r from-[#ff4b8b] to-[#ff6b6b] bg-clip-text text-transparent">
                  Valentine
                </span>
              </h1>
            </div>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 font-medium">
              Ham apke liye personally aapka pyaar doodhenge.
            </p>

            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-500 font-semibold">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-400 rounded-full animate-pulse shadow-sm"></span>
              Millions of customers are happy due to our platform
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="flex flex-col justify-center z-10">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gray-50 border-2 border-gray-200 focus:bg-white focus:border-pink-300 focus:ring-4 focus:ring-pink-100 outline-none transition-all text-sm text-gray-700 font-medium"
                  placeholder="e.g. Alex"
                  required
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">
                  Date of birth
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    setFormData({ ...formData, dateOfBirth: e.target.value })
                  }
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gray-50 border-2 border-gray-200 focus:bg-white focus:border-pink-300 focus:ring-4 focus:ring-pink-100 outline-none transition-all text-sm text-gray-700 font-medium"
                  required
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">
                  Gender
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Female", "Male", "Other"].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, gender: g.toLowerCase() })
                      }
                      className={`py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 border-2 ${
                        formData.gender === g.toLowerCase()
                          ? "bg-gradient-to-r from-[#ff5e89] to-[#ff4b8b] text-white border-[#ff4b8b] shadow-lg shadow-pink-300/40 scale-105"
                          : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider */}
              <div className="pt-1 sm:pt-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs sm:text-sm font-bold text-gray-700">
                    Desperation level{" "}
                    <span className="text-gray-400 font-normal text-[10px] sm:text-xs">
                      (1-10)
                    </span>
                  </label>
                </div>

                <div className="relative w-full h-6 flex items-center">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.desperationLevel}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        desperationLevel: parseInt(e.target.value),
                      })
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #ff9a9e 0%, #ff4b8b ${(formData.desperationLevel - 1) * 11.11}%, #e5e7eb ${(formData.desperationLevel - 1) * 11.11}%, #e5e7eb 100%)`,
                    }}
                  />
                </div>
                <p className="text-xs sm:text-sm text-[#ff4b8b] mt-2 font-bold text-right">
                  {getDesperationText(formData.desperationLevel)}
                </p>
              </div>

              {/* Button */}
              <button
                type="submit"
                style={{
                  background: "linear-gradient(135deg, #ff5e89, #ff4b8b)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  boxShadow:
                    "0 8px 32px rgba(255, 75, 139, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
                }}
                className="w-full py-3 sm:py-4 rounded-full text-white font-bold text-sm sm:text-base transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] active:scale-95 mt-2 sm:mt-3 flex items-center justify-center gap-2 touch-manipulation"
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 12px 40px rgba(255, 75, 139, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(255, 75, 139, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.4)";
                }}
              >
                <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                Start Valentine Scan
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-2 sm:bottom-3 w-full text-center text-[10px] sm:text-[11px] text-gray-400 px-3 sm:px-4 font-medium z-10">
        <p>
          © 2026 Find Your Valentine. • Made by Yadu. • No actual matches
          guaranteed.
        </p>
      </div>

      {/* Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Poppins:wght@400;500;600;700&display=swap');

        .font-serif { font-family: 'Playfair Display', serif; }
        .font-poppins { font-family: 'Poppins', sans-serif; }

        /* Glass Morphism Card */
        .glass-card {
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.6);
        }

        /* Glass Pink Card */
        .glass-pink-card {
          background: rgba(255, 240, 245, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 182, 193, 0.4);
        }

        /* Better touch targets for mobile */
        .touch-manipulation {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }

        /* Custom Slider Styling */
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          border: 4px solid #ff4b8b;
          cursor: pointer;
          box-shadow: 0 3px 8px rgba(255, 75, 139, 0.4);
          transition: all 0.2s;
        }

        @media (min-width: 640px) {
          .slider::-webkit-slider-thumb {
            width: 22px;
            height: 22px;
          }
        }

        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 4px 12px rgba(255, 75, 139, 0.6);
        }
        .slider::-webkit-slider-thumb:active {
          transform: scale(1.05);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          border: 4px solid #ff4b8b;
          cursor: pointer;
          box-shadow: 0 3px 8px rgba(255, 75, 139, 0.4);
        }

        @media (min-width: 640px) {
          .slider::-moz-range-thumb {
            width: 22px;
            height: 22px;
          }
        }

        /* Animated Blobs */
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(50px, 50px) scale(1.05);
          }
        }

        .animate-blob {
          animation: blob 15s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        /* Float Up Animation */
        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          50% {
            transform: translateY(-50vh) translateX(20px) rotate(180deg);
            opacity: 0.4;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-110vh) translateX(-20px) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float-up {
          animation: floatUp linear infinite;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulseSlow 2s ease-in-out infinite;
        }

        /* Improve mobile scrolling */
        @media (max-width: 640px) {
          body {
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
    </div>
  );
}
