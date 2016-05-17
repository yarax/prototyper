const jsyaml = require('js-yaml');
const fs   = require('fs');
const ejs = require('ejs');

const prototype = jsyaml.load(fs.readFileSync(`${__dirname}/prototype.yaml`));

const keys = (obj) => obj ? Object.keys(obj) : null;

const targetDir = `${__dirname}/results/${keys(prototype.Components)[0]}`;
fs.mkdirSync(targetDir);

const iterate = (root) => {
  keys(root).forEach((componentName) => {
    if (typeof root[componentName] !== 'object') return;
    const tempName = componentName.match(/Container$/) ? 'component_container' : 'component';
    const temp = fs.readFileSync(`${__dirname}/templates/${tempName}.ejs`).toString();
    var children;
    if (!root[componentName]) {
      children = ['div'];
    } else {
      children = keys(root[componentName]).filter(childKey => typeof root[componentName][childKey] === 'object');
      children = children.length === 0 ? ['div'] : children;
    }

    const template = ejs.compile(temp);
    const str = template({
      componentName,
      children,
      component: root[componentName],
      prototype
    });
    fs.writeFileSync(`${targetDir}/${componentName}.js`, str);
    if (root[componentName]) {
      iterate(root[componentName]);
    }
  });
}


iterate(prototype.Components);
