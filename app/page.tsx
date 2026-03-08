import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Searchbar from "./components/searchbar";
import Filters from "./components/filters";
import OpportunityGrid from "./components/opportunity_grid";
import Footer from "./components/footer";

const Home = () => {
  return (
    <div className="min-h-screen text-slate-800">
      <Navbar />
      <Hero />
      <Searchbar />
      <Filters />
      <OpportunityGrid />
      <Footer />
    </div>
  );
};

export default Home;
