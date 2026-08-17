import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#081A33] text-gray-400 py-12 pb-28 sm:pb-12 border-t border-white/5" data-testid="footer">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <div className="flex items-center text-xl font-display font-bold tracking-wider text-white mb-1">
            <span>N</span><svg className="w-5 h-5 mx-[2px] text-[#2563EB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><path d="M12 2v7M12 15v7M2 12h7M15 12h7"/><path d="m4.9 4.9 5 5M14.1 14.1l5 5M19.1 4.9l-5 5M9.9 14.1l-5 5"/></svg><span>LIMIT</span>
          </div>
          <span className="text-[10px] font-sans tracking-[0.2em] text-[#2563EB]">RIJSCHOOL</span>
        </div>
        <div className="flex space-x-6 text-sm mb-6 md:mb-0">
          <a href="#home" className="hover:text-[#2563EB] transition-colors">{t("navHome")}</a>
          <a href="#about" className="hover:text-[#2563EB] transition-colors">{t("navAbout")}</a>
          <a href="#pricing" className="hover:text-[#2563EB] transition-colors">{t("navPricing")}</a>
          <a href="#contact" className="hover:text-[#2563EB] transition-colors">{t("navContact")}</a>
        </div>
        <div className="text-sm">&copy; {new Date().getFullYear()} Rijschool No Limit. KvK 83089004. {t("footerRights")}</div>
      </div>
    </footer>
  );
}
