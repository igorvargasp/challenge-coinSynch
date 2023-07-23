import {
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";

import { Button } from "@/components/common/Button";

import styles from "./styles.module.scss";

interface Props {
  children: ReactNode;
}

export interface ModalHandler {
  close: () => void;
  open: () => void;
}

const ModalComponent: ForwardRefRenderFunction<ModalHandler, Props> = (
  props,
  ref
) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    close: () => setIsOpen(false),
    open: () => setIsOpen(true),
  }));

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <Dialog open={isOpen} onClose={close}>
      <div className={styles.bg} aria-hidden="true" />
      <Dialog.Panel className={styles.modal}>
        <Button
          design="ghost"
          type="button"
          onClick={close}
          className={styles.close_btn}
        >
          <Image
            src="svgs/close.svg"
            alt="close modal"
            width={16}
            height={16}
          />
        </Button>
        {props.children}
      </Dialog.Panel>
    </Dialog>
  );
};

export const Modal = forwardRef(ModalComponent);
