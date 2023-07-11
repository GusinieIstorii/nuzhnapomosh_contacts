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

var modal = document.querySelector(".modal-form");
var trigger = document.querySelector(".contact_button");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

// function windowOnClick(event) {
//     if (event.target === modal) {
//         toggleModal();
//     }
// }

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
// window.addEventListener("click", windowOnClick);

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

const elementForm = document.querySelector('#contact_form');
const modalSubmitted = document.querySelector('.modal-submitted');

elementForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Остановить форму от посылки на сервер
  //------------------------------------------------------------
  // наверное полученные данные как-то должны все таки отправиться
  modal.classList.toggle("show-modal");
  modalSubmitted.classList.toggle("show-modal");
});

const closeButtonSubmittedModal = document.querySelector('.close-button.submitted')

closeButtonSubmittedModal.addEventListener('click', (e) => {
    modalSubmitted.classList.toggle("show-modal");
})

