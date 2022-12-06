// ==UserScript==
// @name        DTF-shutUp autoplay of videos
// @namespace   https://github.com/TentacleTenticals
// @match       https://dtf.ru/*
// @grant       none
// @version     1.2
// @author      Tentacle Tenticals
// @description Убирает автозапуск видео в статьях на DTF
// @homepage https://github.com/TentacleTenticals/
// @updateURL   https://github.com/TentacleTenticals/dtf-shutUp-video-autoplay/raw/main/main.js
// @downloadURL https://github.com/TentacleTenticals/dtf-shutUp-video-autoplay/raw/main/main.js
// @require     https://github.com/TentacleTenticals/dtf-libs/raw/main/libs/obs.js
// @require     https://github.com/TentacleTenticals/dtf-libs/raw/main/libs/DTF%20page%20load%20detector.js
// @require     https://github.com/TentacleTenticals/dtf-libs/raw/main/libs/DTF%20header.js
// @license MIT
// ==/UserScript==
/* jshint esversion:8 */


(function() {
'use strict';
    let obs = {
      topic: false,
      comments: false
    };

    // Запуск функций при загрузке страниц DTF
    onPageLoad(() => {
      if(!document.querySelector(`div[class^=content][class*=content--full]`)) return;
      new DtfHeader(document.querySelector(`div[class^=content][class*=content--full]`).children[0], document.querySelector(`div[class^=content][class*=content--full]`).children[0]);
      new Autoplay(document.getElementById('Dtf-header'));
      if(document.getElementById('autoplayTopic').checked){
        obs.topic = observer({
          target: document.querySelector(`div[class^=content][class*=content--full]`),
          search: /andropov_video__container/,
          msg: '[OBS topic] активирован',
          func: (arr) => {
            if(arr.tagName === 'VIDEO'){
              console.log('[OBS topic] Видео найдено, переписываю атрибуты.');
              arr.removeAttribute('autoplay');
              //arr[i].removeAttribute('muted');
              arr.setAttribute('preload', 'none');
              arr.setAttribute('controls', '');
              arr.classList.add('clicked');
              //arr[i].volume = 0.2;
              if(!arr.paused) arr.pause();
              arr.currentTime = 0;
              arr.onplay = () => {
                if(!arr.classList.value.match('yes')) arr.pause();
              };
              arr.onclick = () => {
                arr.classList.toggle('yes');
              };
            }
          }
        })
        setAttributes({def:false, target:`div[class^=content][class*=content--full] video`});
      }
      if(document.getElementById('autoplayComments').checked){
      obs.comments = observer({
        target: document.querySelector(`div[class^=comments][class*=comments--ready]`),
        search: /andropov_video__container/,
        msg: '[OBS comments] активирован',
        func: (arr) => {
          if(arr.tagName === 'VIDEO'){
            console.log('[OBS comments] Видео найдено, переписываю атрибуты.');
            arr.removeAttribute('autoplay');
            //arr[i].removeAttribute('muted');
            arr.setAttribute('preload', 'none');
            arr.setAttribute('controls', '');
            arr.classList.add('clicked');
            //arr[i].volume = 0.2;
            if(!arr.paused) arr.pause();
            arr.currentTime = 0;
            arr.onplay = () => {
              if(!arr.classList.value.match('yes')) arr.pause();
            };
            arr.onclick = () => {
              arr.classList.toggle('yes');
            };
          }
        }
      })
      setAttributes({def:false, target:`div[class^=comments][class*=comments--ready] video`});
      }
    })

    // Класс автозапуска. Используется для управления видео
    class Autoplay{
      constructor(path){
        this.main=document.createElement('div');
        this.main.className='videoAutoplay';
        this.main.id='videoAutoplay';
        this.main.style=`
        display: grid;
        grid-template-columns: repeat(3, max-content);
        column-gap: 10px;
        margin: auto;`;
        path.appendChild(this.main);

        this.header=document.createElement('div');
        this.header.className='header';
        this.header.textContent='Управление видео 🎥';
        this.header.style=`
        font-size: 13px;`
        this.main.appendChild(this.header);

        this.g1=document.createElement('div');
        this.main.appendChild(this.g1);
        this.inputTopic=document.createElement('input');
        this.inputTopic.type='checkbox';
        this.inputTopic.className='atp';
        this.inputTopic.id='autoplayTopic';
        this.inputTopic.checked = true;
        this.inputTopic.onchange=() => {
          if(this.inputTopic.checked){
            if(!obs.topic){
              obs.topic = observer({
                target: document.querySelector(`div[class^=content][class*=content--full]`),
                search: /andropov_video__container/,
                msg: '[OBS topic] активирован',
                func: (arr) => {
                  if(arr.tagName === 'VIDEO'){
                    console.log('[OBS topic] Видео найдено, переписываю атрибуты.');
                    arr.removeAttribute('autoplay');
                    //arr[i].removeAttribute('muted');
                    arr.setAttribute('preload', 'none');
                    arr.setAttribute('controls', '');
                    arr.classList.add('clicked');
                    //arr[i].volume = 0.2;
                    if(!arr.paused) arr.pause();
                    arr.currentTime = 0;
                    arr.onplay = () => {
                      if(!arr.classList.value.match('yes')) arr.pause();
                    };
                    arr.onclick = () => {
                      arr.classList.toggle('yes');
                    };
                  }
                }
              })
              setAttributes({def:false, target:`div[class^=content][class*=content--full] video`});
            }else
            if(obs.topic){
              console.log('[Autoplay topic] Деактивация автозапуска видео.');
              setAttributes({def:false, target:`div[class^=content][class*=content--full] video`});
            }
          }else
          if(!this.inputTopic.checked){
            if(!obs.topic){
              console.log('[Autoplay topic] Активация автозапуска видео.');
              setAttributes({def:true, target:`div[class^=content][class*=content--full] video`});
            }else
            if(obs.topic){
              console.log('[Autoplay topic] Активация автозапуска видео.');
              obs.topic.disconnect();
              obs.topic = false;
              setAttributes({def:true, target:`div[class^=content][class*=content--full] video`});
            }
          }
        }
        this.g1.appendChild(this.inputTopic);

        this.labelTopic=document.createElement('label');
        this.labelTopic.textContent='📰';
        this.g1.appendChild(this.labelTopic);

        this.g2=document.createElement('div');
        this.main.appendChild(this.g2);
        this.inputComments=document.createElement('input');
        this.inputComments.className='atp';
        this.inputComments.id='autoplayComments';
        this.inputComments.type='checkbox';
        this.inputComments.onchange=() => {
          if(this.inputComments.checked){
            if(!obs.comments){
              obs.comments = observer({
                target: document.querySelector(`div[class^=comments][class*=comments--ready]`),
                search: /andropov_video__container/,
                msg: '[OBS comments] активирован',
                func: (arr) => {
                  if(arr.tagName === 'VIDEO'){
                    console.log('[OBS comments] Видео найдено, переписываю атрибуты.');
                    arr.removeAttribute('autoplay');
                    //arr[i].removeAttribute('muted');
                    arr.setAttribute('preload', 'none');
                    arr.setAttribute('controls', '');
                    arr.classList.add('clicked');
                    //arr[i].volume = 0.2;
                    if(!arr.paused) arr.pause();
                    arr.currentTime = 0;
                    arr.onplay = () => {
                      if(!arr.classList.value.match('yes')) arr.pause();
                    };
                    arr.onclick = () => {
                      arr.classList.toggle('yes');
                    };
                  }
                }
              })
              setAttributes({def:false, target:`div[class^=comments][class*=comments--ready] video`});
            }else
            if(obs.comments){
              console.log('[Autoplay comments] Деактивация автозапуска видео.');
              setAttributes({def:false, target:`div[class^=comments][class*=comments--ready] video`});
            }
          }else
          if(!this.inputComments.checked){
            if(!obs.comments){
              console.log('[Autoplay comments] Активация автозапуска видео.');
              setAttributes({def:true, target:`div[class^=comments][class*=comments--ready] video`});
            }else
            if(obs.comments){
              console.log('[Autoplay comments] Активация автозапуска видео.');
              obs.comments.disconnect();
              obs.comments = false;
              setAttributes({def:true, target:`div[class^=comments][class*=comments--ready] video`});
            }
          }
        }
        this.g2.appendChild(this.inputComments);

        this.labelComments=document.createElement('label');
        this.labelComments.textContent='📜';
        this.g2.appendChild(this.labelComments);
      }
    }

    // Функция для установки атрибутов видео
    function setAttributes({def, target}){
        for(let i = 0, arr = document.querySelectorAll(target); i < arr.length; i++){
            if(def){
                arr[i].setAttribute('autoplay', '');
                arr[i].setAttribute('preload', 'none');
                arr[i].setAttribute('controls', '');
                arr[i].currentTime = 0;
                arr[i].onplay = null;
                arr[i].onclick = null;
            }else
            if(!def){
                arr[i].removeAttribute('autoplay');
                arr[i].setAttribute('autoplay', '');
                arr[i].setAttribute('preload', 'none');
                arr[i].setAttribute('controls', '');
                arr[i].classList.add('clicked');
                arr[i].currentTime = 0;
                arr[i].pause();
                arr[i].onplay = () => {
                  if(!arr[i].classList.value.match('yes')) arr[i].pause();
                };
                arr[i].onclick = () => {
                  arr[i].classList.toggle('yes');
                };
            }
        }
    }
})();
