'use strict';

(function () {
  var sortedStatusCodes;
  var statusCodes;
  var lang;

  var statusCode = 401;
  var INPUT_TIMEOUT = 800;

  // var digits = '0123456789';
  var typedDigits = '';

  // var timer = clearTimeout.apply(null);
  var timer = null;

  var divStatusCode;
  var divStatusText;
  var divStatusDesc;
  var divStatusIcon;
  var divErrorContainer;
  var btnActive;

  var statusIcons = {
    defaults: {
      unknown: 'emo-confusion',
      '4xx': 'emo-confusion',
      '5xx': 'emo-dead',
    },

    // 1xx Informational

    100: '',
    101: '',
    102: '',
    103: '',

    // 2xx Success

    200: '',
    201: '',
    202: '',
    203: '',
    204: '',
    205: '',
    206: '',
    207: '',
    208: '',
    226: '',

    // 3xx Redirection

    300: '',
    301: '',
    302: '',
    303: '',
    304: '',
    305: '',
    306: '',
    307: '',
    308: '',

    // 4xx Client Error

    400: 'emo-confusion',
    401: 'fawkes-mask',
    402: 'coin',
    403: 'hand-stop',
    404: 'emo-glass',
    405: 'hand-stop', // cross
    406: 'hand-stop',
    407: 'mask', // eye-hand, mask, jack-o-lantern
    408: 'timer',
    409: 'collision',
    410: 'emo-hiding',
    411: 'emo-sad',
    412: 'emo-sad',
    413: 'emo-sad',
    414: 'emo-sad',
    415: 'emo-sad',
    416: 'emo-sad',
    417: 'emo-sad',
    418: 'teapot-1',
    421: 'wall',
    422: 'emo-sad',
    423: 'shield-lock', // locked, shield-lock, emo-silence
    424: 'emo-sad',
    425: 'emo-sad',
    426: 'emo-sad',
    427: 'emo-sad',
    428: 'emo-sad',
    429: 'emo-bandage',
    430: 'emo-sad',
    431: 'emo-bandage',
    451: 'emo-sad',

    // 5xx Server Error
    500: 'emo-dead',
    501: 'emo-dead',
    502: 'emo-dead',
    503: 'emo-dead',
    504: 'timer',
    505: 'emo-dead',
    506: 'emo-dead',
    507: 'emo-dead',
    508: 'emo-dead',
    509: 'emo-dead',
    510: 'emo-dead',
    511: 'emo-dead',
  };

  var setStatusCode = (code) => {
    var statusZone = code.toString().charAt(0) + 'xx';

    // if (divStatusCode.innerText == code.toString()) {
    //     return
    // }

    divStatusCode.innerText = code;

    if (Object.hasOwn(statusCodes, code)) {

      divStatusText.innerText = statusCodes[code].error;
      divStatusDesc.innerText = statusCodes[code].desc;

    } else {

      divStatusText.innerText = statusCodes.defaults[statusZone]?.error || statusCodes.defaults.unknown.error;
      divStatusDesc.innerText = statusCodes.defaults[statusZone]?.desc || statusCodes.defaults.unknown.desc;

    }

    var emoji = Object.hasOwn(statusIcons, code)
      ? statusIcons[code]
      : statusIcons.defaults[statusZone];

    if (!emoji) {
      emoji = statusIcons.defaults.unknown;
    }

    divStatusIcon.src = `./assets/sprite.svg#${emoji}`;
  }

  var setStatusCodeByString = (s) => {
    var code = parseInt(typedDigits, 10);

    if (code >= 100 && code <= 599) {
      statusCode = code;
      setStatusCode(statusCode);
    } else {
      console.warn(`Invalid status code: ${code}`);
    }
  };

  var prev = (step = 1) => {
    var prevStatusCode = statusCode - step;

    statusCode = Object.hasOwn(statusCodes, prevStatusCode)
      ? prevStatusCode
      : getPrevNearestStatusCode(prevStatusCode);

    setStatusCode(statusCode);
  }

  var next = (step = 1) => {
    var nextStatusCode = statusCode + step;

    statusCode = Object.hasOwn(statusCodes, nextStatusCode)
      ? nextStatusCode
      : getNextNearestStatusCode(nextStatusCode);

    setStatusCode(statusCode);
  }

  var clearTypedDigits = () => {
    typedDigits = '';

    if (timer != null) {
      clearTimeout(timer);
      timer = null;
    }

    divStatusCode.innerText = statusCode.toString();
    // setStatusCode(statusCode);
  }

  var processKeyboardDigit = (e) => {
    e.preventDefault();

    if (timer != null) {
      clearTimeout(timer);
    }

    typedDigits += e.key;
    divStatusCode.innerText = (typedDigits + '___').slice(0, 3);

    if (typedDigits.length < 3) {

      timer = setTimeout(clearTypedDigits, INPUT_TIMEOUT);

    } else {

      // console.log(`"${e.key}" ${typedDigits}`);
      var potentialStatusCode = parseInt(typedDigits, 10);

      if (potentialStatusCode >= 100 && potentialStatusCode <= 599) {
        statusCode = potentialStatusCode;
        setStatusCode(statusCode);
      } else {
        divStatusCode.innerText = statusCode.toString();
        // console.warn(`Invalid status code: ${code}`);
      }

      // setStatusCodeByString(typedDigits);
      typedDigits = '';
    }
  }

  var keyboardHandlers = {
    ArrowLeft: () => prev(1),
    ArrowRight: () => next(1),
    ArrowUp: () => next(100),
    ArrowDown: () => prev(100),
    PageUp: () => next(100),
    PageDown: () => prev(100),
    Home: () => {
      statusCode = 100;
      setStatusCode(statusCode);
    },
    End: () => {
      statusCode = getPrevNearestStatusCode(599);
      setStatusCode(statusCode);
    },

    0: processKeyboardDigit,
    1: processKeyboardDigit,
    2: processKeyboardDigit,
    3: processKeyboardDigit,
    4: processKeyboardDigit,
    5: processKeyboardDigit,
    6: processKeyboardDigit,
    7: processKeyboardDigit,
    8: processKeyboardDigit,
    9: processKeyboardDigit,
  };

  addEventListener("DOMContentLoaded", (event) => {
    divStatusCode = document.getElementById('http-status-code');
    divStatusText = document.getElementById('http-status-text');
    divStatusDesc = document.getElementById('http-status-desc');
    divStatusIcon = document.getElementById('http-status-icon');
    divErrorContainer = document.getElementById('error-container');

    // sortedStatusCodes = getSortedStatusCodes(lang);

    document.querySelector('.icon.left').addEventListener('click', () => prev(1));
    document.querySelector('.icon.right').addEventListener('click', () => next(1));

    document.addEventListener('keydown', function (e) {
      if (Object.hasOwn(keyboardHandlers, e.key)) {
        e.preventDefault();
        keyboardHandlers[e.key](e);
        return;
      }

      // if (!e.repeat) {
      //     console.log(`Key "${e.key}" pressed [event: keydown]`);
      // } else {
      //     console.log(`Key "${e.key}" repeating [event: keydown]`);
      // }
    });

    var buttonNodes = document.querySelectorAll('header.header button');
    var buttonItems = Array.from(buttonNodes, (element) => ({
      element,
      lang: (element.innerText || '').toLowerCase(),
      isActive: element.classList.contains('active'),
    }));

    buttonItems.forEach((btn) => {
      if (btn.isActive) {
        lang = btn.lang;
        statusCodes = locale.statusCodes[btn.lang];
        sortedStatusCodes = getSortedStatusCodes(btn.lang);
        btnActive = btn.element;
      }

      btn.element.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default action of the button click

        if (Object.hasOwn(locale.statusCodes, btn.lang) && btn.lang !== lang) {
          lang = btn.lang;

          statusCodes = locale.statusCodes[lang];
          sortedStatusCodes = getSortedStatusCodes(lang);

          btn.element.classList.add('active');
          btnActive.classList.remove('active');
          btnActive = btn.element;

          setStatusCode(statusCode); // Update the status code display with the new language
          divErrorContainer.focus(); // Focus on the error container
        }
      });
    });

    // Init
    setStatusCode(statusCode);

    // Focus on the page
    divErrorContainer.focus();
  });

  /**
   * Function to find the nearest status code that is less than or equal to the given number.
   * Uses binary search for optimized lookup.
   * @param {number} inputNumber - Input number to search for the nearest status code.
   * @returns {number} - The nearest status code less than or equal to the input number, or null if not found.
   */
  function getPrevNearestStatusCode(inputNumber) {
    var low = 0;
    var high = sortedStatusCodes.length - 1;
    var result = 511;

    while (low <= high) {
      var mid = Math.floor((low + high) / 2);
      var midCode = sortedStatusCodes[mid];

      if (midCode <= inputNumber) {
        result = midCode; // Store possible result
        low = mid + 1;    // Continue search in the right part
      } else {
        high = mid - 1;   // Continue search in the left part
      }
    }

    return result;
  }

  /**
   * Function to find the nearest status code that is greater than or equal to the given number.
   * Uses binary search for optimized lookup.
   * @param {number} inputNumber - Input number to search for the nearest status code.
   * @returns {number} - The nearest status code greater than or equal to the input number, or 0 if not found.
   */
  function getNextNearestStatusCode(inputNumber) {
    var low = 0;
    var high = sortedStatusCodes.length - 1;
    var result = 100;

    while (low <= high) {
      var mid = Math.floor((low + high) / 2);
      var midCode = sortedStatusCodes[mid];

      if (midCode >= inputNumber) {
        result = midCode; // Store possible result
        high = mid - 1; // Continue search in the left part
      } else {
        low = mid + 1; // Continue search in the right part
      }
    }

    return result;
  }

  function getSortedStatusCodes(lang = 'en') {
    var { defaults, ...codes } = locale.statusCodes[lang] || locale.statusCodes.en;
    return Object.keys(codes).map(Number).sort((a, b) => a - b);
  }
})();
