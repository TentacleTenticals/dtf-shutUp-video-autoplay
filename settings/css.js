// ==UserScript==
// @name        DTF-shutUp autoplay of videos CSS
// @namespace   https://github.com/TentacleTenticals
// @match       https://dtf.ru/*
// @grant       none
// @version     1.0
// @author      Tentacle Tenticals
// @description CSS скрипта
// @homepage    https://github.com/TentacleTenticals/dtf-shutUp-video-autoplay
// @license MIT
// ==/UserScript==
/* jshint esversion:8 */

let mainCss = `
.DTF-video {
    max-width: 600px;
    margin: auto;
}
.DTF-video .preview {
  position: absolute;
  z-index: 10;
  display: flex;
}
.DTF-video .preview button {
  width: 70px;
  height: 70px;
  background-color: rgb(255 255 255);
  font-size: 30px;
  border-radius: 50%;
  padding: 0px 0px 0px 8px;
  margin: auto;
  box-shadow: 0px 0px 3px 1px rgb(0 0 0);
  cursor: pointer;
}
.DTF-video .preview button:hover {
  background-color: rgb(255 255 255 / 80%);
}
.DTF-video :is(video, iframe) {
    width: 100%;
}`;

new CssAppend('DTF-settingsOpener', mainCss);
