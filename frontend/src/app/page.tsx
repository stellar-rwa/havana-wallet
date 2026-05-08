"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Zap,
  Globe,
  ArrowRight,
  ChevronRight,
  Lock,
  Users,
  Activity,
  ExternalLink,
} from "lucide-react";

const NAV_LINKS = ["Protocol", "NGOs", "Employers", "Developers"];

const STATS = [
  { value: "117M+", label: "People Displaced", sub: "globally in 2024" },
  { value: "< 5s", label: "Settlement Time", sub: "on Stellar network" },
  { value: "$0.00001", label: "Per Transaction", sub: "vs $25 SWIFT avg" },
  { value: "4", label: "Core Contracts", sub: "Soroban Protocol 25" },
];

const FEATURES = [
  {
    icon: Shield,
    tag: "ZK Identity",
    title: "Prove Who You Are. Reveal Nothing.",
    body: "Cryptographic commitments via Poseidon hashing let refugees prove verified identity to NGOs without exposing a single document. Your identity lives on-chain. Your data stays with you.",
    accent: "#00D4AA",
  },
  {
    icon: Zap,
    tag: "Aid Disbursement",
    title: "From NGO to Wallet in Seconds.",
    body: "The Stellar Disbursement Platform routes aid directly to verified on-chain identities. No intermediaries. No cash-handling risk. Programmable allocation with period-locked claims.",
    accent: "#6366F1",
  },
  {
    icon: Lock,
    tag: "Payroll Escrow",
    title: "Wages Locked Until You Earn Them.",
    body: "Employers fund on-chain escrow. Workers claim wages after the release window. Smart contract enforcement means no withheld pay, no exploitation, no legal grey areas.",
    accent: "#F59E0B",
  },
  {
    icon: Globe,
    tag: "Offline Fallback",
    title: "Works Without a Smartphone.",
    body: "Twilio SMS gateway enables transfers and balance checks via feature phone. Because 40% of displaced people don't have a smartphone — but they all have a SIM card.",
    accent: "#00D4AA",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Register Identity",
    body: "A trusted verifier (UNHCR, NGO partner) issues a ZK commitment to your wallet. No PII stored on-chain.",
  },
  {
    n: "02",
    title: "Receive Aid",
    body: "Verified wallets are eligible for SDP disbursements. Funds arrive in USDC directly, no bank required.",
  },
  {
    n: "03",
    title: "Transact Freely",
    body: "Pay merchants, send remittances, access payroll — all from a Freighter-connected wallet or SMS fallback.",
  },
];

const TECH_STACK = [
  { name: "Stellar Protocol 25", color: "#00D4AA" },
  { name: "Soroban WASM", color: "#6366F1" },
  { name: "ZK Poseidon Hash", color: "#F59E0B" },
  { name: "Next.js 16", color: "#00D4AA" },
  { name: "Express 5 API", color: "#6366F1" },
  { name: "Prisma + PostgreSQL", color: "#F59E0B" },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#04070F] overflow-x-hidden">

      {/* ─── NAVBAR ─── */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4"
      >
        <div className="absolute inset-0 bg-[#04070F]/80 backdrop-blur-xl border-b border-white/[0.05]" />
        <div className="relative flex items-center gap-2.5 z-10">
          <div className="w-8 h-8 rounded-lg teal-gradient flex items-center justify-center">
            <Globe className="w-4 h-4 text-black" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Havana
          </span>
        </div>
        <div className="relative hidden md:flex items-center gap-8 z-10">
          {NAV_LINKS.map((l) => (
            <a key={l} href="#" className="text-sm text-[#7B93B8] hover:text-white transition-colors duration-200">
              {l}
            </a>
          ))}
        </div>
        <div className="relative flex items-center gap-3 z-10">
          <a href="#" className="hidden md:block text-sm text-[#7B93B8] hover:text-white transition-colors">
            Sign In
          </a>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00D4AA] text-black text-sm font-semibold hover:bg-[#00FFD1] transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,212,170,0.4)]">
            Launch App <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
          </button>
        </div>
      </motion.nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-24 px-6 text-center overflow-hidden">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[700px] h-[700px] top-[-15%] left-[-10%] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(0,212,170,0.10) 0%, transparent 70%)" }} />
          <div className="absolute w-[600px] h-[600px] top-[10%] right-[-10%] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)" }} />
          <div className="absolute w-[400px] h-[400px] bottom-[5%] left-[40%] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(0,212,170,0.06) 0%, transparent 70%)" }} />
          {/* Grid */}
          <div className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(rgba(0,212,170,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,170,0.03) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }} />
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to top, #04070F, transparent)" }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center max-w-5xl mx-auto w-full">

          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <div className="pill-badge mb-8">
              <span className="pill-dot" />
              Live on Stellar Testnet — Protocol 25
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-extrabold leading-[1.06] tracking-[-0.03em] text-white mb-6"
            style={{ fontSize: "clamp(2.6rem, 7.5vw, 5.5rem)" }}
          >
            Financial sovereignty
            <br />
            <span className="gradient-text">for every displaced</span>
            <br />
            person on Earth.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg md:text-xl text-[#7B93B8] max-w-2xl leading-relaxed mb-10"
          >
            Self-sovereign ZK identity, programmable aid disbursements, and payroll
            escrow — all on Stellar&apos;s 5-second, $0.00001 network.
            No ID. No bank. No borders.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 mb-20"
          >
            <button className="group flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#00D4AA] text-black text-sm font-bold tracking-wide hover:bg-[#00FFD1] hover:shadow-[0_0_40px_rgba(0,212,170,0.45)] transition-all duration-300">
              Get Your Wallet
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
            </button>
            <button className="group flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-white/10 bg-white/[0.03] text-white text-sm font-semibold hover:border-[#00D4AA]/30 hover:bg-white/[0.06] transition-all duration-300">
              View Contracts
              <ExternalLink className="w-3.5 h-3.5 text-[#7B93B8] group-hover:text-[#00D4AA] transition-colors" strokeWidth={2} />
            </button>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="w-full grid grid-cols-2 md:grid-cols-4 overflow-hidden rounded-2xl"
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {STATS.map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1 px-6 py-6 hover:bg-white/[0.03] transition-colors"
                style={{
                  background: "rgba(13,21,37,0.8)",
                  borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none",
                }}
              >
                <span
                  className="font-bold text-white"
                  style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontFamily: "'Space Mono', monospace" }}
                >
                  {s.value}
                </span>
                <span className="text-[11px] font-bold text-[#00D4AA] uppercase tracking-widest">
                  {s.label}
                </span>
                <span className="text-[11px] text-[#4A6080]">{s.sub}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="relative py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[#00D4AA] text-xs font-bold tracking-[0.2em] uppercase mb-4"
          >
            The Protocol
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight max-w-2xl mx-auto leading-tight"
          >
            Four primitives. One complete financial stack.
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-8 flex flex-col gap-5 rounded-2xl border cursor-default group transition-all duration-300"
              style={{
                background: "rgba(13,21,37,0.6)",
                backdropFilter: "blur(20px)",
                borderColor: "rgba(255,255,255,0.07)",
              }}
              whileHover={{ borderColor: `${f.accent}30` }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${f.accent}14`, border: `1px solid ${f.accent}22` }}
                >
                  <f.icon className="w-5 h-5" style={{ color: f.accent }} strokeWidth={1.5} />
                </div>
                <span
                  className="text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full"
                  style={{ color: f.accent, background: `${f.accent}12`, border: `1px solid ${f.accent}25` }}
                >
                  {f.tag}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2.5 tracking-tight leading-snug">{f.title}</h3>
                <p className="text-[#7B93B8] leading-relaxed text-sm">{f.body}</p>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold mt-auto" style={{ color: f.accent }}>
                Learn more <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="relative py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-[#6366F1] text-xs font-bold tracking-[0.2em] uppercase mb-4"
            >
              Flow
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white tracking-tight"
            >
              Up and running in three steps.
            </motion.h2>
          </div>
          <div className="flex flex-col gap-4">
            {STEPS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-6 p-7 rounded-2xl border border-white/[0.06]"
                style={{ background: "rgba(16,26,46,0.7)", backdropFilter: "blur(24px)" }}
              >
                <div
                  className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold mt-0.5"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    color: "#00D4AA",
                    background: "rgba(0,212,170,0.08)",
                    border: "1px solid rgba(0,212,170,0.2)",
                  }}
                >
                  {s.n}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1.5">{s.title}</h3>
                  <p className="text-[#7B93B8] text-sm leading-relaxed">{s.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TECH STACK ─── */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="w-full h-px mb-12" style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,170,0.2), rgba(99,102,241,0.2), transparent)" }} />
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-[#374B6B] text-xs uppercase tracking-widest font-semibold mr-4">Built with</span>
            {TECH_STACK.map((t, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
                style={{ color: t.color, background: `${t.color}10`, border: `1px solid ${t.color}20` }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: t.color }} />
                {t.name}
              </motion.span>
            ))}
          </div>
          <div className="w-full h-px mt-12" style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,170,0.2), rgba(99,102,241,0.2), transparent)" }} />
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto rounded-3xl p-14 text-center relative overflow-hidden"
          style={{
            background: "rgba(16,26,46,0.8)",
            backdropFilter: "blur(32px)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="absolute inset-0 rounded-3xl" style={{ background: "linear-gradient(135deg, rgba(0,212,170,0.05), transparent, rgba(99,102,241,0.05))" }} />
          <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl" style={{ background: "rgba(0,212,170,0.08)" }} />
          <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full blur-3xl" style={{ background: "rgba(99,102,241,0.08)" }} />
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Activity className="w-4 h-4 text-[#00D4AA]" />
              <span className="text-[#00D4AA] text-[10px] font-bold tracking-[0.2em] uppercase">Stellar Drip Wave</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tight leading-tight">
              Build the future of{" "}
              <span className="gradient-text">humanitarian finance.</span>
            </h2>
            <p className="text-[#7B93B8] text-base max-w-xl mx-auto mb-10 leading-relaxed">
              Havana is open-source and participates in the Stellar Wave Program.
              Pick up a bounty, ship a feature, earn XLM.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#00D4AA] text-black text-sm font-bold tracking-wide hover:bg-[#00FFD1] hover:shadow-[0_0_50px_rgba(0,212,170,0.5)] transition-all duration-300">
                <Users className="w-4 h-4" strokeWidth={2.5} />
                View Open Issues
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
              </button>
              <button className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-white/10 bg-white/[0.03] text-white text-sm font-semibold hover:border-[#00D4AA]/25 transition-all duration-300">
                Read the Docs <ExternalLink className="w-3.5 h-3.5 text-[#7B93B8]" strokeWidth={2} />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/[0.05] py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg teal-gradient flex items-center justify-center">
              <Globe className="w-3.5 h-3.5 text-black" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-semibold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Havana</span>
          </div>
          <p className="text-xs text-[#374B6B] text-center">
            © 2026 Havana Platform · MIT License · Built for the Stellar Drip Wave
          </p>
          <div className="flex items-center gap-6">
            {["GitHub", "Docs", "Security"].map((l) => (
              <a key={l} href="#" className="text-xs text-[#374B6B] hover:text-[#00D4AA] transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}
