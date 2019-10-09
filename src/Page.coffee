class Page


  constructor: (fullPath, @formatter, @utils) ->
    @path = fullPath
    @init()


  init: () ->
    @fileName = @utils.getBasename @path
    @fileBaseName = @utils.getBasename @path, '.html'
    @filePlainText = @utils.readFile @path
    @$ = @formatter.load @filePlainText
    @content = @$.root()
    @heading = @getHeading()
    @fileNameNew = @getFileNameNew()
    @space = @utils.getBasename @utils.getDirname @path
    @spacePath = @getSpacePath()


  getSpacePath: () ->
    '../' + @utils.sanitizeFilename(@space) + '/' + @fileNameNew


  getFileNameNew: () ->
    return 'index.md' if @fileName == 'index.html'

    # --- look parent on navigations
    fileName = @utils.sanitizeFilename(@heading) + '.md'
    breadcrumbs = @content.find('#breadcrumbs')
    lies = breadcrumbs.find('li:not(.first)')
    return fileName if !lies.length

    # --- create folders structure path
    @pathToFolder = Array.from(lies).reduce((currentPath, li) ->
      pathToFolder = breadcrumbs.find(li).text().trim()
      # --- replace all non char for pandoc to underscore
      pathToFolder = pathToFolder.replace(/[^A-Za-zА-Яа-я0-9]/g, '_')
      return currentPath + pathToFolder + '/'
    '')
    return @pathToFolder + fileName


  getHeading: () ->
    title = @content.find('title').text()
    if @fileName == 'index.html'
      title
    else
      indexName = @content.find('#breadcrumbs .first').text().trim()
      title.replace indexName + ' : ', ''


  ###*
  # Converts HTML file at given path to MD formatted text.
  # @return {string} Content of a file parsed to MD
  ###
  getTextToConvert: (pages) ->
    content = @formatter.getRightContentByFileName @content, @fileName
    content = @formatter.fixHeadline content
    content = @formatter.fixIcon content
    content = @formatter.fixEmptyLink content
    content = @formatter.fixEmptyHeading content
    content = @formatter.fixPreformattedText content
    content = @formatter.fixImageWithinSpan content
    content = @formatter.removeArbitraryElements content
    content = @formatter.fixArbitraryClasses content
    content = @formatter.fixAttachmentWraper content
    content = @formatter.fixPageLog content
    content = @formatter.fixLocalLinks content, @space, pages
    content = @formatter.addPageHeading content, @heading
    @formatter.getHtml content


module.exports = Page
