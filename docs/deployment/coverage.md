# Ottawa Coverage

!!! warning "NCR Coverage Page"
    This page is a work in progress. Coverage is based on real world reports from users running the MeshMapper app. The data will improve over time as more drives and walks are recorded.

MeshCore coverage in the NCR area is provided by mostly solar powered repeaters. Coverage can vary based on height, line of sight, and terrain, but the network generally reaches Ashton, Barrhaven, Buckingham, Carleton Place, Cumberland, Downtown, Kanata, Nepean, Old Ottawa South, Orleans, Richmond, and Stittsville.

For a live view of deployed nodes, check the [MeshCore Map](https://analyzer.letsme.sh/map?lat=45.4215&long=-75.6972&zoom=9).

## Live Coverage (MeshMapper)

The map below is powered by **MeshMapper**, a community-driven coverage tracking app created by **CSP-Tom**.  
MeshMapper gives us real world data points instead of simulations, letting us build an accurate picture of how the network actually performs across the region.

<div style="width: 100%; max-width: 100%; aspect-ratio: 16 / 9;">
  <iframe
    src="https://yow.meshmapper.net/embed.php?points=0&repeaters=0&comp_coverage=1&rep_coverage=1"
    style="border: 0; width: 100%; height: 100%;"
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
  ></iframe>
</div>

If you want to explore the map in a full window, you can open it directly here:  
[MeshMapper](https://yow.meshmapper.net)


## How MeshMapper Works

MeshMapper is simple to use and works with any MeshCore companion. Its goal is to collect real-world signal reports and build an accurate picture of how the mesh performs across the region.

### Steps to Get Started

1. **Browse to:** [https://meshmapper.net](https://meshmapper.net)

2. **Pick your options:**
        - **Mask exact location** (moves your position randomly by 100m)  
        - **Refresh every 5s**  
        - **Attach transmitter strength?**  

3. The app generates a block of text that includes:
        - The **MeshMapper Bot** tag  
        - Your current **GPS coordinates**  
        - The **companion transmit power** you selected in the app  

4. When you tap **Copy Coordinates**, this text is automatically copied to your clipboard.

5. **Paste the text** into one of the following MeshCore hashtag channels:
        - `#testing` (Light use)  
        - `#mapper` (Moderate use)  
        - `#wardriving` (Heavy use)  

6. If the message is received by the MeshMapper Bot, it replies and confirms that the point has been added to the map.

### How Data Is Stored

- MeshMapper will overwrite an existing pin if the same user submits a new pin within roughly 100 meters. This keeps the map clean and prevents duplicates from the same area.
- Each pin stores the recorded GPS coordinates and the **user-selected companion power level**.
- Supported power options:

    - Unspecified  
    - 0.3 W (Heltec T114)  
    - 0.6 W (Heltec V4)  
    - 1.0 W (Ikoka)  

### MeshMapper Map Layers

The MeshMapper web map includes four layers that can be enabled or disabled depending on what you want to view.

#### Coverage Points
These are the actual GPS pins submitted by users. They represent confirmed locations where a MeshCore packet was heard by at least one repeater.

#### Repeaters
A list of all known repeaters that MeshMapper has data for. These give context for coverage points and help visualize the mesh.

#### Companion Potential Coverage
A simple 100 meter radius around each coverage point. This provides a rough visual of possible companion-level reach in all directions from that location.

#### Repeater Potential Coverage
This layer uses the companion’s submitted GPS location and the first repeater in the path to the MeshMapper Bot. MeshMapper calculates the distance between those two points and draws a circle with that radius to estimate the repeater’s potential coverage area.

This is only an approximation. For example, a repeater on the 15th floor of an apartment building might be reachable from several kilometers away if line of sight is clear. That same repeater might be unreachable only a few hundred meters away if something blocks the signal. Treat this layer as an estimate, not exact RF modeling.
