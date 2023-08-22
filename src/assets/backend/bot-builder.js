console.log('Bot Builder Loaded');

class BotBuilder  {
    constructor(name) {
        this.name = name;
        this.el = document.querySelector(name);
        this.blocks = {};

        this.init();
    }
    
    init = () => {
        this.setDefaultSettings();
        
        // set class to main object
        this.el.class = "bot-builder";
        
        // create markers
        let markers = '';
        for (let i = 0; i < this.colors.length; i++) {
            markers += '<marker markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" viewBox="0 0 5 5" orient="auto" id="marker' + i + '"><polygon points="0,5 1.6666666666666667,2.5 0,0 5,2.5" fill="' + this.colors[i] + '"/></marker>';
        }

        // create main object
        this.el.innerHTML = ('<div id="bot-builder-box"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" height="10000" width="10000" id="bot-builder__svg">' + 
            '<defs xmlns="http://www.w3.org/2000/svg"><marker markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" viewBox="0 0 5 5" orient="auto" id="marker"><polygon points="0,5 1.6666666666666667,2.5 0,0 5,2.5" fill="#5fe3ff"/></marker>' + markers +
            '<marker markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" viewBox="0 0 5 5" orient="auto" id="marker-hover"><polygon points="0,5 1.6666666666666667,2.5 0,0 5,2.5" fill="red"/></marker>' +
            '<marker id="endarrow" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto" markerUnits="strokeWidth"><polygon points="0 0, 10 3.5, 0 7" fill="#5fe3ff" /></marker>' +
            '<marker id="startarrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"> <polygon points="10 0, 10 7, 0 3.5" fill="#5fe3ff" /></marker></defs><line x1="0" y1="0" x2="0" y2="0" stroke-width="3" stroke-miterlimit="10" style="stroke-dasharray: 10 10;" stroke="#5fe3ff" marker-end="url(#marker)" id="line-link"/></svg></div>'
        );
        this.box = this.el.querySelector("#bot-builder-box");
        
        console.log('Initial Bot Builder');
    }
    
    // set default settings for module
    setHooks = () => {
        let self = this;
        
        // click to point link
        $("body").on('mousedown', ".bot-card__point-link", function(e) {
            var parentOffset = $("#bot-builder").offset(); 
            var relX = e.pageX - parentOffset.left;
            var relY = e.pageY - parentOffset.top;
        
            self.changeLineStart(relX, relY);
            console.log('stoppropog3');
            e.stopPropagation();
            console.log('Start drag');
            self.lineDrag = true;
            let item_id = $(this).closest('.bot-card__item').data('id');
            let id = $(this).closest('.bot-card').data('id');
            console.log('start_line', item_id, id);
        
            self.setFirstCard(id, item_id);
        
            $(".bot-card:not([data-id="+id+"])").on('mouseup', function(e) {
                let id = $(this).data('id');
                self.setLink(id);
                console.log('[НАДО СОЕДИНЯТЬ ДВЕ ТОЧКИ] card id= ', id);
            });
        });
        
        $("body").on('mousemove', function(e) {
            if (self.lineDrag) {
                let parentOffset = $("#bot-builder").offset();
                let relX = e.pageX - parentOffset.left;
                let relY = e.pageY - parentOffset.top;

                self.changeLineStop(relX, relY);
                self.showLine(true);
            }
        });
        
        // stop draw a line between two blocks
        $("body").on('mouseup', function(e) {
            self.lineDrag = false;
            console.log('stop drag line');
            self.showLine(false);
            $(".bot-card").off();
        });

        $(document).on('click', '.delete-block[data-id]', function(e) {
            const id = $(this).data('id');
            const block = window.Builder.blocks[id];
            if (block) {
                $('#confirm').off();
                $('#confirm').modal({
                    backdrop: 'static',
                    keyboard: false
                })
                .on('click', '#delete', function(e) {
                    $('#confirm').modal('hide');
                    self.deleteBlock(id);
                });
                $("#cancel").on('click',function(e){
                    e.preventDefault();
                    $('#confirm').modal.model('hide');
                });
            }
            console.log('stoppropog2');
            e.stopPropagation();
        });
    }

    // set default settings for module
    setDefaultSettings = () => {
        //init colors
        this.setColorList(['#2196F3', '#1a76c7', '#2351a1', '#5fe3ff', '#aa13eb', '#9b35c7', '#673ab7']);
        
        this.block_width = 245;
        this.lineDrag = false;
    }
    
    // set new color list
    setColorList = (arr) => {
        this.colors = arr;
    }

    // draw a line between two blocks
    drawLink = (link) => {
        this.color_number++;

        if (this.color_number > this.colors.length) {
            this.color_number = 0;
        }
        
        // first point
        let point1 = $(".bot-card[data-id='"+link.id1+"']").find(".bot-card__item[data-id='"+link.item_id+"']").find(".bot-card__link").offset();
        if(!point1) {
            console.log('ERROR: NO POINT 1');
            return;
        }
        
        var parentOffset = $(this.el).offset();
        var boxOffset = $(this.box).offset();
    
        var relX = point1.left - parentOffset.left + (parentOffset.left - boxOffset.left);
        var relY = point1.top - parentOffset.top + (parentOffset.top - boxOffset.top);
        var relX = parseInt($(".bot-card[data-id='"+link.id1+"']").css('left'))+230;
        var relY = point1.top - parentOffset.top + (parentOffset.top - boxOffset.top);        
        
        let point2 = $(".bot-card[data-id="+link.id2+"]").offset();
        if(!point2) {
            console.log('ERROR: NO POINT 2');
            return;
        }
        var relX2 = point2.left - parentOffset.left + (parentOffset.left - boxOffset.left);
        var relY2 = point2.top - parentOffset.top + (parentOffset.top - boxOffset.top);
    
        let path = this.calculatePath({x: relX, y: relY+8}, {x: relX2-7, y: relY2+20});

        // new line ID
        let svg_element_id = "line-"+link.id1+'--'+link.item_id+"-"+link.id2;
        
        let el = $("#"+svg_element_id);

        // if the element already exists, then it just needs to change the path
        if ($("#"+svg_element_id).length) {
            el.attr('d', path)
        } else {
            // add SVG line
            if (this.coloried) {
                console.log('this.color_number', this.color_number);
                this.addSvgLine(svg_element_id, path, this.colors[this.color_number], this.color_number );
                return;
            }
            this.addSvgLine(svg_element_id, path); 
        }                
    }
    
    addSvgLine = (svg_element_id, path, color = "#5fe3ff", color_id = '') => {
        var newpath = document.createElementNS('http://www.w3.org/2000/svg',"path");  
        newpath.setAttributeNS(null, "id", svg_element_id);  
        newpath.setAttributeNS(null, "d", path);  
        newpath.setAttributeNS(null, "stroke", color); 
        newpath.setAttributeNS(null, "stroke-width", 3);  
        newpath.setAttributeNS(null, "opacity", 1);  
        newpath.setAttributeNS(null, "fill", "none");
        newpath.setAttributeNS(null, "class", "bot_line");
        newpath.setAttributeNS(null, "marker-end", "url(#marker"+color_id+")");
        document.getElementById("bot-builder__svg").appendChild(newpath);
    }
    
    // modify line between connected blocks
    changeLineStart = (x, y) => {
        this.link_line.x1 = x;
        this.link_line.y1 = y;
    }

    changeLineStop = (x, y) => {
        this.link_line.x2 = x;
        this.link_line.y2 = y;
    }

    // show/hide line between connected blocks
    showLine = (show) => {
        if (show) {
            var parentOffset = $(this.el).offset();
            var boxOffset = $(this.box).offset();
            $("#line-link").attr("x1", this.link_line.x1 + (parentOffset.left - boxOffset.left));
            $("#line-link").attr("x2", this.link_line.x2 + (parentOffset.left - boxOffset.left));
            $("#line-link").attr("y1", this.link_line.y1 + (parentOffset.top - boxOffset.top));
            $("#line-link").attr("y2", this.link_line.y2 + (parentOffset.top - boxOffset.top));
            $("#line-link").show();
            $(this.el).addClass('bot-builder-link');
        } else {
            $(this.el).removeClass('bot-builder-link');
            $("#line-link").hide();
        }
    }

    // calculate distance
    distance = (point1, point2) => {
        const dx = point1.x - point2.x;
        const dy = point1.y - point2.y;

        return Math.sqrt(dx * dx + dy * dy);
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
                this.distance(start, end),
                Math.abs(end.y - start.y) / 2,
                150
            ),
            y: start.y
        };
        
        if (flag) {
            return `
                M ${start.x},${start.y} 
                C ${controlPoint.x}, ${controlPoint.y} ${controlPoint.x},${center.y} 
                ${end.x},${end.y}
              `;
        }

        return `
            M ${start.x},${start.y} 
            Q ${controlPoint.x}, ${controlPoint.y} ${center.x},${center.y} 
            T ${end.x},${end.y}
        `;
    }
}
