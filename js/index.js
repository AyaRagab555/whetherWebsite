

var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let whether;

async function getWhether(term) {
  let a = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=f802d29b21994a93aa5212927221210&q=${term}&days=3`
  );
  whether = await a.json();
  console.log(whether);
    displayData();
}
getWhether("cairo");

document.querySelector(".input-contain input").addEventListener("keyup",function(e){
  getWhether(e.target.value)
})

function displayData(){
  let {location,current,forecast} = whether;
  document.querySelector(".country").innerHTML = `${location.name}`;
  document.querySelector(".item1 .head .day").innerHTML = `${days[new Date(forecast.forecastday[0].date).getDay()]}`
  document.querySelector(".item1 .head .day-num").innerHTML = `${new Date(forecast.forecastday[0].date).getDate()+months[new Date(forecast.forecastday[0].date).getMonth()]}`
  document.querySelector(".Degree span").innerHTML = `${current.temp_c}<sup>o</sup>C`
  document.querySelector(".Degree img").setAttribute("src",`${current.condition.icon}`) ;
  document.querySelector(".Degree p").innerHTML= `${current.condition.text}` ;
  for (let i = 1; i < forecast.forecastday.length; i++) {
    document.querySelector(`.item${1+i} .head p`).innerHTML= `${days[new Date(forecast.forecastday[i].date).getDay()]}` ;
    document.querySelector(`.item${1+i} img`).setAttribute("src" , `${forecast.forecastday[i].day.condition.icon}`);
    document.querySelector(`.item${1+i} .tempMax`).innerHTML= `${forecast.forecastday[i].day.maxtemp_c}<sup>o</sup>C` ;
    document.querySelector(`.item${1+i} .tempMin`).innerHTML= `${forecast.forecastday[i].day.mintemp_c}<sup>o</sup>` ;
    document.querySelector(`.item${1+i} .item-cont p`).innerHTML= `${forecast.forecastday[i].day.condition.text}` ;
    
  }
}
