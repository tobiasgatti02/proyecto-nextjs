"use client"
import React, { useEffect, useState } from 'react';

interface TypewriterEffectProps {
  text: string;
  speed?: number;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ text, speed = 10 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index === text.length) {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return <div dangerouslySetInnerHTML={{ __html: displayedText }} />;
};

export default TypewriterEffect;
