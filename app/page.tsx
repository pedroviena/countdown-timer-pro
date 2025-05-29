"use client"

import CountdownTimerPro from "../countdown-timer-pro"

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Countdown Timer Pro</h1>
          <p className="text-xl text-gray-300 mb-2">The most advanced countdown timer for Framer</p>
          <p className="text-sm text-gray-400">Professional • Multilingual • Customizable • Analytics Ready</p>
        </div>

        {/* Demo Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Modern Theme Demo */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-white text-lg font-semibold mb-4">🎨 Modern Theme</h3>
            <CountdownTimerPro
              theme="modern"
              layout="horizontal"
              showProgressBar={true}
              enableCountAnimation={true}
              animationType="fade"
              language="en"
            />
          </div>

          {/* Glassmorphism Theme Demo */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-white text-lg font-semibold mb-4">✨ Glassmorphism Theme</h3>
            <CountdownTimerPro
              theme="glassmorphism"
              layout="grid"
              enableGlassEffect={true}
              enableNeonGlow={true}
              glowColor="#00ff88"
              language="pt"
            />
          </div>

          {/* Neon Theme Demo */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-white text-lg font-semibold mb-4">⚡ Neon Theme</h3>
            <CountdownTimerPro
              theme="neon"
              layout="horizontal"
              enableNeonGlow={true}
              enablePulseEffect={true}
              enableParticles={true}
              language="es"
            />
          </div>

          {/* Elegant Theme Demo */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-white text-lg font-semibold mb-4">🌸 Elegant Theme</h3>
            <CountdownTimerPro
              theme="elegant"
              layout="vertical"
              showProgressBar={true}
              progressBarStyle="radial"
              enableFloatingNumbers={true}
              language="fr"
            />
          </div>
        </div>

        {/* Features Showcase */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">🚀 Premium Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🌍</div>
              <h4 className="text-white font-semibold mb-2">7 Languages</h4>
              <p className="text-gray-400 text-sm">EN, ES, FR, DE, PT, IT, JA</p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-3">🎨</div>
              <h4 className="text-white font-semibold mb-2">6 Premium Themes</h4>
              <p className="text-gray-400 text-sm">Modern, Minimal, Dark, Neon, Elegant, Glass</p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h4 className="text-white font-semibold mb-2">Advanced Actions</h4>
              <p className="text-gray-400 text-sm">Webhooks, Redirects, Custom JS, Confetti</p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-3">📊</div>
              <h4 className="text-white font-semibold mb-2">Analytics Ready</h4>
              <p className="text-gray-400 text-sm">GA4, Milestones, Heatmaps</p>
            </div>
          </div>
        </div>

        {/* Compact Demo */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-12">
          <h3 className="text-white text-lg font-semibold mb-4 text-center">
            📱 Compact Layout with Circular Progress
          </h3>
          <div className="flex justify-center">
            <CountdownTimerPro
              theme="dark"
              layout="compact"
              showProgressBar={true}
              progressBarStyle="circular"
              enableCountAnimation={true}
              animationType="bounce"
              language="de"
              fontSize={24}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-400">
          <p className="mb-2">
            🏆 <strong>Countdown Timer Pro</strong> - The Ultimate Framer Plugin
          </p>
          <p className="text-sm">Professional • Enterprise-Ready • Market-Leading</p>
        </div>
      </div>
    </main>
  )
}
