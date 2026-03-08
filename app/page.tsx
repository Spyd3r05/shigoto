import Navbar from "./components/navbar"
import Hero from "./components/hero"
import Searchbar from "./components/searchbar"
const Home = () => {
  return (
    <div className="min-h-screen pb-24 text-slate-800">
      <Navbar />
      <Hero />
      <Searchbar />
    </div>
  )
}

export default Home