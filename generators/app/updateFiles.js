module.exports = {
  handler: function(handlerModule, props) {
    return handlerModule
      .replace(
        /\r?\n\s*\/\/handlers/gm,
        `,\r\n    ${props.model}Handler\r\n    //handlers`
      )
      .replace(
        /@NgModule\(\{/gm,
        `import { ${props.model}Handler } from './${
          props.modelLowCase
        }.handler';\r\n@NgModule({`
      );
  },

  routes: function(routes, props) {
    var regex = new RegExp(`\\r?\\n\\s*\\/\\/${props.api}Routes`, 'gm');
    return routes.replace(
      regex,
      `,\r\n      ${props.nodeLowCase}:'${props.nodeLowCase}'\r\n      //${
        props.api
      }Routes`
    );
  },

  store: function(storeModule, props) {
    const newstoreModule = storeModule.replace(
      /\r?\n\s*\/\/stores/gm,
      `,\r\n    ${props.model}Store\r\n    //stores`
    );
    return newstoreModule.replace(
      `@NgModule({`,
      `import { ${props.model}Store } from './${props.modelLowCase}.store';
          \r\n@NgModule({`
    );
  },

  providers: function(providerModule, props) {
    const newproviderModule = providerModule.replace(
      /\r?\n\s*\/\/providers/gm,
      `,\r\n  ${props.model}Provider\r\n  //providers`
    );
    return newproviderModule.replace(
      /@NgModule\(\{/gm,
      `import { ${props.model}Provider } from './${
        props.modelLowCase
      }.provider';\r\n@NgModule({`
    );
  }
};
