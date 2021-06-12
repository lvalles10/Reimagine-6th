## Reimagining 6th Street: 

Website: https://lvalles10.github.io/Reimagine-6th/

Final Presentation: https://drive.google.com/file/d/1h8hKvdezzTVBnOIL6_ys0d00QYTAa3QV/view?usp=sharing.

## Table of Contents:
* Objective
* Technologies Used
* Future Utilizations
* Website Features and Screenshots
* File Structure

## Objective

**Who is being empowered?**

Our project aims to empower the narratives, thoughts and preferences of Koreatown community members and stakeholders. We aim to show how folks feel about the "Reimagine 6th" proposal and what they’d like to see incorporated.

This project is meant to hand the community and its space back to members of Koreatown, empowering them to veto or encourage the "Reimagine 6th" proposal and to guide the vision of its potential execution.

**What social problem is being addressed?**

We will be working in conjunction with Streets FOR ALL on their ongoing project regarding closing Alexandria and 6th to create room for a greenspace. Last week, our group met with Adriane Hoff, a KTown Neighborhood Councilmember, to discuss the social problem being addressed by the project. She informed us that the project arises from a need for greater green space in KTown, as it is one of the most park-poor neighborhoods in Los Angeles. We also hope to address inequities in survey design for the project and uplift community narratives in our final project. Here is the current website regarding the project and its intentions: https://wcknc.la/6thst/.

**What problems might arise in developing this application?**

Developing this crowd-sourced mapping application could present such issues as the inherent biases within our data and difficulty in reconciling data from different sources. Another problem that could arise during our project process could be the language barrier between our group and the Korean constituents who we hope to collect data and narratives from regarding the project. Hopefully we can seek out the assistance of our Korean-speaking friends to develop a survey that adequately collects the stories of Korean constituents and their feelings about the project!

## Technologies Used:

For our project, we utilized Microsoft Forms, Google Sheets, and Leaflet. The Microsoft Form was used to collect community survey responses and data regarding folks' opinions on the "Reimagining 6th" proposal. Leaflet was used to exhibit the responses to our survey and empower community narratives. We specifcally showcased the data for the responses to Question 7 of our survey, which asked responders which community problems they felt were most prevalent in Koreatown and how certain amenities could be incorporated into the "Reimagining 6th" proposal to address those issues.

## Future Utilizations

We hope for this technology and mapplication to be used in the future to collect authentic community narratives regarding the "Reimagining 6th" proposal. We intend for the survey responses to be taken into consideration by the Koreatown Neighborhood Council in their construction of a reimagined 6th street. We also hope that the map will continue to identify locations that are meaningful to Koreatown community members and encourage those in charge of the project to preserve and empower these sites. 

We also recently learned that the mapplication and survey will be distributed this July at a pop-up of "Reimagine 6th" by Adriane Hoff and volunteers from the class to collect community stories and sentiments regarding the proposal. We're so excited for these community stories to populate the site! 

## Website Features and Screenshots

**Modal**: The modal explains the purpose and goals of the website in English, Spanish, and Korean for visitors.

<img width="1440" alt="Screen Shot 2021-06-11 at 11 31 43 AM" src="https://user-images.githubusercontent.com/81767103/121751708-6274b980-caaa-11eb-9815-6a06db20e08d.png">

**Header Content (Survey, Github, Contact Us, and Translation Options)**: In addition to the website title, the header offers the links to the survey in English, Spanish, and Korean. We've also made the link to our repository available, as well as a "Contact Us" buttom for people to contact us regarding the project and the use of their data if they're a survey respondent. Finally, we've included a Google Translate bar to translate the page into the language of the website viewer's choosing.

<img width="1019" alt="Screen Shot 2021-06-11 at 11 31 51 AM" src="https://user-images.githubusercontent.com/81767103/121751719-66a0d700-caaa-11eb-9ea8-16cdacc28307.png">

**Map and Legend**: The orange highlighted area of the map is the Wilshire Center Koreatown Neighborhood Council boundary. The markers each represent a respondent of the survey and, when clicked, pops up that respondent's most frequented area of Koreatown. Blue markers indicate that the respondent is a Koreatown resident where pink markers indicate that the respondent is a non-Koreatown resident. The legend indicates all of this information.

<img width="457" alt="Screen Shot 2021-06-11 at 11 32 04 AM" src="https://user-images.githubusercontent.com/81767103/121751726-6a345e00-caaa-11eb-8e03-35fe452924df.png">

**Zipcode Approval Ratings Progress Bars**: On the right side, the approval ratings of the project are separated by zipcode since there are various zipcodes in the WCKNC boundary. This data is gathered from a question asking respondents' support of the "Reimagine 6th" proposal featured on the survey. 

<img width="705" alt="Screen Shot 2021-06-11 at 11 32 11 AM" src="https://user-images.githubusercontent.com/81767103/121751735-6ef91200-caaa-11eb-86b9-fee6de7f7980.png">


**Community Stories**: Upon clicking on the zipcode boxes, the community stories for what respondents feel are some of the most prevalent issues in Koreatown and suggested incorporations for the proposal pop up. This is to clearly indicate to WCKNC members what the survey respondents feel should be addressed in the project. 

<img width="706" alt="Screen Shot 2021-06-11 at 11 32 17 AM" src="https://user-images.githubusercontent.com/81767103/121751740-728c9900-caaa-11eb-9f44-f4460f7c20c2.png">

## File Structure

**data** - Contains all data present and used in the creation of the mapplication. 
- ca_counties_small.geojson 
- ca_counties.geojson
- ca_zipcodes.geojson
- ktown.geojson
- la_zipcodes.geojson

**js** - Contains all javascript code utilized.
- chart.js
- init.js
- scrollama.js

**landingpage** - Contains original landing page used when official website was under construction.
- index.html
- ktown.jpg
- main.png

**styles** - Contains all css used to visualize the site.
- style.css

**index.html** - This is the main site location.

**readme.md** - Where you're reading this!




