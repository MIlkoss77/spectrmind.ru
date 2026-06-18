import Navigation from '../components/Navigation';
import CookieBanner from '../components/CookieBanner';
import Hero from '../sections/Hero';
import Problem from '../sections/Problem';
import Method from '../sections/Method';
import Protocols from '../sections/Protocols';
import Pricing from '../sections/Pricing';
import Testimonials from '../sections/Testimonials';
import FAQ from '../sections/FAQ';
import FinalCTA from '../sections/FinalCTA';
import Footer from '../sections/Footer';

export default function Home() {
  return (
    <div className="relative bg-deep-space min-h-screen film-grain">
      <Navigation />
      <main>
        <Hero />
        <Problem />
        <Method />
        <Protocols />
        <Pricing />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
