require('quill/dist/quill.bubble.css')

const styleElement = document.createElement('style')
styleElement.type = 'text/css'
document.getElementsByTagName('head')[0].appendChild(styleElement)

styleElement.appendChild(document.createTextNode(`
  .upload-placeholder {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #3498db;
    animation: spinner 1s linear infinite;
  }
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
`))

const Quill = require('quill')

const ImageBlot = Quill.import('formats/image')
class ImageUpload extends ImageBlot {
  static create (value) {
    const node = super.create(value)
    if (typeof value === 'string') {
      node.setAttribute('src', this.sanitize(value))
    }

    node.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=')
    const { file, dataURL } = value

    console.log({
      type: file.type,
      size: file.size,
      fileName: file.name
    })

    node.classList.add('upload-placeholder')

    const imgSrc = dataURL
    setTimeout(function () {
      node.setAttribute('src', imgSrc)
      node.classList.remove('upload-placeholder')
    }, 3000)
    return node
  }
}

ImageUpload.blotName = 'image-upload'

Quill.register(ImageUpload, true)

const editor = new Quill('#editor', {
  theme: 'bubble', // Specify theme in configuration
  placeholder: 'this is a demo',
  modules: {
    toolbar: {
      // ref https://quilljs.com/docs/formats/
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ align: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        // [
        //   { font: [] },
        //   { size: [] }
        // ],
        ['blockquote', 'code-block'],
        ['image', 'video'],
        ['clean'] // remove formatting button
      ],
      handlers: {}
    }
  }
})

editor.getModule('toolbar').addHandler('image', () => {
  const input = document.createElement('input')
  input.setAttribute('type', 'file')
  input.setAttribute('accept', 'image/*')
  input.onchange = () => {
    const file = input.files[0]
    const reader = new window.FileReader()
    reader.addEventListener('load', () => {
      const range = editor.getSelection()
      editor.insertEmbed(range.index, 'image-upload', {
        file: file,
        dataURL: reader.result
      })
    }, false)
    reader.readAsDataURL(file)
  }
  input.click()
})
