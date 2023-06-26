import React, { useState, useEffect } from 'react';
import { ArrowSmallUpIcon } from '@heroicons/react/24/solid'

const FloatingButton = () => {
  
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    const { scrollTop } = document.documentElement;
    const windowHeight = window.innerHeight;

    if (scrollTop > windowHeight) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      className={`${
        showButton ? 'visible' : 'invisible'
      } fixed bottom-4 right-4 z-0 bg-gray-800 text-white rounded p-3 transition-opacity duration-300 opacity-90 hover:opacity-100`}
      onClick={scrollToTop}
    >
      <ArrowSmallUpIcon className="h-6 w-6" />
    </button>
  );
};
export default FloatingButton;
