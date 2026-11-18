# Planlara ayırma

Sekiz saniyelik özgün sekansın üç planını kare zamanlarıyla incele.

## Çalıştırma

`index.html` dosyasını bir tarayıcıda aç. Oynat düğmesini ve zaman çizelgesini kullanarak sekiz saniyelik sahneyi incele. HTML ve Canvas 2D ile çevrimdışı çalışır.

## İlham kaynağı

Bu bağımsız sahne sentetik su istasyonu örnekleri kullanır. [Kaynak proje](https://github.com/JuneYaooo/rea-video).

## Video kesit analizi

Python 3 ve PATH üzerinde FFmpeg gerekir. Ani görüntü geçişleri için eşik değerini 0–1 aralığında ayarla. Yumuşak geçişlerde sonuçlar eşik ve görüntü içeriğine bağlıdır.

```sh
python analyze.py input.mp4 -o cuts.json --threshold 0.30
```

Sekiz saniyelik zaman çizelgesinden bir kare seçip **PNG indir** ile 720 × 405 piksel dışa aktarabilirsin.
