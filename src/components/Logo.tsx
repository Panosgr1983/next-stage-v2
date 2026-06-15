import React from 'react';
import { motion } from 'framer-motion';

const Logo: React.FC = () => {
  return (
    <a href="#home" className="flex items-center group">
      <motion.img
        src="/images/nextstage-logo.webp"
        alt="NextStage"
        width="1529"
        height="383"
        className="h-12 w-auto"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />
    </a>
  );
};

export default Logo;