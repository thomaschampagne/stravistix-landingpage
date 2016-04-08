/**
 * Hold the main behaviour of the landing page
 */
app.controller("BehaviourController", ['$scope', '$window', '$jQ', 'Fullpage', 'Swipebox', 'Animator', function($scope, $window, $jQ, Fullpage, Swipebox, Animator) {

    // Preview Data Definition
    $scope.previewsData = [{
        id: 'preview_01',
        images: ['img/screens/activity_main.jpg'],
        caption: 'Directly integrated into strava'
    }, {
        id: 'preview_02',
        images: ['img/screens/activity_xtd_hr_speed.jpg', 'img/screens/activity_power_cadence.jpg', 'img/screens/activity_grade_elevation.jpg'],
        caption: 'Extended analysis of activities and segments efforts.'
    }];

    // On angular preview sections ready...
    $scope.$on('PreviewSectionsReady', function() {
        $scope.verticalScrollInit();
    });

    $scope.verticalScrollInit = function() {

        // Setup fullpages anchors order
        $scope.previewsAnchors = _.pluck($scope.previewsData, 'id');
        $scope.anchors = _.union(['downloadPage'], $scope.previewsAnchors, ['andMorePage', 'donatePage']);

        Fullpage.init($scope.anchors, function afterLoad(pageName, pageIndex) {
            $scope.afterPageLoaded(pageName, pageIndex);
        });

        Swipebox.init();
    };

    $scope.afterPageLoaded = function(pageName, pageIndex) {

        $scope.currentPageName = pageName;

        // Landing download page
        if (pageName === 'downloadPage') {

            if ($scope.pageNotSeen(pageIndex)) {

                Animator.animate('#outsideIcons', {
                    name: 'fadeIn'
                });
                Animator.animate('#logo', {
                    name: 'fadeIn'
                });
                Animator.animate('#valueProposal', {
                    name: 'fadeIn'
                });
                Animator.animate('#downloadButton', {
                    name: 'fadeIn'
                });
                Animator.animate('#goToQuote', {
                    name: 'fadeInDown'
                });
                $scope.pagesSeen.push(pageIndex);
            }
        }

        // Preview pages
        var posistionOfPreviewAnchor = _.indexOf($scope.previewsAnchors, pageName);
        if (posistionOfPreviewAnchor !== -1 && $scope.pageNotSeen(pageIndex)) {

            // posistionOfPreviewAnchor++;
            Animator.animate('#previewImages_' + posistionOfPreviewAnchor, {
                name: 'fadeIn'
            });

            Animator.animate('#caption_' + posistionOfPreviewAnchor, {
                name: 'fadeIn'
            });

            // Animating down arrows from previews
            Animator.animate('#goToNextFromPreview_' + posistionOfPreviewAnchor, {
                name: 'fadeInDown'
            });

            $scope.pagesSeen.push(pageIndex);
        }

        // And more...
        if (pageName === 'andMorePage' && $scope.pageNotSeen(pageIndex)) {
            Animator.animate('#andMore', {
                name: 'fadeIn'
            });
            Animator.animate('#goToDonate', {
                name: 'fadeInDown'
            });
            $scope.pagesSeen.push(pageIndex);
        }

        // And more...
        if (pageName === 'donatePage' && $scope.pageNotSeen(pageIndex)) {

            Animator.animate('#donate', {
                name: 'fadeIn'
            });

            Animator.animate('#goToTop', {
                name: 'fadeInUp'
            });

            $scope.pagesSeen.push(pageIndex);
        }
    };

    $scope.nextSection = function() {
        Fullpage.get().moveSectionDown();
    };

    $scope.goToDownloadPage = function() {
        if ($scope.currentPageName === 'downloadPage') {
            $window.open('https://chrome.google.com/webstore/detail/stravistix-for-strava/dhiaggccakkgdfcadnklkbljcgicpckn', '_blank');
        } else {
            $scope.goTo('downloadPage');
        }
    };

    $scope.goToDonatePage = function() {
        if ($scope.currentPageName === 'donatePage') {
            Animator.animate('.donate', {
                name: 'shake'
            });
        } else {
            $scope.goTo('donatePage');
        }
    };

    $scope.goTo = function(page) {
        Fullpage.get().moveTo(page);
    };

    /**
     * Pages seen management
     */
    $scope.pagesSeen = [];

    $scope.pageNotSeen = function(index) {
        return (_.indexOf($scope.pagesSeen, index) == -1);
    };

    $scope.pageSeen = function(index) {
        return !$scope.pageNotSeen(index);
    };
}]);

app.directive('triggerPreviewSectionsReady', function() {
    return function($scope) {
        if ($scope.$last) {
            $scope.$emit('PreviewSectionsReady');
        }
    };
});
