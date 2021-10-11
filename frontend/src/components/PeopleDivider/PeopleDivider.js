import './PeopleDivider.css';

// Libraries
import { motion } from 'framer-motion';

const PeopleDivider = () => {
  return (
    <motion.div
      className="people-divider"
      variants={{
        hidden: { y: 32, opacity: 0 },
        show: { y: 0, opacity: 1 },
      }}
    >
      <hr />
    </motion.div>
  );
}

export default PeopleDivider;
