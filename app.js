

// Wait for the DOM to be fully loaded
window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            await window.ethereum.enable();
            // Accounts now exposed
        } catch (error) {
            console.error("User denied account access");
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    // Contract ABI (copy this from the compiled contract output)
    let abi =[
        {
          "inputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "roomId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "guest",
              "type": "address"
            }
          ],
          "name": "CheckedIn",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "roomId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "guest",
              "type": "address"
            }
          ],
          "name": "CheckedOut",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "roomId",
              "type": "uint256"
            }
          ],
          "name": "MaintenanceCompleted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "roomId",
              "type": "uint256"
            }
          ],
          "name": "MaintenanceRequested",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "roomId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "orderDetails",
              "type": "string"
            }
          ],
          "name": "RoomServiceOrdered",
          "type": "event"
        },
        {
          "constant": true,
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "bookingDetails",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "startDate",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "endDate",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "roomType",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "status",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "foodBuffet",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "date",
              "type": "uint256"
            },
            {
              "internalType": "address payable",
              "name": "booker",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "attendees",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isBooked",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "maintenanceRequired",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address payable",
              "name": "",
              "type": "address"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "partyHall",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "date",
              "type": "uint256"
            },
            {
              "internalType": "address payable",
              "name": "booker",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "duration",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isBooked",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "roomServiceOrders",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "rooms",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "hotel_name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "status",
              "type": "string"
            },
            {
              "internalType": "address payable",
              "name": "guest",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "bookingExpires",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isCheckedIn",
              "type": "bool"
            },
            {
              "internalType": "string",
              "name": "roomType",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "roomsCount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "internalType": "string",
              "name": "_name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_roomType",
              "type": "string"
            }
          ],
          "name": "addRoom",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_roomId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_days",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "_roomType",
              "type": "string"
            }
          ],
          "name": "bookRoom",
          "outputs": [],
          "payable": true,
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_roomId",
              "type": "uint256"
            }
          ],
          "name": "checkIn",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_roomId",
              "type": "uint256"
            }
          ],
          "name": "checkOut",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_roomId",
              "type": "uint256"
            }
          ],
          "name": "cancelBooking",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "internalType": "address",
              "name": "_guest",
              "type": "address"
            }
          ],
          "name": "currentStatus",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "internalType": "uint256",
              "name": "roomId",
              "type": "uint256"
            }
          ],
          "name": "requestMaintenance",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "internalType": "uint256",
              "name": "roomId",
              "type": "uint256"
            }
          ],
          "name": "completeMaintenance",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "internalType": "uint256",
              "name": "roomId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "orderDetails",
              "type": "string"
            }
          ],
          "name": "orderRoomService",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_date",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_duration",
              "type": "uint256"
            }
          ],
          "name": "bookPartyHall",
          "outputs": [],
          "payable": true,
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [],
          "name": "cancelPartyHallBooking",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_date",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_attendees",
              "type": "uint256"
            }
          ],
          "name": "bookBuffet",
          "outputs": [],
          "payable": true,
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [],
          "name": "cancelBuffetBooking",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];

    // Contract Address (deployed contract address)
    let contractAddress = '0x43755265154f76E746584De12A636886FaF20D02'; // Replace with your deployed contract address

    // Load the contract
    window.contract = new web3.eth.Contract(abi, contractAddress);
});

async function addRoom() {
    // let roomName = document.getElementById('room-id').value;
    let roomType=document.getElementById('roomType').value;
    let roomName=document.getElementById('roomName').value;

    try {
        // Get the accounts
        let accounts = await web3.eth.getAccounts();
        let account = accounts[0];

        // Perform the addRoom transaction
        await contract.methods.addRoom(roomName,roomType).send({ from: account });
        console.log(`Room "${roomName}" added successfully!`);
        alert(`Room "${roomName}" added successfully!`);
    } catch (error) {
        console.error('Error adding room:', error);
        alert('Error adding room:', error.message);
    }
}

async function bookRoom() {
    let roomId = document.getElementById('room-id').value;
    let days = document.getElementById('nights').value;
    let type = document.getElementById('room-type').value;


    try {
        // Get the accounts
        let accounts = await web3.eth.getAccounts();
        let account = accounts[0];

        // Get room price (assuming 1 ether per day as set in addRoom)
        let room = await contract.methods.rooms(roomId).call();
        let price = room.price;

        // Perform the bookRoom transaction
        await contract.methods.bookRoom(roomId, days,type).send({
            from: account,
            value: price * days
        });
        console.log(`Room "${roomId}" booked for ${days} days successfully!`);
        alert(`Room "${roomId}" booked for ${days} days successfully!`);
    } catch (error) {
        console.error('Error booking room:', error);
        alert('Error booking room:', error.message);
    }
}

async function checkIn() {
    let roomId = document.getElementById('roomIdToCheckIn').value;

    try {
        // Get the accounts
        let accounts = await web3.eth.getAccounts();
        let account = accounts[0];

        // Perform the checkIn transaction
        await contract.methods.checkIn(roomId).send({ from: account });
        console.log(`Checked in to room "${roomId}" successfully!`);
        alert(`Checked in to room "${roomId}" successfully!`);
    } catch (error) {
        console.error('Error checking in:', error);
        alert('Error checking in:', error.message);
    }
}

async function checkOut() {
    let roomId = document.getElementById('roomIdToCheckOut').value;

    try {
        // Get the accounts
        let accounts = await web3.eth.getAccounts();
        let account = accounts[0];

        // Perform the checkOut transaction
        await contract.methods.checkOut(roomId).send({ from: account });
        console.log(`Checked out of room "${roomId}" successfully!`);
        alert(`Checked out of room "${roomId}" successfully!`);
    } catch (error) {
        console.error('Error checking out:', error);
        alert('Error checking out:', error.message);
    }
}

async function cancelBooking() {
    let roomId = document.getElementById('roomidc').value;

    try {
        // Get the accounts
        let accounts = await web3.eth.getAccounts();
        let account = accounts[0];

        // Perform the cancelBooking transaction
        await contract.methods.cancelBooking(roomId).send({ from: account });
        console.log(`Booking for room "${roomId}" canceled successfully!`);
        alert(`Booking for room "${roomId}" canceled successfully!`);
    } catch (error) {
        console.error('Error canceling booking:', error);
        alert('Error canceling booking:', error.message);
    }
}



async function requestMaintenance() {
    let roomId = document.getElementById('roomIdM').value;

    try {
        // Get the accounts
        let accounts = await web3.eth.getAccounts();
        let account = accounts[0];

        // Perform the cancelBooking transaction
        await contract.methods.requestMaintenance(roomId).send({ from: account });
        console.log(`Maintenance call for room "${roomId}" done successfully!`);
        alert(`Maintenance call for room "${roomId}" done successfully!`);
    } catch (error) {
        console.error('Error canceling booking:', error);
        alert('Error canceling booking:', error.message);
   
    }
}