#run as 'build.sh [compiler] [output dir]'.
#you *may* need to run sudo -i before this script
#setup
#if [$# -ge $2]
#then
#echo Usage: build.sh [compiler] [output dir]
#exit 1
#fi

rm -rf $2
mkdir $2

compile() {
	mkdir -p $(dirname $2/$3) #make directory if it doesn't exist
	(java -jar $1 --compilation_level ADVANCED_OPTIMIZATIONS --js $3 --create_source_map $2/$3.js.map --source_map_format=V3 --js_output_file $2/$3) > >(tee $2/$3.log) 2> >(tee $2/$3-err.log >&2)
}
#compile files
echo Compiling
compile $1 $2 data.js
compile $1 $2 dragdrop.js
compile $1 $2 elements.js
compile $1 $2 emulator.js
compile $1 $2 naming.js
compile $1 $2 stacks.js
compile $1 $2 window.js
compile $1 $2 sensors/accelerometer.js
compile $1 $2 sensors/camera.js
compile $1 $2 sensors/mouse.js
compile $1 $2 sensors/webcam.js
#clean up empty logs
echo Cleaning up
find $2/*.log -size  0 -print0 |xargs -0 rm
echo Done.