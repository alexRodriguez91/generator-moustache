import { Store } from './main.store';
import { <%= props.model %>Provider } from '../providers/<%= props.modelLowCase %>.provider';
import { <%= props.model %> } from '../models/<%= props.modelLowCase %>.model';
import { Injectable } from '@angular/core';
import { routes } from '../routes';
import { MainStore } from './store.class';

@Injectable()
export class <%= props.model %>Store extends Store<<%= props.model %>> {

  type = routes.<%=props.api%>.nodes.<%= props.nodeLowCase %>;

  constructor(
    public store: Store,
    public <%= props.modelLowCase %>Provider: <%= props.model %>Provider
  ) {
    super(
      store,
      <%= props.modelLowCase %>Provider,
      routes.<%=props.api%>.nodes.<%= props.nodeLowCase %>,
      new <%=props.model%>()
    )
  }

}
