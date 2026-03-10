import { defaultOpportunities } from "./data/opportunities";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Footer from "./components/footer";
import OpportunitySection from "./components/opportunity_section";

// This is now a proper server component.
// You could fetch data here from a DB/API instead of importing static data.
const Home = () => {
  return (
    <div className="min-h-screen text-slate-800">
      <Navbar />
      <Hero />
      {/* Pass server-fetched data DOWN into the client boundary */}
      <OpportunitySection initialOpportunities={defaultOpportunities} />
      <Footer />
    </div>
  );
};

export default Home;
