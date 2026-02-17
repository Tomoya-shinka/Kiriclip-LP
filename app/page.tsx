"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  LayoutDashboard,
  MessageSquare,
  Calculator,
  FolderOpen,
  CheckCircle,
  Coins,
  FolderKanban,
  Users,
  Video,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Download,
  Upload,
  CheckSquare,
  BarChart3,
  FolderPlus,
  Youtube,
  Instagram,
  Play,
} from "lucide-react";
import { ScrollReveal } from "./components/ScrollReveal";
import { FeaturesCarousel, type CarouselCard } from "./components/FeaturesCarousel";

const BRAND = "#00c0ff";

const CREATOR_CARDS = [
  {
    icon: Download,
    title: "迷わない素材取得",
    desc: "オーナーから配布された元動画や BGM を、ダッシュボードからワンクリックで確認。素材探しのタイムロスをゼロにします。",
    dummy: "material",
  },
  {
    icon: Upload,
    title: "シンプルな納品フロー",
    desc: "投稿した動画の URL とタイトルを入力するだけ。スマホからでも数秒で納品が完了します。",
    dummy: "delivery",
  },
  {
    icon: Coins,
    title: "報酬のリアルタイム可視化",
    desc: "納品と同時に基本報酬が「獲得予定」に計上。自分の頑張りがすぐに数字で現れるから、モチベーションが続きます。",
    dummy: "reward",
  },
];

const OWNER_CARDS = [
  {
    icon: Users,
    title: "クリエイター管理と分析",
    desc: "参加しているクリエイターの活動状況や累計納品数をリアルタイムで可視化。チームの生産性を一目で把握できます。",
    dummy: "kpi",
  },
  {
    icon: CheckSquare,
    title: "スムーズな動画検収",
    desc: "納品された動画をプレビューしながらその場で確認。未確認の動画だけを抽出して、検収漏れを防ぎます。",
    dummy: "review",
  },
  {
    icon: BarChart3,
    title: "透明性の高い精算管理",
    desc: "基本報酬とバズ報酬をシステムが自動集計。CSV エクスポートにも対応し、月末の支払い事務作業を劇的に効率化します。",
    dummy: "settlement",
  },
  {
    icon: FolderPlus,
    title: "コンテンツの一元配布",
    desc: "編集に必要な元動画や BGM を管理画面から一括登録。クリエイターとの個別チャットで素材を送り直す手間はもう不要です。",
    dummy: "content",
  },
];

type TargetTab = "creator" | "owner";

export default function Home() {
  const ownerSectionRef = useRef<HTMLDivElement>(null);
  const ownerInView = useInView(ownerSectionRef, { once: true, margin: "-80px" });
  const [targetTab, setTargetTab] = useState<TargetTab>("creator");
  const [creatorActiveIndex, setCreatorActiveIndex] = useState(0);
  const [ownerActiveIndex, setOwnerActiveIndex] = useState(0);
  const [heroMockIndex, setHeroMockIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setHeroMockIndex((prev) => (prev + 1) % 2), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#171717]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#eee] bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white"
              style={{ backgroundColor: BRAND }}
            >
              <Video className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Kiri Clip Lab
            </span>
          </div>
          <a
            href="/register"
            className="rounded-full px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            style={{ backgroundColor: BRAND }}
          >
            今すぐ無料で始める
          </a>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero */}
        <section
          className="relative overflow-hidden px-4 pb-24 pt-20 sm:px-6 sm:pt-24 md:pb-32 md:pt-28"
          style={{
            backgroundImage: "linear-gradient(180deg, #f8fcff 0%, #ffffff 50%, #fafafa 100%), radial-gradient(circle at 1px 1px, rgba(0,192,255,0.06) 1px, transparent 0)",
            backgroundSize: "100% 100%, 32px 32px",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          }}
        >
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
            {/* Left: Copy + CTA */}
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <motion.h1
                className="font-sans text-3xl font-bold leading-tight tracking-tight text-[#171717] sm:text-4xl md:text-[3rem] lg:text-[3.5rem] xl:text-5xl"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
              >
                動画納品、報酬管理を
                <br />
                <span className="bg-gradient-to-r from-[#00c0ff] to-[#00a0dd] bg-clip-text text-transparent">
                  もっとスマートに。
                </span>
              </motion.h1>
              <motion.p
                className="mt-6 max-w-xl text-lg leading-relaxed text-[#555] sm:text-xl"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
              >
                インフルエンサーとクリエイターを繋ぐ、動画制作のワークフロー管理ツール Kiri Clip Lab。煩雑なメッセージ管理や報酬計算から解放されましょう。
              </motion.p>
              <motion.div
                className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <motion.a
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-lg font-semibold text-white shadow-lg"
                  style={{ backgroundColor: BRAND, boxShadow: "0 10px 40px -10px rgba(0,192,255,0.4)" }}
                  whileHover={{ y: -3, boxShadow: "0 14px 48px -10px rgba(0,192,255,0.45)" }}
                  whileTap={{ y: 0 }}
                >
                  今すぐ無料で始める
                  <ArrowRight className="h-5 w-5" />
                </motion.a>
                <motion.button
                  type="button"
                  onClick={() => document.getElementById("problem")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#333] bg-transparent px-5 py-3 text-base font-semibold text-[#333] transition-colors hover:bg-[#333] hover:text-white"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  詳しく見る
                  <ChevronDown className="h-5 w-5" />
                </motion.button>
              </motion.div>
            </div>

            {/* Right: PCウィンドウ風UIモックアップ（操作不可・オーナー/クリエイターのフェード切り替え） */}
            <motion.div
              className="flex justify-center md:justify-end"
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <motion.div
                className="pointer-events-none select-none w-full max-w-[520px] overflow-hidden rounded-xl border-4 border-slate-100 shadow-2xl shadow-[#000]/15"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
              >
                {/* ウィンドウヘッダー（Mac風） */}
                <div className="flex h-[30px] items-center gap-2 border-b border-slate-200 bg-slate-100 px-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                {/* コンテンツエリア（アスペクト比・フェード切り替え） */}
                <div className="relative overflow-hidden bg-slate-50" style={{ aspectRatio: "1919/935" }}>
                  <AnimatePresence initial={false}>
                    {heroMockIndex === 0 && (
                      <motion.div
                        key="owner"
                        className="absolute inset-0 flex"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      >
                        <aside className="flex w-[28%] min-w-0 flex-shrink-0 flex-col border-r border-[#e2e8f0] bg-white py-3 pl-2 pr-2">
                          <div className="mb-3 border-l-2 pl-2.5" style={{ borderColor: BRAND }}>
                            <p className="text-[11px] font-bold text-[#1e293b]">OWNER</p>
                            <p className="text-[9px] text-[#64748b]">動画検収 & 支払確認</p>
                          </div>
                          <nav className="flex flex-1 flex-col gap-0.5">
                            {[
                              { label: "ホーム", active: true },
                              { label: "投稿管理", badge: 3 },
                              { label: "精算管理" },
                              { label: "メンバー" },
                              { label: "設定" },
                            ].map((item) => (
                              <div
                                key={item.label}
                                className={`flex items-center justify-between rounded-lg py-2 pl-2 pr-2.5 text-[11px] font-medium ${item.active ? "border-l-2 bg-[#00c0ff]/10" : "border-l-2 border-transparent text-[#475569]"}`}
                                style={item.active ? { borderLeftColor: BRAND } : undefined}
                              >
                                <span className={item.active ? "text-[#0f172a]" : ""}>{item.label}</span>
                                {item.badge != null && (
                                  <span className="flex h-4 min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                            ))}
                          </nav>
                          <div className="mt-auto flex items-center gap-1.5 border-t border-[#e2e8f0] pt-2 text-[10px] text-[#64748b]">
                            <div className="h-6 w-6 rounded-full bg-[#e2e8f0]" />
                            <span>User</span>
                          </div>
                        </aside>
                        <main className="flex min-w-0 flex-1 flex-col overflow-hidden p-3">
                          <div className="mb-3 grid grid-cols-3 gap-2">
                            <div className="rounded-xl border border-[#e2e8f0] bg-white p-2.5 text-center shadow-sm">
                              <p className="text-[9px] text-[#64748b]">今月の納品数</p>
                              <p className="mt-0.5 text-lg font-bold text-[#1e293b]">42本</p>
                            </div>
                            <div className="rounded-xl border border-[#e2e8f0] bg-white p-2.5 text-center shadow-sm">
                              <p className="text-[9px] text-[#64748b]">精算予定額</p>
                              <p className="mt-0.5 text-lg font-bold" style={{ color: BRAND }}>¥21,500</p>
                            </div>
                            <div className="rounded-xl border border-[#e2e8f0] bg-white p-2.5 text-center shadow-sm">
                              <p className="text-[9px] text-[#64748b]">稼働メンバー</p>
                              <p className="mt-0.5 text-lg font-bold text-[#1e293b]">8人</p>
                            </div>
                          </div>
                          <p className="mb-2 text-[11px] font-semibold text-[#1e293b]">最近の納品</p>
                          <div className="space-y-2">
                            {[
                              { title: "【VLOG】26歳起業家の裏側", by: "山田", date: "2/15", status: "検収待ち", statusClass: "bg-[#00c0ff]/15 text-[#00c0ff]" },
                              { title: "Vibe Coding おすすめ拡張機能10選", by: "田中", date: "2/14", status: "検収済み", statusClass: "bg-emerald-100 text-emerald-700" },
                              { title: "【Shorts】バグを一瞬で直した瞬間", by: "佐藤", date: "2/14", status: "バズり審査中", statusClass: "bg-amber-100 text-amber-800" },
                            ].map((row, i) => (
                              <div key={i} className="flex gap-2 rounded-xl border border-[#e2e8f0] bg-white p-2 shadow-sm">
                                <div className="h-12 w-16 flex-shrink-0 rounded-lg bg-[#e2e8f0]" />
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-[11px] font-medium text-[#1e293b]">{row.title}</p>
                                  <p className="mt-0.5 text-[9px] text-[#64748b]">{row.by} · {row.date}</p>
                                </div>
                                <span className={`flex-shrink-0 self-center rounded px-2 py-0.5 text-[9px] font-medium ${row.statusClass}`}>
                                  {row.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        </main>
                      </motion.div>
                    )}
                    {heroMockIndex === 1 && (
                      <motion.div
                        key="creator"
                        className="absolute inset-0 flex"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      >
                        <aside className="flex w-[28%] min-w-0 flex-shrink-0 flex-col border-r border-[#e2e8f0] bg-white py-3 pl-2 pr-2">
                          <div className="mb-3 border-l-2 pl-2.5" style={{ borderColor: BRAND }}>
                            <p className="text-[11px] font-bold text-[#1e293b]">CREATOR</p>
                            <p className="text-[9px] text-[#64748b]">動画納品 & 報酬確認</p>
                          </div>
                          <nav className="flex flex-1 flex-col gap-0.5">
                            {[
                              { label: "ホーム", active: true },
                              { label: "素材一覧" },
                              { label: "納品" },
                              { label: "報酬管理" },
                            ].map((item) => (
                              <div
                                key={item.label}
                                className={`flex items-center justify-between rounded-lg py-2 pl-2 pr-2.5 text-[11px] font-medium ${item.active ? "border-l-2 bg-[#00c0ff]/10" : "border-l-2 border-transparent text-[#475569]"}`}
                                style={item.active ? { borderLeftColor: BRAND } : undefined}
                              >
                                <span className={item.active ? "text-[#0f172a]" : ""}>{item.label}</span>
                              </div>
                            ))}
                          </nav>
                          <div className="mt-auto flex items-center gap-1.5 border-t border-[#e2e8f0] pt-2 text-[10px] text-[#64748b]">
                            <div className="h-6 w-6 rounded-full bg-[#e2e8f0]" />
                            <span>User</span>
                          </div>
                        </aside>
                        <main className="flex min-w-0 flex-1 flex-col overflow-hidden p-3">
                          <div className="mb-3 grid grid-cols-2 gap-2">
                            <div className="rounded-xl border border-[#e2e8f0] bg-white p-2.5 text-center shadow-sm">
                              <p className="text-[9px] text-[#64748b]">今月の報酬</p>
                              <p className="mt-0.5 text-lg font-bold" style={{ color: BRAND }}>¥15,500</p>
                            </div>
                            <div className="rounded-xl border border-[#e2e8f0] bg-white p-2.5 text-center shadow-sm">
                              <p className="text-[9px] text-[#64748b]">未確定報酬</p>
                              <p className="mt-0.5 text-lg font-bold text-[#1e293b]">¥3,000</p>
                            </div>
                          </div>
                          <p className="mb-2 text-[11px] font-semibold text-[#1e293b]">配布素材</p>
                          <div className="mb-3 space-y-1.5">
                            {["VLOG素材（2/15撮影分）", "BGMパック Vol.3", "テロップ用アセット集"].map((name, i) => (
                              <div key={i} className="flex items-center gap-2 rounded-lg border border-[#e2e8f0] bg-white px-2.5 py-2 text-[11px] text-[#1e293b]">
                                <Download className="h-4 w-4 flex-shrink-0" style={{ color: BRAND }} />
                                <span className="truncate">{name}</span>
                              </div>
                            ))}
                          </div>
                          <p className="mb-1.5 text-[11px] font-semibold text-[#1e293b]">納品フォーム</p>
                          <div className="space-y-2 rounded-xl border border-[#e2e8f0] bg-white p-2.5 shadow-sm">
                            <div>
                              <p className="mb-1 text-[9px] text-[#64748b]">動画URL</p>
                              <div className="rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-2.5 py-2 text-[11px] text-[#1e293b]">
                                https://youtube.com/shorts/xxxxx
                              </div>
                            </div>
                            <div>
                              <p className="mb-1 text-[9px] text-[#64748b]">タイトル</p>
                              <div className="rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-2.5 py-2 text-[11px] text-[#1e293b]">
                                【Vibe Coding】作業環境紹介
                              </div>
                            </div>
                            <button
                              type="button"
                              className="w-full rounded-lg py-2.5 text-[11px] font-semibold text-white"
                              style={{ backgroundColor: BRAND }}
                            >
                              納品する
                            </button>
                          </div>
                        </main>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Problem */}
        <section id="problem" className="border-t border-[#eee] bg-[#fafafa] px-4 py-24 sm:px-6 md:py-28">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-[#171717] sm:text-4xl">
                こんなお悩み、ありませんか？
              </h2>
              <p className="mt-4 text-lg text-[#555]">
                動画制作のやりとりで起きがちな課題を、Kiri Clip Lab が解消します。
              </p>
            </ScrollReveal>
            <div className="mt-16 grid gap-8 sm:grid-cols-3">
              {[
                {
                  icon: MessageSquare,
                  title: "メッセージが埋もれる",
                  desc: "DMやチャットで納品・修正が混ざり、何が確定か分かりづらい。",
                },
                {
                  icon: Calculator,
                  title: "報酬計算が面倒",
                  desc: "本編・ショート・追加カット…手計算や表管理に時間がかかる。",
                },
                {
                  icon: FolderOpen,
                  title: "素材配布が大変",
                  desc: "依頼する素材や参考動画が散らばり、共有が煩雑になりがち。",
                },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="rounded-2xl border border-[#eee] bg-white p-8 shadow-sm transition hover:shadow-md">
                    <div
                      className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl"
                      style={{ backgroundColor: "#fee2e2" }}
                    >
                      <item.icon className="h-7 w-7 text-[#dc2626]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#171717]">{item.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-[#555]">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="border-t border-[#eee] px-4 py-24 sm:px-6 md:py-28">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-[#171717] sm:text-4xl">
                Kiri Clip Lab なら
              </h2>
              <p className="mt-4 text-lg text-[#555]">
                納品・報酬・コンテンツを一括で管理し、協業をスムーズに。
              </p>
            </ScrollReveal>
            <div className="mt-16 grid gap-8 sm:grid-cols-3">
              {[
                {
                  icon: CheckCircle,
                  title: "納品即確定の基本報酬",
                  desc: "納品と同時に基本報酬を確定。やりとりが明確になり、信頼関係を築きやすく。",
                },
                {
                  icon: Coins,
                  title: "追加報酬の自動集計",
                  desc: "ショートや追加カットの本数・単価を登録するだけで、報酬を自動で集計。",
                },
                {
                  icon: FolderKanban,
                  title: "配布コンテンツを見やすく管理",
                  desc: "素材や参考動画をプロジェクトごとに整理。誰が何にアクセスできるかも一目瞭然。",
                },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div
                    className="rounded-2xl border border-[#00c0ff]/20 bg-white p-8 shadow-sm transition hover:shadow-md"
                    style={{ borderColor: "rgba(0,192,255,0.2)" }}
                  >
                    <div
                      className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl text-white"
                      style={{ backgroundColor: BRAND }}
                    >
                      <item.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#171717]">{item.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-[#555]">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Target: どちらの立場でも、使いやすい - Creator & Owner Features */}
        <section
          ref={ownerSectionRef}
          id="target"
          className="border-t border-[#eee] bg-[#fafafa] px-4 py-16 sm:px-6 md:py-20"
        >
          <div className="mx-auto max-w-7xl">
            <ScrollReveal className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-[#171717] sm:text-4xl">
                どちらの立場でも、使いやすい
              </h2>
              <p className="mt-4 text-lg text-[#555]">
                オーナーもクリエイターも、それぞれのメリットを実感できます。
              </p>
            </ScrollReveal>

            {/* Tab switcher */}
            <ScrollReveal className="mt-8 flex justify-center gap-5">
              <button
                type="button"
                onClick={() => { setTargetTab("creator"); setCreatorActiveIndex(0); }}
                className={`flex items-center gap-2.5 rounded-full px-6 py-3.5 text-base font-semibold transition-all ${
                  targetTab === "creator"
                    ? "text-white shadow-md"
                    : "border border-[#e5e7eb] bg-white text-[#6b7280] hover:border-[#00c0ff]/40 hover:bg-[#00c0ff]/5 hover:text-[#00c0ff]"
                }`}
                style={targetTab === "creator" ? { backgroundColor: BRAND } : undefined}
              >
                <Video className="h-6 w-6" />
                クリエイター
              </button>
              <button
                type="button"
                onClick={() => { setTargetTab("owner"); setOwnerActiveIndex(0); }}
                className={`flex items-center gap-2.5 rounded-full px-6 py-3.5 text-base font-semibold transition-all ${
                  targetTab === "owner"
                    ? "text-white shadow-md"
                    : "border border-[#e5e7eb] bg-white text-[#6b7280] hover:border-[#00c0ff]/40 hover:bg-[#00c0ff]/5 hover:text-[#00c0ff]"
                }`}
                style={targetTab === "owner" ? { backgroundColor: BRAND } : undefined}
              >
                <Users className="h-6 w-6" />
                オーナー
              </button>
            </ScrollReveal>

            {/* Tab content - 縦幅統一 */}
            <div className="mt-8 min-h-[560px]">
            {targetTab === "creator" && (
            <div id="creator-features">
              <ScrollReveal>
                <h3 className="mb-6 text-center text-xl font-semibold text-[#374151]">
                  クリエイターが、制作に集中できる環境を。
                </h3>
              </ScrollReveal>
              <FeaturesCarousel
                cards={CREATOR_CARDS}
                activeIndex={creatorActiveIndex}
                setActiveIndex={setCreatorActiveIndex}
                renderCardContent={(card) => (
                  <>
                    {card.dummy === "material" && (
                      <div className="w-full max-w-[400px] rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
                        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#1f2937]">
                          <FolderKanban className="h-5 w-5" style={{ color: BRAND }} />
                          配布素材・元動画
                        </p>
                        <ul className="space-y-2">
                          {[
                            { name: "2/15撮影 VLOG素材（メインカメラ）", type: "元動画" },
                            { name: "テロップ用フォント・アセット集", type: "テンプレート" },
                            { name: "【共用】BGM・効果音パック Vol.3", type: "音源" },
                          ].map((item, i) => (
                            <li
                              key={i}
                              className="flex items-center justify-between gap-2 rounded-lg border border-[#e5e7eb] bg-[#fafafa] px-3 py-2"
                            >
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-[#1f2937]">{item.name}</p>
                                <p className="text-xs text-[#6b7280]">種別: {item.type}</p>
                              </div>
                              <button
                                type="button"
                                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-[#00c0ff]/10"
                                style={{ color: BRAND }}
                                aria-label="ダウンロード"
                              >
                                <Download className="h-4 w-4" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {card.dummy === "delivery" && (
                      <div className="w-full max-w-[400px] rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
                        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#1f2937]">
                          <Upload className="h-5 w-5" style={{ color: BRAND }} />
                          動画納品
                        </p>
                        <div className="space-y-2.5">
                          <div>
                            <label className="mb-1 block text-xs text-[#6b7280]">動画のURL</label>
                            <div className="rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm text-[#1f2937]">
                              https://youtube.com/shorts/sample123...
                            </div>
                          </div>
                          <div>
                            <label className="mb-1 block text-xs text-[#6b7280]">動画タイトル</label>
                            <div className="rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm text-[#1f2937]">
                              【Vibe Coding】20代大学生エンジニアのリアルな1日
                            </div>
                          </div>
                          <div>
                            <label className="mb-1 block text-xs text-[#6b7280]">プラットフォーム</label>
                            <div className="flex gap-3 text-sm text-[#1f2937]">
                              <label className="flex items-center gap-1.5">
                                <input type="checkbox" defaultChecked className="rounded border-[#d1d5db]" />
                                YouTube
                              </label>
                              <label className="flex items-center gap-1.5">
                                <input type="checkbox" defaultChecked className="rounded border-[#d1d5db]" />
                                Instagram
                              </label>
                            </div>
                          </div>
                          <div>
                            <label className="mb-1 block text-xs text-[#6b7280]">コメント</label>
                            <div className="rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm text-[#1f2937]">
                              1:30あたりのカット割りを、指示書の通りテンポ良く修正しました！
                            </div>
                          </div>
                          <button type="button" className="w-full rounded-lg py-2.5 text-sm font-semibold text-white" style={{ backgroundColor: BRAND }}>
                            納品する
                          </button>
                        </div>
                      </div>
                    )}
                    {card.dummy === "reward" && (
                      <div className="w-full max-w-[400px] rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
                        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#1f2937]">
                          <Coins className="h-5 w-5" style={{ color: BRAND }} />
                          報酬確認
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { label: "今月の確定", value: "¥15,000", sub: "30本納品済み" },
                            { label: "未確定", value: "¥3,500", sub: "バズ報告中" },
                            { label: "累計報酬", value: "¥48,500", sub: "" },
                          ].map((item, i) => (
                            <div key={i} className="rounded-lg border border-[#e5e7eb] bg-[#fafafa] p-2.5 text-center">
                              <p className="text-[10px] leading-tight text-[#6b7280]">{item.label}</p>
                              <p className="mt-1 text-sm font-bold" style={{ color: BRAND }}>{item.value}</p>
                              {item.sub && <p className="mt-0.5 text-[10px] text-[#9ca3af]">{item.sub}</p>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              />
              <ScrollReveal className="mt-8 text-center" delay={0.25}>
                <p className="text-base text-[#64748b]">
                  PayPay か銀行振込から、自分に合った支払い方法を選択可能
                </p>
              </ScrollReveal>
            </div>
            )}

            {targetTab === "owner" && (
            <div id="owner-benefits">
              <ScrollReveal>
                <h3 className="mb-6 text-center text-xl font-semibold text-[#374151]">
                  オーナーが、検収と支払いに集中できる環境を。
                </h3>
              </ScrollReveal>
              <FeaturesCarousel
                cards={OWNER_CARDS}
                activeIndex={ownerActiveIndex}
                setActiveIndex={setOwnerActiveIndex}
                renderCardContent={(card) => (
                  <>
                    {card.dummy === "kpi" && (
                      <div className="w-full max-w-[400px] space-y-3">
                        <div className="grid grid-cols-3 gap-2">
                          <div className="rounded-lg border border-[#e5e7eb] bg-white p-2.5 text-center shadow-sm">
                            <p className="text-lg font-bold text-[#1f2937]">5人</p>
                            <p className="mt-0.5 text-[10px] text-[#6b7280]">総クリエイター数</p>
                          </div>
                          <div className="rounded-lg border border-[#e5e7eb] bg-white p-2.5 text-center shadow-sm">
                            <p className="text-lg font-bold text-[#1f2937]">80%</p>
                            <p className="mt-0.5 text-[10px] text-[#6b7280]">今月アクティブ</p>
                          </div>
                          <div className="rounded-lg border border-[#e5e7eb] bg-white p-2.5 text-center shadow-sm">
                            <p className="text-sm font-bold" style={{ color: BRAND }}>¥124,500</p>
                            <p className="mt-0.5 text-[10px] text-[#6b7280]">総支払報酬（累計）</p>
                          </div>
                        </div>
                        <div className="rounded-xl border border-[#e5e7eb] bg-white p-2.5 shadow-sm">
                          <div className="flex items-center gap-2 border-b border-[#e5e7eb] pb-1.5 text-[10px] font-medium text-[#6b7280]">
                            <span className="text-[#1f2937]">名前</span>
                            <span className="flex-1" />
                            <span>累計納品</span>
                            <span>ステータス</span>
                          </div>
                          {[
                            { name: "ヤマダ", deliveries: "32本", status: "稼働中" },
                            { name: "タナカ", deliveries: "28本", status: "稼働中" },
                            { name: "サトウ", deliveries: "19本", status: "稼働中" },
                          ].map((row, i) => (
                            <div key={i} className="flex items-center gap-2 border-t border-[#f3f4f6] py-1.5 text-xs">
                              <span className="font-medium text-[#1f2937]">{row.name}</span>
                              <span className="flex-1" />
                              <span className="text-[#6b7280]">{row.deliveries}</span>
                              <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700">{row.status}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {card.dummy === "review" && (
                      <div className="flex w-full max-w-[480px] gap-2">
                        {/* 左: 未確認リスト（狭め） */}
                        <div className="flex min-w-0 flex-[1] flex-col rounded-xl border border-[#e5e7eb] bg-white p-2 shadow-sm">
                          <p className="mb-1.5 flex items-center gap-1 text-[10px] font-semibold" style={{ color: BRAND }}>
                            <CheckSquare className="h-3.5 w-3.5" /> 未確認
                          </p>
                          {[
                            { title: "【検証】最新AIツールだけで動画100本作ってみた", date: "2/15" },
                            { title: "Vibe Coding：20歳エンジニアの作業環境紹介", date: "2/14" },
                            { title: "【Shorts】今すぐ使える爆速ショートカット集", date: "2/14" },
                          ].map((item, i) => (
                            <button
                              key={i}
                              type="button"
                              className={`mb-1.5 rounded-lg border px-2 py-1.5 text-left last:mb-0 ${i === 0 ? "border-[#00c0ff]/50 bg-[#00c0ff]/5" : "border-[#e5e7eb] bg-[#fafafa]"}`}
                            >
                              <p className="truncate text-[11px] font-medium text-[#1f2937]">{item.title}</p>
                              <p className="mt-0.5 text-[10px] text-[#6b7280]">{item.date}</p>
                            </button>
                          ))}
                        </div>
                        {/* 右: プレビュー・検収エリア（広め） */}
                        <div className="flex min-w-0 flex-[3] flex-col rounded-xl border border-[#e5e7eb] bg-white p-3 shadow-sm">
                          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-[#1f2937]">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white">
                                <Play className="h-6 w-6 ml-0.5" fill="currentColor" />
                              </div>
                            </div>
                          </div>
                          <div className="mt-2.5 space-y-0.5">
                            <p className="truncate text-sm font-semibold text-[#1f2937]">
                              【検証】最新AIツールだけで動画100本作ってみた
                            </p>
                            <p className="text-xs text-[#6b7280]">Submitted by: 山田エディター</p>
                          </div>
                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              className="rounded-lg px-4 py-2 text-sm font-semibold text-white"
                              style={{ backgroundColor: BRAND }}
                            >
                              検収を完了する
                            </button>
                            <button
                              type="button"
                              className="rounded-lg border border-[#d1d5db] bg-white px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]"
                            >
                              修正を依頼する
                            </button>
                            <button
                              type="button"
                              className="text-xs font-medium text-[#6b7280] hover:underline"
                              style={{ color: BRAND }}
                            >
                              バズり判定へ進む
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    {card.dummy === "settlement" && (
                      <div className="w-full max-w-[400px] space-y-3">
                        <div className="grid grid-cols-3 gap-2">
                          <div className="rounded-lg border border-[#e5e7eb] bg-white p-2.5 text-center shadow-sm">
                            <p className="text-[10px] text-[#6b7280]">3月7日支払い分</p>
                            <p className="mt-1 text-sm font-bold" style={{ color: BRAND }}>¥42,500</p>
                          </div>
                          <div className="rounded-lg border border-[#e5e7eb] bg-white p-2.5 text-center shadow-sm">
                            <p className="text-[10px] text-[#6b7280]">未払い金額</p>
                            <p className="mt-1 text-sm font-bold text-[#1f2937]">¥12,000</p>
                          </div>
                          <div className="rounded-lg border border-[#e5e7eb] bg-white p-2.5 text-center shadow-sm">
                            <p className="text-[10px] text-[#6b7280]">支払い完了額</p>
                            <p className="mt-1 text-sm font-bold" style={{ color: BRAND }}>¥250,000</p>
                          </div>
                        </div>
                        <div className="rounded-lg border border-[#e5e7eb] bg-[#fafafa] px-3 py-2 text-xs text-[#6b7280]">
                          内訳: 基本報酬 ¥500×80本 + バズ報酬 自動集計
                        </div>
                        <button type="button" className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#00c0ff]/40 bg-[#00c0ff]/5 py-2.5 text-sm font-medium" style={{ color: BRAND }}>
                          <Download className="h-4 w-4" />
                          CSVエクスポート
                        </button>
                      </div>
                    )}
                    {card.dummy === "content" && (
                      <div className="w-full max-w-[400px] space-y-3 rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
                        <p className="flex items-center gap-2 text-sm font-semibold text-[#1f2937]">
                          <FolderPlus className="h-5 w-5" style={{ color: BRAND }} />
                          配布中の素材
                        </p>
                        <ul className="space-y-2">
                          {[
                            "2/20公開分：インタビュー元動画（4K）",
                            "【共通】テロップ用モーショングラフィックス集",
                            "チャンネル公式ロゴ・フォント指定書",
                          ].map((label, i) => (
                            <li
                              key={i}
                              className="flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-[#fafafa] px-3 py-2 text-sm text-[#1f2937]"
                            >
                              <span className="flex-1 truncate">{label}</span>
                            </li>
                          ))}
                        </ul>
                        <button type="button" className="w-full rounded-lg py-2.5 text-sm font-semibold text-white" style={{ backgroundColor: BRAND }}>
                          追加する
                        </button>
                      </div>
                    )}
                  </>
                )}
              />
            </div>
            )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-[#eee] px-4 py-24 sm:px-6 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <ScrollReveal>
              <h2 className="text-3xl font-bold tracking-tight text-[#171717] sm:text-4xl">
                今すぐ無料で始める
              </h2>
              <p className="mt-5 text-lg text-[#555]">
                アカウント登録は無料。納品と報酬管理を、もっとスマートに。
              </p>
                <motion.a
                href="/register"
                className="mt-10 inline-flex items-center gap-2 rounded-full px-10 py-5 text-xl font-semibold text-white shadow-lg shadow-[#00c0ff]/25 transition hover:shadow-[#00c0ff]/35"
                style={{ backgroundColor: BRAND }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                今すぐ無料で始める
                <ArrowRight className="h-5 w-5" />
              </motion.a>
            </ScrollReveal>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e5e7eb] bg-white px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 text-center">
          {/* SNS アイコン（プレースホルダーリンク） */}
          <div className="flex items-center justify-center gap-5">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] transition-colors hover:text-[#00c0ff]"
              aria-label="X"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] transition-colors hover:text-[#00c0ff]"
              aria-label="YouTube"
            >
              <Youtube className="h-5 w-5 sm:h-5" strokeWidth={1.5} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] transition-colors hover:text-[#00c0ff]"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5 sm:h-5" strokeWidth={1.5} />
            </a>
          </div>
          <p className="text-sm text-[#666]">
            Kiri Clip Lab | 動画納品・報酬管理をスマートに。
          </p>
        </div>
      </footer>
    </div>
  );
}
