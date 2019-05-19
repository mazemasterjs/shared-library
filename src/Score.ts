import uuid from 'uuid/v4';
import { GAME_RESULTS } from './Enums';
import { IScore } from './IScore';
import Logger from '@mazemasterjs/logger';

const log = Logger.getInstance();

export class Score {
  private mazeId: string;
  private teamId: string;
  private gameId: string;
  private botId: string;
  private gameRound: number;
  private id: string;
  private lastUpdated: number;
  private gameResult: GAME_RESULTS;
  private moveCount: number;
  private backtrackCount: number;
  private bonusPoints: number;

  constructor(data?: IScore) {
    if (data !== undefined) {
      // validate that the any-type data matches the interface
      if (!this.isValid(data)) {
        const err = new Error(
          'Invalid object data provided. See @mazemasterjs/shared-library/IScore for interface requirements.',
        );
        log.error(__filename, 'constructor(data?: IScore)', 'Error instantiating object ->', err);
        throw err;
      }

      this.id = data.id;
      this.mazeId = data.mazeId;
      this.teamId = data.teamId;
      this.gameId = data.gameId;
      this.gameRound = data.gameRound;
      this.lastUpdated = data.lastUpdated;
      this.botId = data.botId;
      this.gameResult = data.gameResult;
      this.moveCount = data.moveCount;
      this.bonusPoints = data.bonusPoints;
      this.backtrackCount = data.backtrackCount;
    } else {
      this.id = uuid();
      this.mazeId = '';
      this.teamId = '';
      this.gameId = '';
      this.gameRound = 1;
      this.lastUpdated = -1;
      this.botId = '';
      this.gameResult = GAME_RESULTS.IN_PROGRESS;
      this.moveCount = 0;
      this.bonusPoints = 0;
      this.backtrackCount = 0;
    }
  }

  /**
   * Increments the players move count by one.
   */
  public addMove() {
    this.lastUpdated = Date.now();
    this.moveCount++;
  }

  /**
   * Increments the player move count by the given number.
   * In some situations, the game server may need to increment by more than one.
   * @param number - the number of moves to add to player's move count
   *
   */
  // TODO: This is probably deprecated...
  public addMoves(moves: number) {
    this.lastUpdated = Date.now();
    this.moveCount = this.moveCount + moves;
  }

  /**
   * Increment the Backtrack Counter by 1
   */
  public addBacktrack() {
    this.backtrackCount++;
    this.lastUpdated = Date.now();
  }

  /**
   * Calculate and return the total game score.  All games start with 1000
   * points.  Then:
   *
   * Add bonusPoints (awarded when trophies are added)
   * Subtract moveCount
   * Subtract backtrackCount * 2
   *
   * gameResults generally reflected via trophies, but special cases:
   * - ABANDONED: Score reset to zero
   * - OUT_OF_TIME: Score reset to zero
   *
   *
   * @returns number - the total score for the game
   */
  public getTotalScore(): number {
    if (this.gameResult === GAME_RESULTS.ABANDONED || this.gameResult === GAME_RESULTS.OUT_OF_TIME) {
      return 0;
    } else {
      // all game start with 1000 points
      let total = 1000;

      total += this.bonusPoints;
      total -= this.moveCount;
      total -= this.backtrackCount * 2;

      return total;
    }
  }

  /**
   * Have to manually validate provided data object since it
   * it could be provided by a JSON document body or loaded
   * as a JSON document from the database.
   */
  private isValid(data: any): boolean {
    const valid =
      typeof data.id === 'string' &&
      typeof data.mazeId === 'string' &&
      typeof data.teamId === 'string' &&
      typeof data.gameId === 'string' &&
      typeof data.gameRound === 'number' &&
      typeof data.lastUpdated === 'number' &&
      typeof data.botId === 'string' &&
      typeof data.gameResult === 'number' &&
      typeof data.moveCount === 'number' &&
      typeof data.bonusPoints === 'number' &&
      typeof data.backtrackCount === 'number';

    if (!valid) {
      log.warn(__filename, `isValid(${JSON.stringify(data)})`, 'Data validation failed.');
    } else {
      log.trace(__filename, 'isValid(data:any)', 'Data validated.');
    }

    return valid;
  }

  /**
   * Returns the last time (Date.now()) the score object was updated
   * @returns number
   */
  public get LastUpdated(): number {
    return this.lastUpdated;
  }

  /**
   * Sets BotId to associate with this score
   */
  public set BotId(botId: string) {
    this.botId = botId;
  }

  /**
   * @returns BotId for the bot associated with this score
   */
  public get BotId(): string {
    return this.botId;
  }

  /**
   * BacktrackCount represents the number of times a bot has
   * re-entered a maze cell.  Used for trophies and bonus scoring
   */
  public get BacktrackCount(): number {
    return this.backtrackCount;
  }

  /**
   * @return string - the MazeId associated with this score
   */
  public get MazeId(): string {
    return this.mazeId;
  }

  /**
   * Set the MazeId for this score
   * @param mazeId, string - a generated MazeId in the format of "height:width:challenge:name"
   *
   */
  public set MazeId(value: string) {
    this.mazeId = value;
  }

  /**
   * @returns string - The TeamId associated with this score
   */
  public get TeamId(): string {
    return this.teamId;
  }

  /**
   * Sets the TeamId associated with this store to the given string
   * @param string - The GUID of a specific team
   */
  public set TeamId(value: string) {
    this.teamId = value;
  }

  /**
   * @returns string - a GameId GUID generated by the game server
   */
  public get GameId(): string {
    return this.gameId;
  }

  /**
   * Set the GameId GUID (generally done by the game server)
   * @param string - a GUID GameId
   */
  public set GameId(value: string) {
    this.gameId = value;
  }

  /**
   * @param number - returns the game round (Note: Not currently used)
   */
  public get GameRound(): number {
    return this.gameRound;
  }

  /**
   * Set's the GameRound to the given value
   * @param number - the Game Round (Note: Not currently used)
   */
  public set GameRound(round: number) {
    this.gameRound = round;
  }

  /**
   * @return number - the total number of moves made by the player.
   */
  public get MoveCount(): number {
    return this.moveCount;
  }

  /**
   * @returns - the current number of bonus points accumulated
   */
  public get BonusPoints(): number {
    return this.bonusPoints;
  }

  /**
   * Sets the total number of bonus points to the given value.
   * @param number - bonus point value to apply
   */
  public set BonusPoints(value: number) {
    this.lastUpdated = Date.now();
    this.bonusPoints = value;
  }

  /**
   * Sets the total number of bonus points to the given value.
   * @param number - bonus point value to apply
   */
  public set addBonusPoints(value: number) {
    this.lastUpdated = Date.now();
    this.bonusPoints += value;
  }

  /**
   * @returns an enumerated value from Enums.GAME_RESULTS representing the game result
   */
  public get GameResult(): GAME_RESULTS {
    return this.gameResult;
  }

  /**
   * Set the GameResult to one of the values in Enums.GAME_RESULTS
   */
  public set GameResult(value: GAME_RESULTS) {
    this.lastUpdated = Date.now();
    this.gameResult = value;
  }

  public get Id(): string {
    return this.id;
  }
}

export default Score;
