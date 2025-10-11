import { motion } from "framer-motion";

const About = () => {
    return (
        <motion.div
            className="flex justify-center items-center mb-8"
            id="about"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <motion.div
                className="text-[#f5f5dc] rounded-2xl p-8 max-w-6xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, staggerChildren: 0.2 }}
                viewport={{ once: true }}
            >
                <motion.h1
                    className="text-3xl font-bold text-center mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    About Bookiverse
                </motion.h1>
                <motion.p
                    className="mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Welcome to <span className="text-[#e2b895] font-semibold">Bookiverse</span>,
                    your cozy online destination for stories, knowledge, and imagination.
                    We believe that books have the power to inspire, entertain, and transform lives.
                </motion.p>
                <motion.p
                    className="mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    Our mission is simple: to connect readers with the stories and authors
                    they love. Whether you’re searching for timeless classics, modern bestsellers,
                    or hidden literary gems, we’ve got something for everyone.
                </motion.p>
                <motion.p
                    className="mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    Beyond just books, we’re building a community of readers and authors.
                    From personalized recommendations to author highlights,
                    our goal is to make reading an experience worth sharing.
                </motion.p>
            </motion.div>
        </motion.div>
    );
};

export default About;
