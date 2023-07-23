import { Button } from "@/components/common/Button";
import styles from "./styles.module.scss";
import Image from "next/image";

interface Props {
    onSignInClick: () => void;
    onSignUpClick: () => void;
  }

const MenuLandingPage = (props:Props) => {
  return (

    <div className={styles.menu}>
        <div className={styles.links}>
        <Button
              href="#news-letters"
              design="ghost"
              className={styles.btnMenu}
            >
              <Image className={styles.iconMenu} src={"/images/home.png"} alt={""}  width={25} height={25}/>
              <span className={styles.spanHome}>Home</span>
            </Button>
            <Button
              href="#about-us"
              design="ghost"
              className={styles.btnMenu}
            >
               <Image className={styles.iconMenuAbout} src={"/images/aboutus.png"} alt={""}  width={25} height={25}/>
              <span className={styles.spanAbout}>About us</span>
            </Button>
            <Button
              href="#top-cryptos"
              design="ghost"
              className={styles.btnMenu}
            >
               <Image className={styles.iconMenuTop} src={"/images/topcrypto.png"} alt={""}  width={25} height={25}/>
             <span className={styles.spanCryptos}>Top Cryptos</span> 
            </Button>
            <Button  design="ghost" className={styles.btnMenu} onClick={props.onSignUpClick}>
              <span className={styles.btnMenuSingin}>Sign Up</span>
            </Button>    
            <Button  design="ghost"  onClick={props.onSignInClick}>
              <span className={styles.btnMenuSingup}>Sign In</span>
            </Button>        
            </div>
            
        </div>
  )
}

export default MenuLandingPage