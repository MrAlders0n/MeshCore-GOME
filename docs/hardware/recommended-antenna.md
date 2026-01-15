# Antenna Recommendation

Most LoRa devices ship with a very basic factory antenna that performs poorly.  
The Ottawa mesh community has tested many replacements, and the antennas below are highly recommended as reliable upgrades.

!!! warning "Disconnect device to power before swapping an antenna!"
    Make sure your device is disconnected to power/battery when swapping an antenna. Since these devices can transmit radio signals, turning on a device without an antenna can damage it. [See more information here.](https://electronics.stackexchange.com/questions/335912/can-i-break-a-radio-tranceiving-device-by-operating-it-with-no-antenna-connected)

## Companion Antennas

These are SMA antennas and are more compact, yet they’ve consistently shown excellent performance in Ottawa and other meshes. We recommend any of the options listed here.

!!! warning "SMA vs. RP-SMA"
    Pay close attention to what connection type a Companion/Repeater has since some come with Reverse Polarity SMA (RP-SMA). You will need an adapter to connect your SMA antenna or you will need to buy a RP-SMA antenna.
    [More information on the differences between these connections.](https://blog.linitx.com/what-are-sma-rp-sma-connectors-and-whats-the-difference/)

| Product                     | Connector | Cost (CAD) | Link |
|-----------------------------|-----------|------------|------|
| Gizont 167CM 915MHz SMA M   | SMA       | $10.53     | [AliExpress](https://www.aliexpress.com/item/1005004607615001.html) |
| Gizont 167CM 915MHz RP-SMA M   | RP-SMA       | $10.53     | [AliExpress](https://www.aliexpress.com/item/1005004607615001.html) |
| LINX ANT-916-CW-HW-SMA      | SMA       | $14.65     | [DigiKey](https://www.digikey.ca/en/products/detail/te-connectivity-linx/ANT-916-CW-HW-SMA/2694126?s=N4IgTCBcDaIDIEkByANABAQSQFQLQE4BGANlwGEB1XACSoGUBZDEAXQF8g) |
| Taoglas TI.09.A.0111        | SMA       | $17.47     | [DigiKey](https://www.digikey.ca/en/products/detail/taoglas-limited/TI-09-A-0111/2332695?s=N4IgTCBcDaICoEMD2BzANggzgAjgSQDoAGATgIEFiBGGkAXQF8g) |

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
| TBD       | N-Type    | $TBD     | [TBD](https://TBD) |
