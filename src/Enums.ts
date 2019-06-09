// Enumerated Trophy IDs
export enum TROPHY_IDS {
  CHEDDAR_DINNER,
  DAZED_AND_CONFUSED,
  DOUBLE_BACKER,
  FLAWLESS_VICTORY,
  JUMPING_JACK_FLASH,
  KICKING_UP_DUST,
  LIGHT_AT_THE_END,
  LOOPER,
  MIGHTY_MOUSE,
  NERVOUS_WALK,
  OUT_OF_MOVES,
  PAPERBACK_WRITER,
  SCRIBBLER,
  SHORTCUTTER,
  SPINNING_YOUR_WHEELS,
  THE_LONGER_WAY_HOME,
  THE_LONGEST_WAY_HOME,
  THE_LONG_WAY_HOME,
  TOO_HOT_TO_HANDLE,
  WASTED_TIME,
  WATCHING_PAINT_DRY,
  WISHFUL_DYING,
  WISHFUL_THINKING,
  YOU_FELL_FOR_IT,
  YOU_FOUGHT_THE_WALL,
}

// Player States (bitwise)
export enum PLAYER_STATES {
  NONE = 0,
  STANDING = 1,
  SITTING = 2,
  LYING = 4,
  STUNNED = 8,
  BLIND = 16,
  BURNING = 32,
  LAMED = 64,
  BEARTRAPPED = 128,
  SLOWED = 256,
  DEAD = 512,
}

// Cardinal directions (bitwise)
// Used for movement, exits, and other direction-based functions
export enum DIRS {
  NONE = 0,
  NORTH = 1,
  SOUTH = 2,
  EAST = 4,
  WEST = 8,
}

// CELL TAGS (bitwise)
export enum CELL_TAGS {
  NONE = 0,
  START = 1,
  FINISH = 2,
  PATH = 4,
  CARVED = 8,
  LAVA = 16,
}

// Various Trap IDs
// TODO: Does not need to be bitwise... @kreebog - remove
export enum CELL_TRAPS {
  NONE = 0,
  PIT = 1,
  BEARTRAP = 2,
  TARPIT = 4,
  FLAMETHOWER = 8,
}

// Available Player Actions
export enum COMMANDS {
  NONE,
  LOOK,
  SIT,
  STAND,
  MOVE,
  JUMP,
  WRITE,
  QUIT,
}

// enumeration of possible game results
export enum GAME_RESULTS {
  NONE,
  IN_PROGRESS,
  OUT_OF_MOVES,
  OUT_OF_TIME,
  DEATH_TRAP,
  DEATH_POISON,
  DEATH_LAVA,
  WIN,
  WIN_FLAWLESS,
  ABANDONED,
}

// enumeration of possible game states
export enum GAME_STATES {
  NEW,
  IN_PROGRESS,
  FINISHED,
  ABORTED,
  ERROR,
}

// enumeration of possible game modes
export enum GAME_MODES {
  NONE,
  SINGLE_PLAYER,
  MULTI_PLAYER,
}

// database types/names
export enum DATABASES {
  MAZES,
  SCORES,
  TEAMS,
}

/**
 * Function Modes - Used by some functions that need a
 * context in order to operate safely and correctly
 */
export enum FN_MODES {
  ADD,
  REMOVE,
}
