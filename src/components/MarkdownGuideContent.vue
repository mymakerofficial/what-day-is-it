<template>
  <div>
    <h4>Basics</h4>
    <table style="width:100%">
      <thead>
      <tr>
        <th>Element</th>
        <th>Markdown Syntax</th>
        <th>Output</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td><b><a href="https://www.markdownguide.org/basic-syntax/#headings">Heading</a></b></td>
        <td>
          # H1<br>
          ## H2<br>
          ### H3<br>
          #### H4<br>
          ##### H5<br>
          ###### H6<br>
        </td>
        <td>
          <h1 style="margin: 28px 0px">H1</h1>
          <h2 style="margin: 18px 0px">H2</h2>
          <h3 style="margin: 12px 0px">H3</h3>
          <h4 style="margin: 0px 0px">H4</h4>
          <h5 style="margin: 0px 0px">H5</h5>
          <h6 style="margin: 0px 0px">H6</h6>
        </td>
      </tr>
      <tr>
        <td><b><a href="https://www.markdownguide.org/basic-syntax/#bold">Bold</a></b></td>
        <td>**bold text**</td>
        <td><b>bold text</b></td>
      </tr>
      <tr>
        <td><b><a href="https://www.markdownguide.org/basic-syntax/#italic">Italic</a></b></td>
        <td>*italic text*</td>
        <td><i>italic text</i></td>
      </tr>
      <tr>
        <td><b><a href="https://www.markdownguide.org/extended-syntax/#strikethrough">Strikethrough</a></b></td>
        <td>~~this is wrong~~</td>
        <td><s>this is wrong</s></td>
      </tr>
      <tr>
        <td><b>Underline</b></td>
        <td>_important_</td>
        <td><u>important</u></td>
      </tr>
      <tr>
        <td>
          <b><a href="https://www.markdownguide.org/extended-syntax/#emoji">Emoji</a></b><br>
          Find emojis on <a href="https://emojipedia.org">emojipedia.org</a><br>
        </td>
        <td>:heart:</td>
        <td><img class="emoji" draggable="false" alt="❤️" src="https://twemoji.maxcdn.com/v/13.0.2/72x72/2764.png"></td>
      </tr>
      </tbody>
    </table>
    <h4>Media</h4>
    <table style="width:100%">
      <thead>
      <tr>
        <th>Element</th>
        <th>Markdown Syntax</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td><b><a href="https://www.markdownguide.org/basic-syntax/#links">Link</a></b></td>
        <td>[title](https://www.example.com)</td>
      </tr>
      <tr>
        <td><b><a href="https://www.markdownguide.org/basic-syntax/#images-1">Image</a></b></td>
        <td>![alt text](example.jpg)</td>
      </tr>
      <tr>
        <td><b>Video</b></td>
        <td>![alt text](example.mp4)</td>
      </tr>
      <tr>
        <td><b>Audio</b></td>
        <td>![alt text](example.mp3)</td>
      </tr>
      <tr>
        <td><b><a href="https://github.com/CenterForOpenScience/markdown-it-video#youtube">YouTube</a></b></td>
        <td>@[youtube](dQw4w9WgXcQ)</td>
      </tr>
      </tbody>
    </table>
    <h4>Code</h4>
    <table style="width:100%">
      <thead>
      <tr>
        <th>Element</th>
        <th>Markdown Syntax</th>
        <th>Output</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td><b><a href="https://www.markdownguide.org/basic-syntax/#code">Code</a></b></td>
        <td>`code`</td>
        <td><code>code</code></td>
      </tr>
      <tr>
        <td>
          <b><a href="https://www.markdownguide.org/extended-syntax/#fenced-code-blocks">Fenced Code Block</a></b><br>
          (supports syntax highlighting)
        </td>
        <td>
          ```json<br>
          {<br>
          "title": "Friday",<br>
          "text": "it do be friday",<br>
          "author": null,<br>
          }<br>
          ```<br>
        </td>
        <td>
<pre><code>
{
<span class="hljs-attr">"title"</span>: <span class="hljs-string">"Friday"</span>,
<span class="hljs-attr">"text"</span>: <span class="hljs-string">"it do be friday."</span>,
<span class="hljs-attr">"author"</span>: <span class="hljs-literal">null</span>,
}
</code></pre>
        </td>
      </tr>
      </tbody>
    </table>
    <h4>Lists</h4>
    <table style="width:100%">
      <thead>
      <tr>
        <th>Element</th>
        <th>Markdown Syntax</th>
        <th>Output</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td><b><a href="https://www.markdownguide.org/basic-syntax/#ordered-lists">Ordered List</a></b></td>
        <td>
          1. First item<br>
          2. Second item<br>
          3. Third item<br>
        </td>
        <td>
          <ol>
            <li>First item</li>
            <li>Second item</li>
            <li>Third item</li>
          </ol>
        </td>
      </tr>
      <tr>
        <td><b><a href="https://www.markdownguide.org/basic-syntax/#unordered-lists">Unordered List</a></b></td>
        <td>
          - First item<br>
          - Second item<br>
          - Third item<br>
        </td>
        <td>
          <ul>
            <li>First item</li>
            <li>Second item</li>
            <li>Third item</li>
          </ul>
        </td>
      </tr>
      </tbody>
    </table>
    <h4>Other</h4>
    <table style="width:100%">
      <thead>
      <tr>
        <th>Element</th>
        <th>Markdown Syntax</th>
        <th>Output</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td><b><a href="https://www.markdownguide.org/basic-syntax/#blockquotes-1">Blockquote</a></b></td>
        <td>> blockquote</td>
        <td><blockquote>blockquote</blockquote></td>
      </tr>
      <tr>
        <td>
          <b>Material Design Icons</b><br>
          Find icons on <a href="https://materialdesignicons.com/">materialdesignicons.com</a>
        </td>
        <td>:mdi-account:</td>
        <td><i class="mdi mdi-account"></i></td>
      </tr>
      <tr>
        <td><b>Superscript</b></td>
        <td>29^th^</td>
        <td>29<sup>th</sup></td>
      </tr>
      <tr>
        <td><b>Marked</b></td>
        <td>==marked==</td>
        <td><mark>marked</mark></td>
      </tr>
      <tr>
        <td><b>Keyboard Input element</b></td>
        <td>[[w]] [[a]] [[s]] [[d]]</td>
        <td><kbd>w</kbd> <kbd>a</kbd> <kbd>s</kbd> <kbd>d</kbd></td>
      </tr>
      <tr>
        <td><b>Spoiler</b></td>
        <td>!!spoiler!!</td>
        <td><span class="spoiler">spoiler</span></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "MarkdownGuideContent"
}
</script>

<style scoped>

</style>