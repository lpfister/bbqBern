angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
    .factory('Friends', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var friends = [
            { id: 0, name: 'Scruff McGruff' },
            { id: 1, name: 'G.I. Joe' },
            { id: 2, name: 'Miss Frizzle' },
            { id: 3, name: 'Ash Ketchum' }
        ];

        return {
            all: function () {
                return friends;
            },
            get: function (friendId) {
                // Simple index lookup
                return friends[friendId];
            }
        }
    })
    .factory('DataServices', function ($http, $q) {

        // base url
        var baseUrl = 'http://localhost:4567/';




        return {
            all: function () {
                return friends;
            },
            get: function (friendId) {
                // Simple index lookup
                return friends[friendId];
            },
            /*
                Return the number of participant
             */
            getNbrParticipant: function(){

            //FIXME to implement


            },

            /*
            get participant
             */
            getParticipants: function(){
                var deferred = $q.defer();

                $http.get(baseUrl + 'participants.json').success(function (data) {
                    deferred.resolve(data);
                }).error(function(){
                        deferred.reject('The server is down');
                    });
                return deferred.promise;
            },

            /*
                Return a list of all the thing to buy including the quantity
             */
            getShoppingList: function(){

                var deferred = $q.defer();


                $http.get(baseUrl + 'participants.json').success(function (data) {

                    var ord = []
                    angular.forEach(data.participants,function(value,key){
                        console.log(value, '  = ', key);

                        angular.forEach(value.order,function(value,key){

                            if(angular.isDefined(ord[value.id])){
                                ord[value.id].qty += value.qty;
                            }
                            else{
                                ord[parseInt(value.id)] = {
                                        desc:value.desc,
                                        qty:value.qty
                                };
                            }
                        });
                    },ord);
                    var res = [];
                    angular.forEach(ord,function(value){
                        res.push(value);
                    },res);


                        deferred.resolve(res);
                }).error(function(){
                    deferred.reject('The server is down');
                    });
                //Calling Web API to fetch shopping cart items

                //Returning the promise object
                return deferred.promise;
            },
            getFoodList: function(){
                var deferred = $q.defer();

                $http.get(baseUrl + 'foodList.json').success(function (data) {

                    deferred.resolve(data.food);
                }).error(function(){
                        deferred.reject('The server is down');
                    });
                //Calling Web API to fetch shopping cart items

                //Returning the promise object
                return deferred.promise;
            },

            joinBBQ: function(postData){
                var deferred = $q.defer();
                var tmp = {loic:postData};
                $http.post(baseUrl + 'joinBBQ',tmp).success(function (data) {

                    deferred.resolve(data);
                }).error(function(){
                        deferred.reject('The server is down');
                    });
                return deferred.promise;
            }

    }
    });
