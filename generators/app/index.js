'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
  }
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the smashing ${chalk.red('generator-moustache')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'fileUpper',
        message: 'nombre del recurso: ',
        default: 'ejm: Program'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      
    });
  }

  writing() {
    this.props.fileUpper =
        this.props.fileUpper.trim()[0].toUpperCase() + this.props.fileUpper.slice(1);
      this.props.fileLower = this.props.fileUpper.toLowerCase();


    this.fs.copyTpl (
      this.templatePath('provider.ts'),
      this.destinationPath('src/providers/' + this.props.fileLower + '.provider.ts'),
      { fileUpper: this.props.fileUpper, fileLower: this.props.fileLower }
    );
    this.fs.copyTpl (
      this.templatePath('model.ts'),
      this.destinationPath('src/models/' + this.props.fileLower + '.model.ts'),
      { fileUpper: this.props.fileUpper, fileLower: this.props.fileLower }
    );
    this.fs.copyTpl (
      this.templatePath('handler.ts'),
      this.destinationPath('src/handlers/' + this.props.fileLower + '.handler.ts'),
      { fileUpper: this.props.fileUpper, fileLower: this.props.fileLower }
    );
    this.fs.copyTpl (
      this.templatePath('store.ts'),
      this.destinationPath('src/store/' + this.props.fileLower + '.store.ts'),
      { fileUpper: this.props.fileUpper, fileLower: this.props.fileLower }
    );


    const handlerModule = this.fs.read('src/handlers/handler.module.ts');
    let newhandlerModule = handlerModule
        .replace(`\n    //handlers`, `,\n   ${this.props.fileUpper}Handler\n    //handlers`);
    newhandlerModule = newhandlerModule
        .replace(`@NgModule({`,
              `import { ${this.props.fileUpper}Handler } from './${this.props.fileLower}.handler';
          \n@NgModule({`);
    this.fs.write('src/handlers/handler.module.ts', newhandlerModule);



    const providerModule = this.fs.read('src/providers/provider.module.ts');
    let newproviderModule = providerModule
        .replace(`\n    //providers`, `,${this.props.fileUpper}Provider\n    //providers`);
    newproviderModule = newproviderModule
        .replace(`@NgModule({`,
              `import { ${this.props.fileUpper}Provider } from './${this.props.fileLower}.provider';
          \n@NgModule({`);
    this.fs.write('src/providers/provider.module.ts', newproviderModule);


    const storeModule = this.fs.read('src/store/store.module.ts');
    let newstoreModule = storeModule
        .replace(`\n    //stores`, `, ${this.props.fileUpper}Store\n    //stores`);
    newstoreModule = newstoreModule
        .replace(`@NgModule({`,
              `import { ${this.props.fileUpper}Store } from './${this.props.fileLower}.store';
          \n@NgModule({`);
    this.fs.write('src/store/store.module.ts', newstoreModule);




    const routes = this.fs.read('src/routes.ts')
    const newroutes= routes.replace(`\n    //routes`,`,\n   ${this.props.fileLower}\n    //routes`)
      this.fs.write('src/routes.ts', newroutes);

  }

  install() {
    // this.installDependencies();
  }
};
