declare module 'reactlite' {
  import { ComponentClass, ReactElement } from 'react';

  export interface ModalProps<ValueType = any> {
    resolve?: (value?: ValueType | PromiseLike<ValueType>) => void;
    reject?: (reason?: unknown) => void;
  }
  interface ModalProviderProps {
    container?: HTMLElement;
  }
  interface ModalStaticProps {
    Provider: ComponentClass<ModalProviderProps>;
    show: (element: ReactElement<ModalProps<P>>) => Promise<P>;
  }

  export const Modal: ModalStaticProps;
}
