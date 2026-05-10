# Antenna Recommendation

Most LoRa devices ship with a very basic factory antenna that performs poorly.  
The Ottawa mesh community has tested many replacements, and the antennas below are highly recommended as reliable upgrades.

!!! warning "Swapping Antennas"
    Make sure your device is disconnected to power/battery when swapping an antenna. Since these devices can transmit radio signals, turning on a device without an antenna can damage it. [See more information here.](https://electronics.stackexchange.com/questions/335912/can-i-break-a-radio-tranceiving-device-by-operating-it-with-no-antenna-connected)

## Companion Antennas

These are SMA antennas and are more compact, yet they’ve consistently shown excellent performance in Ottawa and other meshes. We recommend any of the options listed here.

!!! warning "SMA vs. RP-SMA"
    Pay close attention to what connection type a Companion/Repeater has since some come with Reverse Polarity SMA (RP-SMA). You will need an adapter to connect your SMA antenna or you will need to buy a RP-SMA antenna.
    [More information on the differences between these connections.](https://blog.linitx.com/what-are-sma-rp-sma-connectors-and-whats-the-difference/)

| Product                     | Connector | Cost (CAD) | Link |
|-----------------------------|-----------|------------|------|
| Gizont 167CM 915MHz SMA M   | SMA       | $12     | [Space Hedgehog (Local Store)](https://space-hedgehog.com/products/gizont-915mhz-antenna?variant=51602989711416) |
| Gizont 167CM 915MHz SMA M   | SMA       | $10.53     | [AliExpress](https://www.aliexpress.com/item/1005004607615001.html) |
| Gizont 167CM 915MHz RP-SMA M   | RP-SMA       | $10.53     | [AliExpress](https://www.aliexpress.com/item/1005004607615001.html) |
| LINX ANT-916-CW-HW-SMA      | SMA       | $14.65     | [DigiKey](https://www.digikey.ca/en/products/detail/te-connectivity-linx/ANT-916-CW-HW-SMA/2694126?s=N4IgTCBcDaIDIEkByANABAQSQFQLQE4BGANlwGEB1XACSoGUBZDEAXQF8g) |
| Taoglas TI.09.A.0111        | SMA       | $17.47     | [DigiKey](https://www.digikey.ca/en/products/detail/taoglas-limited/TI-09-A-0111/2332695?s=N4IgTCBcDaICoEMD2BzANggzgAjgSQDoAGATgIEFiBGGkAXQF8g) |
| Seeed Studio LoRa Antenna Kit        | SMA       | $6.79     | [Seeed Studio](https://www.seeedstudio.com/LoRa-Antenna-Kit-for-reTerminal-DM-p-5714.html) |

## Repeater Omni Antennas

These are N-Type antennas and are best suited for repeaters. At an absolute minimum, all repeaters should use the Alfa antenna — it’s a major reason the Ottawa mesh performs as well as it does. MrAlders0n has made a link between a repeater and a companion at 110KM distance with an Alfa on both ends.

If you want something larger and higher-performing, we’ve tested the Seeed 1300 mm fiberglass antenna with excellent results. Please note that it is 1.3 metres long. We only recommend this antenna for repeaters installed at significant height (around 30 m AGL or higher) and intended for long-distance links or backbone use.

| Product                     | Connector | Cost (CAD) | Link |
|-----------------------------|-----------|------------|------|
| Alfa AOA-915-5ACM           | N-Type    | $34.99     | [Amazon](https://a.co/d/ieEIQpy) |
| Seeed Studio RF Explorer 902-928MHz 8dBi; 1300mm | N-Type | $110 | [Mouser](https://www.mouser.ca/ProductDetail/Seeed-Studio/318020693?qs=By6Nw2ByBD0kjpJjgHd0aQ%3D%3D) |

## Repeater Directional Antennas

Directional antennas are intended for fixed repeaters and long-distance point-to-point or point-to-multipoint links. All antennas listed here use N-Type connectors and are suitable for permanent outdoor installations.

| Product                | Connector | Cost (CAD) | Link |
|------------------------|-----------|------------|------|
| L-com HG913Y-NF      | N-Type    | $237.17     | [DigiKey](https://www.digikey.ca/en/products/detail/l-com/HG913Y-NF/21289980) |

## Antenna Cables

For short, high-quality LMR-240 cables, [Infinite Cables](https://www.infinitecables.com/) in Toronto is the best source we’ve found. Their cables are on the expensive side, but the build quality is excellent and they offer a wide variety of lengths and connector combinations to suit any installation.

| Product                | Connector | Link |
|------------------------|-----------|------|
| LMR-240 Ultra Flex N-Type Male to N-Type Female | N-Type M to N-Type F | [Infinite Cables](https://www.infinitecables.com/products/lmr-240-ultra-flex-n-type-male-to-n-type-female-cable?variant=42809804980465) |

## Antenna Gain vs Length - Quick Reference for 915 MHz Omnis

If you've ever wondered how to ballpark an antenna's gain just by looking at it, here's a cheat sheet:

- **2 dBi** → ~120-170 mm
- **3 dBi** → ~200-250 mm
- **4 dBi** → ~280-350 mm
- **5 dBi** → ~400-450 mm
- **6 dBi** → ~500-600 mm
- **7 dBi** → ~800-900 mm
- **8 dBi** → ~1200-1350 mm
- **9 dBi** → ~1500-1650 mm

### Why does this work?

At 915 MHz, one wavelength (λ) is about 328 mm. Omnidirectional collinear antennas get their gain by stacking half-wave elements vertically with phasing stubs between them. More elements = longer antenna = more gain.

- **2 dBi** is basically a half-wave dipole (λ/2 = 164 mm). This is where most stock LoRa whip antennas land.
- **3 dBi** gets into 5/8-wave territory (~205 mm plus matching network)
- **4-5 dBi** covers short collinears and 2-element designs
- **6 dBi** around 550 mm is a 3-element collinear (~1.68λ)
- **7 dBi** around 850 mm is a 4-5 element collinear (~2.6λ)
- **8 dBi** around 1275 mm is pushing 7+ elements (~3.9λ)
- **9 dBi** around 1600 mm is an 8+ element array (~4.88λ)

The general rule is that doubling your elements gets you about +3 dB of gain. You'll notice the gaps get smaller as you go up because at higher element counts you hit diminishing returns from losses in the phasing network.

### One caveat

Below 5 dBi, the length-to-gain correlation gets less reliable. Manufacturers use loaded and helical designs to shrink things down, so you'll see "2 dBi" antennas that are only 50-80 mm because they're coiled internally. The eyeball method really shines from 5 dBi and up where you're looking at full-size collinear builds.

### TL;DR

Under 200 mm? Probably 2-3 dBi. Around 300-450 mm? 4-5 dBi range. Half a metre, ~6 dBi. Approaching a metre, ~7 dBi. Over a metre, ~8 dBi. Pushing 1.5m+, you're in 9 dBi territory. No spec sheet needed, just eyeball it.
