const $year = document.querySelector("#year");
const $month = document.querySelector("#month");
const $prev = document.querySelector("#prev");
const $next = document.querySelector("#next");

const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth();

renderCalendarHeader = (year, month) => {
  $year.innerHTML = `${year}년`;
  $month.innerHTML = `${month + 1}월 상담일정`;
};

renderCalendar = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay(); // 이번달 한국시각 첫째일자
  const lastDate = new Date(year, month + 1, 0).getDate(); // 이번달 마지막 일자
  const weekday = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  renderCalendarHeader(year, month);

  let html = "";
  // 요일 출력
  for (let i = 0; i < weekday.length; i++) {
    if (i === 0) {
      html += `<div class="date weekday sunday">${weekday[i]}</div>`;
    } else if (i === 6) {
      html += `<div class="date weekday saturday">${weekday[i]}</div>`;
    } else {
      html += `<div class="date weekday">${weekday[i]}</div>`;
    }
  }
  // 빈 일자 출력
  for (let i = 0; i < firstDay; i++) {
    html += `<div class="date empty"></div>`;
  }
  // 일자 출력
  for (let day = 1; day <= lastDate; day++) {
    const dayIndex = (firstDay + day - 1) % 7;
    const paddedMonth = String(month + 1).padStart(2, "0");
    const paddedDay = String(day).padStart(2, "0");
    const fullDate = `${year}-${paddedMonth}-${paddedDay}`;

    if (dayIndex === 0) {
      html += `<div class="date sunday day" data-day="${fullDate}">${day}</div>`;
    } else if (dayIndex === 6) {
      html += `<div class="date saturday day" data-day="${fullDate}">${day}</div>`;
    } else {
      html += `<div class="date day" data-day="${fullDate}">${day}</div>`;
    }
  }

  document.querySelector("#calendar").innerHTML = html;
};
$prev.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentYear, currentMonth);
});

$next.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentYear, currentMonth);
});

renderCalendar(currentYear, currentMonth);
