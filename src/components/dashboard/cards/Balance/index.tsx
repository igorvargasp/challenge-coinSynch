import { Cryptocoins } from "@/services/Cryptocoins";
import { formatDollar } from "@/utils/currency";
import Image from "next/image";
import styles from "./styles.module.scss";

interface Props {
  data: Cryptocoins[];
}

export default function Balance(props: Props) {
  return (
    <article className={styles.container1}>
      <div className={styles.content}>
        <div className={styles.icon_wrapper}>
          <Image
            src="/svgs/legal-scale.svg"
            width={40}
            height={40}
            alt="legal scale icon"
          />
        </div>
        <div className={styles.header}>
          <h4>Balance in US$</h4>
          <p>(approximately)</p>
        </div>
      </div>
      <div className={styles.amount}>
        <span>
          {formatDollar(
            parseFloat(props.data.reduce((a, b) => a + b.amount, 0)),
            true
          )}
        </span>
      </div>
    </article>
  );
}
