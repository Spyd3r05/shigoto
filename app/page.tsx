import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Searchbar from "./components/searchbar";
import Filters from "./components/filters";
import OpportunityGrid from "./components/opportunity_grid";

const Home = () => {
  return (
    <div className="min-h-screen pb-24 text-slate-800">
      <Navbar />
      <Hero />
      <Searchbar />
      <Filters />
      <OpportunityGrid />
    </div>
  );
};

export default Home;
