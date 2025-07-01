import { useEffect, useRef } from "react";
import { Skeleton } from "../Skeleton";

interface TradingViewChartProps {
  loading: boolean;
  onLoad: () => void;
}

export function TradingViewChart({ loading, onLoad }: TradingViewChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
        onLoad();
      };
      chartRef.current.innerHTML =
        '<div id="tradingview_chart"></div>' +
        '<div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/OANDA-SPX500USD/" rel="noopener" target="_blank"><span class="blue-text">S&P 500</span></a> by TradingView</div>';
      chartRef.current.appendChild(script);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading && <Skeleton height="520px" />}
      <div
        ref={chartRef}
        className="tradingview-widget-container w-full min-h-[520px]"
        style={{ display: loading ? "none" : undefined }}
      />
    </>
  );
}
