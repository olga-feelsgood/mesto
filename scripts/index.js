const editProfile = document.querySelector('.profile__edit-button');
const popupElem = document.querySelector('.popup');
const popupClose = popupElem.querySelector('.popup__close-button');

editProfile.addEventListener('click', () => {
  popupElem.classList.add('popup_opened')
});

popupClose.addEventListener('click', () => {
  popupElem.classList.remove('popup_opened')
});

popupElem.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    popupElem.classList.remove('popup_opened')
  }
});

let formElement = popupElem.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__description');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function formSubmitHandler(evt) {
  evt.preventDefault();

  let profileName = document.querySelector('.profile__name');
  let profileDescription = document.querySelector('.profile__description');

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  popupElem.classList.remove('popup_opened');

}

formElement.addEventListener('submit', formSubmitHandler); 