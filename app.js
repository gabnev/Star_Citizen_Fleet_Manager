// ************************************
//          Storage Controller
// ************************************


const StorageCtrl = (function() {

  // Step 64 - Initiate Local Storage
  return {    
    storeShip: function(ship) {
      let ships;

      if(localStorage.getItem('ships') === null) {
        ships = []

        ships.push(ship);

        localStorage.setItem('ships', JSON.stringify(ships));
      } else {

        ships = JSON.parse(localStorage.getItem('ships'));
        
        ships.push(ship);

        localStorage.setItem('ships', JSON.stringify(ships));

      }
    },
    getShipsFromStorage: function() {
      let ships;

      if(localStorage.getItem('ships') === null) {
        ships = [];
      } else {
        ships = JSON.parse(localStorage.getItem('ships'));

        return ships;
      }
    }
  }
})();


// ************************************
//          Ship Controller
// ************************************


const ShipCtrl = (function() {
  
  // Step 0 - Constructor
  const Ship = function(id, name, cost) {
    this.id = id;
    this.name = name;
    this.cost = cost;
  }

  // Step 1 - Data Structure
  const data = {
    // ships: [
    //   // {id: 0, name: 'MSR', cost: '110'},
    //   // {id: 1, name: 'Hammerhead', cost: '510'}
    // ],
    ships: StorageCtrl.getShipsFromStorage(),
    currentShip: null,
    totalCredits: 0
  }

  return {
    getShips: function() { // Step 4 - return Ship Data
      return data.ships;
    },
    addShip: function(name, cost) { // step 16 - add ship to data structure
      // Step 17 - generating IDs for ship
      let id;
      if(data.ships.length > 0) {
        id = data.ships[data.ships.length -1].id + 1;
      } else {
        id = 0;
      }

      // Step 18 - get Cost
      cost = parseInt(cost);

      // Step 19 - Generate new ship
      newShip = new Ship(id, name, cost);

      // Step 20 - push new ships array
      data.ships.push(newShip);

      return newShip;
    },
    logData: function() { // Step 2 - return Data
      return data;
    },
    getTotalCredits: function() {
      // Step 30 - calculate total credits
      let total = 0;

      data.ships.forEach((ship) => {
        total += ship.cost;
      })

      data.totalCredits = total;

      return data.totalCredits;
    },
    getShipById: function(id) {
      // Step - loop through data to find ship
      let found = null;

      data.ships.forEach((ship) => {
        if(ship.id === id) {
          found = ship;
        }
      })

      return found;
    },
    setCurrentShip: function(ship) {
      data.currentShip = ship;
    },
    getCurrentShip: function() {
      return data.currentShip;
    },
    updatedShip: function(name, cost) {
      // Step 48 - get info, parse cost to number
      cost = parseInt(cost);

      let found = null;

      data.ships.forEach((ship) => {
        if(ship.id == data.currentShip.id) {
          ship.name = name;
          ship.cost = cost;
          found = ship;
        }
      });
      return found;
    },
    deleteShip: function(id) {
      // Step 55
      const ids = data.ships.map((ship) => {
        return ship.id;
      });

      const index = ids.indexOf(id);

      data.ships.splice(index, 1);
    },
    clearAllShips: function() {
      data.ships = [];
    }
  }
})();


// ************************************
//          UI Controller
// ************************************


const UIctrl = (function() {

  const UIselectors = {
    shipList: '#ship-list',
    shipsList: '#ship-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    removeBtn: '.remove-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    inputShipName: '#ship-name',
    inputShipCost: '#ship-cost',
    totalCredits: '.total-credits'
  }

  return {
    populateShipList: function(ships) {
      // Step 7 - provide data for population
      let html = '';

      ships.forEach((ship) => {
        html += `
          <li id="ship-${ship.id}" class="collection-item">
            <strong>${ship.name}: </strong><em>${ship.cost} credits</em>
            <a class="secondary-content" href="#"><i class="edit-ship fas fa-edit "></i></i></a>
          </li>
        `;
      })

      document.querySelector(UIselectors.shipList).innerHTML = html;
    },
    getUiSelectors: function() {
      // Step 8 - get UIselectors
      return UIselectors;
    },
    getShipInput: function() {
      // Step 12 - get inputs
      return {
        name: document.querySelector(UIselectors.inputShipName).value,
        cost: document.querySelector(UIselectors.inputShipCost).value
      }
    },
    addListShip: function(ship) {
      // Step 28 - show UL
      document.querySelector(UIselectors.shipList).style.display = 'block';

      // Step 22 - create li element
      const li = document.createElement('li');

      li.className = `collection-item`;
      li.id = `ship-${ship.id}`;
      
      li.innerHTML = `
        <strong>${ship.name}: </strong><em>${ship.cost} credits</em>
        <a class="secondary-content" href="#"><i class="edit-ship fas fa-edit"></i></i></a>
      `;

      document.querySelector(UIselectors.shipList).insertAdjacentElement('beforeend', li);
    },
    clearInput: function() {
      // Step 25 - clear input function
      document.querySelector(UIselectors.inputShipName).value = '';
      document.querySelector(UIselectors.inputShipCost).value = '';
    },
    hideList: function() {
      // Step 26 - hide UL
      document.querySelector(UIselectors.shipList).style.display = 'none';
    },
    showTotalCredits: function(totalCredits) {
      // Step 32
      document.querySelector(UIselectors.totalCredits).textContent = totalCredits;
    },
    clearEditState: function() {
      // Step 34 
      UIctrl.clearInput();

      document.querySelector(UIselectors.addBtn).style.display = 'inline-block';
      document.querySelector(UIselectors.updateBtn).style.display = 'none';
      document.querySelector(UIselectors.removeBtn).style.display = 'none';
      document.querySelector(UIselectors.backBtn).style.display = 'none';
    },
    showEditState: function() {
      // Step 44 

      document.querySelector(UIselectors.addBtn).style.display = 'none';
      document.querySelector(UIselectors.updateBtn).style.display = 'inline-block';
      document.querySelector(UIselectors.removeBtn).style.display = 'inline-block';
      document.querySelector(UIselectors.backBtn).style.display = 'inline-block';
    },
    addShipToForm: function() {
      document.querySelector(UIselectors.inputShipName).value = ShipCtrl.getCurrentShip().name;
      document.querySelector(UIselectors.inputShipCost).value = ShipCtrl.getCurrentShip().cost; 

      // Step 43 - Show edit buttons when needed
      UIctrl.showEditState();
    },
    updateShip: function(ship) {
      let listShips = document.querySelectorAll(UIselectors.shipsList);

      // Step 50 - convert the node lists to array
      listShips = Array.from(listShips);

      listShips.forEach((listShip) => {

        const shipID = listShip.getAttribute('id');

        if(shipID === `ship-${ship.id}`) {
          document.querySelector(`#${shipID}`).innerHTML = `
            <strong>${ship.name}: </strong><em>${ship.cost} credits</em>
            <a class="secondary-content" href="#"><i class="edit-ship fas fa-edit"></i></i></a>
          `;
        }
      })
    },
    deleteListShip: function(id) {
      const shipID = `#ship-${id}`;

      const ship = document.querySelector(shipID);

      ship.remove();
    },
    removeShips: function() {
      let shipList = document.querySelectorAll(UIselectors.shipsList);

      shipList = Array.from(shipList);

      shipList.forEach((ship) => {
        ship.remove();
      })
    }
  }

})();


// ************************************
//          App Controller
// ************************************


const app = (function(ShipCtrl, StorageCtrl, UIctrl) {  
  
  // Step 9 - Stores & Loades event listeners
  const loadEventListeners = function() {

    // Get UI selectors
    const UIselectors = UIctrl.getUiSelectors();

    // Add ship event
    document.querySelector(UIselectors.addBtn).addEventListener('click', shipAddSubmit);

    // Step 46 - disable ENTER key
    document.addEventListener('keypress', (e) => {
      if(e.key === 'Enter') {
        e.preventDefault();
        return false;
      }
    })

    // Step 36 - EDIT ICON CLICK
    document.querySelector(UIselectors.shipList).addEventListener('click', shipEditClick)

    // Step 45
    document.querySelector(UIselectors.updateBtn).addEventListener('click', shipUpdateSubmit);

    
    // Step53 - Remove Function
    document.querySelector(UIselectors.removeBtn).addEventListener('click', shipDeleteSubmit);    
    
    // Step52 - Clear edit State
    document.querySelector(UIselectors.backBtn).addEventListener('click', UIctrl.clearEditState);

    // Step58 - Clear edit State
    document.querySelector(UIselectors.clearBtn).addEventListener('click', clearAllShipsClick);
  }

  // Step 11 - Add ship function
  const shipAddSubmit = function(e) {
    
    // Step 13 - put inputs into a variable
    const input = UIctrl.getShipInput();
    

    // Step 14 - check if input is empty
    if(input.name !== '' && input.cost !== '') {
      
      // Step 15 - Add ship
      const newShip = ShipCtrl.addShip(input.name, input.cost);

      // Step 21 - 
      UIctrl.addListShip(newShip);

      // Step 29 - get total credits
      const totalCredits = ShipCtrl.getTotalCredits();
      
      // Step 31 - SHOW total credits in UI
      UIctrl.showTotalCredits(totalCredits);

      // Step 64 - Store local when adding
      StorageCtrl.storeShip(newShip);

      // Step 24 - Clear input fields
      UIctrl.clearInput();
    }

    e.preventDefault();
  }

  // Step 37 - EDIT BTN 
  const shipEditClick = function(e) {
    
    if(e.target.classList.contains('edit-ship')) {
      // Step 38 - get list ship id
      const listId = e.target.parentNode.parentNode.id;

      const listIdArr = listId.split('-');

      const id = parseInt(listIdArr[1]);

      // Step 39 - You have the ID, now get the ship
      const shipToEdit = ShipCtrl.getShipById(id);

      // Step 41 - SET CURRENT SHIP
      ShipCtrl.setCurrentShip(shipToEdit);

      // Step 42
      UIctrl.addShipToForm();

    }
    
    e.preventDefault();
  }

  const shipUpdateSubmit = function(e) {
    
    const input = UIctrl.getShipInput();

    // Step 47 - update ship
    const updatedShip = ShipCtrl.updatedShip(input.name, input.cost);

    // Step 49 - update UI with new edit
    UIctrl.updateShip(updatedShip);

    // Step 51 - update credit counter after edit
    const totalCredits = ShipCtrl.getTotalCredits();
    UIctrl.showTotalCredits(totalCredits);

    UIctrl.clearEditState();

    e.preventDefault();
  }

  const shipDeleteSubmit = function(e) {
    
    // Step 54 - get current item to delete
    const currentShip = ShipCtrl.getCurrentShip();

    ShipCtrl.deleteShip(currentShip);

    // Step 57 - Delete from UI
    UIctrl.deleteListShip(currentShip.id);

    // Step 58 - update credit counter after edit
    const totalCredits = ShipCtrl.getTotalCredits();
    UIctrl.showTotalCredits(totalCredits);

    UIctrl.clearEditState();


    e.preventDefault();
  }

  const clearAllShipsClick = function(e) {
    
    // Step 59 - Delete all ships from Data Structue
    ShipCtrl.clearAllShips();

    // Step 61 - Update Credits
    const totalCredits = ShipCtrl.getTotalCredits();
    UIctrl.showTotalCredits(totalCredits);

    // Step 60 - Remove from UI
    UIctrl.removeShips();

    // Step 62 - Hide UL
    UIctrl.hideList();


    e.preventDefault();
  }

  return {
    init: function() { // Step 3 - initialize app

      // Step 35 - call hide buttons
      UIctrl.clearEditState();
      
      const ships = ShipCtrl.getShips();

      // Step 27 - apply hide list to init
      if(ships.length === 0) {
        UIctrl.hideList();
      } else {
        // Step 6 - populate UL
        UIctrl.populateShipList(ships);
      }

      // Step 33 - add show credits function to init
      const totalCredits = ShipCtrl.getTotalCredits();      
      UIctrl.showTotalCredits(totalCredits);

      // Step 10 - Load event listeners
      loadEventListeners();
    }
  }

})(ShipCtrl, StorageCtrl, UIctrl);

// Step 5 - initialize app
app.init();