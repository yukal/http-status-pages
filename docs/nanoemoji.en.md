### **Font Generation with Nanoemoji**

Since the built-in project scripts are not designed for selective font generation, you will need to use an external tool that leverages the OpenMoji project to create its fonts. This tool is **`nanoemoji`**, developed by Google.

-----

#### **1. Project Setup**

1.  **Install Python 3 and pip.**
2.  **Create a Python virtual environment** (recommended).
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```
3.  **Install `nanoemoji`**. This tool allows you to create fonts from SVG files.
    ```bash
    pip install nanoemoji
    ```

-----

#### **2. Preparing SVG Files and Configuration**

1.  **Create a new folder** for your project. Let's call it `my-custom-font`.

    ```bash
    mkdir my-custom-font
    cd my-custom-font
    ```

2.  **Create a `svgs` folder inside.**

    ```bash
    mkdir svgs
    ```

3.  **Copy the required SVG files** from the OpenMoji repository to the new `svgs` folder. Since you need black-and-white glyphs, copy them from the `openmoji/black/svg/` directory.

    For example:

    ```bash
    cp ../openmoji/black/svg/1F60A.svg svgs/
    cp ../openmoji/black/svg/1F44D.svg svgs/
    cp ../openmoji/black/svg/2764.svg svgs/
    ```

#### Directory Structure

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

#### **3. Font Generation**

Now that you have all the necessary files in the `my-custom-font` folder, you can run `nanoemoji`.

1.  **Run the `nanoemoji` command**, specifying the configuration file and the path to the SVG files.

    ```bash
    nanoemoji --color_format=glyf \
        --family="HttpStatusCodes" \
        --output_file=HttpStatusCodesOpenMoji.ttf \
        $(find svgs -name '*.svg')
    ```

After running this command, `nanoemoji` will generate a font containing only the glyphs you specified. The output files will be located in the `build/` folder inside your `my-custom-font` project.


#### Convert ttf font to woff2
```bash
$ woff2_compress HttpStatusCodesOpenMoji.ttf
```
