(function (global) {

    function PanelManager(target) {
        this.target = $(target);
        this.panels = [];
        this.index = 0;
        this.direction = null;
    }

    PanelManager.prototype.directions = {
        RIGHT: 'right',
        LEFT: 'left'
    };

    PanelManager.prototype.init = function () {
        var panels = this.panels;

        this.target
            .on('mousedown touchstart', $.proxy(this.handleDown, this))
            .on('mouseup touchend', $.proxy(this.handleUp, this))
            .on('a', 'touchstart click', function (e) {
                e.preventDefault();
                e.stopPropagation();
            })
            .find('ul').each(function (i, list) {
                panels.push(new Panel(list));
            });
    };

    PanelManager.prototype.previous = function () {
        return this.panels[this.index - 1];
    };

    PanelManager.prototype.current = function () {
        return this.panels[this.index];
    };

    PanelManager.prototype.next = function () {
        return this.panels[this.index + 1];
    };

    PanelManager.prototype.handleMove = function (e) { 
        e.preventDefault();
        var x = e.clientX || e.originalEvent.touches[0].clientX,
            amount = (this.startX - x) * -1;

        if (amount < 0) {
            var next = this.next()
            if (next) {
                this.direction = this.directions.LEFT; 
                this.current().move(amount);
                next.updateVisibility((amount * -1) / this.target.width());
            }
        } else {
            var prev = this.previous();
            if (prev) {
                this.direction = this.directions.RIGHT;
                this.current().updateVisibility(1 - (amount / this.target.width()));            
                prev.move(amount);
            }
        }
    };

    PanelManager.prototype.handleDown = function (e) {
        e.preventDefault();
        this.direction = null;
        this.startX = e.clientX || e.originalEvent.touches[0].clientX;
        this.target.on('mousemove touchmove', $.proxy(this.handleMove, this));  
    };

    PanelManager.prototype.doneMovingLeft = function () {
        var current = this.current();

        if (current.offsetLeft() >= this.target.width() / 3) {
            current.hide();
            if (this.next()) {
                this.index++;    
                this.current().updateVisibility(1);
            }
        } else {
            current.show();
            if (this.next()) {
                this.next().updateVisibility(1);
            }
        }        
    }

    PanelManager.prototype.doneMovingRight = function () {
        var current;

        if (this.previous()) {
            this.index--;
            current = this.current();

            if (current.offsetLeft() < this.target.width() / 1.5) {
                current.show();
                this.next().updateVisibility(0);
            }
        }
    }

    PanelManager.prototype.handleUp = function () {
        this.target.off('mousemove touchmove');

        if (this.direction === this.directions.LEFT) {
            this.doneMovingLeft();
        } else if (this.direction === this.directions.RIGHT) {
            this.doneMovingRight();
        }
    };

    global.PanelManager = PanelManager;

}(this));