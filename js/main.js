/*********************************************************************************
*  WEB422 – Assignment 2
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Glenn Parreno Student ID: 115814196 Date: 28 - 01 - 2023
*
********************************************************************************/

//number that keeps track of the current page the user is viewing
let page = 1;

//constant that will reference how many movie items can be viewied on each page
const perPage = 10;

let loadMovieData = (title = null) => {

    //If title is null, show paging control. If it's not hide paging control. 
    const pgCntrl = document.getElementById('show-control');

    if(title == null || title == ""){
        console.log("empty");
        pgCntrl.classList.remove('d-none');
    }
    else{
        console.log("title")
        pgCntrl.classList.add('d-none');
    }

    //Loading the data, making a fetch request to the API
    let request = title ? `http://localhost:8080/api/movies?page=${page}&perPage=${perPage}&title=${title}` 
    : `http://localhost:8080/api/movies?page=${page}&perPage=${perPage}`;

    fetch(request).then(res=>res.json()).then(data => {

        //Creating <tr> elements
        let rate = "N/A";
        let rows = `
        ${data.map(mv => (
            `<tr data-id="${mv._id}">
                <td>${mv.year}</td>
                <td>${mv.title}</td>
                <td>${mv.plot}</td>
                <td>${mv.rated ? mv.rated : rate}</td>
                <td>${Math.floor(mv.runtime/60)}:${(mv.runtime%60).toString().padStart(2,'0')}</td>
            <tr/>`
        )).join('')}`;

        document.querySelector('#tbdy').innerHTML = rows;               //Adding the <tr> Elements to the table
        document.querySelector('#current-page').innerHTML = page;       //Display the current page using the global variable

        //Adding Click Events & Loading / Displaying Movie Data
        document.querySelectorAll('#moviesTable tbody tr').forEach(row => {
            row.addEventListener("click", e => {
                let clickedId= row.getAttribute("data-id");
                
                //Request to fetch specific movie data.
                fetch(`http://localhost:8080/api/movies/${clickedId}`)
                .then(res=>res.json()).then(data=>{

                    document.querySelector('#detailsModal .modal-title').innerHTML = data.title;

                    let directorList = data.directors.map((dir) => dir).join(', ');
                    let castList = data.cast.map((cst) => cst).join(', ');
                    let pic = data.poster ? data.poster : ""
                    
                    //Add this to modal body.
                    let movieDetails = `
                        <img class="img-fluid w-100" src="${pic}"><br><br>
                        <strong>Director By:</strong> ${directorList}<br><br>
                        <p>${data.fullplot}</p>
                        <strong>Cast:</strong> ${castList}<br><br>
                        <strong>Awards:</strong> ${data.awards.text}<br>
                    <strong>IMDB Rating:</strong> ${data.imdb.rating} ${data.imdb.votes}`;
                    
                    document.querySelector('#detailsModal .modal-body').innerHTML = movieDetails;

                    let myModal = new bootstrap.Modal(document.getElementById('detailsModal'), {
                        backdrop: 'static', keyboard: false, focus: true
                    });

                    myModal.show();
                });
            });
        })

    })
    
};

//Execute when the DOM is ready
document.addEventListener('DOMContentLoaded', function () {

    loadMovieData();

    //event listener for previous page
    document.querySelector("#previous-page").addEventListener("click", p => {
        if(page > 1)
        {
            page--;
            console.log("greater");

            loadMovieData();
        }
    })

    //event listener for next page
    document.querySelector("#next-page").addEventListener("click", p => {
        page++;
        loadMovieData();
    })

    //event listener for search bar
    document.querySelector("#searchForm").addEventListener('submit', p => {
        //prevent from submitting
        p.preventDefault();
        page = 1;
        loadMovieData(document.querySelector("#title").value);
    })

    //event listener for clear button
    document.querySelector("#clearForm").addEventListener('click', e => {

        document.querySelector("#title").value = null;
        loadMovieData();
    })
})

