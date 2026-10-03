"use client";

import { useState } from "react";

import InitGame from "@/app/components/InitGame";
import { Player } from "@/app/lib/games/types";

import { phase10Rules } from "./rules";

export default function Phase10() {
  const [gameStarted, setGameStarted] = useState(false);

  function handleStartGame(players: Player[]) {
    setGameStarted(true);
    console.log(players);
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4">
      <h1 className="text-6xl mb-6 text-center">Phase 10</h1>
      {gameStarted ? <p>Game started</p> : <InitGame gameId={phase10Rules.id} startGame={handleStartGame} />}
    </main>
  );
}
