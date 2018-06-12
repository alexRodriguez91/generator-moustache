'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const update = require('./updateFiles.js');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the smashing ${chalk.red('generator-moustache')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'model',
        message: 'nombre del modelo: ',
        default: 'singular'
      },
      {
        type: 'input',
        name: 'node',
        message: 'nombre del nodo: ',
        default: 'plurales'
      },
      {
        type: 'input',
        name: 'api',
        message: 'nombre del API: ',
        default: 'master'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.props.model =
      this.props.model.trim()[0].toUpperCase() + this.props.model.slice(1);
    this.props.modelLowCase = this.props.model.toLowerCase();
    this.props.node = this.props.node.trim()[0].toUpperCase() + this.props.node.slice(1);
    this.props.nodeLowCase = this.props.node.toLowerCase();

    this.fs.copyTpl(
      this.templatePath('provider.ts'),
      this.destinationPath('src/providers/' + this.props.modelLowCase + '.provider.ts'),
      { props: this.props }
    );
    this.fs.copyTpl(
      this.templatePath('model.ts'),
      this.destinationPath('src/models/' + this.props.modelLowCase + '.model.ts'),
      { props: this.props }
    );
    this.fs.copyTpl(
      this.templatePath('handler.ts'),
      this.destinationPath('src/handlers/' + this.props.modelLowCase + '.handler.ts'),
      { props: this.props }
    );
    this.fs.copyTpl(
      this.templatePath('store.ts'),
      this.destinationPath('src/store/' + this.props.modelLowCase + '.store.ts'),
      { props: this.props }
    );

    const handlerModule = this.fs.read('src/handlers/handler.module.ts');
    let newhandlerModule = update.handler(handlerModule, this.props);
    this.fs.write('src/handlers/handler.module.ts', newhandlerModule);

    const providerModule = this.fs.read('src/providers/provider.module.ts');
    let newproviderModule = update.providers(providerModule, this.props);
    this.fs.write('src/providers/provider.module.ts', newproviderModule);

    const storeModule = this.fs.read('src/store/store.module.ts');
    let newstoreModule = update.store(storeModule, this.props);
    this.fs.write('src/store/store.module.ts', newstoreModule);

    const routes = this.fs.read('src/routes.ts');
    const newroutes = update.routes(routes, this.props);
    this.fs.write('src/routes.ts', newroutes);
  }

  install() {
    // This.installDependencies();
  }
};
