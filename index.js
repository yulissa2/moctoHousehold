// Household Builder

// Household Database
let householdMembers = [];

// Household Member Object
function Member(age, relationship, smoker) {
  this.age = age;
  this.relationship = relationship;
  this.smoker = smoker;
}

// Add member to household if requirements are met and load members to page
function addMember(){
  // Getting data
  let age = parseInt(document.getElementsByName("age")[0].value, 10);
  let relElem = document.getElementsByName("rel")[0];
  let relationship = relElem.options[relElem.selectedIndex].value;
  let smoker = document.getElementsByName("smoker")[0].checked;

  // Checking requirements
  if (age < 0 || Number.isInteger(age) === false) age = null;
  if (relationship === "") relationship = null;

  // If requirements are fulfilled, add member
  if (age != null && relationship != null) {
    const member = new Member(age, relationship, smoker);
    console.log("new member added");
    householdMembers.unshift(member);
  }

  // Reset form and reload household members
  document.getElementsByName("age")[0].value = "";
  document.getElementsByName("rel")[0].value = "";
  document.getElementsByName("smoker")[0].checked = false;
  reloadMembers();
}

// Delete member from household
function deleteMember(elemId){
  householdMembers.splice(elemId, 1);
  reloadMembers();
}

// Add all members to page
function reloadMembers(){
  // Empty Container
  let container = document.getElementById('household');
  while(container.firstChild) {
      container.removeChild(container.firstChild);
  };

  // Populate Container
  for (let i = 0; i < householdMembers.length; i++) {
    let member = householdMembers[i];
    let memberLi = document.createElement('div');
    let domString = '<div class="container">';
    domString += '<h3>' + member.relationship + ', ' + member.age + '</h3>';
    domString += '<p> Smoker? ' + (member.smoker === true ? 'yes' : 'no') + '</p>';
    domString += '<button onClick="deleteMember(' + i + ')"> X </button></div>';

    memberLi.innerHTML = domString;
    document.getElementById('household').appendChild(memberLi.firstChild);
  };
}

// Save all members and display JSON to page
function submitForm(){
  var jsonString = JSON.stringify(householdMembers);
  var dataCount = Object.keys(JSON.parse(jsonString)).length;

  if (dataCount > 0) {
    var preElem = document.getElementsByTagName('pre')[0];
    preElem.innerHTML = jsonString;
    preElem.style.display = 'block';
  }
}

document.addEventListener('DOMContentLoaded', function () {
    // Container for household member list
    document.body.innerHTML += '<div id="household"></div>';

    // Adds all members[] to page if data exists
    reloadMembers();

    // Form Submission
    let form = document.querySelector('form');
    form.querySelector('button[class="add"]').addEventListener('click', event => {
      console.log("add");
      event.preventDefault();
      addMember();
    });

    form.querySelector('button[type="submit"]').addEventListener('click', event => {
      event.preventDefault();
      submitForm();
    });
});
