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
    //color: { default: '#000' },
    vertices: {
      default: [
        { x: -0.5, y: 0, z: 0.5 },
        { x: 0.5, y: 0, z: 0.5 },
        { x: 0.5, y: 0, z: -0.5 },
        { x: -0.5, y: 0, z: -0.5 }
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
    triangles: {
      default: [
        { x: 0, y: 1, z: 2 }, // change to a,b,c with parse
        { x: 2, y: 3, z: 0 }
      ],
      // Deserialize index in the form of comma-separated vec3s: `0 0 0, 1 1 1, 2 0 3`.
      parse: function (value) {
        return value.split(',').map(AFRAME.utils.coordinates.parse);
      },
      // Serialize array of vec3s in case someone does setAttribute('line', 'path', [...]).
      stringify: function (data) {
        return data.map(AFRAME.utils.coordinates.stringify).join(',');
      }
    }, // like vertices
    uvs: { type: 'vec2' }, // vec2s, coordinate.parse ok but stringify may not be ok (just recreate for 2d)
    translate: { type: 'vec3' }
  },
  
  init: function () {
    //always create new
  },

  do_update: function () {
  
  },
  
  update: function (previousData) {
    previousData = previousData || {};
    var data = this.data;
    var currentTranslate = previousData.translate || this.schema.translate.default;
    var diff = AFRAME.utils.diff(previousData, data);
    var mesh = this.el.getOrCreateObject3D('mesh', THREE.Mesh);
    var geometry = mesh.geometry;
    var geometryNeedsUpdate = !(Object.keys(diff).length === 1 && 'translate' in diff);
    var translateNeedsUpdate = !AFRAME.utils.deepEqual(data.translate, currentTranslate);

    if (geometryNeedsUpdate) {
      geometry = mesh.geometry = getGeometry(this.data);
    }
    
    if (translateNeedsUpdate) {
      applyTranslate(geometry, data.translate, currentTranslate);
    }
    
  },
    
  /**
   * Removes geometry on remove (callback).
   */
  remove: function () {
    this.el.getObject3D('mesh').geometry = new THREE.Geometry();
  }
});

function getGeometry (data) {
  var geometry = new THREE.Geometry();
    
  this.data.vertices.forEach(function (vec3) {
    geometry.vertices.push(
      new THREE.Vector3(vec3.x, vec3.y, vec3.z)
    );
  });
  
  this.data.triangles.forEach(function (vec3) {
    geometry.faces.push(
      new THREE.Face3(vec3.x, vec3.y, vec3.z)
    );
  });
  
  return geometry
}

/**
 * Translates geometry vertices.
 *
 * @param {object} geometry - three.js geometry.
 * @param {object} translate - New translation.
 * @param {object} currentTranslate - Currently applied translation.
 */
function applyTranslate (geometry, translate, currentTranslate) {
  var translation = helperMatrix.makeTranslation(
    translate.x - currentTranslate.x,
    translate.y - currentTranslate.y,
    translate.z - currentTranslate.z
  );
  geometry.applyMatrix(translation);
  geometry.verticesNeedsUpdate = true;
}

