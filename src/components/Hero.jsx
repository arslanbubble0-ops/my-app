import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Hero = ({ openModal }) => {
  const [shapes, setShapes] = useState([]);

  // Generate random shapes on mount
  useEffect(() => {
    const generatedShapes = Array.from({ length: 10 }).map((_, i) => {
      const size = Math.floor(Math.random() * 60) + 20; // 20px - 80px
      return {
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size,
        shapeType: Math.random() > 0.5 ? "circle" : "square",
        color: Math.random() > 0.5 ? "bg-accent-500/30" : "bg-white/20",
      };
    });
    setShapes(generatedShapes);
  }, []);

  // Random motion generator
  const randomMotion = () => ({
    x: Math.random() * window.innerWidth - window.innerWidth / 2,
    y: Math.random() * window.innerHeight - window.innerHeight / 2,
    rotate: Math.random() * 360,
    transition: {
      duration: Math.random() * 6 + 4, // 4s - 10s
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  });

  // Parent stagger animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-700 to-primary-900 text-white overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Floating random shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {shapes.map((shape) => (
          <motion.div
            key={shape.id}
            className={`${shape.color} absolute`}
            style={{
              top: shape.y,
              left: shape.x,
              width: shape.size,
              height: shape.size,
              borderRadius: shape.shapeType === "circle" ? "50%" : "8px",
            }}
            animate={randomMotion()}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        className="container relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Left side - text */}
        <div className="text-left">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            variants={itemVariants}
          >
            Reseller Hosting{" "}
            <span className="text-accent-400">Made Easy</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl max-w-lg mb-8"
            variants={itemVariants}
          >
            Start your own hosting business with our powerful white label
            reseller hosting. Everything you need to manage your clients and
            grow your business.
          </motion.p>

          <motion.div variants={itemVariants}>
            <button
              onClick={() => openModal("plan", "Professional")}
              className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Started Now
            </button>
          </motion.div>
        </div>

        {/* Right side - image with wave animation */}
        <motion.div
          className="flex justify-center relative"
          whileHover={{
            rotate: [0, -3, 3, -2, 2, 0], // left-right wave
            transition: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <img
src="./image (2).png" // apni image ka path yahan do
            alt="Hero"
            className="w-80 md:w-[400px] lg:w-[500px] rounded-xl shadow-2xl"
          />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <i className="fas fa-chevron-down text-white/60 text-2xl"></i>
      </motion.div>
    </section>
  );
};

export default Hero;
