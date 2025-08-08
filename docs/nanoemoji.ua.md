### **Генерація шрифту за допомогою Nanoemoji**

Оскільки вбудовані скрипти проєкту не призначені для вибіркової генерації шрифтів, вам доведеться використати зовнішній інструмент, який використовує сам проєкт OpenMoji для створення своїх шрифтів. Це інструмент **`nanoemoji`**, який розроблено Google.

-----

#### **1. Підготовка проєкту**

1.  **Встановіть Python 3 та pip.**
2.  **Створіть віртуальне середовище Python** (рекомендовано).
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```
3.  **Встановіть `nanoemoji`**. Це інструмент, який дозволяє створювати шрифти з SVG.
    ```bash
    pip install nanoemoji
    ```

-----

#### **2. Підготовка SVG-файлів та конфігурації**

1.  **Створіть нову папку** для вашого проєкту. Назвемо її `my-custom-font`.

    ```bash
    mkdir my-custom-font
    cd my-custom-font
    ```

2.  **Створіть папку `svgs` всередині.**

    ```bash
    mkdir svgs
    ```

3.  **Скопіюйте необхідні SVG-файли** з репозиторію OpenMoji до нової папки `svgs`. Оскільки вам потрібні чорно-білі гліфи, копіюйте їх з папки `openmoji/black/svg/`.

    Наприклад:

    ```bash
    cp ../openmoji/black/svg/1F60A.svg svgs/
    cp ../openmoji/black/svg/1F44D.svg svgs/
    cp ../openmoji/black/svg/2764.svg svgs/
    ```

#### Структура каталогів

```
/venv
  ├── bin
  ...
/my-custom-font
  ├── config.toml
  └── svgs/
      ├── 1F60A.svg
      ├── 1F44D.svg
      └── 2764.svg
```

-----

#### **3. Генерування шрифту**

Тепер, коли у вас є всі необхідні файли в папці `my-custom-font`, ви можете запустити `nanoemoji`.

1.  **Запустіть команду `nanoemoji`**, вказавши файл конфігурації та шлях до папки з SVG-файлами.

    ```bash
    nanoemoji --color_format=glyf \
        --family="HttpStatusCodes" \
        --output_file=HttpStatusCodesOpenMoji.ttf \
        $(find svgs -name '*.svg')
    ```

Після запуску цієї команди `nanoemoji` згенерує шрифт, що містить лише ті гліфи, які ви вказали. Готові файли будуть знаходитись у папці `build/` всередині вашого проєкту `my-custom-font`.


#### Конвертація шрифта ttf -> woff2
```bash
$ woff2_compress HttpStatusCodesOpenMoji.ttf
```
