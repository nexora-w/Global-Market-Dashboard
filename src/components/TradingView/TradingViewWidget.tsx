import { useEffect, useRef } from "react";
import { loadTradingViewWidget } from "../../utils/tradingView";
import type { TradingViewSymbol } from "../../types/tradingView";
import { Skeleton } from "../Skeleton";

interface TradingViewWidgetProps {
  symbols: TradingViewSymbol[];
  loading: boolean;
  onLoad: () => void;
}

export function TradingViewWidget({ symbols, loading, onLoad }: TradingViewWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadTradingViewWidget(widgetRef.current, symbols, onLoad);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbols]);

  return (
    <>
      {loading && <Skeleton />}
      <div
        ref={widgetRef}
        className="tradingview-widget-container min-h-[120px]"
        style={{ display: loading ? "none" : undefined }}
      />
    </>
  );
}
