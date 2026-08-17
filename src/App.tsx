import { LanguageProvider } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import Home from "@/pages/Home";

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background flex flex-col font-sans">
        <Navbar />
        <main id="main-content" className="flex-1">
          <Home />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </LanguageProvider>
  );
}

export default App;
