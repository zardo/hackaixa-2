import MapTypeStyleElementType = google.maps.MapTypeStyleElementType;
import MapTypeStyleFeatureType = google.maps.MapTypeStyleFeatureType;

export class Mapa {
  static estilo = [
    {
      'featureType': 'all' as MapTypeStyleFeatureType,
      'elementType': 'labels' as MapTypeStyleElementType,
      'stylers': [
        {
          'visibility': 'on'
        }
      ]
    },
    {
      'featureType': 'all' as MapTypeStyleFeatureType,
      'elementType': 'labels.text' as MapTypeStyleElementType,
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'poi' as MapTypeStyleFeatureType,
      'elementType': 'labels.icon' as MapTypeStyleElementType,
      'stylers': [
        {
          'visibility': 'on'
        }
      ]
    },
    {
      'featureType': 'all' as MapTypeStyleFeatureType,
      'elementType': 'labels.icon' as MapTypeStyleElementType,
      'stylers': [
        {
          'visibility': 'on'
        }
      ]
    },
    {
      'featureType': 'landscape' as MapTypeStyleFeatureType,
      'elementType': 'geometry' as MapTypeStyleElementType,
      'stylers': [
        {
          'visibility': 'on'
        },
        {
          'color': '#38692d'
        }
      ]
    },
    {
      'featureType': 'landscape.man_made' as MapTypeStyleFeatureType,
      'elementType': 'geometry' as MapTypeStyleElementType,
      'stylers': [
        {
          'visibility': 'on'
        },
        {
          'color': '#989898'
        }
      ]
    },
    {
      'featureType': 'landscape.man_made' as MapTypeStyleFeatureType,
      'elementType': 'geometry.stroke' as MapTypeStyleElementType,
      'stylers': [
        {
          'color': '#000000'
        }
      ]
    },
    {
      'featureType': 'landscape.natural' as MapTypeStyleFeatureType,
      'elementType': 'geometry' as MapTypeStyleElementType,
      'stylers': [
        {
          'visibility': 'on'
        },
        {
          'color': '#386c28'
        }
      ]
    },
    {
      'featureType': 'poi' as MapTypeStyleFeatureType,
      'elementType': 'geometry.fill' as MapTypeStyleElementType,
      'stylers': [
        {
          'visibility': 'on'
        },
        {
          'color': '#788c40'
        }
      ]
    },
    {
      'featureType': 'poi.attraction' as MapTypeStyleFeatureType,
      'elementType': 'geometry.fill' as MapTypeStyleElementType,
      'stylers': [
        {
          'color': '#989898'
        },
        {
          'visibility': 'on'
        }
      ]
    },
    {
      'featureType': 'poi.business' as MapTypeStyleFeatureType,
      'elementType': 'geometry.fill' as MapTypeStyleElementType,
      'stylers': [
        {
          'color': '#989898'
        },
        {
          'visibility': 'on'
        }
      ]
    },
    {
      'featureType': 'poi.government' as MapTypeStyleFeatureType,
      'elementType': 'geometry.fill' as MapTypeStyleElementType,
      'stylers': [
        {
          'color': '#989898'
        },
        {
          'visibility': 'on'
        }
      ]
    },
    {
      'featureType': 'transit.station.airport' as MapTypeStyleFeatureType,
      'elementType': 'geometry.fill' as MapTypeStyleElementType,
      'stylers': [
        {
          'color': '#989898'
        },
        {
          'visibility': 'on'
        }
      ]
    },
    {
      'featureType': 'poi.medical' as MapTypeStyleFeatureType,
      'elementType': 'geometry' as MapTypeStyleElementType,
      'stylers': [
        {
          'color': '#989898'
        },
        {
          'visibility': 'on'
        }
      ]
    },
    {
      'featureType': 'poi.medical' as MapTypeStyleFeatureType,
      'elementType': 'labels' as MapTypeStyleElementType,
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'poi.park' as MapTypeStyleFeatureType,
      'elementType': 'geometry.fill' as MapTypeStyleElementType,
      'stylers': [
        {
          'color': '#788c40'
        },
        {
          'visibility': 'on'
        }
      ]
    },
    {
      'featureType': 'poi.place_of_worship' as MapTypeStyleFeatureType,
      'elementType': 'geometry' as MapTypeStyleElementType,
      'stylers': [
        {
          'invert_lightness': true
        },
        {
          'visibility': 'on'
        }
      ]
    },
    {
      'featureType': 'poi.school' as MapTypeStyleFeatureType,
      'elementType': 'geometry.fill' as MapTypeStyleElementType,
      'stylers': [
        {
          'color': '#989898'
        },
        {
          'visibility': 'on'
        }
      ]
    },
    {
      'featureType': 'poi.sports_complex' as MapTypeStyleFeatureType,
      'elementType': 'geometry' as MapTypeStyleElementType,
      'stylers': [
        {
          'color': '#989898'
        }
      ]
    },
    {
      'featureType': 'road.highway' as MapTypeStyleFeatureType,
      'elementType': 'geometry' as MapTypeStyleElementType,
      'stylers': [
        {
          'color': '#000000'
        }
      ]
    },
    {
      'featureType': 'road.highway' as MapTypeStyleFeatureType,
      'elementType': 'labels' as MapTypeStyleElementType,
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'road.arterial' as MapTypeStyleFeatureType,
      'elementType': 'geometry' as MapTypeStyleElementType,
      'stylers': [
        {
          'color': '#000000'
        }
      ]
    },
    {
      'featureType': 'road.local' as MapTypeStyleFeatureType,
      'elementType': 'geometry' as MapTypeStyleElementType,
      'stylers': [
        {
          'color': '#000000'
        }
      ]
    },
    {
      'featureType': 'road' as MapTypeStyleFeatureType,
      'elementType': 'labels' as MapTypeStyleElementType,
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'transit' as MapTypeStyleFeatureType,
      'elementType': 'geometry.fill' as MapTypeStyleElementType,
      'stylers': [
        {
          'weight': 0.01
        },
        {
          'saturation': -33
        },
        {
          'visibility': 'on'
        },
        {
          'hue': '#ff0000'
        }
      ]
    },
    {
      'featureType': 'transit' as MapTypeStyleFeatureType,
      'elementType': 'labels.icon' as MapTypeStyleElementType,
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'transit.line' as MapTypeStyleFeatureType,
      'elementType': 'geometry' as MapTypeStyleElementType,
      'stylers': [
        {
          'color': '#000000'
        },
        {
          'weight': 0.01
        }
      ]
    },
    {
      'featureType': 'transit.line' as MapTypeStyleFeatureType,
      'elementType': 'geometry.fill' as MapTypeStyleElementType,
      'stylers': [
        {
          'visibility': 'on'
        },
        {
          'color': '#ff0000'
        }
      ]
    },
    {
      'featureType': 'water' as MapTypeStyleFeatureType,
      'elementType': 'geometry.fill' as MapTypeStyleElementType,
      'stylers': [
        {
          'color': '#7088b0'
        }
      ]
    }
  ];
}
