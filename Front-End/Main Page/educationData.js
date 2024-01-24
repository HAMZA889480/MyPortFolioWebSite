var educationData = [];
var email = localStorage.getItem("signInUserEmail");


let noEduDiv=document.getElementById('no-edu-cont');
let noEdu=document.getElementById('no-edu-text');


getEducation(email);


var eduSection=document.getElementById('edu-section');

if(eduSection){

  //if education section exist than call show education function.
showEducation();
}


function showEducation() {
  if (Array.isArray(educationData) && educationData.length === 0) {
   

    
    noEdu.style.display="block";
    noEduDiv.style.display="block";
    

  } else {

    
    noEdu.style.display="none";
    noEduDiv.style.display="none";
    
    



    console.log(educationData);
    // Create the main container div
    for (let i = 0; i < educationData.length; i++) {
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

      // Create the edu-icons div
      var eduIconsDiv = document.createElement("div");
      eduIconsDiv.className = "edu-icons";

      // Create the edit icon
      var editIcon = document.createElement("i");
      editIcon.className = "fa-solid fa-pen-to-square";

      //addding click listner to edit icon
      editIcon.addEventListener('click',()=>{

        var eduID = educationData[i].id;
        var functionName = "displayEducation";

        var url = `../AcademicData/academicData.html?educationID=${eduID}&function=${functionName}`;
        window.location.href = url;
      });

      // Create the trash icon
      var trashIcon = document.createElement("i");
      trashIcon.className = "fa-solid fa-trash";

      trashIcon.addEventListener('click',()=>{

        deleteEducation(educationData[i].id);
        window.location.reload();

      });

      // Append the icons to the edu-icons div
      eduIconsDiv.appendChild(editIcon);
      eduIconsDiv.appendChild(trashIcon);

      // Append the h2 and edu-icons div to the edit-edu div
      editEduDiv.appendChild(h2Element);
      editEduDiv.appendChild(eduIconsDiv);

      // Create the "Intermediate" paragraph
      var intermediateParagraph = document.createElement("p");
      intermediateParagraph.textContent = educationData[i].eduLevel;


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
      roleParagraph.textContent = educationData[i].eduFrom;

      // Append the paragraph to the soft-role div
      softRoleDiv.appendChild(roleParagraph);

      // Create the softjourney div
      var softJourneyDiv = document.createElement("div");
      softJourneyDiv.className = "softjourney";

      // Create the lorem ipsum paragraph
      var loremIpsumParagraph = document.createElement("p");
      loremIpsumParagraph.textContent =
        educationData[i].eduComments;
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
      scienceParagraph.textContent = educationData[i].eduMajor;

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


var element9=document.getElementById('add-edu-btn');
if(element9){

  element9.addEventListener('click',()=>{

    //defined in userData.js;
    
        var functionName = "addEducationForm";

        var url = `../AcademicData/academicData.html?userEmail=${email}&function=${functionName}`;
        window.location.href = url;
  });
}


function getEducation(email) {
  var education = JSON.parse(localStorage.getItem("educationData") || []);

  console.log(education);

  if (Array.isArray(education) && education.length === 0) {
    //console.log("Project is empty");
  } else {
    education.forEach((obj, index) => {
      if (obj.email == email) {
        educationData.push(education[index]);
        found = true;
      }
    });
  }
}
