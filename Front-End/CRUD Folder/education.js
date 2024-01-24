

var existingEducationData = JSON.parse(localStorage.getItem("educationData")) || [];
//var UserEmail = localStorage.getItem("signInUserEmail");


//this function will add education to a specific user on its email basis
function addEducation(paraEmail) {


    //console.log('Add Education Button is clicked');
   // Getting the required DOM elemenst
    var level = document.getElementById("degree-level").value;
    var from = document.getElementById("degree-from").value;
    var major = document.getElementById("major-subjects").value;
    var eduDesc = document.getElementById("edu-desc").value;
  
    //Check that all inputs are given
    if (level == "" || from == "" || major == "") {
      alert("Fill all details");
    }
  
    //Getting all previous
    if (IsLevelUnique(level)) {
      //level is unique
  
      
  
  
      let currSize = existingEducationData.length;
      var newEducation = {
        id: currSize + 1,
        email: paraEmail,
        eduLevel: level,
        eduComments: eduDesc,
        eduFrom: from,
        eduMajor: major,
      };
  
      existingEducationData.push(newEducation);
    } else {
      alert("Info already Added ");
    }
  
    // console.log(existingEducationData);
  
    alert("Education Added!!!");
    document.getElementById("degree-level").value = "";
    document.getElementById("degree-from").value = "";
    document.getElementById("major-subjects").value = "";
    document.getElementById("edu-desc").value = "";
  }


  function updateEducation(para) {
    let searchIndex = "";
  
    //searching for specific index using eduNum
    existingEducationData.forEach((obj, index) => {
      if (obj.id == para) {
        searchIndex = index;
      }
    });
  
    let degLevel = document.getElementById("degree-level").value;
    let degFrom = document.getElementById("degree-from").value;
    let degSubjects = document.getElementById("major-subjects").value;
    let degCommnts = document.getElementById("edu-desc").value;
  
    if (
      degLevel == "" ||
      degFrom == "" ||
      degSubjects == "" ||
      degCommnts == ""
    ) {
      alert("Fill all the fields");
    } else {
      console.log(existingEducationData[searchIndex]);
      existingEducationData[searchIndex].eduComments = degCommnts;
  
      existingEducationData[searchIndex].eduFrom = degFrom;
  
      existingEducationData[searchIndex].eduLevel = degLevel;
  
      existingEducationData[searchIndex].eduMajor = degSubjects;
  
      localStorage.setItem(
        "educationData",
        JSON.stringify(existingEducationData)
      );
  
      degLevel.value = "";
      degFrom.value = "";
      degSubjects.value = "";
      degCommnts.value = "";

      alert('Degree Updated!!');
  
      window.location.href = "../Main Page/index.html";
    }
  }



  function deleteEducation(para) {
    let prvEdu = JSON.parse(localStorage.getItem("educationData")) || [];
  
    let delIndex = "";
    prvEdu.forEach((obj, index) => {
      if (obj.id == para) {
        //splice the data at index where id's will match
        prvEdu.splice(index, 1);
        // //modify the data in the local storage
        localStorage.setItem("educationData", JSON.stringify(prvEdu));
        console.log("Education Deleted!!");
        alert("Education Deleted!!");
        return;
      }
    });
  }







function saveEducation(){

    //stored the data in the local storage.

    console.log("Saving Education data");
    localStorage.setItem(
        "educationData",
        JSON.stringify(existingEducationData)
      );

      
}










  //Check if the same degree details are going to added twice or not
  function IsLevelUnique(level) {
    if (existingEducationData.length == 0) {
      return true;
    } else {
      //using forEach loop to check that level is unique
      existingEducationData.forEach((obj) => {
        console.log(obj.eduLevel);
        if (obj.eduLevel == level) {
          return false; //level found
        }
      });
  
      return true;
    }
  }