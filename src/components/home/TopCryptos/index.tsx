import { useMemo, useState } from "react";

import { Cryptocoins } from "@/services/Cryptocoins";

import { TopCryptoTable } from "./TopCryptoTable";
import { Button } from "../../common/Button";

import styles from "./styles.module.scss";

interface Props {
  blockchains: Cryptocoins[];
}

export function TopCryptos(props: Props) {
  const [isSample, setIsSample] = useState(true);
  const topCoins = useMemo(
    () =>
      isSample
        ? props.blockchains.filter((el, i) => i <= 5)
        : props.blockchains,
    [props.blockchains, isSample]
  );

  return (
    <section id="top-cryptos" className={styles.background}>
      <div className={styles.content}>
        <h3>Top Cryptos</h3>

        <TopCryptoTable topcoins={topCoins} />
        <Button
          design="ghost"
          className={styles.custom_btn}
          onClick={() => setIsSample(!isSample)}
        >
          {isSample ? "View more +" : "View less -"}
        </Button>
      </div>
    </section>
  );
}
