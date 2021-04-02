/** Global variables */
    // Random background option
    let bcgOption = true;
    // Control the background interval
    let controlInterval;
/** Global variables */

/** Check for a local storage background random */
let bcgLocalItem = localStorage.getItem('background_option');
if(bcgLocalItem !== null){
    if(bcgLocalItem === 'true'){
        bcgOption = true;
    }else{
        bcgOption = false;
    }
    // Remove active class
    document.querySelectorAll('.random-bcg span').forEach(element=>{
        element.classList.remove('active');        
    });
    if(bcgLocalItem === 'true'){
        document.querySelector('.yes').classList.add('active');
    }else{
        document.querySelector('.no').classList.add('active');
    }
}
/** Check for a local storage background random */

/** Check for a local storage colors option */
let mainColor = localStorage.getItem('color_option');
if(mainColor !== null){
    document.documentElement.style.setProperty('--main--color',mainColor);
    // The active class in colors list
    document.querySelectorAll('.colors-list li').forEach(elm=>{
        // Remove 
        elm.classList.remove('active');
        // Add to the select color in the localStorage
        if(elm.dataset.color === mainColor){
            elm.classList.add('active');
        }
    });
}
/** Check for a local storage colors option */

/** Toggle spin class on icon */ 
let icon = document.querySelector('.toggle-setting i');
icon.addEventListener("click",function(){
    // Rotation icon
    this.classList.toggle("fa-spin");
    // Show and Hide main settings box
    document.querySelector('.setting-box').classList.toggle('open');

    document.querySelector('.header-area .content').classList.toggle('moved');
});
/** Toggle spin class on icon */ 

/** Switch colors */
const colorsLi = document.querySelectorAll('.colors-list li');
colorsLi.forEach(element => {
    element.addEventListener("click",(event)=>{
        // La couleur du element cliqué
        let colors = event.target.dataset.color;
        // Set color on root
        document.documentElement.style.setProperty('--main--color',colors);
        // Set color on localStorage
        localStorage.setItem('color_option',colors);
        // Remove active class from old childrens
        event.target.parentElement.querySelectorAll('.active').forEach(elm=>{
            elm.classList.remove('active');
        });
        // Add active class on target
        event.target.classList.add('active');
    });
});
/** Switch colors */

/** Switch backgroud */
const randomBcg = document.querySelectorAll('.random-bcg span');
randomBcg.forEach(element => {
    element.addEventListener("click",(event)=>{
        // Remove active class from old childrens
        event.target.parentElement.querySelectorAll('.active').forEach(elm=>{
            elm.classList.remove('active');
        });
        // Add active class on target
        event.target.classList.add('active');

        if(event.target.dataset.status === 'yes'){
            bcgOption = true;
            // Start the function
            randomImages();
            // LocalStorage
            localStorage.setItem('background_option',true); 
        }else{
            bcgOption = false;
            // Clear the interval
            clearInterval(controlInterval);
            // LocalStorage
            localStorage.setItem('background_option',false);
        }
    });
});
/** Switch backgroud */

/** Change the background */ 
//Get the landing Page 
let padingPage  = document.querySelector('.landing-page'); 

//Array of Pictures
let images      = ["2","4","6","16","17"]; 

// Random backgroun function
function randomImages(){
    if(bcgOption === true){
        controlInterval = setInterval(()=>{
            // Random number
            let randomNum  = Math.floor(Math.random()*images.length);
            padingPage.style.background = 'url("imgs/'+images[randomNum]+'.jpg")';
        },4000);
    }
};
randomImages();
/** Change the background */ 

/** Animate skills with scrolling the page */
// Select skills selector
let ourSkills = document.querySelector('.skills');
let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
window.onscroll = function(){
    // Skills offset top
    let skillsOffsetTop = ourSkills.offsetTop;
    // Skills outer height 
    let skillsOuterHeight = ourSkills.offsetHeight;
    // Window height
    let windowHeight = this.innerHeight;
    // Skills offset top
    let windowScrollTop = this.pageYOffset;

    if(windowScrollTop >= ((skillsOffsetTop + skillsOuterHeight) -windowHeight)){
        let allSkills = document.querySelectorAll(".skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width  = skill.dataset.prog + '%';
            skill.innerHTML = '<span id="myprog">'+skill.dataset.prog + '%</span>';
            skill.style.background = localStorage.getItem('color_option');
        });
    }else{
        let allSkills = document.querySelectorAll(".skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width  = 0;
            //skill.style.background = localStorage.getItem('color_option');
        });
    }
};
/** Animate skills with scrolling the page */

/** Pop-up the pictures */
let ourPictures = document.querySelectorAll('.gallery img');
ourPictures.forEach(pic=>{
    pic.addEventListener('click',(event)=>{
        // Create the overlay element
        let overlay = document.createElement('div');
        // Add class to the overlay element
        overlay.className = 'popup-overlay';
        // Apend the element to body
        document.body.appendChild(overlay);
        
        // Create the popup box
        let popupBox = document.createElement('div')
        // Add class to the popup box
        popupBox.className = 'popup-box';
        
        /**  Title of the picture in the popup */
        // Check for the title
        if(pic.alt){
            // Create the hidding
            let picTitle = document.createElement('h3');
            // Add class to the title
            picTitle.className = "picTitle";
            // The context of the title
            let titleContext = document.createTextNode(pic.alt);
            // Append the text to the hidding
            picTitle.appendChild(titleContext);
            // Add the hidding to the popup box
            popupBox.appendChild(picTitle);
        } 
        /** The picture in the popup */
        // Create the image
        let popupImg = document.createElement('img')
        // Get the source from the clicked pictures
        popupImg.src = pic.src;
        // Set image into the popup-box
        popupBox.appendChild(popupImg);

        // Append the popup to the body
        document.body.appendChild(popupBox);
        console.log(popupImg.src);

        /** The close span */
        // Create the element
        let closeBtn = document.createElement('span');
        // Create the contexte
        let closeText = document.createTextNode('X');
        // Append the context to the button
        closeBtn.appendChild(closeText);
        // Add class to this element
        closeBtn.className = "closeBtn";
        // Put the element into the popup box
        popupBox.appendChild(closeBtn);

    });
});
/** Pop up the pictures */

/** Pop hide the pictures */
document.addEventListener('click',(event)=>{
    // Check for closeBtn class
    if(event.target.className === "closeBtn"){
        // Remove the current popup
        event.target.parentNode.remove();
        // Remove the popup-overlay
        document.querySelector('.popup-overlay').remove();
    }
});
/** Pop hide the pictures */

/** Navigation Bullets Logic */
// Select all bullets
const allBullets = document.querySelectorAll(".bullets");

  allBullets.forEach(bullet =>{
      console.log(bullet.dataset);
  });
/** Navigation Bullets Logic */


