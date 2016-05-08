if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}
//var getMeshMixin = require('./getMeshMixin');

AFRAME.registerPrimitive('a-star', AFRAME.utils.extendDeep({}, getMeshMixin(), 
	{
  defaultAttributes: {
    faceset: {
       triangles: "2 0 4, 2 4 3, 4 0 6, 4 6 5, 6 0 2, 6 2 1",
       vertices: "0 0 0, 1 0 0, 0.2427050983124842 0 0.17633557568774194, 0.30901699437494745 0 0.9510565162951535, -0.0927050983124842 0 0.2853169548885461, -0.8090169943749473 0 0.5877852522924732, -0.3 0 3.6739403974420595e-17, -0.8090169943749476 0 -0.587785252292473, -0.09270509831248426 0 -0.285316954888546, 0.30901699437494723 0 -0.9510565162951536, 0.24270509831248419 0 -0.176335575687742"
,
     
    },
    radius: "0.3" ,
  },

  mappings: {
    points: 'faceset.vertices',
    radius: 'faceset.triangles'
  },
  
  transforms: {
		points: function(points) {
			var vts = [ "0 0 0" ]; // add center point
			var r = this.getAttribute('radius');
			points = Math.max(3, points);
			var step = 2 * Math.PI/points;
			for (var a = 0; a < 2 * Math.PI; a += step) {
				vts.push( [ Math.cos(a), 0 , Math.sin(a) ].join(" ") );
				//inner points
				vts.push( [ r*Math.cos(a+step/2), 0 , r*Math.sin(a+step/2) ].join(" ") );
			}
			/*
			//triangles
			var faces = [];
			for ( var p = 1; p < points; p++) {
				//inner polygon
				faces.push( [0, 2*p, 2*p+2].join(" ") );
				//outer points
				faces.push( [2*p, 2*p+1, 2*p+2].join(" ") );
			}
			//this.components.faceset.data.triangles = faces.join(',');
			this.setAttribute('faceset', 'triangles', faces.join(','));  //works but vertices are not set yet
			*/
			return vts.join(",");
		},
		radius: function(radius) {
			//triangles
			var faces = [];
			var points = this.getAttribute('points');
			for ( var p = 0; p < points; p++) {
				//inner polygon, clockwise
				faces.push( [1+(p*2+1)%(points*2), 0, 1+(2*p+3)%(points*2)].join(" ") );
				//outer points
				faces.push( [1+(p*2+1)%(points*2), 1+(2*p+3)%(points*2), 1+(2*p+2)%(points*2)].join(" ") );
			}
			return faces.join(",");
		}
  }
  
}));
/**
 * Common mesh defaults, mappings, and transforms.
 */
 function getMeshMixin () {
  return {
    defaultAttributes: {
      material: { }
    },

    mappings: {
      color: 'material.color',
      metalness: 'material.metalness',
      opacity: 'material.opacity',
      repeat: 'material.repeat',
      roughness: 'material.roughness',
      shader: 'material.shader',
      side: 'material.side',
      src: 'material.src',
      transparent: 'material.transparent'
    },

    transforms: {
      src: function (value) {
        // Selector.
        if (value[0] === '#') { return value; }
        // Inline url().
        return 'url(' + value + ')';
      }
    }
  };
};
