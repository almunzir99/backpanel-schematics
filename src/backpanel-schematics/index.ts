import { dasherize } from '@angular-devkit/core/src/utils/strings';
import { apply, MergeStrategy, mergeWith, Rule, SchematicContext, strings, template, Tree, url } from '@angular-devkit/schematics';
import { updateMenuList } from './utils/menu-list-modifier';
import { updateDashboardRoutesArray } from './utils/routes-modifier';
var pluralize = require('pluralize')


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function backpanelSchematics(_options: BackPanelOptions): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    const sourceTemplate = url("./templates");
    const sourceParamterizedTemplate = apply(sourceTemplate, [
      template({
        ..._options,
        ...strings,
        normalize,
      })
    ]);
    updateMenuList(_tree,_options.name,'Pages');
    updateDashboardRoutesArray(_tree,_options.name);
    return mergeWith(sourceParamterizedTemplate,MergeStrategy.Overwrite);
  };
}
 
function normalize(name: string): string {

  return (dasherize(pluralize(name)));

}