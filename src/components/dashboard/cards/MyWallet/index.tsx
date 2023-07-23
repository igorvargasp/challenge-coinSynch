import Image from "next/image";
import { useState } from "react";

import WalletEmpty from "@/components/dashboard/cards/MyWallet/WalletEmpty";
import { Button } from "@/components/common/Button";
import { MyWalletTable } from "./MyWalletTable";

import { Cryptocoins } from "@/services/Cryptocoins";

import styles from "./styles.module.scss";

interface Props {
  data: Cryptocoins[];
  onAddCrypto: () => void;
  openTransfer: (Cryptocoins: Cryptocoins) => void;
}

export default function MyWallet(props: Props) {
  const [isSample, setIsSample] = useState(true);
  const sample = props.data.slice(0, 4);

  return (
    <article className={styles.containerWallet}>
      <div className={styles.topo_card}>
        <div className={styles.card_title}>
          <span className={styles.title_wallet}>
            <Image
              src="/svgs/wallet.svg"
              width={32}
              height={32}
              alt="email icon"
              loading="lazy"
            />
            <span>My Wallet</span>
          </span>
        </div>
        <div className={styles.add_cripto}>
          <Button design="primary" onClick={props.onAddCrypto}>
            + add Crypto
          </Button>
        </div>
      </div>
      <section id="top-cryptos" className={styles.background}>
        {props.data.length === 0 ? (
          <WalletEmpty />
        ) : (
          <div className={styles.content}>
            <MyWalletTable
              data={isSample ? sample : props.data}
              openTransfer={props.openTransfer}
            />
          </div>
        )}
        {props.data.length <= 4 ? null : (
          <Button
            design="ghost"
            className={styles.custom_btn}
            onClick={() => setIsSample((prev) => !prev)}
          >
            {isSample 
            ?<div className={styles.element}><span className={styles.view}>view more+</span></div>  
            :<div className={styles.element}><span className={styles.view}> view less-</span></div> }
          </Button>
        )}
      </section>
    </article>
  );
}
