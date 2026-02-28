# MeshCore Packet Capture (Companion Node Listener)

**Purpose:**  
This guide explains how to install and run **[MeshCore Packet Capture](https://github.com/agessaman/meshcore-packet-capture)** on a **Debian-based system** (Raspberry Pi OS, Ubuntu, etc.) to stream packets from a **dedicated MeshCore companion node** to the **MeshCore Packet Analyzer**.

**Scope:**  
This setup covers **packet capture from companion nodes only**.  
If you wish to setup a standalone packet capture repeater with a Heltec V3 go to **[MeshCore Packet Capture (Standalone Repeater Listener)](packet-capture-standalone-repeater.md)**.

## Requirements

- A **Debian-based OS** (Raspberry Pi OS, Ubuntu, etc.)  
- A **dedicated MeshCore companion node** connected via USB or TCP  
- **Internet access** for forwarding packet data  

## Companion Configuration

1. Before installation, ensure your companion node is named using the Ottawa MeshCore naming standard:

```
YOW_<LOCATION>
```

Examples:

- `YOW_Barrhaven`  
- `YOW_Centretown`  
- `YOW_Orleans`  

This ensures the Packet Analyzer correctly identifies which area each listener represents.

## Packet Capture system configuration

### 1. Install Dependencies

```bash
sudo apt update
sudo apt install -y python3 curl git
sudo apt install -y python3.12-venv
```

### 2. Install the MeshCore Decoder (Required for Auth)

`meshcore-decoder` is required for authentication when sending packets to the Analyzer.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts
npm install -g @michaelhart/meshcore-decoder
```

### 3. Verify installation

```bash
which meshcore-decoder
```

### 4. Run the Packet Capture Installer

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/agessaman/meshcore-packet-capture/main/install.sh)
```

### 5. During installation, you will select your connection method

```bash
 1) Bluetooth Low Energy (BLE)
 - Recommended for T1000
 - Wireless
 - Works with MeshCore T1000e and compatible devices

 2) Serial Connection
 - For USB/serial devices
 - Most reliable for 24/7 capture

 3) TCP Connection
 - Works with ser2net or other serial-over-TCP bridges
 - Useful for remote nodes
```

---

## Example Installer Output

Below is an example of a successful installation:

```bash
═══════════════════════════════════════════════════
  MeshCore Packet Capture Installer v1.1.1
═══════════════════════════════════════════════════

Installation directory [/home/user/.meshcore-packet-capture]:
ℹ Installation directory: /home/user/.meshcore-packet-capture

═══════════════════════════════════════════════════
  Installing Files
═══════════════════════════════════════════════════
✓ Files downloaded and verified

═══════════════════════════════════════════════════
  Checking Dependencies
═══════════════════════════════════════════════════
✓ Python 3 found: Python 3.12.3
✓ Virtual environment created
✓ Python dependencies installed
✓ meshcore-decoder found: /home/user/.nvm/versions/node/v24.11.0/bin/meshcore-decoder

═══════════════════════════════════════════════════
  Device Connection Configuration
═══════════════════════════════════════════════════
Select connection type [1-3] [1]: 3
ℹ Selected: TCP Connection
TCP host/address [localhost]: 192.168.1.201
TCP port [5000]:
✓ TCP connection configured: 192.168.1.201:5000

Enter your IATA code (3 letters): YOW
✓ IATA code set to: YOW

═══════════════════════════════════════════════════
  MQTT Broker Configuration
═══════════════════════════════════════════════════
Enable the MeshCore Packet Analyzer (US + EU servers) for redundancy? [Y/n]: Y
✓ MeshCore Packet Analyzer brokers enabled

═══════════════════════════════════════════════════
  Installation Method
═══════════════════════════════════════════════════
Choose installation method [1-3] [1]: 1
ℹ Installing systemd service...
✓ Service enabled
✓ Systemd service installed

═══════════════════════════════════════════════════
  Installation Complete!
═══════════════════════════════════════════════════
Installation directory: /home/user/.meshcore-packet-capture
Configuration file: /home/user/.meshcore-packet-capture/.env.local
✓ Installation complete!
```

If you see:

```bash
✗ Service failed to start
```

It usually means the companion node wasn’t reachable.  
Fix the connection and restart the service:

```bash
sudo systemctl restart meshcore-capture
```

## Managing the System Service

```bash
sudo systemctl start meshcore-capture
sudo systemctl stop meshcore-capture
sudo systemctl status meshcore-capture
sudo journalctl -u meshcore-capture -f
```

If it fails to start, confirm:

- The companion node is powered and reachable  
- TCP/Serial settings in:  
  `/home/<user>/.meshcore-packet-capture/.env.local`

## Verifying Connection

Open:

**https://analyzer.letsmesh.net/status/observers**

Use the **All Regions** dropdown and select **YOW**.  
If your listener appears and shows green status, it is forwarding packets correctly.

## Logs and Troubleshooting

View live logs:

```bash
sudo journalctl -u meshcore-capture -f
```

### Common Issues
- **Connection refused:** TCP host/port incorrect  
- **`meshcore-decoder` not found:** Re-run installation from Step 2  
- **No packets:** Ensure node is on correct channel/frequency  

## Next Steps

Future documentation will include:

- Packet capture for **repeaters**  
- Packet capture for **room servers**  

## Example Configuration (`.env.local`)

```ini
# MeshCore Packet Capture Configuration
# Local overrides to .env defaults

PACKETCAPTURE_UPDATE_REPO=agessaman/meshcore-packet-capture
PACKETCAPTURE_UPDATE_BRANCH=main

PACKETCAPTURE_CONNECTION_TYPE=tcp
PACKETCAPTURE_ADVERT_INTERVAL_HOURS=24
PACKETCAPTURE_TCP_HOST=192.168.1.201
PACKETCAPTURE_TCP_PORT=5000

PACKETCAPTURE_IATA=YOW
PACKETCAPTURE_ADVERT_INTERVAL_HOURS=11

PACKETCAPTURE_LOG_LEVEL=INFO

# MQTT Broker 1 (US)
PACKETCAPTURE_MQTT1_ENABLED=true
PACKETCAPTURE_MQTT1_SERVER=mqtt-us-v1.letsmesh.net
PACKETCAPTURE_MQTT1_PORT=443
PACKETCAPTURE_MQTT1_TRANSPORT=websockets
PACKETCAPTURE_MQTT1_USE_TLS=true
PACKETCAPTURE_MQTT1_USE_AUTH_TOKEN=true
PACKETCAPTURE_MQTT1_TOKEN_AUDIENCE=mqtt-us-v1.letsmesh.net
PACKETCAPTURE_MQTT1_KEEPALIVE=120

# MQTT Broker 2 (EU)
PACKETCAPTURE_MQTT2_ENABLED=true
PACKETCAPTURE_MQTT2_SERVER=mqtt-eu-v1.letsmesh.net
PACKETCAPTURE_MQTT2_PORT=443
PACKETCAPTURE_MQTT2_TRANSPORT=websockets
PACKETCAPTURE_MQTT2_USE_TLS=true
PACKETCAPTURE_MQTT2_USE_AUTH_TOKEN=true
PACKETCAPTURE_MQTT2_TOKEN_AUDIENCE=mqtt-eu-v1.letsmesh.net
PACKETCAPTURE_MQTT2_KEEPALIVE=120

# Topic format
PACKETCAPTURE_MQTT1_TOPIC_STATUS=meshcore/{IATA}/{PUBLIC_KEY}/status
PACKETCAPTURE_MQTT1_TOPIC_PACKETS=meshcore/{IATA}/{PUBLIC_KEY}/packets
```