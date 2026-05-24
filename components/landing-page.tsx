"use client";

import Lenis from "lenis";
import Image from "next/image";
import {
  Activity,
  CalendarDays,
  Command,
  Database,
  FileText,
  LayoutDashboard,
  Link2,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = ["Blog", "Changelog", "Pricing", "About"];
type DashboardPage = "Quick Create" | "Dashboard" | "Lifecycle" | "Analytics" | "Projects" | "Team";

const sidebarItems: Array<[LucideIcon, DashboardPage]> = [
  [Zap, "Quick Create"],
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
      <Features />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}

function TopNav() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const updateNav = () => {
      const threshold = Math.min(window.innerHeight * 0.78, 720);
      setIsCompact(window.scrollY > threshold);
    };

    updateNav();
    window.addEventListener("scroll", updateNav, { passive: true });
    window.addEventListener("resize", updateNav);

    return () => {
      window.removeEventListener("scroll", updateNav);
      window.removeEventListener("resize", updateNav);
    };
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={cn(
        "fixed left-1/2 z-50 flex -translate-x-1/2 items-center justify-between rounded-xl border backdrop-blur-xl transition-[width,top,padding,background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isCompact
          ? "top-3 w-[min(560px,calc(100%-32px))] border-white/8 bg-[#101010]/95 px-2 py-1.5 shadow-[0_24px_80px_rgba(0,0,0,0.38)]"
          : "top-5 w-[min(920px,calc(100%-32px))] border-white/0 bg-[#101010]/0 px-3 py-2 shadow-none",
      )}
    >
      <Logo compact={isCompact} />
      <nav className={cn("hidden items-center text-white/68 transition-all duration-300 md:flex", isCompact ? "gap-4 text-[11px]" : "gap-7 text-[13px]")}>
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-white">
            {item}
          </a>
        ))}
      </nav>
      <Button className={cn("rounded-lg bg-white text-xs text-black hover:bg-white/90", isCompact ? "h-7 px-3" : "h-8 px-4")}>
        Join waitlist
      </Button>
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
          className="rounded-md border border-violet-300/15 bg-violet-300/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-violet-100/85 shadow-[0_0_30px_rgba(139,92,246,0.18)]"
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
          <Button className="h-9 rounded-lg bg-white px-5 text-xs text-black hover:bg-white/90">
            Join waitlist
          </Button>
        </motion.div>
      </motion.div>

      <motion.div ref={previewRef} style={{ y }} className="relative mt-16 w-[min(980px,calc(100vw-32px))]">
        <DashboardMockup />
      </motion.div>
    </section>
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
          <FeatureCard key={card.title} card={card} delay={index * 0.08} />
        ))}
      </div>
    </Section>
  );
}

function FeatureCard({ card, delay }: { card: (typeof cards)[number]; delay: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Reveal delay={delay}>
      <motion.article
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="group relative min-h-[315px] overflow-hidden rounded-lg border border-white/8 bg-[#151515] shadow-[0_18px_60px_rgba(0,0,0,0.25)]"
      >
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/[0.04] to-transparent" />
        <FeatureVisual type={card.visual} isHovered={isHovered} />
        <motion.div className="absolute inset-x-0 bottom-0 border-t border-white/6 bg-[#151515]/92 p-5 backdrop-blur transition duration-500 group-hover:bg-[#181224]/94">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium transition duration-500 group-hover:-translate-y-1">
            <card.icon className="h-4 w-4 text-violet-300/85 transition duration-500 group-hover:scale-110" />
            {card.title}
          </div>
          <p className="max-w-sm text-[13px] leading-5 text-white/42 transition duration-500 group-hover:-translate-y-1 group-hover:text-white/58">{card.body}</p>
        </motion.div>
      </motion.article>
    </Reveal>
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
    <footer className="relative z-10 px-4 pb-14 pt-8">
      <div className="mx-auto flex max-w-[980px] flex-col gap-5 border-t border-white/8 pt-6 text-xs text-white/34 sm:flex-row sm:items-center sm:justify-between">
        <Logo compact />
        <a
          href="https://renzoreyn.dev"
          target="_blank"
          rel="noreferrer"
          className="transition hover:text-white"
        >
          mock-product by @Renzoreyn
        </a>
        <p>© 2026 Aurora.</p>
      </div>
    </footer>
  );
}

function DashboardMockup() {
  const [activePage, setActivePage] = useState<DashboardPage>("Quick Create");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut", delay: 0.35 }}
      className="relative mx-auto select-none overflow-hidden rounded-lg border border-white/14 bg-[#0f0f0f] p-1.5 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_30px_120px_rgba(0,0,0,0.72)]"
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
            {sidebarItems.map(([Icon, label]) => (
              <button
                key={String(label)}
                type="button"
                onClick={() => setActivePage(label)}
                className={cn(
                  "mb-1.5 flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[12px] text-white/48 transition hover:bg-white/[0.06] hover:text-white",
                  activePage === label && "bg-white text-black hover:bg-white hover:text-black",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {String(label)}
              </button>
            ))}
            <p className="mt-6 px-2 text-[10px] uppercase tracking-[0.16em] text-white/24">Sources</p>
            <button
              type="button"
              onClick={() => setActivePage("Projects")}
              className="mt-2 flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[12px] text-white/42 transition hover:bg-white/[0.06] hover:text-white"
            >
              <Database className="h-3.5 w-3.5" /> Data Library
            </button>
          </aside>
          <div className="p-4 sm:p-5">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-[12px] text-white/50">{activePage}</p>
              <div className="flex items-center gap-2 rounded-md bg-white/[0.04] px-2 py-1 text-[11px] text-white/36">
                Live <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_12px_rgba(196,181,253,0.9)]" />
              </div>
            </div>
            <DashboardPageContent activePage={activePage} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DashboardPageContent({ activePage }: { activePage: DashboardPage }) {
  if (activePage === "Quick Create") {
    return (
      <motion.div key="quick" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-3 lg:grid-cols-3">
        {["Creator launch", "Lead follow-up", "Content repurpose"].map((item, index) => (
          <div key={item} className="rounded-lg border border-white/7 bg-[#151515] p-4">
            <span className="rounded bg-violet-300/10 px-2 py-1 text-[10px] text-violet-100">Template {index + 1}</span>
            <h3 className="mt-16 text-lg font-medium tracking-[-0.04em]">{item}</h3>
            <p className="mt-2 text-[12px] leading-5 text-white/38">Start from a clean automation and edit the steps in minutes.</p>
          </div>
        ))}
        <div className="rounded-lg border border-white/7 bg-[#151515] p-4 lg:col-span-3">
          <div className="grid gap-3 md:grid-cols-3">
            {["Choose trigger", "Add logic", "Publish flow"].map((step, index) => (
              <div key={step} className="flex items-center gap-3 rounded-md bg-black/24 p-3 text-[12px] text-white/54">
                <span className="grid h-6 w-6 place-items-center rounded bg-violet-300/12 text-violet-100">{index + 1}</span>
                {step}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  if (activePage === "Lifecycle") {
    return (
      <motion.div key="lifecycle" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-3 md:grid-cols-3">
        {[
          ["New", "Waitlist signup", "Product view"],
          ["Warm", "Opened email", "Clicked checkout"],
          ["Ready", "Send offer", "Create follow-up"],
        ].map(([title, one, two]) => (
          <div key={title} className="min-h-72 rounded-lg border border-white/7 bg-[#151515] p-4">
            <p className="mb-5 text-[12px] text-white/46">{title}</p>
            {[one, two].map((item, index) => (
              <div key={item} className="mb-3 rounded-md bg-black/28 p-3 text-[12px] text-white/54">
                <span className="mb-3 block h-1.5 w-10 rounded-full bg-violet-300/70" />
                {item}
                <p className="mt-1 text-[10px] text-white/28">{index === 0 ? "Automated" : "Needs review"}</p>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    );
  }

  if (activePage === "Analytics") {
    return (
      <motion.div key="analytics" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-3 lg:grid-cols-[1fr_0.62fr]">
        <ChartPanel title="Run volume" />
        <div className="rounded-lg border border-white/7 bg-[#151515] p-4">
          <p className="mb-5 text-[12px] text-white/62">Top workflows</p>
          {["Launch follow-up", "Sponsor CRM", "Customer welcome", "Weekly digest"].map((item, index) => (
            <div key={item} className="mb-3 flex items-center justify-between rounded-md bg-black/26 p-3 text-[12px] text-white/52">
              <span>{item}</span>
              <span className="text-violet-200/80">{92 - index * 11}%</span>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (activePage === "Projects") {
    return (
      <motion.div key="projects" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-3 md:grid-cols-2">
        {["Template store", "Newsletter launch", "Creator CRM", "Support inbox"].map((item) => (
          <div key={item} className="rounded-lg border border-white/7 bg-[#151515] p-4">
            <FileText className="h-4 w-4 text-violet-200/80" />
            <h3 className="mt-10 text-lg font-medium tracking-[-0.04em]">{item}</h3>
            <p className="mt-2 text-[12px] text-white/36">4 workflows · 12 tasks · updated today</p>
          </div>
        ))}
      </motion.div>
    );
  }

  if (activePage === "Team") {
    return (
      <motion.div key="team" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border border-white/7 bg-[#151515] p-4">
        {["Mia edits content flows", "Ren handles launch ops", "Jay watches analytics", "Noor reviews customers"].map((item, index) => (
          <div key={item} className="mb-3 flex items-center gap-3 rounded-md bg-black/26 p-3 text-[12px] text-white/54">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-violet-300/12 text-violet-100">{item[0]}</span>
            <div>
              <p>{item}</p>
              <p className="mt-1 text-[10px] text-white/28">{index + 2} active workflows</p>
            </div>
          </div>
        ))}
      </motion.div>
    );
  }

  return <DashboardOverview />;
}

function DashboardOverview() {
  return (
    <motion.div key="dashboard" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
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
              <span className="rounded bg-violet-300/10 px-1.5 py-0.5 text-violet-100/80">{change}</span>
            </div>
            <p className="mt-5 text-2xl font-medium tracking-[-0.04em]">{value}</p>
            <p className="mt-2 text-[11px] text-white/30">Trending up this month</p>
          </div>
        ))}
      </div>
      <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_0.62fr]">
        <ChartPanel title="Workflow volume" />
        <div className="rounded-lg border border-white/7 bg-[#151515] p-4">
          <p className="mb-5 text-[12px] text-white/62">Automation queue</p>
          {["Send onboarding", "Tag hot leads", "Draft launch recap"].map((item, index) => (
            <div key={item} className="mb-3 flex items-center gap-3 rounded-md bg-black/26 p-3 text-[12px] text-white/52">
              <span className="grid h-5 w-5 place-items-center rounded bg-violet-300/12 text-violet-100">{index + 1}</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ChartPanel({ title }: { title: string }) {
  return (
    <div className="rounded-lg border border-white/7 bg-[#151515] p-4">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-[12px] text-white/62">{title}</p>
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
            className={cn("flex-1 rounded-t bg-white/20", index < 11 && "bg-gradient-to-t from-violet-900 to-violet-300")}
          />
        ))}
      </div>
    </div>
  );
}

function FeatureVisual({ type, isHovered = false }: { type: string; isHovered?: boolean }) {
  if (type === "orbit") {
    return (
      <div className="absolute inset-x-0 top-0 flex h-52 items-center justify-center overflow-hidden">
        {[180, 144, 108, 72].map((size) => (
          <div key={size} className="absolute rounded-full border border-white/7" style={{ height: size, width: size }} />
        ))}
        <OrbitDot className="bg-fuchsia-200 shadow-[0_0_20px_rgba(245,208,254,0.72)]" angle={252} duration={18} isHovered={isHovered} radius={90} size={16} />
        <OrbitDot className="bg-violet-300 shadow-[0_0_20px_rgba(196,181,253,0.75)]" angle={112} duration={14} isHovered={isHovered} radius={72} size={14} />
        <OrbitDot className="bg-purple-300 shadow-[0_0_16px_rgba(216,180,254,0.66)]" angle={18} duration={11} isHovered={isHovered} radius={54} size={11} />
        <OrbitDot className="bg-violet-200/90" angle={138} duration={9} isHovered={isHovered} radius={36} size={8} />
        <div className="z-10 grid h-12 w-12 place-items-center rounded-full bg-[#0b0b0b] ring-1 ring-white/10 transition duration-500 group-hover:scale-105">
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
            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }} className="rounded bg-violet-500/70 p-2 text-[10px] leading-3 text-violet-50 transition duration-500 group-hover:-translate-y-1">
              Ship email
              <br />
              9:00 AM
            </motion.div>
          </div>
          <div className="space-y-1.5 rounded-md bg-black/35 p-2">
            <div className="mt-12 rounded bg-violet-500/60 p-2 text-[10px] leading-3 text-violet-50 transition duration-500 group-hover:-translate-y-1">
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
              className={cn("w-1 rounded bg-white/24 transition duration-500 group-hover:brightness-125", index < 17 && "bg-violet-400/80")}
            />
          ))}
        </div>
        <span className="mt-3 inline-flex rounded bg-violet-300/12 px-2 py-1 text-[10px] text-violet-100 transition duration-500 group-hover:translate-x-1">Live trend</span>
      </div>
    </div>
  );
}

function OrbitDot({
  angle,
  duration,
  isHovered,
  radius,
  size,
  className,
}: {
  angle: number;
  duration: number;
  isHovered: boolean;
  radius: number;
  size: number;
  className?: string;
}) {
  return (
    <motion.span
      className="absolute left-1/2 top-1/2"
      animate={{ rotate: isHovered ? [0, 360] : [angle, angle + 360] }}
      transition={{ duration: isHovered ? 7 : duration, repeat: Infinity, ease: "linear" }}
    >
      <motion.span
        className={cn("absolute rounded-full", className)}
        animate={{
          x: 0,
          y: -radius,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
        }}
      />
    </motion.span>
  );
}

function HeroAurora() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[690px] overflow-hidden">
      <motion.svg
        viewBox="0 0 1600 620"
        preserveAspectRatio="none"
        className="absolute left-1/2 top-[-210px] h-[620px] w-[150vw] min-w-[1500px] -translate-x-1/2 opacity-90"
        animate={{ x: ["-5%", "4%", "-3%", "6%", "-5%"], y: ["-4%", "3%", "-2%", "5%", "-4%"], scaleX: [1, 1.08, 0.98, 1.04, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="aurora-wave" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(76,29,149,0)" />
            <stop offset="18%" stopColor="rgba(109,40,217,0.6)" />
            <stop offset="50%" stopColor="rgba(192,132,252,0.96)" />
            <stop offset="82%" stopColor="rgba(124,58,237,0.64)" />
            <stop offset="100%" stopColor="rgba(76,29,149,0)" />
          </linearGradient>
          <filter id="wave-blur" x="-20%" y="-60%" width="140%" height="220%">
            <feGaussianBlur stdDeviation="34" />
          </filter>
        </defs>
        <motion.path
          d="M-120 285 C 180 145 390 105 650 190 C 910 275 1120 245 1390 105 C 1530 32 1665 54 1730 88"
          animate={{
            d: [
              "M-120 285 C 180 145 390 105 650 190 C 910 275 1120 245 1390 105 C 1530 32 1665 54 1730 88",
              "M-120 245 C 170 88 410 170 650 118 C 910 62 1110 290 1390 155 C 1540 82 1660 16 1730 64",
              "M-120 285 C 180 145 390 105 650 190 C 910 275 1120 245 1390 105 C 1530 32 1665 54 1730 88",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          fill="none"
          stroke="url(#aurora-wave)"
          strokeWidth="260"
          strokeLinecap="round"
          filter="url(#wave-blur)"
        />
        <motion.path
          d="M-80 330 C 260 210 420 260 690 205 C 960 150 1100 190 1350 270 C 1510 322 1640 230 1710 172"
          animate={{
            d: [
              "M-80 330 C 260 210 420 260 690 205 C 960 150 1100 190 1350 270 C 1510 322 1640 230 1710 172",
              "M-80 285 C 240 350 430 170 700 250 C 940 322 1135 112 1360 215 C 1510 284 1620 310 1710 206",
              "M-80 330 C 260 210 420 260 690 205 C 960 150 1100 190 1350 270 C 1510 322 1640 230 1710 172",
            ],
          }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          fill="none"
          stroke="rgba(88,28,135,0.55)"
          strokeWidth="170"
          strokeLinecap="round"
          filter="url(#wave-blur)"
        />
      </motion.svg>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030403]/35 to-[#030403]" />
    </div>
  );
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#" className="flex items-center gap-2 text-white">
      <Image
        width={24}
        height={24}
        src="/aurora-logo.png"
        alt=""
        aria-hidden="true"
        className={cn("object-contain", compact ? "h-5 w-5" : "h-6 w-6")}
      />
      <span className={cn("font-display font-medium tracking-[-0.04em]", compact ? "text-sm" : "text-base")}>Aurora</span>
    </a>
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
