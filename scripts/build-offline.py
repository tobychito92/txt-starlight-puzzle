from pathlib import Path
import base64,json,re
root=Path(__file__).resolve().parents[1]/'dist'
html=(root/'index.html').read_text()
assets={p.stem:'data:image/webp;base64,'+base64.b64encode(p.read_bytes()).decode() for p in (root/'assets').glob('*.webp')}
html=html.replace('<link rel="stylesheet" href="style.css">','<style>'+(root/'style.css').read_text()+'</style>')
for n,data in assets.items():html=html.replace('src="assets/'+n+'.webp"','src="'+data+'"')
app=(root/'app.js').read_text().replace("cardPhoto=id=>'assets/'+Collection.cards[id].file", "cardPhoto=id=>PHOTO_DATA[Collection.cards[id].file.replace('.webp','')]")
html=re.sub(r'<script src="(?:engine|levels|gameplay|collection|app)\.js"></script>','',html)
scripts='const PHOTO_DATA='+json.dumps(assets)+';\n'+(root/'engine.js').read_text()+'\n'+(root/'levels.js').read_text()+'\n'+(root/'gameplay.js').read_text()+'\n'+(root/'collection.js').read_text()+'\n'+app
html=html.replace('</body>','<script>'+scripts+'</script></body>')
out=root/'TXT_Starlight_Offline.html';out.write_text(html)
assert 'src="assets/' not in html
assert 'cardPhoto=id=>PHOTO_DATA' in html
print('Offline HTML:',out.stat().st_size,'bytes; all images and code embedded')
