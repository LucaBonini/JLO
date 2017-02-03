from SPARQLWrapper import SPARQLWrapper, JSON, XML
import json

sparql = SPARQLWrapper("http://dbpedia.org/sparql")
sparql.setQuery("""
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX dbo:    <http://dbpedia.org/ontology/>
    SELECT DISTINCT ?sogg ?s ?p ?o ?oo WHERE{
                      {?sogg a dbo:Band;
                                                  rdfs:label ?s;
                                                  rdfs:label "The Beatles"@en;
                                                  ?pred ?oo.
                                             ?pred rdfs:label ?p;
                                                rdfs:label "former band member"@en.
                                             ?oo rdfs:label ?o.
                      FILTER (lang(?s) = 'en')
                      FILTER (lang(?p) = 'en')
                      FILTER (lang(?o) = 'en')}UNION


      {
                      ?sogg a dbo:Band;
                            rdfs:label ?s;
                            rdfs:label "Paul McCartney and Wings"@en;
                            ?pred ?oo.
                       ?pred rdfs:label ?p;
                          rdfs:label "former band member"@en.
                       ?oo rdfs:label ?o.
FILTER (lang(?s) = 'en')
FILTER (lang(?p) = 'en')
FILTER (lang(?o) = 'en')
}
UNION


      {
                      ?sogg a dbo:Band;
                            rdfs:label ?s;
                            rdfs:label "Nirvana (band)"@en;
                            ?pred ?oo.
                       ?pred rdfs:label ?p;
                          rdfs:label "band member"@en.
                       ?oo rdfs:label ?o.
FILTER (lang(?s) = 'en')
FILTER (lang(?p) = 'en')
FILTER (lang(?o) = 'en')
}
UNION


      {
                      ?sogg a dbo:Band;
                            rdfs:label ?s;
                            rdfs:label "Foo Fighters"@en;
                            ?pred ?oo.
                       ?pred rdfs:label ?p;
                          rdfs:label "band member"@en.
                       ?oo rdfs:label ?o.
FILTER (lang(?s) = 'en')
FILTER (lang(?p) = 'en')
FILTER (lang(?o) = 'en')
}
                     

                          } limit 1000
""")
sparql.setReturnFormat(JSON)
results = sparql.query().convert()
#results=json.dumps(results,indent=4,sort_keys=True)
#f.write(results)
f=open('bandmember.json','w')
lenght=(len(results["results"]["bindings"]))
f.write('{\n')
########Links################
f.write('"links":[\n')
i=0
for result in results["results"]["bindings"]:
  i=i+1
  result['oo']['value']=result['oo']['value'].replace('"','_')
  if i!=(lenght):
    f.write('{"source": "'+result['oo']['value']+'" ,'+'"target": "'+result['sogg']['value']+'", '+'"cssclass": "","sstyle":[\n\t{"fill":"yellow","stroke_dasharray":0,"stroke_width":4,"direction":"forward"}],"label":[\n\t\t{"id":"'+result['p']['value']+'","fill":"blue","stroke":"black","stroke_dasharray":0}]\n},\n')
  else:
    f.write('{"source": "'+result['oo']['value']+'" ,'+'"target": "'+result['sogg']['value']+'", '+'"cssclass": "","sstyle":[\n\t{"fill":"yellow","stroke_dasharray":0,"stroke_width":4,"direction":"forward"}],"label":\n[\t\t{"id":"'+result['p']['value']+'","fill":"blue","stroke":"black","stroke_dasharray":0}\n]\n}')
f.write('],\n')

    
  



##########Nodes#################

    
f.write('"nodes": [\n')

subj=[]
subj.append(results["results"]["bindings"][0]["s"]['value'])
f.write('{"id": "'+results["results"]["bindings"][0]["sogg"]['value']+'" ,'+'"label": "'+results["results"]["bindings"][0]["s"]['value']+'", "size": 21,"popup_mo":"resource","mouseover":"fill","color_mo":"aquamarine","cssclass":"","shape":"circle","sstyle":[\n\t{"fill":"gold","stroke":"black","stroke_width":2,"stroke_dasharray":0,"text_color":"black"}\n]\n},\n')


for result in results["results"]["bindings"]:
  bool=False
  for x in subj:
    if result['s']['value'] != x:
      bool=True
    else:
      bool=False
      break
  if bool==True:
    f.write('{"id": "'+result['sogg']['value']+'" ,'+'"label": "'+result['s']['value']+'", "size": 21,"popup_mo":"resource","mouseover":"fill","color_mo":"aquamarine","cssclass":"","shape":"circle","sstyle":[\n\t{"fill":"gold","stroke":"black","stroke_width":2,"stroke_dasharray":0,"text_color":"black"}\n]\n},\n')
    subj.append(result['s']['value'])

    
nodes=[]
nodes.append(results["results"]["bindings"][0]["o"]['value'])
f.write('{ "id": "'+results["results"]["bindings"][0]["oo"]['value']+'" ,'+'"label": "'+results["results"]["bindings"][0]["o"]['value']+'", "size": 21,"popup_mo":"resource","mouseover":"fill","color_mo":"aquamarine","cssclass":"subject","shape":"circle","sstyle":[\n\t{"fill":"gold","stroke":"black","stroke_width":2,"stroke_dasharray":0,"text_color":"black"}\n]\n}')

i=0
for result in results["results"]["bindings"]:
  
  bool=False
  for x in nodes:
    if result['o']['value'] != x:
      bool=True
    else:
      bool=False
      break
  i=i+1
  if bool==True:
    nodes.append(result['o']['value'])
    result['o']['value']=result['o']['value'].replace(' ','_')
    result['o']['value']=result['o']['value'].replace('"','')
    result['o']['value']=result['o']['value'].replace('"','')
    if (i>1):
      f.write(',\n')
      f.write('{"id": "'+result['oo']['value']+'" ,'+'"label": "'+result['o']['value']+'", "size": 21,"popup_mo":"resource","mouseover":"fill","color_mo":"aquamarine","cssclass":"subject","shape":"circle","sstyle":[\n\t{"fill":"gold","stroke":"black","stroke_width":2,"stroke_dasharray":0,"text_color":"black"}\n]\n}')
    else:
      f.write('{"id": "'+result['oo']['value']+'" ,'+'"label": "'+result['o']['value']+'", "size": 21,"popup_mo":"resource","mouseover":"fill","color_mo":"aquamarine","cssclass":"subject","shape":"circle","sstyle":[\n\t{"fill":"gold","stroke":"black","stroke_width":2,"stroke_dasharray":0,"text_color":"black"}\n]\n}')



f.write('\n],\n')
f.write('"css_classes":[\n{"classname":"subject","fill":"pink","stroke":"black","stroke_width":5,"stroke_dasharray":1},{"classname":"subject:hover","fill":"red"},{"classname":"object","fill":"Orange","stroke":"black","stroke_width":1,"stroke_dasharray":0},{"classname":"object:hover","stroke_width":4}]')
f.write('}')
f.close()


  

#sparql.setReturnFormat(XML)
#results = sparql.query().convert()
#f.write (results.toxml())