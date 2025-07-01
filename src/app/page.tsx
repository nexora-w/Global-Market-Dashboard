"use client";

import { useState } from "react";
import { tradingViewWidgets } from "../constants/tradingViewWidgets";
import { TradingViewWidget } from "../components/TradingView/TradingViewWidget";
import { TradingViewChart } from "../components/TradingView/TradingViewChart";

export default function Home() {
  const [loading, setLoading] = useState([true, true, true, true, true]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#181c2a] via-[#232946] to-[#181c2a] flex flex-col items-center justify-center py-10 px-2">
      <div className="w-full px-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-4 tracking-tight drop-shadow-lg">
          Global Market Dashboard
        </h1>
        <p className="text-lg md:text-xl text-center text-white/80 mb-12 font-medium max-w-5xl mx-auto">
          Live prices and trends for global indexes, forex, metals, and crypto — powered by TradingView.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Major Market Indexes */}
          <section className="bg-white/5 rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-white/10 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-2 tracking-wide flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              Major Market Indexes
            </h2>
            <TradingViewWidget
              symbols={tradingViewWidgets[0].symbols}
              loading={loading[0]}
              onLoad={() => setLoading((prev) => { const next = [...prev]; next[0] = false; return next; })}
            />
          </section>
          {/* Key Forex & Metals */}
          <section className="bg-white/5 rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-white/10 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-2 tracking-wide flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              Key Forex & Metals
            </h2>
            <TradingViewWidget
              symbols={tradingViewWidgets[1].symbols}
              loading={loading[1]}
              onLoad={() => setLoading((prev) => { const next = [...prev]; next[1] = false; return next; })}
            />
          </section>
          {/* Top Cryptocurrencies */}
          <section className="bg-white/5 rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-white/10 backdrop-blur-sm md:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-2 tracking-wide flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
              Top Cryptocurrencies
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <TradingViewWidget
                  symbols={tradingViewWidgets[2].symbols}
                  loading={loading[2]}
                  onLoad={() => setLoading((prev) => { const next = [...prev]; next[2] = false; return next; })}
                />
              </div>
              <div className="flex-1">
                <TradingViewWidget
                  symbols={tradingViewWidgets[3].symbols}
                  loading={loading[3]}
                  onLoad={() => setLoading((prev) => { const next = [...prev]; next[3] = false; return next; })}
                />
              </div>
            </div>
          </section>
          {/* Comprehensive Market Chart */}
          <section className="bg-white/5 rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-white/10 backdrop-blur-sm md:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-2 tracking-wide flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Comprehensive Market Chart
            </h2>
            <TradingViewChart
              loading={loading[4]}
              onLoad={() => setLoading((prev) => { const next = [...prev]; next[4] = false; return next; })}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
