let showInputPageBtn = document.getElementById("show-input-page-btn");
let submitBtn = document.getElementById("submit-btn");
let anotherRequestBtn = document.getElementById("another-request-btn");
let pageContainer = document.querySelector("main");
let landingPage = document.getElementById("landing-page");
let inputPage = document.getElementById("input-page");
let loadingPage = document.getElementById("loading-page");
let resultPage = document.getElementById("result-page");
let pages = [landingPage, inputPage, loadingPage, resultPage];
let targetInput = document.getElementById("target");

showInputPageBtn.addEventListener('click', showPage.bind(this, 2));

anotherRequestBtn.addEventListener('click', showPage.bind(this, 2));

submitBtn.addEventListener('click', function (e) {

    e.preventDefault();
    let target = targetInput.value;
    // sanitise target string (remove @ from start and all spaces)
    // check if target is valid twitter handle
    // if yes then proceed
    showPage(3);
    runAnalysis(target);
    
//    setTimeout(displayResults, 3500); //temp

});

function runAnalysis(handle) {
    
    // send to a php script using GET which calls python script and returns JSON
    fetch("/analyse.php?handle=" + handle)
        .then(response => response.json())
        .then(data => displayResults(data))
        .catch(error => {
            console.warn(error);
            displayFetchError();
        });
    
}

function displayResults(data) {
    
    // create charts using data and set handle and picture
    showPage(4);

}

function displayFetchError() {
    
    // replace loading animation with failure message, and button to go back to input screen. or maybe this can be a 5th page?
    showPage(2); //temp
    
}

function showPage(pageNum) {

    for (i = 0; i < pages.length; i++) {
        pageContainer.classList.remove("show-page-" + (i + 1))
    }
    pageContainer.classList.add("show-page-" + (pageNum));

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