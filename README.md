# Bootstrap 4 Style guide

This is a basic starter style guide for [Bootstrap 4](http://v4-alpha.getbootstrap.com/). It includes a Sass compiler and a set of nunjucks HTML templates for you. [nunjucks](https://github.com/mozilla/nunjucks) is a powerful templating engine for JavaScript with inheritance, asynchronous control, and more (jinja2 inspired).

## Installation

To use this template, your computer needs:

- [NodeJS](https://nodejs.org/en/) (0.12 or greater)
- [Git](https://git-scm.com/)

This template can be installed with the Bootstrap CLI, or downloaded and set up manually.

### Using the CLI

Install the Bootstrap CLI with this command:

```bash
npm install bootstrap-cli --global
```

Use this command to set up a Bootstrap 4 Style guide with this template:

```bash
bootstrap new --template styleguide
```

The CLI will prompt you to give your project a name. The template will be downloaded into a folder with this name.

### Manual Setup

To manually set up the template, first download it with Git:

```bash
git clone https://github.com/bassjobsen/bootstrap-styleguide projectname
```

Then open the folder in your command line, and install the needed dependencies:

```bash
cd projectname
npm install
bower install
```

Finally, run `npm start` to run the Sass and HTML template compiler. They will re-run every time you save a Sass or HTML temaplate file.
