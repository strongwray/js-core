const template =
    'My frames:' +
    '<%if(this.showFrame) {%>' +
    '<%for(var index in this.frame) {%>' +
    '<a href="#"><%this.frame[index]%></a>' +
    '<%}%>' +
    '<%} else {%>' +
    '<p>none</p>' +
    '<%}%>';

const templateEngine = function(tpl: string, obj: any): Function {
    const reg = /<%([^%>]+)?%>/g;
    const reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g;
    let code = 'let r=[];\n';
    let cursor = 0;
    let match;
    var add = (line: string, js: boolean) => {
        js ? code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n' :
            code += 'r.push("' + line.replace(/"/g, '\\"') + '");\n';
    }
    while (match = reg.exec(template)) {
        add(tpl.slice(cursor, match.index), false);
        add(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(tpl.slice(cursor, tpl.length), false);
    code += 'return r.join("");'; // <-- return the result
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(obj);
}

const newtemplate = templateEngine(template, {
    frame: ["angular", "react", "vue"],
    showFrame: true
});