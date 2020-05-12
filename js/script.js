let showInputPageBtn = document.getElementById("show-input-page-btn");
let submitBtn = document.getElementById("submit-btn");
let anotherRequestBtn = document.getElementById("another-request-btn");
let pageContainer = document.querySelector("main");
let landingPage = document.getElementById("landing-page");
let inputPage = document.getElementById("input-page");
let loadingPage = document.getElementById("loading-page");
let resultPage = document.getElementById("result-page");
let pages = [landingPage, inputPage, loadingPage, resultPage];

showInputPageBtn.addEventListener('click', showPage.bind(this, 2));

submitBtn.addEventListener('click', function (e) {

    e.preventDefault();
    showPage(3);
    // send to a php script which calls python script and returns JSON
//    makeAJAXrequest("POST", "url.com/blac", showResults, true);
    
    // temp
    setTimeout(showResults, 2500);

});

function makeAJAXrequest(type, url, callbackFunc, async) {
    
    let httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest.onreadystatechange = function () {
        try {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    // pass the JSON data to showResults
                    callbackFunc(data);
                } else {
                    alert('There was a problem with the request.');
                }
            }
        } catch (e) {
            alert('Caught Exception: ' + e.description);
        }
    };
    httpRequest.open(type, url, async);
    httpRequest.send();
    
}

anotherRequestBtn.addEventListener('click', showPage.bind(this, 2));


function showPage(pageNum) {

    for (i = 0; i < pages.length; i++) {
        pageContainer.classList.remove("show-page-" + (i + 1))
//        pages[i].classList.remove("active-page");
    }
    pageContainer.classList.add("show-page-" + (pageNum));
//    pages[pageNum - 1].classList.add("active-page");

}

function showResults(data) {
    
    if (data) {
        
        // fill results page with charts etc constructed from JSON
        showPage(4);
    } else {
        
        //display failure message
        
        //temp
        //populate charts with dummy data
        showPage(4);
        
    }

}

let resizeId;
let resizeToggle = true;

window.addEventListener("resize", function () {
    
    if (resizeToggle) {
        pageContainer.classList.toggle("transition");
    }
    resizeToggle = false;
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 500);
    
});

function doneResizing(){
    pageContainer.classList.toggle("transition");
    resizeToggle = true;
}

Chart.defaults.global.defaultFontColor = 'white';
var ctx = document.getElementById('chart1').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

new Chart(document.getElementById("doughnut-chart"), {
    type: 'doughnut',
    data: {
      labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [2478,5267,734,784,433]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Predicted world population (millions) in 2050'
      }
    }
});