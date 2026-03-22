# Repository Map

## Быстрый смысл
Этот файл нужен как короткая карта репозитория.

Он должен отвечать на четыре вопроса:
- где лежит настоящий исходник сайта
- где лежит контент
- где лежат картинки для публикации
- что временное, а что постоянное

## Что реально работает сейчас
- сайт собирается на `Eleventy`
- исходники шаблонов лежат в `site-src/`
- выход для GitHub Pages лежит в `docs/`
- контент разделен на taxonomy и entry-файлы в `content/`
- web-ready изображения лежат в `media/web/`
- страницы разделов и кейсов уже генерируются автоматически

## Основной поток данных
```text
tmp/Портфолио -> отбор -> media/source + content/entries -> media/web -> site-src -> docs
```

## Главные директории

### `site-src/`
Главный исходник сайта.

Здесь лежат:
- главная страница
- шаблоны
- маршруты
- CSS
- локальные reference-ассеты стартовой страницы

Ключевые файлы:
- [site-src/index.njk](/home/goov/git/portfolio-design-ok/site-src/index.njk)
- [site-src/site.css](/home/goov/git/portfolio-design-ok/site-src/site.css)
- [site-src/_data/portfolio.js](/home/goov/git/portfolio-design-ok/site-src/_data/portfolio.js)
- [site-src/work/index.njk](/home/goov/git/portfolio-design-ok/site-src/work/index.njk)
- [site-src/work/sections.njk](/home/goov/git/portfolio-design-ok/site-src/work/sections.njk)
- [site-src/work/subsections.njk](/home/goov/git/portfolio-design-ok/site-src/work/subsections.njk)
- [site-src/cases/case-pages.njk](/home/goov/git/portfolio-design-ok/site-src/cases/case-pages.njk)

### `content/`
Канонический слой структуры контента.

Подпапки:
- [content/taxonomy](/home/goov/git/portfolio-design-ok/content/taxonomy)
- [content/entries](/home/goov/git/portfolio-design-ok/content/entries)

Здесь агент должен менять:
- разделы
- подразделы
- описания проектов
- тип проекта: `case` или `gallery`

### `media/source/`
Отобранные мастер-файлы.

Это не public-output.
Это рабочий слой, куда складываются выбранные исходники.

### `media/web/`
Подготовленные web-файлы.

Обычно здесь лежат:
- `webp`
- ресайзнутые изображения
- файлы, которые уже можно публиковать на сайте

Важно:
- этот слой не раздается напрямую
- при сборке он копируется в `docs/assets/media/`

### `docs/`
Сгенерированный сайт для GitHub Pages.

Правило:
- не редактировать вручную, если это не было прямо запрошено

### `tmp/Портфолио/`
Временный intake-архив.

Это не финальная структура сайта и не source of truth.

Использовать для:
- разбора сырого контента
- отбора изображений
- поиска отсутствующих материалов

### `pf_map.md`
Временная карта архива `tmp/Портфолио/`.

Нужна для сортировки материалов, но не является постоянной архитектурой репозитория.

## Что считается каноническим
- страницы и шаблоны: `site-src/`
- taxonomy и entry: `content/`
- web-ready медиа: `media/web/`

Не каноническое:
- `docs/`
- `tmp/Портфолио/`
- `pf_map.md`

## Как генерируются страницы

### Главная
Берется из [site-src/index.njk](/home/goov/git/portfolio-design-ok/site-src/index.njk).

### Страница работ
Берется из [site-src/work/index.njk](/home/goov/git/portfolio-design-ok/site-src/work/index.njk).

### Страницы разделов
Генерируются из:
- [content/taxonomy/sections.json](/home/goov/git/portfolio-design-ok/content/taxonomy/sections.json)
- [site-src/work/sections.njk](/home/goov/git/portfolio-design-ok/site-src/work/sections.njk)

### Страницы подразделов
Генерируются из:
- [content/taxonomy/subsections.json](/home/goov/git/portfolio-design-ok/content/taxonomy/subsections.json)
- [site-src/work/subsections.njk](/home/goov/git/portfolio-design-ok/site-src/work/subsections.njk)

### Страницы кейсов
Генерируются из:
- [content/entries](/home/goov/git/portfolio-design-ok/content/entries)
- [site-src/cases/case-pages.njk](/home/goov/git/portfolio-design-ok/site-src/cases/case-pages.njk)

## Текущая модель сайта

### Публичная структура
- `Главная`
- `Работы`
- `Раздел`
- `Подраздел`
- `Кейс`

### Логическая структура
- `section`
- `subsection`
- `entry`

### Важное правило
Не каждая папка из сырого архива должна стать отдельной страницей.

Решение принимается через `content/entries`:
- если это большой самостоятельный проект -> `case`
- если это подборка или мелкие работы -> `gallery`

## Как агенту безопасно работать
- сначала читать `AGENTS.md`
- не строить сайт напрямую из `tmp/Портфолио/`
- править исходники, а не build-output
- после изменений, влияющих на сайт, запускать `npm run build`
- если меняется структура проекта, обновлять `AGENTS.md` и `repo-map.md`

## Ближайшие задачи
- привести главную страницу к более чистой и менее технической подаче
- отделить настоящие кейсы от галерейных подборок
- улучшить карточки проектов, тексты и подписи
- продолжить перенос контента из `tmp/Портфолио/` в `content/` и `media/`
