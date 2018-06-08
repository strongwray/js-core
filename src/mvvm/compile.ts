import { Component } from './component';
export class Compile {
    vm: Component;
    constructor(vm: Component) {
        this.vm = vm;
        const $el = document.querySelector(vm.el);
        this._traverseElement($el);
    }
    _traverseElement($el: any) {
        if ($el.childNodes.length === 0) return;
        for (let node of $el.childNodes) {
            if (this._isElementNode(node)) {
                this._traverseAttributes(node, node.attributes);
                this._traverseElement(node);
            } else if (this._isTextNode(node)) {
                this._compileText(node);
            }
        }
    }
    _compileText(element: Node) {
        const text = element.textContent;
        const reg = /\{\{(.*)\}\}/;
        if (reg.test(text)) {
            const bindName = reg.exec(text)[1];
            element.textContent = this.vm.data[bindName];
        }
    }
    _traverseAttributes(element: Element, attr: NamedNodeMap) {
        for (let i = 0; i < attr.length; i++) {
            let nodeName = attr[i].nodeName;
            let nodeValue = attr[i].nodeValue;
            if (this._isDirective(nodeName)) {
            } else if (this._isEventDirective(nodeName)) {
                const type = attr[i].nodeName.split(':')[1];
                this._addEvent(element, type, this.vm.methods[nodeValue]);
            }
        }
    }
    _addEvent(el: Element, type: string, handle?: EventListenerOrEventListenerObject) {
        el.addEventListener(type, handle || function() {}, false);
    }
    _isElementNode (node: Node) {
        return node.nodeType == 1;
    }
    _isTextNode(node: Node) {
        return node.nodeType == 3;
    }
    _isDirective (attr: string) {
        return attr.indexOf('v-') == 0;
    }
    _isEventDirective(attr: string) {
        return attr.indexOf('on') === 0;
    }
}