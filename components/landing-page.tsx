"use client";

import Lenis from "lenis";
import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  Command,
  Database,
  FileText,
  LayoutDashboard,
  Link2,
  Play,
  Sparkles,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = ["Blog", "Changelog", "Pricing", "About", "Careers"];
const brands = ["NOVA", "Buildbox", "Fourpoints", "Orbit", "Codecraft", "Pictel"];
const sidebarItems: Array<[LucideIcon, string, boolean?]> = [
  [Zap, "Quick Create", true],
  [LayoutDashboard, "Dashboard"],
  [Link2, "Lifecycle"],
  [Activity, "Analytics"],
  [FileText, "Projects"],
  [Users, "Team"],
];

const cards = [
  {
    title: "Track every run",
    body: "A simple pulse for automations, replies, tasks, and revenue moments.",
    visual: "bars",
    icon: Activity,
  },
  {
    title: "Collaborate without chaos",
    body: "Invite your team, leave notes, and ship workflows together.",
    visual: "orbit",
    icon: Users,
  },
  {
    title: "Keep launches tidy",
    body: "Plan content, sales, and customer touchpoints in one clean calendar.",
    visual: "calendar",
    icon: CalendarDays,
  },
];

const faqs = [
  {
    q: "Do I need technical skills to use it?",
    a: "No. Aurora is built around plain-language steps, templates, and visual blocks. You can get useful workflows running without writing code.",
  },
  {
    q: "Can Aurora connect my current tools?",
    a: "Yes. It is designed for the apps founders and creators already use: forms, stores, docs, CRMs, email, calendars, and community tools.",
  },
  {
    q: "Can I collaborate with others?",
    a: "Yes. Bring in a cofounder, VA, editor, or ops person and keep everyone working from the same workflow canvas.",
  },
  {
    q: "What kind of support is available?",
    a: "Starter templates, guided setup, and fast human support for paid teams. We keep the docs short and useful.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function LandingPage() {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const lenis = new Lenis({
      lerp: 0.075,
      wheelMultiplier: 0.85,
      smoothWheel: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [shouldReduceMotion]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030403] text-white">
      <div className="grain-layer" />
      <HeroAurora />
      <TopNav />
      <Hero />
      <DockNav />
      <TrustedBy />
      <Features />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}

function TopNav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="fixed left-1/2 top-5 z-50 flex w-[min(920px,calc(100%-32px))] -translate-x-1/2 items-center justify-between"
    >
      <Logo />
      <nav className="hidden items-center gap-7 text-[13px] text-white/68 md:flex">
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-white">
            {item}
          </a>
        ))}
      </nav>
      <Button className="h-8 rounded-lg bg-white px-4 text-xs text-black hover:bg-white/90">Join waitlist</Button>
    </motion.header>
  );
}

function Hero() {
  const previewRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: previewRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [28, -22]);

  return (
    <section className="relative z-10 flex min-h-[690px] flex-col items-center px-4 pt-28 text-center sm:min-h-[760px]">
      <motion.div
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-4xl flex-col items-center"
      >
        <motion.span
          variants={fadeUp}
          className="rounded-md border border-cyan-300/15 bg-cyan-300/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-200/80 shadow-[0_0_30px_rgba(45,212,191,0.16)]"
        >
          New workflow update
        </motion.span>
        <motion.h1
          variants={fadeUp}
          className="mt-7 max-w-3xl font-display text-[48px] font-semibold leading-[0.94] tracking-[-0.065em] text-balance sm:text-[76px] lg:text-[88px]"
        >
          Automations that feel easy to ship
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-6 max-w-md text-sm leading-6 text-white/48 sm:text-[15px]">
          Build workflows for launches, sales, content, and support without turning your day into admin.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-7 flex items-center gap-3">
          <Button className="h-9 rounded-lg px-4 text-xs">
            Start building <Sparkles className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" className="h-9 rounded-lg bg-white text-xs text-black hover:bg-white/90">
            <Play className="h-3.5 w-3.5 fill-black/10" /> Watch video
          </Button>
        </motion.div>
      </motion.div>

      <motion.div ref={previewRef} style={{ y }} className="relative mt-16 w-[min(980px,calc(100vw-32px))]">
        <DashboardMockup />
      </motion.div>
    </section>
  );
}

function DockNav() {
  return (
    <section className="relative z-20 -mt-7 px-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="mx-auto flex w-[min(760px,calc(100vw-32px))] items-center justify-between rounded-xl border border-white/8 bg-[#101010]/92 px-3 py-2 shadow-2xl shadow-black/40 backdrop-blur-xl"
      >
        <Logo compact />
        <nav className="hidden items-center gap-6 text-[12px] text-white/62 sm:flex">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-white">
              {item}
            </a>
          ))}
        </nav>
        <Button className="h-8 rounded-lg bg-white px-4 text-xs text-black hover:bg-white/90">Join waitlist</Button>
      </motion.div>
    </section>
  );
}

function TrustedBy() {
  return (
    <Section className="pt-16">
      <Reveal className="text-center">
        <p className="text-[13px] text-white/42">Trusted by teams at</p>
      </Reveal>
      <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 items-center gap-5 sm:grid-cols-3 lg:grid-cols-6">
        {brands.map((brand, index) => (
          <Reveal key={brand} delay={index * 0.04}>
            <div className="flex items-center justify-center gap-2 text-sm font-semibold text-white/32 transition hover:text-white/68">
              <span className="grid h-5 w-5 place-items-center rounded-md bg-white/10">
                <ArrowUpRight className="h-3 w-3" />
              </span>
              {brand}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Features() {
  return (
    <Section id="features" className="pt-20">
      <Reveal>
        <span className="section-pill">Features</span>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-medium tracking-[-0.05em] text-white sm:text-4xl">
          Built for clarity, built for momentum
        </h2>
      </Reveal>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {cards.map((card, index) => (
          <Reveal key={card.title} delay={index * 0.08}>
            <motion.article
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="group relative min-h-[315px] overflow-hidden rounded-lg border border-white/8 bg-[#151515] shadow-[0_18px_60px_rgba(0,0,0,0.25)]"
            >
              <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/[0.04] to-transparent" />
              <FeatureVisual type={card.visual} />
              <div className="absolute inset-x-0 bottom-0 border-t border-white/6 bg-[#151515]/92 p-5 backdrop-blur">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                  <card.icon className="h-4 w-4 text-cyan-300/80" />
                  {card.title}
                </div>
                <p className="max-w-sm text-[13px] leading-5 text-white/42">{card.body}</p>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function FAQ() {
  return (
    <Section id="about" className="pt-24">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1fr]">
        <Reveal>
          <span className="section-pill">Frequently asked questions</span>
          <h2 className="mt-4 max-w-md font-display text-3xl font-medium leading-tight tracking-[-0.05em] sm:text-4xl">
            Everything you want to know
          </h2>
        </Reveal>
        <Reveal>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.q} value={`faq-${index}`} className="rounded-lg border border-white/7 bg-[#121212] px-4">
                <AccordionTrigger className="py-4 text-[13px] text-white/78">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-[13px] text-white/45">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  );
}

function CTA() {
  return (
    <Section className="py-14">
      <Reveal>
        <div className="aurora-panel relative flex min-h-32 flex-col justify-between overflow-hidden rounded-xl border border-white/8 px-5 py-7 sm:flex-row sm:items-center sm:px-7">
          <div className="relative z-10">
            <h2 className="font-display text-2xl font-medium tracking-[-0.04em]">Ready to get started?</h2>
            <p className="mt-2 max-w-sm text-[13px] leading-5 text-white/48">
              Start with a tiny workflow today. Let Aurora quietly handle the repetitive parts.
            </p>
          </div>
          <Button className="relative z-10 mt-6 h-9 rounded-lg bg-white px-4 text-xs text-black hover:bg-white/90 sm:mt-0">
            Get started
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 px-4 pb-16 pt-8">
      <div className="mx-auto grid max-w-[980px] gap-12 border-t border-white/0 pt-2 sm:grid-cols-[1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-24 text-xs leading-5 text-white/28">© 2026 Aurora. All rights reserved.</p>
        </div>
        <div className="grid grid-cols-3 gap-8 text-xs">
          <FooterColumn title="Product" links={["Blog", "Changelog", "Pricing"]} />
          <FooterColumn title="Company" links={["About", "Careers", "Contact"]} />
          <FooterColumn title="Legal" links={["Terms", "Privacy"]} />
        </div>
      </div>
    </footer>
  );
}

function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut", delay: 0.35 }}
      className="relative mx-auto overflow-hidden rounded-lg border border-white/14 bg-[#0f0f0f] p-1.5 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_30px_120px_rgba(0,0,0,0.72)]"
    >
      <div className="relative overflow-hidden rounded-md border border-white/8 bg-[#090909]">
        <div className="flex h-11 items-center justify-between border-b border-white/8 px-4">
          <Logo compact />
          <div className="hidden items-center gap-5 text-[11px] text-white/45 sm:flex">
            <span>Automations</span>
            <span>Customers</span>
            <span>Reports</span>
          </div>
        </div>
        <div className="grid min-h-[420px] md:grid-cols-[170px_1fr]">
          <aside className="hidden border-r border-white/8 bg-white/[0.02] p-3 md:block">
            {sidebarItems.map(([Icon, label, active]) => (
              <div
                key={String(label)}
                className={cn(
                  "mb-1.5 flex items-center gap-2 rounded-md px-2.5 py-2 text-[12px] text-white/48",
                  active && "bg-white text-black",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {String(label)}
              </div>
            ))}
            <p className="mt-6 px-2 text-[10px] uppercase tracking-[0.16em] text-white/24">Sources</p>
            <div className="mt-2 flex items-center gap-2 rounded-md px-2.5 py-2 text-[12px] text-white/42">
              <Database className="h-3.5 w-3.5" /> Data Library
            </div>
          </aside>
          <div className="p-4 sm:p-5">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-[12px] text-white/50">Overview</p>
              <div className="flex items-center gap-2 rounded-md bg-white/[0.04] px-2 py-1 text-[11px] text-white/36">
                Live <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]" />
              </div>
            </div>
            <div className="grid gap-3 lg:grid-cols-4">
              {[
                ["Total Revenue", "$18,420", "+14.2%"],
                ["New Customers", "284", "+8.6%"],
                ["Active Runs", "46,912", "+17.3%"],
                ["Saved Hours", "312", "+21.8%"],
              ].map(([label, value, change]) => (
                <div key={label} className="rounded-lg border border-white/7 bg-[#151515] p-4">
                  <div className="flex items-center justify-between text-[11px] text-white/34">
                    <span>{label}</span>
                    <span className="rounded bg-cyan-300/10 px-1.5 py-0.5 text-cyan-200/80">{change}</span>
                  </div>
                  <p className="mt-5 text-2xl font-medium tracking-[-0.04em]">{value}</p>
                  <p className="mt-2 text-[11px] text-white/30">Trending up this month</p>
                </div>
              ))}
            </div>
            <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_0.62fr]">
              <div className="rounded-lg border border-white/7 bg-[#151515] p-4">
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-[12px] text-white/62">Workflow volume</p>
                  <p className="text-[11px] text-white/30">Last 30 days</p>
                </div>
                <div className="flex h-40 items-end gap-1.5">
                  {[38, 54, 42, 68, 60, 82, 48, 72, 66, 91, 58, 76, 52, 84, 69, 96, 74, 88].map((height, index) => (
                    <motion.div
                      key={index}
                      initial={{ height: 10 }}
                      whileInView={{ height: `${height}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.65, delay: index * 0.018 }}
                      className={cn(
                        "flex-1 rounded-t bg-white/20",
                        index < 11 && "bg-gradient-to-t from-cyan-800 to-cyan-300",
                      )}
                    />
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-white/7 bg-[#151515] p-4">
                <p className="mb-5 text-[12px] text-white/62">Automation queue</p>
                {["Send onboarding", "Tag hot leads", "Draft launch recap"].map((item, index) => (
                  <div key={item} className="mb-3 flex items-center gap-3 rounded-md bg-black/26 p-3 text-[12px] text-white/52">
                    <span className="grid h-5 w-5 place-items-center rounded bg-cyan-300/12 text-cyan-200">{index + 1}</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FeatureVisual({ type }: { type: string }) {
  if (type === "orbit") {
    return (
      <div className="absolute inset-x-0 top-0 flex h-52 items-center justify-center overflow-hidden">
        <div className="absolute h-48 w-48 rounded-full border border-white/7" />
        <div className="absolute h-32 w-32 rounded-full border border-white/7" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="relative h-44 w-44 rounded-full"
        >
          <span className="absolute left-3 top-16 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(103,232,249,0.75)]" />
          <span className="absolute right-2 top-8 h-4 w-4 rounded-full bg-amber-200 shadow-[0_0_20px_rgba(253,230,138,0.6)]" />
          <span className="absolute bottom-6 right-10 h-2.5 w-2.5 rounded-full bg-teal-300" />
        </motion.div>
        <div className="z-10 grid h-12 w-12 place-items-center rounded-full bg-[#0b0b0b] ring-1 ring-white/10">
          <Command className="h-5 w-5 text-white/80" />
        </div>
      </div>
    );
  }

  if (type === "calendar") {
    return (
      <div className="absolute inset-x-0 top-0 h-52 p-8">
        <div className="mx-auto grid max-w-[280px] grid-cols-3 gap-1.5 text-[10px] text-white/32">
          {["Fri 07", "Sat 08", "Sun 09"].map((day) => (
            <div key={day} className="text-center">{day}</div>
          ))}
          <div className="h-24 rounded-md bg-black/35" />
          <div className="space-y-1.5 rounded-md bg-black/35 p-2">
            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }} className="rounded bg-cyan-500/70 p-2 text-[10px] leading-3 text-cyan-50">
              Ship email
              <br />
              9:00 AM
            </motion.div>
          </div>
          <div className="space-y-1.5 rounded-md bg-black/35 p-2">
            <div className="mt-12 rounded bg-cyan-500/60 p-2 text-[10px] leading-3 text-cyan-50">
              Review clips
              <br />
              3:30 PM
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-x-0 top-0 flex h-52 items-center justify-center">
      <div className="rounded-md bg-[#0b0b0b] p-4 ring-1 ring-white/6">
        <div className="mb-3 flex justify-between gap-16 text-[10px] text-white/46">
          <span>Previous</span>
          <span>Current</span>
        </div>
        <div className="flex h-20 items-end gap-1">
          {Array.from({ length: 30 }).map((_, index) => (
            <motion.span
              key={index}
              initial={{ height: 8 }}
              whileInView={{ height: index < 17 ? 52 - (index % 5) * 4 : 28 + (index % 6) * 3 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.015, duration: 0.5 }}
              className={cn("w-1 rounded bg-white/24", index < 17 && "bg-cyan-400/80")}
            />
          ))}
        </div>
        <span className="mt-3 inline-flex rounded bg-cyan-300/12 px-2 py-1 text-[10px] text-cyan-100">Live trend</span>
      </div>
    </div>
  );
}

function HeroAurora() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[620px] overflow-hidden">
      <motion.div
        animate={{
          x: ["-7%", "5%", "-3%", "-7%"],
          y: ["-10%", "-4%", "-12%", "-10%"],
          scale: [1, 1.08, 0.98, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-[-250px] h-[620px] w-[1180px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(45,212,191,0.95)_0%,rgba(20,184,166,0.68)_28%,rgba(6,78,59,0.32)_49%,rgba(0,0,0,0)_73%)] blur-2xl"
      />
      <motion.div
        animate={{ opacity: [0.34, 0.58, 0.42, 0.34], x: ["6%", "-3%", "4%", "6%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-[-170px] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.85)_0%,rgba(20,83,45,0.42)_42%,rgba(0,0,0,0)_72%)] blur-3xl"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030403]/35 to-[#030403]" />
    </div>
  );
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#" className="flex items-center gap-2 text-white">
      <span className={cn("grid place-items-center rounded-full bg-white text-black", compact ? "h-5 w-5" : "h-6 w-6")}>
        <Sparkles className={cn(compact ? "h-3 w-3" : "h-3.5 w-3.5")} />
      </span>
      <span className={cn("font-display font-medium tracking-[-0.04em]", compact ? "text-sm" : "text-base")}>Aurora</span>
    </a>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <p className="mb-4 font-medium text-white/72">{title}</p>
      <div className="space-y-3 text-white/36">
        {links.map((link) => (
          <a key={link} href="#" className="block transition hover:text-white/72">
            {link}
          </a>
        ))}
      </div>
    </div>
  );
}

function Section({ children, id, className }: { children: ReactNode; id?: string; className?: string }) {
  return (
    <section id={id} className={cn("relative z-10 px-4 py-24", className)}>
      <div className="mx-auto max-w-[980px]">{children}</div>
    </section>
  );
}

function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
      variants={fadeUp}
      transition={{ duration: 0.62, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
