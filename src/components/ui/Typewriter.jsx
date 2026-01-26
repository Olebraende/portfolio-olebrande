import { useState, useEffect } from 'react';
import styles from '../../styles/modules/Typewriter.module.css';

const Typewriter = ({
  text,
  delay = 0,
  speed = 80,
  className = '',
  onComplete
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setDisplayedText(text);
      setShowCursor(false);
      onComplete?.();
      return;
    }

    // Start typing after delay
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay, text, onComplete]);

  useEffect(() => {
    if (!isTyping) return;

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      // Typing complete - fade out cursor
      const cursorTimeout = setTimeout(() => {
        setShowCursor(false);
        onComplete?.();
      }, 400);

      return () => clearTimeout(cursorTimeout);
    }
  }, [displayedText, isTyping, text, speed, onComplete]);

  return (
    <span className={`${styles.typewriter} ${className}`}>
      {displayedText}
      {showCursor && (
        <span className={`${styles.cursor} ${displayedText.length === text.length ? styles.cursorFadeOut : ''}`}>|</span>
      )}
    </span>
  );
};

export default Typewriter;
