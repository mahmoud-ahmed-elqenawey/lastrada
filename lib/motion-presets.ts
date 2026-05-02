import type { Variants } from "motion/react";
import type { Direction } from "@/lib/la-strada-i18n";

export const motionEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

export const sectionViewport = {
  once: true,
  margin: "-16% 0px",
};

export const itemViewport = {
  once: true,
  margin: "-12% 0px",
};

export function revealMotion(shouldReduceMotion: boolean | null, variants: Variants, viewport = sectionViewport) {
  return shouldReduceMotion
    ? { initial: false as const }
    : {
        initial: "hidden" as const,
        whileInView: "show" as const,
        viewport,
        variants,
      };
}

export function entranceMotion(shouldReduceMotion: boolean | null, variants: Variants) {
  return shouldReduceMotion
    ? { initial: false as const }
    : {
        initial: "hidden" as const,
        animate: "show" as const,
        variants,
      };
}

export function staggerContainer(delayChildren = 0.08, staggerChildren = 0.075): Variants {
  return {
    hidden: {},
    show: {
      transition: {
        delayChildren,
        staggerChildren,
      },
    },
  };
}

export function sectionReveal(delay = 0): Variants {
  return {
    hidden: {
      opacity: 0,
      y: 42,
      filter: "blur(14px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay,
        duration: 0.82,
        ease: motionEase,
      },
    },
  };
}

export function headingReveal(direction: Direction = "ltr", delay = 0): Variants {
  return {
    hidden: {
      opacity: 0,
      x: direction === "rtl" ? 12 : -12,
      filter: "blur(12px)",
    },
    show: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        delay,
        duration: 0.78,
        ease: motionEase,
      },
    },
  };
}

export function cardReveal(delay = 0, y = 34): Variants {
  return {
    hidden: {
      opacity: 0,
      y,
      scale: 0.975,
      filter: "blur(12px)",
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        delay,
        duration: 0.66,
        ease: motionEase,
      },
    },
  };
}

export function itemReveal(delay = 0, y = 22): Variants {
  return {
    hidden: {
      opacity: 0,
      y,
      filter: "blur(9px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay,
        duration: 0.54,
        ease: motionEase,
      },
    },
  };
}

export function chipReveal(delay = 0): Variants {
  return {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.94,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay,
        duration: 0.42,
        ease: motionEase,
      },
    },
  };
}

export function iconReveal(delay = 0): Variants {
  return {
    hidden: {
      opacity: 0,
      scale: 0.72,
      rotate: -8,
    },
    show: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay,
        duration: 0.58,
        ease: motionEase,
      },
    },
  };
}

export function mediaReveal(delay = 0): Variants {
  return {
    hidden: {
      opacity: 0,
      scale: 1.06,
      filter: "blur(12px) saturate(0.7)",
    },
    show: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px) saturate(1)",
      transition: {
        delay,
        duration: 0.9,
        ease: motionEase,
      },
    },
  };
}

export function sweepReveal(direction: Direction = "ltr", delay = 0): Variants {
  return {
    hidden: {
      opacity: 0,
      clipPath: direction === "rtl" ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
    },
    show: {
      opacity: 1,
      clipPath: "inset(0 0% 0 0%)",
      transition: {
        delay,
        duration: 0.86,
        ease: motionEase,
      },
    },
  };
}

export function lineReveal(direction: Direction = "ltr", delay = 0): Variants {
  return {
    hidden: {
      opacity: 0,
      scaleX: 0,
      transformOrigin: direction === "rtl" ? "100% 50%" : "0% 50%",
    },
    show: {
      opacity: 1,
      scaleX: 1,
      transformOrigin: direction === "rtl" ? "100% 50%" : "0% 50%",
      transition: {
        delay,
        duration: 0.72,
        ease: motionEase,
      },
    },
  };
}

export function heroTitleReveal(delay = 0.16): Variants {
  return {
    hidden: {
      opacity: 0,
      y: 64,
      scale: 0.965,
      filter: "blur(18px)",
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        delay,
        duration: 1,
        ease: motionEase,
      },
    },
  };
}

export function sideReveal(direction: Direction = "ltr", delay = 0): Variants {
  return {
    hidden: {
      opacity: 0,
      x: direction === "rtl" ? -34 : 34,
      filter: "blur(12px)",
    },
    show: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        delay,
        duration: 0.72,
        ease: motionEase,
      },
    },
  };
}

export const testimonialSwap: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
    scale: 0.985,
    filter: "blur(10px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.48,
      ease: motionEase,
    },
  },
};
