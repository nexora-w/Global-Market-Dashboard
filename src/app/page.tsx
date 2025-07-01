"use client";

import { useEffect, useRef, useState } from "react";

const tradingViewWidgets = [
  {
    id: "indexes",
    symbols: [
      { description: "S&P 500", proName: "VANTAGE:SP500" },
      { description: "TA 35", proName: "TASE:TA35" },
      { description: "SMI", proName: "SIX:SMI" },
      { description: "FTSE MIB", proName: "INDEX:FTSEMIB" },
      { description: "NI 225", proName: "VANTAGE:NIKKEI225" },
    ],
  },
  {
    id: "forex",
    symbols: [
      { description: "USD/CHF", proName: "FX_IDC:USDCHF" },
      { description: "FEDERAL FUNDS RATE", proName: "FRED:DFEDTARU" },
      { description: "USD/EUR", proName: "FX_IDC:USDEUR" },
      { description: "1kg Gold/CHF", proName: "FX_IDC:INGCHF" },
      { description: "1kg Silver/CHF", proName: "FX_IDC:SBNCHF" },
    ],
  },
  {
    id: "crypto1",
    symbols: [
      { description: "BTC/USD", proName: "BINANCE:BTCUSD" },
      { description: "ETH/USD", proName: "BINANCE:ETHUSD" },
      { description: "QUICK/USD", proName: "BINANCE:QUICKUSDT" },
      { description: "BNB/USD", proName: "BINANCE:BNBUSD" },
      { description: "SSV/USD", proName: "BINANCE:SSVUSD" },
    ],
  },
  {
    id: "crypto2",
    symbols: [
      { description: "TRUMP/USD", proName: "BINANCE:TRUMPUSDT" },
      { description: "POL/USD", proName: "BINANCE:POLUSD" },
      { description: "DOGE/USD", proName: "BINANCE:DOGEUSD" },
      { description: "IDEX/USD", proName: "BINANCE:IDEXUSDT" },
      { description: "ARB/USD", proName: "BINANCE:ARBUSDT" },
    ],
  },
];

type TradingViewSymbol = { description: string; proName: string };

function loadTradingViewWidget(
  container: HTMLDivElement | null,
  symbols: TradingViewSymbol[],
  onLoad: () => void
) {
  if (!container) return;
  const script = document.createElement("script");
  script.src = "https://s3.tradingview.com/external-embedding/embed-widget-tickers.js";
  script.async = true;
  script.innerHTML = JSON.stringify({
    symbols,
    colorTheme: "dark",
    isTransparent: false,
    showSymbolLogo: true,
    locale: "en",
  });
  container.innerHTML = "";
  script.onload = onLoad;
  container.appendChild(script);
}

export default function Home() {
  const widgetRef0 = useRef<HTMLDivElement>(null);
  const widgetRef1 = useRef<HTMLDivElement>(null);
  const widgetRef2 = useRef<HTMLDivElement>(null);
  const widgetRef3 = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState([true, true, true, true, true]);

  useEffect(() => {
    const widgetRefs = [widgetRef0, widgetRef1, widgetRef2, widgetRef3];
    tradingViewWidgets.forEach((widget, i) => {
      loadTradingViewWidget(widgetRefs[i].current, widget.symbols, () => {
        setLoading((prev) => {
          const next = [...prev];
          next[i] = false;
          return next;
        });
      });
    });
    // Chart widget
    if (chartRef.current) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = () => {
        // @ts-expect-error: TradingView is loaded globally by the script
        if (window.TradingView) {
          // @ts-expect-error: TradingView is loaded globally by the script
          new window.TradingView.MediumWidget({
            symbols: [
              ["S&P 500", "VANTAGE:SP500|ALL"],
              ["FEDERAL FUNDS RATE", "FRED:DFEDTARU|ALL"],
              ["TA 35", "TASE:TA35|ALL"],
              ["SMI", "SIX:SMI|ALL"],
              ["FTSE MIB", "INDEX:FTSEMIB|ALL"],
              ["NI 225", "VANTAGE:NIKKEI225|ALL"],
              ["BTC/USD", "COINBASE:BTCUSD|ALL"],
              ["ETH/USD", "COINBASE:ETHUSD|ALL"],
              ["BTC Dominance %", "CRYPTOCAP:BTC.D|ALL"],
              ["Gold Silver Ratio/USD", "FX_IDC:AUGUSD|ALL"],
              ["1kg Gold/CHF", "FX_IDC:INGCHF|ALL"],
              ["1kg Silver/CHF", "FX_IDC:SBNCHF|ALL"],
            ],
            chartOnly: false,
            width: "100%",
            height: "500px",
            locale: "en",
            colorTheme: "dark",
            gridLineColor: "rgba(240, 243, 250, 0)",
            fontColor: "#787B86",
            isTransparent: false,
            autosize: true,
            showFloatingTooltip: true,
            showVolume: false,
            scalePosition: "no",
            scaleMode: "Normal",
            fontFamily: "Trebuchet MS, sans-serif",
            noTimeScale: false,
            chartType: "area",
            lineColor: "#2962FF",
            bottomColor: "rgba(41, 98, 255, 0)",
            topColor: "rgba(41, 98, 255, 0.3)",
            container_id: "tradingview_chart",
          });
        }
        setLoading((prev) => {
          const next = [...prev];
          next[4] = false;
          return next;
        });
      };
      chartRef.current.innerHTML =
        '<div id="tradingview_chart"></div>' +
        '<div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/OANDA-SPX500USD/" rel="noopener" target="_blank"><span class="blue-text">S&P 500</span></a> by TradingView</div>';
      chartRef.current.appendChild(script);
    }
  }, []);

  // Skeleton component
  const Skeleton = ({ height = "120px" }: { height?: string }) => (
    <div
      className="w-full bg-gradient-to-r from-gray-700/30 via-gray-500/20 to-gray-700/30 animate-pulse rounded-xl"
      style={{ height }}
    />
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#181c2a] via-[#232946] to-[#181c2a] flex flex-col items-center justify-center py-10 px-2">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-4 tracking-tight drop-shadow-lg">
          Global Market Dashboard
        </h1>
        <p className="text-lg md:text-xl text-center text-white/80 mb-12 font-medium max-w-2xl mx-auto">
          Live prices and trends for global indexes, forex, metals, and crypto — powered by TradingView.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Major Market Indexes */}
          <section className="bg-white/5 rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-white/10 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-2 tracking-wide flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              Major Market Indexes
            </h2>
            {loading[0] && <Skeleton />}
            <div ref={widgetRef0} className="tradingview-widget-container min-h-[120px]" style={{ display: loading[0] ? "none" : undefined }} />
          </section>
          {/* Key Forex & Metals */}
          <section className="bg-white/5 rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-white/10 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-2 tracking-wide flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              Key Forex & Metals
            </h2>
            {loading[1] && <Skeleton />}
            <div ref={widgetRef1} className="tradingview-widget-container min-h-[120px]" style={{ display: loading[1] ? "none" : undefined }} />
          </section>
          {/* Top Cryptocurrencies */}
          <section className="bg-white/5 rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-white/10 backdrop-blur-sm md:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-2 tracking-wide flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
              Top Cryptocurrencies
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                {loading[2] && <Skeleton />}
                <div ref={widgetRef2} className="tradingview-widget-container min-h-[120px]" style={{ display: loading[2] ? "none" : undefined }} />
              </div>
              <div className="flex-1">
                {loading[3] && <Skeleton />}
                <div ref={widgetRef3} className="tradingview-widget-container min-h-[120px]" style={{ display: loading[3] ? "none" : undefined }} />
              </div>
            </div>
          </section>
          {/* Comprehensive Market Chart */}
          <section className="bg-white/5 rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-white/10 backdrop-blur-sm md:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-2 tracking-wide flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Comprehensive Market Chart
            </h2>
            {loading[4] && <Skeleton height="520px" />}
            <div ref={chartRef} className="tradingview-widget-container w-full min-h-[520px]" style={{ display: loading[4] ? "none" : undefined }} />
          </section>
        </div>
      </div>
    </div>
  );
}
