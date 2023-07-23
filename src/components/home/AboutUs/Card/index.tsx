import Image from 'next/image';
import styles from './styles.module.scss';

interface Props {
  img: string;
  text: string;
  subtitle: string;
  title: string;
}

export function Card(props: Props) {
  return (
    <article className={styles.card}>
      <Image src={props.img} alt={props.text} width={64} height={64} />
      <div className={styles.content}>
        <header>
          <p>{props.subtitle}</p>
          <h4>{props.title}</h4>
        </header>
        <p>{props.text}</p>
      </div>
    </article>
  );
}


