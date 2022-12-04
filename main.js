// ==UserScript==
// @name        DTF-shutUp autoplay of videos
// @namespace   https://github.com/TentacleTenticals
// @match       https://dtf.ru/*
// @grant       none
// @version     1.0
// @author      Tentacle Tenticals
// @description Убирает автозапуск видео в статьях на DTF
// @homepage https://github.com/TentacleTenticals/dtf-shutUp-video-autoplay
// @updateURL   https://github.com/TentacleTenticals/dtf-shutUp-video-autoplay/master/main.js
// @downloadURL https://github.com/TentacleTenticals/dtf-shutUp-video-autoplay/master/main.js
// @license MIT
// ==/UserScript==
/* jshint esversion:8 */

(function() {
    'use strict';
    let obsStarted = false;

    {
    const log = console.log.bind(console)
    console.log = (...args) => {
          if(Array.isArray(args)){
            if(args[0]){
              if(typeof args[0] === 'string'){
                if(args[0].match(/\[ Air \] Ready.*/)){
                  log('Запускаю поиск видео...');
                  obsRun();
                }
              }
            }
          }
          log(...args);
    }}
    function obsRun(){
        if(!obsStarted){
          console.log(`OBS активирован`);
          const callback = (mutationList, observer) => {
              for (const mutation of mutationList) {
                if (mutation.type === 'childList') {
                  // console.log(mutation)
                  if(!mutation.target.classList > 0) return;
                  if(!mutation.target.classList.value.match(/andropov_video__container/)) return;
                    for(let i = 0, arr = mutation.addedNodes; i < arr.length; i++){
                        // console.log(arr[i])
                        if(arr[i].tagName === 'VIDEO'){
                            console.log('Video founded!!!');
                            arr[i].removeAttribute('autoplay');
                            //arr[i].removeAttribute('muted');
                            arr[i].setAttribute('preload', 'none');
                            arr[i].setAttribute('controls', '');
                            arr[i].currentTime = 0;
                            arr[i].volume = 0.2;
                            arr[i].pause();
                            }
                    }
                }
              }
          };
          const observer = new MutationObserver(callback);
          observer.observe(document.querySelector(`div[class^=content][class*=content--full]`), {attributes: true, childList: true, subtree: true});
          obsStarted = true;
        }
    }
})();
