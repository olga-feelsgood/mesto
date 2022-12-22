import { openPopup, figurePopup, figurePopupPhoto, figurePopupTitle } from './index.js'

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._deleteCard();
    });

    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._likeCard();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openZoomImage();
    });
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _likeCard() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  _openZoomImage() {
    openPopup(figurePopup);
    figurePopupPhoto.src = this._link;
    figurePopupPhoto.alt = this._name;
    figurePopupTitle.textContent = this._name;
  }

}


export default Card;