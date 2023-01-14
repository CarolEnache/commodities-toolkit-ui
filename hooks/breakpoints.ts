import { useEffect, useState } from 'react';

export const useBreakpoints = (): boolean => {
  const [breakpoint, setBreakpoint] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(window.innerWidth >= 992);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
}
