import PillLink from "./components/PillLink";
import { games } from "./lib/games/registry";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4">
      <h1 className="text-6xl mb-6 text-center">Scoresheet</h1>
      <h2 className="mb-3 text-xl text-center">Choose a scoresheet</h2>
      <ul className="flex flex-wrap justify-center gap-5">
        {games.map(game => (
          <li key={game.name}>
            <PillLink path={game.id} name={game.name} />
          </li>
        ))}
      </ul>
    </main>
  );
}
