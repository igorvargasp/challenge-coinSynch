import { formatDollar } from "@/utils/currency";
import Image from "next/image";
import Chart from "./Chart";

import { Cryptocoins } from "@/services/Cryptocoins";

import styles from "./styles.module.scss";

interface Props {
  data: Cryptocoins[];
}

export function DailyVariation(props:Props) {
  return (
    <article className={styles.container2}>
      <div className={styles.content}>
        <span className={styles.card_title}>Daily Variation</span>
        <div className={styles.coin}>
          <div className={styles.symbol}>
            <Image
              src="/images/eth.jpg"
              width={24}
              height={24}
              alt="Ethereum"
            />
            <span>ETH</span>
          </div>
          <span className={styles.amount_change}>
            {"+" + formatDollar(5.65, true) + "%"}
          </span>
        </div>
      </div>
      <div>
        <div className={styles.img_chart}>
          <Chart data={props.data} />
        </div>
      </div>
    </article>
  );
}
