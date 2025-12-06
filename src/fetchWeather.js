const { VITE_API_URL } = import.meta.env

const defaultCity = 'taichung';

export async function fetchWeather(city = defaultCity) {
  if (!VITE_API_URL) {
    console.log("API URL 設置有誤");
    return
  }
  try {
    // 1. 定義「最低等待時間」：1500 毫秒 (1.5秒)
    const delayPromise = new Promise(resolve => setTimeout(resolve, 1500));

    // 2. 定義「抓取資料」的工作
    const fetchPromise = fetch(`${VITE_API_URL}/api/weather/general/${city}`).then(res => res.json());

    // 3. Promise.all 會等待「兩個都完成」才會往下走
    // result 陣列裡，第一個是 delay 的結果(沒用到)，第二個是 api 的 json 資料
    const [_, json] = await Promise.all([delayPromise, fetchPromise]);

    if (json.success) {
      console.log("取得資料成功，回傳資料", json.data);

      return json.data
    } else {
      throw new Error("API Error");
    }
  } catch (e) {
    console.error(e);
    alert("天氣資料讀取失敗，狸克把網路線咬斷了！");
  }
}

export async function fetchThreeDaysWeather(city = defaultCity) {
  if (!VITE_API_URL) {
    console.log("API URL 設置有誤");
    return
  }
  try {
    // 1. 定義「最低等待時間」：1500 毫秒 (1.5秒)
    const delayPromise = new Promise(resolve => setTimeout(resolve, 1500));

    // 2. 定義「抓取資料」的工作
    const fetchPromise = fetch(`${VITE_API_URL}/api/weather/forecast/${city}`).then(res => res.json());

    // 3. Promise.all 會等待「兩個都完成」才會往下走
    // result 陣列裡，第一個是 delay 的結果(沒用到)，第二個是 api 的 json 資料
    const [_, json] = await Promise.all([delayPromise, fetchPromise]);

    if (json.success) {
      return json.data
    } else {
      throw new Error("API Error");
    }
  } catch (e) {
    console.error(e);
    alert("未來 3 天天氣資料讀取失敗，皮卡丘把線路燒壞了！");
  }
}