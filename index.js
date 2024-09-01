// 개발자 도구에서 모바일에서 데스크탑으로 전환하거나 그 반대로 전환할때 반드시 새로고침해줘야 전환이 제대로 됨
// isMobile (모바일인지) 판단하는건 배울만한 점
// e.movementX : 마우스 드래그 거리와 방향을 알려주는 값 

const slider = document.querySelector('.slider__inner')
const panels = document.querySelectorAll('.panel')

let isMobile = /Mobi/.test(window.navigator.userAgent) // 개발자도구에서 모바일크기로 변경하면 true 

console.log(slider, window.navigator.userAgent, isMobile)

if(!isMobile){ // 데스크탑 
    let sliderGrabbed = false  
    let index = 0 // 액티브한 패널 위치
    let mouseMovement = 0 // 마우스 이동방향

    slider.addEventListener('mousedown', () => {
        sliderGrabbed = true 
        slider.style.cursor = 'grabbing'
    })

    slider.addEventListener('mouseup', () => {
        if(mouseMovement > 50 && index > 0) index-- // 마우스를 오른쪽으로 50px 이상 드래그하고 놓으면 index 값이 1 감소해서 사진이 한장 오른쪽으로 슬라이딩함. index 값이 0이면 첫번째 사진이므로 거기서 -1 이 되면 첫번째 사진이 오른쪽으로 이동해버리므로 0이면 감소하면 안됨.
        if(mouseMovement < -50 && index < panels.length - 2) index++ // 마우스를 왼쪽으로 50px 이상 드래그하고 놓으면 index 값이 1 증가해서 사진이 한장 왼쪽으로 슬라이딩함. 2를 빼준 이유는 마지막의 사진 2장은 이동하면 안되므로 2장 남겨지면 index 값은 그대로임
        console.log(index)

        mouseMovement = 0 // 다음번 슬라이딩을 위한 마우스 이동방향 초기화
        sliderGrabbed = false  
        slider.style.cursor = 'grab'
        slider.parentElement.style.scrollBehavior = 'smooth' // 부드러운 슬라이딩 (index 값이 양수이면 사진이 왼쪽으로 이동)
        slider.parentElement.scrollLeft = (index * panels[0].getBoundingClientRect().width) + (index * 10) // scrollLeft 값이 양수이면 사진이 왼쪽으로 이동함. 10 은 사진간 간격이 10px 이므로 사진간격까지 더해준 만큼 이동하기 위해서

        setTimeout(() => {
           slider.parentElement.style.scrollBehavior = 'auto' // 초기화. 사용자가 다시 드래그하기 전에 초기화. 사용자가 드래그할때 smooth 이면 드래그가 제대로 동작하지 않을수도 있기 때문임. 
        }, 500);
    })

    slider.addEventListener('mousemove', (e) => {
        if(sliderGrabbed){ // 마우스 누른 상태에서 이동하는 경우 (드래그인 경우)
            console.log(e.movementX) // 마우스가 왼쪽으로 이동하면 음수값 / 오른쪽으로 이동하면 양수값
            mouseMovement += e.movementX // 마우스가 왼쪽으로 이동하면 mouseMovement 는 마우스 이동거리만큼 음수값이 됨
            slider.parentElement.scrollLeft -= e.movementX // 드래그하는 동안 사진이 드래그하는 방향과 거리만큼 움직이도록 하기 위해서. 마우스가 왼쪽으로 이동하면 e.movementX 는 음수값이므로 scrollLeft 에서 계속 빼줘서 양수값을 만들어줘야 사진이 왼쪽으로 이동한다.
        }
    })
}else{
    slider.parentElement.style.overflow = 'scroll' // 모바일이면 스크롤바 보이도록 함
}