import { getTimePeriod, getWeatherIcon } from "./renderWeather";

export function getRelativeDate(fullDate) {
  const target = new Date(fullDate);
  const today = new Date();

  // 把時間清成 00:00:00，避免時區誤差
  target.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffDays = (target - today) / (1000 * 60 * 60 * 24);

  if (diffDays === 0) return "今天";
  if (diffDays === 1) return "明天";
  if (diffDays === 2) return "後天";

  // 超過三天就 fallback 成 M-D 顯示
  const [, month, day] = fullDate.split("-");
  return `${month}/${day}`;
}

export function sortThreeDaysWeather(data) {
  const forecasts = data.forecasts;

  // 你要的 6 個分類時段
  const targetHours = [0, 6, 12, 15, 18, 21];

  // { 日期: { hour: 資料 } }
  const grouped = {};

  forecasts.forEach(item => {
    const dateObj = new Date(item.startTime);
    const hour = dateObj.getHours();

    // 只保留你指定的時段
    if (!targetHours.includes(hour)) return;

    const fullDate = item.startTime.split("T")[0]; // 2025-12-07
    if (!grouped[fullDate]) {
      grouped[fullDate] = {};
    }

    grouped[fullDate][hour] = {
      startTime: item.startTime, // 顯示時間用
      weather: item.weather,
      rain: item.rain,
      temp: item.temp,
      comfort: item.comfort
    };
  });

  // 輸出整理
  const weatherDataOutput = Object.keys(grouped).map(fullDate => {
    const [, month, day] = fullDate.split("-");
    const prettyDate = getRelativeDate(fullDate);

    return {
      date: prettyDate,
      content: targetHours
        .map(hour => grouped[fullDate][hour]) // 依照你固定的時間順序排列
        .filter(Boolean) // 排除這天沒有的時段
    };
  });

  return weatherDataOutput;
}


export function renderThreeDaysWeather(data) {
  const weatherData = sortThreeDaysWeather(data);
  const swiperContent = document.getElementById('three-weather-content');
  swiperContent.innerHTML = '';

  weatherData.forEach((item) => {
    // 渲染資訊
    for (let i = 0; i < item.content.length - 1; i++) {
      let currentItem = item.content[i]
      swiperContent.innerHTML += `
      <div class="swiper-slide">
        <div class="mini-card">
          <div class="mini-time">${item.date} ${getTimePeriod(currentItem?.startTime)}</div>
          <div class="mini-icon">${getWeatherIcon(currentItem?.weather)}</div>
          <div class="mini-temp">${currentItem?.temp}°</div>
          <div class="advice-sub-text">💧${currentItem?.rain}</div>
        </div>
      </div>
      `;
    }
  });

}
