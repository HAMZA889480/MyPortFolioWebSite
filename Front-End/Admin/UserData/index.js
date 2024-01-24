window.addEventListener("scroll", function () {
  var header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

var menu = document.querySelector(".menu");
var menuBtn = document.querySelector(".menu-btn");
var closeBtn = document.querySelector(".close-btn");

menuBtn.addEventListener("click", () => {
  menu.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  menu.classList.remove("active");
});


var params = new URLSearchParams(window.location.search);

var pressedBtn = params.get("Btn");
var email = params.get("id");
//var projSection=document.getElementById('project-section');

if (pressedBtn == "projects") {
  var projects = [];
  hideEduExp();
  getprojects(email, projects);
  showProjects(projects);
}



function showProjects(para) {

  let noProjDiv= document.getElementById('no-proj-cont');
  let noProj=document.getElementById('no-proj-text');
  if (Array.isArray(para) && para.length === 0) {
    // proj is an empty array
    console.log("proj is empty");

    noProjDiv.style.display = "block";
    noProj.style.display = "block";
  } else {
    console.log(para);
    noProjDiv.style.display = "none";
    noProj.style.display = "none";

    for (let i = 0; i < para.length; i++) {
      var sourceBtn = document.createElement("button");
      sourceBtn.textContent = "Source Code";
      sourceBtn.classList.add("button1");

      var readMoreBtn = document.createElement("button");
      readMoreBtn.textContent = "Read More";
      readMoreBtn.classList.add("button2");

      readMoreBtn.id = para[i].id.toString(); //add ID dynamically from project Data using for loop
      readMoreBtn.setAttribute("onclick", "toogle(" + para[i].id + ")"); //toogle is defined in index.js

      //Create child Child div to append buttons
      var childChildDiv = document.createElement("div");
      childChildDiv.classList.add("buttons");
      //append the buttons to the childChildDiv
      childChildDiv.append(sourceBtn);
      childChildDiv.append(readMoreBtn);

      //imageClass to add .proj-img

      //Below is tested code  //Child 2 code
      var projImage = document.createElement("img");
      projImage.src = para[i].projectImage;

      projImage.classList.add("proj-img");

      //geting the parent of the imag
      var childTwo = document.createElement("div");
      childTwo.classList.add("project-image");

      //appending the image with child 2
      childTwo.append(projImage);

      //creating h2 tag present inside the child 1
      var proTitle = document.createElement("h2");
      proTitle.textContent = para[i].projectTitle;
      proTitle.classList.add("project-title");

      //creating p tag present inside the child1
      var prodescription = document.createElement("p");

      prodescription.classList.add("project-description");

      //first we split the long text in to short
      let longText = para[i].projectDes;
      //Split the text on basis of '. ' and store in an array
      let lines = longText.split(". ");

      //Get first 3 line from 0 to 3
      let firstThreeLines = lines.slice(0, 3);

      //join the 3 lines
      let textDisplay = firstThreeLines.join(". ");

      prodescription.textContent = textDisplay;

      var child1 = document.createElement("div");
      child1.classList.add("project-details");

      var parent = document.createElement("div");
      parent.classList.add("projects-container");
      //parent.append(child1);
      //parent.append(childTwo);

      // document.getElementById("proj-parent").append(parent);

      //Test is test for icons
      // var icon1 = document.createElement("i");

      // icon1.className = "fa-solid fa-pen-to-square";

      // icon1.addEventListener("click", function () {
      //   //calling the edit Project function present in project.js inside Folder ProjectPages and passing the ID
      //   var projID = para[i].id;
      //   var functionName = "displayProject";

      //   var url = `../projectPage/projects.html?projID=${projID}&function=${functionName}`;
      //   window.location.href = url;
      // });

      //var icon2 = document.createElement("i");

      // icon2.className = "fa-solid fa-trash";

      // icon2.addEventListener("click", () => {
      //   //deleteProject function is defined in projects.js
      //   deleteProject(para[i].id);

      //   //reload the page after deleting the project
      //   window.location.reload();
      // });

      // var iconDiv = document.createElement("div");
      // iconDiv.classList.add("title-icons");

      // //append the icons with the iconDiv
      // iconDiv.append(icon1);
      // iconDiv.append(icon2);

      var hIconDiv = document.createElement("div");
      hIconDiv.classList.add("title-edit");
      hIconDiv.append(proTitle);
      //hIconDiv.append(iconDiv);

      child1.append(hIconDiv);
      child1.append(prodescription);
      child1.append(childChildDiv);

      parent.append(child1);
      parent.append(childTwo);

      document.getElementById("proj-parent").append(parent);
    }

    //append the projDiv with parentDiv using for loop
  }
}

function hideEduExp() {
  let part = document.getElementById("parent");
  let edu = document.getElementById("edu-section");
  let exp = document.getElementById("exp-section");

  part.removeChild(edu);
  part.removeChild(exp);
}

function getprojects(id, projects) {
  var proj = JSON.parse(localStorage.getItem("projectsData") || []);

  if (Array.isArray(proj) && proj.length === 0) {
    console.log("Project is empty");
  } else {
    proj.forEach((obj, index) => {
      if (obj.emailAddress == id) {
        projects.push(proj[index]);
      }
    });
  }
}










if(pressedBtn=="experience"){
  var experience=[];
  hideProEdu();

  getExperience(email, experience);

  displayExperience(experience);
}
if(pressedBtn=="education"){
  var education=[];
  hideProExp();
  getEducation(email, education);

  displayEducation(education);

}


function hideProExp(){
  let part = document.getElementById("parent");
  let proj = document.getElementById("project-section");
  let exp = document.getElementById("exp-section");

  part.removeChild(proj);
  part.removeChild(exp);
}

function getEducation(email, para){
  var edu = JSON.parse(localStorage.getItem("educationData") || []);

  if (Array.isArray(edu) && edu.length === 0) {
    console.log("Education is empty");
  } else {
    edu.forEach((obj, index) => {
      if (obj.email == email) {
        para.push(edu[index]);
      }
    });
  }

}


function  displayEducation(eduPara){

  let noEduDiv=document.getElementById('no-edu-cont');
let noEdu=document.getElementById('no-edu-text');
  
    if (Array.isArray(eduPara) && eduPara.length === 0) {
     
  
      
      noEdu.style.display="block";
      noEduDiv.style.display="block";
      
  
    } else {
  
      
      noEdu.style.display="none";
      noEduDiv.style.display="none";
      
      
  
  
  
      console.log(eduPara);
      // Create the main container div
      for (let i = 0; i < eduPara.length; i++) {
        var cardDiv = document.createElement("div");
        cardDiv.className = "card";
        cardDiv.style.width = "50%";
  
        // Create the soft-name div
        var softNameDiv = document.createElement("div");
        softNameDiv.className = "soft-name";
  
        // Create the edit-edu div
        var editEduDiv = document.createElement("div");
        editEduDiv.className = "edit-edu";
  
        // Create the h2 element
        var h2Element = document.createElement("h2");
        h2Element.style.marginLeft = "2vw";
        h2Element.style.textAlign = "left";
        h2Element.style.color = "white";
        h2Element.style.fontSize = "2rem";
        h2Element.textContent = "2018";
  
        
  
        // Append the h2 and edu-icons div to the edit-edu div
        editEduDiv.appendChild(h2Element);
        //editEduDiv.appendChild(eduIconsDiv);
  
        // Create the "Intermediate" paragraph
        var intermediateParagraph = document.createElement("p");
        intermediateParagraph.textContent = eduPara[i].eduLevel;
  
  
        // Create the software-line div
        var softwareLineDiv = document.createElement("div");
        softwareLineDiv.className = "software-line";
  
        // Append the paragraph and software-line div to the soft-name div
        softNameDiv.appendChild(editEduDiv);
        softNameDiv.appendChild(intermediateParagraph);
        softNameDiv.appendChild(softwareLineDiv);
  
        // Create the soft-role div
        var softRoleDiv = document.createElement("div");
        softRoleDiv.className = "soft-role";
  
        // Create the "Associate Software Engineer" paragraph
        var roleParagraph = document.createElement("p");
        roleParagraph.textContent = eduPara[i].eduFrom;
  
        // Append the paragraph to the soft-role div
        softRoleDiv.appendChild(roleParagraph);
  
        // Create the softjourney div
        var softJourneyDiv = document.createElement("div");
        softJourneyDiv.className = "softjourney";
  
        // Create the lorem ipsum paragraph
        var loremIpsumParagraph = document.createElement("p");
        loremIpsumParagraph.textContent =
          eduPara[i].eduComments;
        // Append the paragraph to the softjourney div
        softJourneyDiv.appendChild(loremIpsumParagraph);
  
        // Create the length div
        var lengthDiv = document.createElement("div");
        lengthDiv.className = "length";
  
        // Create the dur div
        var durDiv = document.createElement("div");
        durDiv.className = "dur";
        durDiv.style.paddingTop = "10vh";
  
        // Create the "Majors" paragraph
        var majorsParagraph = document.createElement("p");
        majorsParagraph.textContent = "Majors";
  
        // Create the "Science" paragraph
        var scienceParagraph = document.createElement("p");
        scienceParagraph.className = "work-duration";
        scienceParagraph.textContent = eduPara[i].eduMajor;
  
        // Append the paragraphs to the dur div
        durDiv.appendChild(majorsParagraph);
        durDiv.appendChild(scienceParagraph);
  
        // Append the dur div to the length div
        lengthDiv.appendChild(durDiv);
  
        // Append all the divs to the main container div
        cardDiv.appendChild(softNameDiv);
        cardDiv.appendChild(softRoleDiv);
        cardDiv.appendChild(softJourneyDiv);
        cardDiv.appendChild(lengthDiv);
  
        // Append the main container div to the document body
  
        // Append the card to the document body (you can replace this with the desired parent element)
        document.getElementById("edu-card").appendChild(cardDiv);
      }
    }
  

  


















}




function displayExperience(para){

  let noExpDiv= document.getElementById('no-exp-cont');
  let noExp=document.getElementById('no-exp-text');


  if (Array.isArray(para) && para.length === 0) {
      
    noExpDiv.style.display="block";
    noExp.style.display="block";
  } else {

    noExpDiv.style.display="none";
    noExp.style.display="none";

    for (let i = 0; i < para.length; i++) {
      // Create the outermost div with class "card"
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card");

      // Create the "soft-name" div
      const softNameDiv = document.createElement("div");
      softNameDiv.classList.add("soft-name");

      // Create the "exp-icon" div
      const expIconDiv = document.createElement("div");
      expIconDiv.classList.add("exp-icon");

      // Create the "Software House" paragraph
      const softwareHousePara = document.createElement("p");
      softwareHousePara.textContent = para[i].softwareHouse;

      

      // Append the paragraph and icon to the "exp-icon" div
      expIconDiv.appendChild(softwareHousePara);
     

      // Create the "software-line" div
      const softwareLineDiv = document.createElement("div");
      softwareLineDiv.classList.add("software-line");

      // Append the "exp-icon" and "software-line" to the "soft-name" div
      softNameDiv.appendChild(expIconDiv);
      softNameDiv.appendChild(softwareLineDiv);

      // Create the "soft-role" div
      const softRoleDiv = document.createElement("div");
      softRoleDiv.classList.add("soft-role");

      // Create the "Associate Software Engineer" paragraph
      const associateSoftwareEngineerPara = document.createElement("p");
      associateSoftwareEngineerPara.textContent = para[i].position;

      // Append the paragraph to the "soft-role" div
      softRoleDiv.appendChild(associateSoftwareEngineerPara);

      // Create the "softjourney" div
      const softJourneyDiv = document.createElement("div");
      softJourneyDiv.classList.add("softjourney");

      // Create the description paragraph
      const descriptionPara = document.createElement("p");
      descriptionPara.textContent = para[i].profJourney;

      // Append the description paragraph to the "softjourney" div
      softJourneyDiv.appendChild(descriptionPara);

      // Create the "length" div
      const lengthDiv = document.createElement("div");
      lengthDiv.classList.add("length");

      // Create the "dur" div
      const durDiv = document.createElement("div");
      durDiv.classList.add("dur");

      // Create the "Duration" paragraph
      const durationPara = document.createElement("p");
      durationPara.textContent = "Duration";

      // Create the "work-duration" paragraph
      const workDurationPara = document.createElement("p");
      workDurationPara.classList.add("work-duration");
      workDurationPara.textContent = para[i].workDuration;

      

      // Append the "Duration" paragraph, "work-duration" paragraph, and icon to the "dur" div
      durDiv.appendChild(durationPara);
      durDiv.appendChild(workDurationPara);
     

      // Append the "dur" div to the "length" div
      lengthDiv.appendChild(durDiv);

      // Append all the created elements to the "card" div
      cardDiv.appendChild(softNameDiv);
      cardDiv.appendChild(softRoleDiv);
      cardDiv.appendChild(softJourneyDiv);
      cardDiv.appendChild(lengthDiv);

      // Add the "card" div to the document body or any other desired location
      document.getElementById("card-cont").appendChild(cardDiv);
    }
  }
}



function hideProEdu(){

  let part = document.getElementById("parent");
  let edu = document.getElementById("edu-section");
  let pro = document.getElementById("project-section");

  part.removeChild(edu);
  part.removeChild(pro);
}

function getExperience(email, allExp){
  var exp = JSON.parse(localStorage.getItem("experience") || []);

  if (Array.isArray(exp) && exp.length === 0) {
    console.log("Experience is empty");
  } else {
    exp.forEach((obj, index) => {
      if (obj.email == email) {
        allExp.push(exp[index]);
      }
    });
  }
}










