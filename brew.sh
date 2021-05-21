# install brew
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
# download Brewfile
curl -s https://raw.githubusercontent.com/nitrocode/dotfiles/master/macos/Brewfile > Brewfile
# disable analytics
brew analytics off
# install from Brewfile
brew bundle install
# relink anything broken
brew link
# lastly, run the doctor to see anything out of whack
brew doctor

# if arm, switch to /opt/homebrew/bin
HOMEBREW_DIR=/opt/homebrew/bin
LOCAL_BIN_DIR=/opt/homebrew/bin

ln -s $HOMEBREW_DIR/gmake $LOCAL_BIN_DIR/make
ln -s $HOMEBREW_DIR/gsed $LOCAL_BIN_DIR/sed
ln -s $HOMEBREW_DIR/gtar $LOCAL_BIN_DIR/tar
ln -s $HOMEBREW_DIR/ggrep $LOCAL_BIN_DIR/grep
ln -s $HOMEBREW_DIR/gls $LOCAL_BIN_DIR/ls

# use brew less
# source: https://apple.stackexchange.com/a/281116/282367
hash -d less
hash -r
