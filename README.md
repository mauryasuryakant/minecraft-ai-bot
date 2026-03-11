# Minecraft AI Companion Bot 🤖⛏️

A lightweight, intelligent AI-driven Minecraft bot built with **Mineflayer**. This bot is designed to be your in-game assistant, capable of mining, farming, defending you, and following complex commands through the game chat.

---

## 🚀 Features

- **Autonomous Mining**: Strip mining, individual block collection, and area scanning.
- **Survival Instincts**: Auto-eating, sleeping in beds, and reporting status/health.
- **Navigation**: Home waypoint system, guiding you to villages/ores, and following you closely.
- **Combat & Protection**: Guard mode to automatically attack nearby hostile mobs.
- **Resource Management**: Smelting ores, depositing items into chests, and sharing loot.
- **Automation**: Automatic fishing and crop harvesting.

---

## 🛠️ Installation & Setup

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **Minecraft Java Edition**

### 2. Clone & Install
```bash
# Clone the repository (or download)
cd minecraft-ai-bot

# Install dependencies
npm install
```

### 3. Configuration
The bot uses a `config.js` file for its connection settings. Ensure it matches your local Minecraft LAN world or server details.

```javascript
// config.js example
module.exports = {
  host: 'localhost',
  port: 54321, // Change this to your LAN port
  username: 'MiningBot',
  commandPrefix: '!'
};
```

### 4. Run the Bot
```bash
node bot.js
```

---

## 📜 Key Commands

The default prefix is `!`. Below are some highlights (see `COMMANDS_GUIDE.txt` for the full list):

| Category | Command | Description |
| :--- | :--- | :--- |
| **Survival** | `!status` | Shows health, hunger, and location. |
| | `!guard` | Follows and protects you from hostile mobs. |
| | `!torch` | Places a torch if it's too dark. |
| **Mining** | `!mine [block]` | Mines the nearest specified block. |
| | `!stripmine [dir]` | Starts a 1x2 tunnel in a direction. |
| **Navigation**| `!home` | Returns to your set home position. |
| | `!guide [target]`| Leads you to a village or specific block. |
| **Automation**| `!fish` | Starts an infinite fishing loop. |
| | `!farm` | Harvests nearby fully grown crops. |
| **Utility** | `!inv` | Shows what the bot is carrying. |
| | `!give [item]` | Tosses items from its inventory to you. |

---

## 📂 Project Structure

- `/commands`: Individual logic modules for every bot command.
- `/utils`: Helper functions for parsing and tool management.
- `bot.js`: Main entry point and event listeners.
- `COMMANDS_GUIDE.txt`: Exhaustive list of all commands and usage.
- `planning-and-checkpoint.txt`: Development roadmap and status.

---

## 🤝 Contributing

Feel free to open issues or submit pull requests to add new commands or improve the AI behavior!

## 📄 License
This project is licensed under the ISC License.
