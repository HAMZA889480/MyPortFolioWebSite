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

//getting the all users
var userData = JSON.parse(localStorage.getItem("userData"))||[];

console.log(userData);
//calling the function to display all users . This function is present insidse CRUD folder
displayAllProfiles();

function displayAllProfiles() {
  let noProfile = document.getElementById("no-data");

  if (Array.isArray(userData) && userData.length === 0) {
    noProfile.style.display = "block";
  } else {
    noProfile.style.display = "none";
    var dynamic = document.getElementById("card-part");

for (let i = 0; i < userData.length; i++) {
  // Create a new card element for each user data

  
  const card = document.createElement("div");
  

  if(i>0){

    //from 2nd card add a different CSS class to apply margins between the consective cards.
    card.classList="margin-class";
  }
  else{
    //for card 1 add normal class with no margin
    card.className = "profile-card";
  }
  card.innerHTML = `
    <div class="my-pic">
      <img src=${userData[i].image} alt="User Pic" />
    </div>
    <div class="cont-name">
      <h2 class="user-name">${userData[i].firstName} ${userData[i].lastName}</h2>
      <div class="desc-cont">
        <p class="user-desc">${userData[i].aboutSelf}</p>
      </div>
      <div class="resume-btn">
        <button class="res-btn" type="button" id="${userData[i].emailAddress}">View Resume</button>
      </div>
      <div class="buttons-cont">
        <button type="button" class="proj-btn" id="${userData[i].emailAddress}">Projects</button>
        <button type="button" class="exp-btn" id="${userData[i].emailAddress}">Experience</button>
        <button type="button" class="edu-btn" id="${userData[i].emailAddress}">Education</button>
      </div>
    </div>
    <div class="btn-containers">
      <i class="fa-solid fa-trash-can" id="${userData[i].id}"></i>
    </div>
  `;

  // Append the card to the dynamic element
  dynamic.appendChild(card);
}

  }
}

//gettting all the buttons
var projBtns=document.querySelectorAll('.proj-btn');
var expBtns=document.querySelectorAll('.exp-btn');
var edujBtns=document.querySelectorAll('.edu-btn');
var deleteBtns=document.querySelectorAll('.fa-trash-can');

//querySelectorAll will return an array 



//calling function for each object in array of projBtns
projBtns.forEach(function(projBtn){

  //inside the function we add click listner to each object(button) 
  projBtn.addEventListener('click',()=>{

    let pressedBtn="projects";
    //navigate to other page while storing the function and id
    let url=`../UserData/index.html?Btn=${pressedBtn}&id=${projBtn.id}`;

    window.location.href=url;

  });

});



expBtns.forEach((expBtn)=>{

  expBtn.addEventListener('click',(event)=>{

    let pressedBtn="experience";
    let url=`../UserData/index.html?Btn=${pressedBtn}&id=${expBtn.id}`;

    window.location.href=url;
     
  });

});

edujBtns.forEach((eduBtn)=>{
  eduBtn.addEventListener('click',()=>{

    
    let pressedBtn="education";
    let url=`../UserData/index.html?Btn=${pressedBtn}&id=${eduBtn.id}`;

    window.location.href=url;
  });
});