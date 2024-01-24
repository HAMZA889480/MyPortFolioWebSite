var existingExperience = JSON.parse(localStorage.getItem("experience")) || [];
//var UserEmail = localStorage.getItem("signInUserEmail");





//This function will add new experience to a specific user on its email bases
function addExperience(para) {
    var type = document.getElementById("exp-type").value;
    var house = document.getElementById("exp-from").value;
    var role = document.getElementById("exp-role").value;
    var time = document.getElementById("exp-duration").value;
    var journey = document.getElementById("exp-journey").value;
  
    let currSize = existingExperience.length;
  
    //House and Role can not be same
    if (IsExpUnique(house, role)) {
      
  
      var newExperience = {
        id: currSize + 1,
        email: para,
        position: role,
        softwareHouse: house,
        workDuration: time,
        workType: type,
        profJourney: journey,
      };
  
      existingExperience.push(newExperience);
    } else {
      alert("Experience already added");
    }
  
    //Clear the input fields
    document.getElementById("exp-type").value = "";
    document.getElementById("exp-from").value = "";
    document.getElementById("exp-role").value = "";
    document.getElementById("exp-duration").value = "";
    document.getElementById("exp-journey").value = "";
  
    //console.log(existingExperience);
  }



  //This function will update a specific expereince. It takes the index number at
//which update is required. So first search the specific index and than call this function
function updateExperience(index) {
  //console.log(index);

  //geeting the updated values from input fields
  let newExpType = document.getElementById("exp-type").value;
  let newExpFrom = document.getElementById("exp-from").value;
  let newExpRole = document.getElementById("exp-role").value;
  let newExpJourney = document.getElementById("exp-journey").value;
  let newExpDuration = document.getElementById("exp-duration").value;

  if (
    newExpFrom == "" ||
    newExpDuration == "" ||
    newExpJourney == "" ||
    newExpType == "" ||
    newExpRole == ""
  ) {
    alert("fill all the spaces");
  } else {
    //the index we get as parameter represents the index at which the id of experience is found
    console.log(existingExperience);

    existingExperience[index].position = newExpRole;
    existingExperience[index].profJourney = newExpJourney;
    existingExperience[index].softwareHouse = newExpFrom;
    existingExperience[index].workDuration = newExpDuration;
    existingExperience[index].workType = newExpType;

    localStorage.setItem("experience", JSON.stringify(existingExperience));

    //Clear the input fileds
    newExpType = "";
    newExpDuration = "";
    newExpFrom = "";
    newExpJourney = "";
    newExpDuration = "";

    alert("Cahnges saved");

    var experience = localStorage.getItem("experience") || [];
    expD = JSON.parse(experience);
    console.log(expD);

    alert('Degree Updated!!');
    window.location.href = "../Main Page/index.html";
  }
}


function deleteExperience(para) {
  //get the experience Data
  let existingExp = JSON.parse(localStorage.getItem("experience")) || [];

  //Match the id using for Each loop
  existingExp.forEach((obj, index) => {
    if (obj.id == para) {
      //splice the data at index where id's will match
      existingExp.splice(index, 1);
      // //modify the data in the local storage
      localStorage.setItem("experience", JSON.stringify(existingExp));
      console.log("Experinece Deleted!!");
      alert("Experienec Deleted!!");
      return;
    }
  });
}




  function saveExperience(){
    console.log("Saving experienec Data");
    

    localStorage.setItem("experience", JSON.stringify(existingExperience));
  }




  function IsExpUnique(house, role) {
    if (existingExperience.length == 0) {
      return true;
    } else {
      existingExperience.forEach((obj) => {
        if (obj["softwareHouse"] == house && obj["position"] == role) {
          return false;
        }
      });
  
      return true;
    }
  }