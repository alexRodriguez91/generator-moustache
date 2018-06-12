import { primary, foreign } from '../decorators';
import { model } from './model.class';

export class <%= props.model %> extends model {
  @primary id?: number;
  //example foregin keys:
  // @foreign prop_id: any;
  
  constructor() {
    super()
    this.joinNodes = {
      example: 'example_id'
    }
  }
  
}