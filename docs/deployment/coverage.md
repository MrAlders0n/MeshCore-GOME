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
    src="http://yow.meshmapper.net/embed.php?points=0&repeaters=0&comp_coverage=1&rep_coverage=1"
    style="border: 0; width: 100%; height: 100%;"
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
  ></iframe>
</div>

If you want to explore the map in a full window, you can open it directly here:  
[MeshMapper](https://yow.meshmapper.net)

## How MeshMapper Works

MeshMapper is simple to use and works with any MeshCore companion:

1. The app generates a block of text that includes:
   - The MeshMapper Bot tag  
   - Your current GPS coordinates  
   - The signal strength your device is reporting  
2. This text is automatically copied to your clipboard when the user clicks **Copy Coordinates**.
3. You paste it into the **#testing** channel on the MeshCore app.
4. If a repeater hears your packet, the MeshMapper Bot replies and confirms it’s been added to the coverage map.

Every point on the map comes from someone driving, biking, or walking around with a node and sending a MeshMapper ping.

The more the community participates, the better and more accurate the live coverage map becomes.

If you want to help improve this map, hop into the Ottawa MeshCore Discord and ask how to get started with MeshMapper.
