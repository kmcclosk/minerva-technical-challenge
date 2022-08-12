import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';

export function Animation({ dataPath }: { dataPath: string }) {
  const lottieWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lottieWrapRef.current) {
      return;
    }

    const animation = lottie.loadAnimation({
      container: lottieWrapRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: dataPath,
    });

    return () => {
      animation.destroy();
    };
  }, [dataPath]);

  return <div ref={lottieWrapRef} />;
}
