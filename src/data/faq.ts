// FAQ — single source for the visible accordion (SaftFaq.astro) and the
// FAQPage JSON-LD on the homepage, so the two can never drift apart.
import type { Lang } from '../i18n';

export interface FaqItem {
  q: string;
  a: string;
}

const uk: FaqItem[] = [
  {
    q: "Що таке SAF-T UA?",
    a: "SAF-T UA (Standard Audit File for Tax) — стандартний аудиторський файл для цілей оподаткування, що застосовується в Україні. Це XML-файл із визначеною структурою, який містить облікові дані, вивантажені з облікової системи за встановлений звітний період. Структура включає блоки Header, MasterFiles (зокрема TaxDifferences), GeneralLedgerEntries та SourceDocuments. Файл охоплює: загальну книгу / облікові регістри, дебіторів і кредиторів, документи продажів і закупівель, платежі, необоротні та нематеріальні активи, рух товарів, податкові різниці та первинні документи. Формат і структура визначені вимогами Міністерства фінансів / ДПС України.",
  },
  {
    q: "Що таке SAF-T простими словами?",
    a: "Простими словами, SAF-T (Standard Audit File for Tax) — це стандартизований електронний файл, через який підприємство передає податковій службі свої облікові дані. Замість надання окремих виписок і регістрів компанія формує один структурований XML-файл за звітний період — із загальною книгою, контрагентами, документами продажів і закупівель, платежами, активами та податковими різницями. В Україні застосовується версія SAF-T UA, яку великі платники податків надають на запит ДПС протягом 2 робочих днів.",
  },
  {
    q: "Хто має подавати SAF-T UA в Україні?",
    a: "SAF-T UA подається великими платниками податків на запит контролюючого органу. Файл має бути надано протягом 2 робочих днів з моменту отримання запиту. Вимоги визначаються нормативними актами Міністерства фінансів та ДПС України.",
  },
  {
    q: "Що робить SAF-T Connector?",
    a: "SAF-T Connector — програмне рішення LUCAS для формування аудиторських файлів SAF-T. Система зчитує дані з облікових систем та інших узгоджених джерел, трансформує їх відповідно до налаштованого мапінгу, генерує XML-файл та надає Excel-перегляд для зручної перевірки. Вбудована валідація перевіряє файл за офіційною схемою ДПС, виконує математичні та міжсекційні перевірки до подання.",
  },
  {
    q: "Хто розробляє та підтримує SAF-T Connector?",
    a: "SAF-T Connector розробляє і підтримує компанія LUCAS. Впровадження виконують власні команди LUCAS — фінансові консультанти та розробники, без розподілу відповідальності між постачальником програмного забезпечення і консультантами. LUCAS має практичний досвід участі в пілотному проєкті з впровадження SAF-T UA для великого міжнародного клієнта разом із представниками ДПС України.",
  },
  {
    q: "Чи можна сформувати SAF-T UA без зміни ERP-системи?",
    a: "У більшості випадків — так. SAF-T Connector налаштовується навколо наявної облікової конфігурації клієнта. Підхід до інтеграції узгоджується з IT-командою клієнта і залежить від архітектури системи, доступних методів вивантаження даних та вимог безпеки. Зміни в обліковій логіці ERP, як правило, не потрібні.",
  },
  {
    q: "З яких систем SAF-T Connector може отримувати дані?",
    a: "SAF-T Connector може інтегруватися з різними обліковими та ERP-системами: SAP, BAS та 1C (українські конфігурації), Odoo, Oracle, Microsoft Dynamics, власними системами клієнта, базами даних та структурованими Excel/CSV-вивантаженнями. Конкретний метод інтеграції визначається архітектурою системи клієнта, наявними методами доступу до даних та вимогами безпеки.",
  },
  {
    q: "Що входить у впровадження SAF-T Connector?",
    a: "Впровадження включає: аналіз якості та достатності облікових даних; розробку мапінгу облікових даних клієнта на структуру звітного файлу; налаштування SAF-T Connector та інтеграцію з джерелами даних; розгортання на інфраструктурі клієнта; тестування на реальних даних із XSD-валідацією та математичними перевірками; навчання користувачів та передачу процесу. LUCAS реалізує впровадження власними фінансовими консультантами та розробниками — без розподілу відповідальності між окремим постачальником програмного забезпечення та консультантами.",
  },
  {
    q: "Скільки часу займає впровадження?",
    a: "Типовий термін впровадження становить приблизно 3–4 місяці залежно від кількості юридичних осіб, складності облікової системи, якості даних, кількості джерел даних та доступності IT-команди клієнта.",
  },
  {
    q: "Які перевірки виконує SAF-T Connector?",
    a: "SAF-T Connector виконує три рівні перевірок: 1) XSD-валідація — перевірка XML-файлу на відповідність офіційній схемі ДПС (структура, типи даних, обов'язкові поля); 2) Математичні та бухгалтерські контролі — перевірка балансів, оборотів, узгодженості проводок; 3) Міжсекційні контролі — звіряння даних, які відображаються в різних блоках файлу одночасно. Помилки доступні для перегляду в інтерфейсі та у форматі Excel.",
  },
  {
    q: "Що відбувається, якщо ДПС оновлює XSD-схему?",
    a: "При оновленні офіційної схеми користувачі отримують нові версії SAF-T Connector з перевірками за оновленою схемою. Проте формування звіту може також вимагати оновлення мапінгу. Якщо активна річна підтримка — LUCAS оновлює мапінг при регуляторних змінах. Без підтримки клієнт може оновити мапінг власними силами або замовити роботу в LUCAS окремо.",
  },
  {
    q: "Чи можна переглядати SAF-T файл в Excel?",
    a: "Так. SAF-T Connector генерує не лише XML, а й Excel-представлення файлу. XML незручний для ручного перегляду, тому Excel-версія дозволяє команді клієнта перевірити дані, відфільтрувати рядки з помилками та підтвердити коректність перед поданням.",
  },
  {
    q: "Чи можна використовувати трансформаційні Excel-таблиці МСФЗ як додаткове джерело даних?",
    a: "Так, за умови, що структура Excel-файлів є фіксованою та узгодженою на етапі впровадження. Excel-файли можуть використовуватися як додаткові структуровані джерела даних, наприклад для коригувань МСФЗ-трансформації.",
  },
  {
    q: "Чи формуєте ви лише обов'язкові поля SAF-T UA?",
    a: "Під час впровадження ми фокусуємось на обов'язкових даних. Необов'язкові елементи додаються там, де вони допомагають пояснити або підтвердити обов'язкові дані. Такий підхід відповідає практиці пілотного впровадження: необов'язкові дані включаються тоді, коли вони покращують розуміння необхідної інформації, а не просто для збільшення обсягу файлу.",
  },
  {
    q: "Чи можна замовити лише одноразове формування SAF-T файлу?",
    a: "SAF-T — це не разовий звіт. ДПС може запросити будь-який період, і запитуваний період може не збігатися з файлом, підготовленим заздалегідь. Вимоги можуть змінюватися. Тому разовий файл є ризикованим і не суттєво дешевшим — адже аналіз даних, мапінг та логіка трансформації все одно мають бути побудовані. SAF-T Connector створює відтворюваний процес для будь-якого запитуваного звітного періоду. Разова генерація можлива, але лише після повноцінного налаштування.",
  },
  {
    q: "Як розгортається SAF-T Connector: у хмарі чи на інфраструктурі клієнта?",
    a: "SAF-T Connector зазвичай розгортається на інфраструктурі клієнта. Система доступна через браузер у локальній мережі. Для розгортання використовується Docker/Docker Compose. Сервер повинен мати мережевий доступ до облікової системи або узгоджених джерел даних. Операційне використання може бути організовано повністю всередині інфраструктури клієнта.",
  },
];

const en: FaqItem[] = [
  {
    q: "What is SAF-T UA?",
    a: "SAF-T UA (Standard Audit File for Tax) is Ukraine's version of the OECD-originated standard audit file for tax purposes. It is an XML file with a prescribed structure containing accounting data exported from a company's accounting system for a defined reporting period. The structure consists of the Header, MasterFiles (including TaxDifferences), GeneralLedgerEntries and SourceDocuments blocks. The file covers the general ledger and accounting registers, customers and suppliers, sales and purchase documents, payments, fixed and intangible assets, inventory movements, tax differences and source documents. Its format and structure are set by the Ministry of Finance and the State Tax Service (STS) of Ukraine.",
  },
  {
    q: "What is SAF-T in simple terms?",
    a: "In simple terms, SAF-T (Standard Audit File for Tax) is a standardized electronic file through which a company hands its accounting data to the tax authority. Instead of providing separate statements and registers, the company produces one structured XML file for the reporting period, containing the general ledger, counterparties, sales and purchase documents, payments, assets and tax differences. Ukraine uses its own version, SAF-T UA, which large taxpayers provide within 2 business days of a request from the State Tax Service.",
  },
  {
    q: "Who has to submit SAF-T UA in Ukraine?",
    a: "SAF-T UA is submitted by large taxpayers upon request from the tax authority. The file must be provided within 2 business days of receiving the request. The requirements are set by regulations of the Ministry of Finance and the State Tax Service of Ukraine.",
  },
  {
    q: "What does SAF-T Connector do?",
    a: "SAF-T Connector is a software solution by LUCAS for producing SAF-T UA audit files. It reads data from accounting systems and other agreed sources, transforms it according to a configured mapping, generates the XML file and provides an Excel view for convenient review. Built-in validation checks the file against the official STS schema and runs mathematical and cross-section checks before submission.",
  },
  {
    q: "Who develops and supports SAF-T Connector?",
    a: "SAF-T Connector is developed and supported by LUCAS. Implementation is carried out by LUCAS's own teams of finance consultants and developers, so responsibility is never split between a software vendor and a separate consultancy. LUCAS has hands-on experience from a SAF-T UA pilot implementation for a large international client, carried out together with representatives of the State Tax Service of Ukraine.",
  },
  {
    q: "Can SAF-T UA be produced without changing our ERP system?",
    a: "In most cases, yes. SAF-T Connector is configured around the client's existing accounting setup. The integration approach is agreed with the client's IT team and depends on the system architecture, the available data export methods and security requirements. Changes to the ERP's accounting logic are usually not required.",
  },
  {
    q: "Which systems can SAF-T Connector pull data from?",
    a: "SAF-T Connector can integrate with a wide range of accounting and ERP systems: SAP, BAS and 1C (Ukrainian configurations), Odoo, Oracle, Microsoft Dynamics, the client's in-house systems, databases and structured Excel/CSV exports. The specific integration method depends on the client's system architecture, the available data access methods and security requirements.",
  },
  {
    q: "What does a SAF-T Connector implementation include?",
    a: "The implementation covers: an assessment of the quality and completeness of accounting data; mapping the client's accounting data to the structure of the reporting file; configuring SAF-T Connector and integrating it with the data sources; deployment on the client's infrastructure; testing on real data with XSD validation and mathematical checks; user training and handover of the process. LUCAS delivers the implementation with its own finance consultants and developers, without splitting responsibility between a separate software vendor and consultants.",
  },
  {
    q: "How long does implementation take?",
    a: "A typical implementation takes about 3–4 months, depending on the number of legal entities, the complexity of the accounting system, data quality, the number of data sources and the availability of the client's IT team.",
  },
  {
    q: "What checks does SAF-T Connector run?",
    a: "SAF-T Connector runs three levels of checks: 1) XSD validation: the XML file is checked against the official STS schema (structure, data types, mandatory fields); 2) mathematical and accounting controls: balances, turnovers and consistency of journal entries; 3) cross-section controls: reconciliation of data that appears in several blocks of the file at once. Errors can be reviewed in the interface and in Excel.",
  },
  {
    q: "What happens when the STS updates the XSD schema?",
    a: "When the official schema changes, users receive new versions of SAF-T Connector with checks against the updated schema. Producing the file may also require updating the mapping. With an active annual support plan, LUCAS updates the mapping whenever regulations change. Without support, the client can update the mapping in-house or order the work from LUCAS separately.",
  },
  {
    q: "Can the SAF-T file be reviewed in Excel?",
    a: "Yes. SAF-T Connector generates not only the XML but also an Excel representation of the file. XML is impractical to review by hand, so the Excel version lets the client's team check the data, filter rows with errors and confirm the file is correct before submission.",
  },
  {
    q: "Can IFRS transformation spreadsheets be used as an additional data source?",
    a: "Yes, provided the Excel files have a fixed structure agreed during implementation. Excel files can serve as additional structured data sources, for example for IFRS transformation adjustments.",
  },
  {
    q: "Do you populate only the mandatory SAF-T UA fields?",
    a: "During implementation we focus on mandatory data. Optional elements are added where they help explain or support the mandatory data. This follows the practice established in the pilot implementation: optional data is included when it makes the required information easier to understand, not simply to make the file bigger.",
  },
  {
    q: "Can we order a one-off SAF-T file?",
    a: "SAF-T is not a one-off report. The STS may request any period, and the period requested may not match a file prepared in advance. Requirements can also change. A one-off file is therefore risky and not much cheaper, because the data analysis, mapping and transformation logic have to be built anyway. SAF-T Connector creates a repeatable process for any requested reporting period. One-off generation is possible, but only after full setup.",
  },
  {
    q: "How is SAF-T Connector deployed: in the cloud or on the client's infrastructure?",
    a: "SAF-T Connector is usually deployed on the client's infrastructure and accessed through a browser on the local network. Deployment uses Docker/Docker Compose. The server needs network access to the accounting system or the agreed data sources. Day-to-day operation can be kept entirely within the client's infrastructure.",
  },
];

export const faqs: Record<Lang, FaqItem[]> = { uk, en };

export function faqPageSchema(lang: Lang): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs[lang].map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a,
      },
    })),
  });
}
