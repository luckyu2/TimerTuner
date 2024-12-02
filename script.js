// 定时器类
class Timer {
    constructor(id) {
        this.id = id;
        this.timerInterval = null;
        this.timeLeft = 0;
        this.isRunning = false;
        this.timerName = "";
        this.createTimerElement();
        this.initializeEvents();
    }

    createTimerElement() {
        const timerHTML = `
            <div class="timer-container" id="timer-${this.id}">
                <div class="name-input">
                    <input type="text" class="timer-name" placeholder="这里输入名字">
                    <button class="add-name">OK</button>
                </div>
                <div class="timer-name-display"></div>
                <div class="timer-display">00:00:00</div>
                <div class="progress-bar">
                    <div class="progress"></div>
                </div>
                <div class="time-input">
                    <h3>设置定时器</h3>
                    <select class="hours">
                        ${this.generateOptions(24)}
                    </select>
                    <label>时</label>
                    <select class="minutes">
                        ${this.generateOptions(60)}
                    </select>
                    <label>分</label>
                    <select class="seconds">
                        ${this.generateOptions(60)}
                    </select>
                    <label>秒</label>
                </div>
                <div class="controls">
                    <button class="start">开始</button>
                    <button class="pause">暂停</button>
                    <button class="reset">重置</button>
                    <button class="delete">删除</button>
                </div>
            </div>
        `;
        document.getElementById('timers-container').insertAdjacentHTML('beforeend', timerHTML);
        this.element = document.getElementById(`timer-${this.id}`);
    }

    generateOptions(max) {
        let options = '';
        for (let i = 0; i < max; i++) {
            options += `<option value="${i}">${i}</option>`;
        }
        return options;
    }

    initializeEvents() {
        // 添加名称
        this.element.querySelector('.add-name').addEventListener('click', () => {
            this.timerName = this.element.querySelector('.timer-name').value || "未命名";
            this.element.querySelector('.timer-name-display').innerText = this.timerName;
            this.element.querySelector('.name-input').style.display = 'none';
        });

        // 开始按钮
        this.element.querySelector('.start').addEventListener('click', () => this.startTimer());

        // 暂停按钮
        this.element.querySelector('.pause').addEventListener('click', () => this.pauseTimer());

        // 重置按钮
        this.element.querySelector('.reset').addEventListener('click', () => this.resetTimer());

        // 删除按钮
        this.element.querySelector('.delete').addEventListener('click', () => {
            this.element.remove();
        });
    }

    startTimer() {
        if (!this.isRunning) {
            const hours = parseInt(this.element.querySelector('.hours').value) || 0;
            const minutes = parseInt(this.element.querySelector('.minutes').value) || 0;
            const seconds = parseInt(this.element.querySelector('.seconds').value) || 0;

            this.timeLeft = hours * 3600 + minutes * 60 + seconds;

            if (this.timeLeft > 0) {
                this.isRunning = true;
                this.timerInterval = setInterval(() => {
                    if (this.timeLeft > 0) {
                        this.timeLeft--;
                        this.updateTimerDisplay();
                    } else {
                        clearInterval(this.timerInterval);
                        this.isRunning = false;
                        alert(`${this.timerName} 时间结束啦！`);
                        this.playAlarm();
                    }
                }, 1000);
            }
        }
    }

    pauseTimer() {
        if (this.isRunning) {
            clearInterval(this.timerInterval);
            this.isRunning = false;
        }
    }

    resetTimer() {
        clearInterval(this.timerInterval);
        this.isRunning = false;
        this.timeLeft = 0;
        this.element.querySelector('.hours').value = '0';
        this.element.querySelector('.minutes').value = '0';
        this.element.querySelector('.seconds').value = '0';
        this.updateTimerDisplay();
    }

    updateTimerDisplay() {
        const hours = Math.floor(this.timeLeft / 3600);
        const minutes = Math.floor((this.timeLeft % 3600) / 60);
        const seconds = this.timeLeft % 60;
        
        this.element.querySelector('.timer-display').textContent =
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    playAlarm() {
        const audio = new Audio('alarm.mp3');
        audio.play();
    }
}

// 初始化
let timerCounter = 0;
document.getElementById('create-timer').addEventListener('click', () => {
    new Timer(timerCounter++);
});

// 检查系统主题偏好
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.getElementById('current-theme').textContent = '暗';
}

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const themeText = document.getElementById('current-theme');
    
    if (currentTheme === 'dark') {
        html.removeAttribute('data-theme');
        themeText.textContent = '浅';
    } else {
        html.setAttribute('data-theme', 'dark');
        themeText.textContent = '暗';
    }
}

// 赞助链接
// 添加点击事件处理
document.getElementById('sponsor-link').addEventListener('mouseover', function(e) {
    const qrcodeContainer = this.querySelector('.qrcode-container');
    qrcodeContainer.classList.toggle('show-qrcode');
    
    // 点击其他地方关闭二维码
    document.addEventListener('click', function closeQrcode(event) {
        if (!event.target.closest('#sponsor-link')) {
            qrcodeContainer.classList.remove('show-qrcode');
            document.removeEventListener('click', closeQrcode);
        }
    });
});
