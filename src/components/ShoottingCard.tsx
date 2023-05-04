import { JSX } from "solid-js";
import { Shooting } from "~/types/shooting";
import styles from "./ShootingCard.module.css";

type ShootingCardProps = {
  shooting: Shooting;
};

const TitledDiv = (props: { title: string; value: string }) => (
  <div class={styles["titled-info"]}>
    <div>
      <strong>{props.title}</strong>
    </div>
    <div>{props.value}</div>
  </div>
);

export function ShootingCard(props: ShootingCardProps) {
  return (
    <li class={styles.card}>
      <TitledDiv title="School" value={props.shooting.school_name} />
      <TitledDiv title="City" value={props.shooting.city} />
      <TitledDiv title="State" value={props.shooting.state} />
      <div class={styles["actions-container"]}>
        <div>Actions</div>
        <div class={styles.actions}>
          <button>Nearest Brewery</button>
          <button>Historical Events on the Same Day</button>
        </div>
      </div>
    </li>
  );
}
