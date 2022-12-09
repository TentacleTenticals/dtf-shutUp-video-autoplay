// ==UserScript==
// @name        DTF-shutUp autoplay of videos settings
// @namespace   https://github.com/TentacleTenticals/dtf-shutUp-video-autoplay
// @match       https://dtf.ru/*
// @grant       none
// @version     1.0
// @author      Tentacle Tenticals
// @description Стандартный список настроек скипта
// @homepage https://github.com/TentacleTenticals/dtf-shutUp-video-autoplay
// @license MIT
// ==/UserScript==
/* jshint esversion:8 */

let defaultSettings = {
  'what to stop': {
    'topic video': true,
    'comments video': true
  },
  'what to change': {
    'video preload': true,
    'mute off': true,
    'change volume': true
  },
  'video settings': {
    'preview': true,
    'preload type': 'none',
    'volume level': 0.5
  }
}
