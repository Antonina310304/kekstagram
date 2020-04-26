'use strict';

(function () {
  var getFilterProperty = function (sliderValue) {
    var heat = 1 + 2 * (sliderValue / 100);
    var effects = {
      none: {
        name: '',
        filterProperty: ''
      },
      chrome: {
        filterProperty: 'grayscale(' + sliderValue / 100 + ')',
        name: 'effects__preview--chrome'
      },
      sepia: {
        filterProperty: 'sepia(' + sliderValue / 100 + ')',
        name: 'effects__preview--sepia'
      },
      marvin: {
        filterProperty: 'invert(' + sliderValue + '%)',
        name: 'effects__preview--marvin'
      },
      phobos: {
        filterProperty: 'blur(' + sliderValue / 100 * 3 + 'px)',
        name: 'effects__preview--phobos'
      },
      heat: {
        filterProperty: 'brightness(' + heat + ')',
        name: 'effects__preview--heat'
      }
    };
    return effects[pictureEffects.activeEffect];
  };

  // инициализация
  var pictureEffects = {
    // form: document.querySelector('.img-upload__form'),
    // pinValue: document.querySelector('.effect-level__value'),
    // sliderContainer: document.querySelector('.effect-level'),
    // depth: document.querySelector('.effect-level__depth'),
    // pinContainer: document.querySelector('.effect-level__line'),
    image: document.querySelector('.img-upload__preview > img'),
    value: 1,
    defaultValue: 100,
    activeEffect: 'none',
    activeFilter: null,
    DEFAULT_EFFECT: 'none'
  };

  // применение значений по умолчанию значение 100% и без эффекта
  pictureEffects.default = function () {

    // скрывает слайдер
    pictureEffects.hiddenSlider();

    // удаляет класс со стилями
    pictureEffects.image.classList = '';
    // очищает стиль фильтра
    pictureEffects.image.style.filter = null;
    // очищает изображение
    pictureEffects.image.src = '';

    // сбрасывает данные формы
    pictureEffects.form.reset();

  };

  // срабатывание функции при нажатии на фильтры
  pictureEffects.toAddClass = function () {
    var switches = document.querySelectorAll('.effects__radio');
    switches.forEach(function (input) {
      input.addEventListener('click', pictureEffects.onClickSwitch);
    });
  };

  // скрытие отображение слайдера при нажатии на фильтры, применения фильтра
  pictureEffects.onClickSwitch = function (evt) {
    var effect = evt.target.getAttribute('value');
    pictureEffects.activeFilter = evt.target;
    if (effect === 'none') {
      pictureEffects.hiddenSlider();
    } else {
      pictureEffects.visibleSlider();
    }
    pictureEffects.initFilter(effect);
  };

  // применяется нужный класс исходя из фильтра
  pictureEffects.initFilter = function (effect) {
    pictureEffects.activeEffect = effect;

    var filterProperty = getFilterProperty(pictureEffects.activeEffect, pictureEffects.defaultValue);
    // добавляет нужный класс исходя из эффекта
    pictureEffects.image.className = filterProperty.name;
    if (effect === pictureEffects.DEFAULT_EFFECT) {
      window.slider.default();
    } else {
      window.slider.visible();
      window.slider.initial();
    }
  };

  // скрытие слайдера
  pictureEffects.hiddenSlider = function () {
    pictureEffects.sliderContainer.classList.add('visually-hidden');
  };

  // отображение слайдера
  pictureEffects.visibleSlider = function () {
    pictureEffects.sliderContainer.classList.remove('visually-hidden');
  };

  // функция по переключению эффектов
  pictureEffects.setValue = function (value) {
    var filterProperty = getFilterProperty(value);
    pictureEffects.image.style.filter = filterProperty.filterProperty;
  };

  // инициализация применения эффектов
  pictureEffects.init = function () {

    pictureEffects.default();
    this.toAddClass();
  };

  pictureEffects.init();

  window.effect = {
    default: pictureEffects.default,
    setValue: pictureEffects.setValue
  };

})();
