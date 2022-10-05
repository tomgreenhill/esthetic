import { readFile } from 'fs/promises';
import { join, relative } from 'path';
import { plain, highlight } from 'cli-highlight';
import t from 'chalk';

var H=Object.defineProperty;var B=(e,i)=>{for(var n in i)H(e,n,{get:i[n],enumerable:!0});};var R={};B(R,{dev:()=>P,forRule:()=>U,forSample:()=>G,getSample:()=>J});var N={keyword:t.cyanBright,built_in:t.cyanBright,type:t.cyan.dim,literal:t.hex("#ef3b7d"),number:t.green,regexp:t.red,string:t.yellowBright,subst:t.white,symbol:t.white,class:t.white,function:t.cyanBright,title:t.white,params:t.white,comment:t.gray,doctag:t.green,meta:t.white,"meta-keyword":t.white,"meta-string":t.white,section:t.white,tag:t.hex("#BECAFF"),name:e=>/(end)?comment/.test(e)?t.gray(e):t.hex("#FF93BC")(e),"builtin-name":t.white,attr:t.hex("#91EBC2"),attribute:t.white,variable:t.white,bullet:t.white,code:t.white,emphasis:t.italic,strong:t.bold,formula:t.white,link:t.underline,quote:t.white,"selector-tag":t.white,"selector-id":t.white,"selector-class":t.white,"selector-attr":t.white,"selector-pseudo":t.white,"template-tag":t.white,"template-variable":t.white,addition:t.green,deletion:t.red,default:plain};function m(e){return e.replace(/(\x9B|\x1B\[)[0-?]*[ -\\/]*[@-~]/g,"")}function A(e){return t.gray(m(e))}function F(e){return /{[{%]-?|-?[%}]}/.test(e)?e:t.yellowBright(m(e))}function D(e){return m(e).replace(/-?\s*[a-zA-Z._]+/g,z).replace(/[|,.:]/g,i=>t.hex("#e75378")(m(i))).replace(/(?:=|[!=]=|[<>]=?|(?:and|or|contains|with|in|null)\b)/g,_).replace(/["'][\s\S]*?["']/g,F)}function W(e){return /\./.test(e)?e.replace(/[a-zA-Z_.]*\.?/g,i=>t.white(i)):/break|continue|else/.test(e)?t.hex("#ef3b7d")(e):t.white(e)}function L(e){return m(e).replace(/[a-zA-Z_]+\b[:]?/g,q).replace(/[|,.:]/g,i=>t.hex("#e75378")(m(i))).replace(/["'][\s\S]*?["']/g,F)}function _(e){return /null|false|nil|true/.test(e)?t.hex("#FF91E3")(e):t.hex("#cb3f6e")(m(e))}function q(e){return /:$/.test(e)?t.hex("#7ef0ff")(e):/\./.test(e)?W(e):t.white(e)}function z(e){return /comment|endcomment/.test(e)?t.gray(m(e)):t.hex("#ef3b7d")(e)}function d(e,i={}){Object.assign(i,{theme:N,language:"html"});let n=highlight(e,i);return i.language!=="html"?n:n.replace(/(?<={%-?)[\s\S]*?(?=-?%})/g,D).replace(/(?<={{)[\s\S]*?(?=}})/g,L).replace(/{{-|{%-|{{|{%|}}|%}|-}}|-%}/g,A)}var S=(e,i)=>{let n=function(l){return [e,"```js",JSON.stringify(l,null,2),"```"].join(`
`)};return i?n.description=[e,"```js",JSON.stringify(i,null,2),"```"].join(`
`):n.description=e,n},J=async e=>{let[i,n,o]=e.split("/"),l=join(process.cwd(),"tests",i,"samples",n,o.endsWith(".txt")?o:o+".txt"),c=await readFile(l);if(!c)throw new Error("Sample file could not be located in: "+l);return c.toString()},P=e=>async(i,n)=>{let o=typeof i=="string"?join(process.cwd(),"tests",i):join(process.cwd(),"tests","dev.txt"),l=await readFile(o);if(!l)throw new Error("Sample file could not be located in: "+o);let c=relative(process.cwd(),o),p=l.toString(),a=t.magenta.bold("-".repeat(50));e.log(t.blueBright(c));let r=NaN;if(typeof n=="function"){let s=await n(p,d);if(typeof s=="object"&&isNaN(r)){for(r=s.repeat;r>0;)Object.assign(s,await n(s.source,d)),s.logger?(e.log(a),e.log(t.magenta(`Repeat ${s.repeat-r+1} ${t.gray("of")} ${s.repeat}`)),e.log(a),e.log(s.source)):e.log(t.magenta(`Repeat ${s.repeat-r+1} ${t.gray("of")} ${s.repeat}`)),r--;typeof s.finish=="function"&&s.finish();}e.pass();}else if(typeof i=="function"){let s=await i(p,d);if(typeof s=="object"&&isNaN(r)){for(r=s.repeat;r>0;)Object.assign(s,i(s.source,d)),s.logger?(e.log(a),e.log(t.magenta(`Repeat ${s.repeat-r+1} ${t.gray("of")} ${s.repeat}`)),e.log(a),e.log(s.source)):e.log(t.magenta(`Repeat ${s.repeat-r+1} ${t.gray("of")} ${s.repeat}`)),r--;typeof s.finish=="function"&&s.finish();}e.pass();}else throw TypeError("Missing callback type")},U=(e,i)=>async(n,o)=>{if(Array.isArray(n)){let[l,c,p]=e.split("/"),a=join(process.cwd(),"tests",l,"samples",c,p.endsWith(".txt")?p:p+".txt");for(let r=0;r<n.length;r++){let s=n[r],b=await readFile(a);if(!b)throw new Error("Sample file could not be located in: "+a);let g=b.toString();if(!g.trimStart().startsWith("---"))throw new Error("Missing description in sample file!");let f=g.indexOf("---",3);if(f<0)throw new Error("Missing closing description dashes, eg: ---");let O=`### Snapshot ${r+1}
`+g.slice(3,f).trim(),w=g.slice(f+3).trimStart();if(typeof s=="object"){let u=typeof i=="object"?{[i.lexer]:{...s}}:s;o.call({highlight(y,x){return d(y,x)}},w,u,S(O,u));}else o.call({highlight(u,y){return d(u,y)}},w,s,S(O));}}else {let l=Object.entries(n),[c,p]=e.split("/");for(let[a,r]of l){let s=join(process.cwd(),"tests",c,"samples",p,a.endsWith(".txt")?a:a+".txt"),b=await readFile(s);if(!b)throw new Error("Sample file could not be located in: "+s);let g=b.toString();if(!g.trimStart().startsWith("---"))throw new Error("Missing description in sample file!");let f=g.indexOf("---",3);if(f<0)throw new Error("Missing closing description dashes, eg: ---");let O=g.slice(f+3).trimStart();for(let w=0;w<r.length;w++){let u=r[w],y=`### Snapshot ${w+1}
`+g.slice(3,f).trim();if(typeof u=="object"){let x=typeof i=="object"?{[i.lexer]:{...u}}:u;o.call({highlight(v,T){return d(v,T)}},O,x,S(y,x));}else o.call({highlight(x,v){return d(x,v)}},O,u,S(y));}}}},G=e=>async(i,n)=>{let[o,l]=e.split("/");for(let c=0;c<i.length;c++){let p=i[c],a=join(process.cwd(),"tests",o,"samples",l,p.endsWith(".txt")?p:p+".txt"),r=await readFile(a);if(!r)throw new Error("Sample file could not be located in: "+a);let s=r.toString();if(!s.trimStart().startsWith("---"))throw new Error("Missing description in sample file!");let g=s.indexOf("---",3);if(g<0)throw new Error("Missing closing description dashes, eg: ---");let E=s.slice(g+3).trimStart(),f=`### Snapshot ${c+1}
`+s.slice(3,g).trim();n(E,S(f));}};

export { R as default };