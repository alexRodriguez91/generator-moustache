import { propName } from '../app-variables';
import { primary, foreign, toList } from '../decorators';

export class <%= fileUpper %> {
  @primary id?: number;
  name: string;
  @foreign example: number;
  

  foreigns: any = {}
  @toList joins;

  constructor() {
    this.joins = {
      example: 'example_id'
    }
  }
  
}