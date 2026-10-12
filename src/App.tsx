import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ScrollingBanner } from '@/components/ScrollingBanner';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { Services } from '@/components/Services';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

function App() {
  // This hook watches for elements with the `reveal` class and
  // animates them into view as the user scrolls.
  const containerRef = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={containerRef} className="min-h-screen bg-secondary-950">
      <Navbar />
      <main>
        <Hero />
        <ScrollingBanner />
        <About />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
