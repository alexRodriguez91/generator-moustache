import { <%= fileUpper %>Store } from './../store/<%= fileLower %>.store';
import { <%= fileUpper %> } from '../models/<%= fileLower %>.model';
import { Injectable } from '@angular/core';
import { MainHandler } from './main.handler';


@Injectable()
export class <%= fileUpper %>Handler extends MainHandler <<%= fileUpper %>> {
  
  constructor(public <%= fileLower %>Store: <%= fileUpper %>Store) {
    super(<%= fileLower %>Store, new <%= fileUpper %>())
  }
  
}
