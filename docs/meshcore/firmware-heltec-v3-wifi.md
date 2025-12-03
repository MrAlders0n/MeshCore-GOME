
# Compiling MeshCore Firmware with Wi-Fi Enabled
**Device:** These instructions are specifically for the **Heltec V3** device.  
**OS:** This guide was completed on **Red Hat 9.6**.  

**Note:** Wi-Fi in MeshCore is an experimental feature. Your SSID and password are embedded at compile time. Do not share compiled binaries publicly if they contain your real credentials.

## Install PlatformIO
<pre>
cd ~
curl -fsSL -o get-platformio.py https://raw.githubusercontent.com/platformio/platformio-core-installer/master/get-platformio.py
python3 get-platformio.py 
export PATH=$PATH:/home/linuxuser/.platformio/penv/bin
</pre>

## Clone the MeshCore Repository
<pre>
git pull https://github.com/ripplebiz/MeshCore.git
git clone https://github.com/ripplebiz/MeshCore.git
cd MeshCore/
</pre>

## Configure Wi-Fi Credentials
Edit the PlatformIO configuration for the Heltec V3 Wi-Fi build:
<pre>
vi variants/heltec_v3/platformio.ini
</pre>

Find the following section and update with your SSID and password:
<pre>
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
</pre>

## Build the Firmware
<pre>
set FIRMWARE_VERSION=1.7.3
./build.sh build-firmware Heltec_v3_companion_radio_wifi
</pre>

## Rename and Move the Firmware
<pre>
cd .pio/build/Heltec_v3_companion_radio_wifi/
mv firmware-merged.bin Heltec_v3_companion_radio_wifi_1.7.3-merged.bin
mv firmware.bin Heltec_v3_companion_radio_wifi_1.7.3.bin
mv Heltec_v3_companion_radio_wifi* /home/linuxuser/
</pre>

## Next Steps
* Flash the compiled firmware (**Heltec_v3_companion_radio_wifi_1.7.3.bin** or **Heltec_v3_companion_radio_wifi_1.7.3-merged.bin**) onto your Heltec V3 device using your preferred flashing tool.
* Monitor serial output to confirm Wi-Fi association and connectivity.
* Remember this is experimental — expect instability.
