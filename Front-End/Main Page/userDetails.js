//get all users record




var UserEmail = localStorage.getItem("signInUserEmail");
var userData=[];

var firstSection=document.getElementById('first-section');

if(firstSection){
getUserData(UserEmail);

displayUserData()

}





function displayUserData(){

    console.log(userData);
    //Getting the required DOM values 
    document.getElementById('my-name').innerHTML=(userData[0].firstName
        +" "+userData[0].lastName);
    document.getElementById('my-role').innerHTML=( "I worked as a " +userData[0].designation);

    document.getElementById('intro-sec').innerHTML=userData[0].role;
    document.getElementById('your-pic').src=userData[0].image;
}



function getUserData(para){


    let users= JSON.parse(localStorage.getItem("userData"));
    let found=false;

    if(Array.isArray(users) && users.length === 0)
    {
        console.log("No User found!!");
    }
    else{

        users.forEach((obj,index) => {
            if(obj.emailAddress==para){
                // console.log(users[index]);

                found=true;

                userData.push(users[index]);
                return; 
            }
            
        });

        if(!found){
        return [];
        }
    }
}