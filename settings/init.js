// ==UserScript==
// @name        DTF settings init
// @namespace   https://github.com/TentacleTenticals/dtf-shutUp-video-autoplay
// @match       https://dtf.ru/*
// @grant       none
// @version     1.0
// @author      Tentacle Tenticals
// @description Инициализатор настроек скрипта
// @homepage https://github.com/TentacleTenticals/adtf-shutUp-video-autoplay
// @license MIT
// ==/UserScript==
/* jshint esversion:8 */

function init(settings){
  settings ? mainSettings = mergeSettings(defaultSettings, settings) : mainSettings = defaultSettings;
  new Settings({
    path: document.body
  })
  console.log(`[init] Инициализация скрипта успешно выполнена.`, mainSettings);
}
