const map = L.map('map').setView([34.063634, -118.295405], 13);
//changed zoom

const url = "https://spreadsheets.google.com/feeds/list/1SuwSP45miCu_YN4_dKbZb1NAtOMC-P-Jv-iMCCrdZSE/od6/public/values?alt=json";

let scroller = scrollama();

let Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 16
});

Esri_WorldGrayCanvas.addTo(map)

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
};

const ktown = "./data/ktown.geojson"
fetch(ktown)
	.then(response => {
		return response.json();
		})
    .then(data =>{
                // console.log(data)
                L.geoJson(data,{style:exampleOptions}).addTo(map)
        }
)

let allLayers;

// this is the boundary layer located as a geojson in the /data/ folder 
const boundaryLayer = "./data/la_zipcodes.geojson"
console.log('boundaryLayer')
console.log(boundaryLayer)
let boundary; // place holder for the data 
let collected; // variable for turf.js collected points 
let allPoints = []; // array for all the data points
// you need this to be an empty array!

// 1. get the data sorted into the zipcodes o
// 1a. assign data properties from the Survey into the object that is being passed into the turfJS polygon o
// 2. get length of array for support within each Zipcode; Lauren: I think I have the length but how to put in zipcode?
var support = ["Yes", "No", "Unsure"]
support.length
// 3. divide the progress bar by total number of values in the array, Lauren: How to divide?
// 4. do javascript .sort() to sort by alphabetical

// support.sort("Yes", "No", "Unsure")

// 5. assign classes of the array based on "yes"/"no"/"unsure"
                      // var support = 0;
                      // function move() {
                      //   if (support == "Yes") {
                      //     support = 1;
                      //     var elem = document.getElementById("myBar");
                      //     document.set.attribute ("class","Yes")
                      //     var width = 10;
                      //     var id = setInterval(frame, 10);
                      //     function frame() {
                      //       if (width >= 100) {
                      //         clearInterval(id);
                      //         support = "Yes";
                      //       } else {
                      //         width++;
                      //         elem.style.width = width + "%";
                      //         elem.innerHTML = width  + "%";
                      //       }
                      //     }
                      //   }
                      // } 

// 6. create a loop for each of the segments - Lauren: I think I have above?
// 6a. create if-statement to separate based on yes/no/unsure - Lauren: How to do all three?
// 6b. let thisSegement = document.getElementById("") -Lauren: I think I have above?
// 6c. thisSegement.set.attribute("class","yes") o
// 7 create a "progress" bar/pill/chart thingy o
// 8. using css assign segements based on .yes .no .unsure o Lauren: Not sure if this was done correctly!

// simpler
// 1. get data by zip
// 2. get data into the progress bars by zip
// 3. color data by yes/no/unsure by zip



//function for clicking on polygons
function onEachFeature(feature, layer) {
    // console.log(feature.properties)
    if (feature.properties.values.residentCount) {
        //count the values within the polygon by using .length on the values array created from turf.js collect
        let count = feature.properties.values.length

        console.log(feature.properties.values.residentCount)
        // console.log(count) // see what the count is on click
        let text = count.toString() // convert it to a string
        layer.bindPopup(text); //bind the pop up to the number
    }
}

// for coloring the polygon
function getStyles(data){
    console.log(data)
    let myStyle = {
        "color": "#ff7800",
        "weight": 1,
        "opacity": .0,
        "stroke": .5
    };
    if (data.properties.values.length > 0){
        myStyle.opacity = 0
        
    }

    return myStyle
}

// new function to count for kTown residents is `yes` or `no` // 6/6 Albert: this function was already generic (runs for any data so you did not need to modify it!! :(
function countChecker(dataField,counts,yesCount,noCount){
  // Albert: OH NO!!! you didn't need to change dataField.support!!! the data field is already set to support!
  if (dataField == "Yes" && counts){
    // we have to return an array because JavaScript can only handle returning 1 object
    return [yesCount +=1,noCount]  // return this count value!
  }
  else if (dataField == "No" && counts){
    return [yesCount, noCount +=1] // return this count value!
  }
  
}


function getBoundary(layer){
    fetch(layer)
    .then(response => {
        return response.json();
        })
    .then(data =>{
                //set the boundary to data
                boundary = data
                // console.log(boundary)
                // run the turf collect geoprocessing
                collected = turf.collect(boundary, thePoints, 'surveyData', 'values'); //we can see the surveyData object for each Polygon now!
                // just for fun, you can make buffers instead of the collect too:
                // collected = turf.buffer(thePoints, 50,{units:'miles'});
                // console.log('collected.features')
                // console.log(collected.features)

                // here is the geoJson of the `collected` result:
                L.geoJson(collected,{onEachFeature: onEachFeature,style:function(feature)
                {
                    // Albert: if there is more than 1 data in the Zipcode do something!
                    if (feature.properties.values.length > 0) {
                      // for this Zipcode, set everything to 0 first using this residentCounts object
                      // console.log(feature)
                      let supportCounts = {
                        "YesCount":0,
                        "NoCount":0
                      }
                      // forEach of the zipcodes we will use the zipCode counter to SET the values 
                      // there is a `runningCount` _variable_ used to store the results of the 
                      // countChecker _function_
                      // the countChecker _function_ takes in ANY datafield, the residentCount object,
                      // the kTownresidentCount property value, and the nonResidentCount property value
                      // and returns it as an array where:
                      // runningCount[0] is all the "Yes" counts in the Zipcode
                      // runnningCount[1] is all the "No" counts in the Zipcode
                      // console.log(feature)  
                      // THIS IS SO IMPORTANT!!!
                      // LOOP FOR EACH ZIPCODE/BOUNDARY
                      feature.properties.values.forEach(
                        polygonData=>
                          { 
                            // console.log(polygonData)
                          let runningCount = countChecker(polygonData.support,supportCounts,supportCounts.YesCount,supportCounts.NoCount);
                          supportCounts.YesCount = runningCount[0];
                          supportCounts.NoCount=runningCount[1];
                          
                          
                          })
                      
                      // We finally set the polygon value `kTownResidentTotal` to residentCounts.kTownresidentCount
                      feature.properties.values.YesTotal = supportCounts.YesCount
                      
                      // We do the same for `nonResident total`
                      feature.properties.values.NoTotal = supportCounts.NoCount

                      // we can check our values here:
                      // console.log(feature.properties.values)

                      createZipcodeContent(feature.properties)
                      //
                      // To-Do: You need to create charts based on those values! :) 
                      //
                      return {color: "#ff0000",stroke: false};
                    }
                    else{
                        // make the polygon gray and blend in with basemap if it doesn't have any values
                        return{opacity:0,color:"#efefef" } //Albert: my bad! I did `color =` instead of `color:`
                    }
                    
                }
                // add the geojson to the map
                    })
                    // .addTo(map) //Albert: removed zipcode on map
        }
    )   
}
function sayHi(zipcode){
  console.log('zipcode')
  // console.log(zipcode)
}

const typesResident = {
  "resident":"KTown Resident",
  "nonresident":"Non-KTown Resident",
}
// console.log(boundary)
function createNonZipcodeContent(general,type){
  console.log(general)
  // let 
  // let 
  let cleanType = typesResident[type]
  console.log(cleanType)
  const newButton = document.createElement("div");
  let theId = "nonGeo"+type;
  newButton.id = "card_"+theId
  let newHTML = `<h3 class="cardTitle">${cleanType}</h3>`
  
  newButton.innerHTML = newHTML;
  newButton.setAttribute("class","codes")
  // newButton.setAttribute("class","progressbar") // add the class called "step" to the button or div
  // newButton.setAttribute("data-step",newButton.id) // add a data-step for the button id to know which step we are on
  // newButton.addEventListener('click', function(){
  //     map.flyTo([lat,lng]);
  // })
  let thisTypesYesNo = 
  {
    'YesTotal':nonGeoYesData = general.reduce((yesData,general)=>(general.support=='Yes')?yesData+1:0),
    'NoTotal':nonGeoNoData = general.reduce((noData,general)=>(general.support=='No')?noData+1:0)
  }
  
  console.log(theId)
  console.log(theId)
  const spaceForOtherBoundaries = document.getElementById('contents')
  spaceForOtherBoundaries.appendChild(newButton);
  createBar(thisTypesYesNo,theId)
}
function getStoriesFromZipcode(event,zipcode,stories){
  // if(event.target.className[0].value == "cardTitle"){
  // }
  // e.target.parentNode.id
  let thisZip = event.currentTarget.attributes.id.value.replace("card_","").replace("barChart_","")
  console.log(thisZip)
  // console.log(event.target.attributes)
  // "pedestrian":data.pedestrian_safety,
  // "community":data.communityissues,
  // "picture":data.pictureresponse,
  // "gentrification":data.gentrification
  let barChartCheck = "barChart_"+thisZip
  let storyCheck = "storyFor_"+thisZip
  let theProgressBars = document.getElementById(barChartCheck)
  let theStoryBox = document.getElementById(storyCheck);
  // console.log(theProgressBars.style.display)
  if (theProgressBars.className.includes('hiddenClass')){
    console.log('hi')
    theProgressBars.classList.remove("hiddenClass");
    theStoryBox.classList.remove("visibleClass");
  }
  else{
    console.log('no')
    theProgressBars.classList.add("hiddenClass");
    theStoryBox.classList.add("visibleClass");
  }
//   let state = document.getElementById(barChartCheck).style.display
//   if (state == 'block') {
//     document.getElementById(barChartCheck).style.display = 'none';
// } else {
//     document.getElementById(barChartCheck).style.display = 'block';
// }
  // let theStories = document.getElementById(storyCheck);
  // if(!theProgressBars){
  //   theProgressBars.className = "hidden"
  //   theStories.style.display = "none"
  // }
  // else{
  //   theProgressBars.style.display = "none"
  //   theStories.style.display = "grid"
  // }
  
  console.log(barChartCheck)
}
function createZipcodeContent(zipcode){
  console.log('zipcode')
  // console.log(zipcode)
  const newButton = document.createElement("div");
  newButton.id = "card_"+zipcode.name;
  let newHTML = `<h3 class="cardTitle">${zipcode.name}</h3>`
  newButton.addEventListener('click',getStoriesFromZipcode)
  newButton.innerHTML = newHTML;
  newButton.setAttribute("class","codes")
  newButton.setAttribute("surveyData",zipcode.values)

  const zipCodeStories = document.createElement("div");
  zipCodeStories.setAttribute("class","zipstories")
  zipCodeStories.setAttribute("id",`storyFor_${zipcode.name}`)
  zipCodeStories.addEventListener('click',getStoriesFromZipcode)
  let theStories=[];
  zipcode.values.forEach(data=>theStories.push(data.community))
  console.log(theStories)


  zipCodeStories.innerHTML = "<h3>What community issues are most important to you in Koreatown? Are there any amenities we can incorporate in the project to address them?</h3><ul>"+  theStories.map(function (story) {
    return '<li>' + story + '</li>';
  }).join('')+"</ul>"
  // console.log(zipcode.values)
  // console.log(zipcode.values)
  
  // newButton.setAttribute("class","progressbar") // add the class called "step" to the button or div
  // newButton.setAttribute("data-step",newButton.id) // add a data-step for the button id to know which step we are on
  // newButton.addEventListener('click', function(){
    //     map.flyTo([lat,lng]);
    // })
    const spaceForZipcodes = document.getElementById('contents')
    newButton.appendChild(zipCodeStories);
  spaceForZipcodes.appendChild(newButton);
  createBar(zipcode.values,zipcode.name)
}


// Anything is related to creating the YES/NO progress bars

function createBar(support,zipcode){
  // console.log(support)
  let yes = support.YesTotal
  let no = support.NoTotal
  let totalresponses = yes + no

  // add the unique ID for each zipcode
  // this makes sure we don't override other zipcodes charts
  let targetProgressDiv = document.getElementById("card_"+zipcode)

  // create the new div for the progress bar to exist in!
  // we will add this at the end of this entire function.
  let progressBar = document.createElement("div");

  // add the class "progressBar" to the progressBar to make it easier to style in style.css
  progressBar.classList.add("progressBar");
  progressBar.id = "barChart_"+zipcode
  progressBar.style.display = "grid"
  // add the title to each zipcode card:
  targetProgressDiv.innerHTML +=`<h4 class="header">Total Responses: ${totalresponses}</h4>`


  // if anyone responded yes:
  if (yes > 0){
    let progressBarPart = document.createElement("div"); // create a new div for this part of the progress bar
    let yesResponseFraction = yes/totalresponses // get the % 
    progressBarPart.className = "yesBar"; // use our pre-defined class called .yesBar
    let thisProgressLegend = document.createElement("div"); // this is for the text legend
    thisProgressLegend.innerHTML = "Yes "+ (yesResponseFraction)*100 + "%" // this creates our text legend
    progressBar.style.gridTemplateColumns += `${yesResponseFraction}fr ` // have css-grid automatically scale our progressBar chart!
    progressBar.appendChild(progressBarPart); // add this progress bar part to our progressBar div!
    progressBarPart.appendChild(thisProgressLegend) // add the legend too!
  }

  if (no > 0){
    let progressBarPart = document.createElement("div");
    let thisProgressLegend = document.createElement("div");
    let noResponseFraction = no/totalresponses
    progressBarPart.className = "noBar";
    progressBar.style.gridTemplateColumns += ` ${noResponseFraction}fr`

    // We need this if-statement because the .noBar class targets gridColumn 2 by default, 
    // gridColum 2 does not exist if there is no "yes" responses :( see the style.css for .noBar
    if (!yes){
      progressBarPart.style.gridColumn = 1;
    }
    thisProgressLegend.innerHTML = "No "+ (noResponseFraction)*100 + "%"
    progressBar.appendChild(progressBarPart);
    progressBarPart.appendChild(thisProgressLegend) 
  }
  // The END!!!!
  // Finally add the progressBar for this zipcode to the contents!
  if (!zipcode){

  }
  targetProgressDiv.appendChild(progressBar)
}

let nonGeographicKtownResident = []
let nonGeographicKtownNonResident = []

function addMarker(data){
    // Albert: I removed these variables and put them into the surveyData object!
    // let kTownResidentData = data.ktownresident
    // let affiliation = data.affiliation
    // let age = data.age
    // let support = data.support
    console.log('data')
    // console.log(data)
    let surveyData = {
      "kTownResident":data.ktownresident,
      "affiliation":data.affiliation, 
      "age":data.age,
      "support":data.support,
      "pedestrian":data.pedestrian_safety,
      "community":data.communityissues,
      "picture":data.pictureresponse,
      "gentrification":data.gentrification
    } 
    console.log(data)
    console.log(data.lat_2)
    // create the turfJS point
    let thisPoint = turf.point([Number(data.lng),Number(data.lat_2)],{surveyData}) // Albert: i added the surveyData object here
    // you want to use the KTownResident variable!, Lauren: Added this 6/5! //Albert: you needed to pass in the surveyData object still!!! because it has all the data!

    // put all the turfJS points into `allPoints`
    allPoints.push(thisPoint)
    if(data.ktownresident == "Yes"){
        exampleOptions.fillColor = "lightblue"
        KTownResident.addLayer(L.circleMarker([data.lat_2,data.lng],exampleOptions).bindPopup(`<h2>Koreatown resident</h2>`+ '' + `<p>Most frequented location: ${data.address}`))
        // createButtons(data.lat_2,data.lng,data.address)
          if(data.lat_2 == 0){
          nonGeographicKtownResident.push(surveyData)
          }
        }
    else{
        exampleOptions.fillColor = "hotpink"
        NotKTownResident.addLayer(L.circleMarker([data.lat_2,data.lng],exampleOptions).bindPopup(`<h2>Not a Koreatown resident</h2>`+ '' + `<p>Most frequented location: ${data.address}`))
        // createButtons(data.lat_2,data.lng,data.address)
        if(data.lat_2 == 0){
          nonGeographicKtownNonResident.push(surveyData)
          }
    }
    return data.address, data.communityissues
}


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
        console.log('boundary')
        console.log(boundary)
        formattedData.forEach(addMarker)
        // createNonZipcodeContent(nonGeographicKtownResident,'resident')
        // createNonZipcodeContent(nonGeographicKtownNonResident,'nonresident')
        KTownResident.addTo(map)
        NotKTownResident.addTo(map)
        let allLayers = L.featureGroup([KTownResident,NotKTownResident]);

        // step 1: turn allPoints into a turf.js featureCollection
        thePoints = turf.featureCollection(allPoints)
        console.log('thePoints')
        console.log(thePoints)

        // step 2: run the spatial analysis
        getBoundary(boundaryLayer)
        console.log('boundary')
        console.log(boundary)

        // dont need to fit all layers, just start at ktown first
        // map.fitBounds(allLayers.getBounds());        
}


// dont need this line!
// collected.features.properties.values

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

//L.control.layers(null,layers, {collapsed:false}).addTo(map)

// setup resize event for scrollama incase someone wants to resize the page...
window.addEventListener("resize", scroller.resize);


var legend = L.control({ position: "bottomleft" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Legend</h4>";
  div.innerHTML += '<i style="background: orange"></i><span id="ktownResident">Wilshire Corridor Koreatown Neighborhood Boundary</span><br>';
  // div.innerHTML += '<i style="background: pink"></i><span id="notktownResident">Not Koreatown Resident</span><br>';
// old legend:
  div.innerHTML += '<i style="background: lightblue"></i><span id="ktownResident">Koreatown Resident</span><br>';
  div.innerHTML += '<i style="background: pink"></i><span id="notktownResident">Not Koreatown Resident</span><br>';

  // div.innerHTML += '<i style="background: #E6E696"></i><span>Land</span><br>';
 //div.innerHTML += '<i style="background: #E8E6E0"></i><span>Residential</span><br>';
 // div.innerHTML += '<i style="background: #FFFFFF"></i><span>Ice</span><br>';
  //div.innerHTML += '<i class="icon" style="background-image: url(https://d30y9cdsu7xlg0.cloudfront.net/png/194515-200.png);background-repeat: no-repeat;"></i><span>Grænse</span><br>';
  
  return div;
};

legend.addTo(map);

// toggle the legend for ktownResident grouplayer
var ktownResidentLegend = document.getElementById("ktownResident");

ktownResidentLegend.onclick = function() {
  if(map.hasLayer(KTownResident)){
    map.removeLayer(KTownResident)
  }
  else{
    map.addLayer(KTownResident)
  }
  ktownResidentLegend.classList.toggle("disabled");
}
// toggle the legend for nonktownResident grouplayer
var notktownResidentLegend = document.getElementById("notktownResident");

notktownResidentLegend.onclick = function() {
  if(map.hasLayer(NotKTownResident)){
    map.removeLayer(NotKTownResident)
  }
  else{
    map.addLayer(NotKTownResident)
  }
  notktownResidentLegend.classList.toggle("disabled");
}




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
document.getElementById("myBtn").click() // simulate click to start modal
