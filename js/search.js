// const api_key = '0bd3a18560f450a76a32f637f6354d01';
// const base_url = 'https://api.themoviedb.org/3';
// const img_url = 'https://image.tmdb.org/t/p/w500'

/*--search--*/

const main = document.querySelector('.main')
const form = document.getElementById('form')
const search_url= base_url + '/search/movie?' + api_key;
const search = document.getElementById('search')
const searching = document.querySelector('.searching')
const mov_card_title = document.querySelector('.fav h1')
const mov_home_btn = document.querySelector('.button')
const mov_home_btn2 = document.querySelector('header nav')

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
    // searchresult.innerHTML = '';
    const resp = await fetch(url)
    const responsed = await resp.json()
    // console.log(responsed.results)
    showSearch(responsed.results);
}

async function showSearch(datas){

    mov_card_title.innerHTML = `Search Results..`
    mov_home_btn.innerHTML = `<button onClick="window.location.href=window.location.href">Back To Home</button>`
    mov_home_btn2.innerHTML = `
    <svg xmlns="http:/  /www.w3.org/2000/svg" viewBox="0 0 512 512">! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.<path d="M448 32H361.9l-1 1-127 127h92.1l1-1L453.8 32.3c-1.9-.2-3.8-.3-5.8-.3zm64 128V96c0-15.1-5.3-29.1-14-40l-104 104H512zM294.1 32H201.9l-1 1L73.9 160h92.1l1-1 127-127zM64 32C28.7 32 0 60.7 0 96v64H6.1l1-1 127-127H64zM512 192H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192z"/></svg>
    <button onClick="window.location.href=window.location.href">Back To Home</button>`
    
    let mov_card=''

    datas.forEach(e=>{
        mov_card+=
        `<div class="movies-card">
        ${returnPostImg(e.poster_path)}
        

        <h3 class="movie-title">${e.title == 0 ? "N/A" : e.title}</h3>
     <div><span class='${getcolor(e.vote_average)}'>Rating: ${e.vote_average == 0 ? "N/A" : e.vote_average.toFixed(1)}</span></div>
     
     <div class="movie-details" data-id=${e.id}>
        <div><span class='hl'>Movie Name:</span>${e.title == 0 ? "N/A" : e.title}</div>
        <div><span class='hl'>Rating:</span><span class="${getcolor(e.vote_average)}">${e.vote_average == 0 ? "N/A" : e.vote_average.toFixed(1)}</span></div>
        <div><span class="hl">Release Date:</span>${e.release_date == 0 ? "N/A" : e.release_date}</div>
        <div><span class="hl">Languages:</span> ${e.original_language == 0 ? "N/A" : e.original_language}</div>
        <button data-id=${e.id}>View</button>
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

    await updater_1( document.querySelectorAll('.movie-details button'));
    await updater_2(document.querySelectorAll('.movie-details'));

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
}
