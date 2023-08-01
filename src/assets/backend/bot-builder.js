console.log('Bot Builder Loaded');

class BotBuilder  {
    constructor(name) {
        this.name = name;
        this.el = document.querySelector(name);
        this.blocks = {};

        this.setDefaultSettings();
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