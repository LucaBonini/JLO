# JLO
Json Layout for querying Ontologies (demo)

JLO is a way to graphically rapresent the result of a query to a sparql endpoint. This is a demo version where you can try 3 examples 

here's the json schema for validation:

{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "nodes": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "pattern": "^(https?://).+"
          },
          "label": {
            "type": "string",
            "pattern": ".+",
            "uniqueItem": true
         },
          "size": {
            "type": "integer",
            "minimum": 0,
            "exclusiveMinumun": true,
            "uniqueItem": true
          },
          "popup_mo": {
            "type": "string",
            "enum": ["resource", "label", "comment"],
            "uniqueItem": true
          },
          "mouseover": {
            "type": "string",
            "enum": ["border", "fill"],
            "uniqueItem": true
          },
          "color_mo": {
            "type": "string",
            "description": "uno dei colori definiti per CSS2",
            "$ref":"#/definitions/colors",
            "uniqueItem": true
          },
          "cssclass": {
            "type": "string",
            "pattern": ".*",
            "uniqueItem": true
          },
          "comment": {
            "type": "string",
            "pattern": ".*",
            "uniqueItem": true
          },

          "shape": {
            "type": "string",
            "pattern":"circle|polygon|ellipse|rect|image|.+"
            "uniqueItem": true
          },






          "sstyle": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "fill": {
                  "type": "string",
                  "$ref":"#/definitions/colors",
                  "uniqueItem": true
                },
                "stroke": {
                  "type": "string",
                  "$ref":"#/definitions/colors",
                  "uniqueItem": true
                },
                "stroke_width": {
                  "type": "integer",
                  "minimum": 0,
                  "uniqueItem": true

                },
                "stroke_dasharray": {
                  "type": "integer",
                  "minimum": 0,
                  "uniqueItem": true
                },
                "text_color":{
                "type":"string",
                "$ref":"#/definitions/colors",
                "uniqueItem": true

                }
              },
              "required": [
                "fill",
                "stroke",
                "stroke_width",
                "stroke_dasharray"
              ]
            }
          }
        },
        "anyOf":[{
          "required": [
            "id",
            "label",
            "size",
            "cssclass",
            "shape",
            "popup_mo",
            "mouseover",
            "color_mo"

          ]
        },
        {
        "required": [
          "id",
          "label",
          "size",
          "sstyle",
          "shape",
          "popup_mo",
          "mouseover",
          "color_mo"

        ]
        },
        {
        "required": [
          "id",
          "label",
          "size",
          "cssclass",
          "sstyle",
          "shape",
          "popup_mo",
          "mouseover",
          "color_mo"

        ]
        }
        ]

      },
      "uniqueItem": true
    },

    "templates":{
    	"type": "array",
    	"items":{
    		"type":"object",
    		"properties":{
    			"name":{
    				"type":"string",
    				"pattern":".+"
    			},
    			"shape":{
    				"type":"string",
    				"enum": ["circle", "rect", "ellipse", "polygon","image"],
    				"uniqueItem": true
    			},
    			"fill":{
    				"type":"string",
    				"$ref":"#/definitions/colors",
                    "uniqueItem": true
    			},
    			"stroke":{
    				"type":"string",
    				"$ref":"#/definitions/colors",
                  	"uniqueItem": true
    			},
    			"size":{
    				"type":"integer",
    				"minimum": 0,
            		"exclusiveMinumun": true,
            		"uniqueItem": true
    			},
    			"stroke_width":{
    				"type":"integer",
    				"minimum": 0,
            		"uniqueItem": true
    			},
    			"stroke_dasharray":{
    				"type":"integer",
    				"minimum": 0,
            		"uniqueItem": true
    			}
    		}
    	}
    }
    "css_classes": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "classname": {
            "type": "string"
          },
          "fill": {
            "type": "string",
            "$ref":"#/definitions/colors",
            "uniqueItem": true
          },
          "stroke": {
            "type": "string",
            "$ref":"#/definitions/colors",
            "uniqueItem": true
          },
          "stroke_width": {
            "type": "integer",
            "minimum": 0,
            "uniqueItem": true
          },
          "stroke_dasharray": {
            "type": "integer",
            "minimum": 0,
            "uniqueItem": true

          }
          
        },
        "anyOf":[{
          "required": [
            "classname",
            "fill"
           
          ]
        },
        {
          "required": [
            "classname",
            "stroke_width"
           
          ]
        }
        ]
      },
      "uniqueItem": true
    },
    "links": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "source": {
            "type": "string",
            "pattern": "https?.+",
            "description": "un id tra i nodi"
          },
          "target": {
            "type": "string",
            "pattern": "https?.+",
            "description": "un id tra i nodi"
          },
          "sstyle":{
            "type":"array",
            "items":{
              "direction": {
              "type": "string",
              "pattern": "forward|back|both",
              "description": "direzione della freccia. both non è ancora implementato"
            },
            "fill": {
              "type": "string",
              "$ref":"#/definitions/colors",
              "description" :"colore della link che collega due o piu nodi"
            },
            "stroke_dasharray": {
              "type": "string",
              "minimum": 0,
              "description" :"link tratteggiato. 0 significa non tratteggiato"
            },
            "stroke_width": {
              "type": "string",
              "minimum": 0,
              "desciption" :"spessore del link"
            }

            }
          },
          "cssclass":{
            "type":"string",
            "description":"classe css per i link",
            "pattern":".*"

          },
          "label": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "string",
                  "pattern": ".+:.+"
                },
                "label": {
                  "type": "string",
                  "pattern": ".+"
                },
                "fill": {
                  "type": "string",
                  "$ref":"#/definitions/colors"
                },
                "stroke": {
                  "type": "string",
                  "$ref":"#/definitions/colors"
                },
                "stroke_dasharray": {
                  "type": "integer",
                  "minimum": 0
                }
              },
              "required": [
                "id",
                "fill",
                "stroke",
                "stroke_dasharray"
              ]
            
          
        },
        "anyOf":[{
          "required": [
            "source",
            "target",
            "sstyle",
            "label"
          ],
           "required": [
            "source",
            "target",
            "cssclass",
            "label"
          ]
        }]
       
      
    }
  },
  "anyOf":[{
    "required": [
      "nodes",
      "links",
      "templates"
    ]
  },
  {
    "required": [
      "nodes",
      "css_classes",
      "templates",
      "links"
    ]
  }
  ],
  "definitions":{
    "colors":{
        "type":"string",
         "pattern": "/AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGray|DarkGrey|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGray|DarkSlateGrey|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGray|DimGrey|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|Gray|Grey|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGray|LightGrey|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGray|LightSlateGrey|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|RebeccaPurple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGray|SlateGrey|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen/i"
    }
  }
}
