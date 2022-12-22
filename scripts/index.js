import Card from './Card.js'
import FormValidator from './FormValidator.js'
import { validationConfig, initialCards } from './constants.js'

const profilePopupOpenButton = document.querySelector('.profile__edit-button');
const cardPopupAddButton = document.querySelector('.profile__add-button');
const profilePopup = document.querySelector('.popup-profile');
const cardPopup = document.querySelector('.popup-add');
const figurePopup = document.querySelector('.popup-figure');
const cardPopupSaveButton = cardPopup.querySelector('.popup__save-button');


const profilePopupForm = profilePopup.querySelector('.popup__container');
const cardPopupForm = cardPopup.querySelector('.popup__container');
const nameInputProfilePopupForm = profilePopupForm.querySelector('.popup__input_type_name');
const jobInputProfilePopupForm = profilePopupForm.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const placeInputCardPopupForm = cardPopup.querySelector('.popup__input_type_place');
const sourceInputCardPopupForm = cardPopup.querySelector('.popup__input_type_source');

const cardElement = document.querySelector('.elements');

const figurePopupPhoto = figurePopup.querySelector('.figure__photo');
const figurePopupTitle = figurePopup.querySelector('.figure__title');


const popups = document.querySelectorAll('.popup')


function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  })
})

profilePopupOpenButton.addEventListener('click', () => {
  nameInputProfilePopupForm.value = profileName.textContent;
  jobInputProfilePopupForm.value = profileDescription.textContent;
  openPopup(profilePopup);
});

cardPopupAddButton.addEventListener('click', () => {
  openPopup(cardPopup);
});

function handleOpenPopup(name, link) {
  openPopup(figurePopup);
  figurePopupPhoto.src = link
  figurePopupPhoto.alt = name;
  figurePopupTitle.textContent = name;
}

function submitProfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = nameInputProfilePopupForm.value;
  profileDescription.textContent = jobInputProfilePopupForm.value;

  closePopup(profilePopup);
}

profilePopupForm.addEventListener('submit', submitProfileForm);

const renderCard = (dataCard) => {
  const card = new Card(dataCard, '#cardtemplate', handleOpenPopup);
  const newCardElement = card.generateCard();
  cardElement.prepend(newCardElement);
}

initialCards.forEach(renderCard);


function submitCardForm(evt) {
  evt.preventDefault();

  renderCard({ name: placeInputCardPopupForm.value, link: sourceInputCardPopupForm.value })

  evt.target.reset();

  cardFormForValidate.disableSubmitButton();
  closePopup(cardPopup);
}

cardPopupForm.addEventListener('submit', submitCardForm);



const addCardFormElement = document.querySelector('.popup__card-editing')
const cardFormForValidate = new FormValidator(validationConfig, addCardFormElement);

const cardFormValidation = cardFormForValidate.enableValidation();

const profileFormElement = document.querySelector('.popup__profile-editing')
const profileFormForValidate = new FormValidator(validationConfig, profileFormElement);

const profileFormValidation = profileFormForValidate.enableValidation();
