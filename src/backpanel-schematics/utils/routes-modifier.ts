import { classify, dasherize } from "@angular-devkit/core/src/utils/strings";
import { Tree } from "@angular-devkit/schematics";
var pluralize = require('pluralize')

const routesRegex = /(const\s*?routes:\s*?Routes\s*?=\s*?\[\s*?\{\s*\w+:\'\s*\',\s*\w+:\w+,\s*\w+:\s*\[)((?:.*?|\s*)*?)(\]\s*\}\s*\]\;?)/g;
const path = './src/app/dashboard/dashboard-routing.module.ts';
export function updateDashboardRoutesArray(tree: Tree,name:string) : Tree  {
    var buffer = tree.read(path);
    if (!buffer)
        throw 'invalid routing file path';
    var content = buffer.toString();
    const matches = routesRegex.exec(content);
    if(!matches)
        throw 'invalid file provided';
    var target = (matches) ? matches[0] : null;
    if (target)
        content = content.replace(target.toString(), '@modifiedRoutes');
    var modifiedRoutes = appendNewRoute(matches,name);
    content = content.replace("@modifiedRoutes",modifiedRoutes);
    tree.overwrite(path,content);
    return tree;
    
}
function appendNewRoute(regexArray: string[], name: string) : string {
    var result = '';
    regexArray.forEach((array, index) => {
        if (index == 2) {
            var newArray = array;
            if (!array.trim().replace('\n', '').endsWith(','))
                newArray = array.trim().replace('\n', '') + ',\n';
             newArray = newArray + `    {\n      path:'${pluralize(name)}',\n      loadChildren: () => import('./pages/${dasherize(pluralize(name))}/${dasherize(pluralize(name))}.module').then(c => c.${classify(pluralize(name))}Module)\n    }\n`
            result += newArray;
        }
        else if(index != 0) {
            result += array;
        }
    });
    return result;
}

