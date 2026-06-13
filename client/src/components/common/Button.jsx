import { Loader2 } from "lucide-react";

const variants = {
  primary: "bg-brand-600 text-white hover:bg-brand-700",
  secondary:
    "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800",
  ghost: "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
  danger: "bg-rose-600 text-white hover:bg-rose-700",
};

export default function Button({
  as: Component = "button",
  children,
  className = "",
  disabled,
  icon: Icon,
  isLoading = false,
  type = "button",
  variant = "primary",
  ...props
}) {
  const buttonProps = Component === "button" ? { disabled: disabled || isLoading, type } : {};

  return (
    <Component
      className={`focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      aria-disabled={Component !== "button" && (disabled || isLoading) ? true : undefined}
      {...buttonProps}
      {...props}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : Icon ? <Icon className="h-4 w-4" /> : null}
      {children}
    </Component>
  );
}
