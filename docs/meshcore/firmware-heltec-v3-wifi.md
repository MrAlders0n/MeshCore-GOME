# Compiling MeshCore Firmware with Wi-Fi Enabled

**Device:** Heltec V3  
**OS:** Red Hat 9.6  

**Note:**  
Wi-Fi support in MeshCore is experimental.  
Your SSID and password are embedded at compile time, so do **not** share compiled binaries that contain your real credentials.

---

## Install PlatformIO

1. Change to your home directory:

    ```bash
    cd ~
    ```

2. Download the PlatformIO installer:

    ```bash
    curl -fsSL -o get-platformio.py https://raw.githubusercontent.com/platformio/platformio-core-installer/master/get-platformio.py
    ```

3. Run the installer:

    ```bash
    python3 get-platformio.py
    ```

4. Add PlatformIO to your PATH (adjust the path if your username is different):

    ```bash
    export PATH=$PATH:/home/linuxuser/.platformio/penv/bin
    ```

## Clone the MeshCore Repository

1. Clone the MeshCore repo:

    ```bash
    git clone https://github.com/ripplebiz/MeshCore.git
    ```

2. Change into the project directory:

    ```bash
    cd MeshCore/
    ```

---

## Configure Wi-Fi Credentials

1. Open the PlatformIO configuration for the Heltec V3 Wi-Fi build:

    ```bash
    vi variants/heltec_v3/platformio.ini
    ```

2. Locate the `env:Heltec_v3_companion_radio_wifi` section and update it with your SSID and password:

    ```ini
    [env:Heltec_v3_companion_radio_wifi]
    extends = Heltec_lora32_v3
    build_flags =
      ${Heltec_lora32_v3.build_flags}
      -D MAX_CONTACTS=100
      -D MAX_GROUP_CHANNELS=8
      -D DISPLAY_CLASS=SSD1306Display
      -D WIFI_DEBUG_LOGGING=1
      -D WIFI_SSID="<<SSID>>"
      -D WIFI_PWD="<<WIFI-PASS>>"
    ```

3. Save and exit the editor.

## Compile and Prepare Firmware

1. Set the firmware version environment variable:

    ```bash
    set FIRMWARE_VERSION=1.7.3
    ```

    *(Or use `export FIRMWARE_VERSION=1.7.3` if you are using a pure Linux shell and not a mixed environment.)*

2. Build the Wi-Fi firmware target:

    ```bash
    ./build.sh build-firmware Heltec_v3_companion_radio_wifi
    ```

3. Change into the build output directory:

    ```bash
    cd .pio/build/Heltec_v3_companion_radio_wifi/
    ```

4. Rename the output binaries:

    ```bash
    mv firmware-merged.bin Heltec_v3_companion_radio_wifi_1.7.3-merged.bin
    mv firmware.bin Heltec_v3_companion_radio_wifi_1.7.3.bin
    ```

5. Move the generated firmware files to a convenient location (example):

    ```bash
    mv Heltec_v3_companion_radio_wifi* /home/linuxuser/
    ```

---

## Next Steps

1. Flash one of the compiled firmware files onto your Heltec V3:

    - `Heltec_v3_companion_radio_wifi_1.7.3.bin`  
    - or `Heltec_v3_companion_radio_wifi_1.7.3-merged.bin`

2. Connect to the device over serial and monitor logs to confirm:

    - Wi-Fi is enabled  
    - The device is attempting to associate with your SSID  

3. Remember that Wi-Fi support in MeshCore is experimental:

    - Expect instability  
    - Features may be incomplete  
    - Do not deploy this build as a critical node on the mesh  

