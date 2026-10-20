import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Scene1_Envelope from "./components/scenes/Scene1_Envelope";
import ScrollInvitation from "./components/ScrollInvitation";

function App() {
  const [scene, setScene] = useState('envelope'); // 'envelope' | 'revealing' | 'scroll'

  const handleDoorOpen = () => {
    // First show the scroll page BEHIND the opening doors
    setScene('revealing');
  };

  const handleRevealComplete = () => {
    // After doors finish opening, remove them entirely
    setScene('scroll');
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#faf9f6] relative">
      {/* The ScrollInvitation renders BEHIND the doors during reveal */}
      {(scene === 'revealing' || scene === 'scroll') && (
        <ScrollInvitation
          key="scroll"
          onRestart={() => setScene('envelope')}
        />
      )}

      {/* The doors overlay on top — they open to reveal the scroll page behind */}
      <AnimatePresence>
        {(scene === 'envelope' || scene === 'revealing') && (
          <Scene1_Envelope
            key="envelope"
            onNext={handleDoorOpen}
            isRevealing={scene === 'revealing'}
            onRevealComplete={handleRevealComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
