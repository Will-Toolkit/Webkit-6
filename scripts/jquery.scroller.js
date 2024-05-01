(function ($) {

    $.TWScroller = function (elm, options) {
        this.element = $(elm);
        this.options = $.extend({}, $.fn.twscroller.defaults, options);

        this.init();
    };

    $.TWScroller.prototype = {
        init: function () {
            
            this.mainDiv = $('#' + this.options.id);

            if (this.mainDiv.length == 0) {
                return;
            }

            this.mainDiv.css({ overflow: 'hidden' }).hover(
			    function () { this._hoverstate = "over" },
			    function () { this._hoverstate = "out" }
		    )

            if (this.options.msgsource == "inline") {
                this.setupticker(this.options)
            } else {
                this.getajaxcontent(this.options)
            }

        },

        setupticker: function (opts) {

            opts = $.extend({}, this.options, opts);

            var self = this;

            this.messages = this.mainDiv.find('div.' + opts.msgclass).hide();
            this.currentmsg = Math.min(parseInt(this.getCookie(opts.id) || 0), this.messages.length - 1);
            this.messages.hide().eq(this.currentmsg).fadeIn(opts.animateduration);

            setTimeout(function () { self.rotate(opts) }, opts.rotatespeed);

            $(window).bind('unload', function () { self.cleanup(opts) });
        },

        getajaxcontent: function (opts) {

            this.mainDiv.html(this.loadingtext)
            $.ajax({
                url: opts.msgsource,
                error: function (ajaxrequest) {
                    this.mainDiv.html('Error fetching content.<br />Server Response: ' + ajaxrequest.responseText)
                },
                success: function (content) {
                    this.mainDiv.html(content)
                    this.setupticker(opts)
                }
            })

        },

        getCookie: function (Name) {
            var re = new RegExp(Name + "=[^;]+", "i") //construct RE to search for target name/value pair
            if (document.cookie.match(re)) //if cookie found
                return document.cookie.match(re)[0].split("=")[1] //return its value
            return null
        },

        setCookie: function (name, value) {
            document.cookie = name + "=" + value
        },

        cleanup: function (opts) {
            this.setCookie(opts.id, this.currentmsg)
        },

        rotate: function (opts) {

            opts = $.extend({}, this.options, opts);

            var self = this;

            if (this.mainDiv.get(0)._hoverstate == "over") {
                setTimeout(function () { self.rotate(opts) }, opts.rotatespeed)
            } else {
                this.messages.eq(this.currentmsg).fadeOut(opts.animateduration, function () {
                    self.currentmsg = (self.currentmsg < self.messages.length - 1) ? self.currentmsg + 1 : 0;
                    self.messages.eq(self.currentmsg).fadeIn(opts.animateduration, function () {
                        setTimeout(function () { self.rotate(opts) }, opts.rotatespeed);
                    })
                });
            }

        }
    };

    $.fn.twscroller = function (options) {
        
        var opts = $.extend({}, $.fn.twscroller.defaults, options);

        this.each(function () {
            new $.TWScroller(this, opts);
        });
    }

    // default settings
    $.fn.twscroller.defaults = {
        loadingtext: '<em>Fetching Scroller Contents. Please wait...</em>',
        id: 'myhtmlticker',
        rotatespeed: 3000,
        animateduration: 1000,
        msgclass: 'scrollermessage',
        msgsource: 'inline'
    };

})(jQuery);