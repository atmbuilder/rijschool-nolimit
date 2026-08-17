import { useState, useEffect } from "react";
import { useLanguage, LANGUAGES, Language } from "@/context/LanguageContext";

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ["home", "services", "about", "pricing", "contact"];
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    setMobileOpen(false);
  };

  const navLinks = [
    { id: "services", label: t("navServices") },
    { id: "about", label: t("navAbout") },
    { id: "pricing", label: t("navPricing") },
    { id: "contact", label: t("navContact") },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      <div className="h-[36px] bg-[#F8FAFC] border-b border-slate-200 flex items-center justify-center px-4">
        <div className="flex space-x-6 text-xs font-bold tracking-widest text-slate-600">
          {LANGUAGES.map((lang) => (
            <button key={lang.code} onClick={() => setLanguage(lang.code as Language)} className={`transition-colors flex items-center gap-1.5 hover:text-[#2563EB] ${language === lang.code ? "text-[#2563EB] border-b border-[#2563EB]" : ""}`}>
              <span>{lang.flag}</span><span>{lang.code}</span>
            </button>
          ))}
        </div>
      </div>
      <nav className={`transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 py-4" : "bg-white/85 backdrop-blur-md border-b border-slate-200 py-4"}`} data-testid="navbar">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex flex-col items-center cursor-pointer flex-shrink-0" onClick={() => scrollTo("home")} data-testid="link-logo">
            <div className="flex items-center text-2xl font-display font-bold tracking-wider text-[#081A33]">
              <span>N</span><svg className="w-6 h-6 mx-[2px] text-[#2563EB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><path d="M12 2v7M12 15v7M2 12h7M15 12h7"/><path d="m4.9 4.9 5 5M14.1 14.1l5 5M19.1 4.9l-5 5M9.9 14.1l-5 5"/></svg><span>LIMIT</span>
            </div>
            <span className="text-[10px] font-sans tracking-[0.2em] text-[#2563EB]">RIJSCHOOL</span>
          </div>
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => <button key={link.id} onClick={() => scrollTo(link.id)} className={`text-xs font-sans font-bold tracking-widest transition-colors uppercase ${activeSection === link.id ? "text-[#2563EB]" : "text-slate-700 hover:text-[#081A33]"}`} data-testid={`link-nav-${link.id}`}>{link.label}</button>)}
            <button onClick={() => scrollTo("pricing")} className="bg-[#2563EB] hover:bg-blue-700 text-white font-bold tracking-wide px-5 py-2.5 rounded-md text-sm transition-colors" data-testid="btn-nav-booktrial">{t("ctaBookTrial")}</button>
          </div>
          <button className="lg:hidden text-[#081A33] p-2" onClick={() => setMobileOpen(v => !v)} data-testid="button-mobile-menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">{mobileOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>}</svg>
          </button>
        </div>
        {mobileOpen && <div className="lg:hidden bg-white border-t border-slate-200 px-6 py-4 absolute top-full left-0 right-0 shadow-lg"><div className="flex flex-col space-y-4">{navLinks.map((link) => <button key={link.id} onClick={() => scrollTo(link.id)} className={`text-left text-sm font-bold tracking-widest uppercase transition-colors py-2 ${activeSection === link.id ? "text-[#2563EB]" : "text-slate-700 hover:text-[#081A33]"}`} data-testid={`link-nav-mobile-${link.id}`}>{link.label}</button>)}<div className="pt-4 mt-2 border-t border-slate-200"><button onClick={() => scrollTo("pricing")} className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold tracking-wide py-3 rounded-md text-sm transition-colors" data-testid="btn-nav-mobile-booktrial">{t("ctaBookTrial")}</button></div></div></div>}
      </nav>
    </div>
  );
}
