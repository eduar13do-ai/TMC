/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import {
  Home,
  FileText,
  Users,
  Phone,
  ArrowRight,
  Play,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Globe,
  MapPin,
  Mail,
  Menu,
  X,
  ChevronRight,
  Building2,
  Settings,
  FileSearch,
  CheckSquare,
  DollarSign,
  AlertCircle,
  BookOpen,
  Eye,
  Shield,
  Instagram,
  ClipboardList,
  Drone,
  Droplets
} from 'lucide-react';

// --- Components ---

const Typewriter = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => {
  const chars = text.split("");
  return (
    <span className={`inline-block ${className}`}>
      {chars.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1, delay: delay + index * 0.03 }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas!.width) this.x = 0;
        else if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        else if (this.y < 0) this.y = canvas!.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(122, 50, 54, ${this.opacity})`; // #7A3236
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const numberOfParticles = (canvas.width * canvas.height) / 15000;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Quem Somos', href: '#quemsomos' },
  ];

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 w-[95%] max-w-7xl ${isScrolled ? 'top-6' : 'top-4'}`}>
      <div className={`transition-all duration-700 rounded-[32px] px-8 flex items-center justify-between ${isScrolled ? 'bg-brand-dark/80 backdrop-blur-2xl py-3 border border-white/10 shadow-2xl' : 'bg-brand-dark py-6 border border-transparent'}`}>
        <div className="text-2xl font-black tracking-tighter flex items-center gap-1 text-white group cursor-pointer">
          TMC<span className="text-brand-accent group-hover:text-brand-accent-light transition-colors">Engenharia</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[11px] font-black uppercase tracking-[0.2em] text-white/60 hover:text-white transition-all hover:translate-y-[-1px] active:translate-y-[0px]"
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://wa.me/5522992436434?text=Olá! Gostaria de solicitar um orçamento com a TMC Engenharia."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-brand-dark px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-brand-accent hover:text-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-white/5"
          >
            Orçamento
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-full left-4 right-4 bg-brand-dark/95 backdrop-blur-3xl rounded-3xl border border-white/10 p-10 flex flex-col gap-8 md:hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] z-[60]"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-black text-white/60 hover:text-brand-accent transition-colors tracking-tighter uppercase"
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://wa.me/5522992436434?text=Olá! Gostaria de solicitar um orçamento com a TMC Engenharia."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-brand-accent text-white px-8 py-5 rounded-2xl text-center font-black uppercase tracking-[0.2em] shadow-lg shadow-brand-accent/20 active:scale-95 transition-transform"
            >
              Orçamento
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ServiceCard = ({ icon: Icon, title, description, items, delay = 0 }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onClick={() => setIsExpanded(!isExpanded)}
      className="group card-premium-interactive"
    >
      <div className={`absolute top-0 right-0 w-48 h-48 bg-brand-accent/5 rounded-full -mr-24 -mt-24 blur-3xl transition-all duration-700 group-hover:bg-brand-accent/10 group-hover:scale-150`} />
      <div className={`absolute inset-0 bg-gradient-to-br from-brand-accent/[0.05] via-transparent to-transparent transition-opacity duration-700 ${isExpanded ? 'opacity-100' : 'opacity-0'}`} />

      <div className="relative z-10">
        <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center mb-10 transition-all duration-700 shadow-xl ${isExpanded ? 'bg-brand-accent text-white scale-110 shadow-brand-accent/30 rotate-3' : 'bg-white border border-brand-accent/10 text-brand-accent hover:border-brand-accent/30'}`}>
          <Icon size={32} />
        </div>

        <h3 className="text-2xl font-bold text-brand-text tracking-tight mb-2 group-hover:text-brand-accent transition-colors duration-300">{title}</h3>

        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0,
            marginTop: isExpanded ? 16 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <p className="text-brand-muted text-sm mb-10 leading-relaxed font-light">{description}</p>

          <ul className="space-y-4 mb-4">
            {items.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-xs text-brand-muted font-medium bg-brand-accent/[0.03] p-3 rounded-xl border border-brand-accent/[0.05] hover:bg-white hover:border-brand-accent/20 transition-all duration-300">
                <CheckCircle2 size={14} className="text-brand-accent shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <a
            href={`https://wa.me/5522992436434?text=Olá! Vi o site de vocês e gostaria de solicitar um orçamento para: ${encodeURIComponent(title)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-8 w-full bg-brand-accent text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-brand-dark transition-all shadow-lg active:scale-95"
          >
            Solicitar este Serviço <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Counter = ({ to, suffix = "", duration = 2 }: { to: number, suffix?: string, duration?: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const easeProgress = progress * (2 - progress); // easeOutQuad
      const currentVal = Math.floor(easeProgress * to);
      node.textContent = currentVal + suffix;

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        node.textContent = to + suffix;
      }
    };

    // Delay to sync with the fade-in animation of the container
    const timeoutId = setTimeout(() => {
      animationFrameId = window.requestAnimationFrame(step);
    }, 800);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, [to, suffix, duration]);

  return <span ref={nodeRef}>0{suffix}</span>;
};

// Scrolling Ticker Component
const ScrollingTicker = () => {
  const specialties = [
    "ENGENHARIA CIVIL", "PERÍCIAS JUDICIAIS", "AVALIAÇÕES DE IMÓVEIS",
    "ESTRUTURAS METÁLICAS", "REFORMAS DE ELITE", "GESTÃO DE OBRAS",
    "LAUDOS TÉCNICOS", "CONSTRUÇÃO DE ALTO PADRÃO"
  ];

  return (
    <div className="bg-brand-accent py-4 sm:py-6 overflow-hidden border-y border-brand-accent-gold/20 flex whitespace-nowrap relative z-10 shadow-2xl">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex gap-12 items-center"
      >
        {[...specialties, ...specialties].map((text, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="text-white/90 font-black tracking-[0.3em] text-[10px] sm:text-xs uppercase">{text}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-brand-accent-gold shadow-[0_0_10px_rgba(197,160,89,0.8)]" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// Contact Form Component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    email: '',
    mensagem: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Solicitação de Contato - TMC Engenharia");
    const body = encodeURIComponent(
      `Nome: ${formData.nome}\n` +
      `WhatsApp: ${formData.whatsapp}\n` +
      `Email: ${formData.email}\n\n` +
      `Mensagem:\n${formData.mensagem}`
    );
    window.location.href = `mailto:tmcsolucoesengenharia@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <input
          type="text"
          placeholder="Nome"
          required
          className="w-full px-6 py-4 rounded-2xl bg-brand-surface border border-brand-accent/10 text-brand-dark focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all placeholder:text-brand-dark/60"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
        />
      </div>
      <div className="space-y-1">
        <input
          type="text"
          placeholder="WhatsApp"
          required
          className="w-full px-6 py-4 rounded-2xl bg-brand-surface border border-brand-accent/10 text-brand-dark focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all placeholder:text-brand-dark/60"
          value={formData.whatsapp}
          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
        />
      </div>
      <div className="space-y-1">
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full px-6 py-4 rounded-2xl bg-brand-surface border border-brand-accent/10 text-brand-dark focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all placeholder:text-brand-dark/60"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div className="space-y-1">
        <textarea
          placeholder="Mensagem"
          rows={4}
          required
          className="w-full px-6 py-4 rounded-2xl bg-brand-surface border border-brand-accent/10 text-brand-dark focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all placeholder:text-brand-dark/60 resize-none"
          value={formData.mensagem}
          onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-brand-accent text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-brand-accent-light transition-all shadow-[0_10px_20px_rgba(122,50,54,0.2)] active:scale-95"
      >
        Entrar em Contato
      </button>
    </form>
  );
};

// WhatsApp Floating Button Component
const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/5522992436434"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileActive={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 sm:p-5 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] flex items-center justify-center border-2 border-white/20 group"
    >
      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 group-hover:opacity-40" />
      <Phone size={28} className="relative z-10" fill="currentColor" />

      {/* Tooltip */}
      <span className="absolute right-full mr-4 bg-brand-dark text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none shadow-2xl">
        Falar com Especialista
      </span>
    </motion.a>
  );
};

export default function App() {
  const { scrollYProgress, scrollY } = useScroll();
  const heroBgY = useTransform(scrollY, [0, 1000], ['0%', '20%']);
  const heroTextY = useTransform(scrollY, [0, 1000], ['0%', '40%']);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <div className="relative min-h-screen bg-brand-surface selection:bg-brand-accent/20 selection:text-brand-accent overflow-x-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-accent-gold z-[100] origin-left shadow-[0_0_15px_rgba(197,160,89,0.5)]"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="noise-overlay" />
      <Navbar />

      <main>
        {/* Hero Section */}
        <section id="inicio" className="relative min-h-screen flex flex-col md:flex-row items-center pt-32 pb-12 md:py-32 bg-brand-dark overflow-hidden">
          <motion.div
            style={{ y: heroBgY }}
            className="absolute inset-0 z-0"
          >
            {/* Imagem de fundo unificada: Hero Background para Mobile e Desktop */}
            <img
              src="/fotos/hero-bg.jpg"
              alt="TMC Engenharia"
              className="absolute inset-0 w-full h-full object-cover md:object-right brightness-[0.35] saturate-[0.8] contrast-[1.1]"
            />

            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/40 to-transparent opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/20 via-transparent to-brand-surface" />

            <div className="blueprint-grid opacity-[0.05] grayscale brightness-0 invert" />
            <div className="blueprint-dots opacity-[0.1] grayscale brightness-0 invert" />
          </motion.div>

          <div className="container mx-auto px-6 relative z-10 flex flex-col items-center md:items-start">
            <motion.div style={{ y: heroTextY, opacity: heroOpacity }} className="max-w-4xl md:max-w-2xl text-center md:text-left">
              <div className="h-px w-12 bg-brand-accent-gold" />


              <h1 className="text-6xl sm:text-8xl md:text-[130px] font-extrabold tracking-tighter mb-8 sm:mb-10 leading-[0.9] text-white">
                <span className="inline-block hover:text-brand-accent-gold transition-colors duration-500">Soluções</span> <br />
                <span className="text-dynamic-accent">
                  ao seu alcance
                </span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mb-12 sm:mb-16 leading-relaxed font-light">
                Oferecemos soluções completas em perícias técnicas, laudos, avaliações imobiliárias, vistorias, inspeções prediais, assistência condominial e regularização junto à Receita Federal. <br /><br />
                Atuamos com foco na mitigação de riscos, redução de falhas e suporte estratégico para decisões seguras e assertivas. <br /><br />
                Mais do que executar serviços, entregamos confiança, transparência e excelência técnica para proteger e valorizar o seu patrimônio.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 mb-20"
              >
                <a href="#contato" className="group bg-brand-dark text-white px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-brand-accent transition-all hover:scale-105 shadow-2xl">
                  Fale com um Especialista <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-300" />
                </a>
                <a href="#servicos" className="group bg-white/60 backdrop-blur-md border border-brand-accent/10 text-brand-text px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white transition-all shadow-sm">
                  Ver Portfólio
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30"
          >
            <div className="w-px h-12 bg-gradient-to-b from-brand-accent to-transparent" />
          </motion.div>
        </section>

        <ScrollingTicker />

        {/* Services Section */}
        <section id="servicos" className="py-24 sm:py-32 relative bg-brand-surface overflow-hidden border-t border-brand-accent/5">
          <div className="blueprint-dots opacity-[0.03] text-brand-accent" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-accent/10 border border-brand-accent/10 mb-6"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-brand-accent">Serviços Técnicos</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-8 tracking-tighter text-brand-text leading-[0.9] text-balance"
              >
                Soluções de Engenharia com <span className="text-dynamic-accent">Rigor Técnico</span>
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
              <ServiceCard
                icon={DollarSign}
                title="Regularização na Receita federal"
                description="Reduza em até 90% o INSS da sua obra com o time da TMC que já regularizou + de 200 obras em todo o Brasil!"
                items={["Emissão CNO", "Aferição da obra", "Emissão CND"]}
                delay={0.1}
              />
              <ServiceCard
                icon={Settings}
                title="Consultoria em Engenharia"
                description="Suporte técnico especializado para projetos de construção, reforma, regularização e segurança."
                items={["Projetos personalizados", "Acompanhamento técnico", "Gestão de obras", "Fiscalização de obra"]}
                delay={0.2}
              />
              <ServiceCard
                icon={ClipboardList}
                title="Assistência Condominial"
                description="Suporte completo para gestão e manutenção de condomínios profissionais."
                items={["Plano de manutenção", "Recebimento e implantação de condomínios", "Gestão de reforma"]}
                delay={0.3}
              />
              <ServiceCard
                icon={Drone}
                title="Inspeção com Drone"
                description="Vistorias seguras e relatórios de alta precisão com tecnologia aérea de ponta."
                items={["Inspeção de fachada", "Levantamento de dados", "Relatórios detalhados"]}
                delay={0.4}
              />
              <ServiceCard
                icon={Droplets}
                title="Consultoria em Impermeabilização"
                description="Especialista em prevenção e solução definitiva de problemas de infiltração."
                items={["Escolha de sistemas", "Prevenção de falhas e retrabalho", "Relatórios claros e objetivos"]}
                delay={0.5}
              />
              <ServiceCard
                icon={FileText}
                title="Avaliação de Edificações"
                description="Identificação de problemas estruturais e emissão de laudos técnicos especializados."
                items={["Laudos técnicos", "Identificação de patologias", "Relatórios detalhados"]}
                delay={0.6}
              />
              <ServiceCard
                icon={AlertCircle}
                title="Avaliação de Imóveis"
                description="Larga experiência na avaliação mercadológica de imóveis para diversos fins."
                items={["Avaliação mercadológica", "Laudos para banco", "Valorização patrimonial"]}
                delay={0.7}
              />
              <ServiceCard
                icon={Eye}
                title="Vistorias"
                description="Serviço de alta qualidade no acompanhamento de obras e avaliação de imóveis."
                items={["Vistoria técnica", "Perícia judicial", "Laudo pericial"]}
                delay={0.8}
              />
              <ServiceCard
                icon={BookOpen}
                title="Elaboração de Manuais"
                description="Grande experiência na elaboração de manuais técnicos e normas."
                items={["Manual do Proprietário", "Normas técnicas", "Procedimentos operacionais"]}
                delay={0.9}
              />
            </div>
          </div>
        </section>



        {/* About Section - Dark Thematic Shift */}
        <section id="quemsomos" className="py-24 sm:py-40 relative bg-dark-premium overflow-hidden">
          <div className="blueprint-grid opacity-[0.05] grayscale brightness-0 invert" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-12 gap-16 sm:gap-24 items-center">
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(122,50,54,0.8)]" />
                  <span className="text-[10px] font-black tracking-[.3em] uppercase text-white/80">Engenharia de Elite</span>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-6xl sm:text-8xl md:text-[110px] font-black mb-12 tracking-tighter text-white leading-[0.9] text-balance"
                >
                  Engenharia de <br /> <span className="text-brand-accent">Alto Desempenho</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-white/60 text-lg sm:text-2xl mb-16 leading-relaxed font-light max-w-2xl"
                >
                  Transformamos desafios técnicos em ativos seguros. Nossa abordagem une a precisão da engenharia com a visão estratégica de mercado para garantir a proteção e valorização do seu patrimônio.
                </motion.p>

                <div className="grid sm:grid-cols-2 gap-12">
                  {[
                    { title: 'Excelência Técnica', desc: 'Cada projeto é tratado com rigor absoluto e conformidade total com as normas vigentes.' },
                    { title: 'Visão Patrimonial', desc: 'Entendemos seu imóvel não apenas como obra, mas como um ativo financeiro fundamental.' }
                  ].map((item, i) => (
                    <div key={i} className="space-y-4 border-l-2 border-brand-accent/30 pl-8 py-2 hover:border-brand-accent transition-colors duration-500">
                      <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs">{item.title}</h4>
                      <p className="text-white/40 text-sm leading-relaxed font-light">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, x: 20 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                  className="relative z-10"
                >
                  <div className="absolute -inset-8 bg-brand-accent/20 blur-[120px] rounded-full opacity-60 animate-pulse" />

                  {/* Image Container */}
                  <div className="relative aspect-[4/5] rounded-[40px] sm:rounded-[60px] overflow-hidden group/img shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10 bg-brand-surface-muted">
                    <img
                      src="/fotos/foto2.jpeg"
                      alt="TMC Engenharia - Engenharia de Alto Desempenho"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-110"
                      onError={(e) => {
                        // Fallback case if the local image is still missing in production
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2070&auto=format&fit=crop';
                      }}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/20 opacity-60 lg:block hidden" />
                  </div>

                  {/* Stats Container - Below on mobile, Overlay on large screens */}
                  <div className="mt-8 lg:mt-0 lg:absolute lg:bottom-8 lg:right-8 lg:max-w-xs flex flex-col gap-4">
                    <div className="glass-card-accent p-6 rounded-[28px] sm:rounded-[32px] border-white/20 backdrop-blur-2xl bg-white/10 lg:bg-brand-accent/5">
                      <div className="text-[8px] sm:text-[9px] font-black text-brand-accent uppercase tracking-[.3em] mb-1">Impacto Real</div>
                      <div className="text-3xl sm:text-4xl font-light text-white tracking-tighter">450+ Projetos</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="glass-card p-5 rounded-[20px] sm:rounded-[24px] border-white/10 backdrop-blur-xl bg-white/10 lg:bg-brand-dark/20">
                        <div className="text-[7px] sm:text-[8px] font-black text-white/60 uppercase tracking-widest mb-1">Cidades</div>
                        <div className="text-xl sm:text-2xl font-light text-white tracking-tight">19+</div>
                      </div>
                      <div className="glass-card p-5 rounded-[20px] sm:rounded-[24px] border-white/10 backdrop-blur-xl text-brand-accent bg-white/10 lg:bg-brand-dark/20">
                        <div className="text-[7px] sm:text-[8px] font-black text-white/60 uppercase tracking-widest mb-1">Satisfação</div>
                        <div className="text-xl sm:text-2xl font-light text-white tracking-tight">98%</div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 border-2 border-brand-accent/20 rounded-full border-dashed animate-[spin_20s_linear_infinite]" />
                  <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-brand-accent rounded-3xl rotate-12 blur-2xl opacity-40" />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 sm:py-40 relative bg-premium-ambient overflow-hidden">
          <div className="blueprint-dots opacity-[0.03]" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-24 text-balance">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-accent/10 border border-brand-accent/20 mb-6 sm:mb-8"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                <span className="text-[10px] font-black tracking-[.2em] uppercase text-brand-accent">Exclusividade</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-4xl sm:text-6xl md:text-[90px] font-extrabold tracking-tighter text-brand-text leading-[0.9]"
              >
                Vantagens para o <br /> seu <span className="text-dynamic-accent">Patrimônio</span>
              </motion.h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 max-w-7xl mx-auto">
              {[
                {
                  icon: Zap,
                  title: 'Agilidade nos Processos',
                  desc: 'Inteligência documental para reduzir burocracia e acelerar a emissão de habite-se e alvarás.'
                },
                {
                  icon: Home,
                  title: 'Valorização Imobiliária',
                  desc: 'A regularização correta pode adicionar até 35% ao valor de liquidez do seu imóvel no mercado.'
                },
                {
                  icon: ShieldCheck,
                  title: 'Segurança Técnica',
                  desc: 'Laudos assinados por especialistas que garantem a integridade física e jurídica da edificação.'
                },
                {
                  icon: Globe,
                  title: 'On-demand & Digital',
                  desc: 'Plataforma digital para acompanhamento em tempo real, atendendo demandas em todo o território nacional.'
                }
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="group card-premium-interactive bg-brand-surface/50"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-accent/5 rounded-[24px] flex items-center justify-center text-brand-accent mb-8 group-hover:bg-brand-accent group-hover:text-white transition-all duration-700 group-hover:rotate-6 shadow-sm border border-brand-accent/5 relative z-10">
                    <benefit.icon size={28} className="sm:hidden" strokeWidth={1.5} />
                    <benefit.icon size={36} className="hidden sm:block" strokeWidth={1.5} />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl sm:text-4xl font-extrabold mb-4 text-brand-text tracking-tighter group-hover:text-brand-accent transition-colors duration-300">{benefit.title}</h3>
                    <p className="text-brand-muted text-base sm:text-xl leading-relaxed font-light">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="relative py-24 sm:py-40 overflow-hidden group">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
              alt="Escritório de Engenharia"
              className="w-full h-full object-cover saturate-[0.8] transition-transform duration-1000 scale-105 group-hover:scale-100"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-dark/75 backdrop-blur-[1px]" />
            <div className="blueprint-grid opacity-[0.05] grayscale brightness-0 invert" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-brand-accent/20 border border-brand-accent/30 backdrop-blur-md mb-8 sm:mb-10"
              >
                <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white">Nossos Valores</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 sm:mb-8 tracking-tighter leading-tight"
              >
                No Que <span className="text-brand-accent">Acreditamos</span>
              </motion.h2>

              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-lg sm:text-xl md:text-2xl font-bold text-brand-accent mb-10 sm:mb-12 uppercase tracking-widest text-balance"
              >
                Transparência, Qualidade e Compromisso
              </motion.h3>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="space-y-6 mb-12 sm:mb-16"
              >
                <p className="text-white/70 text-lg sm:text-xl md:text-2xl leading-relaxed font-light">
                  Acreditamos que um serviço de engenharia deve ser claro, eficiente e confiável.
                </p>
                <p className="text-white/60 text-base sm:text-lg md:text-xl leading-relaxed font-light max-w-3xl mx-auto">
                  Nosso compromisso é garantir que cada projeto atenda às normas e expectativas dos nossos clientes, sempre prezando pela ética e excelência.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                <a
                  href="#contato"
                  className="inline-flex items-center gap-3 sm:gap-4 bg-white text-brand-dark px-8 sm:px-12 py-5 sm:py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs sm:text-sm hover:bg-brand-accent hover:text-white transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-black/20"
                >
                  Fale conosco <ArrowRight size={20} />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Service Area Banner - Refined Design */}
        <div className="relative overflow-hidden bg-brand-accent">
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
          
          <div className="container mx-auto px-6 py-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="flex items-center gap-4 text-white/40">
                <div className="h-px w-8 sm:w-16 bg-current" />
                <MapPin size={16} className="animate-bounce" />
                <div className="h-px w-8 sm:w-16 bg-current" />
              </div>
              
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-[0.3em] leading-none">
                Atendemos todo estado do <span className="text-white/90">RJ</span>
              </h3>
              
              <p className="text-white/60 text-[10px] sm:text-xs font-black uppercase tracking-[0.5em] pt-2">
                Excelência em engenharia de ponta a ponta
              </p>
            </motion.div>
          </div>

          {/* Luxury background texture */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          </div>
        </div>

        {/* Contact Section */}
        <section id="contato" className="py-24 sm:py-32 relative bg-brand-surface overflow-hidden border-t border-brand-accent/10">
          <div className="blueprint-dots opacity-[0.05] text-brand-accent" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-16 items-start">
                {/* Left Column: Info */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-12"
                >
                  <div>
                    <div className="text-3xl font-black tracking-tighter text-brand-dark mb-8">
                      TMC<span className="text-brand-accent">Engenharia</span>
                    </div>
                    <div className="w-full h-px bg-brand-accent/10 mb-8" />
                    <h3 className="text-2xl sm:text-3xl font-bold text-brand-text mb-6 leading-tight">
                      Entre em contato para <span className="text-brand-accent">agendar vistoria</span> ou fazer <span className="text-brand-accent">simulação gratuita de INSS de obra</span>.
                    </h3>
                  </div>

                  <div className="space-y-8">
                    <a
                      href="https://wa.me/5522992436434"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-6 group cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all shadow-sm">
                        <Phone size={24} />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted mb-1">WhatsApp</div>
                        <div className="text-xl text-brand-text font-bold group-hover:text-brand-accent transition-colors">(22) 99243-6434</div>
                      </div>
                    </a>

                    <a
                      href="https://www.instagram.com/engenhariatmc/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-6 group cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all shadow-sm">
                        <Instagram size={24} />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted mb-1">Instagram</div>
                        <div className="text-xl text-brand-text font-bold group-hover:text-brand-accent transition-colors">@engenhariatmc</div>
                      </div>
                    </a>

                    <a
                      href="mailto:tmcsolucoesengenharia@gmail.com"
                      className="flex items-center gap-6 group cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all shadow-sm">
                        <Mail size={24} />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted mb-1">E-mail</div>
                        <div className="text-xl text-brand-text font-bold group-hover:text-brand-accent transition-colors break-all">tmcsolucoesengenharia@gmail.com</div>
                      </div>
                    </a>

                    <div className="flex items-center gap-6 group">
                      <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent shadow-sm">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted mb-1">Endereço</div>
                        <div className="text-lg text-brand-text font-medium leading-tight">
                          Rua Teixeira de Gouveia, 1169, <br />
                          Sala 208, Centro, Macaé/RJ
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Right Column: Form */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 sm:p-12 rounded-[40px] border border-brand-accent/10 shadow-2xl"
                >
                  <h4 className="text-3xl font-black text-brand-text mb-8 uppercase tracking-tighter">
                    Fale <span className="text-brand-accent">conosco</span>
                  </h4>
                  <ContactForm />
                </motion.div>
              </div>
            </div>
          </div>


        </section>

        {/* Footer */}
      </main>

      <footer className="py-20 bg-brand-dark overflow-hidden relative">
        <div className="blueprint-grid opacity-[0.05] grayscale brightness-0 invert" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-start justify-between gap-16 mb-20">
            <div className="max-w-sm">
              <div className="text-3xl font-black tracking-tighter text-white mb-6">
                TMC<span className="text-brand-accent">Engenharia</span>
              </div>
              <p className="text-white/40 text-lg font-light leading-relaxed">
                Referencia técnica no RJ e em todo o brasil, inteligencia e agilidade para o mercado imobiliario
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 md:gap-20">
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-8">Navegação</h5>
                <ul className="space-y-4">
                  <li><a href="#inicio" className="text-sm text-white/60 hover:text-white transition-colors">Início</a></li>
                  <li><a href="#servicos" className="text-sm text-white/60 hover:text-white transition-colors">Serviços</a></li>
                  <li><a href="#quemsomos" className="text-sm text-white/60 hover:text-white transition-colors">Sobre</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-8">Oficial</h5>
                <ul className="space-y-4">
                  <li><a href="#contato" className="text-sm text-white/60 hover:text-white transition-colors">Contato</a></li>
                  <li><span className="text-sm text-white/40">Macaé, RJ</span></li>
                </ul>
              </div>
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-8">Social</h5>
                <ul className="space-y-4">
                  <li>
                    <a
                      href="https://www.instagram.com/engenhariatmc/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/60 hover:text-white transition-all flex items-center gap-3 group/inst"
                    >
                      <Instagram size={18} className="text-white/40 group-hover/inst:text-brand-accent transition-colors" />
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">
              &copy; 2024 TMC Engenharia. All rights reserved. Creative Direction.
            </p>
            <div className="flex gap-10">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </div>
  );
}
