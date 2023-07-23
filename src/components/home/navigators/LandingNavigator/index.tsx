import Image from "next/image";

import { Button } from "@/components/common/Button";
import { HorizontalTimeline } from "./HorizontalTimeLine";
import { useWindowSize } from "@/hooks/useWindowSize";
import { Cryptocoins } from "@/services/Cryptocoins";
import { useRouter } from "next/router";

import styles from "./styles.module.scss";
import { useState } from "react";
import MenuLandingPage from "./MenuLandingPage";

interface Props {
  blockchains: Cryptocoins[];
  onSignInClick: () => void;
  onSignUpClick: () => void;
}

export function LandingNavigator(props: Props) {
  const { width, height } = useWindowSize();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  function menuToogle() {
    setMenuIsOpen(!menuIsOpen);
  }

  const isDesktop = (width || 0) > 890;
  const isMobile = (width || 0) > 450;

  const router = useRouter();
  const pathAndSlug = router.asPath.split("#")[0];

  const hashNewsLetters = "news-letters";
  const newPathNewsLetters = `${pathAndSlug}#${hashNewsLetters}`;

  const hashAboutUs = "about-us";
  const newPathAboutUs = `${pathAndSlug}#${hashAboutUs}`;

  const hashTopCripts = "top-cryptos";
  const newPathTopCripts = `${pathAndSlug}#${hashTopCripts}`;

  return (
    <div className={styles.background}>
      <nav className={styles.wrapper}>
        <div className={styles.left_wrapper}>
          <div className={styles.logo_container}>
            <Button
              design="ghost"
              onClick={() => {
                window.location.replace(newPathNewsLetters);
              }}
            >
              <Image src="/images/logo.png" fill alt="CoinSynch logo" />
            </Button>
          </div>

          <div className={styles.links}>
            <Button
              onClick={() => {
                window.location.replace(newPathAboutUs);
              }}
              design="ghost"
            >
              About us
            </Button>
            <Button
              onClick={() => {
                window.location.replace(newPathTopCripts);
              }}
              design="ghost"
            >
              Top Cryptos
            </Button>
          </div>
        </div>

        {!isMobile ? (
          <div className={styles.hero_img} id="container">
            <Button
              className={styles.menuMobile}
              design="ghost"
              onClick={menuToogle}
            >
              <Image
                src="/svgs/hamburger-menu.svg"
                width={24}
                height={24}
                alt="menu button"
              />
            </Button>
          </div>
        ) : undefined}
        <div className={styles.right_wrapper}>
          {isDesktop ? (
            <div className={styles.timeline_constraint}>
              <HorizontalTimeline chains={props.blockchains} />
            </div>
          ) : undefined}

          <div className={styles.buttons_container}>
            <Button design="ghost" onClick={props.onSignInClick}>
              Sign in
            </Button>
            <Button design="primary" onClick={props.onSignUpClick}>
              Sign up
            </Button>
          </div>
        </div>
      </nav>
      {!menuIsOpen ? null : <MenuLandingPage onSignUpClick={props.onSignUpClick} onSignInClick={props.onSignInClick} />}
      <div className={styles.boxTimeLine}></div>
      {!isDesktop ? (
        <div className={styles.timeline_constraint}>
          <HorizontalTimeline chains={props.blockchains} />
        </div>
      ) : undefined}
    </div>
  );
}
