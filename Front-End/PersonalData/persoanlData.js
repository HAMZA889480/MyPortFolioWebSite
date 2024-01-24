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
  var retriveUserData = JSON.parse(localStorage.getItem("userData"));
  var UserEmail = localStorage.getItem("signInUserEmail");
  


window.onload=function(){

  //search for new user and fill the input fields
  searchUser();
}




  function searchUser() {
    //fetch all records from the data base
  
    //searching for specific record using Id
  
    var fName = document.getElementById("fullName");
    var email = document.getElementById("email");
    var description = document.getElementById("description");
  
    retriveUserData.forEach((obj) => {
      if (obj.id == getUserID) {
      
        fName.value = obj["firstName"] + " " + obj["lastName"];
        email.value = obj["emailAddress"];
        description.value = obj["description"];
  
      
      }
    });

    fName.disabled=true;
    email.disabled=true;
    description.disabled=true;
  }



  //Getting the ikmage of the user

//Selecting the elements to work with image
const imgInput = document.getElementById("file");
const parDiv = document.querySelector(".image");
const btn = document.querySelector(".image-btn");

//Creating an image element to add when select an image
//and than remove when to clear the input fields
const pic = document.createElement("img");

//stores the image URL
var imageUrl = "";

// Function to replace the button with an image
function replaceWithImage() {
  // Trigger a click event on the file input
  console.log("Button is clicked");
  imgInput.click();
}


if(imgInput){

  imgInput.addEventListener("change", function () {
    // Get the selected file
    const selectedFile = imgInput.files[0];
  
    // Check if a file is selected
  
    if (selectedFile) {
      const reader = new FileReader();
  
      // Define an onload event handler to process the selected file
      reader.onload = () => {
        imageUrl = reader.result;
  
        // // Create an image element
  
        pic.src = imageUrl;
  
        //adding the image and removing the button
        parDiv.removeChild(btn);
        parDiv.appendChild(pic);
        parDiv.classList.add("border-style");
      };
  
      // Read the selected file as a data URL
      reader.readAsDataURL(selectedFile);
    } else {
      alert("No file selected.");
    }
  });


}


// clear the selected input field when button is clicked 
 var clsPicBtn=document.getElementById('cls-myPic-btn');

 if(clsPicBtn){
  clsPicBtn.addEventListener('click',()=>{

    //Selecting the elements to work with image

const parDiv = document.querySelector(".image");
const btn = document.querySelector(".image-btn");




//adding the image and removing the button
parDiv.addChild(btn);
parDiv.removeChild(pic);
parDiv.classList.remove("border-style");


  })
 };



 var perDataForm=document.getElementById('box');

 if(perDataForm){
  perDataForm.addEventListener('submit',(event)=>{
    event.preventDefault();

     //Get the required DOM elements
  const aboutInput = document.getElementById("about-input").value;

  const linkedInInput=document.getElementById('linked-In-input').value;

  const gitHubInput=document.getElementById('github-input').value;
  const whatsappInput=document.getElementById('wahstapp-input').value;



  retriveUserData.forEach((obj) => {
    if (obj.id == getUserID) {
      // when id matches

      //adding image and about details
      obj.image = pic.src;
      obj.aboutSelf = aboutInput;
      obj.social.linkedIn=linkedInInput;
      obj.social.gitHub=gitHubInput;
      obj.social.whatsapp=whatsappInput;

       //console.log(retriveUserData);

      //Then push back the data to local storage.
      localStorage.setItem("userData", JSON.stringify(retriveUserData));
    } else {
      console.log("Data is not found");
    }
  });

  
  window.location.href="../AcademicData/academicData.html";    
  });
 }