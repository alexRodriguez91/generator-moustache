import { Store, simpleStore } from './main.store';
import { <%= fileUpper %>Provider } from '../providers/<%= fileLower %>.provider';
import { <%= fileUpper %> } from '../models/<%= fileLower %>.model';
import { Injectable } from '@angular/core';
import { routes } from '../routes';

@Injectable()
export class <%= fileUpper %>Store implements simpleStore<<%= fileUpper %>> {

  type = routes.cohesion.nodes.<%= fileLower %>s;

  constructor(
    public store: Store,
    public <%= fileLower %>Provider: <%= fileUpper %>Provider
  ) {
  }

  /**
   * Devuelve uno o todos los <%= fileLower %>as del store
   * @param id id del <%= fileLower %>
   * @param foreign array de keys de otras tablas
   * @param joins array de tablas intermedias
   */
  get<T>(id: number = null, foreign: Array <any> = [], joins: Array <any> = null): Promise <T> {
    const found = this.store.findInStore<T>(id, this.type)
    if(!found) {
      return this.<%= fileLower %>Provider.read<T>(id).then(<%= fileLower %> => 
        this.store.resolveForeigns(<%= fileLower %>, foreign).then(resp => 

          this.store.resolveJoins(<%= fileLower %>, joins).then(resp=>resp)
        )
        .then(resp => {
          return <%= fileLower %>
        })
          
        ).then(program =>{
          this.store.addInStore(Object.assign(new <%= fileUpper %>(), program), this.type)
          return program;
        })
    } else {
      return Promise.resolve(found)
    }
  
  }


  getAll<T>(): Promise <Array<T>> {
    const found = this.store.findAllInStore<T>(this.type)
    if (!found) {
      return this.programProvider.readAll<T>().then(programs => {
          this.store.addInStore(programs.map(program => Object.assign(new <%= fileUpper %>(), program)), this.type)
          return programs;
        })
    } else {
      return Promise.resolve(found)
    }

  }

  set<T>() {
    
  }
  update() {}
  create() {}
  delete() {}

} 