import '../scss/main.scss'
import dataJson from '../static/data/data.json'
const players = dataJson.players
const logo = document.querySelector('.logo')
const lineupEl = document.querySelector('.lineup')

// players json 데이터를 html string 으로 만들어서 .lineup 요소의 자식요소로 넣음
function loadPlayers() {
  lineupEl.innerHTML = players.map(player => createHTMLString(player)).join('')
}
loadPlayers() // 함수 실행

// DOM 요소에 추가될 HTML String 을 반환하는 함수
function createHTMLString(item) {
  return `
    <li class="player" data-position=${item.position}>
      <div class="info">
        <img src="./images/${item.nameTag}.png" alt=${item.nameTag}>
        <h3>${item.name}, ${item.number}, ${item.position}</h3>
      </div>
      <button class="btn--icon" type="button" data-bs-toggle="collapse" data-bs-target="#${item.nameTag}" aria-expanded="false" aria-controls="collapseExample">
        <i class="fas fa-angle-down"></i>
      </button>
    </li>
    <div class="playerDetail collapse" id=${item.nameTag}>
        <div class="card card-body">
          <img src="./images/${item.nameTag}.png" alt=${item.nameTag}>

          <div class="card__container">
            <div class="description__title">PERSONAL INFORMATION</div>
            <div class="description__detail">
              <span>Name</span>
              <span>${item.name}</span>
            </div>
            <div class="description__detail">
              <span>Date of Birth</span>
              <span>${item.birthDate}</span>
            </div>
            <div class="description__detail">
              <span>Birthplace</span>
              <span>${item.brithPlace}</span>
            </div>
          </div>
        </div>
      </div>
  `
}


// 화살표 버튼을 클릭하면 위로 180도 회전하는 이벤트핸들러
const btnEls = document.querySelectorAll('[aria-expanded]')
btnEls.forEach(btnEl => {
  btnEl.addEventListener('click', () => {
    btnEl.classList.toggle('transform')
  })
})

// 각 버튼을 클릭하면 버튼의 타입에 맞는 포지션의 선수들만 나타내기
const buttonEls = document.querySelectorAll('button.btn')
buttonEls.forEach(btnEl => 
  btnEl.addEventListener('click', (event) => {
    const type = event.target.dataset.type
    printListsByPosition(type)
    toggleActive(type)
    closeDetail()
  })
)
function printListsByPosition(type) { // 포지션에 해당하지 않는 선수 리스트는 안보이게 하는 함수
  players.forEach(player => {
    const founded = document.querySelectorAll(`.player[data-position=${player.position}]`)
    if (type !== player.position) {
      founded.forEach(found => found.classList.add('invisible'))
    } else {
      founded.forEach(found => found.classList.remove('invisible'))
    }
  })
}
function toggleActive(type) { // 포지션 버튼을 클릭하면 활성화시키기
  buttonEls.forEach(btnEl => {
    if (btnEl.dataset.type === type) {
      btnEl.classList.add('active')
    } else {
      btnEl.classList.remove('active')
    }
  })
}
const playerDetails = document.querySelectorAll('.playerDetail') // 포지션 버튼을 누르면 선수디테일창이 닫히게 하기
function closeDetail() {
  playerDetails.forEach(Detail => Detail.classList.remove('show'))
}


// 로고를 클릭하면 모든 선수 리스트에서 invisible 클래스를 제거함
logo.addEventListener('click', () => {
  const playerEls = document.querySelectorAll('.player')
  playerEls.forEach(playerEl => playerEl.classList.remove('invisible'))
  buttonEls.forEach(btnEl => btnEl.classList.remove('active'))
  closeDetail()
})