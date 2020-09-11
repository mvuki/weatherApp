//api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
const apikey="8ffefda0c265540656e765a32f3ab1ff";
const apiEndpoint ="https://api.openweathermap.org/data/2.5/weather";

const showSearchForm = ()=>{

    var searchdiv = document.querySelector("#searchform");
    var btnsearch =document.querySelector("#mycustomsearchbtn");
    searchdiv.classList.remove("hideelement");
    searchdiv.classList.add("showelement");    
    btnsearch.classList.add("hideelement");
}

const searchweatherdata =()=>{

    let searchdiv = document.querySelector("#searchinput").value;   
   
    apiUri = apiEndpoint+"?q="+searchdiv+"&appid="+apikey+"&units=metric";
    	
fetch(apiUri).then(res=>res.json())
  .then((response)=>{
     

     
      console.log(response);
      addWeatherInfoToDisplay(response.name,response.main.temp,response.weather[0].main,response.weather[0].description);
     
      }).catch((error) => { console.log('Error:', error);

      div_search_results = document.querySelector("#searchresult");
      diverror = document.createElement("div");
      diverror.className="error";
      diverror.innerHTML="An Error occured : "+error;
      div_search_results.appendChild(diverror);

         });
         
}

const addWeatherInfoToDisplay=(city,temperature,mainweather,weatherdescription)=>{

    div_search_results = document.querySelector("#searchresult");
    div_search_results.innerHTML = "";
    divcity = document.createElement("div");
    divcity.className="divsearchresult";
    divcity.innerHTML=city;

    divtemperature = document.createElement("div");
    divtemperature.className="divsearchresult";
    divtemperature.innerHTML=temperature+"&#176; ";

    divmainweather = document.createElement("div");
    divmainweather.className="divsearchresult";
    divmainweather.innerHTML=mainweather;

    divweatherdescription = document.createElement("div");
    divweatherdescription.className="divsearchresult";
    divweatherdescription.innerHTML=weatherdescription;

    div_search_results.appendChild(divcity);
    div_search_results.appendChild(divtemperature);
    div_search_results.appendChild(divmainweather);
    div_search_results.appendChild(divweatherdescription);

}

// check if the service worker is supported
if('serviceWorker' in navigator){
    console.log('Service Worker is supported!');
    window.addEventListener('load',()=>{
        navigator.serviceWorker
        .register('sw_cashed_pages.js')
        .then(reg=>console.log("Service Worker is registered"))
        .catch(err=>console.log('Service Worker error: ${err}'))
    })
}