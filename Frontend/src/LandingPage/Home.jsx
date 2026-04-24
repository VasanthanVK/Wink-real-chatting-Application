import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Emailverified from "../components/Emailverified";
import Inputotp from "../components/Inputotp";



const NAV_LINKS = ["Features", "How It Works", "Pricing", "Testimonials"];


const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Real-Time Messaging",
    desc: "Instant delivery with zero latency. Messages appear the moment they're sent — no polling, no delays.",
    color: "from-violet-500 to-indigo-500",
    bg: "bg-violet-50",
    text: "text-violet-600",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "End-to-End Encryption",
    desc: "Every message is secured with military-grade AES-256 encryption. Only you and your recipient can read it.",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Group Channels",
    desc: "Create unlimited group chats, channels, and communities. Organize by topic, team, or interest.",
    color: "from-orange-500 to-rose-500",
    bg: "bg-orange-50",
    text: "text-orange-600",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
        <path d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Video & Voice Calls",
    desc: "Crystal-clear HD video and voice calls. Jump from text to face-to-face in a single tap.",
    color: "from-sky-500 to-blue-500",
    bg: "bg-sky-50",
    text: "text-sky-600",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Rich Media Sharing",
    desc: "Share photos, videos, files, and GIFs up to 2GB. Preview everything inline without leaving the chat.",
    color: "from-pink-500 to-fuchsia-500",
    bg: "bg-pink-50",
    text: "text-pink-600",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Smart Notifications",
    desc: "AI-powered notification filtering. Get alerted for what matters, silenced for what doesn't.",
    color: "from-amber-500 to-yellow-500",
    bg: "bg-amber-50",
    text: "text-amber-600",
  },
];

const STEPS = [
   { num: "01", title: "Enter your  Email ID", desc: "Your Email ID are enter after you can recevied otp from ours side" },
   { num: "02", title: "Enter your OTP", desc: "Your Otp are verifiyed after you can create your account in wink" },
  { num: "03", title: "Create Your Account", desc: "Sign up in 30 seconds with your email or social login. No credit card required." },
  { num: "04", title: "Invite Your People", desc: "Share a link or search by username to connect with friends, family, or teammates." },
  { num: "05", title: "Start Chatting", desc: "Send messages, share files, and jump on calls — all in one beautiful interface." },
];

const PLANS = [
  {
    name: "Free",
    price: "0",
    desc: "Perfect for personal use",
    features: ["Up to 5 group chats", "1GB file storage", "30-day message history", "Standard support"],
    cta: "Get Started Free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "9",
    desc: "For power users & small teams",
    features: ["Unlimited group chats", "50GB file storage", "Unlimited history", "Video calls up to 25 people", "Priority support", "Custom themes"],
    cta: "Start Pro Trial",
    highlight: true,
  },
  {
    name: "Team",
    price: "29",
    desc: "For growing organizations",
    features: ["Everything in Pro", "500GB file storage", "Admin controls & analytics", "Video calls up to 200 people", "SSO & 2FA", "Dedicated support"],
    cta: "Contact Sales",
    highlight: false,
  },
];

const TESTIMONIALS = [
  { name: "Sara Kim", role: "Product Lead, Notion", avatar: "SK", color: "bg-violet-100 text-violet-700", quote: "We replaced 3 different tools with Wink. Our team communication has never been this smooth." },
  { name: "James Okafor", role: "CTO, Finova", avatar: "JO", color: "bg-emerald-100 text-emerald-700", quote: "The encryption is top-notch. As a fintech company, trust and security are non-negotiable — Wink delivers." },
  { name: "Priya Nair", role: "Remote Team Manager", avatar: "PN", color: "bg-rose-100 text-rose-700", quote: "Managing a team across 6 time zones used to be chaos. Now everything is in one place, beautifully organized." },
];

const CHAT_MESSAGES = [
  { from: "them", name: "Alex", text: "Hey! Did you see the new design mockups?", time: "2:31 PM" },
  { from: "me", text: "Just opened them — they look incredible 🔥", time: "2:32 PM" },
  { from: "them", name: "Alex", text: "Right?! The team really outdid themselves this time.", time: "2:32 PM" },
  { from: "me", text: "Let's hop on a quick call to review before the client presentation.", time: "2:33 PM" },
  { from: "them", name: "Alex", text: "Perfect. Sending you the video link now 👌", time: "2:33 PM" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visibleMsgs, setVisibleMsgs] = useState(0);
  const [annual, setAnnual] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState("");
  

  const navigate=useNavigate()

const login = () => {
    navigate("/signin");
  };
  const HandleEmail = () => {
    setIsEmailModalOpen(true);
  };

  const handleEmailVerify = (email) => {
    setVerifiedEmail(email);
    setIsEmailModalOpen(false);
    setIsOtpModalOpen(true);
  };

  useEffect(() => {
    if (visibleMsgs < CHAT_MESSAGES.length) {
      const t = setTimeout(() => setVisibleMsgs((v) => v + 1), 700);
      return () => clearTimeout(t);
    }
  }, [visibleMsgs]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight">Wink</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{l}</a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm text-gray-600 hover:text-gray-900 px-4 py-2 transition-colors" onClick={login}>Log in</button>
            <button className="text-sm bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:opacity-90 transition-opacity shadow-lg shadow-violet-200" onClick={HandleEmail}>
              Get Started Free
            </button>
          </div>

          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <div className={`w-5 h-0.5 bg-gray-700 transition-all mb-1.5 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}/>
            <div className={`w-5 h-0.5 bg-gray-700 transition-all mb-1.5 ${menuOpen ? "opacity-0" : ""}`}/>
            <div className={`w-5 h-0.5 bg-gray-700 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}/>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 px-6 py-4 flex flex-col gap-4 bg-white">
            {NAV_LINKS.map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} className="text-gray-600" onClick={() => setMenuOpen(false)}>{l}</a>
            ))}
            <button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 rounded-full font-medium" onClick={HandleEmail}>Get Started Free</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-violet-100/60 via-indigo-50/40 to-transparent rounded-full blur-3xl"/>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 rounded-full px-4 py-1.5 text-xs text-violet-700 font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"/>
              Now with AI-powered smart replies
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
              Chat without{" "}
              <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
                limits.
              </span>
              <br />
              Connect without{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-sky-500 bg-clip-text text-transparent">
                friction.
              </span>
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
              Wink brings your conversations, calls, and collaborations into one beautifully simple space — secure, fast, and built for humans.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-base hover:opacity-90 transition shadow-xl shadow-violet-200">
                Start for Free — No Card Needed
              </button>
              <button className="flex items-center justify-center gap-2 border border-gray-200 px-8 py-4 rounded-full font-medium text-gray-700 hover:bg-gray-50 transition text-base">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-violet-600">
                  <path d="M8 5v14l11-7L8 5z"/>
                </svg>
                Watch Demo
              </button>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex -space-x-2">
                {["bg-violet-400","bg-indigo-400","bg-sky-400","bg-emerald-400"].map((c,i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-white`}/>
                ))}
              </div>
              <span><strong className="text-gray-700">2M+</strong> people already chatting</span>
            </div>
          </div>

          {/* Chat UI Mockup */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-violet-100 to-indigo-100 rounded-3xl -z-10 blur-xl opacity-60"/>
            <div className="bg-white rounded-3xl shadow-2xl shadow-violet-100 border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">AX</div>
                <div>
                  <p className="text-sm font-semibold">Alex Chen</p>
                  <p className="text-xs text-emerald-500 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block"/>Online</p>
                </div>
                <div className="ml-auto flex gap-3 text-gray-400">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5 cursor-pointer hover:text-violet-600 transition-colors"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5 cursor-pointer hover:text-violet-600 transition-colors"><path d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>

              {/* Messages */}
              <div className="px-5 py-4 space-y-3 min-h-[260px]">
                {CHAT_MESSAGES.slice(0, visibleMsgs).map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"} animate-fadeIn`}>
                    <div className={`max-w-[75%] ${msg.from === "me" ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl rounded-br-sm" : "bg-gray-100 text-gray-800 rounded-2xl rounded-bl-sm"} px-4 py-2.5`}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.from === "me" ? "text-violet-200" : "text-gray-400"}`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
                {visibleMsgs < CHAT_MESSAGES.length && (
                  <div className="flex gap-1 items-center px-1">
                    {[0,1,2].map(i => <div key={i} className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{animationDelay:`${i*0.15}s`}}/>)}
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="px-4 py-3 border-t border-gray-100 flex items-center gap-3">
                <div className="flex-1 bg-gray-50 rounded-full px-4 py-2.5 text-sm text-gray-400 border border-gray-200">
                  Type a message…
                </div>
                <button className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full flex items-center justify-center text-white hover:opacity-90 transition flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 rotate-90"><path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                </button>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -left-6 top-1/3 bg-white rounded-2xl shadow-lg px-4 py-3 border border-gray-100 text-sm font-medium flex items-center gap-2 hidden lg:flex">
              <span className="text-emerald-500 text-lg">🔒</span> E2E Encrypted
            </div>
            <div className="absolute -right-6 bottom-1/4 bg-white rounded-2xl shadow-lg px-4 py-3 border border-gray-100 text-sm font-medium flex items-center gap-2 hidden lg:flex">
              <span className="text-lg">⚡</span> &lt;50ms latency
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-violet-600 uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">Everything you need to stay connected</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Powerful tools packed into a clean, intuitive interface — no learning curve required.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className={`w-12 h-12 ${f.bg} ${f.text} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-violet-600 uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">Up and running in minutes</h2>
            <p className="text-gray-500 text-lg">Three simple steps to better conversations.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 relative">
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-violet-200 to-indigo-200"/>
            {STEPS.map((s, i) => (
              <div key={i} className="text-center relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-black mx-auto mb-6 shadow-lg shadow-violet-200">
                  {s.num}
                </div>
                <h3 className="font-bold text-xl mb-3">{s.title}</h3>
                <p className="text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-violet-600 uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">Simple, honest pricing</h2>
            <p className="text-gray-500 text-lg mb-8">Start free, upgrade when you're ready. No hidden fees.</p>
            <div className="inline-flex items-center bg-white border border-gray-200 rounded-full p-1 gap-1">
              <button onClick={() => setAnnual(false)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${!annual ? "bg-violet-600 text-white shadow" : "text-gray-500 hover:text-gray-800"}`}>Monthly</button>
              <button onClick={() => setAnnual(true)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${annual ? "bg-violet-600 text-white shadow" : "text-gray-500 hover:text-gray-800"}`}>
                Annual
                <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-semibold">-20%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {PLANS.map((p, i) => (
              <div key={i} className={`relative rounded-3xl p-8 border flex flex-col ${p.highlight ? "bg-gradient-to-b from-violet-600 to-indigo-700 text-white border-violet-500 shadow-2xl shadow-violet-200 scale-105" : "bg-white border-gray-200"}`}>
                {p.highlight && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-400 to-pink-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">Most Popular</div>}
                <div className="mb-6">
                  <p className={`text-sm font-semibold mb-1 ${p.highlight ? "text-violet-200" : "text-violet-600"}`}>{p.name}</p>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-5xl font-black">${annual ? Math.round(Number(p.price) * 0.8) : p.price}</span>
                    {p.price !== "0" && <span className={`text-sm mb-2 ${p.highlight ? "text-violet-200" : "text-gray-400"}`}>/mo</span>}
                  </div>
                  <p className={`text-sm ${p.highlight ? "text-violet-200" : "text-gray-500"}`}>{p.desc}</p>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className={`w-4 h-4 mt-0.5 flex-shrink-0 ${p.highlight ? "text-violet-200" : "text-emerald-500"}`}>
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className={p.highlight ? "text-violet-100" : "text-gray-600"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3.5 rounded-full font-semibold text-sm transition-all ${p.highlight ? "bg-white text-violet-700 hover:bg-violet-50 shadow-lg" : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90 shadow-lg shadow-violet-100"}`}>
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-violet-600 uppercase tracking-widest mb-3">Testimonials</p>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">Loved by teams worldwide</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex text-amber-400 mb-5 gap-0.5">
                  {[...Array(5)].map((_,j) => <svg key={j} viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 text-sm">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-xs font-bold`}>{t.avatar}</div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-violet-600 via-indigo-600 to-sky-600 rounded-3xl p-16 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{backgroundImage:"radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize:"60px 60px"}}/>
          <div className="relative">
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight">Ready to start chatting?</h2>
            <p className="text-violet-200 text-lg mb-8 max-w-lg mx-auto">Join over 2 million people who've already made Wink their go-to communication hub.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-white text-violet-700 px-8 py-4 rounded-full font-bold text-base hover:bg-violet-50 transition shadow-xl">
                Get Started — It's Free
              </button>
              <button className="border-2 border-white/40 text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-white/10 transition">
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="white" className="w-3.5 h-3.5">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
            </div>
            <span className="font-bold">Wink</span>
            <span className="text-gray-400 text-sm ml-2">© 2026 Wink Inc. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            {["Privacy","Terms","Security","Status","Blog"].map(l => <a key={l} href="#" className="hover:text-gray-700 transition-colors">{l}</a>)}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease forwards; }
      `}</style>

      <Emailverified 
        isOpen={isEmailModalOpen} 
        onClose={() => setIsEmailModalOpen(false)}
        onVerify={handleEmailVerify}
      />
      <Inputotp 
        isOpen={isOtpModalOpen} 
        onClose={() => setIsOtpModalOpen(false)}
        email={verifiedEmail}
      />
    </div>
  );
}