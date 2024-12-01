let timerInterval;
let timeLeft = 0;
let isRunning = false;
let timerName = "";
// 播放警报音的函数
function playAlarm() {
const audio = new Audio('alarm.mp3'); // 确保你有名为'alarm.mp3'的音频文件
audio.play();
}

// 添加定时器名称
document.getElementById('add-name').addEventListener('click', () => {
    timerName = document.getElementById('timer-name').value || "No Name";
    document.getElementById('timer-name-display').innerText = timerName;
    document.getElementById('timer-name-display').style.font ="bold 24px arial,serif";
    document.getElementById('name-input').style.display = 'none';
});

// 重置定时器名称
document.getElementById('timer-name-display').addEventListener('click', () => {
    document.getElementById('name-input').style.display = 'block';
    document.getElementById('timer-name-display').innerText = '';
});

// 生成选择项
function populateDropdowns() {
    for (let i = 0; i < 24; i++) {
        document.getElementById('hours').innerHTML += `<option value="${i}">${i}</option>`;
    }
    for (let i = 0; i < 60; i++) {
        document.getElementById('minutes').innerHTML += `<option value="${i}">${i}</option>`;
        document.getElementById('seconds').innerHTML += `<option value="${i}">${i}</option>`;
    }
}
populateDropdowns();

function updateTimerDisplay() {
    let hours = Math.floor(timeLeft / 3600);
    let minutes = Math.floor((timeLeft % 3600) / 60);
    let seconds = timeLeft % 60;
    let progress = 0;

    document.getElementById('timer-display').textContent =
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`; 
    // 更新进度条
    let totalTime = parseInt(document.getElementById('hours').value) * 3600 + 
                    parseInt(document.getElementById('minutes').value) * 60 + 
                    parseInt(document.getElementById('seconds').value);
    progress = (totalTime - timeLeft) / totalTime * 100;
    document.getElementById('progress').style.width = `${progress}%`;
    document.getElementById('progress-bar').style.display = 'block'; 
}

function startTimer() {
    if (!isRunning) {
        let hours = parseInt(document.getElementById('hours').value) || 0;
        let minutes = parseInt(document.getElementById('minutes').value) || 0;
        let seconds = parseInt(document.getElementById('seconds').value) || 0;

        timeLeft = hours * 3600 + minutes * 60 + seconds;

        if (timeLeft > 0) {
            isRunning = true;
            timerInterval = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateTimerDisplay();
                } else {
                    clearInterval(timerInterval);
                    isRunning = false;
                    alert(`Time's up for ${timerName}!`);
                    // 在这里添加播放警报音的代码
                    playAlarm(); // 播放警报音
                }
            }, 1000);
        }
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = 0;
    document.getElementById('hours').value = '0';
    document.getElementById('minutes').value = '0';
    document.getElementById('seconds').value = '0';
    updateTimerDisplay();
    document.getElementById('progress-bar').style.display = 'none'; 
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);

// 检查系统主题偏好
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.getElementById('current-theme').textContent = '当前主题：深色';
}

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const themeText = document.getElementById('current-theme');
    
    if (currentTheme === 'dark') {
        html.removeAttribute('data-theme');
        themeText.textContent = '当前主题：浅色';
    } else {
        html.setAttribute('data-theme', 'dark');
        themeText.textContent = '当前主题：深色';
    }
}
