# Create a text file listing all Minecraft bot commands using pypandoc as required
<!-- import pypandoc

text_md = """ -->
Minecraft AI Bot - Command List

Prefix: !

Basic Navigation
----------------
!goto <x> <y> <z>
Move the bot to specific coordinates.

Example:
!goto 120 64 -300


Mining
------
!mine <block>
Bot mines the nearest block of the specified type.

Examples:
!mine dirt
!mine stone
!mine coal_ore


Collection
----------
!collect <block>
Bot searches for multiple nearby blocks and collects them.

Examples:
!collect oak_log
!collect cobblestone


Follow Player
-------------
!follow
Bot follows the player who issued the command.


Strip Mining
------------
!stripmine <direction>
Bot starts a simple tunnel mining routine.

Directions you can use:
north
south
east
west

Example:
!stripmine north


Stop Bot
--------
!stop
Stops all current bot actions such as movement, following, or mining.


Example Gameplay Session
------------------------
!goto 100 64 -200
!follow
!mine dirt
!collect oak_log
!stripmine east
!stop
"""

<!-- output_path = "/mnt/data/minecraft_bot_commands.txt"
pypandoc.convert_text(text_md, 'plain', format='md', outputfile=output_path, extra_args=['--standalone'])

output_path -->
