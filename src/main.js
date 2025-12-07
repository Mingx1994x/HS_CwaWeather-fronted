import './style.css';
import { fetchThreeDaysWeather, fetchWeather } from './fetchWeather';
import {
  hiddenLoadingOverlay,
  renderWeather,
  showLoadingOverlay,
} from './renderWeather';
import { swiper } from './swiper';
import 'swiper/css';
import { renderThreeDaysWeather } from './renderThreeDaysWeather';

document.querySelector('#app').innerHTML = `
  <div id="loading" class="loading-screen">
        <div style="font-size: 4rem; animation: bounce 2s infinite;">☁️</div>
        <p style="color: white; font-weight: bold; margin-top: 20px;">正在觀測雲的流動...</p>
    </div>
    <div class="status-bar">
        <div>
          <select name="" id="target-city" class="location-pill">
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

        <h2 class="section-title">稍後預報</h2>
        <div class="scroll-container" id="futureForecasts">
        </div>
        <h2 class="section-title">未來 3 天天氣預報</h2>
        <div class="scroll-container" id="moreForecasts">
          <div class="swiper mySwiper">
            <div class="swiper-wrapper" id="three-weather-content">
      
            </div>
          </div>
        </div>
    </div>
`;

// 初始化
const init = async () => {
  renderWeather(await fetchWeather());
  renderThreeDaysWeather(await fetchThreeDaysWeather());
  swiper();
  hiddenLoadingOverlay();
};

init();

const targetCity = document.querySelector('#target-city');
targetCity.addEventListener('change', async (e) => {
  showLoadingOverlay();
  renderWeather(await fetchWeather(e.target.value));
  renderThreeDaysWeather(await fetchThreeDaysWeather(e.target.value));
  swiper();
  hiddenLoadingOverlay();
});
