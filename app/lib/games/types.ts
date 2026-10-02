/**
 * The contract a game's rules must follow.
 *
 * validateRound returns an error message to show the user, or null if the round is valid
 */
export type GameRules<Extra extends object = object> = {
  id: string;
  name: string;
  minPlayers: number;
  maxPlayers: number;
  isGameOver(state: GameState<Extra>): boolean;
  validateRound?(
    round: RoundInput<Extra>,
    state: GameState<Extra>,
  ): string | null;
};

export type Player = {
  id: string;
  name: string;
};

/**
 * The scores for one round. Extra allows for extending the type for game specific round data
 */
export type RoundInput<Extra extends object = object> = {
  scores: Record<string, number>; // playerId, points in round
} & Extra;

/**
 * A round of scores with the round number
 */
export type Round<Extra extends object = object> = RoundInput<Extra> & {
  number: number;
};

/**
 * The whole state of the game. Contains all players, the rounds, and the scores per player per round
 */
export type GameState<Extra extends object = object> = {
  players: Player[];
  rounds: Round<Extra>[];
};

/**
 * The total scores per player in the game. It adds up each player's points across all rounds. Missing scores count as zero and player IDs not in state.players are ignored
 *
 * @param state The GameState (players and round scores)
 * @returns A Record of player IDs and their total score
 */
export function totals(state: GameState): Record<string, number> {
  const result: Record<string, number> = {};

  for (const p of state.players) {
    result[p.id] = 0;
  }

  for (const r of state.rounds) {
    for (const p of state.players) {
      result[p.id] += r.scores[p.id] ?? 0;
    }
  }

  return result;
}

/*
What is Extra?

Some games need to track more than simply points. For example, Phase 10 needs to track which players completed their phase.

Extra is where each game can attach their own fields. By default it's the object type with no fields, so a simple game only has scores.

An example of a Phase 10 round would be: { number: 3, scores: { alice: 55, bob: 0 }, completedPhase: { alice: false, bob: true }}
*/
