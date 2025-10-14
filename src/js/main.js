 import {
     songs
 } from './data.js';
 // ----------------------navBar
 const navBtn = document.querySelectorAll('#navBar>ul>li')
 const navSpan = document.querySelector('#navBar>ul>span')
 const home = document.getElementById('home')
 const radio = document.getElementById('radio')
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
                 radio.classList.remove('block')
                 radio.classList.add('hidden')
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
                 radio.classList.remove('hidden')
                 radio.classList.add('block')

                 break;
             case 2:
                 navSpan.classList.remove('left-1')
                 navSpan.classList.remove('left-[50%]', 'translate-x-[-50%]')
                 navSpan.classList.add('left-[66%]')
                 item.firstElementChild.setAttribute('fill', '#FA586A')
                 item.lastElementChild.classList.add('text-[#FA586A]')
                 item.lastElementChild.classList.remove('text-white')
                 radio.classList.remove('block')
                 radio.classList.add('hidden')
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
         miniContorl.classList.add('bottom-[10px]')
     }, 300);
 })

 songsPage.firstElementChild.addEventListener('click', () => {
     songsPage.classList.add('translate-x-[100%]')
     miniContorl.classList.remove('bottom-[10px]')
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
                <img src="${song.cover}" alt="" class="w-[60px] rounded-[6px]">
            </figure>
            <div class="ml-2.5">
                    <h5 class="text-[white] capitalize font-['500'] text-[18px]">${song.title}</h5>
                    <h6 class="text-[#808080] capitalize font-['400'] text-[16px]">${song.artist}</h6>
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
 }

 playBtnMini.addEventListener('click', (event) => {
     event.stopPropagation()
     player.play()
     HidePlayBtn()
 })
 playBtnMain.addEventListener('click', () => {
     player.play()
     HidePlayBtn()
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