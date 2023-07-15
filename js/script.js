"use - strict"

window.addEventListener("DOMContentLoaded", function () {
    // tab logic start
	const tabsHeaders = document.querySelectorAll(".tabheader__item");
	const tabsContents = document.querySelectorAll(".tabcontent");
	const tabsHeadersParent = document.querySelector(".tabheader__items");

	function hideTabContent() {
		tabsContents.forEach(tabContent => {
			tabContent.classList.add("hide");
			tabContent.classList.remove("show", "fade");
		});
		tabsHeaders.forEach(tabHeader => tabHeader.classList.remove("tabheader__item_active"));
	}

	function showTabContent(i = 1) {
		tabsContents[i].classList.add("show", "fade");
		tabsContents[i].classList.remove("hide");
		tabsHeaders[i].classList.add("tabheader__item_active");
	}

	hideTabContent();
	showTabContent();

	tabsHeadersParent.addEventListener("click", (e) => {
		if (e.target && e.target.matches(".tabheader__item")) {
			tabsHeaders.forEach((tabHeader, index) => {
				if (e.target === tabHeader) {
					hideTabContent();
					showTabContent(index);
				}
			});
		}
	});
	// tab logic end


    //  timer logicn start
    const deadline = "2023-07-17";
    function getTimeRemaining(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date());
        let days, hours, minutes, seconds;

        if (total <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(total / (1000 * 60 * 60 * 24));
            hours = Math.floor((total / (1000 * 60 * 60) % 24));
            minutes = Math.floor((total / 1000 / 60) % 60);
            seconds = Math.floor((total / 1000) % 60);
        }

        return {
            total,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const daysBlock = timer.querySelector("#days");
        const hoursBlock = timer.querySelector("#hours");
        const minutesBlock = timer.querySelector("#minutes");
        const secondsBlock = timer.querySelector("#seconds");
        const timerId = setInterval(updateClock, 1000);



        function updateClock() {
            const time = getTimeRemaining(endtime);
            daysBlock.textContent = time.days >= 0 && time.days < 10 ? `0${time.days}` : time.days;
            hoursBlock.textContent = time.days >= 0 && time.hours < 10 ? `0${time.hours}` : time.hours;
            minutesBlock.textContent = time.minutes >= 0 && time.minutes < 10 ? `0${time.minutes}` : time.minutes;
            secondsBlock.textContent = time.seconds >= 0 && time.seconds < 10 ? `0${time.seconds}` : time.seconds;

            if (time.total <= 0) {
                clearInterval(timerId)
            }

        }
        updateClock();


    }
    setClock(".timer", deadline)

    // timer logic end
    // modal logic start
const modalTrigger = document.querySelectorAll("[data-modal]");
const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector("[data-close]");

  modalTrigger.forEach(btn =>  btn.addEventListener("click", openModal))

   modalCloseBtn.addEventListener("click", closeModal)

  modal.addEventListener("click", (e)=>{
  if(e.target === modal) {
    closeModal()
  }
  })
  window.addEventListener("keydown", (e)=>{
    if(e.key === "Escape" && modal.matches(".show")){
        closeModal()
    }
  })

  function openModal(){
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearTimeout(modalTimerId);
  }
function closeModal(){
    modal.classList.remove("show");
    modal.classList.add("hide");
    this.document.body.removeAttribute("style")
}

const modalTimerId = setTimeout(openModal, 5000);

function showModalByScroll(){
//    if( window.scrollY >=1000){
//     openModal()
//     window.removeEventListener("scroll",  showModalByScroll) 
//    }
if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1){
    openModal();
    window.removeEventListener("scroll",  showModalByScroll) ;
}

}
window.addEventListener("scroll",  showModalByScroll) 
    
    // modal logic end
});


