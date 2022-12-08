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

let db = {
  indexedDB: (window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB||window.shimIndexedDB),
  name: "DTF scripts database",
  version: 1,
  store: "DTF-shutUp-autoplay-videos",
  key: "uid",
  data: {
    uid: 'settings',
    description: 'Список настроек для скрипта DTFshutUp-autoplay-videos'
  }
}
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
class Autoplay{
  constructor(path){
    if(document.getElementById('videoAutoplay')) return;
    this.main=document.createElement('div');
    this.main.className='videoAutoplay';
    this.main.id='videoAutoplay';
    this.main.style=`
    display: grid;
    grid-template-columns: repeat(4, max-content);
    column-gap: 10px;
    margin: auto;`;
    path.appendChild(this.main);

    this.header=document.createElement('div');
    this.header.className='header';
    this.header.textContent='Управление видео 🎥';
    this.header.style=`
    font-size: 13px;`
    this.main.appendChild(this.header);

    this.g1=new Container(this.main);
    new Input({
      path: this.g1,
      type: 'checkbox',
      id: 'autoplay-topic',
      text: '📰',
      checked: mainSettings['what to stop']['topic video'],
      onchange: () => {
      if(this.inputTopic.checked){
        if(!obs.topic){
          obs.topic = observer({
            target: document.querySelector(`div[class^=content][class*=content--full]`),
            search: /andropov_video__container/,
            msg: '[OBS topic] активирован',
            func: (arr) => {
              if(arr.tagName === 'VIDEO'){
                console.log('[OBS topic] Видео найдено, переписываю атрибуты.');
                changeVideoAttr(false, arr);
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
    });

    this.g2=new Container(this.main);
    new Input({
      path: this.g2,
      type: 'checkbox',
      id: 'autoplay-comments',
      text: '📜',
      checked: mainSettings['what to stop']['comments video'],
      onchange: () => {
      if(this.inputComments.checked){
        if(!obs.comments){
          obs.comments = observer({
            target: document.querySelector(`div[class^=comments][class*=comments--ready]`),
            search: /andropov_video__container/,
            msg: '[OBS comments] активирован',
            func: (arr) => {
              if(arr.tagName === 'VIDEO'){
                console.log('[OBS comments] Видео найдено, переписываю атрибуты.');
                changeVideoAttr(false, arr);
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
    });

    this.g3=new Container(this.main);
    new Input({
      path: this.g3,
      type: 'checkbox',
      id: 'autoplay-mute',
      text: 'Mute',
      checked: mainSettings['what to change']['mute off']
    })
  }
}
class Container{
  constructor(path){
    this.main=document.createElement('div');
    path.appendChild(this.main);
    return this.main;
  }
}
class SettingsItem{
  constructor(){
    this.main=document.createElement('button');
    this.main.className='btn';
    this.main.id='stg-DTF-shutUp-video-autoplay';
    this.main.textContent='DTF shutUp video autoplay';
    this.main.onclick=() => {
      new Settings();
    }
    document.getElementById('DTF-settingsOpener').children[1].appendChild(this.main);
  }
}

function setMinisettings(){
  let autoplay = document.getElementById('videoAutoplay');
  autoplay.children[1].children[0].checked = mainSettings['what to stop']['topic video'];
  autoplay.children[2].children[0].checked = mainSettings['what to stop']['comments video'];
  autoplay.children[3].children[0].checked = mainSettings['what to change']['mute off'];
  
  if(document.getElementById('autoplay-topic').checked){
    obs.topic = observer({
      target: document.querySelector(`div[class^=content][class*=content--full]`),
      search: /andropov_video__container/,
      msg: '[OBS topic] активирован',
      func: (arr) => {
        if(arr.tagName === 'VIDEO'){
          console.log('[OBS topic] Видео найдено, переписываю атрибуты.');
          changeVideoAttr(false, arr);
        }
      }
    })
    setAttributes({def:false, target:`div[class^=content][class*=content--full] video`});
  }
  if(document.getElementById('autoplay-comments').checked){
    obs.comments = observer({
      target: document.querySelector(`div[class^=comments][class*=comments--ready]`),
      search: /andropov_video__container/,
      msg: '[OBS comments] активирован',
      func: (arr) => {
        if(arr.tagName === 'VIDEO'){
          console.log('[OBS comments] Видео найдено, переписываю атрибуты.');
          changeVideoAttr(false, arr);
        }
      }
  })
  setAttributes({def:false, target:`div[class^=comments][class*=comments--ready] video`});
  }
}

function init(settings){
  settings ? mainSettings = mergeSettings(defaultSettings, settings) : mainSettings = defaultSettings;
  new SettingsOpener(document.body);
  if(!document.getElementById('stg-DTF-shutUp-video-autoplay')) new SettingsItem();
  new DtfHeader(document.querySelector(`div[class^=content][class*=content--full]`).children[0], document.querySelector(`div[class^=content][class*=content--full]`).children[0]);
  new Autoplay(document.getElementById('Dtf-header'));
  setMinisettings();
  console.log(`[init] Инициализация скрипта успешно выполнена.`, mainSettings);
}
