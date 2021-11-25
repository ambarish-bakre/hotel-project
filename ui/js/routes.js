var hotelApp = angular.module("HotelApp");

hotelApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/bookings', {
        templateUrl: '/ui/html/list-booking.html',
        controller: 'ListBookingController'
    })
    .when('/addBooking', {
        templateUrl: '/ui/html/add-booking.html',
        controller: 'AddBookingController'
    })
    .when('/', {
        redirectTo: '/addBooking'
    })
    .otherwise({ redirectTo: '/addBooking' });

}]);
