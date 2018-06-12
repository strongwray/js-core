import { Watcher } from './watcher';
import { Options } from './options';
import { Tank } from './tank';
export class Compile {
    $vm: Tank;
    $updater: Updater;
    constructor(el: string, vm: Tank) {
        this.$vm = vm;
        this.$updater = new Updater();
        const $el = document.querySelector(el);
        this.traverseElement($el);
    }
    traverseElement($el: any) {
        for (let node of $el.childNodes) {
            if (this.isElementNode(node)) {
                this._traverseAttributes(node, node.attributes);
            } else if (this.isTextNode(node)) {
                this.compileText(node);
            }
            if (node.childNodes && node.childNodes.length) {
                this.traverseElement(node);
            }
        }
    }
    _traverseAttributes(element: Element, attr: NamedNodeMap) {
        for (let i = 0; i < attr.length; i++) {
            let nodeName = attr[i].nodeName;
            let nodeValue = attr[i].nodeValue;
            if (this.isDirective(nodeName)) {
            } else if (this.isEventDirective(nodeName)) {
                const type = attr[i].nodeName.split(':')[1];
                this.addEvent(element, type, this.$vm.$options['methods'][nodeValue]);
            }
        }
    }
    compileText(element: Node) {
        const text = element.textContent;
        const reg = /\{\{(.*)\}\}/;
        if (reg.test(text)) {
            const exp = reg.exec(text)[1];        
            this.$updater.textUpdater(element, this._getVMVal(this.$vm, exp));
            new Watcher(this.$vm, exp, (newValue: any) => {
                this.$updater.textUpdater(element, newValue);
            });
        }
    }
    addEvent(el: Element, type: string, handle?: Function) {
        el.addEventListener(type, handle.bind(this.$vm) || function() {}, false);
    }
    _getVMVal(vm: Tank, exp: any) { // 获取vm数据
        let val = vm;
        exp = exp.split('.');
        exp.forEach((k: string) => { val = val[k]; });
        return val;
    }
    isElementNode (node: Node) {
        return node.nodeType == 1;
    }
    isTextNode(node: Node) {
        return node.nodeType == 3;
    }
    isDirective (attr: string) {
        return attr.indexOf('v-') == 0;
    }
    isEventDirective(attr: string) {
        return attr.indexOf('on') === 0;
    }
}

class Updater {
    textUpdater(node: Node, value: any) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    }
}