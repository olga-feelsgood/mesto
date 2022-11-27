const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const profilePopupOpenButton = document.querySelector('.profile__edit-button');
const cardPopupAddButton = document.querySelector('.profile__add-button');
const profilePopup = document.querySelector('.popup-profile');
const profilePopupCloseButton = profilePopup.querySelector('.popup__close-button');
const cardPopup = document.querySelector('.popup-add');
const cardPopupCloseButton = cardPopup.querySelector('.popup__close-button');
//const cardLikeButton = document.querySelector('.element__like-button');
const figurePopup = document.querySelector('.popup-figure');
const figurePopupCloseButton = figurePopup.querySelector('.popup__close-button');
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
const cardTemplate = document.querySelector('#cardtemplate').content.querySelector('.element');

const figurePopupPhoto = figurePopup.querySelector('.figure__photo');
const figurePopupTitle = figurePopup.querySelector('.figure__title');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

profilePopupOpenButton.addEventListener('click', () => {
  nameInputProfilePopupForm.value = profileName.textContent;
  jobInputProfilePopupForm.value = profileDescription.textContent;
  openPopup(profilePopup);
});

cardPopupAddButton.addEventListener('click', () => {
  openPopup(cardPopup);
});

profilePopupCloseButton.addEventListener('click', () => {
  closePopup(profilePopup);
});

cardPopupCloseButton.addEventListener('click', () => {
  closePopup(cardPopup);
});

figurePopupCloseButton.addEventListener('click', () => {
  closePopup(figurePopup);
});

function closePopupByPressPopup(popup) {
  popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      closePopup(popup);
    }
  });
}

closePopupByPressPopup(profilePopup);
closePopupByPressPopup(cardPopup);
closePopupByPressPopup(figurePopup);


function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}


/*
profilePopup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    closePopup(profilePopup);
  }
});
*/

function submitProfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = nameInputProfilePopupForm.value;
  profileDescription.textContent = jobInputProfilePopupForm.value;

  closePopup(profilePopup);
}

profilePopupForm.addEventListener('submit', submitProfileForm);

const deleteCard = (event) => {
  event.target.closest('.element').remove();
}

const likeCard = (event) => {
  event.target.closest('.element__like-button').classList.toggle('element__like-button_active');
}

const openZoomImage = (event) => {
  openPopup(figurePopup);
  figurePopupPhoto.src = event.target.closest('.element__image').src;
  figurePopupPhoto.alt = event.target.closest('.element__image').alt;
  figurePopupTitle.textContent = event.target.closest('.element__image').alt;
}

const generateCard = (dataCard) => {
  const newCard = cardTemplate.cloneNode(true);

  const name = newCard.querySelector('.element__title');
  name.textContent = dataCard.name;

  const link = newCard.querySelector('.element__image');
  link.src = dataCard.link;
  link.alt = dataCard.name;

  const deleteBtn = newCard.querySelector('.element__delete-button');
  deleteBtn.addEventListener('click', deleteCard);

  const likeBtn = newCard.querySelector('.element__like-button');
  likeBtn.addEventListener('click', likeCard);

  const zoomImage = newCard.querySelector('.element__image');
  zoomImage.addEventListener('click', openZoomImage);

  return newCard;
}

const renderCard = (dataCard) => {
  cardElement.prepend(generateCard(dataCard));
}

initialCards.forEach((dataCard) => {
  renderCard(dataCard);
});


function submitCardForm(evt) {
  evt.preventDefault();
  /* if (placeInputCardPopupForm.value === "") {
     cardPopupCloseButton.disabled = true;
     cardPopupCloseButton.classList.add('popup__save - button_inactive');
   }*/

  renderCard({ name: placeInputCardPopupForm.value, link: sourceInputCardPopupForm.value })

  evt.target.reset();
  cardPopupSaveButton.disabled = true;
  cardPopupSaveButton.classList.add('popup__save-button_inactive');
  closePopup(cardPopup);
}

cardPopupForm.addEventListener('submit', submitCardForm);
