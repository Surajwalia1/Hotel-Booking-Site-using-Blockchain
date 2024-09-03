// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

contract Hotel {
    struct Room {
        uint id;
        string name;
        string hotel_name;
        uint price;
        string status;
        address payable guest;
        uint bookingExpires;
        bool isCheckedIn;
        string[] suvidha;
        string roomType; // Added roomType to the Room struct
    }

    struct HallBooking {
        uint date;
        address payable booker;
        uint duration;
        uint price;
        bool isBooked;
    }

    struct BuffetBooking {
        uint date;
        address payable booker;
        uint attendees;
        uint price;
        bool isBooked;
    }

    struct BookingDetails {
        uint startDate;
        uint endDate;
        string roomType;
        string status;
    }

    mapping (uint => Room) public rooms;
    mapping (uint => bool) public maintenanceRequired;
    mapping (uint => string) public roomServiceOrders;
    mapping (address => BookingDetails) public bookingDetails;
    uint public roomsCount;
    address payable public owner;
    HallBooking public partyHall;
    BuffetBooking public foodBuffet;

    event CheckedIn(uint roomId, address guest);
    event CheckedOut(uint roomId, address guest);
    event MaintenanceRequested(uint roomId);
    event MaintenanceCompleted(uint roomId);
    event RoomServiceOrdered(uint roomId, string orderDetails);

    constructor() public {
        owner = msg.sender;
        addRoom("Room 1", "single");
        addRoom("Room 2", "double");
        addRoom("Room 3", "suite");
    }

    function addRoom(string memory _name, string memory _roomType) public {
        roomsCount++;
        rooms[roomsCount] = Room(roomsCount, _name, 'Hotel 1', 1 ether, 'available', address(0), 0, false, new string[](0), _roomType);
    }

    function bookRoom(uint _roomId, uint _days, string memory _roomType) public payable {
        require(_roomId > 0 && _roomId <= roomsCount, "Invalid room ID");
        require(compareStrings(rooms[_roomId].status, "available"), "Room is not available");
        require(compareStrings(rooms[_roomId].roomType, _roomType), "Room type does not match");
        require(msg.value == rooms[_roomId].price * _days, "Amount sent must be equal to room price");
        require(_days > 0, "Booking must be at least one day");

        uint startDate = now;
        uint endDate = startDate + (_days * 1 days);

        rooms[_roomId].guest = msg.sender;
        rooms[_roomId].status = "booked";
        rooms[_roomId].bookingExpires = endDate;
        rooms[_roomId].isCheckedIn = false;

        bookingDetails[msg.sender] = BookingDetails(startDate, endDate, _roomType, "booked");

        owner.transfer(msg.value);
    }

    function checkIn(uint _roomId) public {
        require(_roomId > 0 && _roomId <= roomsCount, "Invalid room ID");
        require(msg.sender == rooms[_roomId].guest, "Only the booked guest can check in");
        require(compareStrings(rooms[_roomId].status, "booked"), "Room must be booked");
        require(!rooms[_roomId].isCheckedIn, "Guest is already checked in");
        
        rooms[_roomId].isCheckedIn = true;
        rooms[_roomId].status = "occupied";
        bookingDetails[msg.sender].status = "occupied";
        emit CheckedIn(_roomId, msg.sender);
    }

    function checkOut(uint _roomId) public {
        require(_roomId > 0 && _roomId <= roomsCount, "Invalid room ID");
        require(msg.sender == rooms[_roomId].guest, "Only the checked-in guest can check out");
        require(rooms[_roomId].isCheckedIn, "Guest must be checked in to check out");

        rooms[_roomId].status = "available";
        rooms[_roomId].guest = address(0);
        rooms[_roomId].bookingExpires = 0;
        rooms[_roomId].isCheckedIn = false;

        delete bookingDetails[msg.sender];

        emit CheckedOut(_roomId, msg.sender);
    }

    function cancelBooking(uint _roomId) public {
        require(_roomId > 0 && _roomId <= roomsCount, "Invalid room ID");
        require(compareStrings(rooms[_roomId].status, "booked"), "Room is already available or occupied");
        require(msg.sender == owner || msg.sender == rooms[_roomId].guest, "Not authorized to cancel booking");

        uint currentTime = now;
        require(rooms[_roomId].bookingExpires > currentTime + 1 days, "Cancellation allowed only before 24 hours of booking end");

        address payable guest = rooms[_roomId].guest;
        rooms[_roomId].status = "available";
        rooms[_roomId].guest = address(0);
        rooms[_roomId].bookingExpires = 0;
        rooms[_roomId].isCheckedIn = false;

        uint refundAmount = rooms[_roomId].price * (rooms[_roomId].bookingExpires - currentTime) / 1 days;

        guest.transfer(refundAmount);

        delete bookingDetails[guest];
    }

    function currentStatus(address _guest) public view returns (string memory, uint, uint, string memory, string memory) {
        BookingDetails memory details = bookingDetails[_guest];
        return (details.roomType, details.startDate, details.endDate, details.status, "You can cancel booking before 24 hours of end date");
    }

    function requestMaintenance(uint roomId) public {
        require(msg.sender == owner || msg.sender == rooms[roomId].guest, "Not authorized");
        maintenanceRequired[roomId] = true;
        emit MaintenanceRequested(roomId);
    }

    function completeMaintenance(uint roomId) public {
        require(msg.sender == owner, "Only the owner can complete maintenance");
        maintenanceRequired[roomId] = false;
        emit MaintenanceCompleted(roomId);
    }

    function orderRoomService(uint roomId, string memory orderDetails) public {
        require(msg.sender == rooms[roomId].guest, "Only the guest can order room service");
        roomServiceOrders[roomId] = orderDetails;
        emit RoomServiceOrdered(roomId, orderDetails);
    }

    function bookPartyHall(uint _date, uint _duration) public payable {
        require(!partyHall.isBooked, "Hall is already booked");
        require(msg.value == 2 ether * _duration, "Incorrect payment");

        partyHall = HallBooking(_date, msg.sender, _duration, msg.value, true);
    }

    function cancelPartyHallBooking() public {
        require(msg.sender == partyHall.booker, "Only the booker can cancel");
        partyHall.booker.transfer(partyHall.price);
        delete partyHall;
    }

    function bookBuffet(uint _date, uint _attendees) public payable {
        require(!foodBuffet.isBooked, "Buffet is already booked");
        uint pricePerPerson = 1 ether;
        require(msg.value == pricePerPerson * _attendees, "Incorrect payment");

        foodBuffet = BuffetBooking(_date, msg.sender, _attendees, msg.value, true);
    }

    function cancelBuffetBooking() public {
        require(msg.sender == foodBuffet.booker, "Only the booker can cancel");
        foodBuffet.booker.transfer(foodBuffet.price);
        delete foodBuffet;
    }

    function compareStrings(string memory a, string memory b) private pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
}