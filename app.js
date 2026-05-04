const apiKey = "ee62e02b5322146a93d7a1174876816f";
const searchbox = document.querySelector('#input-city');
const mainicon = document.querySelector("#city-weather-icon");
const bgimage = document.body;

let city ="jamshedpur";
let locationName = document.querySelector('#location');
let weather = document.querySelector('#weather');
let temp = document.querySelector('#temp');
let feel = document.querySelector('#feel');
let low = document.querySelector('#low');
let high = document.querySelector('#high');
let wind = document.querySelector('#wind');
let humidity = document.querySelector('#humidity');
let pressure = document.querySelector('#pressure');
let visibility = document.querySelector('#visibility');
let hourlycast = document.querySelector('#hourly-forecast');


getweather();
forecast();

function fetchlocation(){
   city = searchbox.value;
   getweather();
   forecast();
}

searchbox.addEventListener('keydown',(event)=>{
  if(event.key=="Enter"){
  city = searchbox.value;
   getweather();
   forecast();
  }
});

async function getweather(){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`City not found (Status: ${response.status})`);
    }

     const data = await response.json();
     
    
    locationName.textContent=(data.name);
    weather.textContent=(data.weather[0].main);

    const tempmain=((data.main.temp)-273.15).toFixed(1);
    const tempfeel=((data.main.feels_like)-273.15).toFixed(1);
    const templow=((data.main.temp_min)-273.15).toFixed(1);
    const temphigh=((data.main.temp_max)-273.15).toFixed(1);

    temp.textContent=`${tempmain}°C`;
    feel.textContent=`Feel: ${tempfeel}°C`;
    low.textContent=`Low: ${templow}°C `;
    high.textContent=` High: ${temphigh}°C`;
    wind.textContent=`NW ${data.wind.speed}km`;
    pressure.textContent=`${data.main.pressure} hPa`;
    humidity.textContent=`${data.main.humidity}%`;
    visibility.textContent=`${(data.visibility)/1000} km`;


    const cityweather =(data.weather[0].main);
    console.log(cityweather);

            function geticon (){
            if(cityweather=="Rain"){

             bgimage.className="h-screen w-full bg-[url('bg-image2.jpg')] bg-cover overflow-hidden";
              return "cloud-showers-heavy";
            }
            else if(cityweather == "Clouds"){
              bgimage.className="h-screen w-full bg-[url('bg-image3.jpg')] bg-cover overflow-hidden";
              return "cloud";
            }
            else if(cityweather == "Clear"){
              bgimage.className="h-screen w-full bg-[url('bg-image.jpg')] bg-cover overflow-hidden";
              return "sun";
            }
            else {
              bgimage.className="h-screen w-full bg-[url('bg-image4.jpg')] bg-cover overflow-hidden";
              return "cloud";
            }
        }

         const icon =geticon();
            
           mainicon.innerHTML=`
                  <span><i class="fa-solid fa-${icon}"></i></span></span>
        `;


  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

async function forecast(){

    const url2=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

     const response = await fetch(url2);
     const data2 = await response.json();

     hourlycast.textContent='';
     data2.list.slice(0,40).forEach(element => {

           const tempmain=((element.main.temp)-273.15).toFixed(1);
            const time=(element.dt_txt.slice(11,16));
           const weather = (element.weather[0].main);
    
          
        function geticon (){
            if(weather=="Rain"){
              return "cloud-showers-heavy";
            }
            else if(weather == "Clouds"){
              return "cloud";
            }
            else if(weather == "Clear"){
              return "sun";
            }
            else {
              return "cloud";
            }
        }

         const icon =geticon();
            
         const newdiv=document.createElement('div');
         newdiv.className="border border-white h-full w-25 rounded-xl flex flex-col items-center pt-2 overflow-y-hidden";
         newdiv.innerHTML=`
              <span class="text-xl">${time}</span>
            <span class="text-2xl"><i class="fa-solid fa-${icon}"></i></span>
            <span class=" text-xl font-bold">${tempmain}°C</span>
            <span class="text-base text-center">${weather}</span>
         `;

         hourlycast.appendChild(newdiv);
        
     });
}

