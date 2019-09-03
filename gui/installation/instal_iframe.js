const getGeneratedPageURL = ({ html, css, js }) => {
  const getBlobURL = (code, type) => {
    const blob = new Blob([code], { type })
    return URL.createObjectURL(blob)
  }

  const cssURL = getBlobURL(css,'https://storage.googleapis.com/idetect/install.css')
  const jsURL = getBlobURL(js, 'https://storage.googleapis.com/idetect/install.js')
//   const htmlURL=getBlobURL(html,'https://storage.googleapis.com/idetect/install.html')
  const source = `
    <html>
      <head>
        ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
        ${js && `<script src="${jsURL}"></script>`}
      </head>
      <body>
        ${html || ''}
      </body>
    </html>
  `

  return getBlobURL(source, 'https://storage.googleapis.com/idetect/install.html')
}

const url = getGeneratedPageURL({
  html: '<p>Hello, world!</p>',
  css: 'p { color: blue; }',
  js: 'console.log("hi")'
})

const iframe = document.querySelector('#iframe')
iframe.src = url