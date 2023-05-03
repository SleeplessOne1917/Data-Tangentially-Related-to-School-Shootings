import { Title, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import Counter from "~/components/Counter";
import { parse } from "csv-parse";
import { readFile } from "fs/promises";
import { Shooting } from "~/types/shooting";

export const routeData = () =>
  createServerData$(async () => {
    const shootings: Shooting[] = [];

    for await (const shooting of parse(
      await readFile("school-shootings-data.csv"),
      { columns: true }
    )) {
      shootings.push({
        ...shooting,
        casualties: parseInt(shooting.casualties, 10),
        injured: parseInt(shooting.injured, 10),
        killed: parseInt(shooting.killed, 10),
        uid: parseInt(shooting.uid, 10),
        lat: parseFloat(shooting.lat),
        long: parseFloat(shooting.long),
      } as Shooting);
    }

    return shootings;
  });

export default function Home() {
  const shootings = useRouteData<typeof routeData>();

  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
      <Counter />
      <p>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
      </p>
    </main>
  );
}
