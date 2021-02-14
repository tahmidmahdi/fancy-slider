var count = 0;
var count1 = 0;
var arr = [];
const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];

// toggleSpinner();

// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '20264962-f57c90a3606bd03b4a9a5bd09';

// show images 
const showImages = (images) => {

  toggleSpinner();

  // toggleSpinner();
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div)

  })



}







const getImages = (query) => {

  fetch(`https://pixabay.com/api/?key=${KEY}&q=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => showImages(data.hits))
    .catch(err => console.log(err))

}


// const getVideos = (query) => {
//   fetch(`https://pixabay.com/api/videos/?key=20264962-f57c90a3606bd03b4a9a5bd09&q=${query}&pretty=true`)
//     .then(res => res.json())
//     .then(data => showVideos(data.hits))
// }

// const showVideos = (videos) => {
//   const inputText = document.getElementById('search').value
//   getVideos(inputText);
//   console.log(videos);
// }



var searchButton = document.getElementById("search-btn");
var searchField = document.getElementById("search");

searchField.addEventListener("keypress", function (event) {
  // event.preventDefault();
  // console.log('keycode', event.key, event.keyCode);
  if (event.key === 'Enter') {
    count++;
    // console.log('enter',count1);
    toggleSpinner();
    searchButton.click();

  }
});





let slideIndex = 0;
const selectItem = (event, img) => {
  // console.log(event.target);
  let element = event.target;
  element.classList.add('added');

  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
    // console.log('sliders: ',sliders);
  }
  else {

    const addedHide = document.getElementsByClassName('added');
    element.classList.remove('added')
    sliders.pop(img)

    // for (let i = 0; i < sliders.length; i++) {
    //   if(event == sliders[i]){
    //     console.log('***********************************************************');

    //     // sliders[i].pop(img);
    //     // console.log(sliders[i])
    //   }
    //   // else{
    //   //   arr[i] = sliders[i];
    //   //   console.log(arr[i]);
    //   //   sliders[i] = arr[i];
    //   // }

    // }
  }
}



var timer = 1;
const createSlider = () => {

  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }
  // crate slider previous next area
  sliderContainer.innerHTML = '';  //sliderContainer holds slider images
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  // hide image aria
  imagesArea.style.display = 'none';

  // takes slider duration and handle duration calculation
  let duration = document.getElementById('doration').value || 1000;

  // if the duration value is negative then it converts it into positive 
  if (duration < 0) {
    duration = -1 * duration;
  }
  sliders.forEach(slide => {
    let item = document.createElement('div')
    item.className = "slider-item";
    item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
    sliderContainer.appendChild(item)
  })

  changeSlide(0)
  timer = setInterval(function () {
    slideIndex++;
    changeSlide(slideIndex);
  }, duration);
  toggleSpinner();



  const textTyped = document.getElementById('search').value;
  fetch(`https://pixabay.com/api/videos/?key=20264962-f57c90a3606bd03b4a9a5bd09&q=${textTyped}&pretty=true`)
    .then(response => response.json())
    .then(data => getVideo(data.hits))
    .catch(err => console.log(err))
  const getVideo = (videos) => {
    videos.forEach(video => {
      const videoControls = video.videos.large.url;
      // const mainDiv = document.getElementById('video');
      // const dDiv = document.getElementById('vDiv');
      // const play = `<video controls>
      //   <source src="${videoControls}" >
      //   </video>`
      // dDiv.appendChild(play)
      console.log(videoControls);
      const videoDiv = document.getElementById('video-div');
      const videoDivNew =  document.createElement('div')
      videoDivNew.innerHTML = `<video width="320" height="240" controls>
      <source src="${videoControls}" type="video/mp4">
      </video>
    `
      videoDiv.appendChild(videoDivNew);

    })



  
  }
}

// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}

searchBtn.addEventListener('click', function () {
  // count++;
  document.querySelector('.main').style.display = "none";


  if (count >= 1) {
    console.log('already Entered')
  }
  else {
    toggleSpinner();
  }

  clearInterval(timer);
  const search = document.getElementById('search');

  getImages(search.value)
  sliders.length = 0;


})

sliderBtn.addEventListener('click', function () {
  toggleSpinner();
  createSlider();
})

// const toggleSlider = (show) => {

// }


const toggleSpinner = () => {
  const spinner = document.getElementById('loading-spinner');
  spinner.classList.toggle('d-none');
}
// const toggleSpinnerBtn = () => {
//   const spinner = document.getElementById('loading-spinner');
//   spinner.classList.toggle('d-none');
// }