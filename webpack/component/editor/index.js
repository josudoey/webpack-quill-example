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
    border: 3px solid #ccc;
    border-top-color: #1e986c;
    animation: upload-spinner 0.6s linear infinite;
  }
  @keyframes upload-spinner {
    to {
      transform: rotate(360deg);
    }
  }
`))

const Quill = require('quill')

const Image = Quill.import('formats/image')
Image.className = 'img-responsive'
Quill.register(Image, true)

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
  input.click()

  input.onchange = () => {
    const file = input.files[0]
    const reader = new window.FileReader()
    reader.addEventListener('load', () => {
      console.log({
        type: file.type,
        size: file.size,
        fileName: file.name
      })
      const range = editor.getSelection()
      editor.insertEmbed(range.index, 'image', reader.result)
    }, false)
    reader.readAsDataURL(file)
  }
})
