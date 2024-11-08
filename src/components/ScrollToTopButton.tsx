import { useState, useEffect, useRef } from 'react';
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [rightOffset, setRightOffset] = useState(32);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const updateButtonPosition = () => {
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const offset = window.innerWidth - (containerRect.right);
        setRightOffset(offset);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    window.addEventListener('resize', updateButtonPosition);

    const observer = new MutationObserver(() => {
      updateButtonPosition();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current.parentElement || document.body, {
        childList: true,
        subtree: true
      });
    }

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('resize', updateButtonPosition);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <div ref={containerRef} className="container mx-auto" />
      <button
        onClick={scrollToTop}
        className={`
          fixed bottom-4
          h-12 w-12
          flex items-center justify-center
          bg-gray-500 hover:bg-gray-600
          text-white shadow-lg
          rounded-full
          transition-all duration-300 ease-in-out z-50
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
        `}
        style={{
          right: `${rightOffset}px`,
        }}
        aria-label="ページトップへスクロール"
      >
        <div className="flex items-center justify-center w-6 h-6">
          <ArrowUp size={28} strokeWidth={2.5} />
        </div>
      </button>
    </>
  );
};

export default ScrollToTop;