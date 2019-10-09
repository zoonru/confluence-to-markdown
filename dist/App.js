var App;App=function(){class t{constructor(e,i,r,s,o,n,a,h){var l,p;this._fs=e,this._exec=i,this._path=r,this._mkdirp=s,this.utils=o,this.formatter=n,this.pageFactory=a,this.logger=h,l=t.outputTypesAdd.join("+")+(p=(p=t.outputTypesRemove.join("-"))?"-"+p:""),this.pandocOptions=[l?"-t "+l:"",t.extraOptions.join(" ")].join(" ")}convert(t,e){var i,r,s,o,n,a;for(r=this.utils.readDirRecursive(t),a=function(){var t,e,s;for(s=[],t=0,e=r.length;t<e;t++)(i=r[t]).endsWith(".html")&&s.push(this.pageFactory.create(i));return s}.call(this),s=[],o=0,n=a.length;o<n;o++)(i=>("index.html"===i.fileName&&s.push(this._path.join(i.space,"index")),this.convertPage(i,t,e,a)))(a[o]);return this.utils.isFile(t)||this.writeGlobalIndexFile(s,e),this.logger.info("Conversion done")}convertPage(t,e,i,r){var s,o;return this.logger.info("Parsing ... "+t.path),o=t.getTextToConvert(r),s=this._path.join(i,t.space,t.fileNameNew),this.logger.info("Making Markdown ... "+s),this.createFoldersStructure(i,t.space,t.pathToFolder),this.writeMarkdownFile(o,s),this.utils.copyAssets(this.utils.getDirname(t.path),this.utils.getDirname(s)),this.logger.info("Done\n")}writeMarkdownFile(t,e){var i,r,s,o;return r=this.utils.getDirname(e),this._mkdirp.sync(r,(function(t){if(t)return this.logger.error("Unable to create directory #{fullOutDirName}")})),o=e+"~",this._fs.writeFileSync(o,t,{flag:"w"}),i="pandoc -f html "+this.pandocOptions+" -o "+e+" "+o,(s=this._exec(i,{cwd:r})).status>0&&this.logger.error(s.stderr),this._fs.unlinkSync(o)}createFoldersStructure(t,e,i){var r,s,o,n,a,h;if(i){for(o in n=this._path.join(t,e),this._fs.existsSync(n)||this._fs.mkdirSync(n),h=[],s=i.split("/").filter((function(t){return Boolean(t)})))r=s[o],a=(a=s[o-1])?a+"/":"",i=this._path.join(n,a+r),this._fs.existsSync(i)?h.push(void 0):h.push(this._fs.mkdirSync(i));return h}}writeGlobalIndexFile(t,e){var i,r,s;return r=this._path.join(e,"index.md"),i=this.formatter.createListFromArray(t),s=this.formatter.getHtml(i),this.writeMarkdownFile(s,r)}}return t.outputTypesAdd=["gfm","blank_before_header"],t.outputTypesRemove=[],t.extraOptions=["--atx-headers"],t}.call(this),module.exports=App;