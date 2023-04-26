#

## 1. 在Three.js中，可以通过以下步骤获取鼠标点击位置的三维坐标：

获取鼠标点击位置在屏幕空间的坐标(x, y)，这可以使用Three.js提供的事件对象来完成。例如，在下面的代码中，我们监听场景的鼠标单击事件，并将鼠标位置存储在变量mouse中：

```js
var mouse = new THREE.Vector2();
function onMouseClick( event ) {
    // 计算鼠标在屏幕上的位置
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}
window.addEventListener( 'click', onMouseClick, false );
```

将屏幕空间中的坐标转换为三维空间中的坐标。这需要使用Three.js的射线投射功能。射线从相机的位置开始，并穿过鼠标点击位置所对应的屏幕坐标。
```js
var raycaster = new THREE.Raycaster();
function onMouseClick( event ) {
    // 计算鼠标在屏幕上的位置
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    // 更新射线的起点和方向
    raycaster.setFromCamera( mouse, camera );

    // 计算射线与场景中的物体的交点
    var intersects = raycaster.intersectObjects( scene.children );

    if ( intersects.length > 0 ) {
        // 获取第一个交点的位置
        var intersection = intersects[0].point;
        console.log('Intersection at: ', intersection);
    }
}
window.addEventListener( 'click', onMouseClick, false );
```
在以上代码中，我们将射线投射到了场景中的所有物体上，并使用intersectObjects方法来计算与射线相交的物体。如果有交点，则可以通过`intersects[0].point`属性获取第一个交点的位置。

请注意，这个方法只能获取到最靠前的物体的交点，如果场景中有多个物体相互遮挡，可能无法准确地获取所需的三维坐标。