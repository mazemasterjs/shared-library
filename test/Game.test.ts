// import { IMazeStub } from '../src/IMazeStub';
// import { IAction } from '../src/IAction';
// import { IGameStub } from '../src/IGameStub';
import Logger from '@mazemasterjs/logger';
import { Game } from '../src/Game';
import { Maze } from '../src/Maze';
import { Team } from '../src/Team';
import { Score } from '../src/Score';
import { Player } from '../src/Player';
import { Bot } from '../src/Bot';
import { expect } from 'chai';
import { GAME_STATES, PLAYER_STATES, TROPHY_IDS } from '../src/Enums';

// test cases
describe('IMazeStub Tests', () => {
  const log = Logger.getInstance();
  let game: Game;
  let maze: Maze;
  let team: Team;
  let player: Player;
  let score: Score;
  const height = 3;
  const width = 4;
  const challenge = 5;
  const name = 'GameTestName';
  const seed = 'GameTestSeed';
  const botName = 'GameTestBotName';
  const botCoder = 'GameTestBotCoder';
  const botWeight = 100;
  const teamName = 'GameTestTeamName';
  const teamLogo = 'GameTestTeamLogo.png';

  before(`Game-related objects created without error.`, () => {
    maze = new Maze().generate(height, width, challenge, name, seed);

    // create a bot for the team
    const bot = new Bot();
    bot.Coder = botCoder;
    bot.Name = botName;
    bot.Weight = botWeight;

    // create a team for the game
    team = new Team();
    team.Name = teamName;
    team.Logo = teamLogo;
    team.Bots.push(bot);
    team.addTrophy(TROPHY_IDS.DAZED_AND_CONFUSED);

    // create a score for the game
    score = new Score();
    score.MazeId = maze.Id;
    score.GameRound = 1;
    score.TeamId = team.Id;
    score.BotId = team.Bots[0].Id;

    // create a  player for the game
    player = new Player(maze.StartCell, PLAYER_STATES.NONE);

    // create the game
    game = new Game(maze, team, player, score, 1, team.Bots[0].Id);

    return expect(game).to.not.equal(undefined);
  });

  it(`Game.State should equal GAME_STATES.NEW`, () => {
    expect(game.State).to.equal(GAME_STATES.NEW);
  });

  it(`Player.Location should equal maze.StartCell`, () => {
    expect(game.Player.Location.equals(game.Maze.StartCell)).to.equal(true);
  });

  it(`game.Player.State should be PLAYER_STATES.NONE`, () => {
    expect(game.Player.State).to.equal(PLAYER_STATES.NONE);
  });

  it(`game.Player.addState(PLAYER_STATES.STANDING) should set player state to STANDING`, () => {
    game.Player.addState(PLAYER_STATES.STANDING);
    expect(game.Player.State).to.equal(PLAYER_STATES.STANDING);
  });

  it(`game.Player.addState(PLAYER_STATES.STUNNED) should set player state to STANDING & STUNNED`, () => {
    game.Player.addState(PLAYER_STATES.STUNNED);
    expect(game.Player.State).to.equal(PLAYER_STATES.STANDING + PLAYER_STATES.STUNNED);
  });

  it(`game.Player.addState(PLAYER_STATES.SITTING) should set player state to SITTING and remove STANDING`, () => {
    game.Player.addState(PLAYER_STATES.SITTING);
    expect(game.Player.State).to.equal(PLAYER_STATES.SITTING + PLAYER_STATES.STUNNED);
  });

  it(`game.Player.addState(PLAYER_STATES.STANDING) should set player state to STUNNED and STANDING, and remove SITTING`, () => {
    game.Player.addState(PLAYER_STATES.STANDING);
    expect(game.Player.State).to.equal(PLAYER_STATES.STANDING + PLAYER_STATES.STUNNED);
  });

  it(`game.Player.addState(PLAYER_STATES.LYING) should set player state to STUNNED and LYING, and remove STANDING`, () => {
    game.Player.addState(PLAYER_STATES.LYING);
    expect(game.Player.State).to.equal(PLAYER_STATES.LYING + PLAYER_STATES.STUNNED);
  });

  it(`game.Player.removeState(PLAYER_STATES.LYING) should set player state to STUNNED`, () => {
    game.Player.removeState(PLAYER_STATES.LYING);
    expect(game.Player.State).to.equal(PLAYER_STATES.STUNNED);
  });

  it(`game.Player.clearStates() should set player state to NONE`, () => {
    game.Player.clearStates();
    expect(game.Player.State).to.equal(PLAYER_STATES.NONE);
  });

  after('Generate text render with player position', () => {
    log.debug(__filename, 'after()', '\n\r\n\r' + game.Maze.generateTextRender(true, game.Player.Location));
  });
});
