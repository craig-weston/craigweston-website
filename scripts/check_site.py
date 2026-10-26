#!/usr/bin/env python3
"""Dependency-free pre-deploy smoke checks for Craig Weston static site."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import re, sys

ROOT=Path(__file__).resolve().parents[1]/'public'
PAGES=['index.html','design.html','matchpoint.html','books.html','ux-book.html','japan-books.html' ,'about.html','ux-audits.html']
errors=[]

class Links(HTMLParser):
    def __init__(self):
        super().__init__(); self.links=[]; self.titles=0; self.h1s=0
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if tag=='title': self.titles+=1
        if tag=='h1': self.h1s+=1
        for key in ('src','href'):
            if attrs.get(key): self.links.append((key,attrs[key]))

for name in PAGES:
    path=ROOT/name
    if not path.is_file():errors.append('Missing page: '+name);continue
    doc=path.read_text(encoding='utf-8')
    parser=Links();parser.feed(doc)
    if parser.titles != 1: errors.append(f'{name}: expected one title tag, found {parser.titles}')
    if parser.h1s != 1: errors.append(f'{name}: expected one H1, found {parser.h1s}')
    if 'review-toolbar' in doc: errors.append(f'{name}: development review toolbar left in production output')
    for _,url in parser.links:
        if url.startswith(('#','mailto:','tel:','https:','http:','javascript:','data:','//')):continue
        p=unquote(urlsplit(url).path)
        if not p:continue
        target=ROOT/p.lstrip('/') if p.startswith('/') else path.parent/p
        if not target.is_file() and not (target.is_dir() and (target/'index.html').is_file()): errors.append(f'{name}: broken link: {url}')

for filename in ['styles.css','nightfall.css','script.js','matchpoint-case.css','matchpoint-case.js','robots.txt','sitemap.xml','_headers','_redirects']:
    if not (ROOT/filename).is_file():errors.append('Missing file: '+filename)
for stylesheet in ROOT.glob('*.css'):
    doc=stylesheet.read_text(encoding='utf-8')
    for u in re.findall(r'url\(\s*[\"\']?([^\)\"\']+)',doc):
        if u.startswith(('data:','https:','http:','#','%23')):continue
        if not (ROOT/u).is_file():errors.append(f'{stylesheet.name}: missing url {u}')

print(f'Checked {len(PAGES)} pages and static assets.')
if errors:
    print('\n'.join('ERROR: '+err for err in errors));sys.exit(1)
print('PASS — ready for Cloudflare Pages static deployment')
