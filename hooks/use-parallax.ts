"use client";

import { useEffect, useState } from "react";

export function useParallax(multiplier = 0.18) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * multiplier);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [multiplier]);

  return offset;
}
