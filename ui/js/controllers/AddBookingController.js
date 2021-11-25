angular.module('HotelApp')
    .controller('AddBookingController', ['$scope', function ($scope) {
        $scope.bookings = []; // TODO move into a service
        $scope.countryPhoneCodes = [
            { country: "India", code: "91" },
            { country: "United States", code: "1" },
            { country: "United Kingdom", code: "44" }
        ];

        $scope.roomTypes = [
            { name: "Single Bed Room", maxAllowed: 2, cost: 700 },
            { name: "Double Bed Room", maxAllowed: 3, cost: 1200 },
            { name: "Executive Room", maxAllowed: 3, cost: 1400 }
        ];
    
        var clearBooking = function () {
            $scope.newBooking = {
                name: "",
                emailId: "",
                countryPhonePrefix: "91",
                phoneNumber: "",
                address: "",
                noOfPersons: 0,
                roomType: "Single Bed Room",
                numberOfNights: 0
            };
        };
        function initToasts () {
            var toastElList = [].slice.call(document.querySelectorAll('.toast'))
            toastElList.map(function (toastEl) {
              return new bootstrap.Toast(toastEl)
            })
        };
        // init
        clearBooking();
        initToasts();

        var _getSelectedRoom = function (roomType) {
            return $scope.roomTypes.find(room => {
                return room.name === roomType;
            });
        };

        $scope.calculateNumberOfRooms = function () {
            // if ($scope.addBookingForm.$invalid) {
            if (!Number.isInteger($scope.newBooking.noOfPersons) || $scope.newBooking.noOfPersons < 1 || $scope.newBooking.noOfPersons > 99) {
                return "N/A"; // invalid form, cant calculate yet
            } else {
                var selectedRoom = _getSelectedRoom($scope.newBooking.roomType);
                var roomsNeeded = Math.ceil($scope.newBooking.noOfPersons/selectedRoom.maxAllowed);
                return roomsNeeded;
            }
        };

        $scope.calculateTotalCost = function () {
            // if ($scope.addBookingForm.$invalid) {
                if (!Number.isInteger($scope.newBooking.noOfPersons) || $scope.newBooking.noOfPersons < 1 || $scope.newBooking.noOfPersons > 99
                    || !Number.isInteger($scope.newBooking.numberOfNights) || $scope.newBooking.numberOfNights < 1 ) {
                    return "N/A"; // invalid form, cant calculate yet
                } else {
                    var selectedRoom = _getSelectedRoom($scope.newBooking.roomType);
                    var totalCost = (Math.ceil($scope.newBooking.noOfPersons/selectedRoom.maxAllowed)) * selectedRoom.cost * $scope.newBooking.numberOfNights;
                    return totalCost + " - INR";
                }
        };

        $scope.confirmBooking = function () {
            $scope.bookings.push($scope.newBooking);
            clearBooking();
            //
            // var bookingToast = document.getElementById("bookingToast");
            // window.scrollTo(0);
            // if (bookingToast) bootstrap.Toast.getInstance(bookingToast).show();
            //
            console.log("Total bookings - " + $scope.bookings.length);
            console.log($scope.bookings);
        };

    }]);