/**
 * Created by 2 on 2017/5/16.
 */
$(document).ready(function () {
    var sub = $('#sub');

    var activeRow;
    var activeMenu;
    var timer;
    var mouseInSub = false;

    sub.on('mouseenter', function (e) {
        mouseInSub = true;
    }).on('mouseleave', function (e) {
        mouseInSub = false;
    });

    var mouseTrack = [];

    var moveHandler = function (e) {
        mouseTrack.push({
            x: e.pageX,
            y: e.pageY
        });

        if (mouseTrack.length > 2) {
            mouseTrack.shift()
        }
    };

    $('#test')
        .on('mouseenter', function (e) {
            sub.removeClass('none');

            $(document).on('mousemove', moveHandler)
        })
        .on('mouseleave', function (e) {
            sub.addClass('none');

            if (activeRow) {
                activeRow.removeClass('active');
                activeRow = null;
            }
            if (activeMenu) {
                activeMenu.addClass('none');
                activeMenu = null
            }

            $(document).off('mousemove', moveHandler)
        })
        .on('mouseenter', 'li', function (e) {
            if (!activeRow) {
                activeRow = $(e.target).addClass('active');
                activeMenu = $('#' + activeRow.data('id'));
                activeMenu.removeClass('none');
                return
            }

            if (timer) {
                clearTimeout(timer)
            }

            var currMousePos = mouseTrack[mouseTrack.length - 1];
            var leftCorner = mouseTrack[mouseTrack.length - 2];

            var delay = needDelay(sub,leftCorner,currMousePos);
            console.log(delay);
            if (delay){
                timer = setTimeout(function () {
                    if (mouseInSub) {
                        return
                    }

                    activeRow.removeClass('active');
                    activeMenu.addClass('none');
                    activeRow = $(e.target).addClass('active');
                    activeMenu = $('#' + activeRow.data('id')).removeClass('none');

                    timer = null;
                }, 300);
            } else {
                var prevActiveRow = activeRow;
                var prevActiveMenu = activeMenu;

                activeRow = $(e.target).addClass('active');
                activeMenu = $('#' + activeRow.data('id')).removeClass('none');

                prevActiveRow.removeClass('active');
                prevActiveMenu.addClass('none');
            }

        })

})