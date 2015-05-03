
/// <reference path="uiview.ts" />
/// <reference path="checkbutton.ts" />

module app {

	class AppController3 {

		static mainElement(resources: ui.Resources): HTMLElement {
			var controller = new AppController3();
			controller.resources = resources;
			var UI = {
	    		content: [{
	    			content: [{
	    				tag: "span",
						content: ["#label.message"]
		    		}, {
		    			tag: "span",
		    			content: "&nbsp;"
		    		}, {
		    			id: "txtinput",
		    			tag: "input"
		    		}, {
		    			tag: "span",
		    			content: "&nbsp;"
		    		}, {
		    			tag: "button",
		    			content: ["#btn.pressme"],
		    			events: {click: "doPressMeClick"}
	    			}]
	    		}, {
	    			id: "divresult"
	    		}]
			};

			return ui.HTML.build(controller, resources, UI);
		}

		resources: ui.Resources;

    	txtinput: HTMLInputElement;
    	divresult: HTMLElement;

        doPressMeClick(e: Event): any {
            this.divresult.innerText = this.resources.format("label.hello", this.txtinput.value);
        }
	}

    class AppView2 extends ui.View {
    	static UI = {
    		content: [{
    			content: [{
    				tag: "span",
					content: ["#label.message"]
	    		}, {
	    			tag: "span",
	    			content: "&nbsp;"
	    		}, {
	    			id: "txtinput",
	    			tag: "input"
	    		}, {
	    			tag: "span",
	    			content: "&nbsp;"
	    		}, {
	    			tag: "button",
	    			content: ["#btn.pressme"],
	    			events: {click: "doPressMeClick"}
    			}]
    		}, {
    			id: "divresult"
    		}]
    	}
    	txtinput: HTMLInputElement;
    	divresult: HTMLElement;
        doPressMeClick(e: Event): any {
            this.divresult.innerText = this.resources.format("label.hello", this.txtinput.value);
        }
    }

    class CustomView1 extends ui.View {
    	static UI: ui.UIDefinition = {id: "container"};
    	container: HTMLElement;
        model: string;
        initialize() {
            this.model = this.controller.getModel();
            this.container.innerText = this.model;
        }
    }

    class AppView extends ui.View {

        static UI: ui.UIDefinition = {
            content: [{
                tag: "h1",
                content: ["#h1.title"]
            }, {
                view: CustomView1,
            }, {
                id: "btncreateinv",
                tag: "button",
                content: ["#btn.pressme"],
                events: {"click": "doButtonClick"}
            }, {
                view: ui.CheckButton,
                events: {"click": "doCheckButtonClick"}
            }, {
                id: "txtresult"
            }]
        };

        btncreateinv: HTMLElement;
        txtresult: HTMLElement;

        doCheckButtonClick(e: Event): any {
            console.log("Checkbutton!!! ");
            console.dir(e);
            this.txtresult.innerText = this.resources.getString("txtresult.checksuccess");
        }
        doButtonClick(e: Event): any {
            console.log("clicked!!!");
            this.txtresult.innerText = this.resources.getString("txtresult.success");
        }
        getModel(): string {
            return "This is my model";
        }
    }

    export function main() {
        var resources: ui.Resources = new ui.SimpleResources({
            "h1.title": "Título arrasador",
            "btn.pressme": "Púlsame",
            "txtresult.success": "Éxito arrollador",
            "txtresult.checksuccess": "Éxito arrollador del check",
            "label.message": "Say your name",
            "label.hello": "Hello {0}!!!"
        });

        var sample1container: HTMLElement = document.getElementById("sample1container");
        sample1container.appendChild(AppController3.mainElement(resources));

		var sample2container: HTMLElement = document.getElementById("sample2container");
        sample2container.appendChild(ui.HTML.build(null, resources, {view: AppView2}));

		var sample3container: HTMLElement = document.getElementById("sample3container");
        var w: ui.View = new AppView();
        w.resources = resources;
		sample3container.appendChild(w.build());
    }
}
