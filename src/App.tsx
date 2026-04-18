/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Star, Users, Moon, Sun, Menu, Search, User, ArrowUp, Mouse, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const GridLines = () => (
  <div className="absolute inset-0 pointer-events-none z-0">
    <div className="absolute inset-0 border-x border-current opacity-10 mx-6 md:mx-12" />
    <div className="absolute inset-0 border-y border-current opacity-10 my-6 md:my-12" />
    {/* Additional Grid Subdivisions for Brutalist feel */}
    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-current opacity-5" />
    <div className="absolute top-1/2 left-0 right-0 h-px bg-current opacity-5" />
  </div>
);

const PopInText = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);



const ARCHIVE_DATA = [
  {
    firm: "LATHAM & WATKINS",
    role: "Corporate / M&A Simulation",
    focus: "Transaction kick-off, customer agreement review, shareholder advisory, deal negotiation.",
    code: "VERIFIED: LW-MA-2024"
  },
  {
    firm: "HERBERT SMITH FREEHILLS",
    role: "Cross-border M&A",
    focus: "Cross-border M&A, foreign counsel engagement, corporate due diligence, SPA mark-up.",
    code: "VERIFIED: HSF-MA-2025"
  },
  {
    firm: "ASHURST",
    role: "Finance & M&A",
    focus: "Board minutes amendment, facility agreement review, security registration, M&A execution.",
    code: "VERIFIED: AS-FM-2024"
  },
  {
    firm: "GOODWIN",
    role: "Private Equity M&A",
    focus: "Due diligence analysis, deal structuring, closing checklist management, negotiation simulation.",
    code: "VERIFIED: GW-PE-2024"
  },
  {
    firm: "GOLDMAN SACHS",
    role: "Risk Management",
    focus: "Risk framework analysis, client profile evaluation, real estate investment risk assessment.",
    code: "VERIFIED: GS-RM-2025"
  },
  {
    firm: "KING & WOOD MALLESONS",
    role: "Advanced Commercial Law",
    focus: "Multi-jurisdictional transactional work (US, Australia, Hong Kong), cross-border disputes, business development.",
    code: "VERIFIED: KWM-CL-2025"
  },
  {
    firm: "MORRISON FOERSTER",
    role: "IP & Commercial Law",
    focus: "Trade secrets advisory, senior executive counseling on IP protection.",
    code: "VERIFIED: MOFO-IP-2025"
  },
  {
    firm: "WHITE & CASE",
    role: "M&A Strategy & Analysis",
    focus: "Due diligence analysis, acquisition strategy development.",
    code: "VERIFIED: WC-MA-2025"
  }
];


const ArchiveSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Split ARCHIVE_DATA into sets of 2
  const cardSets = [];
  for (let i = 0; i < ARCHIVE_DATA.length; i += 2) {
    cardSets.push(ARCHIVE_DATA.slice(i, i + 2));
  }

  useGSAP(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 992px) and (min-height: 720px)", () => {
      const sets = Array.from(containerRef.current!.querySelectorAll('.archive-set')) as HTMLElement[];
      if (sets.length === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=600%",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1
        }
      });

      // Initial state setup
      gsap.set(sets, { opacity: 0, pointerEvents: "none" });
      gsap.set(sets[0], { opacity: 1, pointerEvents: "auto" });

      // Animate between sets
      sets.forEach((set, i) => {
        if (i === 0) return;

        const prevSet = sets[i - 1];
        const prevCards = prevSet.querySelectorAll<HTMLElement>('.archive-card');
        const currentCards = set.querySelectorAll<HTMLElement>('.archive-card');
        const stars = sectionRef.current!.querySelectorAll<HTMLElement>('.archive-star');

        const startTime = i * 2;

        // 1. Cinematic Exit (Split Lateral)
        const prevLeft = prevCards[0];
        const prevRight = prevCards[1];

        if (prevLeft) tl.to(prevLeft, { x: -100, opacity: 0, filter: "blur(15px)", scale: 0.95, duration: 1.5, ease: "expo.inOut" }, startTime);
        if (prevRight) tl.to(prevRight, { x: 100, opacity: 0, filter: "blur(15px)", scale: 0.95, duration: 1.5, ease: "expo.inOut" }, startTime);

        tl.to(prevSet, {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.2
        }, startTime + 1.2);

        // 2. Parallax Kinetic Background
        if (stars.length > 0) {
          tl.to(Array.from(stars), {
            rotate: (i * 120),
            y: (i * -30),
            duration: 3,
            ease: "power2.inOut"
          }, startTime);
        }

        // 3. Transition IN current set container
        tl.to(set, {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.2
        }, startTime + 1.0);

        // 4. Wide-Angle Lateral Entry
        const currLeft = currentCards[0];
        const currRight = currentCards[1];

        if (currLeft) {
          tl.fromTo(currLeft,
            { opacity: 0, x: -120, filter: "blur(20px)", scale: 0.9 },
            { opacity: 1, x: 0, filter: "blur(0px)", scale: 1, duration: 2, ease: "expo.out" },
            startTime + 1.2
          );
        }
        if (currRight) {
          tl.fromTo(currRight,
            { opacity: 0, x: 120, filter: "blur(20px)", scale: 0.9 },
            { opacity: 1, x: 0, filter: "blur(0px)", scale: 1, duration: 2, ease: "expo.out" },
            startTime + 1.2
          );
        }
      });
    });

    // For tablets/mobiles and short-height screens: show all cards in normal stacked flow.
    mm.add("(max-width: 991px), (max-height: 719px)", () => {
      const sets = Array.from(containerRef.current!.querySelectorAll('.archive-set')) as HTMLElement[];
      const cards = Array.from(containerRef.current!.querySelectorAll('.archive-card')) as HTMLElement[];
      gsap.set(sets, { clearProps: "all" });
      gsap.set(cards, { clearProps: "all" });
    });

    return () => mm.revert();

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="archive" className="desktop-tight-section relative z-[10] bg-parchment dark:bg-obsidian w-full min-h-screen lg:min-h-[100svh] overflow-visible lg:overflow-hidden mt-0">
      <GridLines />
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 py-14 md:py-16 flex flex-col lg:h-full">
        {/* Header stays pinned via section pin */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between sm:items-end mb-10 md:mb-16 border-b border-current pb-4 shrink-0">
          <h2 className="font-fraunces font-black text-4xl md:text-6xl tracking-tighter uppercase">Job Simulations</h2>
          <div className="flex items-center gap-3 mb-1">
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="opacity-60"
            >
              <Mouse size={16} strokeWidth={2.5} />
            </motion.div>
            <span className="hidden lg:inline font-mono text-[11px] font-bold uppercase tracking-[0.2em] opacity-80">
              KEEP SCROLLING CONTINUOUSLY
            </span>
          </div>
        </div>

        <div ref={containerRef} className="w-full relative min-h-0 flex flex-col gap-6 lg:flex-1 lg:block">
          {cardSets.map((set, setIdx) => (
            <div 
              key={setIdx} 
              className={`archive-set relative lg:absolute lg:inset-0 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start justify-items-center w-full ${setIdx > 0 ? "lg:opacity-0 lg:pointer-events-none" : ""}`}
            >
              {set.map((item, i) => {
                const globalIdx = (setIdx * 2) + i;
                return (
                  <div
                    key={i}
                    className="archive-card group relative border border-current p-6 md:p-10 w-full max-w-2xl min-h-[280px] md:min-h-[360px] flex flex-col bg-parchment dark:bg-obsidian shadow-[15px_15px_0px_rgba(0,0,0,0.03)] dark:shadow-[15px_15px_0px_rgba(255,255,255,0.01)] transition-colors duration-500 hover:bg-current"
                  >
                    <div className="relative z-10 min-h-[120px] md:min-h-[140px]">
                      <div className="flex justify-between items-start mb-6">
                        <span className="font-mono text-[12px] md:text-[14px] opacity-30 group-hover:text-parchment dark:group-hover:text-obsidian transition-colors font-bold">0{globalIdx + 1}</span>
                        <div className="font-mono text-[9px] md:text-[10px] tracking-widest text-parchment dark:text-obsidian bg-obsidian dark:bg-parchment px-3 py-1 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                          {item.code}
                        </div>
                      </div>

                      <h3 className="font-mono font-bold text-[24px] md:text-[28px] leading-tight mb-3 group-hover:text-parchment dark:group-hover:text-obsidian transition-colors">
                        {item.firm}
                      </h3>
                      <p className="font-mono text-[12px] md:text-[14px] tracking-[0.2em] opacity-60 group-hover:text-parchment dark:group-hover:text-obsidian transition-colors uppercase font-medium">
                        {item.role}
                      </p>
                    </div>

                    <div className="relative z-10 mt-6 border-t border-current/10 pt-8">
                      <div className="font-mono text-[18px] md:text-[20px] font-black uppercase tracking-[0.05em] mb-3 opacity-100 group-hover:text-parchment dark:group-hover:text-obsidian transition-colors flex items-center gap-4">
                        <div className="w-8 h-[2px] bg-current opacity-20 group-hover:bg-parchment" />
                        FOCUS
                      </div>
                      <p className="font-sans text-[18px] md:text-[20px] leading-[1.3] uppercase tracking-tighter group-hover:text-parchment dark:group-hover:text-obsidian transition-colors opacity-90 font-medium whitespace-pre-wrap">
                        {item.focus}
                      </p>
                    </div>

                    {/* Industrial Texture Reveal */}
                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none">
                      <Star className="archive-star w-24 h-24 rotate-12" />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const NoiseOverlay = () => (
  <div 
    className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] dark:opacity-[0.05]"
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
  />
);

const ScrollWord = ({ word, progress, range }: { word: string; progress: any; range: [number, number]; key?: React.Key }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const blur = useTransform(progress, range, [10, 0]);
  const y = useTransform(progress, range, [20, 0]);

  return (
    <motion.span
      style={{ opacity, filter: `blur(${blur}px)`, y }}
      className="inline-block mb-1"
    >
      {word}
    </motion.span>
  );
};

const AnimatedScrollText = ({ text, progress, startIndex, totalWords }: { text: string; progress: any; startIndex: number; totalWords: number }) => {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => {
        const globalIndex = startIndex + i;
        const start = globalIndex / totalWords;
        const end = (globalIndex + 1) / totalWords;
        return (
          <React.Fragment key={i}>
            <ScrollWord word={word} progress={progress} range={[start, end]} />
            {" "}
          </React.Fragment>
        );
      })}
    </>
  );
};

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "center 25%"]
  });
  


  return (
    <section ref={sectionRef} id="about" className="desktop-tight-section relative w-full py-14 md:py-20 border-t border-current/20 overflow-hidden">
      <NoiseOverlay />
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col md:flex-row gap-10 md:gap-16 relative z-10 w-full h-full items-center">
        
        {/* Left Column: Text Content (60%) */}
        <div className="w-full md:w-[60%] flex flex-col">
          {/* Subtle Label & Divider */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">ABOUT</span>
            <div className="h-px flex-1 bg-current opacity-20" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-fraunces text-4xl md:text-6xl font-bold tracking-tight mb-8 uppercase"
          >
            About
          </motion.h2>

          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="h-px w-full bg-current opacity-10 mb-8 origin-left" 
          />

          <div className="flex flex-col gap-5 md:gap-7 font-hanken text-lg md:text-xl leading-[1.7] opacity-90 max-w-2xl font-medium text-justify [text-justify:inter-word]">
            {(() => {
              const text1 = "Rooted in Pune’s academic heritage and currently advancing my scholarship at Lovely Professional University, I operate at the intersection of rigorous legal mechanics and restorative justice.";
              const text2 = "Trained in the chambers of the Bombay High Court, I deconstructed high-stakes project finance and property frameworks—not merely to enforce compliance, but to engineer structured pathways for institutional and individual restitution.";
              const text3 = "I approach both legal practice and academic research with relentless intellectual endurance. From analyzing complex financial meltdowns to navigating cross-border dispute simulations, my objective remains singular: securing freedom through strategic discipline.";
              const words1 = text1.split(" ").length;
              const words2 = text2.split(" ").length;
              const totalWords = words1 + words2 + text3.split(" ").length;
              
              return (
                <>
                  <p><AnimatedScrollText text={text1} progress={scrollYProgress} startIndex={0} totalWords={totalWords} /></p>
                  <p><AnimatedScrollText text={text2} progress={scrollYProgress} startIndex={words1} totalWords={totalWords} /></p>
                  <p><AnimatedScrollText text={text3} progress={scrollYProgress} startIndex={words1 + words2} totalWords={totalWords} /></p>
                </>
              );
            })()}
          </div>
        </div>

        {/* Right Column: Profile Image (40%) */}
        <div className="w-full md:w-[40%] flex justify-center items-center relative py-12 md:py-0">
          <div className="relative w-full max-w-sm">
            <div className="w-full aspect-[3/4] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl shadow-black/10 dark:shadow-white/5 border border-current/10 bg-current/5">
              <img 
                src="/gallery/moot_court.jpg" 
                alt="Ayush Kathane Portrait"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const CapabilitiesSection = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="capabilities" className="desktop-tight-section w-full py-16 md:py-24 border-t border-current overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12">
        
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 pb-8 border-b border-current relative">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-40">CAPABILITIES_MATRIX.EXE</span>
            <h2 className="font-fraunces text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-none">
              Legal Matrix
            </h2>
          </div>
          <div className="max-w-xs text-right mt-6 md:mt-0">
             <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest opacity-60 leading-relaxed">
               A structured intersection of law, finance, and cross-border execution logic.
             </p>
          </div>
        </div>

        {/* 2x2 Grid with visible borders */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="grid grid-cols-1 md:grid-cols-2 border-l border-t border-current"
        >
          
          {/* Block 1: M&A */}
          <motion.div variants={itemVariants} className="group border-r border-b border-current p-8 md:p-12 hover:bg-current/[0.02] transition-colors relative overflow-hidden">
            <div className="absolute top-4 right-6 font-mono text-[10px] opacity-20 z-10">01</div>
            
            <h3 className="font-mono text-[20px] font-black uppercase tracking-[0.25em] mb-10 pb-4 border-b border-current/10 inline-block relative z-10">M&A & Transactional</h3>
            <ul className="flex flex-col gap-5 font-hanken text-[18px] leading-relaxed opacity-80">
              <li>Due Diligence & Deal Structuring</li>
              <li>Share Purchase Agreement (SPA) Mark-up & Review</li>
              <li>M&A Transaction Lifecycle — Kick-off to Closing</li>
              <li>Acquisition Strategy & Deal Negotiation</li>
              <li>Board Minutes & Corporate Governance Documentation</li>
              <li>Facility Agreement Review & Security Registration</li>
              <li className="mt-4 pt-4 border-t border-current/10 font-mono text-[11px] font-bold opacity-100 tracking-tighter uppercase">
                Firms: LW • HSF • ASHURST • GOODWIN
              </li>
            </ul>
          </motion.div>

          {/* Block 2: Corporate Law */}
          <motion.div variants={itemVariants} className="group border-r border-b border-current p-8 md:p-12 hover:bg-current/[0.02] transition-colors relative overflow-hidden">
            <div className="absolute top-4 right-6 font-mono text-[10px] opacity-20">02</div>
            <h3 className="font-mono text-[20px] font-black uppercase tracking-[0.25em] mb-10 pb-4 border-b border-current/10 inline-block">Corporate & Commercial</h3>
            <ul className="flex flex-col gap-5 font-hanken text-[18px] leading-relaxed opacity-80">
              <li>Cross-border Transactions & Multi-jurisdictional Compliance</li>
              <li>Private Equity Deal Execution</li>
              <li>Risk Assessment & Client Profile Evaluation</li>
              <li>Trade Secrets & IP Litigation Advisory</li>
              <li>Commercial Dispute Resolution (ADR, Arbitration)</li>
              <li>Legal Compliance for Startups & Incorporation</li>
              <li className="mt-4 pt-4 border-t border-current/10 font-mono text-[11px] font-bold opacity-100 tracking-tighter uppercase">
                Firms: KWM • WHITE & CASE • GS • MOFO
              </li>
            </ul>
          </motion.div>

          {/* Block 3: Litigation */}
          <motion.div variants={itemVariants} className="group border-r border-b border-current p-8 md:p-12 hover:bg-current/[0.02] transition-colors relative overflow-hidden">
            <div className="absolute top-4 right-6 font-mono text-[10px] opacity-20">03</div>
            <h3 className="font-mono text-[20px] font-black uppercase tracking-[0.25em] mb-10 pb-4 border-b border-current/10 inline-block">Litigation & Drafting</h3>
            <ul className="flex flex-col gap-5 font-hanken text-[18px] leading-relaxed opacity-80">
              <li>Legal Drafting: Contracts, Notices, Affidavits, Petitions</li>
              <li>Property Documentation Review & Verification</li>
              <li>APF File Preparation for Banking Institutions</li>
              <li>Legal Research (SCC Online, Manupatra)</li>
              <li>Case Briefing, Analysis & Legal Writing</li>
              <li>Court Proceedings & Judicial Reasoning Observation</li>
              <li className="mt-4 pt-4 border-t border-current/10 font-mono text-[11px] font-bold opacity-100 tracking-tighter uppercase">
                BOMBAY HIGH COURT — 2 INTERNSHIP TERMS
              </li>
            </ul>
          </motion.div>

          {/* Block 4: Credentials */}
          <motion.div variants={itemVariants} className="group border-r border-b border-current p-8 md:p-12 hover:bg-current/[0.02] transition-colors relative overflow-hidden">
            <div className="absolute top-4 right-6 font-mono text-[10px] opacity-20">04</div>
            <h3 className="font-mono text-[20px] font-black uppercase tracking-[0.25em] mb-10 pb-4 border-b border-current/10 inline-block">Credentials & Tools</h3>
            <div className="flex flex-col gap-8 font-hanken text-[18px] leading-relaxed opacity-80">
               <div>
                 <span className="font-bold block mb-1">IP LAW SPECIALIZATION</span>
                 <p className="text-[13px] opacity-70 italic font-mono uppercase tracking-wider">WIPO ACADEMY (DL-001 & DL-101)</p>
               </div>
               <div>
                  <span className="font-bold block mb-1">SDG-ALIGNED BUDGETING</span>
                  <p className="text-[13px] opacity-70 font-mono uppercase tracking-wider">UNITAR & UNDP CERTIFIED</p>
               </div>
               <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-[12px] font-bold tracking-tight uppercase opacity-60 font-mono">
                  <span>AI FOR LEGAL RESEARCH</span>
                  <span>VERSION CONTROL</span>
                  <span>MS OFFICE EXPERT</span>
                  <span>IP ADVISORY</span>
               </div>
            </div>
          </motion.div>

        </motion.div>

        {/* Footer Meta Data */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 md:mt-16 flex flex-col md:flex-row justify-between font-mono text-[9px] md:text-[10px] uppercase tracking-widest opacity-40"
        >
          <div>EN | HI | MH — LANGUAGES</div>
          <div>ANALYTICAL THINKING • STRUCTURED PROBLEM SOLVING</div>
        </motion.div>
      </div>
    </section>
  );
};

const INTERNSHIPS_DATA = [
  {
    title: "Judicial Internship – High Court of Bombay",
    subtitle: "Adv. Santosh Ralegankar | June 2024 & June 2025 (Multiple Terms)",
    points: [
      "Exposure to property papers and legal documentation",
      "APF (Approved Project Finance) file preparation for banks",
      "Legal drafting and structured documentation experience",
      "Observed court proceedings and judicial workflow",
      "Exposure to judgment writing and magistrate-level processes",
      "Understanding of judicial reasoning and case handling"
    ],
    image: "/gallery/certificate.jpg"
  }
];

const InternshipsSection = () => {
  return (
    <section id="internships" className="desktop-tight-section relative w-full border-t border-current/20 bg-parchment text-obsidian dark:bg-obsidian dark:text-parchment flex flex-col py-24 md:py-32">
      
      {/* Static Editorial Heading */}
      <div className="internships-header w-full mb-16 md:mb-24">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col">
          
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">INTERNSHIPS</span>
            <div className="h-px flex-1 bg-current opacity-20" />
          </div>

          <h2 className="font-fraunces text-5xl md:text-7xl font-bold tracking-tight">
            Internships
          </h2>
        </div>
      </div>

      {/* Standard Vertical Stack */}
      <div className="internships-stack w-full flex flex-col gap-24 md:gap-32">
        {INTERNSHIPS_DATA.map((slide, index) => (
          <div key={index} className="w-full flex items-center justify-center">
            <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 w-full flex flex-col md:flex-row items-center">
              
              {/* Left Side: Content */}
              <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-8 pr-0 md:pr-16 lg:pr-24">
                <div className="flex flex-col gap-2">
                  <h2 className="font-fraunces text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] capitalize">
                    {slide.title}
                  </h2>
                  <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest opacity-60 mt-4 md:mt-6 border-l pl-4 border-current">
                    {slide.subtitle}
                  </p>
                </div>
                
                <ul className="flex flex-col gap-4 font-sans text-base md:text-lg opacity-80 leading-relaxed list-none pl-0">
                  {slide.points.map((point, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="font-mono text-xs opacity-40 mt-1">0{i+1}</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Side: Static Certificate Image */}
              <div className="w-full md:w-1/2 flex justify-center items-center mt-12 md:mt-0">
                <div className="relative w-full max-w-3xl aspect-square md:aspect-[4/3] bg-current/5 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(255,255,255,0.03)] border border-current/10 p-2">
                   <div className="w-full h-full overflow-hidden bg-current/5">
                     <img 
                        src={slide.image} 
                        alt={`Certificate - ${slide.title}`} 
                        className="w-full h-full object-cover object-[70%_center]" 
                        referrerPolicy="no-referrer"
                     />
                   </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const JOB_SIMULATIONS_DATA = [
  {
    company: "Latham & Watkins",
    role: "Corporate / M&A Simulation",
    points: [
      "Transaction Kick-off Scenario Analysis",
      "Customer Agreement & SPA Review",
      "Shareholder Advisory & Corporate Governance",
      "Term Sheet & Deal Negotiation Strategy"
    ],
    verified: "LW-MA-2025",
    logo: "https://logo.clearbit.com/lw.com"
  },
  {
    company: "Herbert Smith Freehills",
    role: "Cross-Border M&A",
    points: [
      "Cross-Border M&A Transaction Flow",
      "Foreign Counsel Engagement Logic",
      "Corporate Due Diligence Protocols",
      "SPA Mark-up & Condition Precedents"
    ],
    verified: "HSF-MA-2025",
    logo: "https://logo.clearbit.com/herbertsmithfreehills.com"
  },
  {
    company: "Ashurst",
    role: "Finance & M&A",
    points: [
      "Board Minutes Amendment & Regulatory Compliance",
      "Facility Agreement Review & Debt Structuring",
      "Security Registration & Collateral Analysis",
      "M&A Completion & Execution Management"
    ],
    verified: "AS-FM-2024",
    logo: "https://logo.clearbit.com/ashurst.com"
  },
  {
    company: "Goodwin",
    role: "Private Equity M&A",
    points: [
      "Secondary Buyout Due Diligence Analysis",
      "PE-Specific Deal Structuring Frameworks",
      "Closing Checklist & Transaction Management",
      "Private Equity Negotiation Simulation"
    ],
    verified: "GW-PE-2024",
    logo: "https://logo.clearbit.com/goodwinlaw.com"
  },
  {
    company: "Goldman Sachs",
    role: "Risk Management",
    points: [
      "Enterprise Risk Framework Analysis",
      "Complex Client Profile Evaluation",
      "Real Estate Investment Risk Assessment",
      "Market Volatility Mitigation Logic"
    ],
    verified: "GS-RM-2025",
    logo: "https://logo.clearbit.com/goldmansachs.com"
  },
  {
    company: "King & Wood Mallesons",
    role: "Advanced Commercial Law",
    points: [
      "Multi-Jurisdictional Transactional Work (US/UK/AU)",
      "Cross-Border Dispute Mitigation Strategy",
      "Business Development for Global Law Firms",
      "International Commercial Compliance"
    ],
    verified: "KWM-CL-2025",
    logo: "https://logo.clearbit.com/kwm.com"
  },
  {
    company: "Morrison Foerster",
    role: "IP & Commercial Law",
    points: [
      "Trade Secrets Protection Advisory",
      "Senior Executive Counseling on IP Portfolio",
      "Strategic IP Asset Management",
      "Licensing & Technology Agreement Logic"
    ],
    verified: "MOFO-IP-2025",
    logo: "https://logo.clearbit.com/mofo.com"
  },
  {
    company: "White & Case",
    role: "M&A Strategy & Analysis",
    points: [
      "Due Diligence Analysis for Global Mandates",
      "Acquisition Strategy Lifecycle Development",
      "Market Entry Legal Risk Assessment",
      "Post-Merger Integration Frameworks"
    ],
    verified: "WC-MA-2025",
    logo: "https://logo.clearbit.com/whitecase.com"
  }
];

const JobSimulationsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let ctx = gsap.matchMedia();

    // Desktop: Pinned, scroll-driven storytelling
    ctx.add("(min-width: 992px)", () => {
      if (!sectionRef.current) return;
      
      const slides = slidesRef.current.filter(Boolean);
      if (slides.length === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=700%",
          scrub: 1, // Smooth easing (ease-in-out feeling with scrub)
          pin: true,
          anticipatePin: 1
        }
      });

      // Progress line animation
      if (progressRef.current) {
        tl.to(progressRef.current, { scaleY: 1, ease: "none" }, 0);
      }

      // Initial state hides slides and child elements correctly
      gsap.set(slides.slice(1), { opacity: 0, pointerEvents: "none" });

      slides.forEach((slide, i) => {
        if (i === 0) return;
        
        const prevSlide = slides[i - 1];
        const num = slide.querySelector('.slide-num');
        const leftContent = slide.querySelector('.slide-left');
        const rightLogo = slide.querySelector('.slide-right');
        
        // Hide children of next slides specifically for staggered reveal
        gsap.set(num, { opacity: 0, y: 30 });
        gsap.set(leftContent, { opacity: 0, y: 50 });
        gsap.set(rightLogo, { opacity: 0, scale: 0.8 });

        const startTime = (i - 1) * 2;
        
        // Smooth fade out of previous slide
        tl.to(prevSlide, { 
          opacity: 0, 
          y: -20, 
          duration: 1, 
          ease: "power2.inOut" 
        }, startTime);

        // Current slide container becomes visible instantly, ready for children to animate
        tl.to(slide, { 
          opacity: 1, 
          pointerEvents: "auto", 
          duration: 0.01 
        }, startTime + 0.5);

        // Sequence children animations with slight delays
        tl.to(num, { 
          opacity: 0.03, y: 0, duration: 1, ease: "power2.out" 
        }, startTime + 0.5);
        
        tl.to(leftContent, { 
          opacity: 1, y: 0, duration: 1, ease: "power2.out" 
        }, startTime + 0.7);
        
        tl.to(rightLogo, { 
          opacity: 1, scale: 1, duration: 1, ease: "back.out(1.2)" 
        }, startTime + 0.9);
      });
    });

    // Mobile: Vertical stack with subtle fade up
    ctx.add("(max-width: 991px)", () => {
      const slides = slidesRef.current.filter(Boolean);
      slides.forEach(slide => {
        gsap.fromTo(slide, 
          { opacity: 0, y: 40 },
          { 
            opacity: 1, y: 0, 
            duration: 0.8, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: slide,
              start: "top 85%"
            }
          }
        );
      });
    });

    return () => {
      // Clear properties on unmount/revert to prevent layout breaks
      gsap.set(slidesRef.current.filter(Boolean), { clearProps: "all" });
      const components = sectionRef.current?.querySelectorAll('.slide-num, .slide-left, .slide-right');
      if (components && components.length > 0) {
        gsap.set(Array.from(components), { clearProps: "all" });
      }
    };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="job-simulations" className="desktop-tight-section relative w-full overflow-hidden border-t border-current/20 bg-parchment text-obsidian dark:bg-obsidian dark:text-parchment flex flex-col lg:min-h-[100svh] pt-16 md:pt-24 pb-10">
      
      {/* Subtle Progress Indicator */}
      <div className="hidden md:block absolute right-8 lg:right-12 top-1/2 -translate-y-1/2 w-px h-[30%] bg-current/20 z-50">
        <div ref={progressRef} className="w-full bg-current origin-top h-full" style={{ transform: "scaleY(0)" }} />
      </div>

      <div className="w-full shrink-0 relative z-20 pointer-events-none mb-8 md:mb-14">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 mb-4 md:mb-8"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">EXPERIENCE</span>
            <div className="h-px flex-1 bg-current opacity-20" />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-fraunces text-5xl md:text-7xl font-bold tracking-tight uppercase"
          >
            Job Simulations
          </motion.h2>
        </div>
      </div>

      <div className="flex-1 w-full relative min-h-0">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 w-full h-full relative space-y-24 md:space-y-0">
          
          {JOB_SIMULATIONS_DATA.map((slide, index) => (
             <div 
                key={index} 
                ref={el => { slidesRef.current[index] = el; }}
                className={`relative lg:absolute lg:inset-0 flex flex-col-reverse lg:flex-row items-center justify-center w-full lg:h-full ${index > 0 ? "lg:opacity-0 lg:pointer-events-none" : ""}`}
              >
                
                {/* Background Large Number */}
                <div className="slide-num absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
                  <span className="font-fraunces font-black text-[50vw] md:text-[35vw] opacity-[0.03] leading-none tracking-tighter mix-blend-difference dark:mix-blend-screen">
                    0{index + 1}
                  </span>
                </div>

                {/* Left: Text Content */}
                <div className="slide-left w-full md:w-1/2 flex flex-col gap-4 md:gap-10 relative z-10 pr-0 md:pr-12 pb-12 md:pb-0">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-fraunces text-4xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tight">
                      {slide.company}
                    </h3>
                    <div className="flex flex-col gap-1.5 border-l-4 border-current pl-6 mt-4">
                      <div className="font-mono text-[16px] md:text-[19px] font-black uppercase tracking-widest opacity-90">
                        {slide.role}
                      </div>
                      {slide.verified && (
                        <div className="font-mono text-[10px] md:text-[11px] opacity-40 uppercase tracking-[0.2em] font-bold">
                          VERIFIED: {slide.verified}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="font-mono text-[20px] font-black uppercase tracking-[0.1em] opacity-100 flex items-center gap-3">
                      <span className="w-8 h-[2px] bg-current opacity-30" />
                      FOCUS
                    </div>
                    <ul className="flex flex-col gap-5 font-sans text-[18px] opacity-100 font-medium text-left leading-relaxed">
                      {slide.points.map((pt, i) => (
                        <li key={i} className="flex gap-5 items-start">
                          <span className="font-mono text-[11px] mt-2 opacity-30 font-bold shrink-0">0{i+1}</span>
                          <span className="opacity-90">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right: Logo */}
                <div className="slide-right w-full md:w-1/2 flex justify-center items-center relative z-10 mb-8 md:mb-0">
                  <div className="w-40 h-40 md:w-64 md:h-64 flex items-center justify-center p-8 bg-current/[0.03] rounded-full sm:rounded-[3rem] shadow-[0_15px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_15px_40px_rgba(255,255,255,0.02)] backdrop-blur-md mix-blend-luminosity">
                    <img 
                      src={slide.logo} 
                      alt={`${slide.company} Logo`}
                      onError={(e) => { 
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${slide.company.replace(/ /g, '+')}&background=random&color=ffffff&size=256`; 
                      }}
                      className="max-w-[80%] max-h-[80%] object-contain grayscale mix-blend-multiply dark:mix-blend-screen opacity-90 dark:invert transition-all"
                    />
                  </div>
                </div>

             </div>
           ))}

        </div>
      </div>
    </section>
  );
};

const WhySection = () => {
  return (
    <section 
      className="relative z-[1] w-full h-[65vh] flex items-center justify-center bg-[#f5f5f5] text-[#0a0a0a] overflow-hidden m-0 p-0"
    >
      <h2 
        className="absolute top-1/2 left-1/2 flex flex-row items-center justify-center gap-[0.25em] font-fraunces whitespace-nowrap m-0 p-0 pointer-events-none select-none antialiased" 
        style={{ 
          fontSize: "clamp(64px, 8vw, 140px)", 
          fontWeight: 600, 
          lineHeight: 1, 
          letterSpacing: "-0.02em",
          opacity: 0.55,
          color: "#000000",
          textRendering: "optimizeLegibility",
          transform: `translate(-50%, -50%)`
        }}
      >
        <span>Why</span>
        <span>Do</span>
        <span>I</span>
        <span>Do</span>
        <span>It</span>
      </h2>
    </section>
  );
};

const PARAGRAPHS = [
  { text: "I was never drawn to law for its rules — but for the judgment it demands." },
  { text: "During my internships, while working through contracts and transaction documents, I began to recognise that every clause is deliberate — a precise allocation of risk, control, and consequence. That perspective reshaped how I engage with the field." },
  { text: "I see law as more than a discipline. It is a framework through which complex decisions are structured, transactions are executed, and outcomes are defined — often across jurisdictions." },
  { text: "My approach reflects the same mindset. I move towards opportunities, not away from them. If I lack a skill, I acquire it. If I face complexity, I work through it with discipline and clarity." },
  { text: "I am building a way of thinking that is rigorous, commercially grounded, and globally aware." },
  { text: (
      <>
        Not just to understand the law, but to operate where it{" "}
        <span className="relative inline-block px-3 py-0.5 ml-1 leading-none text-white whitespace-nowrap align-baseline z-0 font-medium">
          <span className="absolute inset-0 bg-[#7B61FF] rounded-[4px] transform rotate-[-2deg] -z-10 shadow-sm" style={{ transformOrigin: "center" }}></span>
          <span className="relative z-10">shapes outcomes.</span>
        </span>
      </>
    ) 
  }
];

const EditorialGallery = () => {
  const images = [
    { src: "/gallery/gallery-6.jpg", alt: "Milestone 1", span: "row-span-2 col-span-1", label: "[REF_001:GLOBAL_CONF]" },
    { src: "/gallery/gallery-5.jpg", alt: "Milestone 4", span: "col-span-1 row-span-1", label: "[REF_002:PRACTICE_CORE]" },
    { src: "/gallery/gallery-3.png", alt: "Milestone 3", span: "col-span-1 row-span-1", label: "[REF_003:ADVOCACY]" },
    { src: "/gallery/gallery-7.jpg", alt: "Milestone 5", span: "row-span-2 col-span-1", label: "[REF_004:AWARD]" },
    { src: "/gallery/gallery-2.jpg", alt: "Milestone 2", span: "row-span-2 col-span-1", label: "[REF_005:GROUP_EXTERNAL]" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:gap-5 w-full auto-rows-[220px] md:auto-rows-[240px]">
      {images.map((img, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`${img.span} relative group rounded-sm overflow-hidden border border-black/5 bg-white shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)]`}
        >
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <img 
            src={img.src} 
            className="w-full h-full object-cover transition-transform duration-1000 ease-[0.22,1,0.36,1] group-hover:scale-110"
            alt={img.alt} 
          />
          
          <div className="absolute bottom-3 left-3 z-20 text-[9px] font-mono font-bold text-white/90 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 tracking-wider">
            {img.label}
          </div>

          <div className="absolute top-3 right-3 z-20 w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white/60 transition-colors duration-500" />
        </motion.div>
      ))}
    </div>
  );
};

const EditorialSection = () => {
  const pRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const windowCenter = window.innerHeight / 2;

          pRefs.current.forEach((el) => {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const pCenter = rect.top + rect.height / 2;
            const offset = pCenter - windowCenter;
            
            const distance = Math.abs(offset);
            const rawProgress = Math.max(0, 1 - (distance / 300));
            const smoothProgress = 1 - Math.pow(1 - rawProgress, 3);
            
            const opacity = 0.25 + (smoothProgress * 0.75);
            const blur = (1 - smoothProgress) * 0.5;
            
            let translateY = 0;
            if (offset > 0) {
              translateY = (1 - smoothProgress) * 12;
            } else {
              translateY = (1 - smoothProgress) * -8;
            }

            el.style.opacity = opacity.toFixed(3);
            el.style.transform = `translateY(${translateY.toFixed(2)}px)`;
            el.style.filter = `blur(${blur.toFixed(2)}px)`;
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="editorial" className="desktop-tight-section relative w-full bg-[#f5f5f5] text-[#0a0a0a] pt-20 md:pt-28 pb-24 md:pb-36 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Unified Header */}
        <div className="editorial-heading mb-24 lg:mb-32 overflow-hidden w-full flex justify-center">
          <h2 
            className="font-fraunces font-black text-[clamp(2.25rem,10vw,8rem)] uppercase tracking-tighter leading-none text-center m-0 p-0 antialiased text-current"
          >
            Why I do it<span className="text-blue-900">?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
          {/* Left Column: Asymmetric Gallery */}
          <div className="order-2 lg:order-1">
            <EditorialGallery />
          </div>

          {/* Right Column: Narrative Text */}
          <div className="order-1 lg:order-2 space-y-12 md:space-y-16">
            <div className="space-y-10 md:space-y-14">
              {PARAGRAPHS.map((p, i) => {
                const isFirst = i === 0;
                const isLast = i === PARAGRAPHS.length - 1;
                
                let weightClass = "font-light";
                if (isFirst || isLast) {
                  weightClass = "font-medium";
                }
                
                return (
                  <p 
                    key={i}
                    ref={(el) => { pRefs.current[i] = el; }}
                    className={`text-left lg:text-justify text-[20px] md:text-[24px] xl:text-[28px] leading-[1.6] tracking-tight ${weightClass} ${isFirst ? 'text-black' : 'text-current/80'}`}
                    style={{
                      opacity: 0.25,
                      transform: 'translateY(12px)',
                      filter: 'blur(0.5px)',
                      transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
                      willChange: 'opacity, transform, filter'
                    }}
                  >
                    {p.text}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SplitFlapText = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => {
  const [displayText, setDisplayText] = useState("");
  const isInView = useRef(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView.current) {
          isInView.current = true;
          startAnimation();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [text]);

  const startAnimation = async () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789•/_ ";
    const textArray = text.split("");
    let currentDisplay = textArray.map(() => " ");
    
    // Initial delay
    await new Promise(r => setTimeout(r, delay * 1000));

    for (let i = 0; i < textArray.length; i++) {
        const targetChar = textArray[i];
        if (targetChar === " ") {
            currentDisplay[i] = " ";
            setDisplayText(currentDisplay.join(""));
            continue;
        }

        const flipCount = 4 + Math.floor(Math.random() * 5);
        for (let j = 0; j < flipCount; j++) {
            currentDisplay[i] = chars[Math.floor(Math.random() * chars.length)];
            setDisplayText(currentDisplay.join(""));
            await new Promise(r => setTimeout(r, 40));
        }
        
        currentDisplay[i] = targetChar;
        setDisplayText(currentDisplay.join(""));
    }
  };

  return (
    <span ref={containerRef} className={className}>
      {displayText || text.split("").map(() => " ").join("")}
    </span>
  );
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const appointmentMessage = encodeURIComponent(
    "Hello Ayush Kathane,\n\nI would like to book a legal appointment.\n\nAppointment Details:\n- Full Name:\n- Contact Number:\n- Email:\n- Legal Matter Type (Corporate / M&A / Contract / Property / Other):\n- Brief Case Summary:\n- Preferred Date:\n- Preferred Time:\n- Consultation Mode (Phone / Video / In-person):\n\nPlease confirm availability and next steps.\n\nThank you."
  );
  const whatsappUrl = `https://wa.me/917218035276?text=${appointmentMessage}`;

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <main className={`desktop-tight relative min-h-screen w-full transition-colors duration-500 overflow-x-clip selection:bg-obsidian selection:text-parchment dark:selection:bg-parchment dark:selection:text-obsidian ${isDarkMode ? "bg-obsidian text-parchment" : "bg-parchment text-obsidian"}`}>

      {/* Header Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-parchment dark:bg-obsidian border-b border-current">
        <div className="w-full">
        {/* Top Row: Brand & Actions */}
        <div className="flex justify-between items-center px-4 md:px-8 lg:px-12 py-3 md:py-4 border-b border-current relative">
          <div className="flex items-center">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group relative flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full border border-current transition-all duration-500 cursor-pointer overflow-visible bg-transparent"
              aria-label="Back to Hero"
            >
              {/* Constant soft illumination */}
              <div className="absolute inset-0 rounded-full bg-current opacity-[0.05] blur-[4px] pointer-events-none" />
              
              {/* Illumination / Outer Glow on Hover */}
              <div className="absolute inset-0 rounded-full bg-current opacity-0 group-hover:opacity-30 blur-xl transition-all duration-700 pointer-events-none" />
              
              {/* Inner Circle that fills on hover */}
              <div className="absolute inset-0 rounded-full bg-current opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100" />
              
              <ArrowUp 
                size={14} 
                strokeWidth={2} 
                className="relative z-10 transition-all duration-500 group-hover:text-parchment dark:group-hover:text-obsidian group-hover:-translate-y-0.5" 
              />
            </button>
          </div>
          
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="absolute left-1/2 -translate-x-1/2 cursor-pointer hover:opacity-60 transition-opacity"
          >
            <h1 className="font-fraunces font-black text-xl md:text-2xl tracking-tighter uppercase whitespace-nowrap">
              AYUSH KATHANE
            </h1>
          </button>

          <div className="flex items-center">
            <button
              onClick={() => {
                document.documentElement.classList.toggle('dark');
                setIsDarkMode(!isDarkMode);
              }}
              className="relative w-11 h-6 md:w-14 md:h-7 rounded-full bg-[#0d0d0d] border border-white/10 flex items-center p-1 cursor-pointer overflow-hidden shadow-inner group transition-all duration-300"
              aria-label="Toggle theme"
            >
              {/* Dynamic Track Glow */}
              <motion.div 
                animate={{ opacity: isDarkMode ? 0.4 : 0 }}
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-sm"
              />
              
              <div className="relative w-full h-full flex items-center">
                <motion.div
                  animate={{ 
                    left: isDarkMode ? "100%" : "0%",
                    x: isDarkMode ? "-100%" : "0%"
                  }}
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  className={`absolute w-4 h-4 md:w-5 md:h-5 rounded-full bg-white z-10 transition-shadow duration-300 ${
                    isDarkMode 
                      ? 'shadow-[0_0_15px_rgba(255,255,255,1),0_0_25px_rgba(255,255,255,0.4)]' 
                      : 'shadow-[0_2px_4px_rgba(0,0,0,0.5)]'
                  }`}
                />
              </div>
              
              {/* Subtle track markers */}
              <div className="absolute inset-0 flex justify-between px-2 md:px-3 items-center pointer-events-none opacity-20">
                <div className="w-0.5 h-0.5 md:w-1 md:h-1 rounded-full bg-white/40" />
                <div className="w-0.5 h-0.5 md:w-1 md:h-1 rounded-full bg-white/40" />
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Row: Navigation Links */}
        <div className="grid grid-cols-4 items-center font-mono text-[9px] md:text-xs uppercase tracking-[0.14em] md:tracking-[0.2em] font-black border-b border-current">
          {[
            { name: "About", id: "about" },
            { name: "Capabilities", id: "capabilities" },
            { name: "Career", id: "career" },
            { name: "Contact", id: "contact" }
          ].map((link, i) => (
            <a 
              key={i}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="py-2 md:py-2.5 text-center border-r last:border-r-0 border-current hover:bg-obsidian hover:text-parchment dark:hover:bg-parchment dark:hover:text-obsidian transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>
        </div>
      </nav>


      {/* Hero Section */}
      <section id="hero" className="desktop-tight-section relative min-h-screen h-[100svh] px-4 md:px-8 lg:px-12 py-6 md:py-10 overflow-hidden flex flex-col bg-parchment dark:bg-obsidian">
        <GridLines />

        <div className="hero-grid relative z-10 flex-1 grid grid-cols-12 gap-8 pt-16 md:pt-24 pb-12 md:pb-20 h-full">
          {/* Left Column: Visual */}
          <div className="col-span-12 md:col-span-5 lg:col-span-4 flex flex-col justify-center items-center md:items-end h-full">
            <div className="w-full max-w-[220px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[360px] md:pr-4 lg:pr-8 flex flex-col">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[3/4] w-full border border-current/10 group overflow-hidden bg-current/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] dark:shadow-[0_32px_64px_-16px_rgba(255,255,255,0.03)]"
              >
                <div className="absolute top-3 left-3 w-4 h-4 border-t-[1px] border-l-[1px] border-current opacity-20 z-10" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-[1px] border-r-[1px] border-current opacity-20 z-10" />
                
                <img
                  src="/ayush-hero.jpg"
                  alt="Ayush Kathane"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover scale-[1.02] group-hover:scale-100 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </motion.div>

              {/* Metadata moved exactly below the image */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1, ease: "easeOut" }}
                className="mt-6 flex flex-col gap-4 font-mono text-[9px] md:text-[10px] tracking-[0.2em] opacity-60 w-full"
              >
                <div className="flex flex-col gap-1 uppercase">
                  <span>→ BASED IN PUNE, INDIA</span>
                  <span>OPEN TO GLOBAL OPPORTUNITIES</span>
                </div>
                <div className="flex justify-between items-center opacity-70">
                  <span className="uppercase tracking-[0.3em]">PORTFOLIO MMXXVI</span>
                  <span className="tracking-wider">Ayush Kathane</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Identity & Branding */}
          <div className="col-span-12 md:col-span-7 lg:col-span-8 flex flex-col justify-end h-full">
            <div className="flex flex-col text-right items-end">
              {/* Master Brand */}
              <div className="w-full mb-8 md:mb-10">
                <motion.h1
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ 
                    delay: 0.8, 
                    duration: 1.5, 
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  className="font-fraunces font-black text-[clamp(2.3rem,9.5vw,4.6rem)] leading-[0.92] text-current opacity-100 tracking-tighter text-right uppercase"
                >
                  AYUSH KATHANE
                </motion.h1>
              </div>

              {/* Identity Subtext Stack */}
              <div className="font-mono uppercase tracking-widest text-right max-w-2xl">
                <PopInText delay={1.4} className="font-bold text-[12px] md:text-[15px] xl:text-[20px] mb-8 md:mb-12 opacity-100 tracking-wider">
                  LAW STUDENT / M&A & CORPORATE LAW / IN-HOUSE COUNSEL TRACK
                </PopInText>

                <div className="flex flex-col gap-1.5 md:gap-2">
                  <PopInText delay={1.8} className="font-black opacity-100 text-[10px] md:text-[13px] xl:text-[18px] tracking-[0.15em]">
                    SPECIALIZATION: M&A, PRIVATE EQUITY & RISK
                  </PopInText>
                  <PopInText delay={2.0} className="font-black opacity-100 text-[10px] md:text-[13px] xl:text-[18px] tracking-[0.15em]">
                    PROJECT FINANCE & PROPERTY LAW
                  </PopInText>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* About Section */}
      <AboutSection />

      {/* Capabilities Section */}
      <CapabilitiesSection />


      {/* Career Header Divider */}
      <section id="career" className="desktop-tight-section w-full flex justify-center items-center py-16 md:py-24 border-t border-current/20 overflow-hidden px-4 md:px-8 lg:px-12">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-fraunces font-black text-7xl md:text-9xl lg:text-[12vw] uppercase tracking-tighter leading-none"
        >
          CAREER
        </motion.h2>
      </section>

      {/* Archive Section (formerly Job Simulations) */}
      <ArchiveSection />

      {/* Internships Section */}
      <InternshipsSection />

      {/* Editorial Section */}
      <EditorialSection />

      {/* Contact Section: The Boarding Pass / Departures Board */}
      <section id="contact" className="desktop-tight-section w-full py-16 md:py-24 px-4 md:px-8 lg:px-12 bg-[#050505] text-white overflow-hidden">
        <div className="contact-board max-w-[1200px] mx-auto font-mono aspect-auto md:aspect-[1.85/1] flex flex-col border border-white/20 p-8 md:p-14 relative bg-white/[0.01] overflow-hidden">
          
          {/* Board Header */}
          <div className="flex justify-between items-end mb-4 md:mb-6 px-2">
            <div className="flex items-center gap-3 md:gap-4">
              <h2 className="text-3xl md:text-5xl lg:text-5xl font-black tracking-tighter leading-none">
                <SplitFlapText text="LET'S" delay={0.2} />
              </h2>
              <div className="text-yellow-500 text-2xl md:text-4xl lg:text-4xl flex items-center overflow-visible">
                <motion.span
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: false, margin: "-20%" }}
                  transition={{ 
                    duration: 1.2, 
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.2
                  }}
                >
                  →
                </motion.span>
              </div>
            </div>
            <div className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tighter leading-none opacity-90">
              <SplitFlapText text="CONNECT" delay={0.5} />
            </div>
          </div>

          {/* Departure Info Grid */}
          <div className="w-full flex flex-col border-t border-white/20">
            {/* Legend Row */}
            <div className="flex justify-between py-1.5 text-[8px] md:text-[9px] opacity-40 font-bold uppercase tracking-[0.3em]">
              <SplitFlapText text="STATUS: GLOBAL_READY" delay={0.7} />
              <SplitFlapText text="REMARKS_LOG_V2.0" delay={0.8} />
            </div>

            {/* Row 1: Name */}
            <div className="border-b border-white/10 py-2 md:py-3 flex justify-between items-center group cursor-default hover:bg-white/[0.02] transition-colors px-2">
              <span className="text-base md:text-lg lg:text-xl font-bold uppercase tracking-tighter opacity-70">
                <SplitFlapText text="INTRODUCING:" delay={1.0} />
              </span>
              <span className="text-base md:text-lg lg:text-xl font-black uppercase text-yellow-500 tracking-tighter">
                <SplitFlapText text="AYUSH KATHANE" delay={1.2} />
              </span>
            </div>

            {/* Row 2: Path */}
            <div className="border-b border-white/10 py-2 md:py-3 flex justify-between items-center group cursor-default hover:bg-white/[0.02] transition-colors px-2">
              <span className="text-base md:text-lg lg:text-xl font-bold uppercase tracking-tighter opacity-70">
                <SplitFlapText text="STRATEGIC FOCUS:" delay={1.4} />
              </span>
              <span className="text-base md:text-lg lg:text-xl font-black uppercase tracking-tighter">
                <SplitFlapText text="M&A / CORP LAW" delay={1.6} />
              </span>
            </div>

            {/* Row 3: Format */}
            <div className="border-b border-white/10 py-2 md:py-3 flex justify-between items-center group cursor-default hover:bg-white/[0.02] transition-colors px-2">
              <span className="text-base md:text-lg lg:text-xl font-bold uppercase tracking-tighter opacity-70">
                <SplitFlapText text="AVAILABILITY:" delay={1.8} />
              </span>
              <span className="text-base md:text-lg lg:text-xl font-black uppercase text-yellow-500 tracking-tighter">
                <SplitFlapText text="IMMEDIATE" delay={2.0} />
              </span>
            </div>

            {/* Row 4: Status */}
            <div className="border-b border-white/10 py-2 md:py-3 flex justify-between items-center group cursor-default hover:bg-white/[0.02] transition-colors px-2">
              <span className="text-base md:text-lg lg:text-xl font-bold uppercase tracking-tighter opacity-70">
                <SplitFlapText text="LOCATION:" delay={2.2} />
              </span>
              <span className="text-base md:text-lg lg:text-xl font-black uppercase tracking-tighter">
                <SplitFlapText text="PUNE • GLOBAL" delay={2.4} />
              </span>
            </div>
          </div>

          {/* Call to Action Buttons & QR Code */}
          <div className="mt-6 md:mt-8 flex flex-col md:flex-row gap-6 md:gap-12 items-end">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 flex-grow w-full md:w-auto">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-center px-6 py-4 border-2 border-white/20 hover:border-yellow-500 hover:bg-yellow-500 hover:text-black transition-all duration-500 text-base md:text-xl font-black group uppercase"
              >
                <span><SplitFlapText text="SEND ENQUIRY" delay={2.6} /></span>
                <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/ayush-kathane-518b902b8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-center px-6 py-4 border-2 border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-500 text-base md:text-xl font-black group uppercase"
              >
                <span><SplitFlapText text="LINKEDIN_CORE" delay={2.8} /></span>
                <span className="text-xl group-hover:translate-x-2 transition-transform">↗</span>
              </a>
            </div>

            <div className="w-full md:w-auto md:min-w-[300px] flex flex-col gap-2 text-[11px] md:text-[12px] font-mono uppercase tracking-[0.12em] opacity-80 md:pr-2">
              <a
                href="tel:+917218035276"
                className="inline-flex items-center justify-between border border-white/15 px-3 py-2 hover:border-yellow-500 hover:text-yellow-400 transition-colors"
              >
                <span>Phone</span>
                <span>+91 7218035276</span>
              </a>
              <a
                href="mailto:kathane.ayush1@gmail.com"
                className="inline-flex items-center justify-between border border-white/15 px-3 py-2 hover:border-yellow-500 hover:text-yellow-400 transition-colors normal-case tracking-normal"
              >
                <span className="uppercase tracking-[0.12em]">Mail</span>
                <span>kathane.ayush1@gmail.com</span>
              </a>
            </div>

            {/* QR Code Stub */}
            <div className="hidden md:flex flex-col items-center gap-3 p-4 border-l border-white/10 pl-12">
              <span className="text-[9px] font-bold opacity-40 uppercase tracking-[0.3em]">
                <SplitFlapText text="SCAN_TO_CONNECT" delay={3.0} />
              </span>
              <div className="w-32 h-32 md:w-36 md:h-36 bg-white p-2 border-4 border-black/10 shadow-xl overflow-hidden group">
                <img 
                  src="/qr-code.png" 
                  alt="QR Code" 
                  className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-500" 
                />
              </div>
            </div>
          </div>

          {/* Footer Metadata Line */}
          <div className="contact-footer-meta mt-12 md:mt-24 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 opacity-30 font-mono text-[10px] tracking-[0.2em] uppercase">
            <div className="flex items-center gap-6">
              <span><SplitFlapText text="© 2026 AYUSH KATHANE" delay={3.2} /></span>
              <span className="hidden md:inline"><SplitFlapText text="SYSTEM_ACTIVE_MMXXVI" delay={3.4} /></span>
            </div>
            <div><SplitFlapText text="VERIFIED_TRANSACTION_PATH" delay={3.6} /></div>
          </div>
        </div>
      </section>

    </main>
  );
}
