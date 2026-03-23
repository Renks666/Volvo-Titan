import * as React from "react";

import { cn } from "@/utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "cta-shimmer inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(126,164,255,0.65)] disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 sm:px-6",
          variant === "primary" &&
            "bg-[linear-gradient(135deg,#eef4ff_0%,#b7c5dc_45%,#eef4ff_100%)] text-slate-950 shadow-[0_12px_40px_rgba(188,204,233,0.24)] hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_18px_44px_rgba(188,204,233,0.34)]",
          variant === "secondary" &&
            "glass-panel metal-border text-white hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 hover:shadow-[0_18px_40px_rgba(52,84,145,0.2)]",
          variant === "ghost" &&
            "border border-white/10 bg-white/5 text-slate-200 hover:border-white/20 hover:bg-white/10",
          variant === "danger" &&
            "border border-[rgba(255,127,152,0.3)] bg-[rgba(255,127,152,0.12)] text-white hover:bg-[rgba(255,127,152,0.2)]",
          className,
        )}
        data-tone={variant === "primary" ? "light" : "dark"}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
