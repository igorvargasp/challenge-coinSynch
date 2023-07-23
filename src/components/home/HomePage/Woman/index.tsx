import Image from "next/image";
import { useWindowSize } from "@/hooks/useWindowSize";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect } from "react";

import gsap from "gsap";

import styles from "./styles.module.scss";

export function Woman() {
  const { width, height } = useWindowSize();
  const isMobile = (width || 0) < 595;

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const containe: HTMLElement = document.querySelector("#containerWoman")!;
    gsap.to(containe, {
      x: -600,
      duration: 2,
      ease: "none",
      opacity: 2,
      scrollTrigger: {
        trigger: ".box-1",
        start: "top",
        end: "center 20%",
        scrub: true,
        
      },
    });
  }, []);

  return (
 
      <Image
      src="/images/man_cellphone.png"
        alt="Woman looking at tablet"
        width={464 + 32}
        height={499}
        id="containerWoman"
        className={styles.img}
      />
  );
}
