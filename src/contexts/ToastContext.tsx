import React, { createContext, useContext, useState } from "react";
import { Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "../components/ui/toast";

type ToastType = "default" | "success" | "error" | "info" | "warning";

interface ToastData {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
}

interface ToastContextType {
  toasts: ToastData[];
  addToast: (toast: Omit<ToastData, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider2: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = (toast: Omit<ToastData, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);

    if (toast.duration !== Infinity) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 5000);
    }
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      <ToastProvider>
        {children}
        {toasts.map((toast) => (
          <Toast key={toast.id} variant={toast.type as any}>
            <div className="grid gap-1">
              <ToastTitle>{toast.title}</ToastTitle>
              {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
            </div>
            {toast.action && (
              <ToastAction altText={toast.action.label} onClick={toast.action.onClick}>
                {toast.action.label}
              </ToastAction>
            )}
            <ToastClose onClick={() => removeToast(toast.id)} />
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};