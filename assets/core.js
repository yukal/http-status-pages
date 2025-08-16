(function () {
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

  var statusCodes = {
    defaults: {
      unknown: {
        error: 'Unknown Status',
        desc: `Oh, we have no idea what this status is for. Maybe it hasn't been implemented.`,
      },
      '4xx': {
        error: 'Oops! Something went wrong.',
        desc: 'Hmm... We have no idea what kind of error this is.',
      },
      // '5xx': {
      //     error: 'Oops! Something went wrong.',
      //     desc: 'Hmm... We have no idea what kind of error this is.',
      // },
    },

    // 1xx Informational

    100: {
      error: 'Continue',
      desc: 'The initial part of a request has been received and has not yet been rejected by the server.',
    },
    101: {
      error: 'Switching Protocols',
      desc: 'The requester has asked the server to switch protocols and the server has agreed to do so.',
    },
    102: {
      error: 'Processing',
      desc: 'The server has received and is processing the request, but no response is available yet.',
    },
    103: {
      error: 'Early Hints',
      desc: 'Used to return some response headers before final HTTP message.',
    },

    // 2xx Success

    200: {
      error: 'OK',
      desc: 'The request has succeeded.',
    },
    201: {
      error: 'Created',
      desc: 'The request has been fulfilled and resulted in a new resource being created.',
    },
    202: {
      error: 'Accepted',
      desc: 'The request has been accepted for processing, but the processing has not been completed.',
    },
    203: {
      error: 'Non-Authoritative Information',
      desc: 'The server successfully processed the request, but is returning information that may be from another source.',
    },
    204: {
      error: 'No Content',
      desc: 'The server successfully processed the request, but is not returning any content.',
    },
    205: {
      error: 'Reset Content',
      desc: 'The server successfully processed the request, but is not returning any content and requires that the requester reset the document view.',
    },
    206: {
      error: 'Partial Content',
      desc: 'The server is delivering only part of the resource due to a range header sent by the client.',
    },
    207: {
      error: 'Multi-Status',
      desc: 'The message body that follows is an XML message and can contain a number of separate response codes.',
    },
    208: {
      error: 'Already Reported',
      desc: 'The members of a DAV binding have already been enumerated in a previous reply to this request, and are not being included again.',
    },
    226: {
      error: 'IM Used',
      desc: 'The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.',
    },

    // 3xx Redirection

    300: {
      error: 'Multiple Choices',
      desc: 'Indicates multiple options for the resource that the client may follow.',
    },
    301: {
      error: 'Moved Permanently',
      desc: 'This and all future requests should be directed to the given URI.',
    },
    302: {
      error: 'Found',
      desc: 'Tells the client to look at (browse to) another URL.',
    },
    303: {
      error: 'See Other',
      desc: 'The response to the request can be found under another URI using a GET method.',
    },
    304: {
      error: 'Not Modified',
      desc: 'Indicates that the resource has not been modified since the version specified by the request headers.',
    },
    305: {
      error: 'Use Proxy',
      desc: 'The requested resource is available only through a proxy, the address for which is provided in the response.',
    },
    306: {
      error: 'Switch Proxy',
      desc: 'No longer used. Originally meant "Subsequent requests should use the specified proxy."',
    },
    307: {
      error: 'Temporary Redirect',
      desc: 'Instructs the client to repeat the request at another URI.',
    },
    308: {
      error: 'Permanent Redirect',
      desc: 'The request and all future requests should be repeated using another URI.',
    },

    // 4xx Client Error

    400: {
      error: 'Bad Request',
      desc: 'The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).'
    },
    401: {
      error: 'Unauthorized',
      desc: 'Authentication is required and has failed or has not yet been provided.'
    },
    402: {
      error: 'Payment Required',
      desc: 'Reserved for future use. Intended for use as part of digital payment systems.'
    },
    403: {
      error: 'Forbidden',
      desc: 'The request was valid, but the server is refusing action. The user might not have the necessary permissions.'
    },
    404: {
      error: 'Not Found',
      desc: 'The requested resource could not be found but may be available in the future.'
    },
    405: {
      error: 'Method Not Allowed',
      desc: 'A request method is not supported for the requested resource.'
    },
    406: {
      error: 'Not Acceptable',
      desc: 'The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.'
    },
    407: {
      error: 'Proxy Authentication Required',
      desc: 'The client must first authenticate itself with the proxy.'
    },
    408: {
      error: 'Request Timeout',
      desc: 'The server timed out waiting for the request.'
    },
    409: {
      error: 'Conflict',
      desc: 'Indicates that the request could not be processed because of conflict in the request, such as an edit conflict.'
    },
    410: {
      error: 'Gone',
      desc: 'Indicates that the resource requested is no longer available and will not be available again.'
    },
    411: {
      error: 'Length Required',
      desc: 'The request did not specify the length of its content, which is required by the requested resource.'
    },
    412: {
      error: 'Precondition Failed',
      desc: 'The server does not meet one of the preconditions that the requester put on the request.'
    },
    413: {
      error: 'Payload Too Large',
      desc: 'The request is larger than the server is willing or able to process.'
    },
    414: {
      error: 'URI Too Long',
      desc: 'The URI provided was too long for the server to process.'
    },
    415: {
      error: 'Unsupported Media Type',
      desc: 'The request entity has a media type which the server or resource does not support.'
    },
    416: {
      error: 'Range Not Satisfiable',
      desc: 'The client has asked for a portion of the file, but the server cannot supply that portion.'
    },
    417: {
      error: 'Expectation Failed',
      desc: 'The server cannot meet the requirements of the Expect request-header field.'
    },
    418: {
      error: "I'm a teapot",
      desc: 'This code was defined in 1998 as one of the traditional IETF April Fools\' jokes. Not expected to be implemented by actual HTTP servers.'
    },
    421: {
      error: 'Misdirected Request',
      desc: 'The request was directed at a server that is not able to produce a response.'
    },
    422: {
      error: 'Unprocessable Entity',
      desc: 'The request was well-formed but was unable to be followed due to semantic errors.'
    },
    423: {
      error: 'Locked',
      desc: 'The resource that is being accessed is locked.'
    },
    424: {
      error: 'Failed Dependency',
      desc: 'The request failed due to failure of a previous request.'
    },
    425: {
      error: 'Too Early',
      desc: 'Indicates that the server is unwilling to risk processing a request that might be replayed.'
    },
    426: {
      error: 'Upgrade Required',
      desc: 'The client should switch to a different protocol such as TLS/1.0.'
    },
    427: {
      error: 'Unassigned',
      desc: 'This status code is unassigned.'
    },
    428: {
      error: 'Precondition Required',
      desc: 'The origin server requires the request to be conditional.'
    },
    429: {
      error: 'Too Many Requests',
      desc: 'The user has sent too many requests in a given amount of time ("rate limiting").'
    },
    430: {
      error: 'Unassigned',
      desc: 'This status code is unassigned.'
    },
    431: {
      error: 'Request Header Fields Too Large',
      desc: 'The server is unwilling to process the request because its header fields are too large.'
    },
    451: {
      error: 'Unavailable For Legal Reasons',
      desc: 'The server is denying access to the resource as a consequence of a legal demand.'
    },

    // 5xx Server Error

    500: {
      error: 'Internal Server Error',
      desc: 'A generic error message, given when no more specific message is suitable.'
    },
    501: {
      error: 'Not Implemented',
      desc: 'The server either does not recognize the request method, or it lacks the ability to fulfill the request.'
    },
    502: {
      error: 'Bad Gateway',
      desc: 'The server was acting as a gateway or proxy and received an invalid response from the upstream server.'
    },
    503: {
      error: 'Service Unavailable',
      desc: 'The server is currently unavailable (because it is overloaded or down for maintenance).'
    },
    504: {
      error: 'Gateway Timeout',
      desc: 'The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.'
    },
    505: {
      error: 'HTTP Version Not Supported',
      desc: 'The server does not support the HTTP protocol version used in the request.'
    },
    506: {
      error: 'Variant Also Negotiates',
      desc: 'Transparent content negotiation for the request results in a circular reference.'
    },
    507: {
      error: 'Insufficient Storage',
      desc: 'The server is unable to store the representation needed to complete the request.'
    },
    508: {
      error: 'Loop Detected',
      desc: 'The server detected an infinite loop while processing a request.'
    },
    509: {
      error: 'Bandwidth Limit Exceeded',
      desc: 'This status code is not specified in any RFCs, but is used by some servers.'
    },
    510: {
      error: 'Not Extended',
      desc: 'Further extensions to the request are required for the server to fulfill it.'
    },
    511: {
      error: 'Network Authentication Required',
      desc: 'The client needs to authenticate to gain network access.'
    }
  };

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

  var sortedStatusCodes = (function () {
    var { defaults, ...codes } = statusCodes;
    return Object.keys(codes).map(Number).sort((a, b) => a - b);
  })();

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

    if (prevStatusCode < 100) {
      prevStatusCode = 599;
    }

    statusCode = getPrevNearestStatusCode(prevStatusCode);
    setStatusCode(statusCode);
  }

  var next = (step = 1) => {
    var nextStatusCode = statusCode + step;

    if (nextStatusCode > 599) {
      nextStatusCode = 100;
    }

    statusCode = getNextNearestStatusCode(nextStatusCode);
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

    // Init
    setStatusCode(statusCode);

    // Focus on the page
    document.getElementById("error-container").focus();
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
})();
