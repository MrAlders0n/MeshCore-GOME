# Bot Etiquette

Thanks to one of our community members (tahnok) [in drafting these guidelines](https://notes.tahnok.ca/blog/Meshcore+bot+etiquette).

Meshcore is free and open to everyone, and the nature of the mesh means nobody can stop you or your bot from participating.

The mesh can't support infinite traffic. It is a commons and a community, and so humans do what we always do and collaborate to keep it thriving.

We have come up with some guidelines we hope bot authors will follow in order to write polite bots, and help keep the mesh meshing.

These are community guidelines, and we invite you to improve or change them through discussion and feedback shared on the mesh, in discord.

Here are the recommendations:

## Avoid posting in the public channel

The public main channel is quite busy and the first thing a newcomer will see. The community prefers to keep bots elsewhere, like ```#bots``` or ```#testing```.

This makes it straightforward for people who don't want to see bots to do so.

Ottawa has one bot that welcomes new faces. If you want to improve or change it, contact @tahnok, [file an issue, or submit a pull request](https://github.com/tahnok/ottobot).

## Respond to !bots in #bots

Bots should be discoverable and the easiest way to do that is settle on a common command that all bots implement.

You can describe your bot, list the commands it supports or provide a means of learning more about your bot.

## Prefer responding to commands only when addressed directly

e.g., @ottobot !ping, not to !ping or try the !ping command

This helps avoid bot loops (one bot triggers another) and flooding the mesh.

This also helps avoid conflicts if more then one bot shares a command.

In a specific channel (eg ```#aircraft```), this suggestion can be ignored.

Note: the !bots command must not require being addressed in this way.

## Provide a way to contact the author

You can implement a !source command that links to the source code or ```!author``` that provides your email or similar.

Running a bot is a responsibility, and it's polite to give others a way to contact you.
