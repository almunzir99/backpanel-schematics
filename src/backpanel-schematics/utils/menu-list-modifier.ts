import { classify } from "@angular-devkit/core/src/utils/strings";
import { Tree } from "@angular-devkit/schematics";
var pluralize = require('pluralize')
const regex = /(const MenuList: MenuGroup\[\] = )(\[(?:.*?|\s*)*?\]\s*\}\s*\]);?/g;
const path = './src/app/dashboard/components/menu/menu.list.ts';
export function updateMenuList(tree: Tree, options:BackPanelOptions) : Tree {
    var buffer = tree.read(path);
    if (!buffer)
        throw 'menu list file is not available';
    var content = buffer.toString();
    var extractedContent = extractMenuList(content);
    content = content.replace(extractedContent, '@modified');
    var result = updateMenuItem(extractedContent, options);
    content = content.replace('@modified',result);
    tree.overwrite(path,content);
    return tree;
    

}
function extractMenuList(content: string): string {
    const matches = regex.exec(content);
    if (!matches || matches.length < 2)
        throw 'Invalid menu list file content';
    return matches[2].toString();
}
function updateMenuItem(menuString: string, options:BackPanelOptions):string {
    var json = menuString.replace((/  |\r\n|\n|\r/gm), "");
    const newItem = {
        title: options.title,
        icon: options.icon,
        route: `/dashboard/${pluralize(options.name)}`,
        permissionName: `${classify(pluralize(options.name))}Permissions`
    };
    json = json.replace(/(\w+\s*:)/gm, (_match, _text, _href) => {
        return `"${_match.replace(':', '')}":`;
    });
    json = json.replace(/},\s*]/gm, "}]");
    json = json.replace(/'/g,'"');
    var arrObj = JSON.parse(json) as any[];
    var targetGroup = arrObj.find(c => c['title'] === options.group);
    if(!targetGroup){
        arrObj.push({
            title: options.group,
            children: []
        })
    }
    targetGroup = arrObj.find(c => c['title'] === options.group);
    (targetGroup['children'] as any[]).push(newItem);
    var finalJson = JSON.stringify(arrObj,null,4);
    finalJson = finalJson.replace(/"?'?\w+\s*"?'?\s*:/gm,(match,_text,_) => {
        return match.replace(/"/gm,"").replace(/"/gm,"");
    });
    return finalJson;

}

 