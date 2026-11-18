# Shot Timeline / Planlara ayırma

## Türkçe

[Canlı aracı aç](https://omerbek.github.io/shot-timeline/).

Sekiz saniyelik özgün sekansın üç planını kare zamanlarıyla incele.

## Çalıştırma

`index.html` dosyasını bir tarayıcıda aç. Oynat düğmesini ve zaman çizelgesini kullanarak sekiz saniyelik sahneyi incele. HTML ve Canvas 2D ile çevrimdışı çalışır.


## Video kesit analizi

Python 3 ve PATH üzerinde FFmpeg gerekir. Ani görüntü geçişleri için eşik değerini 0–1 aralığında ayarla. Yumuşak geçişlerde sonuçlar eşik ve görüntü içeriğine bağlıdır.

```sh
python analyze.py input.mp4 -o cuts.json --threshold 0.30
```

Sekiz saniyelik zaman çizelgesinden bir kare seçip **PNG indir** ile 720 × 405 piksel dışa aktarabilirsin.

## English

Find abrupt scene changes in a video and export their timestamps as JSON.

Open [the live tool](https://omerbek.github.io/shot-timeline/) or open `index.html` in a browser. Switch between Turkish and English in the page header. Use the timeline to select a frame and **Download PNG** to save it at 720 × 405 pixels.

### Command line

Requires Python 3 and FFmpeg. The threshold ranges from 0 to 1. This detects abrupt visual changes.

```sh
python analyze.py input.mp4 -o cuts.json --threshold 0.30
```
