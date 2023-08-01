console.log('Bot Builder Loaded');

class BotBuilder  {
    constructor(name) {
        this.name = name;
        this.el = document.querySelector(name);
        this.blocks = {};

        this.init();
    }
    
    init = () => {
        this.el.class = "bot-builder";
        // 
        this.el.innerHTML = ('<div id="bot-builder-box"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" height="10000" width="10000" id="bot-builder__svg">' + 
            '<defs xmlns="http://www.w3.org/2000/svg"><marker markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" viewBox="0 0 5 5" orient="auto" id="marker"><polygon points="0,5 1.6666666666666667,2.5 0,0 5,2.5" fill="#5fe3ff"/></marker>' +
            '<marker markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" viewBox="0 0 5 5" orient="auto" id="marker-hover"><polygon points="0,5 1.6666666666666667,2.5 0,0 5,2.5" fill="red"/></marker>' +
            '<marker id="endarrow" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto" markerUnits="strokeWidth"><polygon points="0 0, 10 3.5, 0 7" fill="#5fe3ff" /></marker>' +
            '<marker id="startarrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"> <polygon points="10 0, 10 7, 0 3.5" fill="#5fe3ff" /></marker></defs><line x1="0" y1="0" x2="0" y2="0" stroke-width="3" stroke-miterlimit="10" style="stroke-dasharray: 10 10;" stroke="#5fe3ff" marker-end="url(#marker)" id="line-link"/></svg></div>'
        );
        this.box = this.el.querySelector("#bot-builder-box");
        
        this.setDefaultSettings();
        console.log('Initial Bot Builder');
    }
    
    addSvgLine = (svg_element_id, path, color = "#5fe3ff") => {
        var newpath = document.createElementNS('http://www.w3.org/2000/svg',"path");  
        newpath.setAttributeNS(null, "id", svg_element_id);  
        newpath.setAttributeNS(null, "d", path);  
        newpath.setAttributeNS(null, "stroke", color); 
        newpath.setAttributeNS(null, "stroke-width", 3);  
        newpath.setAttributeNS(null, "opacity", 1);  
        newpath.setAttributeNS(null, "fill", "none");
        newpath.setAttributeNS(null, "class", "bot_line");
        newpath.setAttributeNS(null, "marker-end", "url(#marker)");
        document.getElementById("bot-builder__svg").appendChild(newpath);
    }
    
    
    
    // calculate distance
    distance = (point1, point2) => {
        const dx = point1.x - point2.x;
        const dy = point1.y - point2.y;

        return Math.sqrt(dx * dx + dy * dy);
    }
    
    // set default settings for module
    setDefaultSettings = () => {
        //init colors
        this.setColorList(['#2196F3', '#1a76c7', '#2351a1', '#5fe3ff', '#aa13eb', '#9b35c7', '#673ab7']);
        
        this.block_width = 245;
    }
    
    setColorList = (arr) => {
        this.colors = arr;
    }
    
    // Calculate the path of a line between two points
    calculatePath = (start, end) => {       
        let flag = false;

        if (start.x > end.x + 150) {
            end.x = end.x + this.block_width;
            flag = true;
        }
        
        const center = {
            x: (start.x + end.x) / 2,
            y: (start.y + end.y) / 2
        };

        const controlPoint = {
            x: start.x + Math.min(
                distance(start, end),
                Math.abs(end.y - start.y) / 2,
                150
            ),
            y: start.y
        };
        
        if (flag) {
            return `
                M \${start.x},\${start.y} 
                C \${controlPoint.x}, \${controlPoint.y} \${controlPoint.x},\${center.y} 
                \${end.x},\${end.y}
              `;
        }

        return `
            M \${start.x},\${start.y} 
            Q \${controlPoint.x}, \${controlPoint.y} \${center.x},\${center.y} 
            T \${end.x},\${end.y}
        `;
    }
}