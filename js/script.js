const api_key = 'api_key=0bd3a18560f450a76a32f637f6354d01';
const APIKEY = '0bd3a18560f450a76a32f637f6354d01';
const base_url = 'https://api.themoviedb.org/3';
const img_url = 'https://image.tmdb.org/t/p/w500'

function getcolor(rate){
    if(rate>=8)
    return 'green'
    else if(rate >=5)
    return 'orange'
    else 
    return 'red'
}

const card_det = Array.from(document.querySelectorAll('.mov-wrap'))
const mov_title = document.querySelector('.container-heading')
const sea_res = document.querySelector('.sea-res')
let poster_path;

async function movie_card_fetch(id,i,text){
    card_det[i].innerHTML=''
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=0bd3a18560f450a76a32f637f6354d01&with_${text}=${id}`;
    const resp = await fetch(url)
    const responsed = await resp.json()
    const datas = responsed.results
    console.log(datas)
    let mov_card=''
    datas.forEach(e=>{
      e.poster_path = e.poster_path==null ? `./assets/cinema2.jpg` : `${e.poster_path}`;
        // console.log(e.id)
        mov_card +=`
        <div class="movies-card" data-id=${e.id}>
        <img
        src="${img_url+e.poster_path}"
        alt="${e.title}"
        />

        <h3 class="movie-title">${e.title == 0 ? "N/A" : e.title}</h3>
     <div><span class='${getcolor(e.vote_average)}'>Rating: ${e.vote_average == 0 ? "N/A" : e.vote_average.toFixed(1)}</span></div>
     
     <div class="movie-details" data-id=${e.id}>
        <div><span>Movie Name:</span>${e.title == 0 ? "N/A" : e.title}</div>
        <div><span>Rating:</span><span class="${getcolor(e.vote_average)}"> ${e.vote_average == 0 ? "N/A" : e.vote_average.toFixed(1)}</span></div>
        <div><span>Release Date:</span>${e.release_date == 0 ? "N/A" : e.release_date}</div>
        <div><span>Languages:</span> ${e.original_language == 0 ? "N/A" : e.original_language}</div>
        <button data-id=${e.id}>View</button>
     </div>
     </div>
     `;
    });
    card_det[i].innerHTML = mov_card;
    await mov_link( document.querySelectorAll('.movie-details button'));
    await mov_link2(document.querySelectorAll('.movie-details'));
}

function mov_link(redirect){
    redirect.forEach(d=>{
      d.addEventListener('click',(e)=>{
        window.location=`./movie.html?id=${e.currentTarget.dataset.id}`;
      })
    });
    }

function mov_link2(redirect){
    redirect.forEach(d=>{
        d.addEventListener('click',(e)=>{
            window.location = `./movie.html?id=${e.currentTarget.dataset.id}`
        })
    });
}

// function retSearchResut(url){
//     const resp = await fetch(url)
//     const responsed = await resp.json()
//     const recommendations = responsed.results;
//     recommendations.forEach(data=>{
//       sea_res.innerHTML += `<li class="search-item" data-id=${data.id}>${data.title} - ${data.original_title}</li>`
//     })
// }

movie_card_fetch('en',0,'original_lanugage')
movie_card_fetch(53,1,'genres')
movie_card_fetch('ta',2,'original_language')
movie_card_fetch(10752,3,'genres')
movie_card_fetch(14,4,'genres')
movie_card_fetch(420,5,'companies')
// async function retSearchResut(search_url)

let isDown=false;
let slider_cont=Array.from(document.querySelectorAll('.mov-wrap'));
let startX;
let scrollLeft;
slider_cont.forEach(data=>{
data.addEventListener('mouseup',()=>{
    isDown=false;
    data.style.cursor='initial';
});
data.addEventListener('mousedown',(e)=>{
    startX=e.pageX-data.offsetLeft;
    isDown=true;
    scrollLeft=data.scrollLeft;
    data.style.cursor='initial';
})
data.addEventListener('mouseleave',()=>{
    isDown=false;
    data.style.cursor='initial';
})
data.addEventListener('mousemove',(e)=>{
    if(!isDown) return;
    e.preventDefault();
    const x=e.pageX-data.offsetLeft;
    const walk=(x-startX)*1;
    data.scrollLeft=scrollLeft-walk;
    data.style.cursor='grabbing';
})
data.addEventListener('touchstart',(e)=>{
    startX=e.touches[0].pageX-data.offsetLeft;
    isDown=true;
    scrollLeft=data.scrollLeft;
});
data.addEventListener('touchend',()=>{
    isDown=false;
})
data.addEventListener('touchleave',()=>{
    isDown=false;
})
data.addEventListener('touchmove',(e)=>{
    if(!isDown) return;
    const x=e.touches[0].pageX-data.offsetLeft;
    const walk=(Math.ceil(x)-startX);
    data.scrollLeft=scrollLeft-walk;
})
data.oncontextmenu = function (event) {
    event.preventDefault()
    event.stopPropagation()
    return false
}
});
const arrow_cont=document.querySelectorAll('.arrow-btn');
arrow_cont.forEach((arrow,index)=>{
    const data=arrow.querySelectorAll('svg');
    data.forEach((d,i)=>{
        d.addEventListener('click',
        (e)=>{
            const j=slider_cont[index];
            (i===1)?(j.scrollLeft=j.scrollLeft-(j.scrollLeft%332)+332):(j.scrollLeft%332?j.scrollLeft=j.scrollLeft-(j.scrollLeft%332):j.scrollLeft=j.scrollLeft-(j.scrollLeft%332)-332);
        })
    })
})