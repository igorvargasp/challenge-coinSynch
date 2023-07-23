import { useRef, useState } from "react";

import { Modal, ModalHandler } from "@/components/common/modals/Modal";
import { TransferInOut } from "@/components/common/modals/forms/TransferInOut";
import { AddCrypto } from "@/components/common/modals/forms/AddCrypto";
import { DailyVariation } from "@/components/dashboard/cards/DailyVariation";
import MyWallet from "@/components/dashboard/cards/MyWallet";
import { AppLayout } from "@/components/dashboard/AppLayout";
import Balance from "@/components/dashboard/cards/Balance";
import { News } from "@/components/dashboard/cards/News";

import { getCryptos } from "@/api/pickcrypt";
import { Cryptocoins } from "@/services/Cryptocoins";

import styles from "./styles.module.scss";

interface Props {
  data: Cryptocoins[];
}

export default function Dashboard(props: Props) {
  const modaHandlerAddCrypto = useRef<ModalHandler>(null);
  const modalTransferInOut = useRef<ModalHandler>(null);
  const [selectCrypt, setSelectCrypt] = useState<Cryptocoins>();

  const [cryptos, setCryptos] = useState<Cryptocoins[]>([]);

  function AddCryptou() {
    modaHandlerAddCrypto.current?.close();
    modaHandlerAddCrypto.current?.open();
  }

  function closeCrypto(pickcrypt: Cryptocoins, amount: number) {
    modaHandlerAddCrypto.current?.close();
    pickcrypt.amount = amount;
    const newCrypts = [...cryptos, pickcrypt];
    setCryptos(newCrypts);
  }

  function openTransfer(pickcrypt: Cryptocoins) {
    modalTransferInOut.current?.open();
    setSelectCrypt(pickcrypt);
  }

  function closeTransfer(pickcrypt: Cryptocoins) {
    const crypts = cryptos.map(
      (cryptos) =>{
        if(cryptos.asset_id == pickcrypt.asset_id){
          cryptos.amount = pickcrypt.amount
        }
        return cryptos;
      }
    );
    let newCrypts = [...crypts];
    if (pickcrypt.amount! <= 0) {
      newCrypts = newCrypts.filter(
        (cryptos) => cryptos.asset_id != pickcrypt.asset_id
      );
    }
    setCryptos(newCrypts);
    modalTransferInOut.current?.close();
  }

  return (
    <AppLayout>
      <div className={styles.bg}>
        <main className={styles.page_content}>
          <Modal ref={modaHandlerAddCrypto}>
            <AddCrypto
              onClose={closeCrypto}
              assets={props.data}
              cryptos={cryptos}
            />
          </Modal>

          <Modal ref={modalTransferInOut}>
            <TransferInOut
              onClose={closeTransfer}
              assets={props.data}
              cryptos={cryptos}
              crypto={selectCrypt}
            />
          </Modal>

          <div className={styles.quick_info_section}>
            <Balance data={cryptos} />
            <DailyVariation data={cryptos} />
            <News />
          </div>
          <MyWallet
            onAddCrypto={AddCryptou}
            data={cryptos}
            openTransfer={openTransfer}
          />
        </main>
      </div>
    </AppLayout>
  );
}

export async function getStaticProps() {
  const data = await getCryptos();

  return {
    props: { data },
  };
}
