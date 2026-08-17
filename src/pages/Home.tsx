import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Car, HeartHandshake, Globe, Clock, CheckCircle2, Phone, Mail, MapPin, Building2, ChevronDown, Star, CreditCard } from "lucide-react";

const WA = "https://wa.me/31628295650";
const fade = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: .55 } } };

function FAQSection() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [1,2,3,4,5].map(n => ({ q: t(`faqQ${n}` as any), a: t(`faqA${n}` as any) }));
  return <section id="faq" className="py-24 bg-white border-t border-slate-200"><div className="container mx-auto px-6 max-w-3xl"><div className="text-center mb-14"><div className="text-[#2563EB] font-bold tracking-wider text-xs uppercase mb-4">{t("faqLabel")}</div><h2 className="text-4xl md:text-5xl font-display font-bold text-[#0F172A] uppercase">{t("faqHeading")}</h2></div><div className="space-y-3">{faqs.map((f,i)=><div key={i} className="rounded-xl border border-slate-200 overflow-hidden"><button onClick={()=>setOpen(open===i?null:i)} className="w-full flex items-center justify-between px-6 py-5 text-left"><span className="font-bold text-[#081A33]">{f.q}</span><ChevronDown className={`w-5 h-5 transition-transform ${open===i?"rotate-180 text-[#2563EB]":"text-slate-400"}`}/></button><AnimatePresence>{open===i&&<motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}><p className="px-6 pb-5 text-sm text-slate-600 leading-relaxed">{f.a}</p></motion.div>}</AnimatePresence></div>)}</div></div></section>;
}

export default function Home() {
  const { t } = useLanguage();
  const services = [
    [Car,t("svc1Title"),t("svc1Desc")],[HeartHandshake,t("svc2Title"),t("svc2Desc")],[Globe,t("svc3Title"),t("svc3Desc")],[Clock,t("svc4Title"),t("svc4Desc")]
  ] as const;
  const packages = [
    {name:t("pkgTrial"),price:"€50",sub:"50 min"},
    {name:t("pkg15Blocks"),price:"€1.425",sub:"15 × 90 min"},
    {name:t("pkg22Blocks"),price:"€2.090",sub:"22 × 90 min",popular:true},
    {name:t("pkg26Blocks"),price:"€2.470",sub:"26 × 90 min"},
    {name:t("pkgInterim"),price:"€275",sub:"CBR"},
    {name:t("pkgExam"),price:"€310",sub:"CBR"}
  ];
  return <div className="w-full flex flex-col min-h-screen pt-[100px]">
    <section id="home" className="relative min-h-[calc(100vh-100px)] flex items-center py-16 overflow-hidden bg-white">
      <div className="absolute inset-0 opacity-20 md:opacity-30"><img src="https://website-assets-manager.replit.app/hero-bg.png" alt="Rotterdam skyline" className="w-full h-full object-cover grayscale"/><div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"/></div>
      <div className="container relative z-20 mx-auto px-6 grid lg:grid-cols-[1.15fr_.85fr] items-center gap-10">
        <motion.div initial="hidden" animate="visible" variants={{visible:{transition:{staggerChildren:.09}}}}>
          <motion.div variants={fade} className="mb-4"><span className="inline-block text-[#2563EB] text-xs font-bold tracking-[.2em] uppercase border-l-2 border-[#2563EB] pl-3">{t("heroEyebrow")}</span></motion.div>
          <motion.h1 variants={fade} className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-bold uppercase leading-[.9] tracking-tight text-[#081A33] mb-6">{t("heroHeadline1")}<br/><span className="text-[#2563EB]">{t("heroHeadline2")}</span></motion.h1>
          <motion.p variants={fade} className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed mb-3">{t("heroSubtext")}</motion.p>
          <motion.p variants={fade} className="text-xs text-slate-400 max-w-xl leading-relaxed mb-7">{t("heroServiceArea" as any)}</motion.p>
          <motion.div variants={fade} className="grid sm:grid-cols-2 gap-3 mb-8">{["heroBullet1","heroBullet2","heroBullet3","heroBullet4","heroBullet5"].map(k=><div key={k} className="flex gap-3 items-center text-sm font-medium text-slate-700"><CheckCircle2 className="w-5 h-5 text-[#2563EB]"/>{t(k as any)}</div>)}</motion.div>
          <motion.div variants={fade} className="flex flex-col sm:flex-row gap-3"><button onClick={()=>document.getElementById("pricing")?.scrollIntoView({behavior:"smooth"})} className="bg-[#2563EB] hover:bg-blue-700 text-white font-bold px-7 py-4 rounded-md">{t("btnBookTrialLesson")}</button><a href={WA} target="_blank" rel="noreferrer" className="border border-slate-300 bg-white hover:border-[#25D366] font-bold text-[#081A33] px-7 py-4 rounded-md text-center">{t("btnWhatsappUs")}</a></motion.div>
        </motion.div>
        <motion.div initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} transition={{duration:.7}} className="relative hidden lg:block"><img src="https://website-assets-manager.replit.app/images/benno-about.webp" alt="Benno Coco, rijinstructeur Rijschool No Limit" className="w-full max-w-md mx-auto rounded-2xl shadow-2xl object-cover"/><div className="absolute -bottom-5 -left-5 bg-[#081A33] text-white px-5 py-4 rounded-xl shadow-xl"><div className="flex items-center gap-2 text-amber-400 mb-1">★★★★★</div><div className="text-sm font-bold">5.0 Google</div><div className="text-xs text-slate-300">{t("basedOnReviews")}</div></div></motion.div>
      </div>
    </section>

    <section className="bg-[#081A33] text-white py-6"><div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6">{[[Globe,t("tbarLangsTitle"),t("tbarLangsDesc")],[MapPin,t("tbarRegionTitle"),t("tbarRegionDesc")],[Clock,t("tbarFlexTitle"),t("tbarFlexDesc")],[CreditCard,t("tbarPayTitle"),t("tbarPayDesc")]].map(([Icon,title,desc]:any,i)=><div key={i} className="flex items-center gap-3"><Icon className="w-6 h-6 text-[#2563EB]"/><div><div className="font-bold text-sm">{title}</div><div className="text-xs text-slate-400">{desc}</div></div></div>)}</div></section>

    <section id="services" className="py-24 bg-[#F8FAFC]"><div className="container mx-auto px-6"><div className="text-center mb-14"><div className="text-[#2563EB] font-bold tracking-wider text-xs uppercase mb-3">{t("servicesLabel")}</div><h2 className="text-4xl md:text-5xl font-display font-bold text-[#081A33]">{t("servicesHeading")}</h2></div><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">{services.map(([Icon,title,desc],i)=><motion.div key={i} initial="hidden" whileInView="visible" viewport={{once:true}} variants={fade} className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm"><div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5"><Icon className="w-6 h-6 text-[#2563EB]"/></div><h3 className="text-xl font-display font-bold text-[#081A33] mb-3">{title}</h3><p className="text-sm leading-relaxed text-slate-600">{desc}</p></motion.div>)}</div></div></section>

    <section className="py-20 bg-white"><div className="container mx-auto px-6 text-center max-w-4xl"><div className="text-5xl md:text-7xl font-display font-bold italic text-[#081A33]">“{t("statementQuote")}”</div><p className="mt-6 text-slate-600 text-lg">{t("statementSub")}</p></div></section>

    <section id="about" className="py-24 bg-[#081A33] text-white"><div className="container mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center"><motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={fade}><img src="https://website-assets-manager.replit.app/images/benno-about.webp" alt="Benno Coco" className="rounded-2xl w-full max-w-lg mx-auto shadow-2xl"/></motion.div><motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={fade}><div className="text-[#60A5FA] font-bold tracking-wider text-xs mb-4">{t("aboutLabel")}</div><h2 className="text-4xl md:text-5xl font-display font-bold uppercase mb-6">Benno Coco</h2><div className="text-[#60A5FA] font-semibold mb-5">{t("aboutRole")}</div><p className="text-slate-300 leading-relaxed mb-5">{t("aboutP1")}</p><p className="text-slate-300 leading-relaxed">{t("aboutP2")}</p></motion.div></div></section>

    <section id="pricing" className="py-24 bg-[#F8FAFC]"><div className="container mx-auto px-6"><div className="text-center mb-14"><div className="text-[#2563EB] font-bold tracking-wider text-xs mb-3">{t("pricingLabel")}</div><h2 className="text-4xl md:text-5xl font-display font-bold text-[#081A33]">{t("pricingHeading")}</h2></div><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">{packages.map((p,i)=><div key={i} className={`relative bg-white rounded-2xl p-7 border shadow-sm ${p.popular?"border-[#2563EB] ring-2 ring-blue-100":"border-slate-200"}`}>{p.popular&&<div className="absolute -top-3 left-6 bg-[#2563EB] text-white text-[10px] font-bold tracking-wider px-3 py-1 rounded-full">{t("mostPopular")}</div>}<h3 className="font-display font-bold text-2xl text-[#081A33] mt-2">{p.name}</h3><div className="text-slate-500 text-sm mt-1">{p.sub}</div><div className="text-4xl font-display font-bold text-[#081A33] my-6">{p.price}</div><a href={WA} target="_blank" rel="noreferrer" className="block text-center bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-3 rounded-md">{t("btnRequest")}</a></div>)}</div><p className="text-center text-xs text-slate-500 mt-7">{t("pricingDisclaimer")}</p></div></section>

    <section className="py-20 bg-[#2563EB] text-white"><div className="container mx-auto px-6 text-center"><h2 className="text-4xl md:text-5xl font-display font-bold mb-4">{t("ctaSectionHeading")}</h2><p className="text-blue-100 mb-7">{t("ctaSectionText")}</p><a href={WA} target="_blank" rel="noreferrer" className="inline-block bg-white text-[#081A33] font-bold px-8 py-4 rounded-md">{t("ctaWhatsapp")}</a></div></section>

    <FAQSection />

    <section id="contact" className="py-24 bg-white"><div className="container mx-auto px-6"><div className="text-center mb-14"><div className="text-[#2563EB] font-bold tracking-wider text-xs mb-3">{t("contactLabel")}</div><h2 className="text-4xl md:text-5xl font-display font-bold text-[#081A33]">{t("contactHeading")}</h2></div><div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto"><div className="lg:col-span-1"><img src="https://website-assets-manager.replit.app/images/benno-contact.webp" alt="Benno Coco" className="rounded-2xl w-full h-full min-h-80 object-cover"/></div><div className="p-8 rounded-2xl border border-slate-200 space-y-6">{[[Phone,t("contactPhone"),"06 28 29 56 50"],[Mail,t("contactEmail"),"info@rijschoolnolimit.nl"],[MapPin,t("contactLocation"),"Kwartelstraat 11 B, 3082 NE Rotterdam"],[Clock,t("contactHoursLabel"),t("contactHoursValue")],[Building2,"KvK","83089004"]].map(([Icon,title,value]:any,i)=><div key={i} className="flex items-start gap-4"><Icon className="w-6 h-6 text-[#2563EB] mt-1"/><div><div className="text-sm font-bold text-slate-500 mb-1">{title}</div><div className="text-[#0F172A] font-medium">{value}</div></div></div>)}</div><div className="p-8 bg-[#F8FAFC] border border-slate-200 rounded-2xl"><h3 className="text-xl font-display font-bold text-[#081A33] uppercase mb-6">Waarom No Limit?</h3><div className="space-y-4">{["trustBadge1","trustBadge2","trustBadge3","trustBadge4","trustBadge5"].map(k=><div key={k} className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 text-[#2563EB]"/><span className="text-slate-600 font-medium">{t(k as any)}</span></div>)}</div><a href={WA} target="_blank" rel="noreferrer" className="mt-8 block bg-[#25D366] text-white text-center font-bold py-3 rounded-md">{t("stickyWhatsapp")}</a></div></div></div></section>
  </div>;
}
