!!! danger "Bootloader Prerequisite"
    Please only proceed with this if you have updated your bootloader firmware using the **OTA fix firmware** mentioned in the [Flashing a Repeater](flash-repeater.md#nrf52-bootloader-update) instructions.

!!! danger "Android Only - iOS Not Recommended"
    These instructions are intended for **Android only**. iOS is technically supported, however we have experienced several failed OTA upgrades when using iOS. Until that track record changes, we do not recommend using an iOS device for OTA updates.

---

## Flashing MeshCore Repeater Firmware - Over-the-air (OTA) - Non Recommended Route

**Note:** This section only applies to NRF-based boards (e.g., RAK4630, Heltec T114, XIAO NRF52). Please read the warning below since we highly recommend you flash firmware using USB instead.

!!! warning "OTA Risks"
    Although it is possible to flash a repeater's firmware OTA, there is a high risk of a flash failing (even if the app says there are no issues) which will require a USB re-flash. We have experienced an OTA failure during Winter that requires to wait until the Spring to get physical access to the repeater. Proceed at your own risk!

If you are OK with these risks, you can follow the [official instructions on MeshCore's Blog](https://blog.meshcore.io/2026/04/02/nrf-ota-update). The steps are summarized below for convenience.

---

### 1. Download the firmware `.zip`

1. Open the **[MeshCore Web Flasher](https://meshcore.io/flasher)** and find your device.
2. Select the **Repeater** or **Room Server** role, then choose the latest version.
3. In the bottom-right, click the **Download** button and select the `.zip` file.

Alternatively, go to the **[MeshCore GitHub Releases page](https://github.com/meshcore-dev/MeshCore/releases)** and download the `.zip` artifact for your board (for example, the T114 Repeater).

---

### 2. Log in to the repeater or room server

1. Using the MeshCore mobile app, log in to your device with the admin password.
2. Switch to the **Command Line** tab and enter:

    ```
    start ota
    ```

3. You should see a reply similar to:

    ```
    OK - mac: FF:AA:BB ...
    ```

**Tip:** You can also use a standalone device such as a T-Deck running the Ripple firmware to issue the `start ota` command.

---

### 3. Connect with your phone

If it isn't already installed, install the Nordic **nRF Device Firmware Update** app from **Google Play** or the **App Store**.

#### 3.1 DFU App Settings

In the app, tap the **Settings** icon and apply the following recommended settings:

- **Packet receipts notification:** ON
- **Number of packets:** 8
- **Request high MTU** (Android only): OFF
- **Disable resume:** ON
- **Prepare object delay:** 0 ms
- **Force scanning:** ON

#### 3.2 Start the Update

1. In the app, select the `.zip` file you downloaded.
2. Select your device from the scan list.
3. Press **Start** and wait for the update to complete.

---

### 4. Finishing Up

1. Once the update completes, log out and log back in (either with the app or a standalone device).
2. Verify the clock is correct with the `clock` command. If it is incorrect, issue:

    ```
    clock sync
    ```

3. Run the `ver` command to confirm the firmware version has been updated.

---

### Troubleshooting

If the update stalls or fails, issue the following command from your phone or a standalone device, then try the process again:

```
reboot
```

**Note:** For RAK 4631 boards with the Bootloader update, when following the OTA instructions and when you upload the update, you will likely get an error that the flash has failed. When scanning again for devices in the app, it will appear with a generic name (e.g., AdaDFU, RAK4631_DFU, etc.). Select this device and re-upload the update.
