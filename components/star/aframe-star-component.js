if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * Example component for A-Frame.
 */
AFRAME.registerComponent('star', {
  schema: { 
    points: {default: 3},
    radius: {default: 0.3}
  },

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {
    this.el.setAttribute('faceset');
  
  },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function (oldData) {
    var el = this.el;
    var data = this.data;
    var points = data.points;
    var r = data.radius;
    
    //vertices
    var vts = [ "0 0 0" ]; // add center point
		points = Math.max(3, points);
		var step = 2 * Math.PI/points;
		for (var a = 0; a < 2 * Math.PI; a += step) {
			vts.push( [ Math.cos(a), 0 , Math.sin(a) ].join(" ") );
			//inner points
			vts.push( [ r*Math.cos(a+step/2), 0 , r*Math.sin(a+step/2) ].join(" ") );
		}
    el.setAttribute('faceset','vertices', vts.join(", "));
  
  },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () { },

  /**
   * Called on each scene tick.
   */
  // tick: function (t) { },

  /**
   * Called when entity pauses.
   * Use to stop or remove any dynamic or background behavior such as events.
   */
  pause: function () { },

  /**
   * Called when entity resumes.
   * Use to continue or add any dynamic or background behavior such as events.
   */
  play: function () { },
});
