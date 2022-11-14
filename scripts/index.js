const editProfile = document.querySelector('.profile__edit-button');
const addProfile = document.querySelector('.profile__add-button');
const popupElem = document.querySelector('.popup');
const popupClose = popupElem.querySelector('.popup__close-button');
const popupAdd = document.querySelector('.popup__add');
const popupAddClose = popupAdd.querySelector('.popup__close-button');
const likeButton = document.querySelector('.element__like-button');
const popupFigure = document.querySelector('.popup__figure');
const popupFigClose = popupFigure.querySelector('.popup__close-button');


const formElement = popupElem.querySelector('.popup__container');
const addFormElement = popupAdd.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const placeInput = popupAdd.querySelector('.popup__input_type_place');
const sourceInput = popupAdd.querySelector('.popup__input_type_source');


function formOpen(a) {
  a.classList.add('popup_opened');
}

function formClose(a) {
  a.classList.remove('popup_opened');
}

editProfile.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  formOpen(popupElem);
});

addProfile.addEventListener('click', () => {
  formOpen(popupAdd);
});

popupClose.addEventListener('click', () => {
  formClose(popupElem)
});

popupAddClose.addEventListener('click', () => {
  formClose(popupAdd)
});

popupFigClose.addEventListener('click', () => {
  formClose(popupFigure)
});

//popupElem.addEventListener('click', (event) => {
//  if (event.target === event.currentTarget) {
//    popupElem.classList.remove('popup_opened')
//  }
//});

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  formClose(popupElem);
}

formElement.addEventListener('submit', formSubmitHandler);




const cardElement = document.querySelector('.elements');

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

const cardTemplate = document.querySelector('#cardtemplate').content.querySelector('.element');

const hadleDeleteCard = (event) => {
  event.target.closest('.element').remove();
}

const hadleLikeCard = (event) => {
  event.target.closest('.element__like-button').classList.toggle('element__like-button_active');

}


const popupPhoto = popupFigure.querySelector('.figure__photo');
const popupTitle = popupFigure.querySelector('.figure__title');

const hadleZoomImage = (event) => {
  formOpen(popupFigure);
  popupPhoto.src = event.target.closest('.element__image').src;
  popupTitle.textContent = event.target.closest('.element__image').alt;
}

const generateCard = (dataCard) => {
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

const renderCard = (dataCard) => {
  cardElement.prepend(generateCard(dataCard));
}

initialCards.forEach((dataCard) => {
  renderCard(dataCard);
});


function addFormSubmitHandler(evt) {
  evt.preventDefault();

  renderCard({ name: placeInput.value, link: sourceInput.value })

  formClose(popupAdd);
}

addFormElement.addEventListener('submit', addFormSubmitHandler);
