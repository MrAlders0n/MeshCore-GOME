# Repeaters

Repeaters form the stable backbone of the Ottawa MeshCore network.  
You can choose between **pre-built repeaters** or **DIY builds**, and both are great options.  

Pre-built units have improved a lot in reliability and price, while DIY builds remain popular for those who like full control over their hardware.

---

## Important Note for RAK-Based Repeaters

If you plan to use a **RAK** board for a repeater, you must update it to the **OTAFIX bootloader firmware**.  
Without this fix, if an OTA update fails over BLE, the repeater will enter an unusable state and require physical access to recover.

Download the OTAFIX firmware:  
**[OTAFIX Bootloader UF2 File](https://github.com/oltaco/Adafruit_nRF52_Bootloader_OTAFIX/releases/download/0.9.2-otafix1/update-wiscore_rak4631_board_bootloader-0.9.2-otafix1_nosd.uf2)**

---

## Build Your Own

A robust build using a purpose-built weatherproof enclosure.

### Recommended Parts List

| Item                 | Product Name                         | Cost (CAD) | Link |
|----------------------|---------------------------------------|------------|------|
| **Enclosure**        | WisMesh Unify Enclosure 910422        | $72.50     | [AliExpress](https://aliexpress.com/item/1005008369061766.html) |
| **LoRa Board (Small)** | RAK WisBlock RAK19003/RAK4631 (Type 6) | $36.38     | [AliExpress](https://aliexpress.com/item/1005008285698839.html) |
| **Antenna**          | ALFA AOA-915-5ACM                     | $34.99    | [Amazon](https://www.amazon.ca/dp/B08H8J6ZV6) |
| **Antenna Coax Cable** | N Female to IPX                       | $6.79      | [AliExpress](https://aliexpress.com/item/1005001920963497.html) |
| **Battery**          | 3000mAh Li-ion                         | $16.00     | [Amazon](https://www.amazon.com/3000mAh-Rechargable-Protection-Insulated-Development/dp/B08T6GT7DV) |
| **Battery Protection** | VoltaicEnclosures Li-ion PCM           | $7.50      | [Etsy](https://www.etsy.com/listing/1421193059) |
| **Vent**             | Waterproof Vent Plug (M12X1.5-10)     | $6.12      | [AliExpress](https://aliexpress.com/item/1005006370919409.html) |

**Approximate total cost: $180 CAD**

**Build Instructions:** [300mW Solar Repeater Build Guide](./repeater-solar-300mw-diy-build.md)

---

## Pre-Built

These options come fully assembled; simply flash MeshCore and mount them in a high location to expand the mesh.

We recommend upgrading the antenna for best performance. Ideally, use an **N-Type connector** and upgrade to at least the **ALFA AOA-915-5ACM**.

**Note:** These pre-built repeaters have not been thoroughly tested by the Ottawa community, though we have seen other communities report good results.

### Pre-Built Repeater Options

| Product | Notes | Link |
|---------|--------|------|
| **SenseCAP Solar Node P1 Pro** | Solar-powered communication node using the XIAO nRF52840 Plus + Wio-SX1262 LoRa module. Includes a 5W solar panel, IPX5 waterproofing, four 18650 cells (3350 mAh each), and a 2 dBi rubber antenna.<br><br><div markdown="1">

!!! warning "Important Connector Note"
    Make sure to order an **RP-SMA → N-Type coax cable** with the device.  
    **Do not accidentally buy SMA — you specifically need RP-SMA.**  
    Seeed uses RP-SMA for the P1 for some reason, and the wrong connector will not fit.  
    With the correct cable, you can upgrade to a proper **Alfa antenna**, which performs significantly better than the included one.

</div> | [SeeedStudio](https://www.seeedstudio.com/SenseCAP-Solar-Node-P1-Pro-for-Meshtastic-LoRa-p-6412.html) |
| **WisMesh Solar Repeater Mini** | Compact outdoor repeater built around the RAK4631 (nRF52840 + SX1262) with a WisBlock mini base. Housed in an IP67 Unify enclosure with integrated solar panel, 3200 mAh Li-ion battery, and a WisMesh blade antenna (902–928 MHz). | [RAK Store](https://store.rakwireless.com/products/wishmesh-meshtastic-solar-repeater-mini) |



| Product | Notes | Link |
|---------|--------|------|
| **SenseCAP Solar Node P1 Pro** | Solar-powered communication node using the XIAO nRF52840 Plus + Wio-SX1262 LoRa module. Includes a 5W solar panel, IPX5 waterproofing, four 18650 cells (3350 mAh each), and a 2 dBi rubber antenna. Includes GPS (XIAO L76K).<br><br>**⚠️ Note:** Most people order an RP-SMA → N-Type adapter. The included antenna performs poorly; upgrade to the ALFA above. | [SeeedStudio](https://www.seeedstudio.com/SenseCAP-Solar-Node-P1-Pro-for-Meshtastic-LoRa-p-6412.html) |
| **WisMesh Solar Repeater Mini** | Compact outdoor repeater built around the RAK4631 (nRF52840 + SX1262) with a WisBlock mini base. Housed in an IP67 Unify enclosure with integrated solar panel, 3200 mAh Li-ion battery, and a WisMesh blade antenna (902–928 MHz). | [RAK Store](https://store.rakwireless.com/products/wishmesh-meshtastic-solar-repeater-mini) |

---
