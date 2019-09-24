const API_KEY = 'SyMO9VizmZNUtwnmdPPq4G9ZRn0GadRF';
const url = 'https://api.giphy.com/v1/gifs/search';
let limit = 25;
let offset = 0;
const gallery = document.querySelector('.gif-gallery');

document.addEventListener('DOMContentLoaded', function(e) {
  
  giphy('puppies');
  
  document.querySelector('.form-inline').addEventListener('submit', function(event) {
    event.preventDefault();
    gallery.innerHTML = ''
    let searchTerm = document.querySelector('.gif-input').value;
    giphy(searchTerm);
  });
  
  document.getElementById('loadMoreBtn').addEventListener('click', function () {
    let searchTerm = document.querySelector('.gif-input').value;
    offset+=limit;
    giphy(searchTerm);
  });

  //Testing why event.preventDefault is important for form 
  // document.querySelector('testButton'),addEventListener('click', function(event) {
  //   event.preventDefault();
  //   let searchTerm = document.querySelector('.form-control.gif-input').value;
  //   giphy(searchTerm);
  // }); 

})

function giphy (q) {
  fetch (`${url}?q=${q}&api_key=${API_KEY}&limit=${limit}&offset=${offset}`)
    .then((response) => {
      return response.json();
    })
    .then (setImages)
    .catch ((err) => {
      console.log(err);
    })
}

function setImages(response) {
  //console.log(response);
  
  let arr = response.data;
  for (let i = 0; i < arr.length; i++) {
    //console.log(arr[i].images.fixed_height.url);
    let image = document.createElement('img');
    let imgURL = arr[i].images.fixed_height.url;
    image.setAttribute('src', imgURL);
    gallery.appendChild(image);
  }
}


