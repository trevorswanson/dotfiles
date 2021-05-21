#!/bin/sh

# first install xcode which is a dependency of gcc which is a dependency of xcrun which is a dependency of tfenv...
xcode-select --install

./brew.sh
./shell.sh

cp ubersicht-widgets/* ~/Library/Application\ Support/Übersicht/widgets/
cp .nanorc ~/
cp .taskrc ~/
cp .vimrc ~/
cp .zshrc ~/
