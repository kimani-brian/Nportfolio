import React, { useEffect, useState } from 'react';
import {
  Github, Linkedin, Mail, ArrowRight, ArrowUpRight, Download, MapPin,
  GraduationCap, Award, Code2, Database, Wrench, Layers, ShieldCheck,
  Menu, X, Rocket
} from 'lucide-react';

/* ================================================================== */
/*  DATA                                                              */
/* ================================================================== */

const profile = {
  name: 'Brian Kimani',
  firstName: 'Brian',
  title: 'Software Developer',
  tagline: 'I build fast, reliable, well crafted web applications.',
  email: 'kimanibrian030@gmail.com',
  github: 'https://github.com/kimani-brian',
  linkedin: 'https://linkedin.com/in/brian-kimani-344934373',
  location: 'Nairobi, Kenya',
  // Resume PDF lives in /public - replace the file to update it.
  resume: '/brian-kimani-resume.pdf',
  about:
    'Software developer focused on shipping fast, reliable web applications. I design clean backends in Go & Python, craft polished interfaces with React & Next.js, and deploy with Docker backed by a strong foundation in mathematics and computer science.',
};

const marqueeItems = [
  'Go', 'Python', 'Django', 'Gin', 'Next.js', 'React', 'Tailwind CSS',
  'TypeScript', 'PostgreSQL', 'Docker', 'Kubernetes', 'Linux', 'Git', 'JWT', 'REST APIs',
];

const skillGroups = [
  { icon: Code2, title: 'Languages', skills: ['Go', 'Python', 'JavaScript', 'TypeScript', 'HTML/CSS'] },
  { icon: Database, title: 'Databases', skills: ['PostgreSQL', 'SQL'] },
  { icon: Layers, title: 'Frameworks & Libraries', skills: ['Gin', 'Next.js', 'React', 'Django', 'Tailwind CSS'] },
  { icon: Wrench, title: 'DevOps & Tools', skills: ['Docker', 'Git', 'GitHub', 'Linux', 'Postman'] },
  { icon: ShieldCheck, title: 'Auth & Security', skills: ['JWT', 'Role-Based Access Control'] },
];

const education = {
  university: 'Kenyatta University',
  location: 'Nairobi, Kenya',
  degree: 'B.Sc. Mathematics & Computer Science',
  period: 'Expected graduation - 2026',
  coursework: [
    'Object Oriented Programming', 'Data Structures & Algorithms', 'Database Systems',
    'Computer Networks', 'Web Development', 'Artificial Intelligence',
  ],
};

const certifications = [
  {
    title: 'Kubernetes and Cloud Native Essentials',
    issuer: 'The Linux Foundation',
    date: 'March 2026',
    link: 'https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/aa65df27-5d72-418c-a0b5-1abbe692f1f7-brian-kimani-f03846b8-4c81-40e2-bfb7-c60d59744ddb-certificate.pdf',
  },
  {
    title: 'Introduction to Kubernetes',
    issuer: 'The Linux Foundation',
    date: 'April 2026',
    link: 'https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/aa65df27-5d72-418c-a0b5-1abbe692f1f7-brian-kimani-975a7da4-6dc7-4e92-a141-83c20cb8a7a3-certificate.pdf',
  },
  {
    title: 'Linux LFS101 - Introduction to Linux',
    issuer: 'The Linux Foundation',
    date: 'August 2026',
    link: 'https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/aa65df27-5d72-418c-a0b5-1abbe692f1f7-brian-mumbi-6137fb87-427a-4e44-9a9f-018fafe1d737-certificate.pdf',
  },
];

const projects = [
  {
    title: 'ShikaGari',
    description:
      'Full-stack car marketplace for the Kenyan market - JWT auth, role-based admin approval for verified dealers, real-time buyer-seller messaging, favourites, advanced search and a responsive seller dashboard.',
    tech: ['Go', 'Gin', 'Next.js', 'PostgreSQL', 'REST API'],
    // TODO: replace with the real ShikaGari live URL - currently points at the InstaMart URL.
    liveUrl: 'https://instamart-3vmc.onrender.com',
    codeUrl: 'https://github.com/kimani-brian/shikagari',
    image: 'https://images.pexels.com/photos/26954166/pexels-photo-26954166.jpeg',
  },
  {
    title: 'Crave & Glaze - Bakery Platform',
    description:
      'Full-stack bakery e-commerce platform with dynamic product variants, M-Pesa payment integration, admin management, Dockerized deployment and async email notifications.',
    tech: ['Go', 'Gin', 'PostgreSQL', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://crave-and-glaze-final.onrender.com',
    // TODO: replace with the real Crave & Glaze repo - currently points at the ShikaGari repo.
    codeUrl: 'https://github.com/kimani-brian/shikagari',
    image: 'https://images.unsplash.com/photo-1625649611137-df49dc542f6a?fm=jpg&q=60&w=1200&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJpcnRoZGF5JTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    title: 'InstaMart - E-Commerce Platform',
    description:
      'Full-stack e-commerce platform with M-Pesa payment integration, session-based cart management, secure authentication and Dockerized deployment.',
    tech: ['Python', 'Django', 'PostgreSQL', 'Tailwind CSS', 'JavaScript'],
    liveUrl: 'https://instamart-3vmc.onrender.com',
    codeUrl: 'https://github.com/kimani-brian/myshop-continua',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=750&fit=crop',
  },
];

/* ================================================================== */
/*  HELPERS                                                          */
/* ================================================================== */

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useActiveSection() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  return active;
}
/* ================================================================== */
/*  NAVBAR                                                           */
/* ================================================================== */

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/5 bg-ink/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        <button
          onClick={() => scrollTo('home')}
          className="font-display text-lg font-bold tracking-tight text-white"
          aria-label="Back to top"
        >
          brian<span className="text-gradient">.</span>kimani
        </button>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className={`text-sm transition-colors ${
                active === l.id ? 'text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {l.label}
            </button>
          ))}
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-lg border border-sky-400/40 p-2 text-sky-400 transition-colors hover:border-sky-300 hover:bg-sky-400/10 hover:text-sky-300"
          >
            <Linkedin size={16} />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-lg border border-white/30 p-2 text-zinc-100 transition-colors hover:border-white hover:bg-white/10 hover:text-white"
          >
            <Github size={16} />
          </a>
        </div>

        <button
          className="rounded-lg border border-white/10 p-2 text-zinc-300 hover:text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-b border-white/5 bg-ink/95 px-6 pb-6 pt-2 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => { setOpen(false); scrollTo(l.id); }}
                className="rounded-lg px-3 py-2.5 text-left text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </button>
            ))}
            <div className="mt-3 flex items-center gap-3">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-sky-400/40 p-2.5 text-sky-400 transition-colors hover:border-sky-300 hover:bg-sky-400/10 hover:text-sky-300"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-white/30 p-2.5 text-zinc-100 transition-colors hover:border-white hover:bg-white/10 hover:text-white"
              >
                <Github size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ================================================================== */
/*  HERO                                                             */
/* ================================================================== */

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-32 md:pt-40">
      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl" data-reveal>
            Hi, I'm {profile.firstName}.
            <br />
            <span className="text-zinc-100">I'm a software developer</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400" data-reveal>
            {profile.tagline} I design clean backends in Go &amp; Python, craft polished
            interfaces with React &amp; Next.js, and deploy with Docker.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4" data-reveal>
            <button onClick={() => scrollTo('projects')} className="btn-ghost">
              View my work
              <ArrowRight size={16} />
            </button>
            <a href={profile.resume} download className="btn-ghost">
              <Download size={16} />
              Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
/* ================================================================== */
/*  TECH MARQUEE                                                     */
/* ================================================================== */

function TechMarquee() {
  const doubled = [...marqueeItems, ...marqueeItems];
  return (
    <div className="container-x" data-reveal>
      <div className="relative border-y border-white/5 bg-surface/40 py-5">
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
            {doubled.map((item, i) => (
              <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-sm font-medium text-zinc-500">
                {item}
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500/70" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  ABOUT                                                            */
/* ================================================================== */

const aboutCards = [
  {
    icon: Code2,
    title: 'Clean Backends',
    text: 'REST APIs in Go (Gin) and Python (Django) built for performance, security and maintainability.',
  },
  {
    icon: Layers,
    title: 'Polished Frontends',
    text: 'Modern interfaces with React, Next.js and Tailwind CSS fast, accessible, responsive.',
  },
  {
    icon: Rocket,
    title: 'Cloud-Native Delivery',
    text: 'Dockerized builds, CI ready workflows and Kubernetes foundations from Linux Foundation certs.',
  },
];

function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div data-reveal>
            <span className="section-eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-400 to-indigo-400" />
              About me
            </span>
            <h2 className="section-title">Solving problems with clean code</h2>
            <p className="mt-5 leading-relaxed text-zinc-400">{profile.about}</p>
            <div className="mt-6 flex flex-wrap gap-6 border-t border-white/5 pt-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-surface">
                  <MapPin size={18} className="text-brand-400" />
                </span>
                <div>
                  <div className="text-sm font-medium text-white">{profile.location}</div>
                  <div className="text-xs text-zinc-500">Local time: Nairobi (EAT)</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-surface">
                  <GraduationCap size={18} className="text-brand-400" />
                </span>
                <div>
                  <div className="text-sm font-medium text-white">B.Sc. Math & CS</div>
                  <div className="text-xs text-zinc-500">Kenyatta University</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {aboutCards.map((c, i) => (
              <div
                key={c.title}
                className={`card group p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-xl hover:shadow-brand-500/10 ${i === 2 ? 'sm:col-span-2' : ''}`}
                data-reveal
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-brand-500/20 bg-brand-500/10 text-brand-300 transition-colors group-hover:bg-brand-500/20">
                  <c.icon size={22} />
                </div>
                <h3 className="font-display text-lg font-semibold text-white">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  SKILLS                                                           */
/* ================================================================== */

function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="container-x">
        <div className="mb-12" data-reveal>
          <span className="section-eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-400 to-indigo-400" />
            Tech stack
          </span>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g) => (
            <div
              key={g.title}
              className="card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/30"
              data-reveal
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-500/20 bg-brand-500/10 text-brand-300">
                  <g.icon size={18} />
                </span>
                <h3 className="font-display text-base font-semibold text-white">{g.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs text-zinc-300 transition-colors hover:border-brand-500/30 hover:bg-brand-500/10 hover:text-brand-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
/* ================================================================== */
/*  PROJECTS                                                         */
/* ================================================================== */

function Projects() {
  return (
    <section id="projects" className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute left-0 top-2/3 h-72 w-72 rounded-full bg-brand-500/10 blur-[120px]" />
      </div>
      <div className="container-x relative">
        <div className="mb-12" data-reveal>
          <span className="section-eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-400 to-indigo-400" />
            Selected work
          </span>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <article
              key={p.title}
              className="group card flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-2xl hover:shadow-brand-500/10"
              data-reveal
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={p.image}
                  alt={`${p.title} project preview`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-zinc-400">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="rounded-full border border-white/5 bg-white/5 px-2.5 py-1 text-[11px] text-zinc-400">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary !px-4 !py-2.5 flex-1">
                    Live demo
                    <ArrowUpRight size={15} />
                  </a>
                  <a href={p.codeUrl} target="_blank" rel="noopener noreferrer" aria-label={`View source code for ${p.title}`} className="btn-ghost !px-3 !py-2.5">
                    <Github size={16} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-zinc-500" data-reveal>
          More work lives on my{' '}
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-400 underline-offset-4 hover:underline">
            GitHub profile
          </a>
          .
        </p>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  EDUCATION & CERTIFICATIONS                                       */
/* ================================================================== */

function Education() {
  return (
    <section id="education" className="py-20 md:py-28">
      <div className="container-x">
        <div className="mb-12" data-reveal>
          <span className="section-eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-400 to-indigo-400" />
            Education &amp; certifications
          </span>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          {/* Education */}
          <div className="card p-8" data-reveal>
            <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-brand-500/20 bg-brand-500/10 text-brand-300">
              <GraduationCap size={22} />
            </span>
            <h3 className="font-display text-lg font-semibold text-white">{education.university}</h3>
            <p className="mt-1 text-sm text-brand-400">{education.location}</p>
            <p className="mt-4 font-display text-xl font-semibold text-white">{education.degree}</p>
            <p className="mt-1 text-sm text-zinc-400">{education.period}</p>
            <div className="mt-6 border-t border-white/5 pt-6">
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">Relevant coursework</h4>
              <div className="flex flex-wrap gap-2">
                {education.coursework.map((c) => (
                  <span key={c} className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="flex flex-col gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.title}
                className="group card flex items-center justify-between gap-4 p-6 transition-all duration-300 hover:border-brand-500/30 hover:bg-surface"
                data-reveal
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-brand-400 transition-colors group-hover:border-brand-500/30 group-hover:bg-brand-500/10">
                    <Award size={20} />
                  </span>
                  <div>
                    <h4 className="font-display text-sm font-semibold text-white">{cert.title}</h4>
                    <p className="mt-1 text-xs text-zinc-400">
                      {cert.issuer} · <span className="text-zinc-500">{cert.date}</span>
                    </p>
                  </div>
                </div>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View certificate: ${cert.title}`}
                  className="shrink-0 rounded-full border border-white/10 p-2 text-zinc-400 transition-all hover:border-brand-500/40 hover:bg-brand-500/10 hover:text-brand-300"
                >
                  <ArrowUpRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
/* ================================================================== */
/*  CONTACT                                                          */
/* ================================================================== */

function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="container-x">
        <div className="card mx-auto max-w-3xl bg-gradient-to-b from-surface to-surface/40 p-10 md:p-14" data-reveal>
          <span className="section-eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-400 to-indigo-400" />
            Contact
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            Have an idea? let's build it together.
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-zinc-400">
            I'm currently open to new opportunities and freelance work. Reach out
            and I'll get back to you quickly.
          </p>
          <div className="mt-9 flex items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email me"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-neutral-900 text-white transition-colors hover:border-white/25 hover:bg-neutral-800"
            >
              <Mail size={18} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-sky-400/40 text-sky-400 transition-colors hover:border-sky-300 hover:bg-sky-400/10 hover:text-sky-300"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-zinc-100 transition-colors hover:border-white hover:bg-white/10 hover:text-white"
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  FOOTER                                                           */
/* ================================================================== */

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="container-x flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-zinc-500">
          © {year} {profile.firstName} {profile.name.split(' ')[1]}.
        </p>
        <div className="flex items-center gap-3">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-full border border-white/10 p-2 text-zinc-400 transition-colors hover:border-white/25 hover:text-white">
            <Github size={16} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-full border border-white/10 p-2 text-zinc-400 transition-colors hover:border-white/25 hover:text-white">
            <Linkedin size={16} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="rounded-full border border-white/10 p-2 text-zinc-400 transition-colors hover:border-white/25 hover:text-white">
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ================================================================== */
/*  APP                                                              */
/* ================================================================== */

function App() {
  useReveal();
  return (
    <div className="noise min-h-screen bg-ink font-body text-zinc-200">
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
