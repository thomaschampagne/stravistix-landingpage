app.directive('paypalDonate', function() {
    return {
        templateUrl: 'templates/donate.html',
        link: function($scope) {
            $scope.currenciesList = [{
                cur: 'EUR',
                paypalButtonId: 'TEZRZV7CYGHZQ'
            }, {
                cur: 'USD',
                paypalButtonId: 'Q232XKCHNTVL8'
            }, {
                cur: 'GBP',
                paypalButtonId: 'RPCY42BB9ZV9L'
            }];
            // init
            $scope.currency = $scope.currenciesList[0];
            $scope.toggleChangeCur = function(currency) {
                $scope.currency = currency;
            };
        }
    };
});
