const fs = require('fs');
const path = require('path');

const scenes = [
  'Scene1_Cover', 
  'Scene2_Envelope', 
  'Scene3_Invitation', 
  'Scene4_Portrait', 
  'Scene5_LoveStory', 
  'Scene6_Events', 
  'Scene7_Venue', 
  'Scene8_Countdown', 
  'Scene10_ThankYou'
];

const dir = path.join(__dirname, '..', 'src', 'components', 'scenes');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

scenes.forEach(scene => {
  const content = `import { motion } from 'framer-motion';

export default function ${scene}({ onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onNext}
      className="absolute inset-0 flex items-center justify-center cursor-pointer bg-ivory text-dark"
    >
      <h1 className="text-4xl font-serif">${scene}</h1>
    </motion.div>
  );
}
`;
  fs.writeFileSync(path.join(dir, `${scene}.jsx`), content);
});

console.log('Placeholders created');
