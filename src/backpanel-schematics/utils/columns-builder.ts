import { classify } from "@angular-devkit/core/src/utils/strings";
import { Tree } from "@angular-devkit/schematics";
var pluralize = require('pluralize');
const regex = /(export\s*class\s*\w+\s*)(\{\s*(?:.*?|\s*)*?\s*\})/g;
const path = "./src/app/core/models/";
export function buildColumnsFormModels(tree: Tree, name: string) : string {
    var buffer = tree.read(`${path}${name}.model.ts`);
    if (!buffer)
        throw 'model file is not available';
    var content = buffer.toString();
    var matches = regex.exec(content);
    if (!matches || matches.length < 2)
        throw 'invalid model file content';
    var names = extractModelNames(matches[2]);
    var cols = buildCols(names);
    var result = stringifyColumns(cols);
    return result;
    
}
function extractModelNames(modelBody: string): string[] {
    var cleanText = modelBody.replace((/  |\r\n|\n|\r/gm), "");
    var propRegex = /\s*\w+\s*:\s*\w+;/g;
    var matches = cleanText.match(propRegex);
    if (!matches)
        throw 'invalid model props content';
    var names = matches.map(c => c.split(':')[0]);
    return names;
}
function buildCols(names: string[]) {
    var cols: Column[] = [
        {
            title: 'Id',
            prop: 'id',
            sortable: true,
            show: true
        }
    ];
    names.forEach(name => {
        const col: Column = {
            title: classify(name),
            prop: name,
            sortable: false,
            show: true
        }
        cols.push(col)
    });
    cols.push(...[
        {
            prop: "createdAt",
            title: "Created At",
            show: true,
            sortable: true
        },
        {
            prop: "lastUpdate",
            title: "Last Update",
            show: true,
            sortable: true
        },
        {
            prop: "Actions",
            title: "Actions",
            show: true,
            sortable: false
        }
    ])
    return cols;
}
function stringifyColumns(cols:Column[]):string
{
        var json= JSON.stringify(cols,null,4);
        var finalJson = json.replace(/"?'?\w+"?'?\s*:/gm,(match,_text,_) => {
            return match.replace(/"/gm,"").replace(/"/gm,"");
        });
        return finalJson;

}
export interface Column {
    title: string;
    prop: string;
    sortable: boolean;
    show: boolean;


}