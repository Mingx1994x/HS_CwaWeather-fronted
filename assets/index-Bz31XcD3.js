(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(e){if(e.ep)return;e.ep=!0;const n=o(e);fetch(e.href,n)}})();const y={VITE_API_URL:"https://hs-cwaweather.zeabur.app"},{VITE_API_URL:T}=y;function u(i){return i?i.includes("晴")?"☀️":i.includes("多雲")?"⛅":i.includes("陰")?"☁️":i.includes("雨")?"🌧️":i.includes("雷")?"⛈️":"🌤️":"🌤️"}function I(i,t){let o="🌂",r="不用帶傘";parseInt(i)>30&&(o="☂️",r="記得帶傘！");let e="👕",n="舒適穿搭";return parseInt(t)>=28?(e="🎽",n="短袖出發"):parseInt(t)<=20&&(e="🧥",n="加件外套"),{rainIcon:o,rainText:r,clothIcon:e,clothText:n}}function v(i){const t=new Date(i).getHours();return t>=5&&t<11?"早晨":t>=11&&t<14?"中午":t>=14&&t<18?"下午":t>=18&&t<23?"晚上":"深夜"}function $(i){const t=i.forecasts,o=t[0],r=t.slice(1),e=I(o.rain,o.maxTemp),n=v(o.startTime),c=Math.round((parseInt(o.maxTemp)+parseInt(o.minTemp))/2);document.getElementById("heroCard").innerHTML=`
                        <div class="hero-card">
                            <div class="hero-period">${n}</div>
                            <div class="hero-temp-container">
                                <div class="hero-icon">${u(o.weather)}</div>
                                <div class="hero-temp">${c}°</div>
                            </div>
                            <div class="hero-desc">${o.weather}</div>
                            
                            <div class="advice-grid">
                                <div class="advice-item">
                                    <div class="advice-icon">${e.rainIcon}</div>
                                    <div class="advice-text">${e.rainText}</div>
                                    <div style="font-size:0.7rem; color:#999">降雨率 ${o.rain}</div>
                                </div>
                                <div class="advice-item">
                                    <div class="advice-icon">${e.clothIcon}</div>
                                    <div class="advice-text">${e.clothText}</div>
                                    <div style="font-size:0.7rem; color:#999">最高溫 ${o.maxTemp}°</div>
                                </div>
                            </div>
                        </div>
                    `;const l=document.getElementById("futureForecasts");l.innerHTML="";const m=new Date().getDate();r.forEach(s=>{let d=v(s.startTime);new Date(s.startTime).getDate()!==m&&(d="明天"+d),l.innerHTML+=`
                            <div class="mini-card">
                                <div class="mini-time">${d}</div>
                                <div class="mini-icon">${u(s.weather)}</div>
                                <div class="mini-temp">${s.minTemp}° - ${s.maxTemp}°</div>
                                <div style="font-size:0.8rem; color:#888; margin-top:5px;">💧${s.rain}</div>
                            </div>
                        `});const a=new Date,p=a.getMonth()+1,f=a.getDate(),h=a.getDay(),g=["週日","週一","週二","週三","週四","週五","週六"];document.getElementById("updateTime").textContent=`${p}月${f}日 ${g[h]}`}async function w(){try{const i=new Promise(e=>setTimeout(e,1500)),t=fetch(`${T}/api/weather/general/taichung`).then(e=>e.json()),[o,r]=await Promise.all([i,t]);if(r.success)$(r.data),document.getElementById("loading").style.display="none",document.getElementById("mainContent").style.display="block";else throw new Error("API Error")}catch(i){console.error(i),alert("天氣資料讀取失敗，狸克把網路線咬斷了！")}}document.querySelector("#app").innerHTML=`
  <div id="loading" class="loading-screen">
        <div style="font-size: 4rem; animation: bounce 2s infinite;">☁️</div>
        <p style="color: white; font-weight: bold; margin-top: 20px;">正在觀測雲的流動...</p>
    </div>
    <div class="status-bar">
        <div>
          <select name="" id="" class="location-pill">
            <option value="taipei">📍臺北市</option>
            <option value="new_taipei">📍新北市</option>
            <option value="hsinchu">📍新竹市</option>
            <option value="taichung" selected>📍臺中市</option>
            <option value="kaohsiung">📍高雄市</option>
          </select>
        </div>
        <div id="updateTime" class="update-pill">更新中...</div>
    </div>

    <div class="container" id="mainContent" style="display: none;">

        <div id="heroCard">
        </div>

        <h3 class="section-title">稍後預報</h3>
        <div class="scroll-container" id="futureForecasts">
        </div>

    </div>
`;w();
