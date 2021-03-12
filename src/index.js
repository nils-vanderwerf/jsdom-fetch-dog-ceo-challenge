
let breeds = [];

  document.addEventListener('DOMContentLoaded', function() {
      loadImages();
      loadBreedOptions();
  })

function loadImages() {
    const imgUrl = 'https://dog.ceo/api/breeds/image/random/4';
    fetch(imgUrl)
        .then(res => res.json())
        .then(results => {
            results.message.forEach(image => addImage(image))
        });
    }

function addImage (dogPicUrl) {
    let container = document.querySelector('#dog-image-container');
    let newImageEl = document.createElement('img');
    newImageEl.src = dogPicUrl;
    container.appendChild(newImageEl);
}

function loadBreedOptions() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all';
    console.log(breedUrl)
    fetch(breedUrl)
    .then(res => res.json())
    .then(results => {
        breeds = Object.keys(results.message);
        updateBreedList(breeds);
        addBreedSelectListener();
    });
}

function updateBreedList(breeds) {
    let ul = document.querySelector('#dog-breeds');
    removeChildren(ul);
    if (breeds.length == 0) {
        addBreed(breeds);
    }
    breeds.forEach(breed => addBreed(breed));
}

//Remove previous ul items
function removeChildren(element) {
    let child = element.lastElementChild;
    //while there are still child elements in the list, remove them
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }
}

function selectBreedsStartingWithLetter(letter) {
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function addBreedSelectListener() {
    let breedDropdown = document.querySelector('#breed-dropdown');
    breedDropdown.addEventListener('change', function(event) {
        selectBreedsStartingWithLetter(event.target.value);
        console.log(event.target.value);
    });
}

function addBreed(breed) {
    let ul = document.querySelector('#dog-breeds');
    let li = document.createElement('li');
    console.log(breeds);
    li.innerText = breed;
    li.style.cursor = 'pointer';
    ul.appendChild(li);
    howManyElements();
    li.addEventListener('click', updateColor);
}

function howManyElements(breed) {
    let thisManyElements = document.querySelectorAll('#dog-breeds li').length;
    console.log(howManyElements.length);
}

function updateColor(event) {
    event.target.style.color = "palevioletred";
}