import { <%= props.model %>Store } from './../store/<%= props.modelLowCase %>.store';
import { <%= props.model %> } from '../models/<%= props.modelLowCase %>.model';
import { Injectable } from '@angular/core';
import { MainHandler } from './main.handler';


@Injectable()
export class <%= props.model %>Handler extends MainHandler <<%= props.model %>> {
  
  constructor(public <%= props.modelLowCase %>Store: <%= props.model %>Store) {
    super(<%= props.modelLowCase %>Store, new <%= props.model %>())
  }
  
}
