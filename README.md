# 🧶 Yarn Puzzle Game

Colorful yarn untangling puzzle game built with HTML5 Canvas. Sort colorful yarns into matching slots in this relaxing and engaging puzzle experience!

## 🎮 Game Features

- **Colorful Graphics**: Vibrant gradients and smooth animations
- **Progressive Difficulty**: Multiple levels with increasing complexity
- **Touch & Mouse Support**: Play on desktop or mobile devices
- **No Ads or Microtransactions**: Pure gameplay fun!
- **Local Save System**: Your progress is automatically saved
- **Undo & Reset**: Made a mistake? No problem!

## 🎯 How to Play

1. **Drag yarns** from temporary slots to target slots
2. **Match colors** - each target slot must contain yarns of the same color
3. **Fill completely** - each target slot must be filled to capacity
4. **Strategic planning** - use temporary slots wisely as they have limited space!

## 🚀 Getting Started

### Play Online
Simply open `index.html` in a modern web browser!

### Local Development
```bash
# Clone the repository
git clone https://github.com/buksa656/yarn-puzzle-game.git
cd yarn-puzzle-game

# Open with a local server (recommended)
python -m http.server 8000
# or
npx serve

# Then navigate to http://localhost:8000
```

## 🏗️ Project Structure

```
yarn-puzzle-game/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Colorful styling
├── js/
│   ├── main.js         # Game initialization
│   ├── game.js         # Core game logic
│   ├── renderer.js     # Canvas rendering engine
│   ├── yarn.js         # Yarn object class
│   ├── slot.js         # Slot management
│   ├── level.js        # Level system
│   └── utils.js        # Helper functions
├── levels/
│   └── levels.json     # Level definitions
└── assets/             # Future: images and sounds
```

## 🎨 Color Palette

The game features a vibrant color scheme:
- Pink (#FF6B9D)
- Teal (#4ECDC4)
- Yellow (#FFD93D)
- Mint (#A8E6CF)
- Coral (#FF8B94)
- Lavender (#B4A7D6)
- And more!

## 🔧 Technology Stack

- **HTML5 Canvas** - Core rendering
- **Vanilla JavaScript** - No frameworks needed
- **CSS3** - Modern styling with gradients
- **JSON** - Level data management

## 📱 Mobile Porting Roadmap

The codebase is designed for easy mobile porting:

1. **Phase 1** (Current): Web version with touch support
2. **Phase 2**: PWA with offline capabilities
3. **Phase 3**: Cordova/Capacitor wrapper for app stores
4. **Phase 4**: Native optimizations

## 🎯 Future Features

- [ ] More levels (50+ planned)
- [ ] Achievement system
- [ ] Daily challenges
- [ ] Level editor
- [ ] Sound effects and music
- [ ] Particle effects
- [ ] Time trial mode (optional)
- [ ] Color blind mode
- [ ] Multiple themes

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Create new levels
- Improve graphics
- Optimize performance

## 📄 License

MIT License - Feel free to use and modify!

## 🎮 Play & Enjoy!

Have fun untangling those yarns! 🧶✨

---

**Created with ❤️ for puzzle game lovers**
