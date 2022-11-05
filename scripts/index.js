const editProfile = document.querySelector('.profile__edit-button');
const popupElem = document.querySelector('.popup');
const popupClose = popupElem.querySelector('.popup__close-button');

let formElement = popupElem.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__input_name');
let jobInput = formElement.querySelector('.popup__input_description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

console.log(editProfile);
console.log(popupElem);
console.log(popupClose);
console.log(formElement);
console.log(nameInput);
console.log(jobInput);
console.log(profileName);
console.log(profileDescription);

function editFormOpen() {
  popupElem.classList.add('popup_opened');
}

function editFormClose() {
  popupElem.classList.remove('popup_opened');
}

editProfile.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  editFormOpen () ;
});

popupClose.addEventListener('click', editFormClose);

//popupElem.addEventListener('click', (event) => {
//  if (event.target === event.currentTarget) {
//    popupElem.classList.remove('popup_opened')
//  }
//});

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  editFormClose();

}

formElement.addEventListener('submit', formSubmitHandler); 