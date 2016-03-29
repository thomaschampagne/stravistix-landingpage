/**
 * Hold the main behaviour of the landing page
 */
app.controller("BehaviourController", ['$scope', '$jQ', 'Fullpage', 'Swipebox', 'Animator', function ($scope, $jQ, Fullpage, Swipebox, Animator) {

	// Preview Data Definition
	$scope.previewsData = [{
		id: 'preview_01',
		images: ['img/screens/activity_main.jpg'],
		caption: 'A ton of new advanced metrics [~6o] for demanding athletes.'
    }, {
		id: 'preview_02',
		images: ['img/screens/activity_xtd_hr_speed.jpg', 'img/screens/activity_power_cadence.jpg', 'img/screens/activity_grade_elevation.jpg'],
		caption: 'Time distribution of all sensors data on activities and segments efforts. zones are fully customizable in plugin options.'
    }];

	// On angular preview sections ready...
	$scope.$on('PreviewSectionsReady', function () {
		$scope.verticalScrollInit();
		$scope.handleLogoHinge();
	});

	$scope.verticalScrollInit = function () {

		// Setup fullpages anchors order
		$scope.previewsAnchors = _.pluck($scope.previewsData, 'id');
		$scope.anchors = _.union(['downloadPage', 'quotePage'], $scope.previewsAnchors, ['andMorePage', 'donatePage']);

		Fullpage.init($scope.anchors, function afterLoad(pageName, pageIndex) {
			$scope.afterPageLoaded(pageName, pageIndex);
		});

		Swipebox.init();
	};

	$scope.afterPageLoaded = function (pageName, pageIndex) {

		$scope.currentPageName = pageName;

		// Landing download page
		if (pageName === 'downloadPage' && $scope.pageNotSeen(pageIndex)) {

			Animator.animate('#outsideIcons', {
				name: 'fadeIn'
			});
			Animator.animate('#logo', {
				name: 'fadeIn'
			});
			Animator.animate('#downloadLink', {
				name: 'fadeIn'
			});
			Animator.animate('#goToQuote', {
				name: 'fadeInDown'
			});

			$scope.pagesSeen.push(pageIndex);
		}
		// Quote page
		if (pageName === 'quotePage' && $scope.pageNotSeen(pageIndex)) {

			Animator.promiseAnimate('#quote', {
				name: 'fadeInLeft'
			});

			Animator.animate('#goToPreview', {
				name: 'fadeInDown'
			});

			$scope.pagesSeen.push(pageIndex);
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
			Animator.animate('#goToTop', {
				name: 'fadeInUp'
			});
			$scope.pagesSeen.push(pageIndex);
		}
	};

	$scope.nextSection = function () {
		Fullpage.get().moveSectionDown();
	};

	$scope.goToDonatePage = function () {
		if ($scope.currentPageName === 'donatePage') {
			Animator.animate('.donate', {
				name: 'shake'
			});
		} else {
			$scope.goTo('donatePage');
		}
	};

	$scope.goTo = function (page) {
		Fullpage.get().moveTo(page);
	};

	/**
	 * Pages seen management
	 */
	$scope.pagesSeen = [];

	$scope.pageNotSeen = function (index) {
		return (_.indexOf($scope.pagesSeen, index) == -1);
	};

	$scope.pageSeen = function (index) {
		return !$scope.pageNotSeen(index);
	};

	/**
	 * Logo click fun animation :D
	 */
	$scope.handleLogoHinge = function () {
		$jQ('#logo').on('click', function () {
			Animator.animate('#logo', {
				name: 'hinge',
				delay: 0,
				duration: 2
			}, function () {
				Animator.animate('#logo', {
					name: 'bounceInUp',
					delay: 0,
					duration: 1.5
				});
			});
		});
	};
}]);

app.directive('triggerPreviewSectionsReady', function () {
	return function ($scope) {
		if ($scope.$last) {
			$scope.$emit('PreviewSectionsReady');
		}
	};
});
