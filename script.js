function Shop(shopID, minCustHour, maxCustHour, avgCookiesCust) {
  this.shopID = shopID;
  this.minCustHour = minCustHour;
  this.maxCustHour = maxCustHour;
  this.avgCookiesCust = avgCookiesCust;
  this.hourlyTotals = [];
  this.custPerHour = function () {
    return (Math.floor(Math.random() * (this.maxCustHour - this.minCustHour)) + this.minCustHour);
  };
  this.cookiesPerHour = function() {
    return Math.floor(this.custPerHour() * this.avgCookiesCust);
  };
  this.hourlyModel = function() {
    var total = 0;

    for (var i = 0; i < times.length; i++) {
      var cookies = this.cookiesPerHour();
      this.hourlyTotals.push(cookies);
      total += cookies;
    };

    this.hourlyTotals.push(total);
    console.log(this.hourlyTotals);
  }

}

var pikePlace = new Shop('Pike Place Market', 17, 88, 5.2);
var seaTac = new Shop('SeaTac Airport', 6, 44, 1.2);
var southcenter = new Shop('Southcenter Mall', 11, 38, 1.9);
var bellevue = new Shop('Bellevue Square', 20, 48, 3.3);
var alki = new Shop('Alki', 3, 24, 2.6);

var allShops = [pikePlace, seaTac, southcenter, bellevue, alki];
var times = ['10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm'];

function reportAllShops () {
 for (var k = 0; k < allShops.length; k++) {
    allShops[k].hourlyModel();
  }
}

function makeTable () {
  var tbl = document.createElement('table');
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
    rowName.textContent = allShops[j].shopID;
    trElement.appendChild(rowName);

    for (var i = 0; i <= times.length; i++) {
      var tdElement = document.createElement('td');
      tdElement.textContent = allShops[j].hourlyTotals[i];
      trElement.appendChild(tdElement);
    }

    var shopTotal = document.createElement('td');
    shopTotal.textContent = allShops[j].total;
    trElement.appendChild(shopTotal);
    tbl.appendChild(trElement);
  }

  document.getElementById('table').appendChild(tbl);
}

reportAllShops();
makeTable();
