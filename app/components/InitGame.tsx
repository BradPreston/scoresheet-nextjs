"use client";

import { useState } from "react";

import { getGameRules } from "../lib/games/registry";
import { Player, validatePlayers } from "../lib/games/types";

type Props = {
  // rules contain functions, which can't be passed from a Server Component, so look them up by id
  gameId: string;
  startGame: (players: Player[]) => void;
};

export default function InitGame({ gameId, startGame }: Props) {
  const rules = getGameRules(gameId);
  const [players, setPlayers] = useState<Player[]>([]);
  const error = validatePlayers(players, rules);

  function handleAddPlayer(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const playerName = new FormData(form).get("name")?.toString().trim();
    if (!playerName) return;
    if (players.find(player => player.name === playerName)) return;
    setPlayers(prev => [...prev, { id: crypto.randomUUID(), name: playerName }]);
    form.reset();
  }

  function handleRemovePlayer(playerId: string) {
    setPlayers(prev => prev.filter(player => player.id !== playerId));
  }

  return (
    <section className="w-full max-w-96">
      <div className="flex flex-wrap gap-4 mb-4">
        {players.map(player => (
          <button key={player.id} className="bg-primary text-background border-2 border-primary flex items-center justify-center px-4 py-1 rounded-full cursor-pointer hover:bg-background hover:text-primary" onClick={() => handleRemovePlayer(player.id)} aria-label={`Remove ${player.name}`}>
            {player.name}
            {" "}
            &times;
          </button>
        ))}
      </div>

      <form className="mb-6 flex" onSubmit={handleAddPlayer}>
        <input id="newPlayer" type="text" name="name" className="border-2 border-primary flex-1 text-foreground px-4 py-1 rounded-tl-lg rounded-bl-lg" data-player-name />
        <button type="submit" className="bg-primary text-background font-bold border-2 border-primary border-l-0 px-4 py-1 rounded-tr-lg rounded-br-lg hover:bg-background hover:text-primary transition">Add player</button>
      </form>

      <button disabled={!!error} className="bg-secondary text-background border-2 border-secondary w-full px-4 py-1 rounded-lg hover:bg-background hover:text-secondary font-bold disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-secondary disabled:hover:text-background" onClick={() => startGame(players)} data-players={JSON.stringify(players)}>{error || "Start Game"}</button>
    </section>
  );
}
