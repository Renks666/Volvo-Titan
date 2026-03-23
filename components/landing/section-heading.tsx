import { cn } from "@/utils/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p className="mb-2 text-[0.68rem] uppercase tracking-[0.24em] text-slate-400 sm:mb-3 sm:text-xs sm:tracking-[0.35em]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="max-w-[18ch] font-heading text-[1.9rem] leading-[1.08] text-white sm:max-w-none sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-[34rem] text-[0.98rem] leading-7 text-slate-300 sm:mt-4 sm:text-base sm:leading-8 md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
