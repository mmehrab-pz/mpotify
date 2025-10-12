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
                navSpan.classList.remove('left-66')
                navSpan.classList.add('left-1')
                item.firstElementChild.setAttribute('fill', '#FA586A')
                item.lastElementChild.classList.add('text-[#FA586A]')
                item.lastElementChild.classList.remove('text-white')
                radio.classList.remove('flex')
                radio.classList.add('hidden')
                library.classList.remove('flex')
                library.classList.add('hidden')
                home.classList.remove('hidden')
                home.classList.add('flex')


                break;
            case 1:
                navSpan.classList.remove('left-1')
                navSpan.classList.remove('left-66')
                navSpan.classList.add('left-[50%]', 'translate-x-[-50%]')
                item.firstElementChild.setAttribute('fill', '#FA586A')
                item.lastElementChild.classList.add('text-[#FA586A]')
                item.lastElementChild.classList.remove('text-white')
                library.classList.remove('flex')
                library.classList.add('hidden')
                home.classList.remove('flex')
                home.classList.add('hidden')
                radio.classList.remove('hidden')
                radio.classList.add('flex')

                break;
            case 2:
                navSpan.classList.remove('left-1')
                navSpan.classList.remove('left-[50%]', 'translate-x-[-50%]')
                navSpan.classList.add('left-66')
                item.firstElementChild.setAttribute('fill', '#FA586A')
                item.lastElementChild.classList.add('text-[#FA586A]')
                item.lastElementChild.classList.remove('text-white')
                radio.classList.remove('flex')
                radio.classList.add('hidden')
                home.classList.remove('flex')
                home.classList.add('hidden')
                library.classList.remove('hidden')
                library.classList.add('flex')

                break;

        }
    })

})