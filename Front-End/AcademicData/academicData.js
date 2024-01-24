window.addEventListener("scroll", function () {
  var header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

//getUserID
//imgInput
//parDiv
var menu = document.querySelector(".menu");
var menuBtn = document.querySelector(".menu-btn");
var closeBtn = document.querySelector(".close-btn");

menuBtn.addEventListener("click", () => {
  menu.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  menu.classList.remove("active");
});

const getUserID = localStorage.getItem("newUserID");

var UserEmail = localStorage.getItem("signInUserEmail");








//Store the education as array of object
var existingEducationData =
  JSON.parse(localStorage.getItem("educationData")) || [];

var element11 = document.getElementById("submit-degree");

if(element11){
element11.addEventListener("click", () => {

  //calls the add Education function defined in th CRUD folder
  addEducation(UserEmail);
});

}

// function addEducation(paraEmail) {
//   //Getting the required DOM elemenst
//   var level = document.getElementById("degree-level").value;
//   var from = document.getElementById("degree-from").value;
//   var major = document.getElementById("major-subjects").value;
//   var eduDesc = document.getElementById("edu-desc").value;

//   //Check that all inputs are given
//   if (level == "" || from == "" || major == "") {
//     alert("Fill all details");
//   }

//   //Getting all previous
//   if (IsLevelUnique(level)) {
//     //level is unique

    

//     console.log(paraEmail);

//     // var existingEducationData=JSON.parse(localStorage.getItem('educationData'))||[];

//     let currSize = existingEducationData.length;
//     var newEducation = {
//       id: currSize + 1,
//       email: paraEmail,
//       eduLevel: level,
//       eduComments: eduDesc,
//       eduFrom: from,
//       eduMajor: major,
//     };

//     existingEducationData.push(newEducation);
//   } else {
//     alert("Info already Added ");
//   }

//   //console.log(education);

//   document.getElementById("degree-level").value = "";
//   document.getElementById("degree-from").value = "";
//   document.getElementById("major-subjects").value = "";
//   document.getElementById("edu-desc").value = "";
// }

//Store the experienec
var existingExperience = JSON.parse(localStorage.getItem("experience")) || [];


var element6 = document.getElementById("add-experience");
if (element6) {
  element6.addEventListener("click", () => {

    //Calling the addExperince Function defined in experience.js file
    //inside the CRUD folder
    addExperience(UserEmail);
  });
}

// function addExperience(para) {
//   var type = document.getElementById("exp-type").value;
//   var house = document.getElementById("exp-from").value;
//   var role = document.getElementById("exp-role").value;
//   var time = document.getElementById("exp-duration").value;
//   var journey = document.getElementById("exp-journey").value;

//   let currSize = existingExperience.length;

//   //House and Role can not be same
//   if (IsExpUnique(house, role)) {
    

//     var newExperience = {
//       id: currSize + 1,
//       email: para,
//       position: role,
//       softwareHouse: house,
//       workDuration: time,
//       workType: type,
//       profJourney: journey,
//     };

//     existingExperience.push(newExperience);
//   } else {
//     alert("Experience already added");
//   }

//   //Clear the input fields
//   document.getElementById("exp-type").value = "";
//   document.getElementById("exp-from").value = "";
//   document.getElementById("exp-role").value = "";
//   document.getElementById("exp-duration").value = "";
//   document.getElementById("exp-journey").value = "";

//   //console.log(experienceData);
// }

//When form is submitted save the data and go to home page
element7 = document.getElementById("save-details");
if (element7) {
  element7.addEventListener("click", () => {
    

    //console.log(existingEducationData);
    //Store back the updated data to browser local storage
    // localStorage.setItem(
    //   "educationData",
    //   JSON.stringify(existingEducationData)
    // );

    saveEducation();


    //console.log(existingExperience);
    //Store back the updated data to browser local storage
    //localStorage.setItem("experience", JSON.stringify(existingExperience));

    saveExperience();
    window.location.href = "../projectPage/projects.html";
  });
}

//For updating the Experience

//getting the url Parameters
var urlParams = new URLSearchParams(window.location.search);

//extracting the function parameter
var functionName = urlParams.get("function");

//Check if the passed function is same with the function you want to call
if (functionName === "displayExperience") {
  //call the required Function
  displayExperience(urlParams.get("expID"));
}

//This function will display a specific expereince using the card ID
function displayExperience(expCardID) {



   //removing the education container
   var eduCont=document.getElementById('edu-cont');
   var parEduCont=document.getElementById('box');
 
   //remove the education container
   parEduCont.removeChild(eduCont);
 
   //move the box upward
   parEduCont.classList.add('move-up');





   //Change the header line 
   let heading=document.getElementById('exp-heading');
   heading.innerHTML='Edit Experience';
  

  let searchIndex = "";

  

  existingExperience.forEach((obj, index) => {
    if (obj.id == expCardID) {
      searchIndex = index;
    }
  });

  
  console.log(searchIndex);

  //getting the DOM elemets to displayexpreinec

  let expType = document.getElementById("exp-type");
  let expFrom = document.getElementById("exp-from");
  let expRole = document.getElementById("exp-role");
  let expJourney = document.getElementById("exp-journey");
  let expDuration = document.getElementById("exp-duration");

  

  //setting the values
  expType.value = existingExperience[searchIndex].workType;
  expFrom.value = existingExperience[searchIndex].softwareHouse;
  expRole.value = existingExperience[searchIndex].position;
  expJourney.value = existingExperience[searchIndex].profJourney;
  expDuration.value = existingExperience[searchIndex].workDuration;

  var prvSumbitBtn = document.getElementById("save-details");
  var parDiv = document.getElementById("form-btn");
  var parDivTwo = document.getElementById("rem-add");
  var remAdd = document.getElementById("add-experience");
  parDiv.removeChild(prvSumbitBtn);
  parDivTwo.removeChild(remAdd);

  //Creating a new btn to add

  var newSumbitBtn = document.createElement("button");
  newSumbitBtn.classList.add("submit-btn");
  newSumbitBtn.setAttribute("id", "saveEdit-btn");
  newSumbitBtn.textContent = "Save Cahnges";
  newSumbitBtn.setAttribute("type", "button");
  parDiv.appendChild(newSumbitBtn);

  newSumbitBtn.addEventListener("click", () => {


    //calling the updateExperience button to update the data
    //It takes the index on wich the update is to be taken
    updateExperience(searchIndex);
  });
}

//This function will update a specific expereince. It takes the index number at
//which update is required. So first search the specific index and than call this function
// function updateExperience(index) {
//   //console.log(index);

//   //geeting the updated values from input fields
//   let newExpType = document.getElementById("exp-type").value;
//   let newExpFrom = document.getElementById("exp-from").value;
//   let newExpRole = document.getElementById("exp-role").value;
//   let newExpJourney = document.getElementById("exp-journey").value;
//   let newExpDuration = document.getElementById("exp-duration").value;

//   if (
//     newExpFrom == "" ||
//     newExpDuration == "" ||
//     newExpJourney == "" ||
//     newExpType == "" ||
//     newExpRole == ""
//   ) {
//     alert("fill all the spaces");
//   } else {
//     //the index we get as parameter represents the index at which the id of experience is found
//     console.log(existingExperience);

//     existingExperience[index].position = newExpRole;
//     existingExperience[index].profJourney = newExpJourney;
//     existingExperience[index].softwareHouse = newExpFrom;
//     existingExperience[index].workDuration = newExpDuration;
//     existingExperience[index].workType = newExpType;

//     localStorage.setItem("experience", JSON.stringify(existingExperience));

//     //Clear the input fileds
//     newExpType = "";
//     newExpDuration = "";
//     newExpFrom = "";
//     newExpJourney = "";
//     newExpDuration = "";

//     alert("Cahnges saved");

//     var experience = localStorage.getItem("experience") || [];
//     expD = JSON.parse(experience);
//     console.log(expD);

//     window.location.href = "../Main Page/index.html";
//   }
// }



if (functionName === "displayEducation") {
  //call the required Function
  displayEducation(urlParams.get("educationID"));
}

function displayEducation(eduNum) {
  //getting the required inputs

  let degLevel = document.getElementById("degree-level");
  let degFrom = document.getElementById("degree-from");
  let degSubjects = document.getElementById("major-subjects");
  let degCommnts = document.getElementById("edu-desc");

  let searchIndex = "";

  //searching for specific index using eduNum
  existingEducationData.forEach((obj, index) => {
    if (obj.id == eduNum) {
      searchIndex = index;
    }
  });

  degLevel.value = existingEducationData[searchIndex].eduLevel;
  degFrom.value = existingEducationData[searchIndex].eduFrom;

  degSubjects.value = existingEducationData[searchIndex].eduMajor;

  degCommnts.value = existingEducationData[searchIndex].eduComments;

  hideContent();
}

function hideContent() {
  let prvDegPar = document.getElementById("degree-sub-btn");
  let prvDegBtn = document.getElementById("submit-degree");
  let eduHeading=document.getElementById('edu-heading').innerHTML='Edit Education';

  prvDegPar.removeChild(prvDegBtn);

  let newDegBtn = document.createElement("button");
  newDegBtn.classList.add("degree-btn");
  newDegBtn.setAttribute("id", "newBtn");
  newDegBtn.setAttribute("type", "button");
  newDegBtn.textContent = "Save Changes";

  prvDegPar.appendChild(newDegBtn);

  //Hide the experience Section
  let expSection = document.getElementById("exp-main");
  let expParent = document.getElementById("box");

  expParent.classList.add("box-space");
  expParent.classList.add("move-up");

  expParent.removeChild(expSection);
}

var element8 = document.getElementById("newBtn");

if (element8) {
  element8.addEventListener("click", () => {

    //calling the update education function defined in education.js inside folder CRUD
    updateEducation(urlParams.get("educationID"));
  });
}

// function updateEducation(para) {
//   let searchIndex = "";

//   //searching for specific index using eduNum
//   existingEducationData.forEach((obj, index) => {
//     if (obj.id == para) {
//       searchIndex = index;
//     }
//   });

//   let degLevel = document.getElementById("degree-level").value;
//   let degFrom = document.getElementById("degree-from").value;
//   let degSubjects = document.getElementById("major-subjects").value;
//   let degCommnts = document.getElementById("edu-desc").value;

//   if (
//     degLevel == "" ||
//     degFrom == "" ||
//     degSubjects == "" ||
//     degCommnts == ""
//   ) {
//     alert("Fill all the fields");
//   } else {
//     console.log(existingEducationData[searchIndex]);
//     existingEducationData[searchIndex].eduComments = degCommnts;

//     existingEducationData[searchIndex].eduFrom = degFrom;

//     existingEducationData[searchIndex].eduLevel = degLevel;

//     existingEducationData[searchIndex].eduMajor = degSubjects;

//     localStorage.setItem(
//       "educationData",
//       JSON.stringify(existingEducationData)
//     );

//     degLevel.value = "";
//     degFrom.value = "";
//     degSubjects.value = "";
//     degCommnts.value = "";

//     window.location.href = "../Main Page/index.html";
//   }
// }



// function deleteEducation(para) {
//   let prvEdu = JSON.parse(localStorage.getItem("educationData")) || [];

//   let delIndex = "";
//   prvEdu.forEach((obj, index) => {
//     if (obj.id == para) {
//       //splice the data at index where id's will match
//       prvEdu.splice(index, 1);
//       // //modify the data in the local storage
//       localStorage.setItem("educationData", JSON.stringify(prvEdu));
//       console.log("Education Deleted!!");
//       alert("Education Deleted!!");
//       return;
//     }
//   });
// }

if (functionName === "addEducationForm") {
  //call the required Function
  addEducationForm();
}

if (functionName === "addExperienceForm") {
  //call the required Function
  addExperienceForm();
}

function addEducationForm() {
  //hide the expereience section
  hideContent();
  document.getElementById("newBtn").innerHTML = "Add Education";
  document.getElementById("newBtn").id = "add-new-education";
  document.getElementById('edu-heading').innerHTML='Add Education';

  //getting the input values
}

function addExperienceForm() {
  
  var prvSumbitBtn = document.getElementById("save-details");
  var parDiv = document.getElementById("form-btn");
  var parDivTwo = document.getElementById("rem-add");
  var remAdd = document.getElementById("add-experience");
  parDiv.removeChild(prvSumbitBtn);
  parDivTwo.removeChild(remAdd);

  //Creating a new btn to add



  //removing the education container
  var eduCont=document.getElementById('edu-cont');
  var parEduCont=document.getElementById('box');

  //remove the education container
  parEduCont.removeChild(eduCont);

  //move the box upward
  parEduCont.classList.add('move-up');




  var newSumbitBtn = document.createElement("button");
  newSumbitBtn.classList.add("submit-btn");
  newSumbitBtn.setAttribute("id", "add-exp-btn");
  newSumbitBtn.textContent = "Add Experience";
  newSumbitBtn.setAttribute("type", "button");
  parDiv.appendChild(newSumbitBtn);

}

var element13 = document.getElementById("add-exp-btn");

if (element13) {
  element13.addEventListener("click", () => {
    //Calling the add Experience function
    addExperience(urlParams.get("userEmail"));

    //asve Changes
    localStorage.setItem("experience", JSON.stringify(existingExperience));

    alert("New Experienec is Added");

    window.location.href = "../Main Page/index.html";
  });
}

var element10 = document.getElementById("add-new-education");

if (element10) {
  element10.addEventListener("click", () => {
    //calling add education function with sending the email of the user
    addEducation(urlParams.get("userEmail"));

    //save the changes
    localStorage.setItem(
      "educationData",
      JSON.stringify(existingEducationData)
    );
    alert("New Project is added");

    //navigate to home page
    window.location.href = "../Main Page/index.html";
  });
}

// function getEmail(userEmail) {
//   retriveUserData.forEach((obj) => {
//     if (obj["id"] == getUserID) {
//       userEmail.emailID = obj.emailAddress;
//       return;
//     }
//   });
// }


// function IsExpUnique(house, role) {
//   if (existingExperience.length == 0) {
//     return true;
//   } else {
//     existingExperience.forEach((obj) => {
//       if (obj["softwareHouse"] == house && obj["position"] == role) {
//         return false;
//       }
//     });

//     return true;
//   }
// }

//element11
