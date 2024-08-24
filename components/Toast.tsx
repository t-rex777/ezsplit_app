import React, {createContext} from 'react';
import {Portal, Snackbar} from 'react-native-paper';
import {create} from 'zustand';

export const ToastContext = createContext<{
  message: string;
  visible: boolean;
} | null>(null);

export const Toast = (): JSX.Element => {
  const toast = useToast();

  return (
    <Portal>
      <Snackbar
        duration={2000}
        theme={{colors: {accent: 'red'}}}
        visible={toast?.visible ?? false}
        onDismiss={function (): void {
          toast.hideToast();
        }}>
        {toast?.message}
      </Snackbar>
    </Portal>
  );
};

interface IToastProps {
  message: string;
  visible: boolean;
  addMessage: (message: string) => void;
  hideToast: () => void;
}

export const useToast = create<IToastProps>(set => ({
  message: '',
  visible: false,
  addMessage: (message: string) => set(() => ({message, visible: true})),
  hideToast: () => set(() => ({message: '', visible: false})),
}));
