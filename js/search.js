// const api_key = '0bd3a18560f450a76a32f637f6354d01';
// const base_url = 'https://api.themoviedb.org/3';
// const img_url = 'https://image.tmdb.org/t/p/w500'

// const trend_url = base_url + '/discover/movie?sort_by=popularity.desc&api_key=' + api_key;
/*--search--*/
const main = document.querySelector('.main')
const form = document.getElementById('form')
const search_url= base_url + '/search/movie?' + api_key;
const search = document.getElementById('search')
const searching = document.querySelector('.searching')
const mov_card_title = document.querySelector('.fav h1')
const mov_home_btn = document.querySelector('.button')
const mov_home_btn2 = document.querySelector('.button1')
// const arrow = document.querySelector('.movies-cont .arrow-btn')

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchArea = search.value;
    console.log(searchArea)
    if(searchArea){
        getSearch(search_url+'&query='+searchArea)
        // console.log(search_url+'&query='+searchArea)
    }
    else{
        getTrending(trend_url);
    }
})

async function getSearch(url){
    const resp = await fetch(url)
    const responsed = await resp.json()
    showSearch(responsed.results);
}

async function showSearch(datas){

    mov_card_title.innerHTML = `Search Results..`
    mov_home_btn.innerHTML = `<button onClick="window.location.href=window.location.href">Back To Home</button>`
    mov_home_btn2.innerHTML = `<button onClick="window.location.href=window.location.href">Back To Home</button>`
    let mov_card=''

    datas.forEach(e=>{
        mov_card+=
        `<div class="movies-card">
        ${returnPostImg(e.poster_path)}
        

        <h3 class="movie-title">${e.title}</h3>
     <div><span class='${getcolor(e.vote_average)}'>Rating: ${e.vote_average.toFixed(1)}</span></div>
     
     <div class="hidden-movie-det" data-id=${e.id}>
        <div><span class='hl'>Movie Name:</span>${e.title}</div>
        <div><span class='hl'>Rating:</span><span class="${getcolor(e.vote_average)}">${e.vote_average.toFixed(1)}</span></div>
        <div><span class="hl">Release Date:</span>${e.release_date}</div>
        <div><span class="hl">Languages:</span> ${e.original_language}</div>
        <button data-id=${e.id}>See More</button>
     </div>
     </div>`;

    })
    
    function returnPostImg(poster){
        return poster =
        poster == null ?
        `<img src = ./assets/cinema.jpg>`:
        `<img src = https://image.tmdb.org/t/p/original${poster}>`;
    }

    main.innerHTML=mov_card;
    main.classList.add('main-sea')

    await updater_1( document.querySelectorAll('.hidden-movie-det button'));
    await updater_2(document.querySelectorAll('.hidden-movie-det'));

    function updater_1(button_redirect){
        button_redirect.forEach(d=>{
          d.addEventListener('click',(e)=>{
            window.location=`./movie.html?id=${d.dataset.id}`;
          })
        });
        }
    
    function updater_2(button_redirect){
            button_redirect.forEach(d=>{
              d.addEventListener('click',(e)=>{
                window.location=`./movie.html?id=${e.currentTarget.dataset.id}`;
              })
            });
            }

//     arrow.innerHTML=`<div class="arrow-btn">
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
// </div> `

}
