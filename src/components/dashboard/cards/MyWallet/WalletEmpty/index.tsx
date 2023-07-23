import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

const WalletEmpty = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container_center}>
        <div className={styles.box_image}>
          <Image
            src="/svgs/walletEmpty.svg"
            width={82}
            height={68}
            alt="email icon"
            loading="lazy"
          />
        </div>
        <div className={styles.box_text}>
          <span className={styles.wallet_bold}>Nothing here Yet...</span>
          <span className={styles.wallet_regular}>Add a crypto and start earning</span>
        </div>
      </div>
    </div>
  );
};

export default WalletEmpty;
