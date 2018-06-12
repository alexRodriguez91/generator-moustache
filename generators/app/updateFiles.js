module.exports = {
  handler: function(handlerModule, props) {
    return handlerModule
      .replace(/\r?\n\s*\/\/handlers/gm, `,\n    ${props.model}Handler\n    //handlers`)
      .replace(
        /@NgModule\(\{/gm,
        `import { ${props.model}Handler } from './${
          props.modelLowCase
        }.handler';\n@NgModule({`
      );
  },

  routes: function(routes, props) {
    var regex = new RegExp(`\\r?\\n\\s*\\/\\/${props.api}Routes`, 'gm');
    return routes.replace(
      regex,
      `,\n      ${props.nodeLowCase}:'${props.nodeLowCase}'\n      //${props.api}Routes`
    );
  },

  store: function(storeModule, props) {
    const newstoreModule = storeModule.replace(
      /\r?\n\s*\/\/stores/gm,
      `,\n    ${props.model}Store\n    //stores`
    );
    return newstoreModule.replace(
      `@NgModule({`,
      `import { ${props.model}Store } from './${props.modelLowCase}.store';
          \n@NgModule({`
    );
  },

  providers: function(providerModule, props) {
    const newproviderModule = providerModule.replace(
      /\r?\n\s*\/\/providers/gm,
      `,\n  ${props.model}Provider\n  //providers`
    );
    return newproviderModule.replace(
      /@NgModule\(\{/gm,
      `import { ${props.model}Provider } from './${
        props.modelLowCase
      }.provider';\n@NgModule({`
    );
  }
};
