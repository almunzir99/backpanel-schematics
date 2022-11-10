import { classify } from "@angular-devkit/core/src/utils/strings";
import { Tree } from "@angular-devkit/schematics";
var pluralize = require('pluralize')
const regex = /(const MenuList: MenuGroup\[\] = )(\[(?:.*?|\s*)*?\]\s*\}\s*\]);?/g;
const path = './src/app/dashboard/components/menu/menu.list.ts';
export function updateMenuList(tree: Tree, name: string, group: string,title:string) : Tree {
    var buffer = tree.read(path);
    if (!buffer)
        throw 'menu list file is not available';
    var content = buffer.toString();
    var extractedContent = extractMenuList(content);
    content = content.replace(extractedContent, '@modified');
    var result = updateMenuItem(extractedContent, name, group,title);
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
function updateMenuItem(menuString: string, name: string, group: string,title:string):string {
    var json = menuString.replace((/  |\r\n|\n|\r/gm), "");
    const newItem = {
        title: title,
        icon: '',
        route: `/dashboard/${pluralize(name)}`,
        permissionName: `${classify(pluralize(name))}Permissions`
    };
    json = json.replace(/(\w+\s*:)/gm, (_match, _text, _href) => {
        return `"${_match.replace(':', '')}":`;
    });
    json = json.replace(/},\s*]/gm, "}]");
    json = json.replace(/'/g,'"');
    var arrObj = JSON.parse(json) as any[];
    var targetGroup = arrObj.find(c => c['title'] === group);
    if(!targetGroup){
        arrObj.push({
            title: group,
            children: []
        })
    }
    targetGroup = arrObj.find(c => c['title'] === group);
    (targetGroup['children'] as any[]).push(newItem);
    var finalJson = JSON.stringify(arrObj,null,4);
    finalJson = finalJson.replace(/"?'?\w+\s*"?'?\s*:/gm,(match,_text,_) => {
        return match.replace(/"/gm,"").replace(/"/gm,"");
    });
    return finalJson;

}

 