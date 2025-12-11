# Flashing and Configuring a Repeater Node

This guide will help you flash a node and configure it as a MeshCore repeater.

---

## RAK Bootloader Update  

*(Skip this section if you are not using a RAK-based board)*

**Important:**  
Before configuring a repeater, you must update the bootloader on **RAK** boards.  
Without this fix, a failed OTA update can brick the repeater and require physical recovery.

### Steps

1. Download the OTA bootloader fix:  
   **[OTAFIX Bootloader UF2 File](https://github.com/oltaco/Adafruit_nRF52_Bootloader_OTAFIX/releases/download/0.9.2-otafix1/update-wiscore_rak4631_board_bootloader-0.9.2-otafix1_nosd.uf2)**
2. Connect your repeater to your computer via USB.  
3. Double-click the button beside the USB port on the RAK board.  
   - The green LED should turn on, indicating DFU mode.  
4. A new **USB drive** should appear on your computer.  
5. Drag the `.uf2` file into the drive.  
6. The copy will appear to fail, and the board will reboot — **this is expected**.  
7. Open **INFO.TXT** on the drive and confirm it reports bootloader version **0.9.2**.

---

## Flashing MeshCore Repeater Firmware

1. Plug the device into your computer via USB.  
2. Open the **MeshCore Web Flasher**: <https://flasher.meshcore.co.uk>  
3. Select your device hardware.  
4. Select **Repeater** as the firmware type.  
5. Click **Enter DFU Mode**.  
6. Click **Erase Flash**.  
7. Click **Flash** to install the firmware.

**Note:**  
If flashing fails after erasing, refresh the page, click **Enter DFU Mode** again, then click **Flash**.

---

## Configuring a MeshCore Repeater

1. Using a Chromium-based Browser that supports the [required serial connection](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API#browser_compatibility) (e.g., Google Chrome, Microsoft Edge), open the repeater configuration tool:  
   **<https://config.meshcore.dev>**
2. After connecting, check the **[Ottawa Repeater ID List](../deployment/repeaters.md)** to ensure your repeater ID is unique.
   - Repeater IDs come from the **first two characters of the public key**.  
   - Duplicate IDs cause conflicts.  
   - Developers are working on a long-term fix, but for now each repeater should use a unique ID.

---

## Generating a New Repeater ID (If Required)

There are **two ways** to assign a new repeater ID, we recommend option 1 as it guarantees you will get a unique ID

### Option 1 — Manually Generate a Private Key (choose your own ID)

1. Go to the **[Ottawa Repeater ID List](../deployment/repeaters.md)** and pick an unused 2-digit ID.  
2. Visit **mc-keygen**: <https://gessaman.com/mc-keygen/>  
3. Enter your chosen 2-digit ID, then click **Generate Key**.  
4. Copy the **Private Key** from the output.  
5. Open the **MeshCore Flasher**, click **Console**, and select your repeater.  
6. Run: set prv.key <PRIVATE-KEY>
7. Reboot the repeater.  
It will now use this private key, and the public key will match your chosen ID.

---

### Option 2 — Reflash (automatic key generation)

1. Reflash the repeater and ensure **Erase Flash** is used.  
2. A new private/public keypair will be generated.  
3. After flashing, verify that the new ID is not in use by checking:  
   **[Ottawa Repeater ID List](../deployment/repeaters.md)**

---

## Final Configuration Steps

1. Give the repeater a descriptive **name** (e.g., `Callsign_R1`, `Downtown_R1`).  
2. Set an **admin password** — this is required for MeshCore Remote Administration.  
3. Apply the Ottawa defaults:  
**910.525 MHz / BW 62.5 kHz / SF7 / CR5**  
4. Click **Save** and reboot.  
5. Reconnect using the configuration tool and click **Send Advert**.  

- If everything is working, nearby companion nodes will receive it.

---

## Advert Interval Configuration

Once the repeater has been discovered by your companion node, use Remote Administration to set:

8. **Zero-hop adverts:** every **1 hour**  
9. **Flood adverts:** every **12 hours**  
10. Click **Save**

**Tip:**  
After every reboot, you must **resync the repeater’s clock**.  
The repeater will still route messages without a clock, but **its adverts will be ignored** until the time is set.

---
