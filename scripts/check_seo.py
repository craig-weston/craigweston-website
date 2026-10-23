#!/usr/bin/env python3
"""Dependency-free technical SEO and on-page media validation for GitHub CI."""
from html.parser import HTMLParser
from pathlib import Path
import json,re,sys,xml.etree.ElementTree as ET

ROOT=Path(__file__).resolve().parents[1]/'public'
PAGES=['index.html','design.html','matchpoint.html','books.html','ux-book.html','japan-books.html','about.html']
BASE='https://craigweston.co.uk/'
errors=[];titles=set();descs=set()
class Tags(HTMLParser):
 def __init__(self):super().__init__();self.metas=[];self.links=[];self.images=[];self.styles=[];self.scripts=[];self.h1=0;self.heading=False;self.title='';self.in_title=False;self.json_scripts=[];self.in_ld=False;self.ld_text=''
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='h1':self.h1+=1
  if tag=='title':self.in_title=True
  if tag=='meta':self.metas.append(a)
  if tag=='link':self.links.append(a)
  if tag=='img':self.images.append(a)
  if tag=='script':self.in_ld=a.get('type')=='application/ld+json';self.ld_text=''
 def handle_data(self,data):
  if self.in_title:self.title+=data
  if self.in_ld:self.ld_text+=data
 def handle_endtag(self,tag):
  if tag=='title':self.in_title=False
  if tag=='script' and self.in_ld:
   try:self.json_scripts.append(json.loads(self.ld_text))
   except Exception as exc:errors.append('Malformed JSON-LD: '+str(exc))
   self.in_ld=False
for page in PAGES:
 text=(ROOT/page).read_text(encoding='utf-8');p=Tags();p.feed(text)
 ms={a.get('name'):a.get('content') for a in p.metas if a.get('name')};props={a.get('property'):a.get('content') for a in p.metas if a.get('property')}; links={a.get('rel'):a.get('href') for a in p.links if a.get('rel')}
 expect=BASE if page=='index.html' else BASE+page
 if links.get('canonical')!=expect:errors.append(page+': canonical URL missing or mismatched')
 if not ms.get('description') or len(ms['description'])<95:errors.append(page+': missing/very short meta description')
 if not p.title or p.title in titles:errors.append(page+': missing/duplicate title')
 titles.add(p.title)
 if ms.get('description') in descs:errors.append(page+': duplicate meta description')
 descs.add(ms.get('description'))
 if p.h1 != 1:errors.append(page+': H1 count '+str(p.h1))
 if ms.get('robots','').startswith('noindex'):errors.append(page+': unexpectedly noindex')
 if not props.get('og:image') or not ms.get('twitter:image'):errors.append(page+': missing social image metadata')
 if not p.json_scripts:errors.append(page+': no structured data')
 if not any(x.get('href')==('matchpoint.min.css' if page=='matchpoint.html' else 'site.min.css') for x in p.links):errors.append(page+': missing optimized CSS')
 for i,im in enumerate(p.images):
  if im.get('alt') is None:errors.append(f'{page}: image {i} missing alt text')
  if not im.get('width') or not im.get('height'):errors.append(f'{page}: image {i} missing intrinsic dimensions')
  if im.get('src','').startswith('assets/') and not (ROOT/im['src']).exists():errors.append(f'{page}: missing image {im["src"]}')
  if im.get('srcset'):
   for part in im['srcset'].split(','):
    path=part.strip().split(' ')[0]
    if not (ROOT/path).exists():errors.append(f'{page}: missing responsive asset {path}')
 if 'lorem ipsum' in text.lower() or '<!-- TODO' in text or '{{PLACEHOLDER}}' in text:errors.append(page+': placeholder copy found')
try:
 sitemap=ET.parse(ROOT/'sitemap.xml');urls={node.text for node in sitemap.iter() if node.tag.endswith('loc')}
 for page in PAGES:
  if (BASE if page=='index.html' else BASE+page) not in urls:errors.append('sitemap missing '+page)
except Exception as exc:errors.append('invalid sitemap: '+str(exc))
print('SEO validation: '+str(len(PAGES))+' pages, '+str(len(titles))+' unique titles, '+str(len(descs))+' unique descriptions, sitemap and JSON-LD checked')
if errors:
 for e in errors:print('ERROR:',e)
 sys.exit(1)
print('PASS: technical SEO checks')
