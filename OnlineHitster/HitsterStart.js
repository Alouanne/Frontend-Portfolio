const playlistDefault = "3Pft9VkD2PXIK9EPOlVo9Z?si=0cdd96fdf68e4821";
let playlistId = playlistDefault;

const backendUrl = "http://localhost:8080/auth/spotify";



function loginWithSpotify() {
  checkPlaylistId();
  const state = encodeURIComponent(JSON.stringify({ playlistId }));
  window.location.href = `${backendUrl}?state=${encodeURIComponent(state)}`;
}

function startGame(){
  const option2 = document.querySelector('input[name="option"][value="option2"]');
	if(option2.checked){
		document.querySelector(".UniquePlaylistWarning").style.display = "flex";
	}else{
		loginWithSpotify()
	}

}
function toggleInput() {
  const option2 = document.querySelector('input[name="option"][value="option2"]');
  const input = document.getElementById('textInput');
  input.disabled = !option2.checked;
}
function checkPlaylistId(){
  const option2 = document.querySelector('input[name="option"][value="option2"]');
  const input = document.getElementById('textInput');
  if(option2.checked){
    playlistId = extractPlaylistId(input.value);
  }else{
    playlistId = playlistDefault;
  }
}

function extractPlaylistId(url) {
  const regex = /playlist\/([a-zA-Z0-9]+)/;
  const match = url.match(regex);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}

window.onload = () => {
  const option2 = document.querySelector('input[name="option"][value="option2"]');
	if(option2.checked){
		input.disabled = false;
	}
}