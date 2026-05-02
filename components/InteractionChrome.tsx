"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

const interactiveSelector = [
  "a",
  "button",
  "summary",
  "label",
  "select",
  "[role='button']",
  "[role='link']",
  "[data-cursor='interactive']",
].join(",");

const editableSelector = ["input", "textarea", "[contenteditable='true']"].join(",");

function closestElement(target: EventTarget | null, selector: string) {
  return target instanceof Element ? target.closest(selector) : null;
}

function isFinePointer() {
  return window.matchMedia("(pointer: fine)").matches;
}

function CustomCursor() {
  const shouldReduceMotion = useReducedMotion() === true;
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 320, damping: 34, mass: 0.32 });
  const ringY = useSpring(cursorY, { stiffness: 320, damping: 34, mass: 0.32 });
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [pressed, setPressed] = useState(false);
  const visibleRef = useRef(false);
  const interactiveRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const pointerRef = useRef<{
    x: number;
    y: number;
    target: EventTarget | null;
  } | null>(null);

  useEffect(() => {
    if (shouldReduceMotion || !isFinePointer()) return;

    document.documentElement.classList.add("la-strada-custom-cursor");

    const setVisibleSafely = (nextVisible: boolean) => {
      if (visibleRef.current === nextVisible) return;
      visibleRef.current = nextVisible;
      setVisible(nextVisible);
    };

    const setInteractiveSafely = (nextInteractive: boolean) => {
      if (interactiveRef.current === nextInteractive) return;
      interactiveRef.current = nextInteractive;
      setInteractive(nextInteractive);
    };

    const flushPointerMove = () => {
      rafRef.current = null;

      const pointer = pointerRef.current;

      if (!pointer) {
        return;
      }

      cursorX.set(pointer.x);
      cursorY.set(pointer.y);

      const isEditable = closestElement(pointer.target, editableSelector) !== null;
      setVisibleSafely(!isEditable);
      setInteractiveSafely(!isEditable && closestElement(pointer.target, interactiveSelector) !== null);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;

      pointerRef.current = {
        x: event.clientX,
        y: event.clientY,
        target: event.target,
      };

      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(flushPointerMove);
      }
    };

    const handlePointerDown = () => setPressed(true);
    const handlePointerUp = () => setPressed(false);
    const handlePointerLeave = () => setVisibleSafely(false);
    const handlePointerEnter = () => setVisibleSafely(true);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);
    document.addEventListener("mouseenter", handlePointerEnter);

    return () => {
      document.documentElement.classList.remove("la-strada-custom-cursor");
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("mouseleave", handlePointerLeave);
      document.removeEventListener("mouseenter", handlePointerEnter);
    };
  }, [cursorX, cursorY, shouldReduceMotion]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        data-interaction-chrome="cursor-ring"
        className="pointer-events-none fixed left-0 top-0 z-[95] h-0 w-0"
        style={{ x: ringX, y: ringY }}
      >
        <motion.span
          className="absolute -left-5 -top-5 h-10 w-10 rounded-full border border-white/45 bg-white/5 shadow-[0_0_18px_rgba(48,169,220,0.16)]"
          animate={{
            opacity: visible ? 1 : 0,
            scale: interactive ? (pressed ? 1.15 : 1.55) : pressed ? 0.78 : 1,
          }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        />
        <motion.span
          className="absolute -left-8 -top-8 h-16 w-16 rounded-full bg-[conic-gradient(from_180deg,var(--brand-cyan),var(--brand-green),var(--brand-yellow),var(--brand-red),var(--brand-purple),var(--brand-cyan))] opacity-10"
          animate={{
            opacity: visible && interactive ? 0.32 : visible ? 0.16 : 0,
            scale: interactive ? 1.4 : 0.8,
          }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        data-interaction-chrome="cursor-dot"
        className="pointer-events-none fixed left-0 top-0 z-[96] h-0 w-0"
        style={{ x: cursorX, y: cursorY }}
      >
        <motion.span
          className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.72)]"
          animate={{
            opacity: visible ? 1 : 0,
            scale: interactive ? 0.72 : pressed ? 1.35 : 1,
          }}
          transition={{ duration: 0.12, ease: "easeOut" }}
        />
      </motion.div>
    </>
  );
}

export function InteractionChrome() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const idleWindow = window as Window &
      typeof globalThis & {
        requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
        cancelIdleCallback?: (handle: number) => void;
      };

    if (idleWindow.requestIdleCallback && idleWindow.cancelIdleCallback) {
      const idleId = idleWindow.requestIdleCallback(() => setIsReady(true), { timeout: 1400 });
      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timeoutId = globalThis.setTimeout(() => setIsReady(true), 800);
    return () => globalThis.clearTimeout(timeoutId);
  }, []);

  return isReady ? <CustomCursor /> : null;
}
