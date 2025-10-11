import { motion } from "framer-motion";
import bg3 from "../../assets/bg3.webp";

const HeroSection = () => {
    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-15 text-white px-4 py-8">
            <motion.div
                className="text-center md:text-left max-w-xl"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
            >
                <h1 className="text-3xl md:text-5xl font-bold">
                    The <span className="text-[#D7A86E]">Bookiverse Awaits</span>, Start Your Journey
                </h1>
                <p className="text-lg md:text-2xl mt-4 font-semibold">
                    Your Next <span className="text-[#D7A86E]">Great Read</span> is Orbiting Right Here, Grab It.
                </p>
            </motion.div>

            <motion.img
                src={bg3}
                alt="Bookiverse"
                className="w-full max-w-md md:max-w-lg h-auto object-cover rounded-2xl"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true, amount: 0.3 }}
            />
        </div>
    );
};

export default HeroSection;
