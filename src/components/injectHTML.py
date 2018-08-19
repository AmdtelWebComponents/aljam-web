import os
import sys
import re

def hello(a):
    os.system('cp aljam-'+a+'.js aljam-'+a+'.bak.js')
    
    with open('aljam-'+a+'.js', 'r') as file1:
        text1 = file1.read()
        p = re.compile(r'([\s\S]*return html \`\n)([\s\S]*)(^\`;\n[\s\S]*)', re.MULTILINE)
        originaltxt = p.search(text1)
    
    with open('aljam-'+a+'.js.html', 'r') as source:
        replacetxt = source.read()
    
    if originaltxt.group(1) and replacetxt and originaltxt.group(3):
        with open('aljam-'+a+'.js', 'w') as dest:
            dest.write(originaltxt.group(1)+replacetxt+originaltxt.group(3))

if __name__== "__main__":
    hello(str(sys.argv[1]))