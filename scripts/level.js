// console.log("im level ");

// get the json level data

const allLevelDAta = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayLevelDAta(json.data));
};

const displayLevelDAta = (lessonDatas) => {
  // console.log(lessonDatas)
  // bap re doira niya ashi
  const levelContainer = document.getElementById("lvl-container");
  levelContainer.innerHTML = "";
  //loop chalaiya evry element re access korbo
  for (const lesson of lessonDatas) {
    // console.log(lesson.level_no)
    //create a pola to store these level serial taken from json
    const lvlNumber = document.createElement("div");
    //insewrting values
    lvlNumber.innerHTML = ` 
                
                <button class="btn btn-outline btn-primary" >
                <i class="fa-solid fa-book-open"></i>lesson- ${lesson.level_no}
                </button>
    
    `;

    //apppend the elemet into the parent div 
    levelContainer.appendChild(lvlNumber)
  }
};

allLevelDAta();
