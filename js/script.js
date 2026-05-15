/* =============================================
   Keyboard Test Online - Main Script
   https://keyboard-test.info
   ============================================= */

$(document).ready(function () {

  var testedKeys = 0;

  // Keydown: show pressed state
  $(document).on('keydown', function (e) {
    e.preventDefault();
    var key = e.keyCode;
    $('.k' + key).removeClass('active').addClass('press');
  });

  // Keyup: show tested (active) state
  $(document).on('keyup press', function (e) {
    e.preventDefault();
    var key = e.keyCode;
    if (!$('.k' + key).hasClass('active')) {
      testedKeys++;
      updateCounter();
    }
    $('.k' + key).removeClass('press').addClass('active');
    logKey(keyName(key));
  });

  // Mouse buttons
  $(document).on('mousedown', function (e) {
    var key = e.button;
    $('.k' + key).removeClass('active').addClass('press');
  });

  $(document).on('mouseup', function (e) {
    var key = e.button;
    if (!$('.k' + key).hasClass('active')) {
      testedKeys++;
      updateCounter();
    }
    $('.k' + key).removeClass('press').addClass('active');
    logKey(keyName(key));
  });

  // Disable right-click context menu
  $(document).on('contextmenu', function (e) {
    e.preventDefault();
  });

  // Reset button
  $('#reset-btn').on('click', function () {
    $('.key').removeClass('press active');
    testedKeys = 0;
    updateCounter();
    $('#key-log-inner').empty();
    var label = $(this).data('reset-label') || 'Keys Reset';
    showToast(label);
  });

  function updateCounter() {
    $('#tested-count').text(testedKeys);
  }

  function logKey(name) {
    if (!name) return;
    var pill = $('<span class="kpill"></span>').text(name);
    $('#key-log-inner').prepend(pill);
    // Keep only last 12
    $('#key-log-inner .kpill:gt(11)').remove();
  }

  function showToast(msg) {
    var t = $('<div class="kpill"></div>').text(msg);
    $('#key-log-inner').prepend(t);
    setTimeout(function () { t.fadeOut(400, function () { t.remove(); }); }, 1800);
  }

});

function keyName(code) {
  var map = {
    27: 'Esc', 112: 'F1', 113: 'F2', 114: 'F3', 115: 'F4',
    116: 'F5', 117: 'F6', 118: 'F7', 119: 'F8', 120: 'F9',
    121: 'F10', 122: 'F11', 123: 'F12', 145: 'Scr Lk',
    19: 'Pause', 45: 'Ins', 46: 'Del', 36: 'Home', 35: 'End',
    33: 'PgUp', 34: 'PgDn', 192: '~`', 49: '1', 50: '2',
    51: '3', 52: '4', 53: '5', 54: '6', 55: '7', 56: '8',
    57: '9', 48: '0', 189: '-_', 173: '-_', 187: '=+', 61: '=+',
    8: 'Backspace', 144: 'NumLk', 111: 'Num/', 106: 'Num*',
    109: 'Num-', 9: 'Tab', 81: 'Q', 87: 'W', 69: 'E', 82: 'R',
    84: 'T', 89: 'Y', 85: 'U', 73: 'I', 79: 'O', 80: 'P',
    219: '[{', 221: ']}', 220: '|\\', 103: 'Num7', 104: 'Num8',
    105: 'Num9', 107: 'Num+', 20: 'CapsLk', 65: 'A', 83: 'S',
    68: 'D', 70: 'F', 71: 'G', 72: 'H', 74: 'J', 75: 'K',
    76: 'L', 59: ';:', 186: ';:', 222: '\'"', 100: 'Num4',
    101: 'Num5', 102: 'Num6', 90: 'Z', 88: 'X', 67: 'C',
    86: 'V', 66: 'B', 78: 'N', 77: 'M', 188: ',<', 190: '.>',
    191: '/?', 96: 'Num0', 32: 'Space', 93: 'Menu',
    38: '↑', 40: '↓', 37: '←', 39: '→', 110: 'Num.',
    97: 'Num1', 98: 'Num2', 99: 'Num3',
    0: 'Left Click', 1: 'Mid Click', 2: 'Right Click',
    16: 'Shift', 18: 'Alt', 17: 'Ctrl', 91: 'Win', 13: 'Enter',
    44: 'PrtSc'
  };
  return map[code] || ('Key ' + code);
}
