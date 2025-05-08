const clientId = "f7d7f367f0734f7780e76ee7f3ca4f4a";
const clientSecret = "a80b875d48ed41d7b78095144c25a119";
const access_token = null;
const playlistDefault = "3Pft9VkD2PXIK9EPOlVo9Z?si=0cdd96fdf68e4821";
let playlistId = playlistDefault;
let playlistData = null;
const redirectUri = "https://alouanne.github.io/OnlineHitster/Hitster.html"
let pickedTracks = null;
let overallPoints = 0;
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.currentTarget.id);
}
function resetRound(){
    location.reload();

}
function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    let draggedElement = document.getElementById(data);
    let dropZone = event.target;

    if (dropZone.tagName === "IMG") {
        dropZone = dropZone.parentElement;
    }

    if (dropZone.classList.contains('cardResponse')) {
        if (dropZone.children.length > 0) {
            return;
        }
        dropZone.appendChild(draggedElement);
    } else if (dropZone.classList.contains('card')) {
        dropZone.appendChild(draggedElement);
    } else {
        return;
    }

    const yearInput = draggedElement.querySelector('input[name="inputYears"]');
    const year = yearInput?.value;
    console.log(year);
    const number = dropZone.id.match(/\d+/)?.[0];
    const yearDisplay = document.getElementById(`AnswerYear${number}`);

    if (yearDisplay && year) {
    yearDisplay.textContent = year;
    }
    checkButtonState();
}
function checkResults(){
    const answerDiv = document.getElementById("answerContainer");
    answerDiv.style.display = "flex";
    let points = 0;
    let green = "#00FF00";
    year1 = document.getElementById("AnswerYear1")?.textContent;
    divYear1 = document.getElementById("AnswerCard1");
    year2 = document.getElementById("AnswerYear2")?.textContent;
    divYear2 = document.getElementById("AnswerCard2");
    year3 = document.getElementById("AnswerYear3")?.textContent;
    divYear3 = document.getElementById("AnswerCard3");
    year4 = document.getElementById("AnswerYear4")?.textContent;
    divYear4 = document.getElementById("AnswerCard4");
    year5 = document.getElementById("AnswerYear5")?.textContent;
    divYear5 = document.getElementById("AnswerCard5");
    if(year1 <= year2){
        points += 2;
        divYear1.style.backgroundColor = green;
    }else{
        divYear1.style.backgroundColor = "red";
    }

    if(year1 <= year2 && year2 <= year3){
        points += 2;
        divYear2.style.backgroundColor = green;
    }else if(year1 > year2 && year2 > year3 ){
        divYear2.style.backgroundColor = "red";
    }else{
        points += 1;
        divYear2.style.backgroundColor = "yellow";
    }

    if(year2 <= year3 && year3 <= year4){
        points += 2;
        divYear3.style.backgroundColor = green;
    }else if(year2 > year3 && year3 > year4 ){
        divYear3.style.backgroundColor = "red";
    }else{
        points += 1;
        divYear3.style.backgroundColor = "yellow";
    }

    if(year3 <= year4 && year4 <= year5){
        points += 2;
        divYear4.style.backgroundColor = green;
    }else if(year3 > year4 && year4 > year5 ){
        divYear4.style.backgroundColor = "red";
    }else{
        points += 1;
        divYear4.style.backgroundColor = "yellow";
    }

    if(year4 <= year5){
        points += 2;
        divYear5.style.backgroundColor = green;
    }else{
        divYear5.style.backgroundColor = "red";
    }
    const pointText = document.getElementById("points");
    pointText.textContent = "Points: " + points;
    const overallPointText = document.getElementById("overallPoints");
    currentPoints = points + overallPoints;
    overallPointText.textContent = "Overall points: " + currentPoints;
    const resetButton = document.getElementById("resetButton");
    resetButton.style.display = "inline-block";
    const checkButton = document.getElementById("checkButton");
    checkButton.style.display = "none";

    sessionStorage.setItem('points', currentPoints);

}


function checkButtonState() {
    let allFilled = true;
    let allDivs = document.querySelectorAll('.cardResponse');
    allDivs.forEach(zone => {
        if (zone.children.length !== 1) {
            allFilled = false;
        }
    });

    let checkButton = document.getElementById('checkButton');
    if (allFilled) {
        checkButton.disabled = false;
    } else {
        checkButton.disabled = true;

    }
}
function check(){
    let cardAnswers = document.getElementById('cardAnswers');

}

function loginWithSpotify() {
  checkPlaylistId();
  const state = encodeURIComponent(JSON.stringify({ playlistId }));
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user-read-playback-state user-modify-playback-state playlist-read-private streaming&state=${state}`;

  window.location.href = authUrl;
}
function getPlaylistIdFromState() {
  const params = new URLSearchParams(window.location.hash.substring(1));
  const state = params.get('state');
  if (state) {
    try {
      const parsed = JSON.parse(decodeURIComponent(state));
      return parsed.playlistId;
    } catch (e) {
      console.error('Invalid state format', e);
    }
  }
  return null;
}
async function getPlaylist() {
    if (playlistData != null) {
    return playlistData;
    }

    if (!accessToken) {
    alert('You must log in first.');
    return;
    }

    const playID = getPlaylistIdFromState();
    let allTracks = [];
    let offset = 0;
    let limit = 100;
    let total = 0;
    let next = `https://api.spotify.com/v1/playlists/${playID}/tracks?offset=${offset}&limit=${limit}`;
    const response = await fetch(next, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const data = await response.json();
    if (data != null) {
      data.tracks.items.forEach(track => {
          allTracks.push(track);
      });
      next = data.tracks.next;
      }
  try {
    do {
      const response = await fetch(next, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      const data = await response.json();
      if (data != null) {
        data.items.forEach(track => {
            allTracks.push(track);
        });
        next = data.next;
      } else {
        break;
      }

    } while (next != null);

    playlistData = allTracks;
    return playlistData;

  } catch (error) {
    console.error("Failed to fetch playlist:", error);
  }
}

async function getSongs() {
	let playlist = await getPlaylist();
	if (!playlist || playlist.length === 0) {
		alert("No tracks found in playlist.");
		return;
	}
	console.log(playlist);
	let uniqueIndexes = getUniqueRandomIndexes(playlist.length, 5);
	console.log(uniqueIndexes)
	pickedTracks = uniqueIndexes.map((index, i) => {
		const trackItem = playlist[index].track;
		return {
			number: i + 1,
			uri: trackItem.uri,
			name: trackItem.name,
			artist: trackItem.artists.map(a => a.name).join(', '),
			releaseDate: trackItem.album?.release_date || 'Unknown'
		};
	});

	pickedTracks.forEach(track => {
		const li = document.createElement('li');
		li.textContent = `${track.number}. ${track.name} - ${track.artist} (Released: ${track.releaseDate})`;
	});

	console.log("Selected songs (in order):");
	console.log(pickedTracks);
	pickedTracks.forEach(track => {
		const input = document.getElementById(`inputCard${track.number}`);
		const year = document.getElementById(`inputYear${track.number}`);
		if(year){
				const yearDate = track.releaseDate.substring(0, 4);
				year.value = yearDate;
		}
		if (input) {
				input.value = track.uri;
		}
		console.log(`${track.number}. ${track.name} - ${track.artist} (Released: ${track.releaseDate})`);
	});
};
function getUniqueRandomIndexes(max, count) {
  let indexes = new Set();
  while (indexes.size < count && indexes.size < max) {
    const index = Math.floor(Math.random() * max);
    indexes.add(index);
  }
  return Array.from(indexes);
}
async function playSong(event){

  event.preventDefault();

  const clickedCard = event.currentTarget;
  const clickedId = clickedCard.id; // e.g. "card1"

  const inputId = clickedId.replace("cardImg", "inputCard"); // "inputCard1"

  const trackUri = document.getElementById(inputId)?.value;

  await fetch('https://api.spotify.com/v1/me/player/play', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      uris: [trackUri]
    })
  });
}
window.onload = () => {
  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    accessToken = params.get('access_token');
  }
  overallPoints = parseInt(sessionStorage .getItem('points')) || 0;
  getSongs();
};

function toggleInput() {
  const option2 = document.querySelector('input[name="option"][value="option2"]');
  const input = document.getElementById('textInput');
  input.disabled = !option2.checked;
}
function checkPlaylistId(){
  const option2 = document.querySelector('input[name="option"][value="option2"]');
  const input = document.getElementById('textInput');
  if(option2.checked){
    playlistId = input.value;
  }else{
    playlistId = playlistDefault;
  }
}