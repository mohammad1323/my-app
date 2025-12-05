import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-zinc-50 via-white to-zinc-100 font-sans dark:from-black dark:via-zinc-950 dark:to-black">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 space-y-6">
            <h1 className="text-6xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-7xl">
              Willkommen
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Eine moderne und elegante Anwendung
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200 dark:border-zinc-800">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">Schnell</h3>
                <p className="text-zinc-600 dark:text-zinc-400">Optimiert für Performance</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200 dark:border-zinc-800">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 dark:bg-purple-500/20 mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">Modern</h3>
                <p className="text-zinc-600 dark:text-zinc-400">Zeitgemäßes Design</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200 dark:border-zinc-800">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 dark:bg-green-500/20 mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">Zuverlässig</h3>
                <p className="text-zinc-600 dark:text-zinc-400">Stabile und sichere Lösung</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <button className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 dark:bg-white px-8 py-4 text-lg font-semibold text-white dark:text-zinc-900 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Loslegen
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
