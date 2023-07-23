import Image from "next/image";
import { useWindowSize } from "@/hooks/useWindowSize";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect } from "react";

import { Button } from "../../common/Button";
import * as Arrow from "../../../../public/svgs/Arrow";
import gsap from "gsap";

import styles from "./styles.module.scss";
import { Man } from "./Man";
import { Woman } from "./Woman";

interface Props {
  onSignUpClick: () => void;
}

export function HomePage(props: Props) {
  const { width, height } = useWindowSize();
  const isMobile = (width || 0) < 595;

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const containe: HTMLElement = document.querySelector("#containerMan")!;
    gsap.to(containe, {
      x: -800,
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
    const container: HTMLElement = document.querySelector("#containerWoman")!;
    console.log(container);
    gsap.to(container, {
      x: 0,
      duration: -3,
      ease: "none",
      opacity: 10,
      scrollTrigger: {
        trigger: ".box-1",
        start: "top",
        end: "center 20%",
        scrub: true,
      },
    });
  }, []);

  return (
    <section id="news-letters" className={styles.background}>
      <div className={styles.section_container}>
        <div className={styles.content}>
          <header>
            <h1>Lorem ipsum dolor sit amet, consectetur</h1>
            <h5>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
              aliquam, purus sit amet luctus venenatis, lectus magna fringilla
              urna, porttitor
            </h5>
          </header>
          <Button
            design="primary"
            className={styles.custom_button}
            onClick={props.onSignUpClick}
          >
            SIGN UP NOW
            <Arrow.Arrow fill="#fff" width={12} height={12} />
          </Button>
          <div className={styles.pills}>
            <span>Cryptos</span>
            <span>NFTs</span>
            <span>Games</span>
          </div>
        </div>
        <div className={styles.carroselElements}>
          <Man />
        </div>
        <div className={styles.carroselElementsWoman}>
            <Woman />
          </div>
      </div>
    </section>
  );
}
