//
//
//
//
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ui;
(function (ui_1) {
    var Resources = (function () {
        function Resources() {
        }
        Resources.prototype.getString = function (key) {
            return key;
        };
        Resources.prototype.format = function (key) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return this.getString(key).replace(/{(\d+)}/g, function (match, n) {
                return typeof args[n] != "undefined" ? args[n] : match;
            });
        };
        Resources.prototype.getStringUI = function (key) {
            if (key) {
                if (key.charAt(0) === "\\") {
                    return key.substring(1);
                }
                else if (key.charAt(0) === "#") {
                    return this.getString(key.substring(1));
                }
                else {
                    return key;
                }
            }
            else {
                return "";
            }
        };
        Resources.DEFAULT = new Resources();
        return Resources;
    })();
    ui_1.Resources = Resources;
    var SimpleResources = (function (_super) {
        __extends(SimpleResources, _super);
        function SimpleResources(list) {
            _super.call(this);
            this._list = list;
        }
        SimpleResources.prototype.getString = function (key) {
            return this._list[key];
        };
        return SimpleResources;
    })(Resources);
    ui_1.SimpleResources = SimpleResources;
    var View = (function () {
        function View() {
        }
        View.prototype.createUI = function () {
            return this.constructor["UI"];
        };
        View.prototype.initialize = function () {
        };
        View.prototype.build = function (attributes, events) {
            var n;
            var childel = HTML.build(this, this.resources, this.createUI());
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
        };
        View.UI = {};
        return View;
    })();
    ui_1.View = View;
    var HTML = (function () {
        function HTML() {
        }
        HTML.buildEvent = function (controller, method) {
            return function (e) {
                return controller[method].call(controller, e);
            };
        };
        HTML.build = function (controller, resources, ui) {
            var childel;
            var child;
            var n;
            if (typeof ui === "string") {
                child = document.createTextNode(resources.getStringUI(ui));
                childel = child;
            }
            else if (ui.view) {
                var uiview = ui;
                child = new uiview.view();
                child.controller = controller;
                child.resources = resources;
                childel = child.build(uiview.attributes, uiview.events);
            }
            else {
                var uidom = ui;
                child = document.createElement(uidom.tag || "div");
                childel = child;
                if (uidom.content) {
                    if (typeof uidom.content === "string") {
                        childel.innerHTML = resources.getStringUI(uidom.content);
                    }
                    else {
                        var uidefs = uidom.content;
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
            if (ui.id) {
                controller[ui.id] = child;
            }
            return childel;
        };
        return HTML;
    })();
    ui_1.HTML = HTML;
})(ui || (ui = {}));
/// <reference path="uiview.ts" />
var ui;
(function (ui) {
    var CheckButton = (function (_super) {
        __extends(CheckButton, _super);
        function CheckButton() {
            _super.apply(this, arguments);
        }
        CheckButton.prototype.click = function (e) { };
        ;
        CheckButton.prototype.initialize = function () {
            this.selected = false;
            this.disabled = false;
            this.icon = document.createElement("i");
            this.container.innerHTML = "";
            this.container.appendChild(this.icon);
            this.render();
        };
        CheckButton.prototype.doSelect = function (e) {
            this.setSelected(!this.isSelected());
            this.click(e);
        };
        CheckButton.prototype.isSelected = function () {
            return this.selected;
        };
        CheckButton.prototype.setSelected = function (value) {
            this.selected = value;
            this.render();
        };
        CheckButton.prototype.isDisabled = function () {
            return this.disabled;
        };
        CheckButton.prototype.setDisabled = function (value) {
            this.disabled = value;
            this.render();
        };
        CheckButton.prototype.render = function () {
            this.icon.setAttribute("class", this.selected ? "fa fa-check-square-o" : "fa fa-square-o");
            this.container.disabled = this.disabled;
        };
        CheckButton.UI = {
            id: "container",
            tag: "button",
            attributes: { "class": "btn-check" },
            events: { "click": "doSelect" },
        };
        return CheckButton;
    })(ui.View);
    ui.CheckButton = CheckButton;
})(ui || (ui = {}));
/// <reference path="uiview.ts" />
/// <reference path="checkbutton.ts" />
var app;
(function (app) {
    var AppController3 = (function () {
        function AppController3() {
        }
        AppController3.mainElement = function (resources) {
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
                                events: { click: "doPressMeClick" }
                            }]
                    }, {
                        id: "divresult"
                    }]
            };
            return ui.HTML.build(controller, resources, UI);
        };
        AppController3.prototype.doPressMeClick = function (e) {
            this.divresult.innerText = this.resources.format("label.hello", this.txtinput.value);
        };
        return AppController3;
    })();
    var AppView2 = (function (_super) {
        __extends(AppView2, _super);
        function AppView2() {
            _super.apply(this, arguments);
        }
        AppView2.prototype.doPressMeClick = function (e) {
            this.divresult.innerText = this.resources.format("label.hello", this.txtinput.value);
        };
        AppView2.UI = {
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
                            events: { click: "doPressMeClick" }
                        }]
                }, {
                    id: "divresult"
                }]
        };
        return AppView2;
    })(ui.View);
    var CustomView1 = (function (_super) {
        __extends(CustomView1, _super);
        function CustomView1() {
            _super.apply(this, arguments);
        }
        CustomView1.prototype.initialize = function () {
            this.model = this.controller.getModel();
            this.container.innerText = this.model;
        };
        CustomView1.UI = { id: "container" };
        return CustomView1;
    })(ui.View);
    var AppView = (function (_super) {
        __extends(AppView, _super);
        function AppView() {
            _super.apply(this, arguments);
        }
        AppView.prototype.doCheckButtonClick = function (e) {
            console.log("Checkbutton!!! ");
            console.dir(e);
            this.txtresult.innerText = this.resources.getString("txtresult.checksuccess");
        };
        AppView.prototype.doButtonClick = function (e) {
            console.log("clicked!!!");
            this.txtresult.innerText = this.resources.getString("txtresult.success");
        };
        AppView.prototype.getModel = function () {
            return "This is my model";
        };
        AppView.UI = {
            content: [{
                    tag: "h1",
                    content: ["#h1.title"]
                }, {
                    view: CustomView1,
                }, {
                    id: "btncreateinv",
                    tag: "button",
                    content: ["#btn.pressme"],
                    events: { "click": "doButtonClick" }
                }, {
                    view: ui.CheckButton,
                    events: { "click": "doCheckButtonClick" }
                }, {
                    id: "txtresult"
                }]
        };
        return AppView;
    })(ui.View);
    function main() {
        var resources = new ui.SimpleResources({
            "h1.title": "Título arrasador",
            "btn.pressme": "Púlsame",
            "txtresult.success": "Éxito arrollador",
            "txtresult.checksuccess": "Éxito arrollador del check",
            "label.message": "Say your name",
            "label.hello": "Hello {0}!!!"
        });
        var sample1container = document.getElementById("sample1container");
        sample1container.appendChild(AppController3.mainElement(resources));
        var sample2container = document.getElementById("sample2container");
        sample2container.appendChild(ui.HTML.build(null, resources, { view: AppView2 }));
        var sample3container = document.getElementById("sample3container");
        var w = new AppView();
        w.resources = resources;
        sample3container.appendChild(w.build());
    }
    app.main = main;
})(app || (app = {}));
var ui;
(function (ui) {
    var ImageViewer = (function (_super) {
        __extends(ImageViewer, _super);
        function ImageViewer() {
            _super.apply(this, arguments);
        }
        ImageViewer.UI = {
            attributes: { style: "position: relative; overflow: hidden;" },
            content: [{
                    attributes: { style: "position: absolute; top: 10px; left:10px;" },
                    content: [{
                            attributes: { style: "float:left;" },
                            content: [{
                                    tag: "button", events: { "click": "doSwapToolbar" }, content: [{ id: "$toolbaricon", tag: "i", attributes: { "class": "icon-chevron-right" } }]
                                }]
                        }, {
                            id: "$toolbar",
                            attributes: { style: "float:left;display: none;" },
                            content: [{
                                    view: UIImageButton, config: { "change": "doChange" }
                                }, {
                                    id: "$btn1", tag: "button", events: { "click": "doClear" }, content: [{ tag: "i", attributes: { "class": "icon-remove" } }]
                                }, {
                                    id: "$btn2", tag: "button", events: { "click": "doZoomIn" }, content: [{ tag: "i", attributes: { "class": "icon-zoom-in" } }]
                                }, {
                                    id: "$btn3", tag: "button", events: { "click": "doZoomOut" }, content: [{ tag: "i", attributes: { "class": "icon-zoom-out" } }]
                                }, {
                                    id: "$btn4", tag: "button", events: { "click": "doZoom1" }, content: [{ tag: "i", attributes: { "class": "icon-search" } }]
                                }, {
                                    id: "$btn5", tag: "button", events: { "click": "doZoomAdjust" }, content: [{ tag: "i", attributes: { "class": "icon-fullscreen" } }]
                                }]
                        }]
                }, {
                    id: "$scrollcontainer", attributes: { style: "border: 0; padding: 0; width: 100%; height: 100%; overflow: hidden;" }, content: [{
                            id: "$canvascontainer", attributes: { style: "border: 0; padding: 0; margin-left: auto; margin-right: auto;" }, content: [{
                                    id: "$canvas", tag: "canvas"
                                }]
                        }]
                }]
        };
        return ImageViewer;
    })(ui.View);
    ui.ImageViewer = ImageViewer;
})(ui || (ui = {}));
//# sourceMappingURL=myapp.js.map