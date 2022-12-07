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
      checked: mainSettings['what to stop']['topic comments'],
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
  }
}

function init(settings){
  settings ? mainSettings = mergeSettings(defaultSettings, settings) : mainSettings = defaultSettings;
  new Settings({
    path: document.body
  })
  new DtfHeader(document.querySelector(`div[class^=content][class*=content--full]`).children[0], document.querySelector(`div[class^=content][class*=content--full]`).children[0]);
  new Autoplay(document.getElementById('Dtf-header'));
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
  console.log(`[init] Инициализация скрипта успешно выполнена.`, mainSettings);
}
