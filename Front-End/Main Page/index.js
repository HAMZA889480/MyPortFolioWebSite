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



var knowMoreBtn=document.getElementById('know-btn');
if(knowMoreBtn){
  knowMoreBtn.addEventListener('click',()=>{

    //get the specific section
    document.getElementById('about-section').scrollIntoView({behavior:"smooth"});
  });
}


var resumeBtn=document.getElementById('resume-btn');

if(resumeBtn){
  resumeBtn.addEventListener('click',()=>{

    window.location.href="../UserPage/resume.html";
  });

}



//Social media functions
var emailID=document.getElementById("email-link");

if(emailID){
emailID.addEventListener("click", () => {
  console.log("This is from email link button");

  // Replace 'your.email@gmail.com' with the actual Gmail address you want to link to
  var email = "az889480@gmail.com";

  // Replace 'Subject' and 'Body' with the desired subject and email body
  var subject = "This is the subject of my email";
  var body = "Hello,\n\nI want to contact you about...";

  // Construct the mailto link
  var mailtoLink =
    "mailto:" +
    email +
    "?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(body);

  // Open the user's default email client
  window.location.href = mailtoLink;
});
}

var linkedIn=document.getElementById("linkedIn-page");

if(linkedIn){
linkedIn.addEventListener("click", () => {
  console.log("Linked In button is clicked");
  var linkedIn = "https://www.linkedin.com/in/ameer-hamza-645930243";

  window.location.href = linkedIn;
});
}

var whatsapp=document.getElementById("gitHub-page");
if(whatsapp){
whatsapp.addEventListener("click", () => {
  var gitHub = "https://github.com/HAMZA889480";
  window.location.href = gitHub;
});

}








//gettting the stored values
var personalData = localStorage.getItem("userData") || [];

//var existingEducationData = localStorage.getItem("educationData") || [];






//Load card, Project and education dynamiaclly























//Add More Project
var element5=document.getElementById('add-project');
element5.addEventListener('click',()=>{

  window.location.href='../projectPage/projects.html';
});

