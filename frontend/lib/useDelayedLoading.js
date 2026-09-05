'use client';

import { useEffect, useState } from 'react';

// Only flips to true if `loading` stays true past `delay` ms — avoids a flash
// of the full-screen loader for requests that resolve quickly.
export function useDelayedLoading(loading, delay = 400) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!loading) {
      setShow(false);
      return;
    }
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [loading, delay]);

  return show;
}
