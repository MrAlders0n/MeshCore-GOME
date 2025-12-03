
# Compiling MeshCore Firmware for RAK4631 with MakerFocus 1.3" OLED (SH1106)
**Device:** These instructions are specifically for the **RAK4631** with the **MakerFocus 1.3" SH1106 OLED**.  
**OS:** This guide was completed on **Red Hat 9.6**.  

**Note:** MeshCore does not natively support the MakerFocus SH1106 OLED out of the box on the RAK4631.  
The steps below modify the PlatformIO configuration to add SH1106 display support.

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

## Edit the PlatformIO Configuration
<pre>
vi variants/rak4631/platformio.ini
</pre>

Replace the OLED-related lines as shown below.  
Every line marked with “<============= CHANGED” is different from the default configuration.

<pre>
[rak4631]
extends = nrf52_base
platform = https://github.com/maxgerhardt/platform-nordicnrf52.git#rak
board = wiscore_rak4631
board_check = true
build_flags = ${nrf52_base.build_flags}
  ${sensor_base.build_flags}
  -I variants/rak4631
  -D RAK_4631
  -D RAK_BOARD
  -D PIN_BOARD_SCL=14
  -D PIN_BOARD_SDA=13
  -D PIN_GPS_TX=16
  -D PIN_GPS_RX=15
  -D PIN_GPS_EN=-1
  -D PIN_OLED_RESET=-1
  -D RADIO_CLASS=CustomSX1262
  -D WRAPPER_CLASS=CustomSX1262Wrapper
  -D LORA_TX_POWER=22
  -D SX126X_CURRENT_LIMIT=140
  -D SX126X_RX_BOOSTED_GAIN=1
build_src_filter = ${nrf52_base.build_src_filter}
  +<../variants/rak4631>
  +<helpers/sensors>
;  +<helpers/ui/SSD1306Display.cpp> <============= CHANGED 
  +<helpers/ui/SH1106Display.cpp> <============= CHANGED 
  +<helpers/ui/MomentaryButton.cpp>
lib_deps =
  ${nrf52_base.lib_deps}
  ${sensor_base.lib_deps}
;  adafruit/Adafruit SSD1306 @ ^2.5.13 <============= CHANGED 
  sparkfun/SparkFun u-blox GNSS Arduino Library@^2.2.27
  adafruit/Adafruit SH110X @ ^2.1.13 <============= CHANGED 
  adafruit/Adafruit GFX Library @ ^1.12.1 <============= CHANGED 


[env:RAK_4631_companion_radio_ble]
extends = rak4631
board_build.ldscript = boards/nrf52840_s140_v6_extrafs.ld
board_upload.maximum_size = 712704
build_flags =
  ${rak4631.build_flags}
  -I examples/companion_radio/ui-new
  -D PIN_USER_BTN=9
  -D PIN_USER_BTN_ANA=31
;  -D DISPLAY_CLASS=SSD1306Display <============= CHANGED 
  -D DISPLAY_CLASS=SH1106Display <============= CHANGED 
  -D MAX_CONTACTS=350
  -D MAX_GROUP_CHANNELS=40
  -D BLE_PIN_CODE=123456
  -D BLE_DEBUG_LOGGING=1
  -D OFFLINE_QUEUE_SIZE=256
;  -D MESH_PACKET_LOGGING=1
;  -D MESH_DEBUG=1
build_src_filter = ${rak4631.build_src_filter}
  +<helpers/nrf52/SerialBLEInterface.cpp>
  +<../examples/companion_radio/*.cpp>
  +<../examples/companion_radio/ui-new/*.cpp>
lib_deps =
  ${rak4631.lib_deps}
  densaugeo/base64 @ ~1.4.0
</pre>

## Build the Firmware
<pre>
set FIRMWARE_VERSION=1.9.0
./build.sh build-firmware RAK_4631_companion_radio_ble
</pre>

## Rename and Move the Firmware
<pre>
cd .pio/build/RAK_4631_companion_radio_ble/
mv firmware-merged.bin RAK_4631_companion_radio_ble_1.9.0-merged.bin
mv firmware.bin RAK_4631_companion_radio_ble_1.9.0.bin
mv RAK_4631_companion_radio_ble* /home/linuxuser/
</pre>

## Next Steps
* Flash the compiled firmware (`RAK_4631_companion_radio_ble_1.7.3.bin` or `RAK_4631_companion_radio_ble_1.7.3-merged.bin`) to your RAK4631.
* Connect your MakerFocus 1.3" OLED (SH1106) at I²C address **0x3C** (jumper on **0x7A** side).  
* Power only with **3.3 V** — this module is **not 5 V tolerant**.
* Once flashed, the SH1106 display should initialize normally on boot.
