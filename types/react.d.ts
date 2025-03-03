declare module 'react' {
  // React'ın temel tipleri
  export type ReactNode = 
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | boolean
    | null
    | undefined;

  export type ReactChild = React.ReactElement | React.ReactText;
  export type ReactText = string | number;
  export type ReactElement<P = any> = {
    type: any;
    props: P;
    key: string | null;
  };

  // useState hook
  export function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
  
  // useEffect hook
  export function useEffect(effect: () => void | (() => void), deps?: ReadonlyArray<any>): void;
  
  // Diğer gerekli React fonksiyonları
  export function createElement(type: any, props?: any, ...children: any[]): any;
  export function createContext<T>(defaultValue: T): any;
  export function useContext<T>(context: React.Context<T>): T;
  export function useRef<T>(initialValue: T): { current: T };
  export function useMemo<T>(factory: () => T, deps: ReadonlyArray<any> | undefined): T;
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: ReadonlyArray<any>): T;

  // Default export
  const React: any;
  export default React;
} 