
/// <reference path="uiview.ts" />

module ui {

    export class CheckButton extends View {
        static UI: ui.UIDefinition = {
            id: "container",
            tag: "button",
            attributes: {"class": "btn-check"},
            events: {"click": "doSelect"},
        };

        container: HTMLButtonElement;
        click(e: Event) {};

        private icon: HTMLElement;
        private selected: boolean;
        private disabled: boolean;

        initialize (): void {
            this.selected = false;
            this.disabled = false;

            this.icon = document.createElement("i");
            this.container.innerHTML = "";
            this.container.appendChild(this.icon);

            this.render();
        }

        doSelect(e: Event): any {
            this.setSelected(!this.isSelected());
            this.click(e);
        }

        isSelected(): boolean {
            return this.selected;
        }

        setSelected(value: boolean) {
            this.selected = value;
            this.render();
        }

        isDisabled(): boolean {
            return this.disabled;
        }

        setDisabled(value: boolean) {
            this.disabled = value;
            this.render();
        }

        private render(): void {
			this.icon.setAttribute("class", this.selected ? "fa fa-check-square-o" : "fa fa-square-o");
            this.container.disabled = this.disabled;
        }
    }
}
