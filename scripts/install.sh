#!/bin/bash
set -e

# Pega o diretório onde o script está
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Sobe um nível para a raiz do projeto
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "📁 Project dir: $PROJECT_DIR"

# Build
echo "🔨 Building..."
cd "$PROJECT_DIR"
cargo tauri build --no-bundle

# Instalar binário
echo "📦 Installing binary..."
sudo cp "$PROJECT_DIR/src-tauri/target/release/justaclock" /usr/local/bin/justaclock

# Criar .desktop
echo "📝 Creating desktop entry..."
sudo mkdir -p /usr/share/applications
sudo tee /usr/share/applications/justaclock.desktop > /dev/null <<'EOF'
[Desktop Entry]
Name=JustAClock
Comment=Clock, stopwatch and timer
Exec=/usr/local/bin/justaclock
Icon=preferences-system-time
Type=Application
Categories=Utility;Clock;
nKeywords=clock;timer;stopwatch;alarm;
Terminal=false
StartupNotify=true
EOF

# Atualizar cache
echo "🔄 Updating desktop database..."
sudo update-desktop-database /usr/share/applications/

echo ""
echo "✅ JustAClock installed successfully!"
echo "   Run: justaclock"
echo "   Or search \"JustAClock\" in your app menu"