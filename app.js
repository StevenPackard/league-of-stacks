// Global Variables
let gold = 0
let buffTotal = 0
let itemTotal = 1

// Items and Auto Clickers
let clickUpgrades = {
  hurricane: {
    price: 10,
    quantity: 0,
    multiplier: 1
  },
  ludens: {
    price: 20,
    quantity: 0,
    multiplier: 2
  }
}
let autoUpgrades = {
  support: {
    price: 50,
    quantity: 0,
    multiplier: 20,
  },
  baron: {
    price: 100,
    quantity: 0,
    multiplier: 50,
  }
}

// Function to attack and add gold
function attack() {
  gold += (1 * itemTotal)
  update()
}

// Function to update gold on screen and disable buttons if you dont have enough gold
function update() {

  document.getElementById("goldCollected").innerText = gold.toString()
  document.getElementById("hurricanePrice").innerText = clickUpgrades['hurricane'].price.toString()
  document.getElementById("ludensPrice").innerText = clickUpgrades['ludens'].price.toString()
  document.getElementById("supportPrice").innerText = autoUpgrades['support'].price.toString()
  document.getElementById("baronPrice").innerText = autoUpgrades['baron'].price.toString()
  document.getElementById("hurricaneQuant").innerText = clickUpgrades[`hurricane`].quantity.toString()
  document.getElementById("ludensQuant").innerText = clickUpgrades[`ludens`].quantity.toString()
  document.getElementById("supportQuant").innerText = autoUpgrades[`support`].quantity.toString()
  document.getElementById("baronQuant").innerText = autoUpgrades[`baron`].quantity.toString()

  // Variables and statement to disable buttons if not enough gold
  let cantBuyHurricane = document.getElementById("hurricaneItem")
  let cantBuyLudens = document.getElementById("ludensItem")
  let cantBuySupport = document.getElementById("supportBuff")
  let cantBuyBaron = document.getElementById("baronBuff")

  cantBuyHurricane.setAttribute("disabled", "true")
  cantBuyLudens.setAttribute("disabled", "true")
  cantBuySupport.setAttribute("disabled", "true")
  cantBuyBaron.setAttribute("disabled", "true")

  if (gold >= clickUpgrades["hurricane"].price) {
    cantBuyHurricane.removeAttribute("disabled")
  }
  if (gold >= clickUpgrades["ludens"].price) {
    cantBuyLudens.removeAttribute("disabled")
  }
  if (gold >= autoUpgrades["support"].price) {
    cantBuySupport.removeAttribute("disabled")
  }
  if (gold >= autoUpgrades["baron"].price) {
    cantBuyBaron.removeAttribute("disabled")
  }
}

// Function to buy items and add to total item multiplier 
function buyItem(itemName) {
  itemTotal += clickUpgrades[itemName].multiplier
  clickUpgrades[itemName].quantity++
  document.getElementById("itemMultiplier").innerText = itemTotal.toString()
  gold -= clickUpgrades[itemName].price
  clickUpgrades[itemName].price *= 2
  update()
}

// Function to buy buffs and add to total buff multiplier
function buyBuff(buffName) {
  buffTotal += autoUpgrades[buffName].multiplier
  autoUpgrades[buffName].quantity++
  document.getElementById("buffMultiplier").innerText = buffTotal.toString()
  gold -= autoUpgrades[buffName].price
  autoUpgrades[buffName].price *= 2
  update()
}

// Function to add buff modifier to total gold
function collectBuffs() {
  let total = 0
  for (const key in autoUpgrades) {
    total += (autoUpgrades[key].quantity * autoUpgrades[key].multiplier)
  }
  gold += total;
  update()
}

// Function that adds buff total every 5 seconds
function startInterval() {
  setInterval(collectBuffs, 3000)
}

// Update and Start Interval when page loads
update()
startInterval()
