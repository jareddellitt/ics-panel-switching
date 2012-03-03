function Panel(panel) {
    this.panel = $(panel);
    this.current = 0;
    this.width = this.panel.width();

    if (this.panel.index() > 0) {
        this.updateVisibility(0);
    }
}

Panel.prototype._moveElementTo = function (x) {
    this.panel.css({
        '-webkit-transform': 'translateX(' + x + 'px)',
        '-moz-transform': 'translateX(' + x + 'px)'
    });
};

Panel.prototype.move = function (amount) {
    this._moveElementTo(this.current + amount);
};

Panel.prototype.offsetLeft = function () {
    var transform = this.panel.css('-webkit-transform') || this.panel.css('-moz-transform');
    this.current = parseInt(transform.split('(')[1].split(')')[0].split(',')[4], 10);
    return this.current * -1;
};

Panel.prototype.hide = function () {
    this.current = this.width * -1;
    this._moveElementTo(this.current);
};

Panel.prototype.show = function () {
    this.current = 0;
    this._moveElementTo(this.current);
};

Panel.prototype.updateVisibility = function (amountHidden) {
    var scale = .75 + (.25 * amountHidden);
    this.panel.css({
        opacity: amountHidden,
        '-webkit-transform': 'scale(' + scale +')',
        '-moz-transform': 'scale(' + scale + ')'
    });
}