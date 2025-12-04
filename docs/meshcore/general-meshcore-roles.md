# MeshCore Device Roles

MeshCore defines several distinct roles within the network, and each role requires its own specific firmware.  
A single piece of hardware can serve as a companion node, a repeater, or a room server depending on what firmware is flashed.  
This section explains what each role does and how they work together within the MeshCore network.

## Companion Nodes

A **companion node** is a small personal device (handheld or portable) that lets a user connect to the mesh.

- Runs on battery or USB power  
- Usually pairs with a smartphone over Bluetooth for messaging  
- Standalone options like the **T-Deck** include a screen and keyboard, but we don’t recommend them for beginners since the firmware is still rough  
- Companion nodes do **not** route packets  
- They can communicate directly with each other  
- **Only repeaters** perform routing across the MeshCore network  

**→ See [Recommended Companions](recommended-companions.md)**

---

## Repeaters

A **repeater** is a fixed installation, typically mounted at elevation (rooftop, tower, mast), that extends range and links mesh segments.

- Runs continuously on mains or solar power  
- Most Ottawa repeaters operate on solar  
- In MeshCore, repeaters form the stable **backbone** of the network  
- They are the **only devices** that perform packet routing  

**→ See [Recommended Repeaters](recommended-repeaters.md)**

---

## Room Servers

A **room server** is a device flashed with specialized firmware that functions like a persistent chat room or mini-BBS.

- Stores the last **32 messages** sent to it  
- When a companion node connects, it retrieves stored messages (similar to checking an inbox)  
- While they technically can repeat, this is strongly discouraged  
  - Ottawa disables repeat on room servers  
  - Developers have discussed removing the option entirely  
- Room servers are **not full repeaters** and lack many repeater features  
- Best used as static message boards or shared chat nodes, **not** as repeaters