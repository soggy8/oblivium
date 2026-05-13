import { Contact } from "@/components/Contact";
import { Credibility } from "@/components/Credibility";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { SiteHeader } from "@/components/SiteHeader";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <main id="top" className="relative overflow-x-clip bg-ink text-parchment">
      <SiteHeader />
      <Hero />
      <Credibility />
      <Services />
      <Manifesto />
      <Work />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
