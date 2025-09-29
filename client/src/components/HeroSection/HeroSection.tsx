import bg3 from "../../assets/bg3.webp"

const HeroSection = () => {
    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-15 text-white px-4 py-8">
            <div className="text-center md:text-left max-w-xl">
                <h1 className="text-3xl md:text-5xl font-bold">
                    The <span className="text-[#D7A86E]">Bookiverse Awaits</span>, Start Your Journey
                </h1>
                <p className="text-lg md:text-2xl mt-4 font-semibold">
                    Your Next <span className="text-[#D7A86E]">Great Read</span> is Orbiting Right Here, Grab It.
                </p>
            </div>

            <img
                src={bg3}
                alt="Bookiverse"
                className="w-full max-w-md md:max-w-lg h-auto object-cover rounded-2xl"
            />
        </div>
    )
}

export default HeroSection
