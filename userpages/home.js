
const moviesarr={};
var addmovieslist=document.getElementById("addmovieslist");
console.log(addmovieslist.children[0].ELEMENT_NODE);
async function videodata(){
    const response= await fetch("https://app.tapmad.com/api/getAllMoviesWithPagination/0/5/0/16",{ method: 'GET'})
    var data = await response.json();
    return  data?.Sections.Movies[0]
    


}
async function moviesLoad(eve){
    console.log(eve);
    await videodata()
}


