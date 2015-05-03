//
//
//
//

module ui {

    export class Resources {
        static DEFAULT: Resources = new Resources();

        // Default with no localization. Extend to localize
        getString(key:string): string {
            return key;
        }
        // final function should not be overwritten
        format(key: string, ...args: string[]) {
    		return this.getString(key).replace(/{(\d+)}/g, function(match: string, n: number) {
      			return typeof args[n] != "undefined" ? args[n] : match;
    		});
    	}
        // final function should not be overwritten
        getStringUI(key: string): string {
            if (key) {
                if (key.charAt(0) === "\\") {
                    return key.substring(1);
                } else if (key.charAt(0) === "#") {
                    return this.getString(key.substring(1));
                } else {
                    return key;
                }
            } else {
                return "";
            }
        }

    }

    export interface StringCollection {
       [index : string] : string;
    }

    export class SimpleResources extends Resources {
        private _list: StringCollection;
        constructor(list: StringCollection) {
            super();
            this._list = list;
        }
        getString(key: string): string {
            return this._list[key];
        }
    }

    // UIDefinition

    export type UIDefinition = string | ViewDefinition | DOMDefinition;

    export interface IDDefinition {
        id?: string;
    }

    export interface ViewDefinition extends IDDefinition {
        view: typeof View;
        attributes?: StringCollection;
        events?: StringCollection;
    }

    export interface DOMDefinition extends IDDefinition {
        tag?: string;
        content?: string | UIDefinition[];
        attributes?: StringCollection;
        events?: StringCollection;
    }


    export class View {
    	static UI: UIDefinition = {};
        controller: any;
        resources: Resources;

        createUI(): UIDefinition {
            return this.constructor["UI"];
        }

        initialize(): void {
        }

        build(attributes?: StringCollection, events?: StringCollection): HTMLElement {
            var n: any;
            var childel: HTMLElement = HTML.build(this, this.resources, this.createUI());
            if (attributes) {
                for (n in attributes) {
                    this[n] = attributes[n];
                }
            }
            if (events) {
                for (n in events) {
                    this[n] = HTML.buildEvent(this.controller, events[n]);
                }
            }
            this.initialize();
            return childel;
        }
    }

    export class HTML {

        static buildEvent(controller: any, method : string) {
            return function (e: Event): any {
                return controller[method].call(controller, e);
            };
        }

        static build(controller: any, resources: Resources, ui: UIDefinition): HTMLElement {

            var childel: HTMLElement;
            var child: any;
            var n: any;

            if (typeof ui === "string") {
                child = document.createTextNode(resources.getStringUI(ui));
                childel = child;
            } else if ((<ViewDefinition> ui).view) {
                // ViewDefinition
                var uiview = (<ViewDefinition> ui);
                child = new uiview.view();
                child.controller = controller;
                child.resources = resources;
                childel = child.build(uiview.attributes, uiview.events);
            } else {
                // DOMDefinition
                var uidom = <DOMDefinition> ui;
                child = document.createElement(uidom.tag || "div");
                childel = child;
                if (uidom.content) {
                    if (typeof uidom.content === "string") {
                        childel.innerHTML = resources.getStringUI(<string> uidom.content);
                    } else {
                        var uidefs = <UIDefinition[]> uidom.content;
                        for (n in uidefs) {
                            childel.appendChild(HTML.build(controller, resources, uidefs[n]));
                        }
                    }
                }
                if (ui.attributes) {
                    for (n in ui.attributes) {
                        childel.setAttribute(n, ui.attributes[n]);
                    }
                }
                if (ui.events) {
                    for (n in ui.events) {
                        childel.addEventListener(n, HTML.buildEvent(controller, ui.events[n]), false);
                    }
                }
            }

            // If has "id" inject into controller.
            if ((<IDDefinition> ui).id) {
               	controller[(<IDDefinition> ui).id] = child;
            }

            return childel;
        }
    }
}
