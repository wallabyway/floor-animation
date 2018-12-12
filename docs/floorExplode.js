// floorExplode.js

function floorExplode(viewer, scale, excludedFragIds, model) {

    model = model || viewer.model
    var svf = model.getData();
    var mc = model.getVisibleBounds(true).center();
    var fragList = model.getFragmentList();
    var pt = new THREE.Vector3();

    //Input scale is in the range 0-1, where 0
    //means no displacement, and 1 maximum reasonable displacement.
    scale *= 2;

    var boxes = fragList.fragments.boxes;
    var nbFrags = fragList.getCount();
    for (var fragId = 0; fragId < nbFrags; ++fragId) {

        if (scale == 0) {

            fragList.updateAnimTransform(fragId);

        } else {

            var box_offset = fragId * 6;
            var cz = Math.floor(boxes[box_offset + 2] / 10) * 10; // + boxes[box_offset + 5];
            //cz = scale * (cz - mc.z);
            pt.z = cz * scale * 4;

            //pt.z = mc.z;

            fragList.updateAnimTransform(fragId, null, null, pt);
        }
    }
}


// animate.js
function circ(timeFraction) { return 1 - Math.sin(Math.acos(timeFraction)) }
function makeEaseOut(timing) { return function(timeFraction) {return 1 - timing(1 - timeFraction)}}
function animate({timing, draw, duration}) {
  let start = performance.now();
  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;
    let progress = timing(timeFraction);
    draw(progress); // draw it
    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}
