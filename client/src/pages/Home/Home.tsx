import About from "../../components/About/About"
import Footer from "../../components/Footer/Footer"
import HeroSection from "../../components/HeroSection/HeroSection"
import Navbar from "../../components/Navbar/Navbar"
import DisplayBooks from "../DisplayBooks/DisplayBooks"


const Home = () => {

    return (
        <div className="h-full w-full">
            <Navbar />
            <HeroSection />
            <About />
            <DisplayBooks />
            <div className="mt-auto w-full">
                <Footer />
            </div>
        </div>
    )
}

export default Home