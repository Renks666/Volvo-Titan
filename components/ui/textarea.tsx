import * as React from "react";

import { cn } from "@/utils/cn";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "min-h-28 w-full resize-none rounded-3xl border border-white/10 bg-[rgba(255,255,255,0.06)] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-white/30 focus:bg-white/10",
        className,
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";
