import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import nl from "./translations/nl";
import en from "./translations/en";
import fr from "./translations/fr";
import pt from "./translations/pt";
import es from "./translations/es";

export type Language = "NL" | "EN" | "FR" | "PT" | "ES";
export const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "NL", label: "Nederlands", flag: "🇳🇱" },
  { code: "EN", label: "English", flag: "🇬🇧" },
  { code: "FR", label: "Français", flag: "🇫🇷" },
  { code: "PT", label: "Português", flag: "🇵🇹" },
  { code: "ES", label: "Español", flag: "🇪🇸" },
];

const dictionaries = { NL: nl, EN: en, FR: fr, PT: pt, ES: es } as const;
export const translations = dictionaries;

type LanguageContextType = { language: Language; setLanguage: (lang: Language) => void; t: (key: string) => string };
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const SEO: Record<Language, { title: string; description: string; lang: string; locale: string }> = {
  NL: { title: "Rijschool Rotterdam & Rijnmond | Rijschool No Limit", description: "Rijschool No Limit in Rotterdam Rijnmond. Proefles €50. Persoonlijke autorijles met Benno Coco in 5 talen.", lang: "nl", locale: "nl_NL" },
  EN: { title: "Driving School Rotterdam | Rijschool No Limit", description: "Personal driving lessons in Rotterdam and Rijnmond with Benno Coco. Trial lesson €50. Lessons available in 5 languages.", lang: "en", locale: "en_GB" },
  FR: { title: "Auto-école Rotterdam | Rijschool No Limit", description: "Cours de conduite personnalisés à Rotterdam et Rijnmond avec Benno Coco. Leçon d’essai 50 €. Cours en 5 langues.", lang: "fr", locale: "fr_FR" },
  PT: { title: "Escola de condução Rotterdam | Rijschool No Limit", description: "Aulas de condução personalizadas em Rotterdam e Rijnmond com Benno Coco. Aula experimental €50. Aulas em 5 idiomas.", lang: "pt", locale: "pt_PT" },
  ES: { title: "Autoescuela Rotterdam | Rijschool No Limit", description: "Clases de conducción personalizadas en Rotterdam y Rijnmond con Benno Coco. Clase de prueba €50. Clases en 5 idiomas.", lang: "es", locale: "es_ES" },
};

function languageFromUrl(): Language {
  if (typeof window === "undefined") return "NL";
  const raw = new URLSearchParams(window.location.search).get("lang")?.toUpperCase();
  return (["NL", "EN", "FR", "PT", "ES"] as Language[]).includes(raw as Language) ? (raw as Language) : "NL";
}

function setMeta(selector: string, attribute: string, value: string) {
  document.querySelector(selector)?.setAttribute(attribute, value);
}

function syncSeo(language: Language) {
  if (typeof document === "undefined" || typeof window === "undefined") return;
  const seo = SEO[language];
  const url = language === "NL" ? "https://rijschoolnolimit.nl/" : `https://rijschoolnolimit.nl/?lang=${seo.lang}`;
  document.documentElement.lang = seo.lang;
  document.title = seo.title;
  setMeta('meta[name="description"]', "content", seo.description);
  setMeta('meta[property="og:title"]', "content", seo.title);
  setMeta('meta[property="og:description"]', "content", seo.description);
  setMeta('meta[property="og:url"]', "content", url);
  setMeta('meta[property="og:locale"]', "content", seo.locale);
  setMeta('meta[name="twitter:title"]', "content", seo.title);
  setMeta('meta[name="twitter:description"]', "content", seo.description);
  setMeta('link[rel="canonical"]', "href", url);
}

function removePublicStreetAddress(language: Language) {
  if (typeof document === "undefined") return;
  const replacement = dictionaries[language].tbarRegionDesc;
  const exact = "Kwartelstraat 11 B, 3082 NE Rotterdam";
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  for (const node of nodes) {
    if (node.nodeValue?.includes(exact)) node.nodeValue = node.nodeValue.replace(exact, replacement);
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => languageFromUrl());

  useEffect(() => {
    syncSeo(language);
    removePublicStreetAddress(language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (lang === "NL") url.searchParams.delete("lang");
      else url.searchParams.set("lang", SEO[lang].lang);
      window.history.replaceState({}, "", url.pathname + url.search + url.hash);
    }
  };

  const t = (key: string): string => {
    const selected = dictionaries[language] as Record<string, string>;
    const fallback = dictionaries.EN as Record<string, string>;
    return selected[key] ?? fallback[key] ?? key;
  };

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
