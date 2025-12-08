# MeshCore FAQ

This page covers frequently asked questions about using MeshCore in Ottawa.  
Each section provides quick guidance for common tasks.

---

## How Adverts Work

MeshCore uses a **repeater-driven advert system** for discovery (not a prerequisite to transmit).

- **You do not need to receive an advert from a repeater to send a message.**  
  - You can transmit at any time; any repeater that hears your packet will forward it.

- Adverts allow your node to **discover repeaters** (their ID and info). This enables:
  - Tracing paths to confirm connectivity  
  - Seeing repeater names in message paths  
  - Setting static paths to a specific user

- Repeaters periodically broadcast **adverts** (short beacon packets).

- In Ottawa:
  - **Zero-hop adverts:** Every 1 hour  
  - **Flood adverts:** Every 3 hours  

---

## Repeater Neighbours

Repeaters build their neighbour list over time based on the **direct adverts** they receive.  
Keep in mind that having a neighbour listed doesn’t guarantee a **bidirectional** link.  
It’s common for a repeater to transmit down a path that it can’t reliably receive from.  
This is one of the reasons MeshCore allows repeaters to route messages through the entire mesh rather than relying only on direct neighbours.

**Example:**

Repeater 1 Neighbours:

- Repeater 2
- Repeater 3

Repeater 2 Neighbours:

- Repeater 3

Repeater 3 Neighbours:

- Repeater 1

---

## The Public Channel

All Ottawa MeshCore nodes have access to the **public channel**.

- Any correctly flashed node on the correct frequency can pass traffic.
- When you send a message and a repeater hears it, the app shows **Heard X Repeats**.
- Hold a message → tap **Heard Repeats** to see which repeaters heard it.
  - Known repeaters show **names**  
  - Unknown repeaters show **IDs**
