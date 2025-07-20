export class BaseComponentLogic implements BaseModel {
  title: string = 'Default Title';
  colors: string[] = ['red', 'green', 'blue', 'yellow'];
  userInput: string = '';
}
export interface BaseModel {
  title: string;
  colors: string[];
  userInput: string;
}