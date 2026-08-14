import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface LoadingBarContextType {
  start: () => void;
  finish: () => void;
}

const LoadingBarContext = createContext<LoadingBarContextType | undefined>(undefined);

export const LoadingBarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const start = useCallback(() => {
    setProgress(0);
    setIsVisible(true);
  }, []);

  const finish = useCallback(() => {
    setProgress(100);
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setProgress(0), 300);
    }, 200);
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isVisible && progress < 90) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const diff = Math.random() * 5;
          const next = Math.min(prev + diff, 90);
          return next;
        });
      }, 400);
    }

    return () => clearInterval(interval);
  }, [isVisible, progress]);

  return (
    <LoadingBarContext.Provider value={{ start, finish }}>
      {isVisible && (
        <div
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          className="fixed top-0 left-0 right-0 h-1 z-[9999] transition-opacity duration-300"
          style={{ opacity: progress === 100 ? 0 : 1 }}
        >
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      {children}
    </LoadingBarContext.Provider>
  );
};

export const useLoadingBar = () => {
  const context = useContext(LoadingBarContext);
  if (!context) {
    throw new Error('useLoadingBar must be used within a LoadingBarProvider');
  }
  return context;
};
