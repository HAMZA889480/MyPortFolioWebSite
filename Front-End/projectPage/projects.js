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

var retriveUserData = JSON.parse(localStorage.getItem("userData"));

//Selecting the elements to work with image
const imageInput = document.getElementById("file");
const parentDiv = document.querySelector(".project-Image");
const button = document.querySelector(".image-btn");

//Creating an image element to add when select an image
//and than remove when to clear the input fields
const img = document.createElement("img");
img.setAttribute("id", "proj-img");

//stores the image URL
var imageUrl = "";

// Function to replace the button with an image
function replaceWithImage() {
  // Trigger a click event on the file input
  console.log("Button is clicked");
  imageInput.click();
}

// Event listener for the file input change event
if (imageInput) {
  imageInput.addEventListener("change", function () {
    // Get the selected file
    const selectedFile = imageInput.files[0];

    // Check if a file is selected

    if (selectedFile) {
      const reader = new FileReader();

      // Define an onload event handler to process the selected file
      reader.onload = () => {
        imageUrl = reader.result;

        // // Create an image element

        img.src = imageUrl;

        //adding the image and removing the button
        parentDiv.removeChild(button);
        parentDiv.appendChild(img);
        parentDiv.classList.add("border-style");
      };

      // Read the selected file as a data URL
      reader.readAsDataURL(selectedFile);
    } else {
      alert("No file selected.");
    }
  });
}

//Contains the project details
var prvProjectsData = JSON.parse(localStorage.getItem("projectsData")) || [];

const getID = localStorage.getItem("newUserID");

var userEmail = { emailID: "" };
var elementTwo = document.getElementById("add-project");

if (elementTwo) {
  elementTwo.addEventListener("click", () => {  

    addProject();
  });
}

    
     function addProject(){
      //the values from input fields
      const proTitle = document.getElementById("proj-title").value;
      const proDescription = document.getElementById("proj-desc").value;
      const proTag1 = document.getElementById("proj-tag1").value;
      const proTag2 = document.getElementById("proj-tag2").value;
      const proTag3 = document.getElementById("proj-tag3").value;


      //getting the image (if exist)
  let imageCheck=document.getElementById('proj-img');

  if(!imageCheck){

    //check that image exist or not
    alert('Select an image');
  }
      
      //check if any input value is not filled 
     else if(proTitle==''||proDescription==''||proTag1==''||proTag2==''||proTag3==''){
        alert('Fill all detalis');
      }
      else{



      var emailFound = "false";
      getEmail(emailFound);
      if (emailFound) {
        let currSize = prvProjectsData.length;
        //Create new Project object
        var newProject = {
          id: currSize + 1,
          emailAddress: userEmail.emailID,
          projectTitle: proTitle,
          projectDes: proDescription,
          proTags: { 1: proTag1, 2: proTag2, 3: proTag3 },
          projectImage: imageUrl,
        };

        //console.log(imageUrl);
        //

        prvProjectsData.push(newProject);
      } else {
        alert("Project already added!");
      }

      //removing the previous image and readded the button after data is submitted successfully
      parentDiv.appendChild(button);
      parentDiv.removeChild(img);
      parentDiv.classList.remove("border-style");

      document.getElementById("proj-title").value = "";
      document.getElementById("proj-desc").value = "";
      document.getElementById("proj-tag1").value = "";
      document.getElementById("proj-tag2").value = "";
      document.getElementById("proj-tag3").value = "";
    }
      //console.log(projects);
     }


const existingProjects = JSON.parse(localStorage.getItem("userProjects")) || [];
//Submit the form
var element3 = document.getElementById("project-from");

if (element3) {
  element3.addEventListener("submit", (event) => {
    event.preventDefault();

    if (imageUrl == "") {
      alert("Select an Image");
    } else {
      //the values from input fields
      const proTitle = document.getElementById("proj-title").value;
      const proDescription = document.getElementById("proj-desc").value;
      const proTag1 = document.getElementById("proj-tag1").value;
      const proTag2 = document.getElementById("proj-tag2").value;
      const proTag3 = document.getElementById("proj-tag3").value;

      //Getting the previous data
      //Here call to fetch function occur to get data from back-end

      let currSize = existingProjects.length;
      // console.log(currSize);
      //Storing new project
      const newProject = {
        //projectID is to be removed when sending data to backend
        projectID: currSize + 1,

        projectTitle: proTitle,
        proDescription: proDescription,
        projectTags: { 1: proTag1, 2: proTag2, 3: proTag3 },
        projectImages: { 1: imageUrl },
      };

      existingProjects.push(newProject);

      //Storing back to local storage
      localStorage.setItem("userProjects", JSON.stringify(existingProjects));
      alert("Project Added");

      //removing the previous image and readded the button after data is submitted successfully
      parentDiv.appendChild(button);
      parentDiv.removeChild(img);
      parentDiv.classList.remove("border-style");
      // //Clear the input fields and
      document.getElementById("proj-title").value = "";
      document.getElementById("proj-desc").value = "";
      document.getElementById("proj-tag1").value = "";
      document.getElementById("proj-tag2").value = "";
      document.getElementById("proj-tag3").value = "";
    }
  });
}

//Event Listner to clear the image when the button is clicked
var element4 = document.getElementById("img-cls");
if (element4) {
  element4.addEventListener("click", function () {
    //remove the image and append the button
    parentDiv.appendChild(button);
    img.src="";
    parentDiv.removeChild(img);

    parentDiv.classList.remove("border-style");
  });
}

const homeButton = document.getElementById("go-to-home");
if (homeButton) {
  homeButton.addEventListener("click", () => {
    //stroing back the privous project data
    localStorage.setItem("projectsData", JSON.stringify(prvProjectsData));

    window.location.href = "../Main Page/index.html";
  });
}

//getting the url Parameters
var urlParams = new URLSearchParams(window.location.search);

//extracting the function parameter
var functionName = urlParams.get("function");

//Check if the passed function is same with the function you want to call
if (functionName === "displayProject") {
  //call the required Function
  displayProject(urlParams.get("projID"));
}

//This function will edit the project. It takes a specific iD of the project which is to be edited
function displayProject(specificID) {
  //console.log('This is the ID of the project you have to edit  '+specificID);

  //It contains the required index of the array 
let reqIndex="";

prvProjectsData.forEach((obj, index)=>{
  if(obj.id==specificID){
    reqIndex=index;
  }
});

  //Change the elements of the project form
  document.getElementById("reason").innerHTML = "Edit Your Project";
  var btnParent = document.getElementById("project-buttons");
  var btnOne = document.getElementById("add-project");
  var btnTwo = document.getElementById("go-to-home");

  //remove the buttons
  btnParent.removeChild(btnOne);
  btnParent.removeChild(btnTwo);

  //Creating a new button and append it with parent button div
  var newBtn = document.createElement("button");
  newBtn.textContent = "Save Changes";
  newBtn.classList.add("submit-btn");
  newBtn.setAttribute("id", "edit-btn");
  newBtn.setAttribute("type", "button");
  btnParent.appendChild(newBtn);

  // let searchIndex = specificID - 1;

  //Change the required heading and buttons

  //document.getElementById('add-project').innerHTML='Save Changes';

  //getting the required input fields to display previuos data
  let title = document.getElementById("proj-title");
  let desc = document.getElementById("proj-desc");
  //let image=document.getElementById('');
  let tag1 = document.getElementById("proj-tag1");
  let tag2 = document.getElementById("proj-tag2");
  let tag3 = document.getElementById("proj-tag3");

  console.log(prvProjectsData[reqIndex]);
  img.src=prvProjectsData[reqIndex].projectImage;
  title.value = prvProjectsData[reqIndex].projectTitle;
  desc.value = prvProjectsData[reqIndex].proDescription;
  tag1.value = prvProjectsData[reqIndex].proTags[1];
  tag2.value = prvProjectsData[reqIndex].proTags[2];
  tag3.value = prvProjectsData[reqIndex].proTags[3];

  //display the image

  img.src = prvProjectsData[reqIndex].projectImage;

  parentDiv.removeChild(button);
  parentDiv.appendChild(img);
  parentDiv.classList.add("border-style");
}

//Calls the update
var element = document.getElementById("edit-btn");

if (element) {
  element.addEventListener("click", () => {
    updateProject(urlParams.get("projID"));

    //
  });
}





function updateProject(projID) {
  //getting the new input values

  console.log(img.src);
  let newTitle = document.getElementById("proj-title").value;
  let newDesc = document.getElementById("proj-desc").value;
  //let image=document.getElementById('');
  let newTag1 = document.getElementById("proj-tag1").value;
  let newTag2 = document.getElementById("proj-tag2").value;
  let newTag3 = document.getElementById("proj-tag3").value;

  //console.log(projID);

  console.log(img.src);


  //getting the image (if exist)
  let imageCheck=document.getElementById('proj-img');

  if(!imageCheck){

    //check that image exist or not
    alert('Select an image');
  }

  else if (
    newTitle == "" ||
    newDesc == "" ||
    newTag1 == "" ||
    newTag2 == "" ||
    newTag3 == ""
    
  ) {
    alert("Fill all the details");
  } else {
    //projID is one less than the index number in array where to edit the data
    //let index = projID - 1;
    
    let index="";
    prvProjectsData.forEach((obj, location)=>{


      if(obj.id==projID){
        index=location;
      }
    });



   
    



   


    //console.log(prvProjectsData[index]);
    prvProjectsData[index].projectTitle = newTitle;
    prvProjectsData[index].projectDes = newDesc;
    prvProjectsData[index].projectImage = img.src;
    prvProjectsData[index].proTags[1] = newTag1;
    prvProjectsData[index].proTags[2] = newTag2;
    prvProjectsData[index].proTags[3] = newTag3;

    //save changes in the local storage
    //localStorage.setItem('userProjects', JSON.stringify(existingProjects));

    console.log(prvProjectsData);
    localStorage.setItem("projectsData", JSON.stringify(prvProjectsData));

    //clear the input fields
    newTitle.value = "";
    newDesc.value = "";
    newTag1.value = "";
    newTag2.value = "";
    newTag3.value = "";

    if(img){
    parentDiv.appendChild(button);
    parentDiv.removeChild(img);
    parentDiv.classList.remove("border-style");
    }
    window.location.href = "../Main Page/index.html";
  }
}





function deleteProject(projId){
  
  
  


  //Match the id using for Each loop

  prvProjectsData.forEach((obj,index)=>{
    if(obj.id == projId){
      

      //splice the data at index where id's will match
      prvProjectsData.splice(index,1);
      // //modify the data in the local storage
  localStorage.setItem('projectsData', JSON.stringify(prvProjectsData));
  return;
    }

  });


  

   
   

  // alert('Project is deleted');

}








function getEmail(emailFound) {
  retriveUserData.forEach((obj) => {
    if (obj.id == getID) {
      userEmail.emailID = obj.emailAddress;
      emailFound = true;
      return;
    }
  });
}
