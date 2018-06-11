'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the smashing ${chalk.red('generator-moustache')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'fileUpper',
        message: 'name of file?',
        default: 'example'
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
    handlerModule.replace(`
  ]
})`, `,\n${this.props.fileUpper}Handler
]
})`);
    handlerModule.replace(`
@NgModule({`,`import { ${this.props.fileUpper}Handler } from './${this.props.fileLower}.handler';

@NgModule({`);
    this.fs.write('src/handlers/handler.module.ts', handlerModule);

    const routes = this.fs.read('src/routes.ts')
    routes.replace(`API_GESCO,
    nodes: toObj([`,`API_GESCO,
    nodes: toObj([
      ${this.props.fileLower},`)
      this.fs.write('src/routes.ts', routes);

  }

  install() {
    this.installDependencies();
  }
};
