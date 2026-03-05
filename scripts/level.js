//pronouce feature speaker
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

// get the json level data
const allLevelDAta = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayLevelDAta(json.data));
};

//function to remove active class
const removeActiveClass = () => {
  const allActiveClass = document.querySelectorAll(".active");
  allActiveClass.forEach((e) => {
    e.classList.remove("active");
  });
};

//display words
const wordsDisplay = (id) => {
  //   console.log(id);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  //   console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      const clickedBtnId = document.getElementById(`lvl-btn-${id}`);
      removeActiveClass();
      clickedBtnId.classList.add("active");
      //   console.log(clickedBtnId)
      displayWords(json.data);
    });
};

//adding load modal function to display
const loadModal = async (id) => {
  const ModalUrlDetails = `https://openapi.programming-hero.com/api/word/${id}`;
  const response = await fetch(ModalUrlDetails); //  Changed 'url' to 'response'
  const data = await response.json(); //  Changed 'res' to 'data' and 'url' to 'response'
  displayModal(data.data); // Just log, don't assign
  // Add modal display logic here
};

// now i will display the object in modal
const displayModal = (modalDatas) => {
  console.log(modalDatas);
  const modalDetails = document.getElementById("modal-details-container");
  modalDetails.innerHTML = ` 
  <div class="space-y-4">
      <div>
        <h1 class="text-2xl font-bold">
          ${modalDatas.word} (<span><i class="fa-solid fa-microphone-lines"></i></span>:${modalDatas.pronunciation})
        </h1>
        <p>Meaning</p>
        <p>${modalDatas.meaning}</p>
      </div>

      <div>
        <h1 class="text-xl font-bold">Example</h1>
        <p>${modalDatas.sentence}</p>
      </div>

      <div>
        <h1 class="text-xl font-bold">সমার্থক শব্দ গুলো</h1>
        <div class="space-x-1.5">
          <button class="btn">${modalDatas.synonyms[0]}</button>
          <button class="btn">${modalDatas.synonyms[1]}</button>
          <button class="btn">${modalDatas.synonyms[2]}</button>
        </div>
      </div>
    </div>

`;
  document.getElementById("my_modal_5").showModal();
};

// ekhn page e dynamically display koira dimu data etar jnnw ekta function lekhi
const displayWords = (value) => {
  //   console.log(value);
  // bap re doira niya shi jekhane elemet or card store korbo
  const wordsDisplayContainer = document.getElementById("word-display");
  //    console.log("Before clear:", wordsDisplayContainer.innerHTML); // Check what's there initially
  wordsDisplayContainer.innerHTML = "";
  if (value.length == 0) {
    wordsDisplayContainer.innerHTML = `
       <div class="text-center col-span-full space-y-3.5 p-7">
        <img class="mx-auto" src="./assets/alert-error.png" alt=""> 
        <p class="text-gray-400 ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h1 class="font-bold text-4xl">নেক্সট Lesson এ যান</h1>
      </div>
     `;
    return;
  }

  value.forEach((element) => {
    // console.log(element);
    //create a div where we will store json card value
    const newDiv = document.createElement("div");
    // adding class
    // newDiv.className = "bg-white py-10 px-9 text-center space-y-2"
    //set value to new child
    newDiv.innerHTML = `
     <div class="bg-white py-10 px-9 text-center space-y-2">
 <h1 class="font-bold text-2xl">${element.word ? element.word : "কিছু পাইয়া যায়নি"}</h1>
      <p class="font-bangla"> Meaning /Pronounciation </p>
      <P>${element.meaning ? element.meaning : "মিনিং পাওয়া যায়নি"} / ${element.pronunciation ? element.pronunciation : "প্রোনাউন্সিয়েসন পাওয়া যায়নি।"}  </P>
        <div class="flex justify-between">
        <button class="bg-base-200 rounded-full">
          <i onclick="loadModal('${element.id}')" class="fa-solid fa-circle-info"></i>
        </button>
        <button onclick="pronounceWord('${element.word}')" class="bg-base-200 rounded-full">
         <i class="fa-solid fa-volume-high"></i>
        </button>
      </div>
      </div>
     
    `;
    // console.log(newDiv)

    // append child
    wordsDisplayContainer.appendChild(newDiv);
  });
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
                
                <button id="lvl-btn-${lesson.level_no}" onclick="wordsDisplay(${lesson.level_no})"  class="btn btn-outline btn-primary" >
                <i class="fa-solid fa-book-open"></i>lesson- ${lesson.level_no}
                </button>
    
    `;

    //apppend the elemet into the parent div
    levelContainer.appendChild(lvlNumber);
  }
};

//search feature
const searchBtn = document
  .getElementById("search-btn")
  .addEventListener("click", () => {
    const inputValue = document.getElementById("search-input-lvl").value;

    fetch("https://openapi.programming-hero.com/api/words/all")
      .then((res) => res.json())
      .then((data) => {
        const allWords = data.data;
        const matchValue = allWords.filter((word) => {
          //   console.log(word.word);
          return word.word.toLowerCase().includes(inputValue.toLowerCase()); // word.word
        });
        displayWords(matchValue); // Display the filtered results
      });
  });

allLevelDAta();
