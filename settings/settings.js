// ==UserScript==
// @name        DTF settings
// @namespace   https://github.com/TentacleTenticals/dtf-shutUp-video-autoplay
// @match       https://dtf.ru/*
// @grant       none
// @version     1.0
// @author      Tentacle Tenticals
// @description Класс настроек DTF скрипта. Используются для меню настроек
// @homepage    https://github.com/TentacleTenticals/dtf-shutUp-video-autoplay
// @license MIT
// ==/UserScript==
/* jshint esversion:8 */

class Settings {
  constructor(params){
    if(document.getElementById('DTF-settings')) return;
    this.main=document.createElement('div');
    this.main.className='DTF-settings';
    this.main.id='DTF-settings';
    document.body.appendChild(this.main);

    this.close=document.createElement('button');
    this.close.className='btn';
    this.close.textContent='Закрыть настройки';
    this.close.style=`
      width: 100%;
      box-shadow: 0px 0px 2px 0px black;
      cursor: pointer;
    `;
    this.close.onclick=() => {
      this.main.remove();
    }
    this.main.appendChild(this.close);

    this.form=document.createElement('form');
    this.form.id='settings';
    this.form.action='';
    this.form.method='dialog';
    this.form.onsubmit=() => {
      settingsUpdater(db, getSettings());
      this.main.remove();
    }
    this.main.appendChild(this.form);

    this.whatToStop = new Field({
      path: this.form,
      groupName: 'what to stop',
      legend: `Что останавливать`,
      style: `display: grid;
      grid-template-columns: repeat(1, max-content);
      width: 100%;`,
      items: [
        {
          type: 'checkbox',
          name: 'topic video',
          checked: mainSettings['what to stop']['topic video'],
          text: 'Отключить автозапуск видео в статьях'
        },
        {
          type: 'checkbox',
          name: 'comments video',
          checked: mainSettings['what to stop']['comments video'],
          text: 'Отключить автозапуск видео в комментариях'
        }
      ]
    });

    this.whatToChange = new Field({
      path: this.form,
      groupName: 'what to change',
      legend: `Что изменять`,
      style: `display: grid;
      grid-template-columns: repeat(1, max-content);
      width: 100%;`,
      items: [
        {
          type: 'checkbox',
          name: 'video preload',
          checked: mainSettings['what to change']['video preload'],
          text: 'Устанавливать предзагрузку видео'
        },
        {
          type: 'checkbox',
          name: 'mute off',
          checked: mainSettings['what to change']['mute off'],
          text: 'Отключать громкость'
        }
      ]
    });

    this.videoSettings = new Field({
      path: this.form,
      groupName: 'video settings',
      legend: `Настройки видео`,
      style: `display: grid;
      grid-template-columns: repeat(1, max-content);
      row-gap: 5px;
      width: 100%;`,
      items: [
        {
          type: 'checkbox',
          name: 'preview',
          value: mainSettings['video settings']['preview'],
          text: 'Показывать превью видео (thumbnail)'
        },
        {
          type: 'number',
          name: 'volume level',
          value: mainSettings['video settings']['volume level'],
          step: 0.1,
          min: 0.1,
          max: 1.0,
          text: 'Уровень громкости'
        }
      ],
      select: [
        {
          name: 'preload type',
          label: 'Тип предзагрузки видео',
          value: mainSettings['video settings']['preload type'],
          options: ['none', 'metainfo']
        }
      ]
    });
    


    this.buttonContainer=document.createElement('div');
    this.buttonContainer.style=`display: grid;
    grid-template-columns: repeat(3, auto);
    justify-content: center;
    /* row-gap: 5px; */
    column-gap: 5px;
    margin-top: 3px;`;
    this.form.appendChild(this.buttonContainer);

    this.submit=document.createElement('input');
    this.submit.type='submit';
    this.submit.id='saveSettings';
    this.submit.value='Сохранить настройки';
    this.buttonContainer.appendChild(this.submit);

    this.backToDefault=document.createElement('input');
    this.backToDefault.type='submit';
    this.backToDefault.value='Сбросить';
    this.backToDefault.onclick=() => {
      // this.main.remove();
    }
    this.backToDefault.disabled = true;
    this.buttonContainer.appendChild(this.backToDefault);

    this.close=document.createElement('input');
    this.close.type='submit';
    this.close.value='Отмена';
    this.close.onclick=() => {
      this.main.remove();
    }
    this.buttonContainer.appendChild(this.close);
  }
}
