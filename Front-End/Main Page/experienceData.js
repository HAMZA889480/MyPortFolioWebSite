window.addEventListener("load", function () {
  var expData = [];
  
  let noExpDiv= document.getElementById('no-exp-cont');
  let noExp=document.getElementById('no-exp-text');



  //search a specific userExperience on SignIn Base
  var email = localStorage.getItem("signInUserEmail");


  var expSection=document.getElementById('exp-section');

  if(expSection){

    //if experience section exist than call the showExperience Card
  getExpData(email);

  showExperienceCard();
  }
  //console.log(experience);

  //Show Experince Card
  function showExperienceCard() {
    //console.log(expData);
    if (Array.isArray(expData) && expData.length === 0) {
      
      noExpDiv.style.display="block";
      noExp.style.display="block";
    } else {

      noExpDiv.style.display="none";
      noExp.style.display="none";

      for (let i = 0; i < expData.length; i++) {
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
        softwareHousePara.textContent = expData[i].softwareHouse;

        // Create the icon element with class "fa-pen-to-square"
        const iconElement = document.createElement("i");
        iconElement.classList.add("fa-solid", "fa-pen-to-square");

        //adding a clcik listner to the edit icon. This will redirect to userData page where updating
        //occurs. It sends a specific id of experience card and function to call to edit
        iconElement.addEventListener("click", function () {
          var experienceID = expData[i].id;
          var functionName = "displayExperience";

          var url = `../AcademicData/academicData.html?expID=${experienceID}&function=${functionName}`;
          window.location.href = url;
        });

        // Append the paragraph and icon to the "exp-icon" div
        expIconDiv.appendChild(softwareHousePara);
        expIconDiv.appendChild(iconElement);

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
        associateSoftwareEngineerPara.textContent = expData[i].position;

        // Append the paragraph to the "soft-role" div
        softRoleDiv.appendChild(associateSoftwareEngineerPara);

        // Create the "softjourney" div
        const softJourneyDiv = document.createElement("div");
        softJourneyDiv.classList.add("softjourney");

        // Create the description paragraph
        const descriptionPara = document.createElement("p");
        descriptionPara.textContent = expData[i].profJourney;

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
        workDurationPara.textContent = expData[i].workDuration;

        // Create the icon element with class "fa-trash"
        const trashIconElement = document.createElement("i");
        trashIconElement.classList.add("fa-solid", "fa-trash");
        //adding a clcik listner to the delete icon. This will redirect to userData page where updating
        //occurs. It sends a specific id of experience card and function to call to delete
        trashIconElement.addEventListener("click", () => {
          ////deleteProject function is defined in thi file
          deleteExperience(expData[i].id);

          //reload the page after deleting the project
          window.location.reload();
        });

        // Append the "Duration" paragraph, "work-duration" paragraph, and icon to the "dur" div
        durDiv.appendChild(durationPara);
        durDiv.appendChild(workDurationPara);
        durDiv.appendChild(trashIconElement);

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

  var element12 = document.getElementById("add-exp-btn");
  if (element12) {
    element12.addEventListener("click", () => {
      var functionName = "addExperienceForm";

      var url = `../AcademicData/academicData.html?userEmail=${email}&function=${functionName}`;
      window.location.href = url;
    });
  }

  function getExpData(emailId) {
    var experience = JSON.parse(localStorage.getItem("experience") || []);
    console.log(experience);

    if (Array.isArray(experience) && experience.length === 0) {
      console.log("Experience is empty");
    } else {
      let found = false;

      experience.forEach((obj, index) => {
        if (obj.email == emailId) {
          expData.push(experience[index]);
          found = true;
        }
      });
    }
  }
});
