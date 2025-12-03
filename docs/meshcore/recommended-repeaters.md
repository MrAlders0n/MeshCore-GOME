
← Home

Repeaters form the stable backbone of the Ottawa MeshCore network.  
Below are two main options for getting started: **Pre-Built** or **Build Your Own**  
While pre-built devices can be convenient, we strongly recommend building your own repeater for the best reliability, flexibility, and long-term maintainability.  

## Important Note for RAK-Based Repeaters
If you plan to use a **RAK** board for a repeater, please update it to the **OTAFIX bootloader firmware**.  
Without this fix, if an OTA update fails over BLE, the repeater will end up in an unusable state and require physical intervention.

Download the OTAFIX firmware here:  
[OTAFIX Bootloader UF2 File](https://github.com/oltaco/Adafruit_nRF52_Bootloader_OTAFIX/releases/download/0.9.2-otafix1/update-wiscore_rak4631_board_bootloader-0.9.2-otafix1_nosd.uf2)

## Build Your Own
A robust build using a purpose-built weatherproof enclosure.

{| class="wikitable"
! Item
! Product Name
! Cost (CAD)
! Link
|-
| Enclosure
| WisMesh Unifiy Enclosure 910422
| $72.50
| [Link](https://aliexpress.com/item/1005008369061766.html)
|-
| LoRa Board (Small)
| RAK WisBlock RAK19003/RAK4631 (Type 6)
| $36.38
| [Link](https://aliexpress.com/item/1005008285698839.html)
|-
| Antenna
| ALFA AOA-915-5ACM
| $29.52
| [Link](https://www.amazon.ca/dp/B08H8J6ZV6)
|-
| Antenna Coax Cable
| N Female to IPX
| $6.79
| [Link](https://aliexpress.com/item/1005001920963497.html)
|-
| Battery
| 3000mAh + Battery
| $16.00
| [Link](https://www.amazon.com/3000mAh-Rechargable-Protection-Insulated-Development/dp/B08T6GT7DV)
|-
| Battery Protection
| VoltaicEnclosures Li-ion PCM
| $7.50
| [Link](https://www.etsy.com/listing/1421193059)
|-
| Vent
| Waterproof Vent Plug (M12X1.5-10)
| $6.12
| [Link](https://aliexpress.com/item/1005006370919409.html)
|}

*Approximate total cost: $173.03 CAD*

* Build Instructions

## Pre-Built
These options come fully assembled; just flash MeshCore and mount them in a high location to expand the mesh.  
We still recommend upgrading the antenna for best performance. Ideally, use an N-Type connector and upgrade to at least the ALFA AOA-915-5ACM.  

**NOTE: These pre-built repeaters have not been thoroughly tested by the Ottawa community, but we have seen reports of others using them with great success.**

{| class="wikitable"
! Product
! Notes
! Link
|-
| SenseCAP Solar Node P1 Pro
| Solar-powered communication node integrating the XIAO nRF52840 Plus controller and Wio-SX1262 LoRa module.  
Comes with a 5W solar panel, IPX5 waterproof rating, 4×18650 (3350 mAh each) lithium batteries, and a 2 dBi rubber antenna.  
Batteries support both Type-C and solar charging. Includes onboard GPS (XIAO L76K).

**⚠️ Most people order an RP-SMA → N-Type adapter. The included antenna performs poorly, use the above Alfa.**
| [Link](https://www.seeedstudio.com/SenseCAP-Solar-Node-P1-Pro-for-Meshtastic-LoRa-p-6412.html)
|-
| WisMesh Solar Repeater Mini
| Compact outdoor repeater built around the RAK4631 (nRF52840 + SX1262) core module with a WisBlock mini base board.  
Housed in an IP67-rated Unify enclosure with integrated solar panel, 3200 mAh Li-ion battery, and a WisMesh blade antenna (902–928 MHz).  
| [Link](https://store.rakwireless.com/products/wishmesh-meshtastic-solar-repeater-mini)
|}
