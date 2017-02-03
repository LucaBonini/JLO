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
            "pattern": "^(https?://).+",
            "description": "Uri della risorsa"
          },
          "label": {
            "type": "string",
            "pattern": ".+",
            "uniqueitem": true,
            "description" : "label visualizzata nel grafico"
         },
          "size": {
            "type": "integer",
            "minimum": 0,
            "exclusiveminumun": "true",
            "uniqueitem": true,
            "description" : "da questo valore dipende la size del nodo nel grafico"
          },
          "popup_mo": {
            "type": "string",
            "enum": ["resource", "label", "comment"],
            "uniqueitem": true,
            "description" : "stringa che viene mostrata nel tip:puo essere l'Uri, la label o un commento dell'utente"
          },
          "mouseover": {
            "type": "string",
            "enum": ["border", "fill"],
            "uniqueitem": true,
            "description" : "azione che viene eseguita per il mouseover:cambio di colore o raddoppio del bordo del nodo"
          },
          "color_mo": {
            "type": "string",
            "description": "uno dei colori definiti per css2",
            "$ref":"#/definitions/colors",
            "uniqueitem": true,
            "description": "colore del nodo in risposta al mouseover, se impostato"
          },
          "cssclass": {
            "type": "string",
            "pattern": ".*",
            "uniqueitem": true,
            "description":"nome della classe di appartenenza del nodo"
          },
          "comment": {
            "type": "string",
            "pattern": ".*",
            "uniqueitem": true,
            "description": "commento mostrato nel tip, se impostato"
          },

          "shape": {
            "type": "string",
            "enum": ["circle", "rect", "ellipse", "polygon"],
            "uniqueitem": true,
            "description" : "tipo di nodo:rettangolo,cerchio,ellisse,esagono"
          },
          "sstyle": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "fill": {
                  "type": "string",
                  "$ref":"#/definitions/colors",
                  "uniqueitem": true,
                  "description":"colore del nodo se non è impostata una classe"
                },
                "stroke": {
                  "type": "string",
                  "$ref":"#/definitions/colors",
                  "uniqueitem": true,
                  "description": "colore del bordo nodo"
                },
                "stroke_width": {
                  "type": "integer",
                  "minimum": 0,
                  "uniqueitem": true,
                  "description":"spessore del bordo nodo"

                },
                "stroke_dasharray": {
                  "type": "integer",
                  "minimum": 0,
                  "uniqueitem": true,
                  "description":"bordo tratteggiato"
                },
                "text_color":{
                "type":"string",
                "$ref":"#/definitions/colors",
                "uniqueitem": true,
                "description":"colore del testo all'interno del nodo"

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
      },
      "uniqueitem": true
    },
    "css_classes": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "classname": {
            "type": "string",
            "pattern": ".+",
            "description": "nome della classe"
          },
          "fill": {
            "type": "string",
            "$ref":"#/definitions/colors",
            "uniqueitem": true,
            "description":"colore del nodo per la classe"
          },
          "stroke": {
            "type": "string",
            "$ref":"#/definitions/colors",
            "uniqueitem": true,
            "description": "colore del bordo nodo per la classe"
          },
          "stroke_width": {
            "type": "integer",
            "minimum": 0,
            "uniqueitem": true,
            "description":"spessore del bordo nodo per la classe"
          },
          "stroke_dasharray": {
            "type": "integer",
            "minimum": 0,
            "uniqueitem": true,
            "description" :"bordo tratteggiato per la classe, 0 significa non tratteggiato"
          }
          
        },
        "required": [
          "classname"
          
        ]
      },
      "uniqueitem": true
    },
    "links": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "source": {
            "type": "string",
            "description": "un id tra i nodi"
          },
          "target": {
            "type": "string",
            "description": "un id tra i nodi"
          },
          "sstyle":{
            "type":"array",
            "items":{
            "properties":{
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
                "type": "integer",
                "minimum": 0,
                "description" :"link tratteggiato. 0 significa non tratteggiato"
              },
              "stroke_width": {
                "type": "integer",
                "minimum": 0,
                "desciption" :"spessore del link"
              }
            }

            }
          },
          "label": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "string",
                  "pattern": ".*:?.+",
                  "description": "verbo del vocabolario"
                },
                "label": {
                  "type": "string",
                  "pattern": ".+",
                  "description" : "label mostrata sul link"
                },
                "fill": {
                  "type": "string",
                  "$ref":"#/definitions/colors",
                  "description": "colore etichetta sul link"
                },
                "stroke": {
                  "type": "string",
                  "$ref":"#/definitions/colors",
                  "description": "colore bordo etichetta"
                },
                "stroke_dasharray": {
                  "type": "integer",
                  "minimum": 0,
                  "description": "bordo etichetta tratteggiato, 0 significa non tratteggiato"
                }
              },
              "required": [
                "id",
                "fill",
                "stroke",
                "stroke_dasharray"
              ]
            }
          }
        },
        "anyOf":[{
          "required": [
          "source",
          "target",
          "cssclass",
          "label"
        ],
        "required": [
          "source",
          "target",
          "sstyle",
          "label"
        ]
        }]
      }
    }
  },
  "required": [
    "nodes",
    "css_classes",
    "links"
  ],
  "definitions":{
    "colors":{
        "type":"string",
         "pattern": "|aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgrey|darkgreen|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|gray|grey|green|greenyellow|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgrey|lightgreen|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen|^#(([a-z]|[0-9]){6})"
    }
  }
}
