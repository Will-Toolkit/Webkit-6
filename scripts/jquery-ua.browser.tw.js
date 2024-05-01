/*! Adds missing $.browser functionality to jQuery v2 */
; (function ($) {

    var matched, browser;

    $.uaMatch = function (ua) {
        ua = ua.toLowerCase();

        var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
            [];

        return {
            browser: match[1] || "",
            version: match[2] || "0"
        };
    };

    matched = $.uaMatch(navigator.userAgent);
    browser = {};

    if (matched.browser) {
        browser[matched.browser] = true;
        browser.version = matched.version;
        browser.msie = /(msie) ([\w.]+)/.test(navigator.userAgent);
    }

    // Chrome is Webkit, but Webkit is also Safari.
    if (browser.chrome)
        browser.webkit = true;
    else if (browser.webkit)
        browser.safari = true;

    $.browser = browser;

})(jQuery);
