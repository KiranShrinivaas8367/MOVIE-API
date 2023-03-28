const params = new URLSearchParams(window.location.search);
const id = params.get('id');
// const id = 835017;
// console.log(id)
const mov_details={};

/*----URL----*/
const common_url= `https://api.themoviedb.org/3/movie/${id}?api_key=0bd3a18560f450a76a32f637f6354d01&append_to_response=credits,videos,images,credits,watch/providers`
const mov_img_url = `https://api.themoviedb.org/3/movie/${id}/images?api_key=0bd3a18560f450a76a32f637f6354d01`
const casting_url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=0bd3a18560f450a76a32f637f6354d01&append_to_response=credits`
const recommend_url = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=0bd3a18560f450a76a32f637f6354d01`
const trailer_url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=0bd3a18560f450a76a32f637f6354d01`

/*----query selector----*/
const nav_det = document.querySelector('.nav-header')
const mov_poster = document.querySelector('.pos_image img')
const cont_background = document.querySelector('.pos_backgd')
const mov_det = document.querySelector('.pos_mov_det')
const cast_det = document.querySelector('.arr-slide')
const recommendation = document.querySelector('.rec-slide')
const plot = document.querySelector('.movie_plot')
const video = document.querySelector('.media .video')
// const production = document.querySelector('.header .prod-name')
const provider = document.querySelector('.header')

function getcolor(rate){
    if(rate>=8)
    return 'green'
    else if(rate >=5)
    return 'orange'
    else 
    return 'red'
}

// function mov_link(link_redirect){
//     link_redirect.forEach(d=>{
//         d.addEventListener('click',(e)=>{
//             window.location=`./movie.html?id=${e.currentTarget.dataset.id}`;
//         })
//     })
// }

async function common_det_fetch(){
    resp = await fetch(common_url)
    responsed =await resp.json()
    mov_details["title"] = responsed.title;
    mov_details['original_title']=responsed.original_title;
    console.log(`${mov_details['title']}`)
    responsed.status === "Released"
    ?
    ((mov_details['status'] = true),
    (mov_details['runtime'] = responsed.runtime)):
    (mov_details['status']=false);
    console.log(`${mov_details['runtime']}`)
    mov_details['overview']=responsed.overview;
    mov_details['runtime']=responsed.runtime;
    mov_details['release_date']=responsed.release_date;
    mov_details['budget']=responsed.budget;
    mov_details['rating']=responsed.vote_average;
    mov_details['genres']=responsed.genres;
    mov_details['poster_path']=responsed.poster_path;
    // console.log(responsed.poster_path)
    mov_details['language']=responsed;
    mov_details['tagline']=responsed.tagline;
    mov_details['images']=responsed.poster_path;
    mov_details['provider'] = responsed["watch/providers"].results['IN'];
    // console.log(mov_details['provider'])
    mov_details['logo']=responsed.images;
    console.log(responsed.images)

    mov_details['productions'] = responsed.production_companies;
    console.log(responsed.production_companies)

    mov_details['cast']=responsed.credits.cast;
    console.log(mov_details['cast'])

    resp = await fetch(recommend_url);
    responsed = await resp.json();
    mov_details['recommend']=responsed.results;
    // console.log(mov_details['recommend'])

    resp = await fetch(trailer_url)
    responsed = await resp.json()   
    mov_details['trailer'] = responsed.results;
    console.log(mov_details['trailer'])
}

function nav_ele_upd(){
    nav_det.innerHTML=`
    
        <div class="header-1">
            <h1 class="movie-title-nav">${mov_details['title'] == 0 ? "N/A" : mov_details['title']}</h1>
            <div class="details">
            <div class="run">${mov_details['runtime'] == 0 ? "N/A" : mov_details['runtime']} mins</div>
            <div class="release">${mov_details['release_date'] == 0 ? "N/A" : mov_details['release_date']}</div>
            </div>
        </div>

        <div class="header-2">
            ${returnLogo()}
        </div>

        <div class="header-3">
            <div class="movie-rate">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                <div class="rating">
                    <span class='${getcolor(mov_details['rating'])}'>${mov_details['rating'] == 0 ? "N/A" : mov_details['rating'].toFixed(1)}</span>/10
                </div>
            </div>
            
            <div class="movie-lang">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M0 128C0 92.7 28.7 64 64 64H256h48 16H576c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H320 304 256 64c-35.3 0-64-28.7-64-64V128zm320 0V384H576V128H320zM178.3 175.9c-3.2-7.2-10.4-11.9-18.3-11.9s-15.1 4.7-18.3 11.9l-64 144c-4.5 10.1 .1 21.9 10.2 26.4s21.9-.1 26.4-10.2l8.9-20.1h73.6l8.9 20.1c4.5 10.1 16.3 14.6 26.4 10.2s14.6-16.3 10.2-26.4l-64-144zM160 233.2L179 276H141l19-42.8zM448 164c11 0 20 9 20 20v4h44 16c11 0 20 9 20 20s-9 20-20 20h-2l-1.6 4.5c-8.9 24.4-22.4 46.6-39.6 65.4c.9 .6 1.8 1.1 2.7 1.6l18.9 11.3c9.5 5.7 12.5 18 6.9 27.4s-18 12.5-27.4 6.9l-18.9-11.3c-4.5-2.7-8.8-5.5-13.1-8.5c-10.6 7.5-21.9 14-34 19.4l-3.6 1.6c-10.1 4.5-21.9-.1-26.4-10.2s.1-21.9 10.2-26.4l3.6-1.6c6.4-2.9 12.6-6.1 18.5-9.8l-12.2-12.2c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l14.6 14.6 .5 .5c12.4-13.1 22.5-28.3 29.8-45H448 376c-11 0-20-9-20-20s9-20 20-20h52v-4c0-11 9-20 20-20z"/></svg>
                <div class="language">${mov_details['language'] == 0 ? "N/A" : mov_details['language'].spoken_languages[0].english_name}</div>
            </div>
            
        </div>`
}

function returnLogo(){
    let logo = mov_details['logo'].logos.find((logo)=>logo.iso_639_1 == 'en')
    logo = logo ? `<img src="https://image.tmdb.org/t/p/original${logo.file_path}" class="logo" loading="lazy">`: '';
    return logo;
}

async function post_cont_upd(){
    let genre = returnGenre();
    cont_background.innerHTML=`
        <div class="pos_container">
                <div class="pos_con">
                    <div class="pos_img_det">

                        <div class="pos_image">
                        ${returnPoster()}
                        <p class="movie_line">${mov_details['tagline']}</p>
                        </div>

                        <div class="pos_movie_det">
                            <div class="movie-title">
                                <h2>Original Name: <span class="mov_value">
                                ${mov_details.original_title === 0 ? "N/A" : mov_details.original_title}</span></h2>
                                
                            </div>

                            <div class="movie-title">
                                <h2>Release Date: <span class="mov_value">${mov_details.release_date === 0 ? "N/A" : mov_details.release_date}</span></h2>
                                
                            </div>
                            <div class="movie-title">
                                <h2>Duration: <span class="mov_value">${mov_details.runtime === 0 ? "N/A" : mov_details.runtime} mins</span></h2>
                                
                            </div>
                            <div class="movie-title">
                                <h2>Budget: <span class="mov_value">${
                                    mov_details.budget === 0 ? "N/A" : mov_details.budget
                                  }</span></h2>
                        
                            </div>
                        
                            <div class="movie-title_gen">
                            <!--<h2>Genre:</h2>-->
                            ${genre}
                            </div>

                        </div>
                    </div>
                </div>
        </div>`
}

function returnGenre(){
    genres=mov_details['genres']
    mov_genres = genres.map((genre)=>{
        return `<div class="mov_value">${genre.name}</div>` 
    }).join('');
    return mov_genres;
}

function returnPoster(){
    return !(mov_details['images'])
    ? `<img src="/assets/cinema2.jpg" alt="movie-img">`:
    `<img src="https://image.tmdb.org/t/p/original${mov_details["images"]}" alt="movie-img">`;
}

function overview_disp(){
    plot.innerHTML=`
    <div class="movie_plot">
            <h2>Description</h2>
            <p>${mov_details['overview']}</p>
        </div>`
}

function casting_upd(){
    let card=`
    <div class="start-drag" data-value="cast"></div>
    <div class="end-drag" data-value="cast"></div>`;
    console.log(mov_details['cast'])
    mov_details.cast.forEach((credit)=>{
        card+=castCard(credit.name,credit.character,credit.profile_path)
    })
    cast_det.innerHTML = card;
}

function castCard(name, character, profile) {
    console.log()
    profile =
      profile == null
        ? `<img class="card__img nouser" src="./assets/no_profile.jpg" alt="">`
        : `<img class="card__img" src="https://image.tmdb.org/t/p/original${profile}" alt="">`;

        character=
        character==0
        ? `N/A`:`${character}`

    return `  <div class="cast-card card">
                ${profile}
                <div class="card-details">
                    <h2 class="cast-name">${name}</h2>
                </div>
                <div class="char-name">as ${character}</div>
              </div>`;
  }

  function recommend_upd(){
      let movies = mov_details['recommend']
      let cards = "";
      console.log(movies)
      movies.forEach(async(movie)=>{
          let res_mov=await returnRecommend(movie.poster_path,
            movie.title,
            movie.vote_average,
            movie.id,
            movie.release_date,
            movie.original_language);
          cards+=res_mov;
          recommendation.innerHTML=cards;
          await mov_link(document.querySelectorAll('.hidden-movie-det button'));
          await mov_link2(document.querySelectorAll('.hidden-movie-det'));

    //       if (movie == movies[movies.length - 1]) {
    //         recommendation.innerHTML += cards;
    // responsed.spoken_languages[0].english_name
    // }
      });
  }

  async function returnRecommend(poster,title,rating,id,release_date,language)
  {
    poster=
    poster==null?
    `./assets/cinema.jpg`:
     `https://image.tmdb.org/t/p/original${poster}`;

     card=`<div class="rec-card" data-id="${id}">
     <img src="${poster}" alt="">
     <div class="card-details">
         <h2 class="cast-title">${title}</h2>
         <span class='${getcolor(rating)}'>Rating:${rating.toFixed(1)} </span>
     </div>
     <div class="hidden-movie-det" data-id=${id}>
         <div><span class='hl'>Movie Name:</span>${title}</div>
         <div><span class='hl'>Rating:</span><span class="${getcolor(rating)}"> ${rating.toFixed(1)}</span></div>
         <div><span class="hl">Release Date:</span>${release_date === 0 ? "N/A": release_date}</div>
         <div><span class="hl">Language:</span> ${language}</div>
         <button data-id=${id}>View</button>
      </div>
 </div>`;
        
        return card;
  }

  function mov_link(link_redirect){
    link_redirect.forEach(d=>{
        d.addEventListener('click',(e)=>{
            window.location = `./movie.html?id=${d.dataset.id}`
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

function get_trailer(){
    let videos = returnVideo();
    video.innerHTML=`
                ${videos}`
    }

    function returnVideo(){
        videos = mov_details['trailer']
        if(mov_details['trailer']==0){
            return`<p class="no-video" style="background-color:none;">No Videos found...</p>`
        }
        mov_videos = videos.map((video)=>{
            if (!video.site == "YouTube") return;
            return `<iframe width="500" height="300" src="https://www.youtube.com/embed/${video.key}?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        }).join(' ')
        return mov_videos;
    }

    function get_provider(){
        provider.innerHTML = `

        <div class="prod-name">
                ${return_production()}
            </div>
        
        <div class="prod-plat">
            ${return_provider()}
        </div>`   
    }

    function return_production(){
        let flag="";
        mov_details['productions'].forEach((production)=>{
            flag += production.logo_path ?
            `<img src="https://image.tmdb.org/t/p/original${production.logo_path}" alt="" class="production__logo" loading="lazy">`:
            `<p>${production.name}`
        });
        return flag;
    }

    function return_provider(){
        if(mov_details['provider']==undefined)return"";
        let flatrates = mov_details['provider'].flatrate;
        if(flatrates == undefined) return"";
        let img = '';
        img =  flatrates.map((flatrate)=>{
           return `<img class="provider-logo" src="https://image.tmdb.org/t/p/original${flatrate.logo_path}" alt="Stream Logo" loading="lazy">`
        }).join(' ')
        return img;
    }

async function calling(){
    mov_link(document.querySelectorAll('.hidden-movie-det button'));
    await common_det_fetch();
    nav_ele_upd();
    post_cont_upd(); 
    overview_disp();
    casting_upd();
    recommend_upd(); 
    get_trailer();
    get_provider();
}

calling();

let isDown=false;
let slider_cont=Array.from(document.querySelectorAll('.arr-slide'));
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