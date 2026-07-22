"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BootSequence from "@/components/BootSequence";
import Cursor from "@/components/Cursor";
import Background from "@/components/Background";
import Nav from "@/components/Nav";
import StatusBar from "@/components/StatusBar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import Awards from "@/components/Awards";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ProfileCard from "@/components/ProfileCard";

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <Cursor />
      <BootSequence onDone={() => setBooted(true)} />

      <AnimatePresence>
        {booted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Background />
            <Nav />
            <StatusBar />
            <main className="relative z-10 pb-7">
              <Hero />
              <ProfileCard />
              <About />
              <Projects />
              <Skills />
              <Timeline />
              <Awards />
              <Contact />
              <Footer />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
