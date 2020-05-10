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
    // start loading animation
    // send to a php script which calls python script and returns JSON
//    makeAJAXrequest("POST", "url.com/blac", showResults, true);
    
    // temp
    showPage(3);


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
        pages[i].classList.remove("active-page");
    }
    pageContainer.classList.add("show-page-" + (pageNum));
    pages[pageNum - 1].classList.add("active-page");

}

function showResults(data) {
    
    // end loading animation
    if (data) {
        
        // fill results page with charts etc constructed from JSON
        showPage(4);
    } else {
        
        //display failure message
        
    }

}

