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

1. Using a Chromium-based browser that supports the [required serial connection](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API#browser_compatibility) (e.g., Google Chrome or Microsoft Edge), open the repeater configuration tool:  
   <https://config.meshcore.dev>

2. Connect to your repeater and note the **Repeater ID** shown in the tool.
   - The Repeater ID is derived from the keypair (it corresponds to the **first byte / first two hex characters** of the repeater’s key).  
   - Because there are only **256 possible IDs**, overlaps become more likely as the network grows—especially when keys are generated automatically during flashing.

3. Check the **[Ottawa Repeater ID List](../deployment/repeaters.md)** to confirm your repeater ID is **not already in use**.
   - If it’s unique, continue configuring the rest of the repeater settings as normal.
   - If it’s already in use, follow the steps below to assign a new ID.

---

### Assigning a New Repeater ID (if your ID is already in use)

1. Go to the **[Ottawa Repeater ID List](../deployment/repeaters.md)** and choose an unused **2-digit ID**.  
2. Click the unused ID to open its key generator page.  
3. Click **Generate Key**.  
4. Copy the **Private Key** value.  
5. In the repeater console, set the private key (replace `<PRIVATE-KEY>` with what you copied):  
   `set prv.key <PRIVATE-KEY>`  
6. Reboot the repeater.  

After reboot, the repeater will use the new private key and the public key will correspond to the ID you selected.

---

## Final Configuration Steps

1. Set a descriptive repeater **name** (e.g., `Callsign_R1`, `Downtown_R1`).  
2. Set an **admin password** (required for MeshCore Remote Administration).  
3. Apply the Ottawa defaults:  
   **910.525 MHz / BW 62.5 kHz / SF7 / CR5**  
4. Click **Save** and reboot the repeater.  
5. Reconnect with the configuration tool and click **Send Advert**.

If everything is working, nearby companion nodes should receive the advert.

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
