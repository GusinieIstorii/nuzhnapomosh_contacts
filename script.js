// accordion - contacts

var containers;
function initDrawers() {
    // Получаем контейнер с контентом
    containers = document.querySelectorAll(".js-np-accordion");
    setHeights();
    wireUpTriggers();
    window.addEventListener("resize", setHeights);
}

window.addEventListener("load", initDrawers);

function setHeights() {
    containers.forEach(container => {
        // Получаем контент
        let content = container.querySelector(".js-np-accordion__content");
        content.removeAttribute("aria-hidden");
        // Высота контента, который нужно скрыть/показать
        let heightOfContent = content.getBoundingClientRect().height;
        // Задаем пользовательские свойства CSS с высотой контента
        container.style.setProperty("--containerHeight", `${heightOfContent}px`);
        // Когда высота считана и задана
        setTimeout(e => {
            container.classList.add("height-is-set");
            content.setAttribute("aria-hidden", "true");
        }, 0);
    });
}

function wireUpTriggers() {
    containers.forEach(container => {
        // Получаем все элементы-триггеры
        let btn = container.querySelector(".js-np-accordion__button");
        // Получаем контент
        let content = container.querySelector(".js-np-accordion__content");
        let img = container.querySelector('.accordion-image');
        btn.addEventListener("click", () => {
            btn.setAttribute("aria-expanded", btn.getAttribute("aria-expanded") === "false" ? "true" : "false");
            img.setAttribute('src', img.getAttribute("src") === "./assets/plus.svg" ? "./assets/minus.svg" : "./assets/plus.svg")
            container.setAttribute(
                "data-drawer-showing",
                container.getAttribute("data-drawer-showing") === "true" ? "false" : "true"
            );
            content.setAttribute(
                "aria-hidden",
                content.getAttribute("aria-hidden") === "true" ? "false" : "true"
            );
        });
    });
}

// modal - form open

var modal = document.querySelector(".contact-modal");
var trigger = document.querySelector(".contact-button");
var closeButton = document.querySelector(".close-button");

function toggleModal(event) {
    modal.classList.toggle("show-modal");
    if (modal.classList.contains('show-modal')) {
        scrollController.disabledScroll();
    } else {
        scrollController.enabledScroll();
    }
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
        scrollController.enabledScroll();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

// form email input validation
const email = document.getElementById("email");

email.addEventListener("input", (e) => {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("Укажите корректный email");
  } else {
    email.setCustomValidity("");
  }
});

// modal - form submitted

const elementForm = document.querySelector('#contact-form');
const modalSubmitted = document.querySelector('.contact-modal_form-submitted');


elementForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Остановить форму от посылки на сервер
  //------------------------------------------------------------
  // наверное полученные данные как-то должны все таки отправиться
  modal.classList.toggle("show-modal");
  modalSubmitted.classList.toggle("show-modal");
});

const closeButtonSubmittedModal = document.querySelector('.close-button_form-submitted')

closeButtonSubmittedModal.addEventListener('click', (e) => {
    modalSubmitted.classList.toggle("show-modal");
    scrollController.enabledScroll();
})

// SCROLL CONTROLLER
const scrollController = {
    scrollPosition: 0,
    disabledScroll() {
        scrollController.scrollPosition = window.scrollY;
        document.body.style.cssText = `
            overflow: hidden;
            position: fixed;
            top: -${scrollController.scrollPosition}px;
            left: 0;
            height: 100vh;
            width: 100vw;
            padding-right: ${window.innerWidth - document.body.offsetWidth}px;
        `;
    },
    enabledScroll() {
        document.body.style.cssText = '';
        window.scroll({top: scrollController.scrollPosition});
    },
}

