import { classify, dasherize } from '@angular-devkit/core/src/utils/strings';
import { apply, MergeStrategy, mergeWith, move, Rule, SchematicContext, SchematicsException, strings, template, Tree, url } from '@angular-devkit/schematics';
import { buildColumnsFormModels } from './utils/columns-builder';
import { updateMenuList } from './utils/menu-list-modifier';
import { updateDashboardRoutesArray } from './utils/routes-modifier';
var pluralize = require('pluralize')

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function backpanelSchematics(_options: BackPanelOptions): Rule {
  if (!_options.group)
    _options.group = "Pages";
  if (!_options.title)
    _options.title = classify(pluralize(_options.name));
  return async (_tree: Tree, _context: SchematicContext) => {
    const sourceTemplate = url("./templates");
    var cols = buildColumnsFormModels(_tree, _options.name);
    var templateOptions = { name: _options.name, cols: cols,title:_options.title, group:_options.group };
    const sourceParamterizedTemplate = apply(sourceTemplate, [
      template({
        ...templateOptions,
        ...strings, 
        normalize,
      }),
    ]);
    updateMenuList(_tree, _options);
    updateDashboardRoutesArray(_tree, _options.name);
    return mergeWith(sourceParamterizedTemplate, MergeStrategy.Overwrite);
  };
}

function normalize(name: string): string {

  return (dasherize(pluralize(name)));

}