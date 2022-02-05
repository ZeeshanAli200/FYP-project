

async function videodata(){
    const response= await fetch("https://app.tapmad.com/api/getAllMoviesWithPagination/0/5/0/16",{ method: 'GET'})
    var data = await response.json();

    console.log("resp",data);


}

videodata()
