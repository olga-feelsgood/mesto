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
const figurePopupCloseButton  = figurePopup.querySelector('.popup__close-button');


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

function handleOpenPopup(a) {
  a.classList.add('popup_opened');
}

function handleClosePopup(a) {
  a.classList.remove('popup_opened');
}

profilePopupOpenButton.addEventListener('click', () => {
  nameInputProfilePopupForm .value = profileName.textContent;
  jobInputProfilePopupForm.value = profileDescription.textContent;
  handleOpenPopup(profilePopup);
});

cardPopupAddButton.addEventListener('click', () => {
  handleOpenPopup(cardPopup);
});

profilePopupCloseButton.addEventListener('click', () => {
  handleClosePopup(profilePopup)
});

cardPopupCloseButton.addEventListener('click', () => {
  handleClosePopup(cardPopup)
});

figurePopupCloseButton.addEventListener('click', () => {
  handleClosePopup(figurePopup)
});

//profilePopup.addEventListener('click', (event) => {
//  if (event.target === event.currentTarget) {
//    profilePopup.classList.remove('popup_opened')
//  }
//});

function handleSubmitProfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = nameInputProfilePopupForm.value;
  profileDescription.textContent = jobInputProfilePopupForm.value;

  handleClosePopup(profilePopup);
}

profilePopupForm.addEventListener('submit', handleSubmitProfileForm);

const hadleDeleteCard = (event) => {
  event.target.closest('.element').remove();
}

const hadleLikeCard = (event) => {
  event.target.closest('.element__like-button').classList.toggle('element__like-button_active');
}

const hadleZoomImage = (event) => {
  handleOpenPopup(figurePopup);
  figurePopupPhoto.src = event.target.closest('.element__image').src;
  figurePopupPhoto.alt = event.target.closest('.element__image').alt;
  figurePopupTitle.textContent = event.target.closest('.element__image').alt;
}

const handleGenerateCard = (dataCard) => {
  const newCard = cardTemplate.cloneNode(true);

  const name = newCard.querySelector('.element__title');
  name.textContent = dataCard.name;

  const link = newCard.querySelector('.element__image');
  link.src = dataCard.link;
  link.alt = dataCard.name;

  const deleteBtn = newCard.querySelector('.element__delete-button');
  deleteBtn.addEventListener('click', hadleDeleteCard);

  const likeBtn = newCard.querySelector('.element__like-button');
  likeBtn.addEventListener('click', hadleLikeCard);

  const zoomImage = newCard.querySelector('.element__image');
  zoomImage.addEventListener('click', hadleZoomImage);

  return newCard;
}

const handleRenderCard = (dataCard) => {
  cardElement.prepend(handleGenerateCard(dataCard));
}

initialCards.forEach((dataCard) => {
  handleRenderCard(dataCard);
});


function handleSubmitCardForm(evt) {
  evt.preventDefault();

  handleRenderCard({ name: placeInputCardPopupForm.value, link: sourceInputCardPopupForm.value })

  placeInputCardPopupForm.value = '';
  sourceInputCardPopupForm.value = '';

  handleClosePopup(cardPopup);
}

cardPopupForm.addEventListener('submit', handleSubmitCardForm);
