var allShops = [];
var times = ['10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm'];

function Shop(shopID, minCustHour, maxCustHour, avgCookiesCust) {
  this.shopID = shopID;
  this.minCustHour = minCustHour;
  this.maxCustHour = maxCustHour;
  this.avgCookiesCust = avgCookiesCust;
  this.hourlyTotals = [];
  allShops.push(this);

  this.cookiesPerHour = function() {
    return Math.floor((Math.floor(Math.random() * (this.maxCustHour - this.minCustHour)) + this.minCustHour) * this.avgCookiesCust);
  }

  this.hourlyModel = function() {
    var total = 0;

    for (var i = 0; i < times.length; i++) {
      var cookies = this.cookiesPerHour();
      this.hourlyTotals.push(cookies);
      total += cookies;
    };

    this.hourlyTotals.push(total);
  }

  this.hourlyModel();
}

var pikePlace = new Shop('Pike Place Market', 17, 88, 5.2);
var seaTac = new Shop('SeaTac Airport', 6, 44, 1.2);
var southcenter = new Shop('Southcenter Mall', 11, 38, 1.9);
var bellevue = new Shop('Bellevue Square', 20, 48, 3.3);
var alki = new Shop('Alki', 3, 24, 2.6);

function makeTable () {
  var tbl = document.createElement('table');
  tbl.className = 'box';
  var thRow = document.createElement('tr');
  var emptyCell = document.createElement('th');
  thRow.appendChild(emptyCell);

  for (var k = 0; k < times.length; k++) {
    var thElement = document.createElement('th');
    thElement.textContent = times[k];
    thRow.appendChild(thElement);
  }

  var totalCell = document.createElement('th');
  totalCell.textContent = 'Total';
  thRow.appendChild(totalCell);
  tbl.appendChild(thRow);

  for (var j = 0; j < allShops.length; j++) {
    var trElement = document.createElement('tr');
    var rowName = document.createElement('td');
    rowName.className = 'highlight';
    rowName.textContent = allShops[j].shopID;
    trElement.appendChild(rowName);

    for (var i = 0; i <= times.length; i++) {
      var tdElement = document.createElement('td');
      tdElement.className = 'data';
      tdElement.textContent = allShops[j].hourlyTotals[i];
      trElement.appendChild(tdElement);
    }

    var shopTotal = document.createElement('td');
    shopTotal.textContent = allShops[j].total;
    trElement.appendChild(shopTotal);
    tbl.appendChild(trElement);
  }

  document.getElementById('table').appendChild(tbl);
};

var shopForm = document.getElementById('shopform');

function renderTable () {
  var table = document.getElementById('table');
  table.innerHTML = null;
  makeTable();
};

var handleFormSubmit = function(event) {
  event.preventDefault();

  var shop = event.target.shop.value;
  var min = event.target.min.value;
  var max = event.target.max.value;
  var avg = event.target.avg.value;

  console.log('shop:' + shop);
  console.log('min:' + min);
  console.log('max:' + max);
  console.log('avg:' + avg);

  for (var l = 0; l < allShops.length; l++) {
    if (shop === allShops[l].shopID) {
      console.log('found:' + shop);
      var shopExists = true;
      var shopToEdit = allShops[l];
    }
  }

  if (shopExists) {
    console.log('can edit shop');
    console.log(shopToEdit);
    shopToEdit.minCustHour = min;
    shopToEdit.maxCustHour = max;
    shopToEdit.avgCookiesCust = avg;
    shopToEdit.hourlyTotals = [];
    shopToEdit.hourlyModel();
  } else {
    var newShop = new Shop(shop, min, max, avg);
  }

  event.target.shop.value = null;
  event.target.min.value = null;
  event.target.max.value = null;
  event.target.avg.value = null;

  renderTable();
};

shopForm.addEventListener('submit', handleFormSubmit);

renderTable();
