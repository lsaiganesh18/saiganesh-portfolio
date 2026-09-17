import { useState } from 'react';
import { CursorGlow } from '@/components/CursorGlow';
import { ScrollProgress } from '@/components/ScrollProgress';
import { IntroLoader } from '@/components/IntroLoader';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Process } from '@/components/sections/Process';
import { Services } from '@/components/sections/Services';
import { CreativeInterlude } from '@/components/sections/CreativeInterlude';
import { Contact } from '@/components/sections/Contact';

function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <CursorGlow />
      <ScrollProgress />
      <Navigation visible={introDone} />
      {!introDone && <IntroLoader onComplete={() => setIntroDone(true)} />}

      <main
        className="relative bg-[var(--bg)]"
        style={{
          opacity: introDone ? 1 : 0,
          transition: 'opacity 1s ease',
        }}
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Process />
        <Services />
        <CreativeInterlude />
        <Contact />
      </main>
    </>
  );
}

export default App;
