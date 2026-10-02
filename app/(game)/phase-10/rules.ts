import type { GameRules, GameState } from "@/app/lib/games/types";
import { totals } from "@/app/lib/games/types";

export const PHASES = [
  "2 sets of 3",
  "A set of 3 + a run of 4",
  "A set of 4 + a run of 4",
  "A run of 7",
  "A run of 8",
  "A run of 9",
  "2 sets of 4",
  "7 cards of one color",
  "A set of 5 + a set of 2",
  "A set of 5 + a set of 3",
] as const;

// This is the Extra that gets added as the type in the generic. Adds completedPhase to round data
export type Phase10Extra = {
  completedPhase: Record<string, boolean>; // playerId completed phase
};

// sets up a type with players and rounds, where the Phase10Extra is added to rounds
type Phase10State = GameState<Phase10Extra>;

// checks the phases completed by player
export function phasesCompleted(state: Phase10State, playerId: string): number {
  return state.rounds.filter(r => r.completedPhase[playerId]).length;
}

// checks the current phase the player is on
export function currentPhase(state: Phase10State, playerId: string): number {
  return Math.min(phasesCompleted(state, playerId) + 1, PHASES.length);
}

// Gets all the players who made it through all phases and returns the one with the lowest score
export function winner(state: Phase10State): string | null {
  if (!phase10Rules.isGameOver(state)) return null;
  const scores = totals(state);
  const finishers = state.players.filter(
    p => phasesCompleted(state, p.id) >= PHASES.length,
  );
  finishers.sort((a, b) => scores[a.id] - scores[b.id]);
  return finishers[0].id;
}

export const phase10Rules: GameRules<Phase10Extra> = {
  id: "phase-10",
  name: "Phase 10",
  minPlayers: 2,
  maxPlayers: 6,

  isGameOver(state) {
    return state.players.some(
      p => phasesCompleted(state, p.id) >= PHASES.length,
    );
  },

  validateRound(round, state) {
    for (const p of state.players) {
      const score = round.scores[p.id];
      if (score === undefined) return `Enter a score for ${p.name}`;
      if (score < 0 || score % 5 !== 0) {
        return `${p.name}'s score must be 0 or a multiple of 5`;
      }
      if (score === 0 && !round.completedPhase[p.id]) {
        return `${p.name} went out, so they must have completed their phase`;
      }
    }
    if (!state.players.some(p => round.scores[p.id] === 0)) {
      return "One player must go out with 0 points";
    }
    return null;
  },
};
