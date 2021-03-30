# based on https://react-native.rocketseat.dev/android/linux
# based on https://aboullaite.me/switching-between-java-versions-on-ubuntu-linux/

# Script made to setup environment to use react-native

# sudo update-alternatives --config java
# "Running this command shows a list of installed Java JDKs and JREs allowing one 
# to be selected as the default that is used when java needs to be executed.
# But I'm using it just to get the Installation path of each Java version."

# Install the JDK-11
# sudo apt-get install openjdk-11-jdk
# Install the JDK-14 what i'm using for flutter
# sudo apt install openjdk-14-jdk

# Changing the java version for the openjdk-14
# sudo update-java-alternatives -s openjdk-14-jdk
# which java => ls -la /usr/bin/java => ls -la /etc/alternatives/java => /usr/lib/jvm/java-14-openjdk-amd64/bin/java
export JAVA_HOME=/usr/lib/jvm/java-14-openjdk-amd64
export PATH=$PATH:$JAVA_HOME

export ANDROID_HOME=~/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools