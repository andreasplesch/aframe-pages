if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}
var getMeshMixin = require('./getMeshMixin');

AFRAME.registerPrimitive('a-polygon', AFRAME.utils.extendDeep({}, getMeshMixin(), 
	{
  defaultAttributes: {
    faceset: {
      vertices: '0 0 0, 1 0 0, -0.5 0 0.866, -0.5 0 -0.866',
      triangles: ''
    }
  },

  mappings: {
    points: 'faceset.vertices',
  },
  
  transforms: {
		sides: function(points) {
			var vts = [0, 0, 0]; // add center point
			var r = 0.5;
			points = Math.max(3, points);
			var step = 2 * Math.PI/points;
			for (var a = 0; a < 2 * Math.PI; a += step) {
				vts.push( [ Math.cos(a), 0 , Math.sin(a) ].join(" ") );
				//inner points
				vts.push( [ r*Math.cos(a+step/2), 0 , r*Math.sin(a+step/2) ].join(" ") );
			}
			//triangles
			var faces = [];
			for ( var p = 1; p < points; p++) {
				//inner polygon
				faces.push( [0, 2*p, 2*p+2].join(" ") );
				//outer points
				faces.push( [2*p, 2*p+1, 2*p+2].join(" ") );
			}
			this.componentData.triangles = faces.join(',');
			return vts.join(",");
		}
  }
  
}));
