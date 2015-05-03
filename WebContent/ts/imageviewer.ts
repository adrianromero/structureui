
	
		
module ui {

    export class ImageViewer extends View {
        static UI = {
            attributes: {style: "position: relative; overflow: hidden;"},
	        content: [{
	            attributes: {style: "position: absolute; top: 10px; left:10px;"},
	            content :[{
	                attributes: {style: "float:left;"}, 
	                content: [{
	                    tag: "button", events:{"click": "doSwapToolbar"}, content: [{id: "$toolbaricon", tag: "i", attributes: {"class": "icon-chevron-right"}}]
	                }]                    
	            }, {    
	                id: "$toolbar",
	                attributes: {style: "float:left;display: none;"},
	                content: [{
	                    view: UIImageButton, config: {"change": "doChange"}
	                }, {
	                    id: "$btn1", tag: "button", events:{"click": "doClear"}, content: [{tag: "i", attributes: {"class": "icon-remove"}}]
	                }, {
	                    id: "$btn2", tag: "button", events:{"click": "doZoomIn"}, content: [{tag: "i", attributes: {"class": "icon-zoom-in"}}]
	                }, {
	                    id: "$btn3", tag: "button", events:{"click": "doZoomOut"}, content: [{tag: "i", attributes: {"class": "icon-zoom-out"}}]
	                }, {
	                    id: "$btn4", tag: "button", events:{"click": "doZoom1"}, content: [{tag: "i", attributes: {"class": "icon-search"}}]
	                 }, {
	                    id: "$btn5", tag: "button", events:{"click": "doZoomAdjust"}, content: [{tag: "i", attributes: {"class": "icon-fullscreen"}}]                        
	                }] 
	            }]
	        }, {       
	            id: "$scrollcontainer", attributes: {style: "border: 0; padding: 0; width: 100%; height: 100%; overflow: hidden;"}, content:[{
	                id: "$canvascontainer", attributes: {style: "border: 0; padding: 0; margin-left: auto; margin-right: auto;"}, content:[{
	                    id: "$canvas", tag: "canvas"
	                }]
	            }]
	        }]
        };    	
    	
	}
}