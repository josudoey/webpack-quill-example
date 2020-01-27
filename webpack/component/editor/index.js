require('quill/dist/quill.bubble.css')
const Quill = require('quill')

const editor = new Quill('#editor', {
  theme: 'bubble', // Specify theme in configuration
  placeholder: 'this is a demo',
  modules: {
    toolbar: [
      // ref https://quilljs.com/docs/formats/
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ['image', 'video'],
      ['clean'] // remove formatting button
    ]
  }
})
