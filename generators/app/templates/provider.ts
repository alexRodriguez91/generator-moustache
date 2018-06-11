import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Provider } from './provider.class';
import { <%= fileUpper %> } from "../models/<%= fileLower %>.model";
import { routes } from '../routes';

@Injectable()
export class <%= fileUpper %>Provider extends Provider<<%= fileUpper %>> {
  constructor(public http: HttpClient) {
    super(http, routes.cohesion.nodes.<%= fileLower %>) // IMPORTANT, en plural
  }


}
