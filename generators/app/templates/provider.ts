import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Provider } from './provider.class';
import { <%= props.model %> } from "../models/<%= props.modelLowCase %>.model";
import { routes } from '../routes';

@Injectable()
export class <%= props.model %>Provider extends Provider<<%= props.model %>> {
  constructor(public http: HttpClient) {
    super(http, routes.<%= props.api %>.nodes.<%= props.nodeLowCase %>) // IMPORTANT, en plural
  }


}
