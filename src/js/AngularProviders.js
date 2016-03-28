var app = angular.module('App', []);

/**
 * Provide Angular services...
 */
app.config(['$provide', function($provide) {

    /**
     * jQuery service
     */
    $provide.factory('$jQ', function() {
        return window.jQuery; // return global window.jQuery variable
    });

    /**
     * Dom Ready service
     */
    $provide.factory('DocumentReady', ['$jQ', function($jQ) {
        return function(callback) {
            $jQ(document).ready(function() {
                callback();
            });
        };
    }]);

    /**
     * Fullpage.js service
     */
    $provide.factory('Fullpage', ['$jQ', function($jQ) {
        var Fullpage = {};
        Fullpage.instance = $jQ('#fullpage');
        Fullpage.init = function(anchors, afterLoad) {
            Fullpage.instance.fullpage({
                css3: true,
                scrollOverflow: true,
                controlArrows: false,
                slideSelector: '.preview',
                anchors: anchors,
                afterLoad: afterLoad
            });
        };
        Fullpage.get = function() {
            return Fullpage.instance.fullpage;
        };
        return Fullpage;
    }]);

    /**
     * Fullpage.js service
     */
    $provide.factory('Swipebox', ['$jQ', function($jQ) {
        var Swipebox = {};
        Swipebox.init = function(beforeOpen, afterOpen, afterClose) {
            $jQ('.swipebox').swipebox({
                useCSS: true, // false will force the use of jQuery for animations
                useSVG: true, // false to force the use of png for buttons
                initialIndexOnArray: 0, // which image index to init when a array is passed
                hideCloseButtonOnMobile: false, // true will hide the close button on mobile devices
                removeBarsOnMobile: true, // false will show top bar on mobile devices
                hideBarsDelay: 3000, // delay before hiding bars on desktop
                videoMaxWidth: 1140, // videos max width
                beforeOpen: beforeOpen, // called before opening
                afterOpen: afterOpen, // called after opening
                afterClose: afterClose, // called after closing
                loopAtEnd: false // true will return to the first image after the last image is reached
            });
        };
        return Swipebox;
    }]);

    /**
     * Animate service
     */
    $provide.factory('Animator', ['$jQ', '$q', function($jQ, $q) {
        var Animator = {};
        Animator.animate = function(element, animData, finished) {

            if (!animData.name) {
                console.error("No animation name have been given");
                finished("No animation name have been given");
                return;
            }

            if (animData.duration) {
                $jQ(element).css("-webkit-animation-duration", animData.duration + 's');
                $jQ(element).css("-moz-animation-duration", animData.duration + 's');
                $jQ(element).css("animation-duration", animData.duration + 's');
            }

            if (animData.delay || animData.delay === 0) {
                $jQ(element).css("-webkit-animation-delay", animData.delay);
                $jQ(element).css("-moz-animation-delay", animData.delay);
                $jQ(element).css("animation-delay", animData.delay);
            }

            Animator.show(element);
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            $jQ(element).addClass('animated ' + animData.name).one(animationEnd, function() {

                $jQ(this).removeClass('animated ' + animData.name);
                if (finished) {
                    finished(null);
                }
            });
        };

        Animator.promiseAnimate = function(element, animData) {
            var deferred = $q.defer();
            Animator.animate(element, animData, function(err) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve();
                }
            });
            return deferred.promise;
        };

        Animator.hide = function(element) {
            $jQ(element).hide();
        };
        Animator.show = function(element) {
            $jQ(element).show();
        };
        return Animator;
    }]);
}]);
