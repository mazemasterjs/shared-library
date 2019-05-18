import { ITrophyStub } from './ITrophyStub';
/**
 * Interface for Bot Class
 */
export interface IBot {
  id: string;
  name: string;
  coder: string;
  weight: number;
  trophies: Array<ITrophyStub>;
}
