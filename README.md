# http-status-pages
Stylized pages with different HTTP status codes.

The idea was based on the [colorlib.com](https://colorlib.com/wp/cat/404-error/) resource, from page [Colorlib Error 404 V18](https://colorlib.com/etc/404/colorlib-error-404-18/). Thanks to [openmoji.org](https://openmoji.org/), where I got some SVG icons.

![Stylized page with 404 status code](.github/img/demo-404.svg)

### Optimized Icons

Some icons have been completely redrawn because their paths duplicated unnecessary nodes. These nodes have been simplified as much as possible to reduce the size of the sprite. Also, some icons have been intentionally resized to achieve the impression of a single, cohesive style. A few more new icons were also added, which at least I didn't find in the openmoji collection. The work is still ongoing.

[![openmoji icon 1FA99](src/assets/icons/optimized/1FA99.svg)](https://openmoji.org/library/emoji-1FA99/)
[![openmoji icon 1F9D0](src/assets/icons/optimized/1F9D0.svg)](https://openmoji.org/library/emoji-1F9D0/)
[![openmoji icon E0AB](src/assets/icons/optimized/E0AB.svg)](https://openmoji.org/library/emoji-E0AB/)
[![openmoji icon E145](src/assets/icons/optimized/E145.svg)](https://openmoji.org/library/emoji-E145/)
![mask svg icon](src/assets/icons/optimized/mask.svg)
[![openmoji icon 1F4A5](src/assets/icons/optimized/1F4A5.svg)](https://openmoji.org/library/emoji-1F4A5/)
[![openmoji icon 1F383](src/assets/icons/optimized/1F383.svg)](https://openmoji.org/library/emoji-1F383/)
[![openmoji icon 1FAAC](src/assets/icons/optimized/1FAAC.svg)](https://openmoji.org/library/emoji-1FAAC/)
[![openmoji icon 1F9F1](src/assets/icons/optimized/1F9F1.svg)](https://openmoji.org/library/emoji-1F9F1/)
![mask svg icon](src/assets/icons/optimized/shield-lock.svg)
[![openmoji icon E308](src/assets/icons/optimized/E308.svg)](https://openmoji.org/library/emoji-E308/)
[![openmoji icon E147](src/assets/icons/optimized/E147.svg)](https://openmoji.org/library/emoji-E147/)
[![openmoji icon E04B](src/assets/icons/optimized/E04B.svg)](https://openmoji.org/library/emoji-E04B/)

#### Generate pages

``` bash
# install dependencies
npm install

# run builder
npm run build

# or
npx gulp generate

```
