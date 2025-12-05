import './style.css'
import { fetchWeather } from './renderWeather.js'

document.querySelector('#app').innerHTML = `
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
`
fetchWeather()
