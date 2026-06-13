import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

const ToastContext = createContext(null);

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((items) => items.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    ({ title, description, type = "info" }) => {
      const id = crypto.randomUUID();
      setToasts((items) => [...items, { id, title, description, type }]);
      window.setTimeout(() => removeToast(id), 4200);
    },
    [removeToast],
  );

  const value = useMemo(
    () => ({
      error: (title, description) => addToast({ title, description, type: "error" }),
      info: (title, description) => addToast({ title, description, type: "info" }),
      success: (title, description) => addToast({ title, description, type: "success" }),
    }),
    [addToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3">
        {toasts.map((toast) => {
          const Icon = icons[toast.type] || Info;
          return (
            <div
              key={toast.id}
              className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm shadow-soft dark:border-slate-800 dark:bg-slate-900"
              role="status"
            >
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600 dark:text-brand-500" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-950 dark:text-white">{toast.title}</p>
                {toast.description ? (
                  <p className="mt-1 text-slate-600 dark:text-slate-300">{toast.description}</p>
                ) : null}
              </div>
              <button
                type="button"
                className="focus-ring rounded-md p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                onClick={() => removeToast(toast.id)}
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
};
