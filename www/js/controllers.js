angular.module('starter.controllers', [])

    .controller('HomeCtrl', function ($scope, $ionicPopup, $http, DataServices) {


        // --- False when the organizition did not start
        $scope.organizing = false;

        DataServices.getBBQStarted().then(function(data){
            $scope.organizing = data.organize;
        });

        $scope.startGrill = function () {
            $ionicPopup.alert({
                title: 'Sent',
                content: 'An email has been sent to Zueri-West'
            }).then(function (res) {
                    $scope.organizing = true;
                    DataServices.startBBQ();
                });
        };


        $scope.refreshParticipants = function () {

            DataServices.getParticipants().then(function(data){
                $scope.particpantsList = data.participants;
            });
        }

        // --- init
        $scope.refreshParticipants();
    })

    .controller('FriendsCtrl', function ($scope, DataServices) {



        $scope.info = {name: "Loic"};

        // --- Get the available food for today menu
        DataServices.getFoodList().then(function (data) {
            $scope.foodList = data;

            angular.forEach($scope.foodList, function (val) {
                val.qty = 0;
            });
        });

        // --- Increase Qty for a food
        $scope.increase = function (index) {
            $scope.foodList[index].qty += 1;
        }
        // -- Decrease qty for a food
        $scope.decrease = function (index) {
            if ($scope.foodList[index].qty > 0) {
                $scope.foodList[index].qty -= 1;
            }
        }

        // --- order the food!
        $scope.order = function (){
            console.log('we order for u');
            console.log($scope.foodList);
            console.log($scope.info.name);

            DataServices.joinBBQ($scope.foodList,$scope.info.name).then(function(answer){
                alert(answer);
            });

        }


    })

    .controller('FriendDetailCtrl', function ($scope, $stateParams, Friends) {
        $scope.friend = Friends.get($stateParams.friendId);
    })

    .controller('ShoppingListCtrl', function ($scope, DataServices) {


        // -- Nbr of people
        $scope.nbrPerson;
        DataServices.getNbrParticipant().then(function(nbr){
            $scope.nbrPerson = parseInt(nbr);
            // --- Salad, chips, bread, salad sauce
            $scope.salad = 100 * $scope.nbrPerson;
            $scope.bread = 100 * $scope.nbrPerson;
            $scope.chips = 60 *  $scope.nbrPerson;
        });





        // --- Price paid
        $scope.info = {price: ""};
        // --- Price per person
        $scope.pricePP = "";

        DataServices.getShoppingList().then(function (data) {
                $scope.shoppingList = data;
            },
            function (errorMessage) {
                console.error(errorMessage);
            });



        $scope.$watch("info.price", function(newValue, oldValue) {
            $scope.pricePP = Math.round(newValue / $scope.nbrPerson * 100)/100;

        });

    });
