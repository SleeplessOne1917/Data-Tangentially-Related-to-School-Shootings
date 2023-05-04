import { Title, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { parse } from "csv-parse";
import { readFile } from "fs/promises";
import { Shooting } from "~/types/shooting";
import { ShootingList } from "~/components/ShootingList";
import { Suspense } from "solid-js";

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
      <Title>Data Tangentially Related to School Shootings</Title>
      <h1>Data Tangentially Related to School Shootings</h1>
      <p>
        Have you ever wanted to know facts that are extremely loosely related to
        school shootings, like the nearest brewery? No? Too bad, it exits now
        anyway.
      </p>
      <Suspense fallback={<div>Loading shootings...</div>}>
        <ShootingList shootings={shootings() ?? []} />
      </Suspense>
    </main>
  );
}
