import InitGame from "@/app/components/InitGame";

import { phase10Rules } from "./rules";

export default function Phase10() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4">
      <h1 className="text-6xl mb-6 text-center">Phase 10</h1>
      <InitGame gameId={phase10Rules.id} />
    </main>
  );
}
