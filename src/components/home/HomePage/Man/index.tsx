"use client"
import Image from "next/image";
import { useWindowSize } from "@/hooks/useWindowSize";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { HtmlHTMLAttributes, useEffect } from "react";

import gsap from "gsap";

import styles from "./styles.module.scss";

export function Man() {
  const { width, height } = useWindowSize();
  const isMobile = (width || 0) < 595;

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const containe: HTMLElement = document.querySelector("#containerMan")!;
    gsap.to(containe, {
      x: -200,
      duration: 2,
      ease: "none",
      opacity: -2,
      scrollTrigger: {
        trigger: ".box-1",
        start: "top",
        end: "center 20%",
        scrub: true,
        toggleActions: 'play none none onLeave '
      },
    });
  }, []);

  return (
    <Image
      src="/images/woman_tablet.png"
      alt="Woman looking at tablet"
      width={464 + 32}
      height={499}
      id="containerMan"
      className={styles.img}
    />
  );
}
