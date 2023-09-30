const currentDat = new Date().toISOString().split("T")[0];
const inputDate= document.getElementById("search-input");
const searchButton =  document.getElementById("submit");
const imageUrl = document.querySelector(".image");
const titleMain = document.querySelector(".title")
const explain = document.querySelector(".explanation")
const dateHead = document.querySelector(".date-head")

const imageDiv = document.getElementById("current-image-container");
const searchHistory = document.getElementById("search-history");
const apiKey = "hwXsAMW5dpxzQmGNMGqwPAUW9I1e1LJSVf7sATEJ";

// array to store the dates
let dateArray = [];
localStorage.setItem("dateArray",dateArray);

// function to load the current date image

async function getCurrentImageOfTheDay(){
    const endpoint =`https://api.nasa.gov/planetary/apod?date=${currentDat}&api_key=${apiKey} `;
    try{
        const response = await fetch(endpoint);
        const result = await response.json();
        const image = result.hdurl;
        const explanation = result.explanation;
        const title = result.title;
        imageUrl.src = image;
        explain.innerText = explanation;
        titleMain.innerText = title;
    }
    catch(e){
        alert(e);
    }
}
getCurrentImageOfTheDay();

// function to load the selected date image 
async function getImageOfTheDay(date){
    const endpoint =`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey} `;
    try{
        const response = await fetch(endpoint);
        const result = await response.json();
        const image = result.hdurl;
        const explanation = result.explanation;
        const title = result.title;
        imageUrl.src = image;
        explain.innerText = explanation;
        titleMain.innerText = title;
        dateHead.innerText = `Picture on ${date}`;
    }
    catch(e){
        alert(e);
    }

}

// function to save the search input in the local storage
function saveSearch(date){
    let obj = {};
    obj.date = date;
    dateArray.push(obj);
    localStorage.setItem("dateArray",JSON.stringify(dateArray));
    addSearchToHistory();
}

// function add the search values in the previous history section
let index = 0;
function addSearchToHistory(){
    const arr = localStorage.getItem("dateArray");
    const newarr = JSON.parse(arr);
    if(newarr.length !== 0){
        const li = document.createElement("li");
        li.classList.add("date-list")
        if(newarr[index].date !== ""){
            li.innerText = newarr[index].date;
            searchHistory.append(li);
        }
        index++;

    }   
    historyDateSearch(newarr);
}

// function to get the images of precious searched dates
function historyDateSearch(arr){
    const list = document.querySelectorAll(".date-list");
    for(let i =0;i<list.length;i++){
       list[i].addEventListener("click",()=>{
        getImageOfTheDay(arr[i].date);
       })
    }
}


// adding event listener to the search button
searchButton.addEventListener("click",(event)=>{
    event.preventDefault();
    const date = inputDate.value;
    getImageOfTheDay(date);
    saveSearch(date);
   
})

