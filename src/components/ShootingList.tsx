import { For } from "solid-js";
import { Shooting } from "~/types/shooting";
import { ShootingCard } from "./ShoottingCard";
import styles from "./ShootingList.module.css";

type ShootingListPropTypes = {
  shootings: Shooting[];
};

export function ShootingList(props: ShootingListPropTypes) {
  return (
    <ul class={styles.list}>
      <For each={props.shootings} fallback={<div>Loading...</div>}>
        {(shooting) => <ShootingCard shooting={shooting} />}
      </For>
    </ul>
  );
}
