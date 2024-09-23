import React from 'react';
import AudioManager from './AudioManager';

const Footer = ({ gameState }) => {
  return (
    <footer className="bg-[#10141b] text-white p-4 bottom-0 mt-auto fixed w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-sm">© 2024 Secrets in the Dark. All rights reserved.</div>
        <AudioManager gameState={gameState} />
      </div>
    </footer>
  );
};

export default Footer;