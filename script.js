const scriptURL =
  "https://script.google.com/macros/s/AKfycbzyJPFfCovyNlGlBfsgMC5ONoF-C4ETK3TM84RJGl-L7vbv5SHomUbqEY7VlxPHYiD_/exec";
const form = document.forms["submit-to-google-sheet"];

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const formSendResult = document.querySelector(".form-send");
  formSendResult.textContent = "";
  const drinks = formData.getAll("drinks");
  const submitButton = document.querySelector(".button");
  submitButton.textContent = "отправка...";
  // Преобразуем массив в строку с разделителем (например, запятая)
  const drinksString = drinks.join(", ");

  // Создаем новый FormData и добавляем все поля
  const newFormData = new FormData();
  newFormData.append("name", formData.get("name"));
  newFormData.append("presence", formData.get("presence"));
  newFormData.append("car", formData.get("car") || "-");
  newFormData.append("drinks", drinksString);
  newFormData.append("child", formData.get("child") || "-");
  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      body: newFormData,
    });
    formSendResult.textContent = "Спасибо! Анкета отправлена.";
    form.reset(); // Очищаем форму
  } catch (error) {
    formSendResult.textContent = "Повторите попытку позже.";
    console.error(error);
  } finally {
    // Возвращаем кнопку в исходное состояние
    submitButton.textContent = "отправить";
  }
});

const nameInput = document.getElementById("name");
const errorElement = document.getElementById("error-text");

nameInput.addEventListener("invalid", function (event) {
  event.preventDefault();
  if (this.validity.valueMissing) {
    errorElement.classList.add("show");
  }
});

nameInput.addEventListener("input", function () {
  if (this.value.trim() !== "") {
    errorElement.classList.remove("show");
  }
});

document.querySelectorAll('input[name="presence"]').forEach((radio) => {
  radio.addEventListener("invalid", function (e) {
    e.preventDefault();
    document.getElementById("presenceError").classList.add("show");
    return false;
  });
});

document.querySelectorAll('input[name="presence"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    document.getElementById("presenceError").classList.remove("show");
  });
});




const images = document.querySelectorAll(".karusel");
let currentIndex = 0;

function nextImage() {
  images[currentIndex].classList.remove("active");

  currentIndex = (currentIndex + 1) % images.length;

  images[currentIndex].classList.add("active");
}

// Запуск смены каждые 5 секунд
setInterval(nextImage, 3000);

document.addEventListener("DOMContentLoaded", function () {
  // Находим блок TIMING
  const timingSection = document.querySelector(".timing");

  // Создаём наблюдатель за прокруткой
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        // Когда блок появляется в зоне видимости
        if (entry.isIntersecting) {
          // Добавляем класс visible, который запускает анимацию
          entry.target.classList.add("visible");
          // Отключаем наблюдение после того, как анимация запустилась
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3, // Срабатывает когда 30% блока видно
      rootMargin: "0px 0px -50px 0px", // Небольшая корректировка
    },
  );

  // Начинаем следить за блоком
  observer.observe(timingSection);

  // Дополнительно: если блок уже виден при загрузке
  if (timingSection.getBoundingClientRect().top < window.innerHeight * 0.7) {
    timingSection.classList.add("visible");
    observer.unobserve(timingSection);
  }
});

function startCountdown(targetDate) {
  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      document.getElementById("timer").style.display = "none";
      document.getElementById("datetime").textContent = "Мы стали семьей!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

const newYear = new Date(2026, 7, 8, 9, 0, 0).getTime();
startCountdown(newYear);

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".one, .two, .three, .four");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Добавляем задержку каждому элементу
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 300); // 0.3 секунды между появлениями
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );

  elements.forEach((el) => observer.observe(el));
});
