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
         songName = selected.title
         artistName = selected.artist
         coverSrc = selected.cover
         Src = selected.src
         console.log(songName);
         console.log(artistName);
         console.log(coverSrc);
         console.log(Src);

     })


     songsList.appendChild(_li)
 })