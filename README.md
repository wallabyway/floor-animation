# Floor-Animation

View each floor of a building using an custom vertical 'explode' animation

### Live Demo: [DEMO](https://wallabyway.github.io/floor-animation/)

### Blog: https://forge.autodesk.com/blog/view-each-floor-using-vertical-explode

<img src="https://user-images.githubusercontent.com/440241/49845651-68c03880-fd7c-11e8-9c6b-fa12e5650dab.gif" width=640px />


### Exploding floors

This effect is made up of three parts...

1. Explode function (controlled by a slider)
2. Slow down the ForgeViewer Camera
2. Ease animation for level explode
3. Restoring 4 different camera states   

#### 1. Explode method for AEC / buildings

I first customize the explode code from [Philippe's blog post](https://forge.autodesk.com/blog/selective-explode-viewer).  I then restrict the transforms to vertical only.  Finally, I cluster objects by their vertical position within a level.  You can test the functionality using the slider.

```
var cz = Math.floor(boxes[box_offset + 2] / 10) * 10;
pt.z = cz * scale * 4;
fragList.updateAnimTransform(fragId, null, null, pt);

```

#### 2. Slow down the ForgeViewer Camera
You can slow down the Forge Viewer's camera transitions using these two lines...

```
viewer.autocam.shotParams.destinationPercent=3;
viewer.autocam.shotParams.duration = 3;
```

#### 3. Ease animation for level explode

Next, I need to add smooth explode animation, when I click open or close.  I borrowed from this simple [example source-code](https://javascript.info/task/animate-ball-hops), and simply applied it to the [onSlider()](https://github.com/wallabyway/floor-animation/blob/a3199dc4a5d82df5146db8b795e3459df90e85e8/docs/app.js#L31-L33) method

```
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

```

#### 4. Restoring 4 different camera states

I've done this trick a few times [before](https://forge.autodesk.com/blog/3d-markup-icons-and-info-card).

Simply set up your camera view and hide objects in the scene manually, then capture the camera-state using...

```
view_state_level1 = viewer.getState()
```  

Then build a menu with buttons, with each button restoring your pre-canned view, like this...

```
viewer.restoreState(view_state_level1)
```  
