class Card {
  constructor(data, templateSelector, handleOpenPopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleOpenPopup = handleOpenPopup;
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

    this._elementTitle = this._element.querySelector('.element__title');

    this._elementTitle.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._deleteCard();
    });

    this._likeButton = this._element.querySelector('.element__like-button');

    this._likeButton.addEventListener('click', () => {
      this._likeCard();
    });

    this._elementImage = this._element.querySelector('.element__image');

    this._elementImage.addEventListener('click', () => {
      this._handleOpenPopup(this._name, this._link);
    });
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _likeCard() {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  // _openZoomImage() {
  //   openPopup(figurePopup);
  //   figurePopupPhoto.src = this._link;
  //   figurePopupPhoto.alt = this._name;
  //   figurePopupTitle.textContent = this._name;
  // }

}


export default Card;