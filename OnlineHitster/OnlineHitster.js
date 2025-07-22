const access_token = null;
const playlistDefault = "7HlMVnK4JxBo1TElKjfPP2?pt_success=1";
let playlistId = playlistDefault;
let playlistData = null;
const redirectUri = "https://aleannecamire.com/OnlineHitster/Hitster.html"
let pickedTracks = null;
let overallPoints = 0;
const backendUrl = "https://backend-portfolio-a7jj.onrender.com/auth/spotify";
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


function getPlaylistIdFromState() {
  const params = new URLSearchParams(window.location.search);
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
    if (!playlistId || !accessToken) {
        alert("Playlist ID and Access Token are required.");
        return;
    }

    const baseUrl = "https://backend-portfolio-a7jj.onrender.com/getPlaylist";
    const url = `${baseUrl}?playlistId=${encodeURIComponent(getPlaylistIdFromState())}&accessToken=${encodeURIComponent(accessToken)}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            // Try to extract error message from response body if possible
            let errorMessage = `Server error: ${response.status}`;
            try {
            	if(response.status == 500){
            		alert("No playlist found under that id. Please try again")
            	  window.location.href = "HitsterStart.html";
            	}else{
                const errorData = await response.json();
                if (errorData && errorData.message) {
                    errorMessage += ` - ${errorData.message}`;
                }
                window.location.href = "HitsterStart.html";
                }
            } catch (jsonErr) {
                // Ignore if response is not JSON
            }
        }

        const playlistData = await response.json();
        return playlistData;

    } catch (error) {
        console.error("Failed to fetch playlist:", error);
    }
}


async function getSongs() {
	let playlist = await getPlaylist();
	if (!playlist || playlist.length === 0) {
		return;
	}
	let uniqueIndexes = getUniqueRandomIndexes(playlist.length, 5);
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
	});
	  document.querySelector(".loadingScreen").style.display = 'none';
};
function getUniqueRandomIndexes(max, count) {
  let indexes = new Set();
  while (indexes.size < count && indexes.size < max) {
    const index = Math.floor(Math.random() * max);
    indexes.add(index);
  }
  return Array.from(indexes);
}
async function playSong(event) {
  event.preventDefault();

  const clickedCard = event.currentTarget;
  const clickedId = clickedCard.id;
  const inputId = clickedId.replace("cardImg", "inputCard");
  const trackUri = document.getElementById(inputId)?.value;

  async function attemptPlay() {
    return fetch('https://api.spotify.com/v1/me/player/play', {
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

  let response = await attemptPlay();

  if (!response.ok) {
    const errorData = await response.json();
	console.log('No active device — trying to transfer to current device');

	// Step 1: Get user's available devices
	const devicesRes = await fetch('https://api.spotify.com/v1/me/player/devices', {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	const devicesData = await devicesRes.json();
	const availableDevice = devicesData.devices.find(device => device.is_active || device.type === 'Computer' || device.type === 'Smartphone');

	if (availableDevice) {
		// Step 2: Transfer playback to that device
		await fetch('https://api.spotify.com/v1/me/player', {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				device_ids: [availableDevice.id],
				play: false
			})
		});

		// Step 3: Retry playing the track
		await new Promise(r => setTimeout(r, 2000));
		attemptPlay();
	} else {
		alert("No available Spotify device found to transfer playback to.");
	}
  }
}

window.onload = () => {
  const params = new URLSearchParams(window.location.search);
	getPlaylistIdFromState();
  accessToken = params.get('access_token');
  overallPoints = parseInt(sessionStorage .getItem('points')) || 0;
  getSongs();
};
