// import each rules from app/(game)/[game]/rules
import { phase10Rules } from "@/app/(game)/phase-10/rules";

import type { GameRules } from "./types";

// export each game from the import as an array of games
export const games: GameRules[] = [phase10Rules];
