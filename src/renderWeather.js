const { VITE_API_URL } = import.meta.env

export function getWeatherIcon(weather) {
  if (!weather) return "🌤️";
  if (weather.includes("晴")) return "☀️";
  if (weather.includes("多雲")) return "⛅";
  if (weather.includes("陰")) return "☁️";
  if (weather.includes("雨")) return "🌧️";
  if (weather.includes("雷")) return "⛈️";
  return "🌤️";
}

export function getAdvice(rainProb, maxTemp) {
  let rainIcon = "🌂";
  let rainText = "不用帶傘";
  if (parseInt(rainProb) > 30) {
    rainIcon = "☂️";
    rainText = "記得帶傘！";
  }

  let clothIcon = "👕";
  let clothText = "舒適穿搭";
  if (parseInt(maxTemp) >= 28) {
    clothIcon = "🎽";
    clothText = "短袖出發";
  } else if (parseInt(maxTemp) <= 20) {
    clothIcon = "🧥";
    clothText = "加件外套";
  }

  return { rainIcon, rainText, clothIcon, clothText };
}

export function getTimePeriod(startTime) {
  const hour = new Date(startTime).getHours();
  if (hour >= 5 && hour < 11) return "早晨";
  if (hour >= 11 && hour < 14) return "中午";
  if (hour >= 14 && hour < 18) return "下午";
  if (hour >= 18 && hour < 23) return "晚上";
  return "深夜";
}

export function renderWeather(data) {
  const forecasts = data.forecasts;
  const current = forecasts[0];
  const others = forecasts.slice(1);

  // 1. 渲染 Hero Card (主畫面)
  const advice = getAdvice(current.rain, current.maxTemp);
  const period = getTimePeriod(current.startTime);
  const avgTemp = Math.round((parseInt(current.maxTemp) + parseInt(current.minTemp)) / 2);

  document.getElementById('heroCard').innerHTML = `
                        <div class="hero-card">
                            <div class="hero-period">${period}</div>
                            <div class="hero-temp-container">
                                <div class="hero-icon">${getWeatherIcon(current.weather)}</div>
                                <div class="hero-temp">${avgTemp}°</div>
                            </div>
                            <div class="hero-desc">${current.weather}</div>
                            
                            <div class="advice-grid">
                                <div class="advice-item">
                                    <div class="advice-icon">${advice.rainIcon}</div>
                                    <div class="advice-text">${advice.rainText}</div>
                                    <div class="advice-sub-text">降雨率 ${current.rain}</div>
                                </div>
                                <div class="advice-item">
                                    <div class="advice-icon">${advice.clothIcon}</div>
                                    <div class="advice-text">${advice.clothText}</div>
                                    <div class="advice-sub-text">最高溫 ${current.maxTemp}°</div>
                                </div>
                            </div>
                        </div>
                    `;

  // 2. 渲染稍後預報 (包含明天判斷)
  const scrollContainer = document.getElementById('futureForecasts');
  scrollContainer.innerHTML = '';

  // 抓今天的日期數字 (例如 24)
  const todayDate = new Date().getDate();

  others.forEach(f => {
    let p = getTimePeriod(f.startTime);

    // 判斷該預報的日期是否跟今天不同，不同就是明天
    const fDate = new Date(f.startTime);
    if (fDate.getDate() !== todayDate) {
      p = "明天" + p;
    }

    scrollContainer.innerHTML += `
                            <div class="mini-card">
                                <div class="mini-time">${p}</div>
                                <div class="mini-icon">${getWeatherIcon(f.weather)}</div>
                                <div class="mini-temp">${f.minTemp}° - ${f.maxTemp}°</div>
                                <div class="advice-sub-text">💧${f.rain}</div>
                            </div>
                        `;
  });

  // 3. 右上角顯示今日日期
  const now = new Date();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const dayIndex = now.getDay();
  const days = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];

  document.getElementById('updateTime').textContent = `${month}月${date}日 ${days[dayIndex]}`;
}

export const hiddenLoadingOverlay = () => {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('mainContent').style.display = 'block';
}

export const showLoadingOverlay = () => {
  document.getElementById('loading').style.display = 'flex';
  document.getElementById('mainContent').style.display = 'none';
}