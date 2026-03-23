"use client";

import { AnimatePresence } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import {
  type CSSProperties,
  type KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import {
  OverlayPanel,
  useDismissableLayer,
  useEscapeKey,
} from "@/components/ui/overlay";
import { cn } from "@/utils/cn";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: readonly SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

interface PanelPosition {
  top: number;
  left: number;
  width: number;
}

export function Select({
  options,
  value,
  defaultValue = "",
  onValueChange,
  placeholder = "Выберите значение",
  name,
  disabled = false,
  className,
  id,
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [panelPosition, setPanelPosition] = useState<PanelPosition | null>(null);

  const currentValue = isControlled ? value : internalValue;
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === currentValue),
  );
  const selectedOption = options.find((option) => option.value === currentValue);

  useDismissableLayer({
    active: isOpen,
    refs: [triggerRef, panelRef],
    onDismiss: () => setIsOpen(false),
  });
  useEscapeKey(isOpen, () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    requestAnimationFrame(() => {
      optionRefs.current[activeIndex]?.focus();
    });
  }, [activeIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const updatePanelPosition = () => {
      const trigger = triggerRef.current;

      if (!trigger) {
        return;
      }

      const rect = trigger.getBoundingClientRect();
      const viewportPadding = 16;
      const availableWidth = window.innerWidth - viewportPadding * 2;

      setPanelPosition({
        top: rect.bottom + window.scrollY + 12,
        left:
          Math.min(
            rect.left + window.scrollX,
            window.scrollX + window.innerWidth - Math.min(rect.width, availableWidth) - viewportPadding,
          ),
        width: Math.min(rect.width, availableWidth),
      });
    };

    updatePanelPosition();

    window.addEventListener("resize", updatePanelPosition);

    return () => {
      window.removeEventListener("resize", updatePanelPosition);
    };
  }, [isOpen]);

  const commitValue = (nextValue: string) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const openAndFocus = (index: number) => {
    if (disabled) {
      return;
    }

    setActiveIndex(index);
    setIsOpen(true);
  };

  const moveActiveIndex = (direction: -1 | 1) => {
    setActiveIndex((currentIndex) => {
      if (options.length === 0) {
        return 0;
      }

      return (currentIndex + direction + options.length) % options.length;
    });
  };

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled || options.length === 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      openAndFocus(selectedIndex);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      openAndFocus(selectedIndex === 0 ? options.length - 1 : selectedIndex);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openAndFocus(selectedIndex);
    }
  };

  const onOptionKeyDown = (event: KeyboardEvent<HTMLButtonElement>, optionValue: string) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveActiveIndex(1);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      moveActiveIndex(-1);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(options.length - 1);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      commitValue(optionValue);
      return;
    }

    if (event.key === "Tab") {
      setIsOpen(false);
    }
  };

  const panelStyle: CSSProperties | undefined = panelPosition
    ? {
        position: "absolute",
        top: panelPosition.top,
        left: panelPosition.left,
        width: panelPosition.width,
      }
    : undefined;

  return (
    <>
      <div className={cn("relative", className)}>
        {name ? <input type="hidden" name={name} value={currentValue} /> : null}
        <button
          ref={triggerRef}
          id={selectId}
          type="button"
          className={cn(
            "flex h-12 w-full items-center justify-between rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.06)] px-4 text-left text-sm text-white outline-none transition",
            "focus-visible:border-white/30 focus-visible:bg-white/10 focus-visible:ring-2 focus-visible:ring-[rgba(126,164,255,0.65)]",
            "disabled:cursor-not-allowed disabled:opacity-60",
            isOpen && "border-white/24 bg-white/10 shadow-[0_16px_36px_rgba(0,0,0,0.22)]",
          )}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={`${selectId}-listbox`}
          disabled={disabled}
          onClick={() => {
            if (disabled || options.length === 0) {
              return;
            }

            setIsOpen((current) => !current);
            setActiveIndex(selectedIndex);
          }}
          onKeyDown={onTriggerKeyDown}
        >
          <span className={selectedOption ? "text-white" : "text-slate-400"}>
            {selectedOption?.label ?? placeholder}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 text-slate-400 transition duration-300",
              isOpen && "rotate-180 text-slate-200",
            )}
          />
        </button>
      </div>

      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {isOpen && panelStyle ? (
                <OverlayPanel
                  ref={panelRef}
                  variant="popover"
                  className="z-[110] rounded-[1.6rem] p-2"
                  style={panelStyle}
                >
                  <div
                    id={`${selectId}-listbox`}
                    role="listbox"
                    aria-labelledby={selectId}
                    className="overlay-scrollbar relative grid max-h-72 gap-0.5 overflow-y-auto p-1"
                  >
                    {options.map((option, index) => {
                      const isSelected = option.value === currentValue;

                      return (
                        <button
                          key={option.value}
                          ref={(element) => {
                            optionRefs.current[index] = element;
                          }}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          className={cn(
                            "flex min-h-8 items-center justify-between rounded-[1.05rem] px-3 py-1.5 text-left text-[11px] leading-4 transition",
                            isSelected
                              ? "bg-[linear-gradient(135deg,rgba(126,164,255,0.12),rgba(73,102,156,0.08))] text-white"
                              : "text-slate-300 hover:bg-white/8 hover:text-white focus-visible:bg-white/8 focus-visible:text-white",
                          )}
                          onClick={() => commitValue(option.value)}
                          onFocus={() => setActiveIndex(index)}
                          onKeyDown={(event) => onOptionKeyDown(event, option.value)}
                        >
                          <span>{option.label}</span>
                          {isSelected ? <Check className="h-4 w-4 text-[var(--chrome)]" /> : null}
                        </button>
                      );
                    })}
                  </div>
                </OverlayPanel>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
