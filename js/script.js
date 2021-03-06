const ApiKey = "0ca87e3576484c0c9eaeb2bfade1fb71";
const baseUrl = "https://api.football-data.org/v2/";
const leagueId = "2021";
const baseEndPoin = `${baseUrl}competitions/${leagueId}`;
const scorerEndPoin = `${baseUrl}competitions/${leagueId}/scorers`;
const teamEndPoin = `${baseUrl}competitions/${leagueId}/teams`;
const standingEndPoin = `${baseUrl}competitions/${leagueId}/standings`;
const matchEndPoin = `${baseUrl}competitions/${leagueId}/matches`;


const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");
const fetchHeader = {
    headers:{
        'X-Auth-Token': ApiKey
    }
}

function getListTeams(){
    title.innerHTML = "Daftar Tim Liga Primer Inggris";
    fetch(teamEndPoin, fetchHeader) 
    .then(response => response.json())
    .then(resJson=>{
        console.log(resJson.teams);
        let teams = "";
        resJson.teams.forEach(team => {
            teams += `
                <li class="collection-item avatar">
                    <img src="${team.crestUrl}" alt="" class="circle">
                    <span class="title">${team.name}</span>
                    <p>Berdiri: ${team.founded}<br>
                        Markas: ${team.venue}
                    </p>
                    <a href="#modal" data-id="${team.id}" class="secondary-content modal-trigger"><i class="material-icons " data-id="${team.id}">info</i></a>
                </li>
            `
        });
        contents.innerHTML = '<ul class="collection">' + teams + '</ul>'
        const detail = document.querySelectorAll('.secondary-content');
        detail.forEach(btn => {
            btn.onclick = (event) => {
                let url = baseUrl + "teams/" + event.target.dataset.id;
                fetch(url, fetchHeader)
                    .then(response => response.json())
                    .then(resDetail => {
                        dataModal = `
                        
                        <img src="${resDetail.crestUrl}"  alt="" width="100px" align="center">
                       
                        <br><p>Nama Klub : ${resDetail.shortName}<br>
                        Tahun Berdiri : ${resDetail.founded} <br>
                        Markas  : ${resDetail.venue} <br>
                        Alamat  : ${resDetail.address} <br>
                        No.Tlp  : ${resDetail.phone} <br>
                        Website : ${resDetail.website} <br>
                        Email   : ${resDetail.email} <br>
                        Warna Kebesaran : ${resDetail.clubColors} <br>
                        </p>`
                        console.log(resDetail);
                        document.getElementById("nama-tim").innerHTML = resDetail.name;
                        document.getElementById("isi-info").innerHTML = dataModal;
                    })
                console.log(event.target.dataset.id);
                
            }
        })
    }).catch(err=>{
        console.error(err);
    })
}

function getListStandings(){
    title.innerHTML = "Klasemen Liga Primer Inggris";
    fetch(standingEndPoin, fetchHeader)
    .then(response => response.json())
    .then(resJson=>{
        console.log(resJson.standings[0]);
        let teams = "";
        let i = 1;
        resJson.standings[0].table.forEach(team => {
            teams += `
            <tr>
                <td style="padding-left:20px;">${i}.</td>
                <td> <img src="${team.team.crestUrl}" alt="${team.team.name}" width="30px"</td>
                <td>${team.team.name}</td>
                <td>${team.playedGames}</td>
                <td>${team.won}</td>
                <td>${team.draw}</td>
                <td>${team.lost}</td>
                <td>${team.points}</td>
            </tr>
            `;
            i++;
        });
        contents.innerHTML = `
        <div class="card">
            <table class="stripped responsive-table">
                <thead> 
                    <th></th>
                    <th></th>
                    <th>Nama Tim</th>
                    <th>PG</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>P</th>
                </thead>
                <tbody>
                    ${teams}
                </tbody>
            </table>
        </div>
        `
    }).catch(err=>{
        console.error(err);
    })
}

function getListMatches(){
    title.innerHTML = "Jadwal dan Hasil Pertandingan Liga Inggris";
    fetch(matchEndPoin, fetchHeader)
    .then(response => response.json())
    .then(resJson=>{
        console.log(resJson.matches);
        let matchs = "";
        let i = 1;
        resJson.matches.forEach(match => {
            let d = new Date(match.utcDate).toLocaleDateString("id");
            let scoreHomeTeam = (match.score.fullTime.homeTeam==null?0:match.score.fullTime.homeTeam);
            let scoreAwayTeam = (match.score.fullTime.awayTeam==null?0:match.score.fullTime.awayTeam);
            matchs += `
            <tr>
                <td style="padding-left:20px;">${i}.</td>
                <td>${match.homeTeam.name} vs ${match.awayTeam.name}</td>
                <td>${d}</td>
                <td>${scoreHomeTeam}:${scoreAwayTeam}</td>
            </tr>
            `;
            i++;
        });
        contents.innerHTML = `
        <div class="card">
            <table class="stripped responsive-table">
                <thead> 
                    <th></th>
                    <th>Peserta</th>
                    <th>Tanggal</th>
                    <th>Skor Akhir</th>
                </thead>
                <tbody>
                    ${matchs}
                </tbody>
            </table>
        </div>
        `
    }).catch(err=>{
        console.error(err);
    })
}

function getListScorers(){
    title.innerHTML = "Daftar Pecetak Gol Liga Primer Inggris";
    fetch(scorerEndPoin, fetchHeader)
    .then(response => response.json())
    .then(resJson=>{
        console.log(resJson.scorers[0]);
        let scorers = "";
        let i = 1;
        resJson.scorers.forEach(scorer => {
            scorers += `
            <tr>
                <td style="padding-left:20px;">${i}.</td>
                <td>${scorer.player.name}</td>
                <td>${scorer.player.nationality}</td>
                <td>${scorer.team.name}</td>
                <td>${scorer.player.position}</td>
                <td>${scorer.numberOfGoals}</td>
            </tr>
            `;
            i++;
        });
        contents.innerHTML = `
        <div class="card">
            <table class="stripped responsive-table">
                <thead> 
                   <th></th>
                    <th>Nama Pemain</th>
                    <th>Kebangsaan</th>
                    <th>Tim</th>
                    <th>Posisi</th>
                    <th>Jumlah Gol</th>
                </thead>
                <tbody>
                    ${scorers}
                </tbody>
            </table>
        </div>
        `
    }).catch(err=>{
        console.error(err);
    })
}


function loadPage(page){
    switch(page){
        case "teams":
            getListTeams();
            break;
        case "standings":
            getListStandings();
            break;
        case "matches":
            getListMatches();
            break;
        case "scorers":
             getListScorers();
            break;
    }
}

document.addEventListener('DOMContentLoaded', function() { 
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm =>{
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "teams";
    loadPage(page);
});

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var modalDetail = M.Modal.init(elems);
});
   