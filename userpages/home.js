
let moviesarr={};
let childele=`<div class="col-sm-3">
<div class="card">
  <img class="card-img-top" src="" alt="Card image cap" />
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">
      With supporting text below as a natural lead-in to additional
      content.
    </p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
</div>`
var addmovieslist=document.getElementById("addmovieslist");
console.log(addmovieslist);
async function videodata(){
    const response= await fetch("https://app.tapmad.com/api/getAllMoviesWithPagination/0/5/0/16",{ method: 'GET'})
    var data = await response.json();
    moviesarr=data?.Sections.Movies[0]
    
    


}
async function moviesLoad(eve){

    await videodata();

    addmovieslist.innerHTML=`<div class="col-sm-12">
    <div class="card-body">
      <h4 class="card-title">${moviesarr?.SectionName}</h5>
      
    </div>
  </div>`;
    moviesarr?.Videos?.map((dt)=>
        addmovieslist.innerHTML+=`<div class="col-sm-3">
        <a class="navbar-brand " href="./showVideo.html?id=${dt?.VideoEntityId}">
        <div class="card">
          <img class="card-img-top" src="${dt?.VideoOnDemandThumb}" alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">${dt?.VideoName}</h5>
            <p class="card-text limitdesc">
             ${dt?.VideoDescription}
            </p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div></a>
        </div>`
    )
    console.log(moviesarr);
}

async function watchMovie(){
    const loc=window.location.href.split("/")
    const idarr=loc[loc.length-1].split("=")
    const id=idarr[idarr.length-1]
    await videodata();
    const allvideos=moviesarr?.Videos
    const selectedMovie=allvideos.find((dt)=>dt?.VideoEntityId==id)
    console.log(selectedMovie?.VideoDescription.split(" "));
    

    console.log(allvideos.filter((dt)=>selectedMovie?.VideoDescription.includes(dt?.VideoDescription)));
    

    console.log(moviesarr?.Videos);

}


