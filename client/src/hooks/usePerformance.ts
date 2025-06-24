import { useCallback, useRef, useEffect, useState } from 'react';

/**
 * 防抖Hook
 * 用于优化频繁触发的事件，如搜索、窗口调整等
 */
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  ) as T;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

/**
 * 节流Hook
 * 用于限制函数执行频率，如滚动事件、鼠标移动等
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastCallRef = useRef(0);
  const lastCallTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      
      if (now - lastCallRef.current >= delay) {
        callback(...args);
        lastCallRef.current = now;
      } else {
        if (lastCallTimerRef.current) {
          clearTimeout(lastCallTimerRef.current);
        }
        lastCallTimerRef.current = setTimeout(() => {
          callback(...args);
          lastCallRef.current = Date.now();
        }, delay - (now - lastCallRef.current));
      }
    },
    [callback, delay]
  ) as T;

  useEffect(() => {
    return () => {
      if (lastCallTimerRef.current) {
        clearTimeout(lastCallTimerRef.current);
      }
    };
  }, []);

  return throttledCallback;
}

/**
 * 内存管理Hook
 * 用于清理副作用和防止内存泄漏
 */
export function useCleanup() {
  const cleanupRef = useRef<Array<() => void>>([]);

  const addCleanup = useCallback((cleanup: () => void) => {
    cleanupRef.current.push(cleanup);
  }, []);

  useEffect(() => {
    return () => {
      cleanupRef.current.forEach(cleanup => cleanup());
      cleanupRef.current = [];
    };
  }, []);

  return addCleanup;
}

/**
 * 性能监控Hook
 * 用于监控组件渲染性能
 */
export function usePerformanceMonitor(componentName: string) {
  const renderCountRef = useRef(0);
  const lastRenderTimeRef = useRef(performance.now());

  useEffect(() => {
    renderCountRef.current += 1;
    const currentTime = performance.now();
    const renderTime = currentTime - lastRenderTimeRef.current;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} rendered ${renderCountRef.current} times, took ${renderTime.toFixed(2)}ms`);
    }
    
    lastRenderTimeRef.current = currentTime;
  });

  return {
    renderCount: renderCountRef.current,
    getRenderTime: () => performance.now() - lastRenderTimeRef.current,
  };
}

/**
 * 虚拟滚动Hook
 * 用于优化长列表渲染性能
 */
export function useVirtualScroll<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number,
  overscan: number = 5
) {
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.floor(scrollTop / itemHeight) + visibleCount + overscan
  );
  
  const visibleItems = items.slice(startIndex, endIndex + 1);
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;
  
  return {
    visibleItems,
    totalHeight,
    offsetY,
    onScroll: (e: React.UIEvent<HTMLDivElement>) => {
      setScrollTop(e.currentTarget.scrollTop);
    },
  };
}

/**
 * 图片懒加载Hook
 * 用于优化图片加载性能
 */
export function useLazyImage(src: string, placeholder?: string) {
  const [imageSrc, setImageSrc] = useState(placeholder || '');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
      setError(null);
    };
    
    img.onerror = () => {
      setError('Failed to load image');
      setIsLoading(false);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { imageSrc, isLoading, error };
}

/**
 * 网络状态监控Hook
 * 用于监控网络连接状态
 */
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionType, setConnectionType] = useState<string>('unknown');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    const handleConnectionChange = () => {
      const connection = (navigator as any).connection;
      if (connection) {
        setConnectionType(connection.effectiveType || 'unknown');
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('change', handleConnectionChange);

    // 初始化连接类型
    const connection = (navigator as any).connection;
    if (connection) {
      setConnectionType(connection.effectiveType || 'unknown');
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('change', handleConnectionChange);
    };
  }, []);

  return { isOnline, connectionType };
} 