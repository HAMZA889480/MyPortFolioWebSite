//Nav Bar Responsive Code
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

//get the userData from local storage
var existingData = JSON.parse(localStorage.getItem("userData")) || [];

//get the admin data
var admins = JSON.parse(localStorage.getItem("adminData")) || [];

//Using Browser local storage to store data
document
  .getElementById("signup-form")
  .addEventListener("submit", function (event) {
    //prevent from reloading for further processing
    event.preventDefault();

    let fName = document.getElementById("firstname").value;
    let lName = document.getElementById("secName").value;
    let email = document.getElementById("email").value;
    let yourRole = document.getElementById("role").value;
    let password = document.getElementById("pass").value;
    let confPassword = document.getElementById("confPassword").value;
    let phone = document.getElementById("phone").value;
    let description = document.getElementById("description").value;

    //console.log(fName+','+lName+','+email+','+password+','+confPassword+','+phone+','+description);
    //if password do not match
    if (password != confPassword) {
      alert("Password Do not Match");
    } else if (!IsEmailUnique()) {
      //Email should be unique
      let reLocation = "";

      if (yourRole == "admin") {
        //admin sign Ups
        let currSize = admins.length;

        const newAdmin = {
          id: (currSize + 1).toString(),
          // id property will be removed. DB assigns the id itself
          image: "",
          firstName: fName,
          lastName: lName,
          emailAddress: email,
          password: password,
          confirmationPass: confPassword,
          phoneNum: phone,
          designation: description,
          role: yourRole,
        };

        admins.push(newAdmin);

        //Store back the updated data to browser local storage
        localStorage.setItem("adminData", JSON.stringify(admins));

        alert("Admin Added!!");

        reLocation = "../Admin/AdminPage/index.html";
      } else {
        //Getting previous data stored if any

        //When connecting to data Base currSize should be removed
        let currSize = existingData.length;

        // console.log(existingData);
        // localStorage.removeItem('userData');
        // existingData = JSON.parse(localStorage.getItem("userData")) || [{}];
        // console.log(existingData);

        const newUser = {
          id: (currSize + 1).toString(),
          // id property will be removed. DB assigns the id itself
          image: "",
          firstName: fName,
          lastName: lName,
          emailAddress: email,
          password: password,
          confirmationPass: confPassword,
          phoneNum: phone,
          designation: description,
          role: yourRole,
          aboutSelf: "",
          social: { linkedIn: "", gitHub: "", whatsapp: "" },
        };

        // console.log(newUser);

        //push data in the arrayree
        existingData.push(newUser);

        //Store back the updated data to browser local storage
        localStorage.setItem("userData", JSON.stringify(existingData));

       alert("User Added");

        //Saving the ID for later data storage
        //Call to API that returns ID fo the sign Up user will occur here
        //Replace this code with fetch ID function when connect to database
        localStorage.setItem("newUserID", currSize + 1);
        localStorage.setItem("signInUserEmail", email);

        reLocation = "../PersonalData/personalData.html";
      }

      //clear the input fields
      document.getElementById("firstname").value = "";
      document.getElementById("secName").value = "";
      document.getElementById("email").value = "";
      document.getElementById("pass").value = "";
      document.getElementById("confPassword").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("description").value = "";

      window.location.href = reLocation;
    } else {
      alert("Email Already taken!!");
    }
  });

function IsEmailUnique() {
  existingData.forEach((obj) => {
    if (obj["emailAddress"] == email) {
      //alert("Email Already Taken");
      return true;
    }
  });

  return false;
}
