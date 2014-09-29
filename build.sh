#run as 'build.sh <js compiler> <html compiler> <output dir>'.
#you *may* need to run sudo -i before this script
#setup
#if [$# -ge $2]
#then
#echo Usage: build.sh <js compiler> <html compiler> <output dir>
#exit 1
#fi

rm -rf $3
mkdir $3

compile() {
	mkdir -p $(dirname $2/$3) #make directory if it doesn't exist
	(java -jar $1 --compilation_level ADVANCED_OPTIMIZATIONS --js $3 --create_source_map $2/$3.js.map --source_map_format=V3 --js_output_file $2/$3) > >(tee $2/$3.log) 2> >(tee $2/$3-err.log >&2)
}
chtml() {
	mkdir -p $(dirname $2/$3) #make directory if it doesn't exist
	(java -jar $1 --type html --recursive --output $2/$3 --remove-intertag-spaces --compress-js --compress-css --js-compressor closure --closure-opt-level ADCANCED_OPTIMIZATIONS --closure-externs $2/$3-externs.txt --simple-bool-attr --simple-doctype --remove-quotes $2/$3) > >(tee $2/$3.log) 2> >(tee $2/$3-err.log >&2)
}
require() {
	mkdir -p $(dirname $2/$3) #make directory if it doesn't exist
	cp $1/$3 $2/$3
}
#compile files
echo Compiling
chtml $2 $3 main.html
compile $1 $3 data.js
compile $1 $3 dragdrop.js
compile $1 $3 elements.js
compile $1 $3 emulator.js
compile $1 $3 naming.js
compile $1 $3 stacks.js
compile $1 $3 window.js
compile $1 $3 sensors/accelerometer.js
compile $1 $3 sensors/camera.js
compile $1 $3 sensors/mouse.js
compile $1 $3 sensors/webcam.js
compile $1 $3 naming.js
require $1 $3 jquery-ui-1.10.3/themes/base/jquery-ui.css
require $1 $3 jquery-ui-1.10.3/jquery-1.9.1.js
require $1 $3 jquery-ui-1.10.3/ui/jquery.ui.core.js
require $1 $3 jquery-ui-1.10.3/ui/jquery.ui.widget.js
require $1 $3 jquery-ui-1.10.3/ui/jquery.ui.mouse.js
require $1 $3 jquery-ui-1.10.3/ui/jquery.ui.draggable.js
require $1 $3 jquery-ui-1.10.3/ui/jquery.ui.droppable.js
require $1 $3 jquery-ui-1.10.3/ui/jquery.ui.sortable.js
require $1 $3 jquery-ui-1.10.3/ui/jquery.ui.position.js
require $1 $3 jquery-ui-1.10.3/ui/jquery.ui.accordion.js
require $1 $3 jquery-ui-1.10.3/ui/jquery.ui.menu.js
require $1 $3 jquery-ui-1.10.3/ui/jquery.ui.dialog.js
require $1 $3 jquery-ui-1.10.3/ui/jquery.ui.button.js
require $1 $3 img/trash.png
require $1 $3 main.css
#clean up empty logs
echo Cleaning up
find $2/*.log -size  0 -print0 |xargs -0 rm
echo Done.