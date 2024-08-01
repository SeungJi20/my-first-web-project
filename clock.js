document.addEventListener('DOMContentLoaded', () => {
    let batteryLevel = 100;
    let alarms = [];
    const batteryElement = document.getElementById('battery');
    const clockElement = document.getElementById('clock');
    const alarmsElement = document.getElementById('alarms');
    const addAlarmButton = document.getElementById('add-alarm-button');

    function updateBattery() {
        if (batteryLevel > 0) {
            batteryLevel--;
            batteryElement.textContent = `배터리: ${batteryLevel}%`;
        } else {
            clockElement.style.display = 'none';
            batteryElement.textContent = `배터리: ${batteryLevel}%`;
            alert('배터리가 없습니다!'); // 배터리가 없을 때 알림창 표시
            clearInterval(batteryInterval);
            clearInterval(clockInterval);
        }
    }
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    
        checkAlarms(hours, minutes, seconds); 
    }
    
    

    function checkAlarms(hours, minutes) {
        alarms.forEach((alarm, index) => {
            if (alarm.hours === hours && alarm.minutes === minutes) {
                alert(`알람 ${index + 1}이 울립니다!`);
            }
        });
    }

    function addAlarm() {
        console.log('알람 추가 버튼 클릭됨'); 
        if (alarms.length >= 3) {
            alert('최대 3개의 알람을 설정할 수 있습니다.');
            return;
        }
    
        const hours = parseInt(document.getElementById('alarm-hours').value, 10);
        const minutes = parseInt(document.getElementById('alarm-minutes').value, 10);
        const seconds = parseInt(document.getElementById('alarm-seconds').value, 10);
    
        // 입력값 검증
        if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
            alert('모든 필드를 올바르게 입력해 주세요.');
            return;
        }
        
        if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
            alert('입력된 값이 유효하지 않습니다. 시(0-23), 분(0-59), 초(0-59)를 입력하세요.');
            return;
        }
    
        console.log(`알람 시간 설정: ${hours}:${minutes}:${seconds}`);
    
        alarms.push({ hours: String(hours).padStart(2, '0'), minutes: String(minutes).padStart(2, '0'), seconds: String(seconds).padStart(2, '0') });
    
        // 알람 시간으로 정렬
        alarms.sort((a, b) => {
            if (a.hours === b.hours) {
                if (a.minutes === b.minutes) {
                    return a.seconds - b.seconds; // 같은 시간과 분일 경우 초로 정렬
                }
                return a.minutes - b.minutes; // 같은 시간일 경우 분으로 정렬
            }
            return a.hours - b.hours; // 시간으로 정렬
        });
    
        updateAlarms();
    }
    
    
    
    function updateAlarms() {
        alarmsElement.innerHTML = '';
        alarms.forEach((alarm, index) => {
            const alarmDiv = document.createElement('div');
            alarmDiv.textContent = `알람 ${index + 1}: ${alarm.hours}:${alarm.minutes}:${alarm.seconds}`; // 초 포함
            const editButton = document.createElement('button');
            editButton.textContent = '수정';
            editButton.onclick = () => editAlarm(index);
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '삭제';
            deleteButton.onclick = () => deleteAlarm(index);
            alarmDiv.appendChild(editButton);
            alarmDiv.appendChild(deleteButton);
            alarmsElement.appendChild(alarmDiv);
        });
    }
    
    
    function checkAlarms(hours, minutes, seconds) {
        alarms.forEach((alarm, index) => {
            if (alarm.hours === hours && alarm.minutes === minutes && alarm.seconds === seconds) {
                alert(`알람 ${index + 1}이 울립니다!`);
                // 알람이 울린 후 삭제
                alarms.splice(index, 1);
                updateAlarms(); // 알람 목록 업데이트
            }
        });
    }
    
    
    
    function editAlarm(index) {
        const newTime = prompt('새로운 시간 입력 (HH:MM)', `${alarms[index].hours}:${alarms[index].minutes}`);
        if (!newTime) return;

        const [newHours, newMinutes] = newTime.split(':');
        alarms[index] = { hours: newHours, minutes: newMinutes };
        updateAlarms();
    }

    function deleteAlarm(index) {
        alarms.splice(index, 1);
        updateAlarms();
    }

    addAlarmButton.addEventListener('click', addAlarm);

    const batteryInterval = setInterval(updateBattery, 1000);
    const clockInterval = setInterval(updateClock, 1000);
    updateClock(); 
});
