# Software Requirements Specification (SRS)
## Feature: Multi-Language Support (Internationalization)
### Project: niloorayehe-dashboard

**Version:** 2.0
**Date:** 2026-08-27
**Changelog:** v2.0 — Switched from cookie-only, non-URL locale to URL-based locale routing (`/en`, `/fa`) for SEO purposes. Updated folder structure: `messages` now under `public/`.

---

## 1. مقدمه (Introduction)

### 1.1 هدف
این سند، نیازمندی‌های مربوط به افزودن قابلیت چندزبانه بودن (چندزبانگی) به داشبورد niloorayehe را مشخص می‌کند. برنامه باید از دو زبان انگلیسی (`en`) و فارسی (`fa`) با استفاده از کتابخانه `next-intl` پشتیبانی کند. با توجه به اهمیت سئو (SEO)، زبان هر صفحه باید در آدرس (URL) مشخص باشد (مثلاً `/fa/dashboard` و `/en/dashboard`) تا موتورهای جستجو بتوانند هر نسخه زبانی را به‌صورت جداگانه ایندکس کنند.

### 1.2 محدوده (Scope)
این ویژگی شامل موارد زیر است:
- افزودن `next-intl` به پروژه فعلی Next.js (App Router)
- پشتیبانی از دو زبان اولیه: انگلیسی و فارسی
- نمایش زبان به‌صورت بخشی از مسیر URL (`/en/...`, `/fa/...`) برای پشتیبانی از سئو
- هدایت خودکار (redirect) کاربر به زبان مناسب هنگام ورود بدون مشخص کردن زبان در URL (مثلاً ورود به `/`)
- پشتیبانی از جهت متن (چپ‌به‌راست / راست‌به‌چپ) به‌ازای هر زبان، به شکلی که برای زبان‌های آینده هم قابل گسترش باشد

این ویژگی شامل موارد زیر **نمی‌شود**:
- ترجمه واقعی محتوای صفحات (کار جداگانه و مستمر بعد از آماده شدن زیرساخت)
- پنل مدیریت ترجمه‌ها
- تولید sitemap یا متادیتای سئوی پیشرفته (hreflang و...) — این‌ها می‌توانند در فاز بعدی اضافه شوند

### 1.3 اصطلاحات
| اصطلاح | توضیح |
|---|---|
| i18n | بین‌المللی‌سازی — طراحی برنامه برای پشتیبانی از چند زبان |
| Locale | شناسه زبان، مثل `en` یا `fa` |
| RTL | جهت راست‌به‌چپ (مثل فارسی) |
| LTR | جهت چپ‌به‌راست (مثل انگلیسی) |
| SSR | رندر سمت سرور |
| SRS | همین سند نیازمندی‌ها |
| hreflang | تگ متادیتای HTML که به موتورهای جستجو نسخه‌های زبانی یک صفحه را معرفی می‌کند |

---

## 2. توضیح کلی (Overall Description)

### 2.1 دیدگاه محصول
این یک ویژگی است که به برنامه فعلی داشبورد (Next.js 16، App Router) اضافه می‌شود. زبان به‌عنوان بخشی از ساختار مسیر (routing) برنامه در نظر گرفته می‌شود، نه فقط یک تنظیم داخلی.

### 2.2 ویژگی‌های کاربران
- کاربران ممکن است فارسی‌زبان یا انگلیسی‌زبان باشند.
- زبان پیش‌فرض فارسی است.
- کاربرانی که از موتور جستجو وارد می‌شوند، مستقیماً به نسخه زبانی صفحه (`/fa/...` یا `/en/...`) هدایت می‌شوند.

### 2.3 فرض‌ها و وابستگی‌ها
- پروژه برای مدیریت ترجمه و زبان از `next-intl` استفاده می‌کند.
- ساختار پروژه بر پایه `src/app` (App Router) است.
- هر صفحه باید زیر یک بخش پویا به‌نام `[locale]` در مسیر قرار بگیرد.
- کوکی (یا در صورت نیاز، localStorage) صرفاً برای به‌خاطر سپردن آخرین زبان انتخابی کاربر استفاده می‌شود؛ **نه** برای تعیین زبان صفحه در هر بار رندر (که حالا این کار توسط خودِ URL انجام می‌شود).

---

## 3. Functional Requirements

| ID | Requirement |
|---|---|
| FR-1 | The system shall support two languages: English (`en`) and Persian/Farsi (`fa`). |
| FR-2 | The default locale shall be Farsi (`fa`). |
| FR-3 | The user shall be able to switch languages via a UI control (e.g. a language switcher component). |
| **FR-4** | **(Reversed)** Every page shall have a distinct, crawlable URL per locale (e.g. `/en/dashboard`, `/fa/dashboard`), so each language version can be indexed independently by search engines. |
| FR-5 | Switching language via the UI shall navigate the user to the equivalent page under the new locale prefix (e.g. `/fa/dashboard` → `/en/dashboard`), preserving the current page/route. |
| FR-6 | When a user visits a URL without a locale prefix (e.g. `/`), the system shall redirect to the appropriate locale (previously selected locale if known, otherwise the default `fa`). |
| FR-7 | The user's last selected locale shall be remembered (via cookie) so that future visits to a locale-less URL redirect to their preferred language rather than always defaulting to Farsi. |
| FR-8 | Each supported locale shall have an associated text direction (`ltr` or `rtl`) defined in a central locale configuration, not hardcoded per component. |
| FR-9 | The `<html>` element's `lang` and `dir` attributes shall update to match the active locale and its direction. |
| FR-10 | All user-facing static text (labels, buttons, navigation, messages) shall be sourced from translation files rather than hardcoded strings. |
| FR-11 | Adding a new language in the future shall only require: a new translation file, and a new entry in the locale configuration (including its direction) — no changes to component logic. |

---

## 4. Non-Functional Requirements

| ID | Requirement |
|---|---|
| NFR-1 (SEO) | Each locale's pages must be served under a distinct, statically crawlable URL so search engines can index each language version separately. |
| NFR-2 (Performance) | The correct language and text direction must be present in the initial server-rendered HTML — no visible flash or layout shift when JavaScript loads. |
| NFR-3 (Maintainability) | Locale configuration (codes, labels, directions) shall be defined in a single, centralized file to keep the system easy to extend. |
| NFR-4 (Accessibility) | The `dir` and `lang` HTML attributes must always be accurate, since screen readers and browsers rely on them for correct text handling. |
| NFR-5 (Consistency) | Component code shall not need to check `if (locale === 'fa')` for direction logic — direction shall be derived from the locale configuration. |
| NFR-6 (Code Quality) | The implementation shall pass existing Biome lint rules and follow the project's existing TypeScript and folder conventions. |

---

## 5. System Architecture / Technical Design

### 5.1 High-Level Approach
- `next-intl` shall be configured **with** locale-prefixed routing, using a `[locale]` dynamic segment under `src/app/`, so every route exists per-locale (e.g. `/en/dashboard`, `/fa/dashboard`).
- A `middleware.ts` (using `next-intl/middleware`) shall handle:
  - Detecting the locale from the URL.
  - Redirecting locale-less requests (e.g. `/`) to the correct locale-prefixed path, based on the user's saved cookie preference, falling back to `fa`.
- Internal navigation (`Link`, `useRouter`, `usePathname`) shall use `next-intl`'s locale-aware navigation helpers (via `createNavigation`) so locale prefixes are handled automatically without manual string concatenation.

### 5.2 Folder Structure
```
niloorayehe-dashboard/
├── public/
│   └── messages/
│       ├── en.json
│       └── fa.json
├── src/
│   ├── i18n/
│   │   ├── routing.ts        # defineRouting: locales, defaultLocale
│   │   ├── navigation.ts     # createNavigation: locale-aware Link/router
│   │   └── request.ts        # loads messages, resolves locale per request
│   ├── middleware.ts          # next-intl middleware (locale detection & redirect)
│   └── app/
│       └── [locale]/
│           ├── layout.tsx     # sets <html lang= dir=>, wraps NextIntlClientProvider
│           └── page.tsx
```
*(Note: `messages` lives under `public/` per project decision — these files will be publicly accessible via direct URL, which is acceptable since translation content is not sensitive.)*

### 5.3 Locale Configuration Shape (conceptual)
Each locale entry shall include at minimum:
- `code` (e.g. `"fa"`, `"en"`)
- `label` (display name for the switcher, e.g. `"فارسی"`, `"English"`)
- `direction` (`"rtl"` | `"ltr"`)

This keeps direction a *property of the locale*, not a special case in code — a future third language only needs a new entry here.

### 5.4 Persistence & Redirect Mechanism
- The **URL** is the source of truth for which locale is currently active on a given page (needed for SEO — each URL is a distinct, indexable resource).
- A cookie (e.g. `NEXT_LOCALE`) stores the user's **last chosen locale**, used only to decide where to redirect when a locale-less URL is visited.
- `localStorage` is not used, to avoid SSR/client mismatch.

---

## 6. سناریوهای استفاده (Use Cases)

| شناسه | سناریو |
|---|---|
| UC-1 | به‌عنوان یک بازدیدکننده جدید که آدرس بدون زبان (`/`) رو باز می‌کنه، به‌صورت خودکار به `/fa` هدایت می‌شم و داشبورد رو با چیدمان راست‌به‌چپ می‌بینم. |
| UC-2 | به‌عنوان کاربر، با کلیک روی دکمه تغییر زبان، از `/fa/dashboard` به `/en/dashboard` منتقل می‌شم و چیدمان به چپ‌به‌راست تغییر می‌کنه. |
| UC-3 | به‌عنوان کاربری که قبلاً زبان انگلیسی رو انتخاب کرده، اگه دوباره آدرس بدون زبان (`/`) رو باز کنم، به‌جای فارسی، به `/en` هدایت می‌شم (چون کوکی زبان قبلی رو یادش مونده). |
| UC-4 | به‌عنوان یک موتور جستجو (مثل گوگل)، می‌تونم `/fa/dashboard` و `/en/dashboard` رو به‌صورت دو صفحه جدا و مستقل ایندکس کنم. |
| UC-5 | به‌عنوان توسعه‌دهنده، وقتی بخوام زبان سومی اضافه کنم، فقط یک فایل ترجمه جدید و یک ورودی تنظیمات جدید اضافه می‌کنم؛ next-intl خودش مسیرهای جدید رو مدیریت می‌کنه. |

---

## 7. Data Requirements

### 7.1 Translation Files
- Location: `public/messages/{locale}.json` (e.g. `public/messages/en.json`, `public/messages/fa.json`).
- Structure shall be nested by feature/section (e.g. `nav.dashboard`, `common.save`) to stay organized as the app grows.

### 7.2 Locale Configuration Data
- A single source-of-truth list of supported locales, each with `code`, `label`, and `direction`, as described in Section 5.3, defined in `src/i18n/routing.ts` (and a related config object for label/direction).

### 7.3 Cookie Data
- Cookie name: to be finalized (commonly `NEXT_LOCALE`).
- Value: the user's last-selected locale code (`en` or `fa`).
- Purpose: only used to decide the redirect target for locale-less URLs — **not** the source of truth for the currently rendered page's language (that's the URL).

---

## 8. Constraints

| ID | Constraint |
|---|---|
| **C-1** | **(Reversed)** Every page must be reachable through a distinct, locale-prefixed URL (`/en/...`, `/fa/...`) to satisfy SEO requirements. |
| C-2 | `localStorage` shall not be used as the source of truth for locale (server-rendering requirement). |
| C-3 | The solution must work within the existing Next.js 16 App Router + `src/app` structure. |
| C-4 | The solution must be compatible with the existing Biome linting and React Compiler configuration already in the project. |
| C-5 | Translation files are stored under `public/` and are therefore publicly accessible via direct URL — no sensitive data may be placed in these files. |

---

## 9. ملاحظات آینده (Future Considerations)

- زبان‌های بیشتر (مثلاً عربی یا ترکی) رو می‌شه با اضافه‌کردن `code`، `label` و `direction` مربوطه اضافه کرد.
- در فاز بعدی می‌شه تگ‌های `hreflang` و sitemap چندزبانه رو هم اضافه کرد تا سئو کامل‌تر بشه.
- اگه لازم شد آدرس‌های صفحات هم ترجمه بشن (مثلاً `/fa/درباره-ما` به‌جای `/fa/about`)، next-intl از "localized pathnames" هم پشتیبانی می‌کنه که می‌تونه در فاز بعدی بررسی بشه.

---

## 10. معیارهای پذیرش (Acceptance Criteria)

- [ ] هر صفحه هم زیر `/fa/...` و هم زیر `/en/...` در دسترس و قابل ایندکس است.
- [ ] ورود به آدرس بدون زبان (`/`) کاربر رو به زبان مناسب (کوکی قبلی یا فارسی به‌صورت پیش‌فرض) هدایت می‌کنه.
- [ ] تغییر زبان از طریق UI، کاربر رو به همون صفحه اما زیر پیشوند زبان جدید می‌بره (نه به صفحه اصلی).
- [ ] ویژگی‌های `lang` و `dir` در `<html>` همیشه با زبان فعال (بر اساس URL) مطابقت دارند.
- [ ] فایل‌های ترجمه در `public/messages/en.json` و `public/messages/fa.json` قرار دارند و به‌درستی لود می‌شوند.
- [ ] افزودن یک زبان سوم آزمایشی فقط نیاز به یک فایل ترجمه جدید و یک ورودی تنظیمات دارد.
- [ ] هیچ بررسی مستقیمی مانند `if (locale === 'fa')` برای جهت متن در کد کامپوننت‌ها وجود ندارد.
- [ ] لینت Biome بدون هیچ خطای جدید اجرا می‌شود.