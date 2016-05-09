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
    var fs = document.createAttribute("faceset");
    this.el.setAttributeNode(fs);
  
  },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function (oldData) {
  
    this.el.setAttribute('faceset','vertices','0 0 0, 1 0 0, 1 1 0');
  
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
