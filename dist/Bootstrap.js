var Bootstrap;Bootstrap=function(){var e,r,i,o,n,t,u,s,a,q,c;return s=require("fs"),u=require("sync-exec"),c=require("path"),q=require("ncp"),t=require("cheerio"),a=require("mkdirp"),n=require("./Utils"),i=require("./Logger"),r=require("./Formatter"),e=require("./App"),o=require("./PageFactory"),class{run(p,l=""){var v,g,w,f,d;return p=c.resolve(p),l=c.resolve(l),w=new i(i.INFO),d=new n(s,c,q,w),g=new r(t,d,w),f=new o(g,d),v=new e(s,u,c,a,d,g,f,w),w.info("Using source: "+p),w.info("Using destination: "+l),v.convert(p,l)}}}.call(this),module.exports=Bootstrap;