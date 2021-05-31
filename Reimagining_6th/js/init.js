const map = L.map('map').setView([34.063634, -118.295405], 16);

const url = "https://spreadsheets.google.com/feeds/list/1SuwSP45miCu_YN4_dKbZb1NAtOMC-P-Jv-iMCCrdZSE/od6/public/values?alt=json";

let scroller = scrollama();

let Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 16
});

Esri_WorldGrayCanvas.addTo(map)

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
                // console.log(data)
                formatData(data)
        }
)

let KTownResident = L.featureGroup();
let NotKTownResident = L.featureGroup();

let exampleOptions = {
    radius: 10,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.4
}

function addMarker(data){
    if(data.ktownresident == "Yes"){
        exampleOptions.fillColor = "lightblue"
        KTownResident.addLayer(L.circleMarker([data.lat,data.lng],exampleOptions).bindPopup(`<h2>Koreatown resident</h2>`+ '' + `<p>Most frequented location: ${data.address}`))
        createButtons(data.lat,data.lng,data.address)
        }
    else{
        exampleOptions.fillColor = "hotpink"
        NotKTownResident.addLayer(L.circleMarker([data.lat,data.lng],exampleOptions).bindPopup(`<h2>Not a Koreatown resident</h2>`+ '' + `<p>Most frequented location: ${data.address}`))
        createButtons(data.lat,data.lng,data.address)
    }
    return data.address, data.communityissues
}

//function createButtons(lat,lng,title){

   // const newButton = document.createElement("button");
  //  newButton.id = "button"+title;
   // newButton.innerHTML = title;
    //newButton.setAttribute("lat",lat); 
   // newButton.setAttribute("lng",lng);
   // newButton.style.background = 'moccasin';
    //newButton.style.color = 'black';
    //newButton.addEventListener('click', function(){
      //  map.flyTo([lat,lng]);
   // })
   // const spaceForButtons = document.getElementById('contents')
   /// spaceForButtons.appendChild(newButton);
//}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button");
    newButton.id = "button"+title;
    newButton.innerHTML = title;
    newButton.setAttribute("class","step") // add the class called "step" to the button or div
    newButton.setAttribute("data-step",newButton.id) // add a data-step for the button id to know which step we are on
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",lng);
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]);
    })
    const spaceForButtons = document.getElementById('contents')
    spaceForButtons.appendChild(newButton);
}

function formatData(theData){
        const formattedData = []
        const rows = theData.feed.entry
        for(const row of rows) {
          const formattedRow = {}
          for(const key in row) {
            if(key.startsWith("gsx$")) {
                  formattedRow[key.replace("gsx$", "")] = row[key].$t
            }
          }
          formattedData.push(formattedRow)
        }
        console.log(formattedData)
        formattedData.forEach(addMarker)
        KTownResident.addTo(map)
        NotKTownResident.addTo(map)
        let allLayers = L.featureGroup([KTownResident,NotKTownResident]);
        map.fitBounds(allLayers.getBounds());        
}

scroller
        .setup({
            step: ".step", // this is the name of the class that we are using to step into, it is called "step", not very original
        })
        // do something when you enter a "step":
        .onStepEnter((response) => {
            // you can access these objects: { element, index, direction }
            // use the function to use element attributes of the button 
            // it contains the lat/lng: 
            scrollStepper(response.element.attributes)
        })
        .onStepExit((response) => {
            // { element, index, direction }
            // left this in case you want something to happen when someone
            // steps out of a div to know what story they are on.
        });
        
function scrollStepper(thisStep){
    // optional: console log the step data attributes:
    // console.log("you are in thisStep: "+thisStep)
    let thisLat = thisStep.lat.value
    let thisLng = thisStep.lng.value
    // tell the map to fly to this step's lat/lng pair:
    map.flyTo([thisLat,thisLng])
}


let layers = {
	"Koreatown resident": KTownResident,
	"Not a Koreatown resident": NotKTownResident
}

L.control.layers(null,layers, {collapsed:false}).addTo(map)

// setup resize event for scrollama incase someone wants to resize the page...
window.addEventListener("resize", scroller.resize);


var legend = L.control({ position: "bottomleft" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Legend</h4>";
  div.innerHTML += '<i style="background: lightblue"></i><span>Koreatown Resident</span><br>';
  div.innerHTML += '<i style="background: pink"></i><span>Not Koreatown Resident</span><br>';
 // div.innerHTML += '<i style="background: #E6E696"></i><span>Land</span><br>';
 //div.innerHTML += '<i style="background: #E8E6E0"></i><span>Residential</span><br>';
 // div.innerHTML += '<i style="background: #FFFFFF"></i><span>Ice</span><br>';
  //div.innerHTML += '<i class="icon" style="background-image: url(https://d30y9cdsu7xlg0.cloudfront.net/png/194515-200.png);background-repeat: no-repeat;"></i><span>Grænse</span><br>';
  
  return div;
};

legend.addTo(map);

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

