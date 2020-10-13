// ************************************
//          Storage Controller
// ************************************


const StorageCtrl = (function() {

})();


// ************************************
//          ship Controller
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
    ships: [
      // {id: 0, name: 'MSR', cost: '110'},
      // {id: 1, name: 'Hammerhead', cost: '510'}
    ],
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
    }
  }
})();


// ************************************
//          UI Controller
// ************************************


const UIctrl = (function() {

  const UIselectors = {
    shipList: '#ship-list',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    removeBtn: '.remove-btn',
    backBtn: '.back-btn',
    inputShipName: '#ship-name',
    inputShipCost: '#ship-cost',
    totalCredits: '.total-credits'
  }

  return {
    // Step 7 - provide data for population
    populateShipList: function(ships) {
      let html = '';

      ships.forEach((ship) => {
        html += `
          <li id="ship-${ship.id}" class="collection-item">
            <strong>${ship.name}: </strong><em>${ship.cost} credits</em>
            <a class="secondary-content" href="#"><i class="fas fa-edit "></i></i></a>
          </li>
        `;
      })

      document.querySelector(UIselectors.shipList).innerHTML = html;
    },
    // Step 8 - get UIselectors
    getUiSelectors: function() {
      return UIselectors;
    },
    // Step 12 - get inputs
    getShipInput: function() {
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
        <a class="secondary-content" href="#"><i class="fas fa-edit "></i></i></a>
      `;

      document.querySelector(UIselectors.shipList).insertAdjacentElement('beforeend', li);
    },
    // Step 25 - clear input function
    clearInput: function() {
      document.querySelector(UIselectors.inputShipName).value = '';
      document.querySelector(UIselectors.inputShipCost).value = '';
    },
    // Step 26 - hide UL
    hideList: function() {
      document.querySelector(UIselectors.shipList).style.display = 'none';
    },
    showTotalCredits: function(totalCredits) {
      // Step 32
      document.querySelector(UIselectors.totalCredits).textContent = totalCredits;
    }
  }

})();


// ************************************
//          App Controller
// ************************************


const app = (function(ShipCtrl, UIctrl) {  
  
  // Step 9 - Load event listeners
  const loadEventListeners = function() {

    // Get UI selectors
    const UIselectors = UIctrl.getUiSelectors();

    // Add ship event
    document.querySelector(UIselectors.addBtn).addEventListener('click', shipAddSubmit);
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

      // Step 24 - Clear input fields
      UIctrl.clearInput();
    } 

    e.preventDefault();
  }

  return {
    init: function() { // Step 3 - initialize app

      
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

})(ShipCtrl, UIctrl);

// Step 5 - initialize app
app.init();