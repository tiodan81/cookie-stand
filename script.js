function Shop(shopID, minCustHour, maxCustHour, avgCookiesCust) {
  this.shopID = shopID;
  this.minCustHour = minCustHour;
  this.maxCustHour = maxCustHour;
  this.avgCookiesCust = avgCookiesCust;
  this.custPerHour = function () {
    return (Math.floor(Math.random() * (this.maxCustHour - this.minCustHour)) + this.minCustHour);
  };
  this.hourlyTotals = []
}

var pikePlace = new Shop('pikePlace', 17, 88, 5.2);
var seaTac = new Shop('seaTac', 6, 44, 1.2);
var southcenter = new Shop('southcenter', 11, 38, 1.9);
var bellevue = new Shop('bellevue', 20, 48, 3.3);
var alki = new Shop('alki', 3, 24, 2.6);

var allShops = [pikePlace, seaTac, southcenter, bellevue, alki];
var times = ['10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', 'total'];

function cookiesPerHour(location) {
  return Math.floor(location.custPerHour() * location.avgCookiesCust);
}

function hourlyModel(location) {
  var hourlyArray = location.hourlyTotals;
  var total = 0;

  for (var i = 0; i < times.length; i++) {
    var cookies = cookiesPerHour(location);
    hourlyArray.push(cookies);
    total += cookies;
  }

  hourlyArray.push(total);
  location.hourlyTotals = hourlyArray;
}

function hourlyReport (location) {
  for (var j = 0; j < times.length; j++) {
    var liNode = document.createElement('li');
    liNode.textContent = times[j] + ': ' + location.hourlyTotals[j] + ' cookies.';
    console.log(liNode);
    document.getElementById(location.shopID).appendChild(liNode);
  }
}

function reportAllShops () {
 for (var k = 0; k < allShops.length; k++) {
    hourlyModel(allShops[k]);
    hourlyReport(allShops[k]);
  }
}

reportAllShops();
