const menu = document.querySelector('.menu')
const links  = document.querySelector('.nav-links')
const movie_objective = document.getElementById('objective'); 
function objective(id) {
  movie_objective.classList.add('active')
  const url  = `${base_url}/movie/${id}` ; 
  fetch(url,options).then(res=> res.json()).then((json)=> {

movie_objective.innerHTML =
 `
 <i class="fa-solid fa-xmark cancel" ></i>

 <div class="movie_card" id="ave" style="background-image: url(${base_img}/${json.backdrop_path});">
 <div class="info_section">
   <div class="movie_header">
     <img class="locandina" src=${base_img}/${json.poster_path}/>
     <h1>${json.original_title}</h1>
     <h4>${json.release_date}</h4>
     <span class="minutes">134 min</span>
     <p class="type">${json.genres[0].name}, ${json.genres[1].name}, ${json.genres[2].name}</p>
   </div>
   <div class="movie_desc">
     <p class="text">
       ${json.overview}
     </p>
   </div>
   <div class="movie_social">
     <ul>
       <li> ${json.original_language}</li>
       <li><i class="fa-solid fa-share-nodes"></i></li>
       <li><i class="fa-solid fa-heart"></i></li>
     </ul>
   </div>
 </div>
 <div class="blur_back ave_back"></div>
</div>
                `
          })

 
}
window.onload =  function() {
  const trailer_btns = document.querySelectorAll('.box .start')
  const movie_card  = document.querySelectorAll('.movie-card')
  trailer_btns.forEach((btn)=>{
    btn.addEventListener('click', toggleVideo)
  })

  movie_card.forEach((card)=>{
    card.addEventListener('click', (e)=>{
      e.preventDefault()
      objective(+card.id)
    })
  })
};

const toggleClass = ()=>{
  links.classList.toggle('show-links');
}
menu.addEventListener("click", toggleClass)


function toggleVideo(){
  const trailer  = document.querySelector('.trailer')
  const video    = document.querySelector('.trailer video')
  video.pause() ; 
  trailer.classList.toggle('active');
}

function toggleSummary(){
  const summary  = document.querySelector('.movie-objective')
  summary.classList.toggle('active');
}


var swiper = new Swiper(".swiper-container", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 20,
    stretch: 0,
    depth: 350,
    modifier: 1,
    slideShadows: true
  }
});


 
var swiper = new Swiper(".slide-content", {
  grabCursor: true,
  slidesPerView: 5,
  spaceBetween: 10,
  loop: true,
  centerSlide: 'true',
  fade: 'true',
  grabCursor: 'true',
  pagination: {
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints:{
      0: {
          slidesPerView: 1,
      },
      520: {
          slidesPerView: 2,
      },
      950: {
          slidesPerView: 4, 
      },
  },
});






function changeBG(bg, title){
  const landing  = document.querySelector('.landing')
  const content  = document.querySelectorAll('.movie-section')
  landing.style.background = ` url("${bg}")`
  landing.style.backgroundSize = 'cover'
  landing.style.backgroundPosition = 'center'
  landing.style.backgroundAttachment = 'fixed'

  content.forEach(content=>{
    content.classList.remove('active')
    if(content.classList.contains(title)){
      content.classList.add('active');
    }
  })

} 


const api_key  = '89ed3b578c7ac07a12f404d7dc06289b' ; 
const access_token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWVkM2I1NzhjN2FjMDdhMTJmNDA0ZDdkYzA2Mjg5YiIsInN1YiI6IjY0ZWZhMmRmNzdkMjNiMDEwZDZiM2YxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.trhdS-yaMoenpyLCSnqlx2AaNmKJuD151YvWrcldIvM'
const base_url = 'https://api.themoviedb.org/3' ; 
const get_movies = '/discover/movie' ; 
const base_img = 'https://image.tmdb.org/t/p/w500'
const api_url = `${base_url}/${get_movies}?api_key=${api_key}` ; 





const options = {
  method: "GET", 
  headers:{
    accept: 'application/json', 
    Authorization: `Bearer ${access_token}`
  }
}



const fetch_movies = async (api)=>{
    const p1  = await fetch(`${base_url}/movie/popular?api_key=${api_key}&page=1` );
    const p2  = await fetch(`${base_url}/movie/popular?api_key=${api_key}&page=2` );
    const res1 = await p1.json(); 
    const res2 = await p2.json();
    const allMovies = [...res1.results, ...res2.results]
    print_data(allMovies) ;
    BG() ; 
    get_movie_details(allMovies)

  }


const get_movie_details = (movies)=>{
  const popular = document.getElementById('popular')
  const tops  = document.getElementById('tops')
  const trailers  = document.getElementById('trailers');

  const popular_movies = movies.filter(movie=> movie.popularity  < 700);
  const top_rated   = movies.filter(movie=> movie.vote_average >= 7); 
  const latest_movies = movies.filter(movie=> new Date(movie.release_date) >= new Date().getDate() - 10);


  popular_movies.map((movie)=>{
    console.log(movie);
    const url  = `${base_url}/movie/${movie.id}` ; 
    fetch(url,options).then(res=> res.json()).then((json)=> {

  popular.innerHTML +=
   `
  <div class="movie-card  swiper-slide" id = ${movie.id}>
              <i id="show-movie" class="fa-solid fa-circle-info show-movie"> </i>
              <div class='movie-box'>
              <i id="box-menu" class="fa-solid fa-list list"> </i>  
              <ul class="user-list">
                <li><i class="fa-solid fa-light fa-list"></i><div>Add To list </div></li>
                <li><i class="fa-solid fa-heart"></i><div>Faviorite </div></li>
                <li><i class="fa-solid fa-bookmark"></i><div>Watch List </div></li>
                <li><i class="fa-regular fa-star"></i><div>Your Rate </div></li>
              </ul>
              </div>
                <div class="content-card">
                  <img src=${base_img}/${json.poster_path}>
                  <span class="shadow"></span>
                  <div class="content">
                    <h1>${json.original_title}</h1>
                    <div class = "date">
                      <p class="date">${json.release_date}</p>
                    </div>
                    <div class="rate">
                    <div>IMDB</div>
                    <div> ${json.vote_average} </div>
                    </div>
                    <div class="hex-tag">
                      <div class="tag">
                      ${json.genres[0].name}
                      </div>
                      <div class="tag">
                      ${json.genres[1].name}
                      </div>
                    </div>
                  </div>
                  </div>
                  </div>
                  `
            })
    
  })

  top_rated.map(movie=>{
    const url  = `${base_url}/movie/${movie.id}` ; 
    fetch(url,options).then(res=> res.json()).then((json)=> {
      tops.innerHTML +=
      `
      <div class="movie-card  swiper-slide" id = ${movie.id}>
      <div class='movie-box'>
      <i id="box-menu" class="fa-solid fa-list"></i>
      
      <ul class="user-list">
        <li><i class="fa-solid fa-light fa-list"></i><div>Add To list </div></li>
        <li><i class="fa-solid fa-heart"></i><div>Faviorite </div></li>
        <li><i class="fa-solid fa-bookmark"></i><div>Watch List </div></li>
        <li><i class="fa-regular fa-star"></i><div>Your Rate </div></li>
      </ul>
      </div>    
      <div class="content-card">
        <img src=${base_img}/${json.poster_path}>
        <span class="shadow"></span>
        <div class="content">
          <h1>${json.original_title}</h1>
          <div class = "date">
            <p class="date">${json.release_date}</p>
          </div>
          <div class="rate">
          <div>IMDB</div>
           <div> ${json.vote_average} </div>
          </div>
          <div class="hex-tag">
            <div class="tag">
            ${json.genres[0].name}
            </div>
            <div class="tag">
            ${json.genres[1].name}
            </div>
          </div>
        </div>
      </div>
  
    </div>
      `

    }

    
    )
    
  })

  latest_movies.map(movie=>{

    const url  = `${base_url}/movie/${movie.id}` ; 
    fetch(url,options).then(res=> res.json()).then((json)=> {
      trailers.innerHTML +=
      `
      <div class="box">
      <div class='movie-box'>
      <i id="box-menu" class="fa-solid fa-list"></i>
      
      <ul class="user-list">
        <li><i class="fa-solid fa-light fa-list"></i><div>Add To list </div></li>
        <li><i class="fa-solid fa-heart"></i><div>Faviorite </div></li>
        <li><i class="fa-solid fa-bookmark"></i><div>Watch List </div></li>
        <li><i class="fa-regular fa-star"></i><div>Your Rate </div></li>
      </ul>
      </div>
      <i class="fa-solid fa-play start" id="start"></i>
      <div class="poster"> <img src=${base_img}/${json.poster_path}></div>
      <div class="titles">
        <h5>${json.original_title}</h5>
        <h6>${json.release_date}</h6>
      </div>
    </div>
      `

    }

    
    )
    
  })
}



const print_data = (movies)=>{
    const content = document.querySelector('.content'); 
    const main_slider = document.getElementById('main-slider'); 
    movies.map(movie=>{

      content.innerHTML += 
      `
      <div class = "movie-section ${(movie.original_title).split(' ').join('-')}" >
          <h3 class="title">${movie.original_title}</h3>
          <div class="movie-details">
            <span>IMDB</span><span>${movie.vote_average} (${movie.vote_count})</span><span>1 hour 55 minutes</span><span>SCI-FI</span>
          </div>
          <div class="summary">
            ${movie.overview}
          </div>
          <div class="btns">
            <div class="trailer-btn">
              <i class="fa-solid fa-circle-play"></i>
              <div class="play" onclick="toggleVideo()">Watch Trailer</div>
            </div>
            <div class="watch-btn">
              <i class="fa-solid fa-circle-play"></i>
              <div class="play">Watch Now</div>
            </div>
          </div>
        </div>
      `

        main_slider.innerHTML +=
         `
              <div class="swiper-slide">
                <div class="picture">
                  <img src=${base_img}/${movie.poster_path} alt="${(movie.original_title).split(' ').join('-')}">
                </div>
              </div>
        
        `
    })


}

const BG  = ()=>{
  const slides = document.querySelectorAll('.picture img')
  for(let i = 0; i  < slides.length; i++){
      slides[i].addEventListener("click", ()=>{
              changeBG(slides[i].src , slides[i].alt)

      })
  }
}

const movie_container = document.querySelector('.movie-container');
const close_search = document.querySelector('.close'); 
movie_container.style.right = '-100%'; 
const search_form = document.getElementById('search_form');
const search_button  =  document.querySelector('.search');
const search_input = document.getElementById('search'); 

search_form.addEventListener('submit', (e)=>{
  e.preventDefault(); 
  const url = `${base_url}/search/movie?query=${this.search.value}`
  movie_container.style.right = '0';
  movie_container.style.width = '100%'; 
  close_search.style.display = 'block';
  movie_container.innerHTML = ''
  fetch(url, options).then(res=> res.json()).then(json=> (json.results).map(result=>{
    movie_container.innerHTML += `
    <div class="box">
    <div class='movie-box'>
    <i id="box-menu" class="fa-solid fa-list"></i>
    
    <ul class="user-list">
      <li><i class="fa-solid fa-light fa-list"></i><div>Add To list </div></li>
      <li><i class="fa-solid fa-heart"></i><div>Faviorite </div></li>
      <li><i class="fa-solid fa-bookmark"></i><div>Watch List </div></li>
      <li><i class="fa-regular fa-star"></i><div>Your Rate </div></li>
    </ul>
    </div>
    <i class="fa-solid fa-play"></i>
    <div class="poster"> <img src=${base_img}/${result.poster_path}></div>
    <div class="titles">
      <h5>${result.original_title}</h5>
      <h6>${result.release_date}</h6>
    </div>
  </div>
    `

  }))


})


close_search.addEventListener('click', ()=>{
  const search_block =   document.querySelector('.movie-container')
  search_block.style.right = '-400%'
  close_search.style.display = 'none' ;
}) 





fetch_movies(api_url) ; 
