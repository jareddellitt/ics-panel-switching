(function (global) {
    'use strict';

    var pages = [];

    function handleShow(i, percentage) {
        var next = pages[i + 1];

        if (next) {
            next.updateVisibility(percentage);
        }
    }

    function handleHide(i, percentage) {

    }

    // $('.page').each(function (i, list) {
    //     var panel = new Panel(list);
        
    //     panel.showCallback = handleShow;
    //     panel.hideCallback = handleHide;
    //     pages.push(panel);
    // });

    var manager = new PanelManager(document.getElementById('apps')).init();


    global.panels = {

    };

}(this));