import { useRef, useState } from "react";

import { LandingNavigator } from "@/components/home/navigators/LandingNavigator";
import { ContactForm } from "@/components/home/ContactForm";
import { TopCryptos } from "@/components/home/TopCryptos";
import { HomePage } from "@/components/home/HomePage";
import { AboutUs } from "@/components/home/AboutUs";
import { Footer } from "@/components/home/Footer";
import { Modal, ModalHandler } from "@/components/common/modals/Modal";
import { SignUpForm } from "@/components/common/modals/forms/SignUp";
import { SignInForm } from "@/components/common/modals/forms/SignIn";

import styles from "./LandingPage.module.scss";

import { getCryptos } from "@/api/pickcrypt";
import { Cryptocoins } from "@/services/Cryptocoins";

interface Props {
  data: Cryptocoins[];
}

export default function LandingPage(props: Props) {
  const modalHandlerSignIn = useRef<ModalHandler>(null);
  const modalHandlerSignUp = useRef<ModalHandler>(null);

  const [cryptos, setCryptos] = useState(props.data ?? []);

  function openSignIn() {
    modalHandlerSignUp.current?.close();
    modalHandlerSignIn.current?.open();
  }

  function openSignUp() {
    modalHandlerSignIn.current?.close();
    modalHandlerSignUp.current?.open();
  }
  
  return (
    <main className={styles.main}>
      <Modal ref={modalHandlerSignIn}>
        <SignInForm onNeedAccount={openSignUp} />
      </Modal>
      <Modal ref={modalHandlerSignUp}>
        <SignUpForm onAlreadyHaveAccount={openSignIn} />
      </Modal>

      {
        <LandingNavigator
          blockchains={cryptos}
          onSignInClick={openSignIn}
          onSignUpClick={openSignUp}
        />
      }
      <HomePage onSignUpClick={openSignUp} />
      <section className={styles.wav}></section>
      <AboutUs onSignUpClick={openSignUp} />
      <TopCryptos blockchains={cryptos} />
      <ContactForm />
      <Footer />
    </main>
  );
}

export async function getStaticProps() {
  const data = await getCryptos();

  return {
    props: { data },
  };
}
