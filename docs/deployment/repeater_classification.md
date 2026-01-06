## GOME MeshCore Repeater Classification (WIP)

Below is an attempt to classify repeaters so they can be deployed and managed according to a consistent spec. These categories describe the repeater’s intended role in the network (not just what it *happens* to do on a good day).

### 1) Backbone
**Purpose:** High-impact sites that keep multiple parts of the city mesh well connected.  
**Rule:** **30+ neighbors**  
**Typical hardware:** Prefer **full 1W** units + **Seeed 8 dBi antennas** *(at a bare minimum: **Alfa 5.8 dBi**)*.  
**Notes:** Usually higher sites / wider footprint. If it fails, large areas lose good paths or the mesh becomes significantly weaker.

**Examples:**
- CAN
- GAT_R1
- AlxR2

---

### 2) Regional
**Purpose:** Placed primarily to connect communities / bridge gaps between parts of the mesh (it may also provide local coverage).  
**Rule:** **<30 neighbors**, and its **primary intent/role** is linking two (or a few) community areas.  
**Repeater IDs:** Regional repeaters use the **C Block** of repeater IDs.  
**Typical hardware:** Prefer **full 1W** units + **Seeed 8 dBi antennas** *(at a bare minimum: **Alfa 5.8 dBi**)*.

**Examples:**
- TOO
- NEW
- SILO REPEATER
- phr4

---

### 3) Community
**Purpose:** Primarily for local coverage and capacity within one community/neighborhood area.  
**Rule:** **<30 neighbors**, and its primary intent/role is local service rather than bridging.  
**Typical hardware:** Prefer **0.3W** units + **Alfa 5.8 dBi antenna**.

**Examples:**
- MrAlders0n_R1
- MrAlders0n_R5
- MAY
- VA3TEC_R1
- NIS_RPTR1
- TBRG_R2
