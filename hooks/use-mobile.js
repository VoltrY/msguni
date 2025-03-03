import React, { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      };
      
      checkMobile();
      
      window.addEventListener("resize", checkMobile);
      
      return () => {
        window.removeEventListener("resize", checkMobile);
      };
    }
  }, []);

  return isMobile;
};

export default useMobile; 