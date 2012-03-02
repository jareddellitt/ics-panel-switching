function Panel(panel) {
    this.panel = $(panel);
    this.current = 0;
    this.width = this.panel.width();
    this.height = $(document).height();

    if (this.panel.index() > 0) {
        this.panel.css({
            opacity: 0,
            '-webkit-transform': 'scale(0.75)'
        });
    }
}

Panel.prototype.move = function(amount) {
    this.panel.css('-webkit-transform', 'translateX(' + (this.current + amount) + 'px)');
};

Panel.prototype.offsetLeft = function () {
    this.current = parseInt(this.panel.css('-webkit-transform').split('(')[1].split(')')[0].split(',')[4], 10);
    return this.current * -1;
};

Panel.prototype.hide = function () {
    this.current = this.width * -1;
    this.panel.css('-webkit-transform', 'translateX(' + this.current + 'px)');
};

Panel.prototype.show = function () {
    this.current = 0;
    this.panel.css('-webkit-transform', 'translateX(' + this.current + 'px)');
};

Panel.prototype.updateVisibility = function (amountHidden) {
    var scale = .75 + (.25 * amountHidden);
    this.panel.css({
        opacity: amountHidden,
        '-webkit-transform': 'scale(' + scale +')'
    });
}