1. Запускаєш Docker
2. Стартуєш проєкт -
   copy .env.example .env
   docker compose up
3. Відкриваєш браузер - http://localhost:5173
4. Пишеш код як зазвичай VS Code
   зберігаєш файли
   hot reload працює автоматично
5. Закінчив роботу - Ctrl + C -> docker compose down

icons - https://react-icons.github.io/react-icons/icons/bs/

ШПАРГАЛКА
Ситуація Команда
Почати роботу docker compose up
Нові залежності docker compose up --build
Подивитись логи docker compose logs -f
Зайти в контейнер docker compose exec app sh
Зупинити docker compose down

src/
├─ app/ # ініціалізація застосунку
│ ├─ providers/ # контексти, redux, query
│ ├─ components/ # Компоненти
│ ├─ styles/ # глобальні стилі
│ └─ App.tsx # точка входу app
│
├─ shared/ # перевикористовувані речі
│ ├─ ui/ # кнопки, інпути, модалки
│ ├─ hooks/ # загальні хуки
│ ├─ lib/ # утиліти, helpers
│ ├─ api/ # http клієнт
│ └─ constants/
│
├─ entities/ # бізнес-сутності
│ ├─ user/
│ ├─ product/
│ └─ order/
│
├─ features/ # конкретна бізнес-логіка
│ ├─ auth/
│ ├─ add-to-cart/
│ └─ checkout/
│
├─ pages/ # сторінки (роути)
│ ├─ Home/
│ ├─ Login/
│ └─ Profile/
│
├─ widgets/ # великі блоки UI
│ ├─ Header/
│ └─ Navbar/
│
├─ index.css
└─ main.tsx

.
/
/
/
