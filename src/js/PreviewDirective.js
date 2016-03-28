app.directive('preview', ['Fullpage', function(Fullpage) {
    return {
        templateUrl: 'templates/preview.html',
        scope: {
            data: '=',
            index: '='
        },
        link: function($scope) {
            $scope.nextPreview = function() {
                Fullpage.get().moveSectionDown();
            };
        }
    };
}]);