// ==UserScript==
// @name        DTF-shutUp autoplay of videos
// @namespace   https://github.com/TentacleTenticals
// @match       https://dtf.ru/*
// @grant       none
// @version     1.2.1
// @author      Tentacle Tenticals
// @description Убирает автозапуск видео в статьях на DTF
// @homepage    https://github.com/TentacleTenticals/
// @updateURL   https://github.com/TentacleTenticals/dtf-shutUp-video-autoplay/raw/main/main.js
// @downloadURL https://github.com/TentacleTenticals/dtf-shutUp-video-autoplay/raw/main/main.js
// @require     https://github.com/TentacleTenticals/dtf-libs/raw/main/libs/settings/cssAppender.js
// @require     https://github.com/TentacleTenticals/dtf-shutUp-video-autoplay/raw/main/settings/defaultSettings.js
// @require     https://github.com/TentacleTenticals/dtf-libs/raw/main/libs/obs.js
// @require     https://github.com/TentacleTenticals/dtf-libs/raw/beta/libs/settings/DTF%20settings%20opener.js
// @require     https://github.com/TentacleTenticals/dtf-shutUp-video-autoplay/raw/beta/settings/init.js
// @require     https://github.com/TentacleTenticals/dtf-libs/raw/main/libs/DTF%20page%20load%20detector.js
// @require     https://raw.githubusercontent.com/TentacleTenticals/dtf-libs/main/libs/DTF%20header.js
// @require     https://github.com/TentacleTenticals/dtf-libs/raw/main/libs/settings/classes.js
// @require     https://github.com/TentacleTenticals/dtf-shutUp-video-autoplay/raw/main/settings/settings.js
// @require     https://raw.githubusercontent.com/TentacleTenticals/dtf-libs/main/libs/settings/indexedDB.js
// @license MIT
// ==/UserScript==
/* jshint esversion:8 */


(function() {
'use strict';
    let mainSettings;

    // Запуск функций при загрузке страниц DTF
    onPageLoad(() => {
      if(!document.querySelector(`div[class^=content][class*=content--full]`)) return;
      if(!mainSettings) settingsLoader(db);
    })

    function changeVideoAttr(backtoDef, video){
      if(!backToDef){
        video.removeAttribute('autoplay');
        mainSettings['what to change']['mute off'] ? video.removeAttribute('muted') : '';
        mainSettings['what to change']['video preload'] ? video.setAttribute('preload', mainSettings['video settings']['preload type']) : '';
        video.setAttribute('controls', '');
        video.classList.add('clicked');
        video.volume = mainSettings['video settings']['volume level'];
        if(!video.paused) arr.pause();
        video.currentTime = 0;
        video.onplay = () => {
          if(!video.classList.value.match('yes')) video.pause();
        };
        video.onclick = () => {
          video.classList.toggle('yes');
        };
      }else
      if(backToDef){
        video.setAttribute('autoplay', '');
        video.setAttribute('preload', 'none');
        video.setAttribute('controls', '');
        video.currentTime = 0;
        video.onplay = null;
        video.onclick = null;
      }
    }

    // Функция для установки атрибутов видео
    function setAttributes({def, target}){
        for(let i = 0, arr = document.querySelectorAll(target); i < arr.length; i++){
            if(def){
                changeVideoAttr(true, arr[i]);
            }else
            if(!def){
                changeVideoAttr(false, arr[i]);
            }
        }
    }
})();
