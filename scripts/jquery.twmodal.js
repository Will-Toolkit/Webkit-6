
(function ($) {

    $.TWModal = function (elm, options) {
        this.element = $(elm);
        this.options = $.extend({}, $.fn.twmodal.defaults, options);

        this.backHistory = [];

        this.init();
    };

    $.TWModal.prototype = {
        init: function () {

            var self = this;
            var documentHeight = $(document).height();

            this.modal = $('<div></div>')
                .appendTo(document.body)
                .hide()
                .css({
                    'position': 'absolute',
                    'display': 'block',
                    'width': this.options.width,
                    'height': this.options.height,
                    'z-index': '10150',
                    'overflow': 'hidden',
                    'outline': '0px none',
                    'border': '1px solid #7f7d7d',
                    'background-color': '#ffffff'
                })
                .addClass('ui-dialog ui-widget ui-widget-content ui-corner-all  ui-draggable');

            this.modalContent = $('<div></div>')
                .css({ 'overflow-y': 'auto' })
                .addClass('ui-dialog-content ui-widget-content')
                .appendTo(this.modal);

            this.modalTitlebar = $('<div></div>')
                .addClass('ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix')
                .prependTo(this.modal);

            this.modalTitlebarClose = $('<a href="#"></a>')
                .addClass('ui-dialog-titlebar-close ui-corner-all')
                .hover(
                    function () {
                        $(this).addClass("ui-state-hover");
                    },
                    function () {
                        $(this).removeClass("ui-state-hover");
                    }
                )
                .focus(function () {
                    $(this).addClass("ui-state-focus");
                })
                .blur(function () {
                    $(this).removeClass("ui-state-focus");
                })
                .click(function () {
                    self.close();
                    return false;
                })
                .appendTo(this.modalTitlebar);

            this.modalTitlebarCloseText = $('<span></span>')
                .addClass('ui-icon ui-icon-closethick')
                .text('close')
                                .appendTo(this.modalTitlebarClose);

            this.modalTitle = $('<span></span>')
                .addClass('ui-dialog-title')
                .html(this.options.title)
                                .prependTo(this.modalTitlebar);

            // reset wrapper sizing
            // determine the height of all the non-content elements
            var nonContentHeight = this.modal.css({
                height: 'auto'
            })
                        .height();

            this.modalContent.height(Math.max(this.options.height - nonContentHeight, 0));

            $(document).keydown(function (n) {
                if (n.keyCode && n.keyCode == 27) {
                    self.close();
                }
            });

            this.overlay = $('<div></div>')
                .appendTo(document.body)
                .hide()
                .css({
                    'display': 'none',
                    'position': 'absolute',
                    'top': '0%',
                    'left': '0%',
                    'width': $(document).width(),
                    'height': documentHeight,
                    'z-index': '10000',
                    'background-color': '#666666',
                    '-moz-opacity': '0.8',
                    'opacity': '.50',
                    'filter': 'alpha(opacity=60)'
                })
                .click(function () { self.close(); });

            this.loading = $('<div></div>')
                .appendTo(document.body)
                .hide()
                .css({
                    'position': 'absolute',
                    'visibility': 'visible',
                    'width': '32px',
                    'height': '32px',
                    'z-index': '10150',
                    'padding-left': '5px',
                    'padding-right': '5px',
                    'padding-bottom': '5px',
                    'padding-top': '5px',
                    'border': '1px solid #dddddd',
                    'background-color': '#ffffff'
                })
                .html('<img src="../../../images/loading.gif" />');

            // save a reference to the TWModal object
            this.element.data('twmodal', this);

            this.makeDraggable();

            this.show();

            this.load(this.options);
        },

        load: function (opts) {

            opts = $.extend({}, this.options, opts);

            var self = this;

            $.ajax({
                type: "GET",
                url: opts.url,
                contentType: "application/html; charset=windows-1251",
                beforeSend: function () {
                    self.showLoading();
                },
                success: function (data) {

                    self.modalContent.html(data);

                    self.modalContent.find('.backbutton').css({ top: self.modalContent.height() });

                    if (opts.back) {
                        self.backHistory.push(opts.url);
                    }

                    self.hideLoading();
                },
                error: function () {
                }
            });
        },

        show: function () {
            this.setToCenter(this.modal);

            this.overlay.show();
            this.modal.show();
        },

        hideLoading: function () {
            this.loading.hide();
        },

        showLoading: function () {
            this.setToCenter(this.loading);

            this.loading.show();
        },

        back: function () {

            this.backHistory.pop();

            this.load({ 'url': this.backHistory.pop() });
        },

        close: function () {
            this.modal.remove();
            this.overlay.remove();
            this.loading.remove();

            theForm = document.forms[0];
        },

        makeDraggable: function () {
            this.modal.draggable({
                cancel: '.ui-dialog-content',
                handle: '.ui-dialog-titlebar',
                containment: 'document'
            });
        },

        setToCenter: function (mElement) {

            var top = 0;

            if ($(window).height() > mElement.height()) {
                top = ($(window).height() / 2 - mElement.height() / 2) + $(document).scrollTop();
            }
            else {
                top = 20 + $(document).scrollTop();
            }

            var left = $(window).width() / 2 - mElement.width() / 2;

            mElement.css('top', top);
            mElement.css('left', left);
        }
    };

    $.fn.twmodal = function (options) {

        if (options.func != null) {
            return this.each(function () {
                var twmodal = $(this).data('twmodal');
                if (twmodal && twmodal[options.func]) {
                    twmodal[options.func]($.extend({}, twmodal.options, options));
                }
            });
        } else if (typeof options == 'string') {
            return this.each(function () {
                var twmodal = $(this).data('twmodal');
                if (twmodal && twmodal[options])
                    twmodal[options]();
            });
        }

        var opts = $.extend({}, $.fn.twmodal.defaults, options);

        this.each(function () {
            new $.TWModal(this, opts);
        });
    }

    // default settings
    $.fn.twmodal.defaults = {
        title: 'Window title',
        url: null,
        websiteURL: null,
        func: null,
        back: true,
        width: 400,
        height: 400
    };

})(jQuery);