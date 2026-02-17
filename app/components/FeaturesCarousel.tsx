"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect, type ReactNode } from "react";

const BRAND = "#00c0ff";
const WINDOW_RADIUS = 2;

// 初期レンダー時のフォールバック（ResizeObserverで実寸に置き換わる）
const FALLBACK_WIDTH = 800;
const FALLBACK_HEIGHT = 420;

const SLIDE_EASE = { type: "tween" as const, duration: 0.35, ease: "easeOut" as const };

const cardVariants = {
  enter: ({ direction }: { direction: number }) =>
    direction === 0
      ? {}
      : {
          x: direction > 0 ? "100%" : "-100%",
          opacity: 0.6,
          scale: 1,
        },
  exit: ({ direction }: { direction: number }) =>
    direction === 0
      ? {}
      : {
          x: direction > 0 ? "-100%" : "100%",
          opacity: 0.6,
          scale: 1,
        },
};

export type CarouselCard = {
  title: string;
  desc: string;
  dummy: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
};

type Props = {
  cards: CarouselCard[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  renderCardContent: (card: CarouselCard) => ReactNode;
};

function mod(a: number, n: number) {
  return ((a % n) + n) % n;
}

// スマホ: 枠内・視認性・タッチ用サイズ / PC（md）: 枠外用に上書き
const arrowBtnClassInner =
  "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/80 text-[#00c0ff] shadow-md transition-colors hover:bg-white hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00c0ff]/40 md:h-9 md:w-9";

export function FeaturesCarousel({
  cards,
  activeIndex,
  setActiveIndex,
  renderCardContent,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportSize, setViewportSize] = useState({ w: FALLBACK_WIDTH, h: FALLBACK_HEIGHT });
  const n = cards.length;
  const getCardAt = (i: number) => cards[mod(i, n)];

  const [layoutIndex, setLayoutIndex] = useState(activeIndex);
  const [direction, setDirection] = useState(0);
  const skipSyncFromActiveIndexRef = useRef(false);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0]?.contentRect ?? { width: 0, height: 0 };
      if (width > 0 && height > 0) setViewportSize({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (n === 0) return;
    setActiveIndex(mod(layoutIndex, n));
  }, [layoutIndex, n, setActiveIndex]);

  useEffect(() => {
    if (n === 0) return;
    if (skipSyncFromActiveIndexRef.current) {
      skipSyncFromActiveIndexRef.current = false;
      return;
    }
    if (mod(layoutIndex, n) !== activeIndex) setLayoutIndex(activeIndex);
  }, [activeIndex, n, layoutIndex]);

  const goToNext = () => {
    if (n === 0) return;
    skipSyncFromActiveIndexRef.current = true;
    setDirection(1);
    setLayoutIndex((prev) => prev + 1);
  };

  const goToPrev = () => {
    if (n === 0) return;
    skipSyncFromActiveIndexRef.current = true;
    setDirection(-1);
    setLayoutIndex((prev) => prev - 1);
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    if (n === 0) return;
    const threshold = 50;
    const velocity = info.velocity.x;
    const offset = info.offset.x;
    if (velocity > 300 || offset > threshold) goToPrev();
    else if (velocity < -300 || offset < -threshold) goToNext();
  };

  if (n === 0) return null;

  const stripIndices: number[] = [];
  for (let i = layoutIndex - WINDOW_RADIUS; i <= layoutIndex + WINDOW_RADIUS; i++) {
    stripIndices.push(i);
  }

  const { w: vw, h: vh } = viewportSize;

  return (
    <div className="flex w-full justify-center px-4 py-4" ref={containerRef}>
      {/* 矢印を枠の relative 親に閉じ、青枠のセンター配置が崩れないようにする */}
      <div className="relative w-[95%] max-w-4xl overflow-visible">
        {/* 枠（Viewport）: カードと1:1で重なる */}
        <div
          ref={viewportRef}
          className="relative box-border h-auto w-full min-h-[650px] overflow-hidden rounded-xl border-2 border-[#00c0ff] md:min-h-[400px] md:aspect-[4/3]"
        >
          <motion.div
            className="relative flex h-full w-full items-center justify-center box-border"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            dragMomentum={false}
          >
            <AnimatePresence initial={false} custom={{ direction }}>
              {stripIndices.map((i) => {
                const offset = i - layoutIndex;
                const isActive = offset === 0;
                const isVisible = Math.abs(offset) <= 1;
                const card = getCardAt(i);
                const cardNumber = mod(i, n) + 1;

                const slideX = offset === 0 ? "0%" : offset < 0 ? "-100%" : "100%";
                const opacity = isActive ? 1 : isVisible ? 0.6 : 0;
                const zIndex = isActive ? 10 : 5;

                return (
                  <motion.div
                    key={`strip-${i}`}
                    className="absolute left-1/2 top-0 box-border flex flex-shrink-0 flex-col gap-6 select-none overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-lg pointer-events-none md:h-full md:flex-row md:items-stretch md:gap-0"
                    style={{
                      left: "50%",
                      top: 0,
                      width: vw,
                      height: vh,
                      marginLeft: -vw / 2,
                      marginTop: 0,
                      zIndex,
                    }}
                    variants={cardVariants}
                    initial="enter"
                    animate={{
                      x: slideX,
                      y: 0,
                      scale: 1,
                      opacity,
                    }}
                    exit="exit"
                    custom={{ direction }}
                    transition={SLIDE_EASE}
                  >
                    {/* テキストブロック: スマホ上（order-1）・PC右（order-2） */}
                    <div className="order-1 flex w-full flex-shrink-0 flex-col justify-center overflow-hidden p-6 text-center md:order-2 md:w-1/2 md:border-l md:border-[#e5e7eb] md:p-8 md:text-left">
                      <span
                        className="mb-2 inline-block text-2xl font-bold tabular-nums tracking-tight text-[#00c0ff] drop-shadow-sm sm:text-3xl"
                        style={{ textShadow: "0 0 20px rgba(0, 192, 255, 0.35)" }}
                        aria-hidden
                      >
                        {String(cardNumber).padStart(2, "0")}
                      </span>
                      <h4 className="text-base font-semibold leading-tight text-[#171717] sm:text-lg">{card.title}</h4>
                      <p className="mt-2 text-sm leading-snug text-[#555]">{card.desc}</p>
                    </div>
                    {/* 画像モックアップブロック: スマホ下（order-2）・PC左（order-1）。object-contain 相当で枠内に収める */}
                    <div className="order-2 flex min-h-[320px] w-full flex-1 flex-shrink-0 flex-col items-center justify-center overflow-hidden bg-[#f9fafb] p-4 md:order-1 md:min-h-0 md:w-1/2 md:p-8">
                      <div className="flex h-full w-full min-h-0 items-center justify-center overflow-auto">
                        <div className="flex max-h-full max-w-full items-center justify-center">
                          {renderCardContent(card)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* 矢印: カルーセル操作のみ有効（カード外・pointer-events-auto） */}
        <button
          type="button"
          onClick={goToPrev}
          className={`pointer-events-auto absolute top-1/2 z-50 -translate-y-1/2 left-2 md:-left-[60px] ${arrowBtnClassInner} md:bg-[#f5f5f5]/80 md:text-[#94a3b8] md:shadow-none md:hover:bg-[#00c0ff]/10 md:hover:text-[#00c0ff]`}
          aria-label="前へ"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2} style={{ color: "inherit" }} />
        </button>
        <button
          type="button"
          onClick={goToNext}
          className={`pointer-events-auto absolute top-1/2 z-50 -translate-y-1/2 right-2 md:-right-[60px] ${arrowBtnClassInner} md:bg-[#f5f5f5]/80 md:text-[#94a3b8] md:shadow-none md:hover:bg-[#00c0ff]/10 md:hover:text-[#00c0ff]`}
          aria-label="次へ"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2} style={{ color: "inherit" }} />
        </button>
      </div>
    </div>
  );
}
