//THREE.geometry
//directly provide vertices
//and indices = faces
//perhaps optionally triangulate
//using https://github.com/ironwallaby/delaunay
//rewrite using registerGeometry
//parsing from line example
//default texture coordinate from bbox .computeBoundingBox, .BoundingBox

AFRAME.registerComponent('faceset', {
  schema: {
    color: { default: '#000' },
    vertices: {
      default: [
        { x: -0.5, y: 0, z: 0 },
        { x: 0.5, y: 0, z: 0 }
      ],
      // Deserialize path in the form of comma-separated vec3s: `0 0 0, 1 1 1, 2 0 3`.
      parse: function (value) {
        return value.split(',').map(AFRAME.utils.coordinates.parse);
      },
      // Serialize array of vec3s in case someone does setAttribute('line', 'path', [...]).
      stringify: function (data) {
        return data.map(AFRAME.utils.coordinates.stringify).join(',');
      }
    },
    triangles: {} // like vertices
  },
  
  init: function () {
    
  },
  
  
  do_update: function () {
  
  },
  
  update: function () {
    var geometry = new THREE.Geometry();
    
    this.data.path.forEach(function (vec3) {
      geometry.vertices.push(
        new THREE.Vector3(vec3.x, vec3.y, vec3.z)
      );
    });
    
    this.el.setObject3D('mesh', new THREE.Mesh(line.geometry, material));
  },
  
  remove: function () {
    this.el.removeObject3D('mesh');
  }
});
