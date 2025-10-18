 import {
     songs
 } from './data.js';
 import {
     radio
 } from './radioData.js';
 // ----------------------navBar
 const navBtn = document.querySelectorAll('#navBar>ul>li')
 const navSpan = document.querySelector('#navBar>ul>span')
 const home = document.getElementById('home')
 const _radio = document.getElementById('radio')
 const library = document.getElementById('library')

 let liNum = ''

 navBtn.forEach((item, index, arr) => {
     item.addEventListener('click', () => {
         arr.forEach((item) => {
             item.firstElementChild.setAttribute('fill', '#ffffff')
             item.lastElementChild.classList.remove('text-[#FA586A]')
             item.lastElementChild.classList.add('text-white')
         })


         switch (index) {
             case 0:
                 navSpan.classList.remove('left-[50%]', 'translate-x-[-50%]')
                 navSpan.classList.remove('left-[66%]')
                 navSpan.classList.add('left-1')
                 item.firstElementChild.setAttribute('fill', '#FA586A')
                 item.lastElementChild.classList.add('text-[#FA586A]')
                 item.lastElementChild.classList.remove('text-white')
                 _radio.classList.remove('block')
                 _radio.classList.add('hidden')
                 library.classList.remove('block')
                 library.classList.add('hidden')
                 home.classList.remove('hidden')
                 home.classList.add('block')


                 break;
             case 1:
                 navSpan.classList.remove('left-1')
                 navSpan.classList.remove('left-[66%]')
                 navSpan.classList.add('left-[50%]', 'translate-x-[-50%]')
                 item.firstElementChild.setAttribute('fill', '#FA586A')
                 item.lastElementChild.classList.add('text-[#FA586A]')
                 item.lastElementChild.classList.remove('text-white')
                 library.classList.remove('block')
                 library.classList.add('hidden')
                 home.classList.remove('block')
                 home.classList.add('hidden')
                 _radio.classList.remove('hidden')
                 _radio.classList.add('block')

                 break;
             case 2:
                 navSpan.classList.remove('left-1')
                 navSpan.classList.remove('left-[50%]', 'translate-x-[-50%]')
                 navSpan.classList.add('left-[66%]')
                 item.firstElementChild.setAttribute('fill', '#FA586A')
                 item.lastElementChild.classList.add('text-[#FA586A]')
                 item.lastElementChild.classList.remove('text-white')
                 _radio.classList.remove('block')
                 _radio.classList.add('hidden')
                 home.classList.remove('block')
                 home.classList.add('hidden')
                 library.classList.remove('hidden')
                 library.classList.add('block')

                 break;

         }
     })
 })
 // ----------------------open main control
 const mainContorl = document.getElementById('mainContorl')
 const miniContorl = document.getElementById('miniContorl')
 // const closeMainContorl = document.getElementById('mainContorl')

 miniContorl.addEventListener('click', () => {
     mainContorl.classList.remove('translate-y-[100%]')
 })

 mainContorl.firstElementChild.addEventListener('click', () => {
     mainContorl.classList.add('translate-y-[100%]')
 })

 // ----------------------open and close songs
 const songsPage = document.getElementById('songsPage')
 document.getElementById('songs').addEventListener('click', () => {
     songsPage.classList.remove('translate-x-[100%]')
     setTimeout(() => {
         miniContorl.classList.remove('bottom-[90px]')
         miniContorl.classList.add('bottom-[15px]')
     }, 300);
 })

 songsPage.firstElementChild.addEventListener('click', () => {
     songsPage.classList.add('translate-x-[100%]')
     miniContorl.classList.remove('bottom-[15px]')
     miniContorl.classList.add('bottom-[90px]')

 })
 // ----------------------get songs
 const songsList = document.getElementById('songsList')
 let songName = ''
 let artistName = ''
 let coverSrc = ''
 let Src = ''
 let theme = ''
 const miniCover = document.getElementById('miniCover')
 const miniTitle = document.getElementById('miniTitle')
 const miniArtist = document.getElementById('miniArtist')
 const mainCover = document.getElementById('mainCover')
 const mainTitle = document.getElementById('mainTitle')
 const mainArtist = document.getElementById('mainArtist')
 const player = document.getElementById('player')

 songs.forEach(song => {
     const _li = document.createElement('li')
     _li.className = "w-full flex items-center border-b border-b-[#ffffff23] py-2.5 cursor-pointer"
     _li.dataset.id = String(song.id)
     _li.innerHTML = `
            <figure>
                <img src="${song.cover}" alt="" class="w-[50px] rounded-[6px]">
            </figure>
            <div class="ml-2.5">
                    <h5 class="text-[white] capitalize font-['500'] text-[16px]">${song.title}</h5>
                    <h6 class="text-[#808080] capitalize font-['400'] text-[14px]">${song.artist}</h6>
            </div>
    `;

     _li.addEventListener('click', () => {
         const selected = songs.find(s => s.id == _li.dataset.id)
         //  currentSongIndex = selected;
         songName = selected.title
         artistName = selected.artist
         coverSrc = selected.cover
         Src = selected.src
         theme = selected.theme
         console.log(songName);
         console.log(artistName);
         console.log(coverSrc);
         console.log(Src);
         const index = songs.findIndex(s => s.id == Number(_li.dataset.id));
         currentSongIndex = index; // ← حتماً آپدیت شود
         playSong(currentSongIndex);
         mainContorl.style.backgroundColor = theme
         miniCover.setAttribute('src', coverSrc)
         miniTitle.textContent = songName
         miniArtist.textContent = artistName
         mainCover.setAttribute('src', coverSrc)
         mainTitle.textContent = songName
         mainArtist.textContent = artistName
         player.setAttribute('src', Src)
         _play()
         pauseRadio()
     })
     songsList.appendChild(_li)
 })

 // ----------------------play songs
 const playBtnMini = document.getElementById('playBtnMini')
 const playBtnMain = document.getElementById('playBtnMain')
 const pauseBtnMini = document.getElementById('pauseBtnMini')
 const pauseBtnMain = document.getElementById('pauseBtnMain')

 function _play() {
     player.play()
     HidePlayBtn()
     pauseRadio()
 }

 playBtnMini.addEventListener('click', (event) => {
     event.stopPropagation()
     player.play()
     HidePlayBtn()
     pauseRadio()
 })
 playBtnMain.addEventListener('click', () => {
     player.play()
     HidePlayBtn()
     pauseRadio()
 })

 // ----------------------pause songs

 pauseBtnMini.addEventListener('click', (event) => {
     event.stopPropagation()
     player.pause()
     ShowPlayBtn()
 })
 pauseBtnMain.addEventListener('click', () => {
     player.pause()
     ShowPlayBtn()
 })
 // ----------------------forward
 let currentSongIndex = 0;
 document.querySelectorAll('.forward').forEach((item) => {
     item.addEventListener('click', (event) => {
         event.stopPropagation()
         nextSong();
         HidePlayBtn()
     })
 })


 function nextSong() {
     currentSongIndex++;
     if (currentSongIndex >= songs.length) currentSongIndex = 0;
     playSong(currentSongIndex);
 }

 function playSong(index) {
     const song = songs[index];

     player.src = song.src;
     miniCover.src = song.cover;
     miniTitle.textContent = song.title;
     miniArtist.textContent = song.artist;
     mainCover.src = song.cover;
     mainTitle.textContent = song.title;
     mainArtist.textContent = song.artist;
     mainContorl.style.backgroundColor = song.theme

     player.play();
 }
 // ----------------------rewind
 function prevSong() {
     if (currentSongIndex === 0) {
         currentSongIndex = songs.length - 1;
     } else {
         currentSongIndex--;
     }
     playSong(currentSongIndex);
 }

 const rewindBtn = document.getElementById('rewindBtn');
 rewindBtn.addEventListener('click', () => {
     prevSong();
     HidePlayBtn()
 });
 //  ------------------song time
 let _currentTime = ''

 player.addEventListener('timeupdate', () => {
     const current = player.currentTime;
     const time = player.duration
     const minutes = Math.floor(current / 60);
     const seconds = Math.floor(current % 60);
     _currentTime = `${minutes}:${seconds.toString().padStart(2, '0')}`
     document.getElementById('songCurrentTime').innerText = _currentTime
     if (isNaN(player.duration)) return;
     document.getElementById('songTime').innerText = `${Math.floor(time / 60)}:${Math.floor(time % 60).toString().padStart(2, '0')}`
     let percent = (((player.currentTime) / (player.duration)) * 100)

     document.getElementById('songDuration').style.width = percent + '%'
 })

 const progressContainer = document.getElementById('progressContainer')

 let isSeeking = false;

 function seek(e) {
     const rect = progressContainer.getBoundingClientRect();
     let clientX = e.clientX;

     // اگر touch event بود
     if (e.touches) clientX = e.touches[0].clientX;

     const percent = (clientX - rect.left) / rect.width;
     player.currentTime = Math.max(0, Math.min(percent * player.duration, player.duration));
 }

 // دسکتاپ
 progressContainer.addEventListener('mousedown', (e) => {
     isSeeking = true;
     seek(e);
 });
 document.addEventListener('mousemove', (e) => {
     if (isSeeking) seek(e);
 });
 document.addEventListener('mouseup', () => {
     isSeeking = false;
 });

 // موبایل
 progressContainer.addEventListener('touchstart', (e) => {
     isSeeking = true;
     seek(e);
 });
 progressContainer.addEventListener('touchmove', (e) => {
     if (isSeeking) seek(e);
 });
 progressContainer.addEventListener('touchend', () => {
     isSeeking = false;
 });
 //  ------------------------chnage btn func
 function HidePlayBtn() {
     playBtnMini.classList.add('hidden')
     playBtnMain.classList.add('hidden')
     pauseBtnMini.classList.remove('hidden')
     pauseBtnMain.classList.remove('hidden')
 }

 function ShowPlayBtn() {
     playBtnMain.classList.remove('hidden')
     playBtnMini.classList.remove('hidden')
     pauseBtnMini.classList.add('hidden')
     pauseBtnMain.classList.add('hidden')
 }

 // ----------------------volume control
 const volumeContainer = document.getElementById('volumeContainer');
 const volumeBar = document.getElementById('volumeBar');
 const volumeCircle = document.getElementById('volumeCircle');

 player.volume = 0.5;

 let isDragging = false;

 function setVolume(percent) {
     const volume = Math.max(0, Math.min(percent, 1));
     player.volume = volume;

     volumeBar.style.width = `${volume * 100}%`;
 }

 volumeContainer.addEventListener('click', (e) => {
     const rect = volumeContainer.getBoundingClientRect();
     const clickX = e.clientX - rect.left;
     const width = rect.width;

     const percent = clickX / width;
     setVolume(percent);
 });

 volumeCircle.addEventListener('mousedown', () => (isDragging = true));
 window.addEventListener('mouseup', () => (isDragging = false));
 window.addEventListener('mousemove', (e) => {
     if (!isDragging) return;

     const rect = volumeContainer.getBoundingClientRect();
     let moveX = e.clientX - rect.left;

     moveX = Math.max(0, Math.min(moveX, rect.width));

     const percent = moveX / rect.width;
     setVolume(percent);
 });

 volumeContainer.addEventListener('touchstart', (e) => {
     isDragging = true;
     const touchX = e.touches[0].clientX;
     const rect = volumeContainer.getBoundingClientRect();
     const percent = (touchX - rect.left) / rect.width;
     setVolume(percent);
 });
 volumeContainer.addEventListener('touchmove', (e) => {
     if (!isDragging) return;
     const touchX = e.touches[0].clientX;
     const rect = volumeContainer.getBoundingClientRect();
     let moveX = touchX - rect.left;

     moveX = Math.max(0, Math.min(moveX, rect.width));
     const percent = moveX / rect.width;
     setVolume(percent);
 });
 volumeContainer.addEventListener('touchend', () => {
     isDragging = false;
 });

 // ----------------------get radio
 const RadioPlayer = document.getElementById('RadioPlayer')
 const radios = document.querySelectorAll('.radio')
 const pauseBtnRadio = document.getElementById('pauseBtnRadio')
 const playBtnRadio = document.getElementById('playBtnRadio')
 let radioTitle = ''
 let radioDes = ''
 let radioUrl = ''
 let radioCover = ''
 let radioTheme = ''


 radios.forEach((item) => {
     item.addEventListener('click', () => {
         const radioSelect = radio.find(s => s.id == Number(item.dataset.id))
         radioTitle = radioSelect.title
         radioDes = radioSelect.description
         radioUrl = radioSelect.url
         radioCover = radioSelect.cover
         radioTheme = radioSelect.theme
         console.log(radioTheme);
         
         player.pause()
         ShowPlayBtn()
         document.getElementById('radioConCover').setAttribute('src', radioCover)
          document.getElementById('radioControl').style.backgroundColor = radioTheme
         RadioPlayer.setAttribute('src', radioUrl)
         document.getElementById('radioConTitle').innerText = radioTitle
         document.getElementById('radiConDes').innerText = radioDes
         playRaido()
     })

 })
 console.log(radio);

 function pauseRadio() {
     RadioPlayer.pause()
     openRadioC.classList.remove('bg-[#FA586A]')
     openRadioC.firstElementChild.classList.remove('animate-pulse')
     playBtnRadio.classList.remove('hidden')
     playBtnRadio.classList.remove('hidden')
     pauseBtnRadio.classList.add('hidden')
     pauseBtnRadio.classList.add('hidden')
 }

 function playRaido() {
     RadioPlayer.play()
     openRadioC.classList.add('bg-[#FA586A]')
     openRadioC.firstElementChild.classList.add('animate-pulse')
     playBtnRadio.classList.add('hidden')
     playBtnRadio.classList.add('hidden')
     pauseBtnRadio.classList.remove('hidden')
     pauseBtnRadio.classList.remove('hidden')
 }

 // -----------------------open radio control
 const openRadioC = document.getElementById('radioBtn')
 const radioControl = document.getElementById('radioControl')



 openRadioC.addEventListener('click', () => {
     radioControl.classList.remove('translate-y-[100%]')
 })

 radioControl.firstElementChild.addEventListener('click', () => {
     radioControl.classList.add('translate-y-[100%]')
 })
 // -----------------------play and pause
 playBtnRadio.addEventListener('click', () => {
     playRaido()
     player.pause()
     ShowPlayBtn()
 })
 pauseBtnRadio.addEventListener('click', () => {
     pauseRadio()
 })