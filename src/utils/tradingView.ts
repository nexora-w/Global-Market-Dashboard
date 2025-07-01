import type { TradingViewSymbol } from "../types/tradingView";

export function loadTradingViewWidget(
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
