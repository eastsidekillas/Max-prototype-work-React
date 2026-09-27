# MAX Chat — тестовое задание

Веб-интерфейс для отправки и получения текстовых сообщений в мессенджере MAX через
[GREEN-API](https://green-api.com/max). Прототип интерфейса — [web.max.ru](https://web.max.ru/)

## Запуск локально

```bash
npm install
npm run dev
```

Приложение откроется на `http://localhost:5173`.

Для продакшен-сборки:

```bash
npm run build
npm run preview
```

## Использование

1. После входа нажмите **«+ Новый чат»** и введите номер телефона получателя.
2. Напишите сообщение в поле внизу и отправьте.
3. Ответ собеседника в MAX появится в чате — фоновый long-polling опрашивает
   `ReceiveNotification` в цикле.

## Структура проекта (Feature-Sliced Design)

Слои расположены сверху вниз по правилу импортов: `app` → `pages` → `widgets` →
`features` → `entities` → `shared`. Каждый слайс отдаёт наружу только то, что
экспортировано из его `index.ts` (публичный API слайса).

```
src/
  app/                    — точка сборки приложения
    App.tsx               — переключение LoginPage / ChatPage по наличию credentials
    index.css             — @tailwind-директивы и базовые стили

  pages/
    login/                — экран входа (обёртка над фичей auth-by-instance)
    chat/                 — главный экран: держит состояние chats/activeChatId,
                             связывает виджеты Sidebar/ChatWindow с фичами
                             send-message / receive-messages / create-chat / logout

  widgets/
    sidebar/               — список чатов + шапка аккаунта (из entities/chat)
    chat-window/            — история сообщений + MessageComposer

  features/
    auth-by-instance/       — форма входа, проверка GetStateInstance, сохранение credentials
    create-chat/             — модалка «новый чат по номеру телефона»
    send-message/            — хук отправки с оптимистичным обновлением UI + композер
    receive-messages/        — long-polling цикл ReceiveNotification/DeleteNotification
    logout/                  — очистка credentials

  entities/
    instance/                — тип Credentials + persist в localStorage
    chat/                    — тип Chat, чистые редьюсеры (upsertChat/appendMessage),
                                 ChatAvatar, ChatListItem
    message/                 — тип ChatMessage, MessageBubble

  shared/
    api/green-api/           — тонкий fetch-клиент над методами GREEN-API
                                 (sendMessage/receiveNotification/deleteNotification/getStateInstance)
    config/                  — DEFAULT_GREEN_API_URL
    lib/                     — storage (typed localStorage), phone, time, id
    ui/                      — Button, IconButton, Input/Field, Modal, ErrorText (Tailwind)
```