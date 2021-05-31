const map = L.map('map').setView([34.063634, -118.295405], 16);

const url = "https://spreadsheets.google.com/feeds/list/1SuwSP45miCu_YN4_dKbZb1NAtOMC-P-Jv-iMCCrdZSE/od6/public/values?alt=json"

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
    return data.address
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button");
    newButton.id = "button"+title;
    newButton.innerHTML = title;
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",lng);
    newButton.style.background = 'moccasin';
    newButton.style.color = 'black';
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

let layers = {
	"Koreatown resident": KTownResident,
	"Not a Koreatown resident": NotKTownResident
}

L.control.layers(null,layers, {collapsed:false}).addTo(map)


var legend = L.control({ position: "bottomleft" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Legend</h4>";
  div.innerHTML += '<i style="background: lightblue"></i><span>Korea Town Resident</span><br>';
  div.innerHTML += '<i style="background: pink"></i><span>Not Korea Town Resident</span><br>';
 // div.innerHTML += '<i style="background: #E6E696"></i><span>Land</span><br>';
 //div.innerHTML += '<i style="background: #E8E6E0"></i><span>Residential</span><br>';
 // div.innerHTML += '<i style="background: #FFFFFF"></i><span>Ice</span><br>';
  //div.innerHTML += '<i class="icon" style="background-image: url(https://d30y9cdsu7xlg0.cloudfront.net/png/194515-200.png);background-repeat: no-repeat;"></i><span>Grænse</span><br>';
  
  return div;
};

legend.addTo(map);

